# White redesign + kitchen gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the real site without the gate, restyled on pure white with no dark/orange sections, plus a 22-photo gallery with a modal lightbox under the premium dishes.

**Architecture:** A build-time flag (`VITE_GATE`) picks gate or site in `Root.tsx`. Colours change at the token level in `index.css` (new `mist` band + `surface-glow` utility), then each dark/orange surface is restyled in its component. Gallery data lives in `src/content/gallery.ts` (images via `import.meta.glob`), rendered by `Gallery.tsx` inside the premium section and opened in a reusable `Lightbox.tsx`.

**Tech Stack:** React 19, Vite 8 (rolldown), Tailwind CSS 4, motion/react, Lenis, lucide-react; Pillow for image export; Playwright (preinstalled) for checks.

**Spec:** `docs/superpowers/specs/2026-11-18-white-redesign-gallery-design.md`

## Global Constraints
- Page background `#FFFFFF`; band `mist #F6F6F7`; lines `#E8E8EB`; ink `#231F20`; orange `#F36F21` (accent only).
- No section, footer, strip or large card may have a black/ink or saturated-orange fill. Buttons/chips may.
- Small orange text uses `orange-700` (`#B5480C`); body text contrast ≥ 4.5:1 on its surface.
- Every user-facing string is a `{ bn, en }` pair; Bangla first; no letter-spacing on Bangla.
- Motion respects `prefers-reduced-motion` (existing `MotionConfig reducedMotion="user"`).
- Gate off unless `VITE_GATE=on`; when off, no gate code in the build output.

## Review Focus
1. Short landscape phones (740×360): the lightbox (photo + caption + arrows) must fit without page scroll. → Task 5 check at 740×360.
2. Switching language while the lightbox is open: caption and counter switch too. → Task 5 check.
3. Category filter then navigate: arrows wrap within the filtered set (e.g. Platters 4 → 1). → Task 5 check.
4. Reduced motion: lightbox opens/navigates with no slide animation and still works. → Task 5 check with `reducedMotion: "reduce"`.
5. Slow large image: the tile image shows as a placeholder until the 1600w photo decodes (no empty frame). → Task 5 check (tile src used as background).

---

### Task 1: Gate switch

**Files:**
- Modify: `src/Root.tsx`, `index.html`, `vite.config.ts`, `README.md` (gate section)
- Create: `src/env.d.ts`
- Test: scratchpad `checks/gate.mjs` (Playwright)

**Interfaces:**
- Produces: `import.meta.env.VITE_GATE?: string` typing; `Root` renders `<App />` when the flag is not `"on"`.

- [ ] Write `checks/gate.mjs`: serve `dist/`, load `/`; assert `#main` exists, no `[data-gate]` form, `html` background is `rgb(255, 255, 255)`; assert no built JS file contains `bestwebsite`. Second mode (`GATE=on`): assert the gate headline renders and `html` background is `rgb(35, 31, 32)` before JS (check raw HTML contains the dark style).
- [ ] Run against current build → expect FAIL (gate shows).
- [ ] `Root.tsx`: `const GATE_ON = import.meta.env.VITE_GATE === "on"`; off → `<App />` (static import); on → lazy `gate/GatedRoot` that keeps today's unlock + lazy-App behaviour (move the current Root body there).
- [ ] `index.html`: remove inline dark backgrounds, `theme-color` `#ffffff`, `<noscript>` text colour ink. `vite.config.ts`: `gateFirstPaint()` plugin (`transformIndexHtml`) injecting `<style>html,body{background:#231f20}</style>` + dark theme-color only when `VITE_GATE=on` (read with `loadEnv`).
- [ ] Build both modes; run checks → PASS. Confirm gate-on entry chunk does not contain App section code (grep a site-only string, e.g. `41.47`).
- [ ] README: replace "Going live" with "Turning the gate back on" (Vercel env var `VITE_GATE=on` + redeploy, or `.env.local`).
- [ ] Commit `feat: gate becomes an off-by-default VITE_GATE switch`.

