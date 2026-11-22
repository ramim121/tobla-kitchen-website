// Sections 1–10 check (the 2026-11-22 layout).  usage: node sections.cjs <distDir>
// Page order, hero, sliding ingredient cards, Menu 01–06 tabs, the kitchen-to-office and support specs,
// the enquiry form (validation, sending, success / failure — with /api/enquiry stubbed), footer, both languages.
const { serve, check, done, browser } = require("./lib.cjs");

const dist = process.argv[2];
const ORDER = ["top", "trust", "ingredients", "menu", "gallery", "kitchen-to-office", "support", "enquiry", "about", "contact"];
const KEPT = ["why", "sourcing", "risks", "day-menu", "premium", "quote", "process", "about-old", "brochure", "contact-old"];
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
  check(JSON.stringify(ids.slice(0, 10)) === JSON.stringify(ORDER), "sections 1–10 open the page in order", ids.slice(0, 11).join(" › "));
  check(KEPT.every((id) => ids.indexOf(id) > 9), "the earlier sections are all kept, below the new ten");
  const nav = await page.$$eval("header nav a", (as) => as.map((a) => a.getAttribute("href")));
  check(await page.evaluate((hs) => hs.every((h) => h && document.querySelector(h)), nav), "every nav link points at a section");
  check(nav.join() === "#trust,#menu,#kitchen-to-office,#enquiry,#about,#contact", "nav follows the new sections (2, 4, 6, 8, 9, 10)", nav.join(" "));
  const foot = await page.$$eval("footer nav a", (as) => as.map((a) => `${a.textContent.trim()} ${a.getAttribute("href")}`));
  check(
    foot.join("|") === "Home #top|Our Standards #ingredients|Menus #menu|About Us #about|Contact #contact",
    "footer links: Home, Our Standards, Menus, About Us, Contact",
    foot.join("|"),
  );

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
      ctas: [...document.querySelectorAll("#top a[href='#enquiry']")].map((a) => ({
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
    hero.ctas.map((c) => `${c.href} ${c.text}`).join() === "#enquiry Request Free Sample,#enquiry Get Corporate Quote",
    "hero buttons: Request Free Sample and Get Corporate Quote → the enquiry form",
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
      const [a, q] = [...document.querySelectorAll("#top a[href='#enquiry']")].map(r);
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
    ["top", "trust", "ingredients", "menu", "kitchen-to-office", "support", "enquiry", "about", "contact"],
  );
  check(leaks.length === 0, "English page: sections 1–4 and 6–10 have no Bangla left", leaks.join());
  const enTitle = await page.$eval("#top h1 span", (s) => s.textContent.trim());
  check(enTitle === "For office lunch, one good day isn't enough.", "English hero title", enTitle);
  // Bangla page: English headings carry lang="en" (caps + pronunciation)
  await page.close();
  page = await open(b);
  const langs = await page.$$eval("#trust h2, #ingredients h2, #menu h2, #kitchen-to-office h2", (hs) => hs.map((h) => h.lang));
  check(langs.every((l) => l === "en"), "Bangla page: English headings are marked lang=en", langs.join());
  check(!BENGALI.test(await page.$eval("#menu [role=tab]", (t) => t.textContent)), "Bangla page: tab labels as written (Menu 01)");
  await page.close();

  // ── section 7: support (spec) ──
  const support = (p) =>
    p.evaluate(() => {
      const s = document.getElementById("support");
      const cs = getComputedStyle(s);
      const wrap = s.firstElementChild.getBoundingClientRect();
      const strip = s.querySelector("[data-account-manager]");
      const steps = [...s.querySelectorAll("[data-support-steps] > li")].map((li) => li.getBoundingClientRect());
      const lead = s.querySelector("h2 + p");
      return {
        bg: cs.backgroundColor,
        pad: [parseFloat(cs.paddingTop), parseFloat(cs.paddingBottom)],
        content: wrap.width - parseFloat(getComputedStyle(s.firstElementChild).paddingLeft) * 2,
        lead: lead.getBoundingClientRect().width,
        h2: parseFloat(getComputedStyle(s.querySelector("h2")).fontSize),
        stripBg: getComputedStyle(strip).backgroundColor,
        stripW: strip.getBoundingClientRect().width,
        steps: steps.map((r) => [Math.round(r.left), Math.round(r.top)]),
        buttons: s.querySelectorAll("a, button").length,
      };
    });
  page = await open(b);
  await toSection(page, "support");
  const s7 = await support(page);
  check(s7.bg === "rgb(255, 255, 255)" && s7.pad.every((v) => v === 80), "7: white, 80px padding (desktop)", `${s7.bg} ${s7.pad}`);
  check(s7.content <= 1200.5 && s7.lead <= 720.5 && s7.h2 >= 36 && s7.h2 <= 44, "7: ≤ 1200px, intro ≤ 720px, headline 36–44px", JSON.stringify(s7));
  check(s7.stripBg === "rgb(255, 244, 234)" && Math.abs(s7.stripW - s7.content) < 2, "7: account manager on a full-width #FFF4EA strip");
  const [c1, c2, c3] = s7.steps;
  check(c1[1] === c2[1] && c2[1] === c3[1] && c1[0] < c2[0] && c2[0] < c3[0], "7: three steps side by side (desktop)");
  check(s7.buttons === 0, "7: no extra button");

  // ── section 8: enquiry layout ──
  const s8 = await page.evaluate(() => {
    const s = document.getElementById("enquiry");
    const panel = s.querySelector("[data-enquiry-panel]").getBoundingClientRect();
    const intro = s.querySelector("h2").getBoundingClientRect();
    const input = s.querySelector("input[name=company]");
    const submit = s.querySelector("button[type=submit]");
    return {
      bg: getComputedStyle(s).backgroundColor,
      panelBg: getComputedStyle(s.querySelector("[data-enquiry-panel]")).backgroundColor,
      share: panel.width / (panel.right - intro.left),
      inputBg: getComputedStyle(input).backgroundColor,
      inputBorder: parseFloat(getComputedStyle(input).borderTopWidth),
      submitBg: getComputedStyle(submit).backgroundColor,
      areas: [...s.querySelectorAll("select[name=location] option")].filter((o) => o.value).map((o) => o.value),
      modes: ["phone", "meals", "budget"].map((n) => s.querySelector(`input[name=${n}]`).inputMode),
      required: [...s.querySelectorAll("[aria-required=true]")].map((el) => el.name),
    };
  });
  check(s8.bg === "rgb(255, 255, 255)" && s8.panelBg === "rgb(250, 249, 246)", "8: white section, form on #FAF9F6");
  check(s8.share > 0.5 && s8.share < 0.6, "8: about 45% information / 55% form", s8.share.toFixed(3));
  check(s8.inputBg === "rgb(255, 255, 255)" && s8.inputBorder === 1, "8: white fields with thin borders");
  check(s8.submitBg === "rgb(243, 111, 33)", "8: orange #F36F21 button", s8.submitBg);
  check(
    s8.areas.join("|") === "Gulshan|Banani|Niketon|Baridhara|Baridhara DOHS|Mohakhali|Mohakhali DOHS|Tejgaon|Other",
    "8: location list = the eight service areas + Other",
    s8.areas.join("|"),
  );
  check(s8.modes.join() === "tel,numeric,numeric", "8: phone and number keypads on phones", s8.modes.join());
  check(s8.required.join() === "company,person,phone,location,meals", "8: required = company, person, phone, location, meals", s8.required.join());

  // ── section 8: the form, with the server stubbed ──
  let sent = null;
  let reply = { status: 200, body: { ok: true, id: "test" } };
  await page.route("**/api/enquiry", async (route) => {
    sent = JSON.parse(route.request().postData() || "{}");
    await route.fulfill({ status: reply.status, contentType: "application/json", body: JSON.stringify(reply.body) });
  });
  const F = "#enquiry form";
  await toSection(page, "enquiry");
  await page.click(`${F} button[type=submit]`);
  await page.waitForTimeout(300);
  const empty = await page.evaluate(() => ({
    invalid: [...document.querySelectorAll("#enquiry [aria-invalid=true]")].map((el) => el.name),
    focus: document.activeElement?.name,
    alert: document.querySelector("#enquiry [role=alert]")?.textContent ?? "",
  }));
  check(empty.invalid.join() === "company,person,phone,location,meals" && sent === null, "8: empty form → the five required fields flagged, nothing sent", empty.invalid.join());
  check(empty.focus === "company" && empty.alert.length > 5, "8: focus jumps to the first problem, with a summary");
  await page.fill(`${F} input[name=company]`, "Test Company Ltd");
  await page.fill(`${F} input[name=person]`, "Rahim Uddin");
  await page.fill(`${F} input[name=phone]`, "123");
  await page.selectOption(`${F} select[name=location]`, "Banani");
  await page.fill(`${F} input[name=meals]`, "12.5");
  await page.click(`${F} button[type=submit]`);
  await page.waitForTimeout(300);
  const bad = await page.$$eval("#enquiry [aria-invalid=true]", (els) => els.map((el) => el.name));
  check(bad.join() === "phone,meals" && sent === null, "8: invalid phone and meal count are caught", bad.join());
  await page.fill(`${F} input[name=phone]`, "০১৭১১ ৪০০১৫১"); // Bangla digits are fine
  await page.fill(`${F} input[name=meals]`, "120");
  // "Request Free Sample" anywhere ticks the box
  await page.evaluate(() => document.querySelector("#top a[href='#enquiry']").click());
  await page.waitForTimeout(1600);
  check(await page.isChecked(`${F} [data-sample-box]`), "8: 'Request Free Sample' ticks the free-sample box");
  await toSection(page, "enquiry");
  await page.click(`${F} button[type=submit]`);
  await page.waitForSelector("#enquiry [role=status]", { timeout: 5000 }).catch(() => {});
  const ok = await page.evaluate(() => document.querySelector("#enquiry [role=status]")?.textContent ?? "");
  check(
    sent && sent.company === "Test Company Ltd" && sent.location === "Banani" && sent.meals === "120" && sent.sample === true && sent.website === "" && sent.elapsed > 2500,
    "8: a valid form is sent with every field",
    JSON.stringify(sent),
  );
  check(/০১৭১১ ৪০০১৫১/.test(ok), "8: a clear success message, with their number", ok);
  await page.click("#enquiry [role=status] button");
  await page.waitForTimeout(200);
  reply = { status: 503, body: { ok: false, error: "unavailable" } };
  await page.fill(`${F} input[name=company]`, "Test Company Ltd");
  await page.fill(`${F} input[name=person]`, "Rahim Uddin");
  await page.fill(`${F} input[name=phone]`, "01711400151");
  await page.selectOption(`${F} select[name=location]`, "Other");
  await page.fill(`${F} input[name=meals]`, "40");
  await page.click(`${F} button[type=submit]`);
  await page.waitForTimeout(800);
  const fail = await page.evaluate(() => document.querySelector("#enquiry [role=alert] a[href^='tel:']") !== null);
  check(fail, "8: if sending fails, the form says so and offers a call");
  const kept = await page.inputValue(`${F} input[name=company]`);
  check(kept === "Test Company Ltd", "8: …and keeps what they typed");
  check(page.errors.length === 0, "no page errors (sections 7–10)", page.errors.join(" | "));
  await page.close();

  // ── phones: section 7 stacks, section 8 order, big tap targets ──
  page = await open(b, { width: 390, height: 844 });
  const m7 = await support(page);
  check(m7.pad.every((v) => v === 48) && new Set(m7.steps.map((s) => s[0])).size === 1, "phone 7: 48px padding, steps stacked");
  const m8 = await page.evaluate(() => {
    const top = (sel) => document.querySelector(sel).getBoundingClientRect().top;
    const tall = [...document.querySelectorAll("#enquiry input:not([type=checkbox]):not([name=website]), #enquiry select, #enquiry button[type=submit]")].map(
      (el) => el.getBoundingClientRect().height,
    );
    return {
      order: top("#enquiry h2") < top("#enquiry h2 + p") && top("#enquiry h2 + p") < top("[data-enquiry-panel]") && top("[data-enquiry-panel]") < top("[data-enquiry-points]"),
      minTap: Math.min(...tall),
      fontSize: parseFloat(getComputedStyle(document.querySelector("#enquiry input[name=company]")).fontSize),
    };
  });
  check(m8.order, "phone 8: heading → text → form → process points");
  check(m8.minTap >= 44 && m8.fontSize >= 16, "phone 8: tap targets ≥ 44px, 16px text (no zoom on focus)", JSON.stringify(m8));
  const contactBtns = await page.$$eval("[data-contact-card] a[href^='tel:'], [data-contact-card] button", (els) => els.map((e) => e.getBoundingClientRect().height));
  check(contactBtns.every((h) => h <= 50), "phone 10: Call / Copy buttons stay on one line", contactBtns.join());
  await page.close();

  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
