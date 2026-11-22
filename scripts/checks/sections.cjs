// Sections 1–6 check (the 2026-11-22 layout).  usage: node sections.cjs <distDir>
// Page order, hero, sliding ingredient cards, Menu 01–06 tabs, the kitchen-to-office spec, both languages.
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const ORDER = ["top", "trust", "ingredients", "menu", "gallery", "kitchen-to-office"];
const KEPT = ["why", "sourcing", "risks", "day-menu", "premium", "quote", "process", "about", "brochure", "contact"];
const BENGALI = /[ঀ-৿]/;
const WEEKDAY = /saturday|sunday|monday|tuesday|wednesday|thursday|friday|\b(sat|sun|mon|tue|wed|thu|fri)\b|শনি|রবি|সোম|মঙ্গল|বুধ|বৃহস্পতি|শুক্র/i;

async function open(b, { width = 1440, height = 900, lang = "bn", reduce = false } = {}) {
  const page = await b.newPage({ viewport: { width, height }, reducedMotion: reduce ? "reduce" : "no-preference" });
  page.errors = [];
  page.on("pageerror", (e) => page.errors.push(e.message));
  await page.goto(`${b.url}${lang === "en" ? "?lang=en" : ""}`, { waitUntil: "networkidle" });
  await page.waitForSelector("#main");
  await page.waitForTimeout(1500);
  return page;
}
const trackX = (page) =>
  page.$eval("[data-ingredient-track]", (el) => new DOMMatrixReadOnly(getComputedStyle(el).transform).m41);
async function toSection(page, id) {
  await page.evaluate((id) => document.getElementById(id).scrollIntoView({ block: "start" }), id);
  await page.waitForTimeout(900);
}

