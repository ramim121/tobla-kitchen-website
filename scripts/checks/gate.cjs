// Gate switch check.  usage: node gate.cjs <off|on> <distDir>   (normally run via scripts/checks/run.sh)
const fs = require("fs");
const path = require("path");
const { serve, check, done, browser } = require("./lib.cjs");

const [mode, dist] = process.argv.slice(2);
if (!["off", "on"].includes(mode) || !dist) {
  console.error("usage: node gate.cjs <off|on> <distDir>");
  process.exit(2);
}

(async () => {
  const html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  const assets = path.join(dist, "assets");
  const jsFiles = fs.readdirSync(assets).filter((f) => f.endsWith(".js"));
  const js = Object.fromEntries(jsFiles.map((f) => [f, fs.readFileSync(path.join(assets, f), "utf8")]));
  const entryName = (html.match(/<script type="module"[^>]*src="\/assets\/([^"]+\.js)"/) || [])[1];
  const entry = entryName ? js[entryName] : "";
  const darkFirstPaint = /background:\s*#231f20/i.test(html);

  if (mode === "off") {
    check(!Object.values(js).some((s) => s.includes("bestwebsite")), "no gate code (unlock phrase) in the build");
    check(!darkFirstPaint, "index.html has no dark first paint");
    check(/<meta name="theme-color" content="#ffffff"/i.test(html), "theme-color is white");
    check(!html.includes("%VITE_GATE%"), "no unreplaced env placeholder in index.html");
  } else {
    check(darkFirstPaint, "gate build paints dark before JS runs");
    check(!!entry && !entry.includes("nav-active"), "site code is not in the gate's entry chunk", entryName);
  }

  const srv = await serve(dist);
  const b = await browser();
  const page = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(srv.url, { waitUntil: "networkidle" });
  await page.waitForSelector("#main, .gate-content", { timeout: 10000 }).catch(() => {});
  await page.waitForTimeout(300);

  const hasMain = await page.locator("#main").count();
  const hasGate = await page.locator(".gate-content").count();
  const htmlBg = await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor);
  if (mode === "off") {
    check(hasMain === 1, "site renders straight away (#main present)");
    check(hasGate === 0, "gate is not shown");
    check(htmlBg !== "rgb(35, 31, 32)", "page background is not the dark gate colour", htmlBg);
  } else {
    check(hasGate > 0, "gate is shown");
    check(hasMain === 0, "site is not rendered behind the gate");
    const input = page.locator("form input").first();
    await input.fill("bestwebsite");
    await input.press("Enter");
    const unlocked = await page.waitForSelector("#main", { timeout: 10000 }).then(() => true).catch(() => false);
    check(unlocked, "typing the phrase unlocks the site");
    await page.waitForTimeout(600);
    const bgAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    check(bgAfter !== "rgb(35, 31, 32)", "light colours come back after unlock", bgAfter);
  }
  check(errors.length === 0, "no page errors", errors.join(" | "));

  await b.close();
  await srv.close();
  done();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
