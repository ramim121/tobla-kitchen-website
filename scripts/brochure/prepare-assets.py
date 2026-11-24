"""Prepare the tri-fold brochure's print images and QR code (print/brochure/assets/).

The brochure is laid out in print/brochure/ and exported by scripts/brochure/export.mjs.
Run this first, only when a photo or the QR link changes (needs Pillow, numpy and segno):

    pip install pillow numpy segno
    python3 scripts/brochure/prepare-assets.py --meal-box meal-box.png \\
        --kitchen kitchen.png --ingredients ingredients.png

The three photos were generated with the OpenAI image tool (no real photos of these exist yet);
swap in real ones with the same framing when there are some:
  --meal-box     the cover: a close-up of a black compartment lunch box on a black ground, cut off by the
                 bottom and right edges, steam rising on the right (1024x1536)
  --kitchen      "From Kitchen to Office": cooks in hairnets, masks and gloves (1536x1024)
  --ingredients  "Built on Better Ingredients": fresh produce and whole spices on dark slate (1536x1024)

Writes (JPEG, so Chromium embeds them as-is and the PDF stays small)
  print/brochure/assets/meal-box.jpg      black shifted to the cover's #231F20, the top fading into it, and the
                                          orange disc drawn in behind the box with the steam in front of it
  print/brochure/assets/kitchen.jpg       foot fading into the middle panel's #FBF7F1
  print/brochure/assets/ingredients.jpg   as it is (the layout cuts it with a wave)
  print/brochure/assets/qr.svg            QR code for the website (vector)
Everything is baked into the photos — no PDF transparency — so every viewer and print shop sees the same
seamless edges.
"""

import argparse
import os

import numpy as np
from PIL import Image, ImageOps

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "print", "brochure", "assets")

INK = np.array([0x23, 0x1F, 0x20], dtype=np.float32)  # the cover (logo black)
ORANGE = np.array([0xF3, 0x6F, 0x21], dtype=np.float32)  # logo orange
CREAM_LIGHT = np.array([0xFB, 0xF7, 0xF1], dtype=np.float32)  # inside middle panel
LUM = np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)

# The cover photo is placed 108 mm wide, its top 66 mm down the cover (Trifold.tsx › CoverMealBox). The orange
# disc behind the box: centre and radius in mm from the photo's top-left, drawn only above the box's back rim
# (a line through two points, in pixels of this photo) so the box stays in front of it.
MEAL_BOX_WIDTH_MM = 108
DISC_MM = (117, 46, 30)
BOX_RIM_PX = ((780, 606), (1024, 616))
STEAM_FADE = 0.2  # the top fifth fades into the cover's black, so the steam rises out of the page
STEAM_BOOST = 1.6  # the steam above the box, made a little stronger so it reads in print

# Scanning the QR code opens the website.
QR_URL = "https://www.toblakitchen.com"


def save_jpeg(im, name, quality=90):
    path = os.path.join(OUT, name)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True, subsampling="4:4:4")
    print(f"  {name:22s} {im.size[0]}x{im.size[1]}  {os.path.getsize(path) // 1024} KB")


def to_image(px):
    return Image.fromarray(np.clip(px, 0, 255).astype(np.uint8))


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def ground_color(px, boxes):
    return np.concatenate([px[y0:y1, x0:x1].reshape(-1, 3) for (x0, y0, x1, y1) in boxes]).mean(0)


def fade(px, color, start, end):
    """Blend rows into `color`, fully at `start` and not at all at `end` (fractions of the height; start > end
    fades the foot)."""
    h = px.shape[0]
    y = (np.arange(h, dtype=np.float32) + 0.5) / h
    weight = 1 - smoothstep(start, end, y) if start < end else smoothstep(end, start, y)
    return px + weight[:, None, None] * (color - px)


def meal_box(path):
    px = np.asarray(Image.open(path).convert("RGB"), dtype=np.float32)
    h, w, _ = px.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    (x0, y0), (x1, y1) = BOX_RIM_PX
    rim = y0 + (xx - x0) * (y1 - y0) / (x1 - x0)  # the box's back rim, carried across the photo
    # the black ground (sampled in the top-left corner, where there is no steam) becomes the cover's black with
    # a screen blend, which keeps the steam's contrast (shifting only the dark pixels would halve it)
    ground = ground_color(px, [(20, 20, 200, 200)])
    px = np.clip((px - ground) / (255 - ground), 0, 1) * 255
    px = 255 - (255 - px) * (255 - INK) / 255
    # make the steam above the box read clearly, then fade the top into the cover's black
    steam = np.clip(px - INK, 0, None)
    above = 1 - smoothstep(rim - 30, rim - 4, yy)
    px = px + (STEAM_BOOST - 1) * steam * above[..., None]
    px = fade(px, INK, 0.0, STEAM_FADE)
    # the orange disc behind the box: whatever lies above the black (the steam) is added on top of the orange
    s = w / MEAL_BOX_WIDTH_MM
    cx, cy, r = (v * s for v in DISC_MM)
    inside = np.clip(r - np.hypot(xx - cx, yy - cy) + 0.5, 0, 1)
    cover = (inside * (1 - smoothstep(rim - 8, rim, yy)))[..., None]
    steam = np.clip(px - INK, 0, None)
    px = px * (1 - cover) + cover * np.clip(ORANGE + steam, 0, 255)
    save_jpeg(to_image(px), "meal-box.jpg")


def kitchen(path):
    im = ImageOps.fit(Image.open(path).convert("RGB"), (1536, 1024), Image.LANCZOS)
    px = fade(np.asarray(im, dtype=np.float32), CREAM_LIGHT, 1.0, 0.8)  # melts into the panel at its foot
    save_jpeg(to_image(px), "kitchen.jpg")


def ingredients(path):
    save_jpeg(ImageOps.fit(Image.open(path).convert("RGB"), (1536, 1024), Image.LANCZOS), "ingredients.jpg")


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
