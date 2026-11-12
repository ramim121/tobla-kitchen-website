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

## Edit the content
All copy lives in `src/content/` as Bangla/English pairs (`{ bn, en }`):

| File | What's inside |
|---|---|
| `site.ts` | every section's text, contact details, price card |
| `menu.ts` | the weekly office menu (Saturday–Thursday), day names, ingredient tags |
| `risks.ts` | the food-safety risks vs. our rules |
| `images.ts` | which photo/icon each item uses (day plates, premium dish photos, icons) |

Inline markup in copy: `**text**` = orange accent, `==text==` = marker highlight that draws in.
Pricing (Tk 275 average) lives in `site.pricing` and `src/components/sections/Pricing.tsx`; to hide it, remove
`<Pricing />` from `src/App.tsx` and the hero price chip in `Hero.tsx`.

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
