# Tri-fold brochure (A4 landscape) — design

Date: 2026-11-24 · Status: built, revised after the owner's review the same day, shown on the site and deployed.

## Intent
Replace the old brochure (generic photos, a 23.7 MB PDF) with a tri-fold the owner can print and share, laid out after
their first concept, so corporate buyers get a confident, colourful piece in hand or by link.

## What the owner asked for
1. An A4-landscape tri-fold from two concepts: the **layout of the first**, content from **both**, improved.
2. The logo and colours; **the business's own photos**; a **kitchen image generated with the OpenAI image tool**.
3. The brochure as **vector** files as well, **downloadable** separately and from the site; shown on the site; deployed.
4. Review (same day): the first build — white panels with orange accents, translated into the website's look — was
   **"very plain"**. Follow concept 1 **as it is: full-colour panels and the same sections**, in the **logo's orange**.
   **The QR code opens the website.**

## Approaches
- **Making the artwork:** (a) a design tool by hand — not repeatable here; (b) hand-written SVG — painful text layout;
  (c) **an HTML/CSS page laid out in mm, printed to PDF by Chromium**, then converted to SVG with poppler — real text
  layout, the site's logo component and icons, repeatable with one command. Picked (c).
- **Colours:** first build kept the website's rule (no dark or orange sections) — rejected by the owner as plain. Now:
  concept 1's colour fields — cream, solid orange, black — in the logo's orange #F36F21 and black #231F20.
- **Fonts:** variable Jost becomes Type 3 glyphs in Chromium's PDF, which print workflows dislike; the print page uses
  static Jost (400–700), embedded as TrueType.

## Decisions
- **Format:** A4 landscape, roll fold; the flap that folds in is 97 mm, the other panels 100 mm (folds at 97/197 mm
  outside, 100/200 mm inside). Geometry in `src/content/brochure.ts`, shared with the site's viewer.
- **Panels (concept 1):** outside — cream *Let's Plan Your Office Lunch* (orange corner swoosh, QR "Visit Our
  Website", phone / address / web on orange dots, tan disc), solid orange *Before You Decide* (three white discs: see
  the kitchen, understand the standards, taste before you decide; the promise "our own team eats the same food we
  serve you"), black cover (logo, "Corporate Lunch, Professionally Managed.", the fish platter on an orange disc and
  tabla rings). Inside, cream with an orange bar over each heading — *Good Food Starts with Better Ingredients* (six
  sourcing points, fresh-ingredients photo with a curved top), *From Kitchen to Office, with Care* (kitchen photo, four
  icons, up to 5,000 meals per day), *A Reliable Partner for Your Office* (account manager, feedback, menu rotation;
  black band with an orange sweep: corporate lunch for offices in Dhaka, the eight delivery areas, a skyline).
- **Content:** every claim comes from the site or owner-approved copy; concept wording kept, tightened where vague.
- **Photos:** the fish platter from the photographer's original (Drive, full resolution); kitchen and fresh-ingredients
  photos generated with the OpenAI image tool in the site's photo style. All placed at 370 dpi or more.
- **Files:** A4 PDF (the site's download, about 2 MB), print-ready PDF (3 mm bleed, crop and fold marks, TrimBox and
  BleedBox), SVG per side (297 × 210 mm). Shapes that cross the page edge are SVG (Chromium splits boxes that cross it
  when printing and drops their rounded corners); no CSS blurs (they become clipped bitmaps in PDF).
- **QR code:** `https://www.toblakitchen.com`.
- **Site:** the brochure section keeps its place and viewer; new previews and fanned panels, the phone viewer crops
  panels by their real widths in reading order, and a *For printing* row offers the print-ready PDF and the SVGs.
  Links that name a section (`/#enquiry`) now scroll to it once the page has rendered.

## Left open
- Real photos of the kitchen and of fresh ingredients to replace the generated ones (`print/brochure/assets/`, then
  `npm run brochure`).
- A Bangla edition, if wanted: the layout takes Bangla text with a Bangla font added to the print page.
