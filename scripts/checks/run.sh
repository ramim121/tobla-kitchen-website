#!/usr/bin/env bash
# Site checks — `npm run check`. Builds the site twice (normal + VITE_GATE=on) and checks:
#   gate.cjs      the gate switch (no gate code in normal builds; gated builds unlock correctly)
#   colours.cjs   no dark or orange sections / large surfaces; text contrast meets WCAG AA
#   assets.py     gallery + premium-card WebP files: present, exact sizes, within weight budgets
#   gallery.cjs   22 photos, category filters
#   lightbox.cjs  the photo modal: keys, arrows, swipe, wrap, focus, scroll lock, phones, English
#   history.cjs   phone Back closes the photo / brochure viewers instead of leaving the site
#   sections.cjs  sections 1–6: order, hero, sliding ingredient cards, Menu 01–06 tabs, the kitchen-to-office spec
# Needs Node with Playwright + Chromium, and Python 3 with Pillow (see README › Checks).
set -euo pipefail
cd "$(dirname "$0")/../.."
here=scripts/checks
gate_dist=$(mktemp -d)
trap 'rm -rf "$gate_dist"' EXIT

npm run build > "$gate_dist.build.log" 2>&1 || { cat "$gate_dist.build.log"; exit 1; }
VITE_GATE=on npx vite build --outDir "$gate_dist" --emptyOutDir > "$gate_dist.gate.log" 2>&1 || { cat "$gate_dist.gate.log"; exit 1; }
rm -f "$gate_dist.build.log" "$gate_dist.gate.log"

node $here/gate.cjs off dist
node $here/gate.cjs on "$gate_dist"
node $here/colours.cjs dist
python3 -I $here/assets.py
node $here/gallery.cjs dist
node $here/lightbox.cjs dist
node $here/history.cjs dist
node $here/sections.cjs dist
echo "All checks passed."
