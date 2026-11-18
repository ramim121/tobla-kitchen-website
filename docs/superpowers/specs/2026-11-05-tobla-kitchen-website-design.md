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

## Update — round 3 (real photos, brochure menu)
- Owner supplied 50 food photos (6 dishes). Best shot per dish chosen by framing and a focus score;
  re-centred 4:3 crops for cards (WebP 800/520).
- Menu replaced with the brochure's weekly office menu, Saturday → Thursday (Friday off; on Fridays the
  menu opens on Saturday). Week tabs removed; the plate spin on day change is kept.
- Day plates: top-down flat-lays on slate — the real main-dish bowl/plate cut out of its photo, plus rice,
  dal and vegetable bowls (a real white bowl reused as a template, filled with generated close-ups).
  Thursday's "special" is illustrated with mutton bhuna and says so on the menu.
- New "Premium dishes" section (prawn bhuna, rui kalia, chicken roast, mutton bhuna, beef bhuna) with the
  brochure's three meal plans (Basic, Premium, Executive). Phones swipe the dishes sideways.
- Hero plate and share image use the real-photo spread. Copy no longer mentions a 4-week / 7-day menu.
- The first design is preserved on the `design-v1` branch for old.toblakitchen.com.

## Update — round 4 (no prices)
- Owner asked to remove package prices and related numbers from this version. Removed: the Tk 275 figure,
  the ~500 lunches/day basis, the VAT/AIT note, the beef portion figures and the "3 meal plans" fact.
- The pricing band became a no-numbers quote band ("plan your office menu and budget with us", using the
  brochure's line) with a call-to-action and what every meal includes. Nav label "Menu & price" → "Menu".
- design-v1 (old.toblakitchen.com) keeps its original content unchanged.

## Update — round 5 (the gate: "Launch or lunch?")
- Owner asked for a marketing stunt on the under-construction page: mix up "লঞ্চ হতে বাকি" (launch) with
  "লাঞ্চ হতে বাকি" (lunch), "lunch responsibly until we serve you", and a full-page aroma/steam animation.
- Headline is a one-glyph pun: Bangla gains the "া", English loses the "a". The glyph condenses in like
  steam and evaporates out; the countdown tiles roll between the launch countdown and a live countdown to
  the visitor's next 1 PM lunch. Auto-flips every ~5 s until a side is picked.
- Copy: "যতদিন না আমরা পরিবেশন করছি, ততদিন বুঝেশুনে লাঞ্চ করুন।" / "Until we serve you, lunch responsibly."
  A rotating seal repeats it; the footer carries a mock statutory warning about waiting on an empty stomach.
- The gate went dark (ink) so white steam reads: one WebGL fragment shader draws curls off the plate plus
  page-wide veils, in front of the plate and behind the words. Low-resolution canvas, adaptive step-down,
  CSS fallback, reduced-motion still frame, pause control, pointer stir.
- Unlock keeps the same phrase logic; on success the steam floods the screen and the light site is revealed.
  index.html paints dark first so there is no white flash before the gate.

## Update — round 6 (gate off, white redesign, kitchen gallery)
Full design: `docs/superpowers/specs/2026-11-18-white-redesign-gallery-design.md`.
- The site opens straight away again. The "launch or lunch" gate stays in `src/gate/` behind a build-time
  switch (`VITE_GATE=on`) for a future launch or maintenance window.
- Pure white page; no black or solid-orange sections. Neutral light-grey bands (`mist`) replace cream; the
  41.47% band, quote panel, meal-plans card and contact use soft orange-to-white washes; the footer is white.
- New kitchen gallery under the premium dishes: 22 unique dishes and platters from the photographer's
  colour-corrected finals, category filters, and a modal lightbox (photo + description, arrows, keys, swipe).
  The premium cards use the colour-corrected shots too.
