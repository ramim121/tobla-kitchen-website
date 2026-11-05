# Tobla Kitchen website — design brief

Date: 2026-11-05 · Status: built from the owner's direct brief (build → commit → deploy).

## Goal
A one-page marketing site for **Tobla Kitchen (তবলা কিচেন)**, a Dhaka corporate caterer.
Visitors are HR/admin decision-makers. Success = they trust the food-safety story and call
(01711 400 151) for a proposal.

## What the owner asked for
- Content from the Ulkasemi lunch proposal, **without naming Ulkasemi**.
- **Bangla-first**, simple everyday words, with a Bangla/English toggle at the top.
- Logo colours: ink `#231F20`, orange `#F36F21`. Clean, professional, minimal, short copy,
  key phrases highlighted.
- Some interaction and animation, very smooth scrolling; mobile must not break (desktop-led).
- React + Tailwind CSS. Imagery generated with the owner's OpenAI image MCP.
- Commit, then create a Vercel project and deploy.

## Assumptions (not stated by the owner)
- Bangla brand name is **তবলা কিচেন** — the logo mark is the word তবলা written as calligraphy inside a
  tabla-drum oval.
- The proposal price (avg **Tk 275 / person / day**) is shown with its real conditions
  (≈500 lunches/day, excl. VAT & AIT). Easy to remove in `src/content/site.ts`.
- Percent splits from the client-specific menu (e.g. 60/40) are dropped; alternatives show as “/”.
- The organic farm partner (Organik Chicken, Kaliakoir) is named, as in the proposal.

## Visual direction — “Know the source”
- Tabla motif: round plates shown as drum heads with concentric rings; the logo oval reappears
  as a rotating “we eat what we cook” stamp.
- Light paper/cream base, ink sections for contrast, orange as the single sharp accent.
- Type: Anek Bangla (Bangla display), Hind Siliguri (Bangla body), Jost (Latin; echoes the
  geometric wordmark). No letter-spacing on Bangla (protects conjuncts); looser line-height for Bangla.
- Accessibility: orange text only at large sizes or on ink; buttons use ink-on-orange or white-on-ink.

## Page (single route, anchor nav)
1. Header — lockup, nav, **বাং | EN** toggle, call button; mobile sheet menu.
2. Hero — headline “অফিসের খাবার, ঘরের মতো নিরাপদ।”, CTAs, plate on tabla rings, badges.
3. Dish marquee.
4. Problem band — **41.47%** of food samples unsafe (BFSA 2025) with count-up + 2-bar comparison.
5. Sourcing — six source cards (chicken, eggs, beef, fish & veg, spices, oil & water).
6. Risk vs our rule — severity tabs (critical/high/medium), rows expand to show the market fact.
7. Menu explorer — week tabs × day pills, plate photo swaps with a spin, ingredient tags, price card.
8. Process — market → clean kitchen → safe packing → on-time delivery, line draws on scroll.
9. About — trust quote, four values, quick facts.
10. Contact (ink) — services, phone (call + copy), contact person, kitchen address/map; footer.

## Motion & performance
- Lenis smooth wheel scrolling (native touch scrolling kept on phones), anchor offsets for the header.
- motion/react: one staggered hero entrance, reveal-on-scroll (opacity/transform only), layout pills,
  count-ups, marker highlights that draw in. `MotionConfig reducedMotion="user"`; Lenis off for
  reduced-motion users.
- Self-hosted fonts (fontsource), WebP images with explicit sizes, lazy-loading below the fold.

## i18n
- Every string is `{ bn, en }` in `src/content/`. Language from `?lang=` → localStorage → `bn`.
- `<html lang>`, title and meta description follow the active language. Bangla digits in Bangla.

## Deploy
- Vite static build → Vercel project in team “ramim121's projects”, production deployment.

## Update — round 2 (owner feedback)
- Removed the "1,000+ meals a day" badge from the hero plate.
- Tk 275 highlighted: hero price chip + a dedicated orange Pricing section (what the price includes, incl. the
  proposal's portion standard: 1 kg boneless beef serves 9) right after the menu.
- More reasoning from the proposal: "in short" summary under the risk table, mission & vision in About,
  extra delivery promises (experienced hands, modern equipment, never frozen/reused) under Process.
- Brochure section: fanned panel preview, in-site viewer (spreads + zoom on desktop, panels on phones), PDF download.
- Nav: "Menu & price" and "Brochure" added; production domain www.toblakitchen.com (apex redirects to www).
