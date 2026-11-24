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
the page sections (page order, hero, the sliding ingredient cards, the Menu 01–06 tabs, the enquiry form, both
languages) and the brochure (its files and downloads, the viewer on desktop and phones, `#section` links).
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
The numbers are the owner's brief (code comments and checks use them too).

1. **Hero** — "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না। / Consistency matters.", *Request Free Sample* and
   *Get Corporate Quote* side by side (both open the enquiry form; the first ticks "free sample first"), four
   highlights in two columns (Bangla on the Bangla page). The plate photo is waiting to be replaced with the
   owner's new image.
2. **Trust** (`#trust`) — "Don't just take our word for it": visit the kitchen, understand the standards, taste first.
3. **Ingredients** (`#ingredients`) — eight cards sliding to the left in a loop (pause on hover/keyboard focus,
   drag or swipe, ‹ › and pause buttons; still for reduced motion). *View Supplier Documents* points at the
   brochure until the documents are online.
4. **Weekly menu** (`#menu`) — tabs *Menu 01 … Menu 06*: combinations, not days (no weekday names); each tab swaps
   the photo (55%) and the dish list (45%); phones scroll the tabs sideways.
5. **Gallery** (`#gallery`) — the kitchen gallery, unchanged, now a section of its own.

6 *From kitchen to office* and 7 *Support* were removed on 2026-11-23 (the eight service areas now live with the
enquiry form's copy, `site.enquiry.areas`).

8. **Enquiry** (`#enquiry`) — "Request a Corporate Quote" form, 45% information / 55% form (see *Enquiries* below).
9. **About** (`#about`) — "We take office lunch seriously" and what matters to us.
10. **Contact** (`#contact`) — phone (call / copy), contact person, kitchen address, website; then the footer.

On the page, 9 · 8 · 10 (about, the enquiry form, contact) come last, after the two earlier sections the owner
kept; the full order is: hero, trust, ingredients, menu, gallery, risks, brochure, about, enquiry, contact, footer.
The nav: Why us · Menu · About · Get a quote · Contact.

The two earlier sections the owner kept — risks vs. our rules (`#risks`, grey) and the brochure (`#brochure`, white) —
sit after the gallery, before about; each is one line in `src/App.tsx`. (The ingredients section's *View Supplier
Documents* button points at the brochure — re-point it in `Ingredients.tsx` before removing the brochure.) The rest of
the earlier layout (dish strip, 41.47% band, sourcing, day-by-day menu, premium dishes, quote panel, old about and
contact) was removed on 2026-11-22; sections 6 and 7 and the old process section (*কীভাবে কাজ করি / How we work*, with
its nav link and four illustrated icons) on 2026-11-23. All of it is in git history.

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
| `risks.ts` | the food-safety risks vs. our rules |
| `images.ts` | which photo each item uses (hero plate, ingredient photos, brochure renders) |
| `brochure.ts` | the tri-fold's panels: where each sits on its A4 side, and the phone viewer's reading order |
| `gallery.ts` | the kitchen gallery: each dish's photo, category, name, description and alt text |

Languages: the hero keeps the owner's title and buttons exactly as written on the Bangla page (a Bangla–English mix
with English buttons); its four highlights are Bangla there (ডেইলি কোয়ালিটি চেক · ফ্রেশ উপকরণ, ডেইলি সোর্সিং · কিচেন
ভিজিটের সুযোগ · দিনে ৫,০০০ মিল পর্যন্ত ক্যাপাসিটি) and English on the English page. Every other section is all Bangla
on the Bangla page (Bangla digits too: মেনু ০১) and all English on the English page — `npm run check` fails if
English words creep into the hero highlights or the sections after the hero on the Bangla page. Bangla wording: where
a pure-Bangla word would read stiffly or is rarely used, write the English word in Bangla script (কোয়ালিটি চেক,
সোর্সিং, ক্যাপাসিটি), keeping everyday Bangla words (প্রতিদিন, উপকরণ, সুযোগ). Strings written wholly in English get
`lang="en"` when shown (`langFor` in `src/lib/i18n.tsx`). The enquiry form shows the service areas in Bangla but
always sends the English names.

Inline markup in copy: `**text**` = orange accent, `==text==` = marker highlight that draws in.
Prices are not shown on the site: visitors ask for a quote through the enquiry form (section 8).

## Look
A pure white page. Orange is an accent (headings, rules, icons, small buttons), never a section fill, and
there are no dark sections. Tokens live in `src/index.css`:

- `paper` `#FFFFFF` page · `mist` `#F6F6F7` light grey band between white sections · `line` `#E8E8EB`
  (top to bottom: white hero, grey trust, white ingredients, grey menu, white gallery, grey risks, then white;
  where two white sections meet, the lower one starts with a `line` hairline — about, the enquiry form)
- `linen` `#FAF9F6` warm off-white (section 10, the enquiry form panel)
- `surface-glow` — soft orange-to-white wash (kept for highlight panels; unused since section 6 left)
- `surface-warm` — the same, slightly warmer (kept for feature panels)
- small orange text uses `orange-700`; large orange text `orange-600` (both pass WCAG AA on white)

