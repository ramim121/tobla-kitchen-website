# Tri-fold brochure (A4 landscape) — design

Date: 2026-11-24 · Status: built from the owner's brief (two concept images), shown on the site and deployed.

## Intent
Replace the old brochure (dark and orange panels, generic photos, a 23.7 MB PDF) with a tri-fold that looks like the
website, so a printed brochure and the site read as one brand. Corporate buyers get it in hand or by link; it must
print well at a normal print shop and still work as a download.

## What the owner asked for
1. An A4-landscape tri-fold from two concepts: the **layout of the first**, content from **both**, improved.
2. In the **website's design language**: the logo, colours and theme; **the business's own photos**.
3. A **kitchen image generated with the OpenAI image tool** that matches the theme.
4. The brochure as **vector** files as well, and **downloadable** — separately and from the site.
5. Show it on the website and **deploy**.

## Approaches
- **Making the artwork:** (a) a design tool by hand — not repeatable here, and the next edit starts over; (b) SVG
  written by hand — exact, but text layout (wrapping, kerning) is painful; (c) **an HTML/CSS page laid out in mm and
  printed to PDF by Chromium**, then converted to SVG with poppler — real text layout, the site's own fonts, logo
  component and icons, repeatable with one command. Picked (c).
- **Colours:** the concepts use black and saturated-orange panels; the site's rule (owner, 2026-11-18) is no dark or
  orange sections. Kept the concepts' structure and translated the fills: white panels, the site's soft orange wash on
  the back, linen on the middle inside panel, orange as accent only (headings, icons, rules, the plate's disc).
- **Fonts:** the site's variable Jost becomes Type 3 glyphs in Chromium's PDF, which print workflows dislike; the
  print page uses static Jost (400/500/600), embedded as TrueType.

## Decisions
- **Format:** A4 landscape, roll fold. The flap that folds in is 97 mm, the other panels 100 mm (folds at 97/197 mm
  outside, 100/200 mm inside). Geometry in `src/content/brochure.ts`, shared with the site's viewer.
- **Panels (concept 1's layout):** outside — *Let's plan your office lunch* (three steps, QR card, direct contact),
  *Don't just take our word for it* (see the kitchen / understand the standards / taste first, the polao platter and
  the promise "our own team eats the same food we serve you"), the cover (logo, "Corporate Lunch, Professionally
  Managed." with the hero's brush stroke, three ticks, the fish platter on tabla rings). Inside — *Good food starts
  with better ingredients* (eight sourcing facts, three ingredient photos), *From kitchen to office, with care*
  (kitchen photo, four steps, up to 5,000 meals a day), *A reliable partner for your office* (account manager,
  report → review → resolve, six rotating menus, the eight delivery areas over a line drawing of the city).
- **Content:** every claim comes from the site or owner-approved copy (sections 3, 6, 7, risks, about); nothing
  invented. Concept wording kept where it was good, tightened where vague ("Whole spices, externally milled" →
  "Whole spices, milled for us — no ready-made spice mixes").
- **Photos:** real photographer originals for the food (cover and back, from Drive at full resolution); the site's
  ingredient images for the three tiles; one generated kitchen photo (charcoal aprons with orange trim, hairnets,
  masks, gloves, steel kitchen, lunch boxes). All placed at 380 dpi or more.
- **Files:** A4 PDF (the site's download, 2.6 MB), print-ready PDF (3 mm bleed, crop and fold marks, TrimBox/
  BleedBox), SVG per side (297 × 210 mm). Shadows are gradients, not CSS blurs (blurs become clipped bitmaps in PDF);
  the cover plate is one SVG because Chromium splits boxes that cross the page edge and drops their rounded corners.
- **QR code:** `https://www.toblakitchen.com/?lang=en#enquiry`. The site did not scroll to a `#section` on load (the
  sections render after the browser's jump); it now does (`useScrollToHashOnLoad`).
- **Site:** the brochure section keeps its place and viewer; new previews and fanned panels (back, cover, kitchen),
  the phone viewer crops panels by their real widths in reading order, and a *For printing* row offers the
  print-ready PDF and the SVGs.

## Left open
- A real photo of the kitchen to replace the generated one (`print/brochure/assets/kitchen.jpg`, then
  `npm run brochure`).
- A Bangla edition, if wanted: the layout takes Bangla text with a Bangla font added to the print page.
