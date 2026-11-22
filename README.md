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

## Checks
`npm run check` builds the site (normal and gated) and runs the checks in `scripts/checks/`: the gate
switch, no dark or orange sections and AA text contrast (desktop + phone), the gallery photo files, the
gallery filters, the photo modal (keys, arrows, swipe, focus, phones, English), the phone Back button and
sections 1–6 (page order, hero, the sliding ingredient cards, the Menu 01–06 tabs, the kitchen-to-office spec,
both languages).
It needs Playwright with Chromium and Python 3 with Pillow — both are preinstalled in Claude Code cloud
sessions; elsewhere: `npm i -g playwright && npx playwright install chromium`, `pip install pillow`, and run
with `NODE_PATH=$(npm root -g) npm run check`.

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

## Page order
1. **Hero** — "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না। / Consistency matters.", *Request Free Sample* and
   *Get Corporate Quote* side by side (both open the enquiry form; the first ticks "free sample first"), four
   highlights in two columns. The plate photo is waiting to be replaced with the owner's new image.
2. **Trust** (`#trust`) — "Don't just take our word for it": visit the kitchen, understand the standards, taste first.
3. **Ingredients** (`#ingredients`) — eight cards sliding to the left in a loop (pause on hover/keyboard focus,
   drag or swipe, ‹ › and pause buttons; still for reduced motion). *View Supplier Documents* points at the
   brochure until the documents are online.
4. **Weekly menu** (`#menu`) — tabs *Menu 01 … Menu 06*: combinations, not days (no weekday names); each tab swaps
   the photo (55%) and the dish list (45%); phones scroll the tabs sideways.
5. **Gallery** (`#gallery`) — the kitchen gallery, unchanged, now a section of its own.
6. **From kitchen to office** (`#kitchen-to-office`) — quality check → packaging → delivery, the operations photo
   and the delivery areas, built to the owner's spec (#FAF9F6, ≤ 1200px, 55/45 columns, 52px gap, 80/48px padding).
7. **Support** (`#support`) — the dedicated account manager (#FFF4EA strip) and report → review → resolve.
8. **Enquiry** (`#enquiry`) — "Request a Corporate Quote" form, 45% information / 55% form (see *Enquiries* below).
9. **About** (`#about`) — "We take office lunch seriously" and what matters to us.
10. **Contact** (`#contact`) — phone (call / copy), contact person, kitchen address, website; then the footer.

Below them — between section 10 and the footer — the earlier sections stay in their old order for the owner
to remove: dish strip, 41.47% band (`#why`), sourcing, risks, the old day-by-day menu (`#day-menu`), premium
dishes, quote, process, the old about (`#about-old`), brochure, the old contact (`#contact-old`). Each is one
line in `src/App.tsx`. (The ingredients section's *View Supplier Documents* button points at the brochure —
re-point it in `Ingredients.tsx` before removing the brochure.)

## Enquiries (section 8)
The form checks itself (required: company, contact person, phone, office location, daily meals; optional:
start date, email, budget per meal, special requirements, "free sample first") and posts to
`api/enquiry.ts`, a Vercel Function that checks again with the same rules (`src/lib/enquiry.ts`), drops
bots (hidden field + timing), and then:

- **Saves** every enquiry as a JSON file in the private Blob store **tobla-enquiries** (connected to the project;
  `BLOB_READ_WRITE_TOKEN` is set). Read them in Vercel → Storage → tobla-enquiries → Browser, folder
  `enquiries/YYYY-MM/`.
- **Notifies** the team on any channel you switch on (Vercel → Project → Settings → Environment Variables, then
  redeploy):
  | Variables | Channel |
  |---|---|
  | `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` | a Telegram chat or group (make a bot with @BotFather) |
  | `RESEND_API_KEY`, `LEAD_EMAIL_TO` (+ `LEAD_EMAIL_FROM`) | email through Resend |
  | `LEAD_WEBHOOK_URL` | JSON POST to a CRM, a Google Sheets Apps Script, Zapier or Make |
- **Spreadsheet export:** set `LEADS_KEY` to a long random value, redeploy, then open
  `https://www.toblakitchen.com/api/enquiry?export=csv&key=<LEADS_KEY>` for every enquiry as a CSV (opens in Excel).
- `GET /api/enquiry` answers `{ "ready": true }` when at least one destination is set up. If nothing can take an
  enquiry, the form tells the visitor and offers the phone number instead — enquiries are never silently lost.
- Service areas and the rules (phone formats, meal count 1–100,000, dates) live in `src/lib/enquiry.ts`.
- Locally, `npm run dev` serves the site only; the form needs `vercel dev` (or a deploy) to reach `/api`.

## Edit the content
All copy lives in `src/content/` as Bangla/English pairs (`{ bn, en }`):

| File | What's inside |
|---|---|
| `site.ts` | every section's text (incl. the form's labels and messages), contact details, footer |
| `lunch-menus.ts` | Menu 01–06 for section 4: each combination's dishes, photo and optional dietary note |
| `menu.ts` | the old day-by-day office menu (Saturday–Thursday), day names, ingredient tags |
| `risks.ts` | the food-safety risks vs. our rules |
| `images.ts` | which photo/icon each item uses (day plates, premium dish photos, ingredient photos, icons) and the slot for section 6's operations photo (`OPS_PHOTO`) |
| `gallery.ts` | the kitchen gallery: each dish's photo, category, name, description and alt text |

