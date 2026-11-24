"""Prepare the tri-fold brochure's print images and QR code (print/brochure/assets/).

The brochure is laid out in print/brochure/ and exported by scripts/brochure/export.mjs.
Run this first, only when a photo or the QR link changes (needs Pillow, numpy and segno):

    pip install pillow numpy segno
    python3 scripts/brochure/prepare-assets.py --meal-box meal-box.png \\
        --kitchen kitchen.png --ingredients ingredients.png

The three photos were generated with the OpenAI image tool (no real photos of these exist yet);
swap in real ones with the same framing when there are some:
  --meal-box     the cover: a black compartment lunch box on a black ground, steam rising (1024x1536)
  --kitchen      "From Kitchen to Office": cooks in hairnets, masks and gloves (1536x1024)
  --ingredients  "Built on Better Ingredients": fresh produce on a table, plain cream top half (1536x1024)

Writes (JPEG, so Chromium embeds them as-is and the PDF stays small)
  print/brochure/assets/meal-box.jpg      ground shifted to the cover's #231F20, top fading into it
  print/brochure/assets/kitchen.jpg       foot fading into the middle panel's #FBF7F1
  print/brochure/assets/ingredients.jpg   ground shifted to the panel's #F7EFE5, top fading into it
  print/brochure/assets/qr.svg            QR code for the website (vector)
Only the ground is shifted (blended by colour), so the food keeps its colours; the fades are baked in
(no PDF transparency), so the photos melt into the panels without a visible edge in any viewer.
"""

import argparse
import os

import numpy as np
from PIL import Image

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "print", "brochure", "assets")

INK = np.array([0x23, 0x1F, 0x20], dtype=np.float32)  # the cover (logo black)
CREAM = np.array([0xF7, 0xEF, 0xE5], dtype=np.float32)  # inside left panel
CREAM_LIGHT = np.array([0xFB, 0xF7, 0xF1], dtype=np.float32)  # inside middle panel

# Scanning the QR code opens the website.
QR_URL = "https://www.toblakitchen.com"


def save_jpeg(im, name, quality=90):
    path = os.path.join(OUT, name)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True, subsampling="4:4:4")
    print(f"  {name:22s} {im.size[0]}x{im.size[1]}  {os.path.getsize(path) // 1024} KB")


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def ground_color(px, corner_boxes):
    return np.concatenate([px[y0:y1, x0:x1].reshape(-1, 3) for (x0, y0, x1, y1) in corner_boxes]).mean(0)


def shift_ground(px, ground, target, weight):
    """Move the pixels `weight` (0..1 per pixel) of the way from `ground` to `target`."""
    return np.clip(px + weight[..., None] * (target - ground), 0, 255)


def fade(px, color, start, end):
    """Blend rows into `color`, fully at `start` and not at all at `end` (fractions of the height; start > end
    fades the foot). Baked into the photo, so the PDF needs no transparency and every viewer and RIP shows
    the same seamless edge."""
    h = px.shape[0]
    y = (np.arange(h, dtype=np.float32) + 0.5) / h
    if start < end:
        weight = 1 - smoothstep(start, end, y)
    else:
        weight = smoothstep(end, start, y)
    return px + weight[:, None, None] * (color - px)


def meal_box(path):
    im = Image.open(path).convert("RGB")
    px = np.asarray(im, dtype=np.float32)
    h, w, _ = px.shape
    ground = ground_color(px, [(10, 10, 90, 90), (w - 90, 10, w - 10, 90)])
    lum = px @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    weight = 1 - smoothstep(ground.mean() + 4, ground.mean() + 70, lum)  # the black ground and the darkest shadows
    px = shift_ground(px, ground, INK, weight)
    px = fade(px, INK, 0.0, 0.3)  # the steam rises out of the cover's black
    save_jpeg(Image.fromarray(np.clip(px, 0, 255).astype(np.uint8)), "meal-box.jpg")


def kitchen(path):
    im = Image.open(path).convert("RGB")
    px = fade(np.asarray(im, dtype=np.float32), CREAM_LIGHT, 1.0, 0.8)  # melts into the panel at its foot
    save_jpeg(Image.fromarray(np.clip(px, 0, 255).astype(np.uint8)), "kitchen.jpg")


def ingredients(path):
    im = Image.open(path).convert("RGB")
    px = np.asarray(im, dtype=np.float32)
    h, w, _ = px.shape
    ground = ground_color(px, [(100, 20, w - 100, 160)])
    # pixels close to the cream ground (in colour, not only brightness) take the panel's cream
    dist = np.linalg.norm(px - ground, axis=-1)
    weight = 1 - smoothstep(10, 45, dist)
    px = shift_ground(px, ground, CREAM, weight)
    px = fade(px, CREAM, 0.0, 0.45)  # no edge where the photo meets the panel
    save_jpeg(Image.fromarray(np.clip(px, 0, 255).astype(np.uint8)), "ingredients.jpg")


def qr():
    import segno

    code = segno.make(QR_URL, error="m", micro=False)
    rows = [list(r) for r in code.matrix]
    n = len(rows)
    # One filled path, 1 unit per module, no quiet zone (the layout adds the white margin). Each run of
    # dark modules is a rectangle 0.04 taller than a row, so rows overlap and no hairline seams show.
    runs = []
    for y, row in enumerate(rows):
        x = 0
        while x < n:
            if row[x]:
                start = x
                while x < n and row[x]:
                    x += 1
                runs.append(f"M{start} {y}h{x - start}v1.04h-{x - start}z")
            else:
                x += 1
    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges">'
        f'<path fill="#231F20" d="{"".join(runs)}"/></svg>\n'
    )
    with open(os.path.join(OUT, "qr.svg"), "w") as f:
        f.write(svg)
    print(f"  qr.svg                 version {code.version}, {n} modules → {QR_URL}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--meal-box", required=True, help="the cover's lunch-box photo")
    ap.add_argument("--kitchen", required=True, help="the kitchen photo")
    ap.add_argument("--ingredients", required=True, help="the fresh-ingredients photo")
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    print(f"→ {os.path.relpath(OUT, ROOT)}")
    meal_box(args.meal_box)
    kitchen(args.kitchen)
    ingredients(args.ingredients)
    qr()


if __name__ == "__main__":
    main()
