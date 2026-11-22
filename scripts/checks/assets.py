"""Asset check for the gallery and ingredient photos (run from the repo root; needs Pillow)."""
import os
import sys

from PIL import Image

KEYS = ("prawn rui roast chicken-curry mutton beef beef-potato egg polao khichuri tehari dal moong-dal "
        "bharta lal-shak okra mixed-veg korola polao-platter khichuri-platter bharta-platter fish-platter").split()
SIZES = {720: (720, 480, 120_000), 1200: (1200, 800, 280_000), 1600: (1600, 1067, 440_000)}
INGREDIENTS = ("chicken eggs fish meat vegetables spices oil rice").split()
INGREDIENT_SIZES = {840: (840, 560, 140_000), 560: (560, 373, 80_000)}

failures = 0


def check(ok, label, detail=""):
    global failures
    failures += 0 if ok else 1
    print(f"{'PASS' if ok else 'FAIL'}  {label}{'' if ok or not detail else '  — ' + detail}")


gallery = "src/assets/gallery"
present = set(os.listdir(gallery)) if os.path.isdir(gallery) else set()
expected = {f"{k}-{w}.webp" for k in KEYS for w in SIZES}
check(len(KEYS) == 22 and expected <= present, "22 dishes × 3 sizes exported", f"missing {len(expected - present)}")
check(not (present - expected), "no stray files in src/assets/gallery", ", ".join(sorted(present - expected)))

bad_dims, over = [], []
for k in KEYS:
    for w, (ew, eh, budget) in SIZES.items():
        p = f"{gallery}/{k}-{w}.webp"
        if not os.path.exists(p):
            continue
        im = Image.open(p)
        if im.size != (ew, eh) or im.format != "WEBP":
            bad_dims.append(f"{p} {im.size} {im.format}")
        if os.path.getsize(p) > budget:
            over.append(f"{p} {os.path.getsize(p) // 1000} KB > {budget // 1000} KB")
check(not bad_dims, "every gallery file is a WebP of the exact size", "; ".join(bad_dims[:5]))
check(not over, "gallery files within size budgets", "; ".join(over[:5]))

wrong = []
for k in INGREDIENTS:
    for w, (ew, eh, budget) in INGREDIENT_SIZES.items():
        p = f"src/assets/ingredients/{k}-{w}.webp"
        if not os.path.exists(p):
            wrong.append(f"{p} missing")
            continue
        im = Image.open(p)
        if im.size != (ew, eh) or im.format != "WEBP" or os.path.getsize(p) > budget:
            wrong.append(f"{p} {im.size} {im.format} {os.path.getsize(p) // 1000} KB")
check(not wrong, "eight ingredient photos: 3:2 WebP at 840/560 px, within budget", "; ".join(wrong))

print(f"\n{'all passed' if not failures else f'{failures} failed'}")
sys.exit(1 if failures else 0)