Languages: the hero keeps the owner's copy exactly as written on the Bangla page (a Bangla–English mix with English
buttons and highlights); every other section is all Bangla on the Bangla page (Bangla digits too: মেনু ০১, ০১ /
মান যাচাই) and all English on the English page — `npm run check` fails if English words creep into sections 2–10 on
the Bangla page. Strings written wholly in English get `lang="en"` when shown (`langFor` in `src/lib/i18n.tsx`).
The enquiry form shows the service areas in Bangla but always sends the English names.

Inline markup in copy: `**text**` = orange accent, `==text==` = marker highlight that draws in.
Prices are not shown on the site: the warm "quote" panel (`site.quote`, `src/components/sections/Quote.tsx`)
asks visitors to call for a proposal and lists what every meal includes.

## Look
A pure white page. Orange is an accent (headings, rules, icons, small buttons), never a section fill, and
there are no dark sections. Tokens live in `src/index.css`:

- `paper` `#FFFFFF` page · `mist` `#F6F6F7` light grey band between white sections · `line` `#E8E8EB`
- `surface-glow` — soft orange-to-white wash for highlight sections (41.47% band, contact)
- `surface-warm` — the same, slightly warmer, for feature panels (quote band, meal-plans card)
- small orange text uses `orange-700`; large orange text `orange-600` (both pass WCAG AA on white)

## Kitchen gallery
Section 5: 22 photos, one best shot of each unique dish or platter the photographer shot,
with category filters. Tapping a photo opens it in a modal (photo, description underneath, ‹ › arrows;
arrow keys, Esc and swipe work). Add, remove or reword dishes in `src/content/gallery.ts`.

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
- Source: the photographer's colour-corrected finals (152 JPEGs) in the shared Drive folder
  "Food Photography - Final Shots after color correction". They are not kept in the repo; download the
  ones listed in `scripts/export-photos.py` and run `python3 scripts/export-photos.py --src <folder>`
  (needs Pillow) to re-create the WebP files below.
- `src/assets/gallery/<dish>-{720,1200,1600}.webp` — the gallery photos (full 3:2 frame; tiles crop to 4:3).
- `src/assets/food/dish-*.webp` — the premium dish cards (4:3 crops of the colour-corrected finals, a
  different frame than the gallery shows): prawn bhuna, rui kalia, chicken roast, mutton bhuna, beef bhuna.
- `src/assets/food/plate-*.webp` — one top-down "day plate" per weekday plus the hero. Each is composed
  from the real dish photo (bowl/plate cut out of the original shot) with rice, dal and vegetable bowls on
  slate; the side bowls reuse a real white bowl filled with generated close-up textures.
- `src/assets/ingredients/<key>-{560,840}.webp` — the raw-ingredient photos on the sliding cards (3:2): generated with
  the OpenAI image tool in the photographer's style (slate, leaves, wood) as stand-ins; replace them with real
  sourcing photos when there are some.
- `src/assets/images/icon-*.webp` — illustrated icons (generated). The logo is the original vector file. Section 6
  uses three of them as a stand-in until `OPS_PHOTO` is set.

## Older design
The first design (AI plate photos, 4-week menu) is kept on the `design-v1` branch and is served at
https://old.toblakitchen.com once its DNS record is set.

Design notes: `docs/superpowers/specs/2026-11-05-tobla-kitchen-website-design.md` (first build),
`2026-11-18-white-redesign-gallery-design.md` (white look, gallery) and `2026-11-22-sections-1-6-design.md`
(the new page order).
