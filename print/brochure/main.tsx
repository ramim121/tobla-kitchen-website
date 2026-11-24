import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// static Jost (not the site's variable font): Chromium embeds static fonts in the PDF as TrueType,
// which print workflows prefer to the Type 3 glyphs it makes from variable fonts
import "@fontsource/jost/400.css";
import "@fontsource/jost/500.css";
import "@fontsource/jost/600.css";
import "./trifold.css";
import { Trifold, type Mode } from "./Trifold";
import { SHEET_MM } from "../../src/content/brochure";

/** ?mode=print → 3 mm bleed with crop and fold marks; default → trimmed A4 */
const mode: Mode = new URLSearchParams(location.search).get("mode") === "print" ? "print" : "trim";
const SLUG = mode === "print" ? 12 : 0;

// the page size has to live in @page, which a class can't switch
const page = document.createElement("style");
page.textContent = `@page { size: ${SHEET_MM.w + 2 * SLUG}mm ${SHEET_MM.h + 2 * SLUG}mm; margin: 0; }`;
document.head.append(page);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Trifold mode={mode} />
  </StrictMode>,
);

// the exporter waits for this: fonts loaded and every photo decoded
Promise.all([
  document.fonts.ready,
  new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
]).then(async () => {
  await Promise.all(Array.from(document.images).map((img) => img.decode().catch(() => undefined)));
  document.documentElement.dataset.ready = "true";
});
