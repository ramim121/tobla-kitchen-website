// Back button closes full-screen overlays (photo lightbox, brochure viewer) instead of leaving the site.
// usage: node history.cjs <distDir>
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const DIALOG = "[role=dialog][aria-modal=true]";
const TILE = "#gallery ul[data-gallery-grid] > li button";

(async () => {
  const srv = await serve(dist);
  const b = await browser();
  const fresh = async () => {
    const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
    p.setDefaultTimeout(5000);
    await p.goto(srv.url, { waitUntil: "networkidle" });
    await p.waitForSelector("#main");
    return p;
  };
  const back = async (p) => {
    await p.evaluate(() => history.back()).catch(() => {}); // leaving the page destroys the context
    await p.waitForTimeout(900);
  };
  const open = async (p, selector) => {
    const el = p.locator(selector).first();
    await el.scrollIntoViewIfNeeded();
    await el.click();
    await p.waitForSelector(DIALOG, { state: "visible" });
    await p.waitForTimeout(500);
  };
  const onSite = async (p, url) => p.url() === url && (await p.locator("#main").count().catch(() => 0)) === 1;

  // photo lightbox: Back closes it, the next Back leaves as usual
  let p = await fresh();
  let url = p.url();
  await open(p, `${TILE} >> nth=4`);
  await back(p);
  check(await onSite(p, url), "Back on an open photo stays on the site", p.url());
  check((await p.locator(DIALOG).count().catch(() => 1)) === 0, "…and closes the photo");
  await back(p);
  check(p.url() !== url, "the next Back leaves the site as usual (no stuck entry)", p.url());
  await p.close();

  // photo lightbox: closing with × leaves history as it was
  p = await fresh();
  url = p.url();
  await open(p, `${TILE} >> nth=2`);
  await p.locator(`${DIALOG} button[data-close]`).click();
  await p.waitForTimeout(700);
  check((await p.locator(DIALOG).count()) === 0, "× closes the photo");
  await back(p);
  check(p.url() !== url, "after closing with ×, Back leaves the site (no stuck entry)", p.url());
  await p.close();

  // photo lightbox: Esc too, and navigating inside the viewer adds no entries
  p = await fresh();
  url = p.url();
  await open(p, `${TILE} >> nth=0`);
  await p.keyboard.press("ArrowRight");
  await p.keyboard.press("ArrowRight");
  await p.waitForTimeout(400);
  await p.keyboard.press("Escape");
  await p.waitForTimeout(700);
  check((await p.locator(DIALOG).count()) === 0, "Esc closes the photo");
  await back(p);
  check(p.url() !== url, "after arrows + Esc, Back leaves the site (no stuck entries)", p.url());
  await p.close();

  // brochure viewer: Back closes it
  p = await fresh();
  url = p.url();
  await open(p, "#brochure button");
  await back(p);
  check(await onSite(p, url), "Back on the brochure viewer stays on the site", p.url());
  check((await p.locator(DIALOG).count().catch(() => 1)) === 0, "…and closes the brochure viewer");
  await p.close();

  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
