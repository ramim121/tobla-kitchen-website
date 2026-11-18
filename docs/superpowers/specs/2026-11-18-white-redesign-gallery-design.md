# White redesign, gate off, kitchen gallery — design

Date: 2026-11-18 · Status: approved by the owner ("go", 15+ distinct shots).

## Intent
The site has been behind the "launch or lunch" gate. The owner wants the real site back on
www.toblakitchen.com, a calmer, more professional **white** look, and a gallery that shows every
dish the photographer shot, so visitors see the real food.

## What the owner asked for
1. Disable the under-construction gate and show the site; keep the gate for later (as a
   maintenance page).
2. Pure white page background. No black or orange **sections** anywhere (the dish strip, the 41.47%
   band, the meal-plans card, the quote band, contact, footer). Some sections may carry a soft
   orange gradient accent (not heavily orange), e.g. the quote band. Adjust the other colours to fit.
3. A gallery with every unique item, next to the premium dishes. Clicking a photo opens a modal:
   the image, its description at the bottom, and left/right arrows.
4. Photos: the photographer's 152 colour-corrected finals in the shared Drive folder
   ("Food Photography - Final Shots after color correction"). Use distinct shots, no near-repeats.

## Goals / non-goals / anti-goals
- Goals: gate off by default and easy to turn back on; white base with light surfaces only; a
  gallery of the distinct dishes with an accessible lightbox; keep Bangla-first copy and motion.
- Non-goals: new pages, prices, rebuilding the day plates from the new photos (possible later),
  changing copy beyond gallery captions.
- Anti-goals: any full-width black or saturated-orange background; washed-out low-contrast text;
  a gallery of near-identical photos; downloading the gate's code when the gate is off.

## Approaches considered
- **Gate:** (a) delete it — loses the maintenance page; (b) a code constant — needs a commit to flip;
  (c) **build-time switch `VITE_GATE=on`** — default off, can be flipped from Vercel env vars or in
  code. Picked (c).
- **Gallery content:** (a) one photo per original 6 dishes; (b) ~15 distinct shots (owner's pick,
  made before the Drive set arrived); (c) every one of 152. The Drive set turned out to hold
  **22 unique dishes and platters**, so the gallery shows **one best shot of each (22)** — the
  "distinct shots, all unique items" intent, with no near-repeats.
- **Lightbox:** a library vs. a small in-house component on `motion` (already a dependency).
  Picked in-house: no new dependency, matches the brochure viewer's patterns.

## Decisions
### Gate
- `import.meta.env.VITE_GATE === "on"` → gate (unchanged behaviour: site code only downloaded
  after unlock). Anything else → the site renders directly; the gate code is not in the bundle.
- `index.html` first paint is white; a tiny Vite plugin adds the dark first paint only when the
  gate is on. README explains how to switch it back on.

### Colour system
- Page `#FFFFFF`. Neutral light-grey band `mist #F6F6F7` replaces the warm cream (no orange cast).
  Lines `#E8E8EB`. Ink `#231F20` and the orange family stay (orange = accent, never a section fill).
- Highlight surface (`surface-glow`): a soft orange-to-white gradient wash — used for the 41.47%
  band, the quote panel and contact.
- Section rhythm: hero white → dish strip white with hairlines → 41.47% glow → sourcing white →
  risks mist → menu white → premium + gallery mist → quote (glow panel on white) → process mist →
  about white → brochure mist → contact glow → footer white with a top rule.
- Former dark/orange cards become light: meal-plans card (white + glow, orange rules), risk
  "in short" card (orange-50 with orange rule), menu quote teaser (orange-50), about's signature
  value (glow + orange ring), plate day pill (white pill).
- Small controls keep charcoal/orange pills (they are buttons, not sections). Text contrast stays
  AA: small orange text uses `orange-700`.

### Gallery
- Lives inside the premium section, under the dish cards: eyebrow + title + count, category
  chips (All · Fish, meat & egg · Rice & dal · Vegetables & bharta · Platters), then a grid
  (2 cols phone, 3 tablet, 4 desktop) of 4:3 tiles with the dish name on a white pill.
- 22 items, one per unique dish, each with a Bangla/English name, one-line description and alt
  text. Order follows the categories.
- The five premium cards switch to the colour-corrected versions of their dishes; the gallery
  uses a different angle of those five so the two never show the same frame.
- Images: tiles 480/800w WebP, lightbox 1024/1600w WebP, lazy-loaded; neighbours preloaded.

### Lightbox (modal)
- Dimmed, blurred scrim; a white rounded card: the photo (full 3:2 frame) with round ‹ › arrows
  on its sides and a close button; under it the category, name, description and "4 / 22".
- Keyboard ←/→/Esc, swipe on touch, focus kept inside and returned to the tile, page scroll
  locked, `role="dialog"`, caption announced politely. Navigation follows the active category.

## Left to the builder
Exact gradient stops, spacing, crop focus per photo, caption wording polish, chip labels.
