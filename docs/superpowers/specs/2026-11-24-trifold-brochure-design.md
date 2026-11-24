# Tri-fold brochure (A4 landscape) — design

Date: 2026-11-24 · Status: built, revised three times after the owner's reviews the same day, shown on the site and deployed.

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
5. Second review: **all text too small** for a brochure; inside left as in their crop of concept 2 (**"Built on Better
   Ingredients"**, a bold headline and subtext per item) with the photo **blended into the background**, not a
   cut-out shape; inside middle as in their crop of concept 2 (**the kitchen photo across the full width of the panel**,
   "From Kitchen to Office", four points — a list if it fits, else a grid); the cover: **the food in a lunch box with
   steam rising** instead of the plate; and **fix the centrepiece of the skyline** (the dome's spire read as a cross).
6. Third review, with crops of concept 1: the inside right **band shaped as in the concept** (a wide rounded corner, a
   shape peeking out behind it) but in an **orange gradient instead of black**; the cover's lunch box **as in the
   concept: close up, not shown whole, with a smoke effect**; "Safe packaging" → **"Safe & organized packaging"**, the
   boxes **changed every 3 months**; the inside left: **the earlier dark-slate produce photo, in the concept's wave**;
   and **the concept's round icons** for the ingredients (hen, egg, leaf, steak, drop, spices).

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
- **Panels:** outside — cream *Let's Plan Your Office Lunch* (orange corner swoosh, QR "Visit Our Website", phone /
  address / web on orange dots, tan disc), solid orange *Before You Decide* (three white discs: see the kitchen,
  understand the standards, taste before you decide; the promise "our own team eats the same food we serve you"),
  black cover (logo, "Corporate Lunch, Professionally Managed.", a close-up lunch box running off the bottom and right
  edges, steam rising in front of an orange disc behind the box). Inside, cream with an orange bar over each heading —
  *Built on Better Ingredients* (six items, bold headline + subtext, round peach icons drawn after the concept,
  hairlines between items, the dark-slate produce photo cut by a wave), *From Kitchen to Office* (the kitchen photo fold
  to fold, then four points as a list), *A Reliable Partner for Your Office* (account manager, feedback, menu rotation;
  round icons and hairlines as on the left; then the band: a wide rounded corner at the fold, an orange gradient, a
  light peach shape peeking out behind it, the heading and the eight delivery areas in white, a white-line skyline of
  plain towers at the right).
- **Type:** headings 25–29 pt, item headlines 13 pt bold, subtext 10.4 pt, body 11.5 pt.
- **Content:** every claim comes from the site or owner-approved copy; concept wording kept, tightened where vague.
- **Photos:** the lunch box, the kitchen and the fresh ingredients, generated with the OpenAI image tool (no real photos
  of these exist yet). The cover photo's black is screen-blended to the logo black (keeping the steam's contrast), the
  steam above the box strengthened a little, its top faded into the cover, and the orange disc composited behind the box
  with the steam added on top of it — all baked into the JPEG: SVG/CSS masks came out of Chromium's PDF as flattened
  images that some viewers drew with hard edges. The produce wave is a vector clip (no transparency). 240–300 dpi.
- **Packaging:** boxes are changed every 3 months (owner, third review); an earlier note on the site said 2 months — that
  section is no longer on the site.
- **Files:** A4 PDF (the site's download, about 1.3 MB), print-ready PDF (3 mm bleed, crop and fold marks, TrimBox and
  BleedBox), SVG per side (297 × 210 mm). Shapes that cross the page edge are SVG (Chromium splits boxes that cross it
  when printing and drops their rounded corners); no CSS blurs (they become clipped bitmaps in PDF).
- **QR code:** `https://www.toblakitchen.com`.
- **Site:** the brochure section keeps its place and viewer; new previews and fanned panels, the phone viewer crops
  panels by their real widths in reading order, and a *For printing* row offers the print-ready PDF and the SVGs.
  Links that name a section (`/#enquiry`) now scroll to it once the page has rendered.

## Left open
- Real photos of the lunch box, the kitchen and fresh ingredients to replace the generated ones
  (`scripts/brochure/prepare-assets.py`, then `npm run brochure`).
- "Up to 5,000 meals a day" left the brochure with concept 1's middle panel (the owner's crop of concept 2 has no
  capacity line); it is still on the site's hero.
- A Bangla edition, if wanted: the layout takes Bangla text with a Bangla font added to the print page.