### Task 2: White colour system + restyle

**Files:**
- Modify: `src/index.css`; `src/components/sections/{Hero,DishMarquee,StatBand,Sourcing,RiskCompare,MenuExplorer,PremiumDishes,Quote,Process,About,Brochure,Contact}.tsx`; `src/components/layout/Footer.tsx`; `src/components/ui/{SectionHeading,TablaRings,Rich}.tsx` (drop unused `dark` variants)
- Test: scratchpad `checks/colours.mjs`

**Interfaces:**
- Produces: tokens `--color-paper:#ffffff`, `--color-mist:#f6f6f7`, `--color-line:#e8e8eb`; utility `surface-glow` (soft orange→white wash); `cream` token removed (all uses → `mist`).

- [ ] Write `checks/colours.mjs`: for every `section`, `footer`, the marquee region, and `[data-surface]` cards, read computed `background-color` + `background-image`; FAIL if any solid fill has relative luminance < 0.6, or HSL saturation > 0.5 with luminance < 0.75 (catches ink and `#F36F21`). Also sample contrast of `h2`, `p` in each section vs. its surface ≥ 4.5 (≥ 3 for ≥ 24px).
- [ ] Run → expect FAIL (ink stat band, orange marquee, orange quote, ink contact/footer, ink plans/summary/teaser, orange about card).
- [ ] Tokens + `surface-glow` in `index.css` (radial orange-100 glow top-right + `#FFF8F3`→white linear). Hero: drop cream/orange radial blobs (pure white).
- [ ] Restyle per spec rhythm: marquee white with top/bottom `border-line`, ink names, orange dots; StatBand `surface-glow`, ink figure, light meter track `orange-100`, tooltip ink-on-white ring; risks `mist` + summary card `bg-orange-50` with `border-l-4 border-orange`; menu teaser `bg-orange-50` ring; day pill white; premium `mist` + PlansCard white with `surface-glow` + orange rules; Quote panel `surface-glow` + `ring-orange-100`; Process `mist`; About signature card `surface-glow` + `ring-orange/40`; Brochure `mist`; Contact `surface-glow` (keep rounded top), white chips with `border-line`; Footer white, `border-t border-line`, dark logo, muted links → `hover:text-orange-700`.
- [ ] Run `npm run build` + checks → PASS; screenshots desktop 1440 + phone 390 (bn, en) reviewed by eye.
- [ ] Commit `style: pure white palette, light surfaces instead of ink/orange sections`.

### Task 3: Photo export

**Files:**
- Create: `scripts/export-photos.py`, `src/assets/gallery/<key>-{480,960,1600}.webp` (22 keys)
- Replace: `src/assets/food/dish-{prawn,fish,roast,mutton,beef}-{520,800}.webp`

**Interfaces:**
- Produces: gallery files `<key>-480.webp`, `<key>-960.webp`, `<key>-1600.webp`, all the full 3:2 frame (480×320, 960×640, 1600×1067); tiles crop to 4:3 in CSS via a per-item `focus` (`object-position`). Keys (fixed): `prawn, rui, roast, chicken-curry, mutton, beef, beef-potato, egg, polao, khichuri, tehari, dal, moong-dal, bharta, lal-shak, okra, mixed-veg, korola, polao-platter, khichuri-platter, bharta-platter, fish-platter`.

- [ ] Script: table key → `DSC0xxxx`; Lanczos resize, light unsharp, WebP q≈80; premium cards 4:3 crops 800×600/520×390 from DSC02806/02803/02775/02762/02760 with a per-photo focus.
- [ ] Run with `--src <orig dir>`; assert 66 gallery files; budgets: 480w ≤ 60 KB, 960w ≤ 160 KB, 1600w ≤ 360 KB; eyeball a contact sheet of tiles + cards.
- [ ] Commit `assets: colour-corrected gallery photos and premium card shots`.

### Task 4: Gallery grid

