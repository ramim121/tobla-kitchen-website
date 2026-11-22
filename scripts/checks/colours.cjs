// Colour check: no dark / saturated-orange surfaces, readable text.  usage: node colours.cjs <distDir>
const { serve, check, done, browser, luminance, contrast, saturation } = require("./lib.cjs");

const dist = process.argv[2];
const MIN_SURFACE_AREA = 20000; // px² — sections, strips and big cards; small chips and links are allowed, <button>s always

/** Runs in the page: collect surfaces and text with every colour resolved to sRGB via a canvas. */
function collect(minArea) {
  const cvs = document.createElement("canvas");
  cvs.width = cvs.height = 1;
  const ctx = cvs.getContext("2d", { willReadFrequently: true });
  const rgba = (c) => {
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillStyle = c;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return { r, g, b, a: a / 255 };
  };
  const COLOR = /(?:rgba?|oklab|oklch|lab|lch|hsla?|color)\([^)]*\)/g;
  const stopsOf = (img) => (img && img.includes("gradient") ? (img.match(COLOR) || []).map(rgba) : []);
  const name = (el) => {
    const id = el.id ? `#${el.id}` : "";
    const sec = el.closest("section[id], footer, header, [role=region]");
    const where = sec && sec !== el ? ` in ${sec.id ? "#" + sec.id : sec.tagName.toLowerCase()}` : "";
    return `${el.tagName.toLowerCase()}${id}.${String(el.className).split(" ").slice(0, 3).join(".")}${where}`;
  };
  /**
   * What is painted under the middle of an element: walk the hit-test stack (top → bottom) and take
   * the first opaque-ish colour, plus any gradients on the way. Catches positioned siblings (pills,
   * thumbs) that a walk up the DOM would miss. Needs the whole page inside the viewport.
   */
  const behind = (el) => {
    const r = el.getBoundingClientRect();
    const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    const stops = [];
    const layers = []; // top → bottom, until an opaque one (translucent fills stack on what is under them)
    for (const n of stack) {
      if (n !== el && el.contains(n)) continue; // the element's own children
      const cs = getComputedStyle(n);
      stops.push(...stopsOf(cs.backgroundImage));
      const c = rgba(cs.backgroundColor);
      if (c.a > 0.05) {
        layers.push(c);
        if (c.a >= 0.95) break;
      }
    }
    return { layers, stops };
  };
  /** A frame that a photo fills (its grey is only a loading placeholder). */
  const isPhotoFrame = (el, r) =>
    [...el.querySelectorAll("img")].some((img) => {
      const q = img.getBoundingClientRect();
      return q.width * q.height >= 0.9 * r.width * r.height;
    });

  const surfaces = [];
  const texts = [];
  for (const el of document.querySelectorAll("body *")) {
    if (el.closest("[aria-hidden='true'], .sr-only, svg, img, picture, canvas")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    const tag = el.tagName.toLowerCase();
    const big = r.width * r.height >= minArea;
    // a <button> is a control, not a surface: the enquiry form's full-width orange submit button is asked for
    const control = tag === "button";
    if ((big || ["section", "footer", "header"].includes(tag) || el.getAttribute("role") === "region") && !control && !isPhotoFrame(el, r)) {
      const fills = [rgba(cs.backgroundColor), ...stopsOf(cs.backgroundImage)].filter((c) => c.a >= 0.5);
      if (fills.length) surfaces.push({ id: name(el), fills, size: `${Math.round(r.width)}×${Math.round(r.height)}` });
    }
    const ownText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (ownText) {
      texts.push({
        id: name(el),
        text: el.textContent.trim().slice(0, 40),
        color: rgba(cs.color),
        size: parseFloat(cs.fontSize),
        weight: Number(cs.fontWeight),
        bg: behind(el),
      });
    }
  }
  return { surfaces, texts };
}

const over = (top, under) => ({
  r: top.r * top.a + under.r * (1 - top.a),
  g: top.g * top.a + under.g * (1 - top.a),
  b: top.b * top.a + under.b * (1 - top.a),
  a: 1,
});
const WHITE = { r: 255, g: 255, b: 255, a: 1 };

(async () => {
  const srv = await serve(dist);
  const b = await browser();
  for (const vp of [
    { name: "desktop", width: 1440, height: 900 },
    { name: "phone", width: 390, height: 844 },
  ]) {
    const page = await b.newPage({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce" });
    await page.goto(srv.url, { waitUntil: "networkidle" });
    await page.waitForSelector("#main");
    // whole page in the viewport, so hit-testing works everywhere and every reveal has played
    // (a taller viewport can make svh-based blocks taller, so repeat until the height settles)
    for (let i = 0, h = 0; i < 4; i++) {
      const next = await page.evaluate(() => document.documentElement.scrollHeight);
      if (next === h) break;
      h = next;
      await page.setViewportSize({ width: vp.width, height: h });
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1200);
    const { surfaces, texts } = await page.evaluate(collect, MIN_SURFACE_AREA);

    const badSurfaces = [];
    for (const s of surfaces) {
      for (const f of s.fills) {
        const c = over(f, WHITE);
        const L = luminance(c);
        if (L < 0.6 || (saturation(c) > 0.5 && L < 0.75)) {
          badSurfaces.push(`${s.id} (${s.size}) rgb(${Math.round(c.r)},${Math.round(c.g)},${Math.round(c.b)})`);
          break;
        }
      }
    }
    check(badSurfaces.length === 0, `${vp.name}: no dark or orange sections / large surfaces`, `\n    ${badSurfaces.join("\n    ")}`);

    const badText = [];
    for (const t of texts) {
      const base = [...t.bg.layers].reverse().reduce((under, layer) => over(layer, under), WHITE);
      const layers = [base, ...t.bg.stops.map((s) => over(s, base))];
      const worst = Math.min(...layers.map((bg) => contrast(over(t.color, bg), bg)));
      const large = t.size >= 24 || (t.size >= 18.66 && t.weight >= 700);
      const need = large ? 3 : 4.5;
      if (worst < need) badText.push(`${worst.toFixed(2)} < ${need}  "${t.text}"  ${t.id}`);
    }
    check(badText.length === 0, `${vp.name}: text contrast meets AA`, `\n    ${badText.slice(0, 25).join("\n    ")}${badText.length > 25 ? `\n    …and ${badText.length - 25} more` : ""}`);
    await page.close();
  }
  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
