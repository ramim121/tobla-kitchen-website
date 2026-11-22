# Sections 1–6 (new page order) — design

Date: 2026-11-22 · Status: built from the owner's section-by-section brief (screenshots + notes); sections
7–10 follow in the next round.

## Intent
The owner is re-arranging the site section by section, led by trust and consistency for corporate buyers:
a sharper hero, proof they can check themselves (kitchen visit, standards, free tasting), what goes into the
lunch, six named menu combinations, the real-photo gallery, and how food gets from kitchen to office.
Existing sections stay, moved below, until their new places are decided.

## What the owner asked for
1. **Hero** — new right-side image (to be supplied; current plate kept meanwhile); remove the two badges over
   the image; title "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না।" with "Consistency matters" in orange; buttons
   *Request Free Sample* and *Get Corporate Quote* side by side on one line; highlights Daily Quality Check ·
   Fresh Ingredients, Daily Sourcing · Kitchen Visit Available · Up to 5,000 Meals/Day Capacity, two per side.
2. **"Don't just take our word for it"** — as in the screenshot, in the site's fonts and colours; real kitchen /
   preparation / meal photos come later.
3. **Ingredients & sourcing** — cards sliding to the left; eight cards (chicken, eggs, fish, beef & mutton,
   vegetables, spices, oil, Nazirshail rice); existing or newly generated images.
4. **Weekly menu** — tabs Menu 01–06 (no weekday names); desktop photo 55% left / details 45% right; phones:
   sideways tabs, then photo, then dishes; a tab changes photo and details together; each combination editable;
   only real Tobla photos; combinations are not tied to days; substitutions follow the agreed meal plan, with
   dietary information available.
5. **Gallery** — as it is.
6. **From kitchen to office** — spec table: #FAF9F6, content ≤ 1200px, 55/45 columns, 48–56px gap, 80/48px
   padding, headline 36–44 / 28–32px, step headings 18–20px semi-bold, body 15–16px, charcoal #231F20 and
   orange #F36F21, thin light-grey dividers, one real operations photo with 12–16px corners.

## Owner's answers (asked before building)
- Bangla page: copy **exactly as written** (English headings/buttons, Bangla sentences with English words);
  English page fully translated.
- Hero: the old grey paragraph is **removed**.
- Both CTAs go to the **contact section** (the quote button to the "get a quote" panel).
- Menu 01–06: the **six brochure menus with real photos** until the final six are supplied.

## Approaches
- **Sliding cards:** (a) CSS marquee — simplest, but no drag/arrows and hover-only pause; (b) a snap carousel
  stepping one card at a time — readable but not "sliding"; (c) **continuous slide drawn by one animation loop
  over a duplicated strip**, with drag/swipe + fling, ‹ › arrows that land on a card, pause button (WCAG 2.2.2),
  pause on hover and keyboard focus, stopped off-screen, still for reduced motion. Picked (c).
- **Menu photos:** placeholders (as the mockup) vs. composite day plates vs. **real gallery photos of one dish
  from each menu, captioned "Pictured: …"** (accurate and real). Picked the last (owner agreed).
- **Section 6 photo:** no real operations photo exists yet; a generated one would misrepresent the kitchen, so an
  illustrated stand-in (cook pot → box → van icons) fills the slot; `OPS_PHOTO` in `images.ts` swaps in the
  real photo.

## Decisions (builder's calls)
- Section ids: `trust`, `ingredients`, `menu` (new), `gallery`, `kitchen-to-office`; the old day-by-day menu
  becomes `day-menu`. Nav keeps its six labels, re-pointed in page order: Why us → 2, Menu → 4,
  How we work → 6; old sections light no nav item.