**Files:**
- Create: `src/content/gallery.ts`, `src/components/sections/Gallery.tsx`
- Modify: `src/components/sections/PremiumDishes.tsx` (render `<Gallery />` after the plans), `src/content/site.ts` (`site.gallery` copy), `src/components/layout/Header.tsx` (`gallery: "menu"` in `SECTION_TO_NAV`)

**Interfaces:**
- Produces: `type GalleryCategory = "mains" | "rice" | "veg" | "platters"`; `type GalleryItem = { key: string; category: GalleryCategory; name: L; text: L; alt: L; focus: string; small: string; medium: string; large: string; srcSet: string }` (`srcSet` = `"<480> 480w, <960> 960w, <1600> 1600w"`); `export const GALLERY: GalleryItem[]` (22, ordered by category); `export const GALLERY_CATEGORIES: { key: "all" | GalleryCategory; label: L }[]`.
- Consumes: Task 3 file names; `Lightbox` from Task 5 (`<Lightbox items index onIndex onClose />`).

- [ ] Extend `checks/gallery.mjs`: 22 tiles under `#gallery`; chips filter to 8 / 5 / 5 / 4; each tile is a `button` with an accessible name containing the dish name; images lazy.
- [ ] Run → FAIL (no gallery).
- [ ] `gallery.ts`: names/descriptions from the spec's 22 dishes (bn/en), images resolved via `import.meta.glob("../assets/gallery/*.webp", { eager: true, import: "default" })`; throw at module load if any key lacks a file.
- [ ] `Gallery.tsx`: heading block (eyebrow "গ্যালারি / Gallery", title, count), chip group (`aria-pressed`), grid `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`, 4:3 tiles with white name pill, hover zoom, `layout` animation on filter; `id="gallery"`.
- [ ] Run checks → PASS; commit `feat: kitchen gallery with category filters`.

### Task 5: Lightbox modal

**Files:**
- Create: `src/components/ui/Lightbox.tsx`
- Test: `checks/gallery.mjs` (lightbox part)

**Interfaces:**
- Produces: `Lightbox(props: { items: GalleryItem[]; index: number | null; onIndex: (i: number) => void; onClose: () => void })` — `index === null` means closed; wraps around; uses `lockScroll` from `lib/smooth-scroll`.

- [ ] Checks: click tile 3 → `role=dialog` visible with that name and "৩ / ২২"; `ArrowRight` → next name; `ArrowLeft` twice → previous (wrap from 1 → 22); next/prev buttons work; `Escape` closes and focus returns to tile 3; Tab stays inside the dialog; drag/swipe left on the photo → next; at 740×360 the dialog box fits the viewport; switching language while open updates caption; with Platters filter, next from item 4 → item 1; `reducedMotion: "reduce"` still navigates; the tile image is the placeholder under the large photo.
- [ ] Run → FAIL.
- [ ] Implement: portal-free fixed overlay (`z-[90]`), scrim `bg-ink/60 backdrop-blur-sm`, white card `rounded-[28px]`, width `min(1120px, 94vw, (100dvh - 15rem) * 1.5)`, photo 3:2 with tile as blurred placeholder background + `srcSet` 960/1600, round arrow buttons on the sides, close button; caption row: category chip, name (`aria-live="polite"`), text, counter (`num()`); keys ←/→/Esc; `drag="x"` swipe (offset > 60px or velocity > 400); focus trap; preload neighbours; AnimatePresence slide (fade only under reduced motion).
- [ ] Run checks → PASS; commit `feat: gallery lightbox with arrows, keys and swipe`.

### Task 6: Docs, review, ship

**Files:**
- Modify: `README.md` (colours, gallery, imagery, gate), `docs/superpowers/specs/2026-11-05-tobla-kitchen-website-design.md` (round 6 pointer)

- [ ] `npm run build` clean (no TS errors, no warnings about missing images); run all checks; final screenshots.
- [ ] Fresh reviewer pass over the diff (superpowers:requesting-code-review); fix findings.
- [ ] Commit docs; push `main` (Vercel Git deploy) and confirm www.toblakitchen.com serves the site (HTML has no dark inline background; `/` renders `#main`).
