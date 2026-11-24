"""Prepare the tri-fold brochure's print images and QR code (print/brochure/assets/).

The brochure is laid out in print/brochure/ and exported by scripts/brochure/export.mjs.
Run this first, only when a photo or the QR link changes (needs Pillow and segno):

    pip install pillow segno
    python3 scripts/brochure/prepare-assets.py --src /path/to/originals --kitchen /path/to/kitchen.png

  --src      folder with the photographer's colour-corrected originals (DSC02828.JPG, the fish
             platter on the cover; DSC02816.JPG, the polao platter on the back) — Drive: "Food
             Photography - Final Shots after color correction"
  --kitchen  the kitchen photo for the "From kitchen to office" panel (generated with the OpenAI
             image tool, 1536x1024 PNG; swap in a real kitchen photo when there is one)

Writes (JPEG, so Chromium embeds them as-is and the PDF stays small)
  print/brochure/assets/cover-plate.jpg     1800x1800, square around the plate (shown as a circle)
  print/brochure/assets/platter.jpg         1600x910, the polao platter for the back panel
  print/brochure/assets/kitchen.jpg         1536x1024
  print/brochure/assets/<ingredient>.jpg    840x560, from src/assets/ingredients/<key>-840.webp
  print/brochure/assets/qr.svg              QR code for the enquiry form (vector)
"""

import argparse
import os

from PIL import Image, ImageOps

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = os.path.join(ROOT, "print", "brochure", "assets")

# The cover: the fish platter (rice, fish fry, mixed vegetables, bharta) shot from above.
COVER = "DSC02828"
# centre and radius of the square crop, in original pixels (plate centre ~2120,2048; plate radius ~1640)
COVER_CROP = (2120, 2028, 1790)
COVER_SIZE = 1800

# The back panel ("Taste before you decide"): the polao platter, a wide crop around the plate.
PLATTER = "DSC02816"
PLATTER_CROP = (1950, 1300, 3500, 1990)  # centre x, centre y, width, height (original pixels)
PLATTER_SIZE = (1600, 910)

# the three photo tiles under the ingredients list
INGREDIENTS = ["chicken", "fish", "vegetables"]

# Opens the English page on the enquiry form (the site scrolls to #enquiry on load).
QR_URL = "https://www.toblakitchen.com/?lang=en#enquiry"


def save_jpeg(im, name, quality=88):
    path = os.path.join(OUT, name)
    im.save(path, "JPEG", quality=quality, optimize=True, progressive=True, subsampling="4:4:4")
    print(f"  {name:22s} {im.size[0]}x{im.size[1]}  {os.path.getsize(path) // 1024} KB")


def cover(src):
    im = ImageOps.exif_transpose(Image.open(os.path.join(src, f"{COVER}.JPG"))).convert("RGB")
    cx, cy, r = COVER_CROP
    box = (cx - r, cy - r, cx + r, cy + r)
    if box[0] < 0 or box[1] < 0 or box[2] > im.width or box[3] > im.height:
        raise SystemExit(f"cover crop {box} falls outside the {im.size} photo")
    save_jpeg(im.crop(box).resize((COVER_SIZE, COVER_SIZE), Image.LANCZOS), "cover-plate.jpg")


def platter(src):
    im = ImageOps.exif_transpose(Image.open(os.path.join(src, f"{PLATTER}.JPG"))).convert("RGB")
    cx, cy, w, h = PLATTER_CROP
    box = (cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2)
    if box[0] < 0 or box[1] < 0 or box[2] > im.width or box[3] > im.height:
        raise SystemExit(f"platter crop {box} falls outside the {im.size} photo")
    save_jpeg(im.crop(box).resize(PLATTER_SIZE, Image.LANCZOS), "platter.jpg")


def kitchen(path):
    im = Image.open(path).convert("RGB")
    if im.size != (1536, 1024):
        im = ImageOps.fit(im, (1536, 1024), Image.LANCZOS)
    save_jpeg(im, "kitchen.jpg", quality=90)


def ingredients():
    for key in INGREDIENTS:
        im = Image.open(os.path.join(ROOT, "src", "assets", "ingredients", f"{key}-840.webp")).convert("RGB")
        save_jpeg(im, f"{key}.jpg", quality=90)


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
    ap.add_argument("--src", required=True, help="folder with the DSC0xxxx.JPG originals")
    ap.add_argument("--kitchen", required=True, help="kitchen photo (PNG or JPEG)")
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    print(f"→ {os.path.relpath(OUT, ROOT)}")
    cover(args.src)
    platter(args.src)
    kitchen(args.kitchen)
    ingredients()
    qr()


if __name__ == "__main__":
    main()
