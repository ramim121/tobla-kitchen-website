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
| `menu.ts` | the 4-week menu, day names, ingredient tags |
| `risks.ts` | the food-safety risks vs. our rules |
| `images.ts` | which photo/icon each item uses |

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
Plate photos and icon sets were generated with OpenAI image models, then sliced, background-removed
and converted to WebP (`src/assets/images`). The logo is used from the original vector file.

Design notes: `docs/superpowers/specs/2026-11-05-tobla-kitchen-website-design.md`.
