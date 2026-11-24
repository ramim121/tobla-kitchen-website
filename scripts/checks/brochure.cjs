// The tri-fold brochure on the site: its files, the section's downloads, the viewer (a whole side on desktop, one
// panel at a time on phones) and the QR code's deep link (/?lang=en#enquiry opens at the enquiry form).
// usage: node brochure.cjs <distDir>
const fs = require("fs");
const path = require("path");
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const DIALOG = "[role=dialog][aria-modal=true]";
const FILES = {
  "/brochure/tobla-kitchen-brochure.pdf": "application/pdf",
  "/brochure/tobla-kitchen-brochure-print.pdf": "application/pdf",
  "/brochure/tobla-kitchen-brochure-outside.svg": "image/svg+xml",
  "/brochure/tobla-kitchen-brochure-inside.svg": "image/svg+xml",
};
// reading order on phones, with each panel's width in mm (src/content/brochure.ts)
const PANELS = [
  ["Cover", 100],
  ["Before you decide", 100],
  ["Better ingredients", 100],
  ["From kitchen to office", 100],
  ["A reliable partner", 97],
  ["Plan your office lunch & contact", 97],
];

(async () => {
  // the files, as built
  for (const [f, type] of Object.entries(FILES)) {
    const file = path.join(dist, f);
    const ok = fs.existsSync(file) && fs.statSync(file).size > 100_000;
    const head = ok ? fs.readFileSync(file).subarray(0, 400).toString("latin1") : "";
    const looks = type === "application/pdf" ? head.startsWith("%PDF-") : /<svg[^>]*width="297mm" height="210mm"/.test(head);
    check(ok && looks, `brochure file: ${f}`, ok ? "unexpected content" : "missing or empty");
  }

  const srv = await serve(dist);
  const b = await browser();
  const base = srv.url.replace(/\/$/, "");

  // desktop: the downloads and the viewer
  let p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  p.setDefaultTimeout(6000);
  await p.goto(`${base}/?lang=en`, { waitUntil: "networkidle" });
  const links = await p.$$eval("#brochure a[download]", (as) => [...new Set(as.map((a) => a.getAttribute("href")))]);
  check(Object.keys(FILES).every((f) => links.includes(f)), "the section links every brochure file", links.join(", "));
  for (const href of links) {
    const r = await p.request.get(base + href);
    const type = r.headers()["content-type"] || "";
    check(r.ok() && type === FILES[href], `download works: ${href}`, `${r.status()} ${type}`);
  }
  const preview = p.locator("#brochure button").first();
  await preview.scrollIntoViewIfNeeded();
  await preview.click();
  await p.waitForSelector(DIALOG, { state: "visible" });
  await p.waitForTimeout(700);
  const spread = await p.$eval(`${DIALOG} img`, (img) => ({ w: img.naturalWidth, h: img.naturalHeight }));
  check(spread.w === 2400 && spread.h === 1697, "the viewer shows a whole side (2400 × 1697)", JSON.stringify(spread));
  await p.close();

  // phones: one panel at a time, in reading order, each cropped to its own width
  p = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  p.setDefaultTimeout(6000);
  await p.goto(`${base}/?lang=en`, { waitUntil: "networkidle" });
  const btn = p.locator("#brochure button").first();
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await p.waitForSelector(DIALOG, { state: "visible" });
  await p.waitForTimeout(700);
  const panels = await p.$$eval(`${DIALOG} ol li`, (lis) =>
    lis.map((li) => {
      const frame = li.querySelector("div").getBoundingClientRect();
      return { label: li.querySelector("img").alt.split(" — ").pop(), ratio: frame.width / frame.height };
    }),
  );
  check(panels.map((x) => x.label).join("|") === PANELS.map(([l]) => l).join("|"), "phones: six panels in reading order", panels.map((x) => x.label).join(" › "));
  const off = panels.filter((x, i) => PANELS[i] && Math.abs(x.ratio - PANELS[i][1] / 210) > 0.01);
  check(panels.length === 6 && off.length === 0, "phones: each panel keeps its own width (97 or 100 mm)", JSON.stringify(off));
  await p.close();

  // the QR code's link opens the English page at the enquiry form (phone) — and any #section works (desktop)
  for (const [vp, hash, lang] of [
    [{ width: 390, height: 844 }, "enquiry", "en"],
    [{ width: 1280, height: 860 }, "contact", "bn"],
  ]) {
    p = await b.newPage({ viewport: vp });
    await p.goto(`${base}/${lang === "en" ? "?lang=en" : ""}#${hash}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(1500);
    const top = await p.$eval(`#${hash}`, (el) => Math.round(el.getBoundingClientRect().top));
    const pageLang = await p.evaluate(() => document.documentElement.lang);
    check(top >= 0 && top <= 140 && pageLang === lang, `/${lang === "en" ? "?lang=en" : ""}#${hash} opens at that section (${vp.width}px)`, `top ${top}px, lang ${pageLang}`);
    await p.close();
  }

  await b.close();
  await srv.close();
  done();
})();
