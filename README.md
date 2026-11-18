# Tobla Kitchen · তবলা কিচেন

Bangla-first marketing site for Tobla Kitchen, a corporate catering kitchen in Tejgaon, Dhaka.
Live: https://www.toblakitchen.com (also https://tobla-kitchen.vercel.app)

## Stack
React 19 · Vite 8 · Tailwind CSS 4 · motion (animations) · Lenis (smooth wheel scrolling) ·
self-hosted fonts (Anek Bangla, Hind Siliguri, Jost) · lucide icons.

## Run it
```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
```

## Construction gate ("Launch or lunch?") — switched off
The site now opens straight away. The gate in `src/gate/` is kept for a future launch or a maintenance
window and comes back with one setting, `VITE_GATE=on`:

- **On Vercel:** Project → Settings → Environment Variables → add `VITE_GATE` with the value `on`
  (Production), then redeploy. Delete the variable and redeploy to switch it off again.
- **Locally:** `VITE_GATE=on npm run dev` (or `npm run build`), or put `VITE_GATE=on` in `.env.local`.

With the gate on, `vite.config.ts` (the `gateMode` plugin) makes `index.html` start from
`src/gate/main.tsx` and paint dark before any JS runs; every visit lands on the gate and the real site is
only downloaded after unlock. A normal build ships no gate code at all.

- **The pun.** লঞ্চ and লাঞ্চ are one stroke apart (the "া"); "Launch" and "Lunch" are one letter apart. The
  headline flips between the two every few seconds: one side counts down to the launch, the other to the
  visitor's next 1 PM lunch. Visitors can pick a side with the two pills (that also stops the flipping).
- **Steam.** `Vapour.tsx` draws full-page steam with one WebGL shader: curls rising off the plate, faint
  veils across the page, and a swirl where the pointer moves. It renders at reduced resolution and steps
  down further on slow devices; without WebGL it falls back to CSS clouds; with reduced motion it is a
  still frame. The small button in the footer pauses all motion.
- **Unlock.** Typing the phrase in the email box and submitting opens the real site (anything else gets a
  fake "you're on the list" message). It is a soft gate — the phrase ships in the JS — not real security.

Settings, all at the top of `src/gate/ConstructionGate.tsx`:

| Constant | What it does |
|---|---|
| `LAUNCH_AT` | when the launch countdown ends (Dhaka time) |
| `UNLOCK_PHRASES` | the phrase(s) that open the site |
| `LUNCH_HOUR` | the hour the lunch countdown aims at (13 = 1 PM, visitor's clock) |
| `FLIP_MS` | how long each side of the pun stays up |

The launch countdown still points at `LAUNCH_AT`; move it (or reword the copy) before reusing the gate as a
maintenance page.

## Edit the content
All copy lives in `src/content/` as Bangla/English pairs (`{ bn, en }`):

| File | What's inside |
|---|---|
| `site.ts` | every section's text, contact details, price card |
| `menu.ts` | the weekly office menu (Saturday–Thursday), day names, ingredient tags |
| `risks.ts` | the food-safety risks vs. our rules |
| `images.ts` | which photo/icon each item uses (day plates, premium dish photos, icons) |

Inline markup in copy: `**text**` = orange accent, `==text==` = marker highlight that draws in.
Prices are not shown on the site: the orange "quote" band (`site.quote`, `src/components/sections/Quote.tsx`)
asks visitors to call for a proposal and lists what every meal includes.

## Brochure
- Download: `public/brochure/tobla-kitchen-brochure.pdf` — the full-quality original (23.7 MB), used by
  every download button.
- Preview: lightweight `src/assets/brochure/page-*.webp` renders (2400px) of the two spreads, so the
  23.7 MB file only loads when someone downloads it. Desktop shows a spread with click-to-zoom; phones show
  each panel full-width.
- To update it: replace the PDF, re-render both pages to WebP (2400px wide) and the three `thumb-*` panels.

## Language
Bangla is the default. The toggle at the top switches to English; the choice is remembered, and
`?lang=en` opens the English version directly.

## Imagery
- `src/assets/food/dish-*.webp` — real photos of our dishes (best shot of each dish, re-centred and
  optimised): prawn bhuna, rui kalia, chicken roast, mutton bhuna, beef bhuna.
- `src/assets/food/plate-*.webp` — one top-down "day plate" per weekday plus the hero. Each is composed
  from the real dish photo (bowl/plate cut out of the original shot) with rice, dal and vegetable bowls on
  slate; the side bowls reuse a real white bowl filled with generated close-up textures.
- `src/assets/images/icon-*.webp` — illustrated icons (generated). The logo is the original vector file.

## Older design
The first design (AI plate photos, 4-week menu) is kept on the `design-v1` branch and is served at
https://old.toblakitchen.com once its DNS record is set.

Design notes: `docs/superpowers/specs/2026-11-05-tobla-kitchen-website-design.md`.
