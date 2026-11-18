// Gallery grid check.  usage: node gallery.cjs <distDir>
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const TILES = "#gallery ul[data-gallery-grid] > li button";

(async () => {
  const srv = await serve(dist);
  const b = await browser();
  const page = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(srv.url, { waitUntil: "networkidle" });
  await page.waitForSelector("#main");

  const gallery = page.locator("#gallery");
  check((await gallery.count()) === 1, "gallery block exists (#gallery)");
  check((await page.locator("#premium #gallery").count()) === 1, "gallery sits inside the premium section");

  const tiles = page.locator(TILES);
  check((await tiles.count()) === 22, "22 photos in the gallery", `got ${await tiles.count()}`);

  const info = await tiles.evaluateAll((els) =>
    els.map((el) => ({
      label: el.getAttribute("aria-label") || "",
      pill: el.querySelector("[data-name]")?.textContent?.trim() || "",
      lazy: el.querySelector("img")?.getAttribute("loading") === "lazy",
      srcset: el.querySelector("img")?.getAttribute("srcset") || "",
      alt: el.querySelector("img")?.getAttribute("alt") ?? null,
    })),
  );
  check(info.length > 0 && info.every((i) => i.pill && i.label.includes(i.pill)), "each tile is a button named after its dish");
  check(new Set(info.map((i) => i.pill)).size === info.length, "every dish appears once");
  check(info.length > 0 && info.every((i) => i.lazy), "tile images load lazily");
  check(info.length > 0 && info.every((i) => /720w.*1200w.*1600w/.test(i.srcset)), "tile images offer 720/1200/1600 widths");
  check(info.length > 0 && info.every((i) => i.alt === ""), "tile images are decorative (the button carries the name)");

  const chips = page.locator("#gallery [data-filter]");
  const want = { all: 22, mains: 8, rice: 5, veg: 5, platters: 4 };
  check((await chips.count()) === 5, "five filter chips", `got ${await chips.count()}`);
  for (const [key, n] of Object.entries(want)) {
    const chip = page.locator(`#gallery [data-filter="${key}"]`);
    if (!(await chip.count())) {
      check(false, `filter "${key}" shows ${n}`, "chip missing");
      continue;
    }
    await chip.click();
    await page.waitForTimeout(700);
    const count = await tiles.count();
    const pressed = await chip.getAttribute("aria-pressed");
    check(count === n && pressed === "true", `filter "${key}" shows ${n}`, `got ${count}, aria-pressed=${pressed}`);
  }

  check(errors.length === 0, "no page errors", errors.join(" | "));
  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