- Background rhythm: hero white → 2 mist (white panel, as the mockup) → 3 white → 4 mist (white panel) →
  5 white → 6 linen (#FAF9F6, new `linen` token) → old sections as before.
- Headings of sections 2–6 share a "md" size (30 / 36 / 41.6px), meeting section 6's spec.
- English strings on the Bangla page get `lang="en"` (`langFor`), so eyebrows get English caps/tracking
  and screen readers switch language.
- Small orange text uses `orange-700` (AA); #F36F21 stays for icons, rules, the brush line and buttons.
- Copy fixes: "Nazirsher" → **Nazirshail**; "Organic Chicken" → **Organik Chicken** (the farm's name in the
  brochure); "Authentic Vendor" → "Authentic Vendors".
- *View Supplier Documents* → the brochure section until supplier documents are online.
- A short note under the menus covers substitutions and dietary information; each menu also has an optional
  `dietary` field.

## Open for the owner
- New hero image; real ingredient, kitchen, preparation, meal and operations photos; the final six menus.
- The kept sections overlap the new ones (the old day-by-day menu names weekdays; old sourcing and process
  repeat sections 3 and 6) — decide with sections 7–10.
- About says "1,000+ meals a day"; the hero now says "Up to 5,000 meals/day capacity".

## Round 2 — sections 7–10 (same day)
Owner's brief: 7 client support & feedback (spec: white, ≤ 1200px, 80/48px, intro ≤ 720px, full-width #FFF4EA
account-manager strip, three columns → stacked, subtle dividers, no animation, no button); 8 corporate lunch
enquiry (spec: white, 45/55, form on #FAF9F6 with white fields and an orange button, phones heading → text →
form → points, no photos, no animation; required company / person / phone / location / meals, optional start
date / email / budget / requirements, eight areas + Other, numeric meal count with no invented minimum,
validation, save + success message + notify the team, big tap targets and numeric keypads); 9 about and
10 contact as given; earlier sections kept below for removal; then commit and deploy. "Use your intelligence
to optimise, override or fix."

Decisions:
- **Where enquiries go:** no lead-management system was chosen, so each enquiry is saved to a new *private*
  Vercel Blob store (`tobla-enquiries`, connected to the project) — durable from day one, readable in the
  Vercel dashboard or as a CSV export (`LEADS_KEY`). Notifications are opt-in channels (Telegram, Resend email,
  generic webhook) because each needs the owner's own account. With nowhere to send, the API answers 503 and
  the form offers the phone number, so nothing is lost silently.
- **One set of rules** (`src/lib/enquiry.ts`) runs in the browser and in the function. Phone: Bangladeshi
  mobiles (01[3-9] + 8 digits) and landlines, +88 optional, Bangla digits accepted. Meals/budget: whole
  numbers 1–100,000. Start date: today (Dhaka) to two years ahead. Bots: hidden field + under 2.5s.
- **CTAs:** both hero buttons and the menu's button now open the form; "Request Free Sample" ticks a new
  optional "I'd like a free sample first" box (matches section 2's free tasting and the form's own
  "Free Sampling Available").
- **Section 10 heading** changed to "Prefer to Talk? Reach Our Team Directly." so it doesn't repeat section 8's
  "Let's Talk About Your Office Lunch.".
- Small orange labels use `orange-700` (#B5480C) for AA contrast; #F36F21 stays on the button, icons and rules.
- Nav: Why us · Menu · How we work · Get a quote · About · Contact (the brochure link left the nav; the brochure
  is among the sections to remove). Footer as in the screenshot: Home · Our Standards · Menus · About Us · Contact.
- The earlier About and Contact keep their content under `#about-old` / `#contact-old`.
- The colour check now treats `<button>`s as controls, not surfaces (the full-width orange submit button).

## Round 3 — languages
Owner: "Except for the hero section, keep the other sections' Bangla version as Bangla and English as English."
Sections 2–10, the form (labels, placeholders, errors, messages, area names, ৳) and the footer now read fully in
Bangla on the Bangla page, with Bangla digits; the English page is unchanged. The hero keeps the mixed copy.
A check guards it (no English words in sections 2–10 or the footer on the Bangla page).
