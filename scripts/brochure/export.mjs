// Export the tri-fold brochure (print/brochure/) — `npm run brochure`.
//
// Writes
//   public/brochure/tobla-kitchen-brochure.pdf          A4 landscape, 2 pages (outside, inside) — the site's download
//   public/brochure/tobla-kitchen-brochure-print.pdf    the same with 3 mm bleed, crop and fold marks (for the printer)
//   public/brochure/tobla-kitchen-brochure-outside.svg  vector artwork, one file per side
//   public/brochure/tobla-kitchen-brochure-inside.svg
//   src/assets/brochure/{outside,inside}.webp           2400 px previews for the site's brochure viewer
//   src/assets/brochure/panel-{cover,decide,kitchen}.webp  the three panels the brochure section fans out
//
// Needs Playwright with Chromium (`require("playwright")`), poppler (pdftocairo) and Python 3 with Pillow and pikepdf.
// Photos and the QR code come from print/brochure/assets/ (scripts/brochure/prepare-assets.py).

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const out = (p) => join(root, p);
const PDF = out("public/brochure/tobla-kitchen-brochure.pdf");
const PRINT_PDF = out("public/brochure/tobla-kitchen-brochure-print.pdf");
const SVG = (side) => out(`public/brochure/tobla-kitchen-brochure-${side}.svg`);
const tmp = mkdtempSync(join(tmpdir(), "trifold-"));

const kb = (p) => `${Math.round(statSync(p).size / 1024).toLocaleString("en")} KB`;
const log = (p, extra = "") => console.log(`  ${relative(root, p).padEnd(52)} ${kb(p).padStart(9)} ${extra}`);

const server = await createServer({ root, logLevel: "error", server: { port: 0, strictPort: false } });
await server.listen();
const base = server.resolvedUrls.local[0].replace(/\/$/, "");
const browser = await chromium.launch();

try {
  const page = await browser.newPage();
  page.on("pageerror", (e) => {
    throw e;
  });

  async function printPdf(url, path) {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForFunction(() => document.documentElement.dataset.ready === "true", null, { timeout: 60_000 });
    await page.emulateMedia({ media: "print" });
    await page.pdf({ path, preferCSSPageSize: true, printBackground: true, tagged: true, outline: false });
    await page.emulateMedia({ media: "screen" });
  }

  console.log("→ PDFs");
  await printPdf(`${base}/print/brochure/`, PDF);
  await printPdf(`${base}/print/brochure/?mode=print`, PRINT_PDF);

  // trim/bleed boxes for the print file, document info for both, preview renders and panel crops
  execFileSync("python3", ["-I", out("scripts/brochure/finish.py"), PDF, PRINT_PDF, tmp], { stdio: "inherit" });
  log(PDF, "A4, 2 pages");
  log(PRINT_PDF, "A4 trim + 3 mm bleed, crop & fold marks");

  console.log("→ SVG (vector, one file per side)");
  ["outside", "inside"].forEach((side, i) => {
    execFileSync("pdftocairo", ["-svg", "-f", String(i + 1), "-l", String(i + 1), PDF, SVG(side)]);
    // pdftocairo writes the size in unitless points; say A4 in mm so every editor opens it at 297 × 210 mm
    const svg = readFileSync(SVG(side), "utf8").replace(/(<svg\b[^>]*?)\swidth="[^"]*"\s+height="[^"]*"/, '$1 width="297mm" height="210mm"');
    if (!svg.includes('width="297mm"')) throw new Error(`could not set the size of ${SVG(side)}`);
    writeFileSync(SVG(side), svg);
    log(SVG(side), "297 × 210 mm");
  });
} finally {
  await browser.close();
  await server.close();
  rmSync(tmp, { recursive: true, force: true });
}