(async () => {
  const srv = await serve(dist);
  const b = await browser();
  b.url = srv.url;

  // ── order + nav ──
  let page = await open(b);
  const ids = await page.$$eval("#main > section", (els) => els.map((e) => e.id));
  check(JSON.stringify(ids.slice(0, 6)) === JSON.stringify(ORDER), "sections 1–6 open the page in order", ids.slice(0, 7).join(" › "));
  check(KEPT.every((id) => ids.indexOf(id) > 5), "the earlier sections are all kept, below the new ones");
  check(ids[ids.length - 1] === "contact", "contact is still the last section");
  const nav = await page.$$eval("header nav a", (as) => as.map((a) => a.getAttribute("href")));
  check(await page.evaluate((hs) => hs.every((h) => h && document.querySelector(h)), nav), "every nav link points at a section");
  check(nav.slice(0, 3).join() === "#trust,#menu,#kitchen-to-office", "nav: Why us → 2, Menu → 4, How we work → 6", nav.join(" "));

  // ── hero ──
  const hero = await page.evaluate(() => {
    const h1 = document.querySelector("#top h1");
    const accent = h1.querySelector("span:last-child");
    const paras = [...document.querySelectorAll("#top p")].map((p) => p.textContent.trim());
    return {
      lead: h1.querySelector("span").textContent.trim(),
      accent: accent.textContent.trim(),
      accentColor: getComputedStyle(accent).color,
      leadColor: getComputedStyle(h1).color,
      paras,
      textPath: document.querySelectorAll("#top textPath").length,
      ctas: [...document.querySelectorAll("#top a[href='#contact'], #top a[href='#quote']")].map((a) => ({
        href: a.getAttribute("href"),
        text: a.textContent.trim(),
      })),
      points: [...document.querySelectorAll("#top ul li")].map((li) => li.textContent.trim()),
    };
  });
  check(hero.lead === "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না।", "hero title (Bangla page) as written", hero.lead);
  check(hero.accent === "Consistency matters." && hero.accentColor !== hero.leadColor, "'Consistency matters.' is the orange line", hero.accentColor);
  check(hero.paras.length === 1, "hero: old paragraph removed (only the eyebrow is left)", hero.paras.join(" | "));
  check(hero.textPath === 0 && !(await page.locator("#top", { hasText: "প্রতিদিন টাটকা রান্না" }).count()), "hero: both badges over the plate removed");
  check(
    hero.ctas.map((c) => `${c.href} ${c.text}`).join() === "#contact Request Free Sample,#quote Get Corporate Quote",
    "hero buttons: Request Free Sample → contact, Get Corporate Quote → quote",
    JSON.stringify(hero.ctas),
  );
  check(
    hero.points.join("|") === "Daily Quality Check|Fresh Ingredients, Daily Sourcing|Kitchen Visit Available|Up to 5,000 Meals/Day Capacity",
    "hero: the four highlights",
    hero.points.join("|"),
  );
  for (const width of [360, 390, 768, 1440]) {
    const p = width === 1440 ? page : await open(b, { width, height: 860 });
    const geo = await p.evaluate(() => {
      const r = (el) => el.getBoundingClientRect();
      const [a, q] = ["#contact", "#quote"].map((h) => r(document.querySelector(`#top a[href='${h}']`)));
      const li = [...document.querySelectorAll("#top ul li")].map(r);
      return { a, q, li, vw: document.documentElement.clientWidth };
    });
    const oneLine = Math.abs(geo.a.top - geo.q.top) < 2 && geo.a.height <= 56 && geo.q.height <= 56 && geo.q.right <= geo.vw;
    check(oneLine, `${width}px: hero buttons side by side on one line`, JSON.stringify({ a: geo.a, q: geo.q }));
    const [l1, l2, r1, r2] = geo.li;
    const cols = Math.abs(l1.left - l2.left) < 2 && Math.abs(r1.left - r2.left) < 2 && r1.left > l1.right && l2.top > l1.top && Math.abs(l1.top - r1.top) < 2;
    check(cols, `${width}px: highlights in two columns, two each side`);
    if (p !== page) await p.close();
  }

  // ── section 3: sliding ingredient cards ──
  const cards = await page.$$eval("[data-ingredient-track] > li:not([aria-hidden]) h3", (hs) => hs.map((h) => h.textContent.trim()));
  check(
    cards.join("|") ===
      "Antibiotic-Free Chicken|Omega-3 Eggs|Daily Fresh Fish|Beef & Mutton from Authentic Vendors|Daily Fresh Vegetables|In-house Ground Spices|Branded Cooking Oil|Premium Nazirshail Rice",
    "eight ingredient cards, in order",
    cards.join("|"),
  );
  check((await page.$$("[data-ingredient-track] > li[aria-hidden='true'][inert]")).length === 8, "the looping copy is hidden from screen readers");
  check(
    (await page.$$eval("[data-ingredient-track] > li:not([aria-hidden]) img", (is) => is.filter((i) => i.alt.length > 10).length)) === 8,
    "every card photo has alt text",
  );
  await toSection(page, "ingredients");
  const x0 = await trackX(page);
  await page.waitForTimeout(1500);
  const x1 = await trackX(page);
  check(x1 < x0 - 20, "cards slide to the left on their own", `${x0} → ${x1}`);
  await page.hover("[data-ingredient-viewport]");
  await page.waitForTimeout(300);
  const h0 = await trackX(page);
  await page.waitForTimeout(800);
  check(Math.abs((await trackX(page)) - h0) < 1, "hovering holds the cards still");
  await page.mouse.move(5, 5);
  await page.click("[data-ingredient-toggle]");
  await page.mouse.move(5, 5);
  await page.waitForTimeout(300);
  const p0 = await trackX(page);
  await page.waitForTimeout(800);
  check(Math.abs((await trackX(page)) - p0) < 1, "the pause button stops them");
  const step = await page.$$eval("[data-ingredient-track] > li", (li) => li[1].offsetLeft - li[0].offsetLeft);
  await page.click(`[aria-label="পরের কার্ড"]`);
  await page.waitForTimeout(800);
  const n1 = await trackX(page);
  check(Math.abs(n1 % step) < 2 || Math.abs((n1 % step) + step) < 2 || Math.abs((n1 % step) - step) < 2, "next arrow lands a card on the edge", `${n1} / ${step}`);
  await page.click("[data-ingredient-toggle]"); // play again
  await page.mouse.move(5, 5);
  await page.waitForTimeout(3600);
  const r0 = await trackX(page);
  await page.waitForTimeout(700);
  check((await trackX(page)) < r0 - 5, "play resumes the slide");

  // drag
  const box = await (await page.$("[data-ingredient-viewport]")).boundingBox();
  await page.click("[data-ingredient-toggle]"); // pause, so only the drag moves it
  await page.mouse.move(5, 5);
  const d0 = await trackX(page);
  await page.mouse.move(box.x + 700, box.y + 150);
  await page.mouse.down();
  await page.mouse.move(box.x + 500, box.y + 150, { steps: 8 });
  await page.waitForTimeout(100);
  const d1 = await trackX(page);
  await page.mouse.up();
  check(d1 < d0 - 150 || d1 > d0 + 200, "cards can be dragged sideways", `${d0} → ${d1}`);

  // ── section 4: Menu 01–06 ──
  await toSection(page, "menu");
  const tabs = await page.$$eval("#menu [role=tab]", (ts) => ts.map((t) => t.textContent.trim()));
  check(tabs.join() === "Menu 01,Menu 02,Menu 03,Menu 04,Menu 05,Menu 06", "six tabs, Menu 01 … Menu 06", tabs.join());
  check(!tabs.some((t) => WEEKDAY.test(t)), "no weekday names on the tabs");
  const state = () =>
    page.evaluate(() => ({
      photo: document.querySelector("#menu [data-menu-photo] img:last-of-type")?.getAttribute("src"),
      caption: document.querySelector("#menu figcaption")?.textContent,
      title: document.querySelector("#menu [role=tabpanel] h3")?.textContent,
      items: [...document.querySelectorAll("#menu [data-menu-items] li")].map((li) => li.textContent).join("|"),
      selected: [...document.querySelectorAll("#menu [role=tab]")].findIndex((t) => t.getAttribute("aria-selected") === "true"),
    }));
  const m1 = await state();
  await page.click("#menu [role=tab]:nth-child(3)");
  await page.waitForTimeout(1200);
  const m3 = await state();
  check(m3.selected === 2 && m3.title === "Menu 03", "clicking a tab selects it", JSON.stringify(m3));
  check(m3.photo !== m1.photo && m3.caption !== m1.caption, "…and changes the photo", `${m1.photo} → ${m3.photo}`);
  check(m3.items !== m1.items && m3.items.length > 10, "…and the dish list");
  await page.focus("#menu [role=tab][aria-selected=true]");
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(900);
  check((await state()).selected === 3, "→ key moves to the next menu");
  const cols = await page.evaluate(() => {
    const [fig, det] = [document.querySelector("#menu [data-menu-photo]"), document.querySelector("#menu [role=tabpanel] > div")];
    const a = fig.getBoundingClientRect(), d = det.getBoundingClientRect();
    return { photo: a.width, detail: d.width, left: a.left < d.left };
  });
  const share = cols.photo / (cols.photo + cols.detail);
  check(cols.left && share > 0.53 && share < 0.57, "desktop: photo left ≈ 55%, details right ≈ 45%", share.toFixed(3));

  // ── section 6: kitchen to office ──
  const spec = (p) =>
    p.evaluate(() => {
      const s = document.getElementById("kitchen-to-office");
      const cs = getComputedStyle(s);
      const grid = s.querySelector(".grid");
      const [left, right] = [...grid.children].map((c) => c.getBoundingClientRect());
      const gs = getComputedStyle(grid);
      const steps = [...s.querySelectorAll("[data-k2o-steps] > li")];
      const h3 = steps.map((li) => getComputedStyle(li.querySelector("h3")));
      const body = steps.map((li) => getComputedStyle(li.querySelector("p:last-child")));
      const visual = s.querySelector("[data-ops-standin], img.object-cover")?.closest("div");
      return {
        bg: cs.backgroundColor,
        pad: [parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)],
        content: grid.getBoundingClientRect().width,
        share: left.width / (left.width + right.width),
        gap: parseFloat(gs.columnGap),
        h2: parseFloat(getComputedStyle(s.querySelector("h2")).fontSize),
        h3: h3.map((c) => [parseFloat(c.fontSize), Number(c.fontWeight)]),
        body: body.map((c) => parseFloat(c.fontSize)),
        // a line between each pair of steps (Tailwind 4's divide-y puts it under every step but the last)
        dividers: steps.slice(0, -1).every((li, i) => {
          const below = parseFloat(getComputedStyle(li).borderBottomWidth);
          const above = parseFloat(getComputedStyle(steps[i + 1]).borderTopWidth);
          return Math.max(below, above) >= 1 && Math.max(below, above) <= 1.5;
        }),
        radius: visual ? parseFloat(getComputedStyle(visual).borderTopLeftRadius) : 0,
        areas: s.querySelectorAll("[data-coverage] li").length,
      };
    });
  await toSection(page, "kitchen-to-office");
  const k = await spec(page);
  check(k.bg === "rgb(250, 249, 246)", "6: warm off-white #FAF9F6", k.bg);
  check(k.content <= 1200.5, "6: content at most 1200px wide", String(k.content));
  check(k.share > 0.54 && k.share < 0.56 && k.gap >= 48 && k.gap <= 56, "6: 55% / 45% columns, 48–56px gap", `${k.share.toFixed(3)} / ${k.gap}`);
  check(k.pad.every((v) => v === 80), "6: 80px top/bottom (desktop)", k.pad.join());
  check(k.h2 >= 36 && k.h2 <= 44, "6: headline 36–44px (desktop)", String(k.h2));
  check(k.h3.every(([s, w]) => s >= 18 && s <= 20 && w >= 600), "6: step headings 18–20px, semi-bold", JSON.stringify(k.h3));
  check(k.body.every((s) => s >= 15 && s <= 16), "6: body text 15–16px", k.body.join());
  check(k.dividers, "6: thin lines between the steps");
  check(k.radius >= 12 && k.radius <= 16, "6: image corners 12–16px", String(k.radius));
  check(k.areas === 8, "6: eight delivery areas");
  check(page.errors.length === 0, "no page errors (desktop)", page.errors.join(" | "));
  await page.close();

  // ── phones ──
  page = await open(b, { width: 390, height: 844 });
  const kp = await spec(page);
  check(kp.pad.every((v) => v === 48) && kp.h2 >= 28 && kp.h2 <= 32, "phone 6: 48px padding, 28–32px headline", `${kp.pad} / ${kp.h2}`);
  await toSection(page, "menu");
  const row = await page.$eval("#menu [role=tablist]", (el) => ({ scroll: el.scrollWidth > el.clientWidth, ox: getComputedStyle(el).overflowX }));
  check(row.scroll && row.ox === "auto", "phone: menu tabs scroll sideways", JSON.stringify(row));
  const order = await page.evaluate(() => {
    const t = (sel) => document.querySelector(sel).getBoundingClientRect().top;
    return t("#menu [role=tablist]") < t("#menu [data-menu-photo]") && t("#menu [data-menu-photo]") < t("#menu [role=tabpanel] h3");
  });
  check(order, "phone: tabs, then the photo, then its dishes");
  const sx0 = await page.$eval("#menu [role=tablist]", (el) => el.scrollLeft);
  await page.click("#menu [role=tab]:nth-child(3)");
  await page.click("#menu [role=tab]:nth-child(6)", { force: true }).catch(() => {});
  await page.evaluate(() => document.querySelectorAll("#menu [role=tab]")[5].click());
  await page.waitForTimeout(900);
  check((await page.$eval("#menu [role=tablist]", (el) => el.scrollLeft)) > sx0, "phone: the chosen tab scrolls into view");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  check(!overflow, "phone: no sideways page scroll");
  await page.close();

  // ── reduced motion: cards stay put ──
  page = await open(b, { reduce: true });
  await toSection(page, "ingredients");
  const s0 = await trackX(page);
  await page.waitForTimeout(1200);
  check(Math.abs((await trackX(page)) - s0) < 1, "reduced motion: cards don't move by themselves");
  check((await page.$$("[data-ingredient-toggle]")).length === 0, "reduced motion: no pause button needed");
  await page.close();

  // ── English page ──
  page = await open(b, { lang: "en" });
  const leaks = await page.evaluate(
    (ids) => ids.filter((id) => /[ঀ-৿]/.test(document.getElementById(id).innerText)),
    ["top", "trust", "ingredients", "menu", "kitchen-to-office"],
  );
  check(leaks.length === 0, "English page: sections 1–4 and 6 have no Bangla left", leaks.join());
  const enTitle = await page.$eval("#top h1 span", (s) => s.textContent.trim());
  check(enTitle === "For office lunch, one good day isn't enough.", "English hero title", enTitle);
  // Bangla page: English headings carry lang="en" (caps + pronunciation)
  await page.close();
  page = await open(b);
  const langs = await page.$$eval("#trust h2, #ingredients h2, #menu h2, #kitchen-to-office h2", (hs) => hs.map((h) => h.lang));
  check(langs.every((l) => l === "en"), "Bangla page: English headings are marked lang=en", langs.join());
  check(!BENGALI.test(await page.$eval("#menu [role=tab]", (t) => t.textContent)), "Bangla page: tab labels as written (Menu 01)");
  await page.close();

  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
