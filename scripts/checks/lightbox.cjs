// Lightbox check.  usage: node lightbox.cjs <distDir>
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const TILES = "#gallery ul[data-gallery-grid] > li button";
const DIALOG = "[role=dialog][aria-modal=true]";
const BN = "০১২৩৪৫৬৭৮৯";
const bn = (n) => String(n).replace(/\d/g, (d) => BN[d]);

async function openAt(page, i) {
  const tile = page.locator(TILES).nth(i);
  await tile.scrollIntoViewIfNeeded();
  await tile.click();
  await page.waitForSelector(DIALOG, { state: "visible", timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(700);
}
const nameOf = (page) => page.locator(`${DIALOG} [data-caption-name]`).first().textContent().catch(() => null);
const counter = (page) => page.locator(`${DIALOG} [data-counter]`).first().textContent().catch(() => null);
const tileName = (page, i) => page.locator(TILES).nth(i).locator("[data-name]").textContent();

async function newPage(b, opts = {}, query = "") {
  const page = await b.newPage({ viewport: { width: 1440, height: 900 }, ...opts });
  page.setDefaultTimeout(5000);
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  await page.goto(`${b.url}${query}`, { waitUntil: "networkidle" });
  await page.waitForSelector("#gallery");
  return page;
}

(async () => {
  const srv = await serve(dist);
  const b = await browser();
  b.url = srv.url;

  // ── open, caption, counter, keys, buttons, wrap, close, focus ──
  let page = await newPage(b);
  const names = await page.locator(`${TILES} [data-name]`).allTextContents();
  await openAt(page, 2);
  check((await page.locator(DIALOG).count()) === 1, "clicking a tile opens a modal dialog");
  check((await nameOf(page)) === names[2], "dialog shows the clicked dish", `${await nameOf(page)} vs ${names[2]}`);
  check((await counter(page))?.replace(/\s+/g, " ").trim() === `${bn(3)} / ${bn(22)}`, "counter reads ৩ / ২২", await counter(page));
  check(((await page.locator(`${DIALOG} [data-caption-text]`).textContent()) || "").length > 10, "description shown under the photo");
  const bigSrc = await page.locator(`${DIALOG} img[data-full]`).first().getAttribute("srcset");
  check(/1600w/.test(bigSrc || ""), "large photo uses the 1200/1600 files");
  const ph = await page.locator(`${DIALOG} [data-photo]`).first().evaluate((el) => getComputedStyle(el).backgroundImage);
  check(/-720\./.test(ph) || /720/.test(ph), "tile image is the placeholder under the large photo", ph);

  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);
  check((await nameOf(page)) === names[3], "→ goes to the next dish");
  await page.keyboard.press("ArrowLeft");
  await page.keyboard.press("ArrowLeft");
  await page.waitForTimeout(500);
  check((await nameOf(page)) === names[1], "← goes back");
  await page.locator(`${DIALOG} button[data-next]`).click();
  await page.waitForTimeout(500);
  check((await nameOf(page)) === names[2], "next button works");
  await page.locator(`${DIALOG} button[data-prev]`).click();
  await page.locator(`${DIALOG} button[data-prev]`).click();
  await page.locator(`${DIALOG} button[data-prev]`).click();
  await page.waitForTimeout(500);
  check((await nameOf(page)) === names[21], "prev from the first wraps to the last", await nameOf(page));

  const htmlOverflow = await page.evaluate(() => getComputedStyle(document.documentElement).overflow);
  check(htmlOverflow === "hidden", "page scroll is locked while open");

  let inside = true;
  for (let k = 0; k < 8; k++) {
    await page.keyboard.press("Tab");
    inside = inside && (await page.evaluate((sel) => !!document.activeElement?.closest(sel), DIALOG));
  }
  check(inside, "Tab keeps focus inside the dialog");

  await page.keyboard.press("Escape");
  await page.waitForTimeout(600);
  check((await page.locator(DIALOG).count()) === 0, "Escape closes it");
  const focusedName = await page.evaluate(() => document.activeElement?.querySelector("[data-name]")?.textContent);
  check(focusedName === names[2], "focus returns to the tile that opened it", focusedName);
  check((await page.evaluate(() => getComputedStyle(document.documentElement).overflow)) !== "hidden", "page scroll unlocked after close");

  // ── swipe ──
  await openAt(page, 5);
  const photo = page.locator(`${DIALOG} [data-photo]`).first();
  const box = await photo.boundingBox();
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2);
  await page.mouse.down();
  for (let s = 1; s <= 10; s++) await page.mouse.move(box.x + box.width * 0.7 - s * 30, box.y + box.height / 2);
  await page.mouse.up();
  await page.waitForTimeout(700);
  check((await nameOf(page)) === names[6], "swiping left shows the next dish", await nameOf(page));
  await page.locator(`${DIALOG} button[data-close]`).click();
  await page.waitForTimeout(600);
  check((await page.locator(DIALOG).count()) === 0, "close button closes it");

  // ── navigation stays inside the active filter ──
  await page.locator('#gallery [data-filter="platters"]').click();
  await page.waitForTimeout(700);
  const platterNames = await page.locator(`${TILES} [data-name]`).allTextContents();
  await openAt(page, 3);
  check((await counter(page))?.replace(/\s+/g, " ").trim() === `${bn(4)} / ${bn(4)}`, "counter follows the filter (৪ / ৪)", await counter(page));
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(500);
  check((await nameOf(page)) === platterNames[0], "next from the last platter wraps to the first platter");
  check(page.errors.length === 0, "no page errors", page.errors.join(" | "));
  await page.close();

  // ── short landscape phone ──
  page = await newPage(b, { viewport: { width: 740, height: 360 } });
  await openAt(page, 0);
  const card = await page.locator(`${DIALOG} [data-card]`).boundingBox();
  check(
    !!card && card.y >= 0 && card.x >= 0 && card.y + card.height <= 360 + 0.5 && card.x + card.width <= 740 + 0.5 && card.width >= 400,
    "fits a 740×360 landscape phone (photo + caption)",
    JSON.stringify(card),
  );
  await page.close();

  // ── phone portrait ──
  page = await newPage(b, { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await openAt(page, 0);
  const pcard = await page.locator(`${DIALOG} [data-card]`).boundingBox();
  check(!!pcard && pcard.y >= 0 && pcard.y + pcard.height <= 844 && pcard.x + pcard.width <= 390, "fits a 390×844 phone", JSON.stringify(pcard));
  await page.close();

  // ── English ──
  page = await newPage(b, {}, "?lang=en");
  const enNames = await page.locator(`${TILES} [data-name]`).allTextContents();
  await openAt(page, 0);
  check((await nameOf(page)) === enNames[0] && /^[\x00-\x7F]+$/.test(enNames[0]), "English caption when the site is in English", enNames[0]);
  check((await counter(page))?.replace(/\s+/g, " ").trim() === "1 / 22", "English digits in the counter", await counter(page));
  await page.close();

  // ── reduced motion ──
  page = await newPage(b, { reducedMotion: "reduce" });
  await openAt(page, 0);
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  check((await nameOf(page)) === names[1], "works with reduced motion");
  await page.close();

  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