## Kitchen gallery
Section 5: 22 photos, one best shot of each unique dish or platter the photographer shot,
with category filters. Tapping a photo opens it in a modal (photo, description underneath, ‹ › arrows;
arrow keys, Esc and swipe work). Add, remove or reword dishes in `src/content/gallery.ts`.

## Brochure
An A4-landscape tri-fold (roll fold) in English, laid out after the owner's first concept and their reviews, in the
logo's colours (orange #F36F21, black #231F20) with a warm cream, Jost set large, and the logo. Outside: *Let's plan
your office lunch* (cream: QR code to the website, contact) · *Before you decide* (solid orange, the back) · the cover
(black, a close-up of a steaming lunch box in front of an orange disc). Inside, on cream: *Built on better ingredients*
(bold headlines with a line of subtext, round icons, hairlines, over a wave of fresh produce) · *From kitchen to office*
(the kitchen photo across the whole panel, then four points) · *A reliable partner* (support and menus, then an orange
band — shaped as in the concept — with the delivery areas and a skyline).

- **Source:** `print/brochure/` — a page laid out in mm (`Trifold.tsx`, `trifold.css`, `Skyline.tsx`). Panel
  positions live in `src/content/brochure.ts`, shared with the site's viewer: the flap that folds in is 97 mm wide,
  the other panels 100 mm. Preview it with `npm run dev`, then open `/print/brochure/` (add `?mode=print` for the
  bleed and marks). It is not part of the site build.
- **Photos:** `print/brochure/assets/` — the cover's lunch box, the kitchen and the fresh ingredients (all generated with
  the OpenAI image tool — swap in real photos with the same framing when there are some), and the QR code, which opens
  the website (`https://www.toblakitchen.com`). The cover's black, its fade, the steam and the orange disc behind the
  box are baked into the photo, and the kitchen photo's fade too (no PDF transparency, so every viewer and print shop
  sees the same seamless edges); the produce wave is a vector clip. Re-make them with
  `python3 scripts/brochure/prepare-assets.py --meal-box <photo> --kitchen <photo> --ingredients <photo>` (the disc's
  position and the box's rim are constants at the top of that script, for the current cover photo).
- **Export:** `npm run brochure` (Chromium, poppler's `pdftocairo`, Python with Pillow and pikepdf) writes
  - `public/brochure/tobla-kitchen-brochure.pdf` — A4, 2 pages, real text in embedded Jost, photos at 240–300 dpi
    (about 1.3 MB): the main download
  - `public/brochure/tobla-kitchen-brochure-print.pdf` — for a print shop: 3 mm bleed, crop and fold marks,
    TrimBox and BleedBox set
  - `public/brochure/tobla-kitchen-brochure-{outside,inside}.svg` — vector artwork, one file per side (297 × 210 mm,
    text as outlines)
  - `src/assets/brochure/{outside,inside}.webp` (2400 px) and `panel-{cover,decide,kitchen}.webp` (520 px) — the
    site's previews

  If the PDF's size changes, update `site.brochure.meta`.
- **Printing:** A4 landscape, both sides, *flip on short edge*. With the inside facing up, fold the right panel (the
  97 mm flap) in first, then the left panel over it: the cover ends up on top.
- **On the site** (`#brochure`): fanned panels, a viewer (a whole side with zoom on desktop; on phones one panel at a
  time, in reading order), *Download PDF*, and the print files (print-ready PDF and the two SVGs). Links that name a
  section (`/#enquiry`) scroll to it once the page has rendered (`useScrollToHashOnLoad` in `src/lib/smooth-scroll.ts`).

## Language
Bangla is the default. The toggle at the top switches to English; the choice is remembered, and
`?lang=en` opens the English version directly.

## Imagery
- Source: the photographer's colour-corrected finals (152 JPEGs) in the shared Drive folder
  "Food Photography - Final Shots after color correction". They are not kept in the repo; download the
  ones listed in `scripts/export-photos.py` and run `python3 scripts/export-photos.py --src <folder>`
  (needs Pillow) to re-create the WebP files below.
- `src/assets/gallery/<dish>-{720,1200,1600}.webp` — the gallery photos (full 3:2 frame; tiles crop to 4:3).
- `src/assets/food/plate-hero-*.webp` — the hero's top-down plate (real dish photos composed on slate) until the owner's
  new hero image arrives; `dish-roast-520.webp` is used only by the construction gate.
- `src/assets/ingredients/<key>-{560,840}.webp` — the raw-ingredient photos on the sliding cards (3:2): generated with
  the OpenAI image tool in the photographer's style (slate, leaves, wood) as stand-ins; replace them with real
  sourcing photos when there are some.
- The logo is the original vector file, drawn inline in `src/components/brand/Logo.tsx`.

## Older design
The first design (AI plate photos, 4-week menu) is kept on the `design-v1` branch, in git only:
old.toblakitchen.com was removed from the Vercel project on 2026-11-23.

Design notes: `docs/superpowers/specs/2026-11-05-tobla-kitchen-website-design.md` (first build),
`2026-11-18-white-redesign-gallery-design.md` (white look, gallery), `2026-11-22-sections-1-6-design.md`
(the new page order) and `2026-11-24-trifold-brochure-design.md` (the tri-fold brochure).
