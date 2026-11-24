"""Prepare the tri-fold brochure's print images and QR code (print/brochure/assets/).

The brochure is laid out in print/brochure/ and exported by scripts/brochure/export.mjs.
Run this first, only when a photo or the QR link changes (needs Pillow and segno):

    pip install pillow segno
    python3 scripts/brochure/prepare-assets.py --src /path/to/originals \\
        --kitchen /path/to/kitchen.png --ingredients /path/to/ingredients.png

  --src          folder with the photographer's colour-corrected originals (DSC02828.JPG, the fish
                 platter on the cover) — Drive: "Food Photography - Final Shots after color correction"
  --kitchen      the kitchen photo for "From kitchen to office" (generated with the OpenAI image
                 tool, 1536x1024; swap in a real kitchen photo when there is one)
  --ingredients  the raw-ingredients photo under "Better ingredients" (generated with the OpenAI
                 image tool in the style of the site's ingredient photos, 1536x1024)

Writes (JPEG, so Chromium embeds them as-is and the PDF stays small)
  print/brochure/assets/cover-plate.jpg   1800x1800, square around the plate (shown as a circle)
  print/brochure/assets/kitchen.jpg       1536x1024
  print/brochure/assets/ingredients.jpg   1536x1024
  print/brochure/assets/qr.svg            QR code for the website (vector)
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

# Scanning the QR code opens the website.
QR_URL = "https://www.toblakitchen.com"


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


def photo(path, name):
    im = Image.open(path).convert("RGB")
    if im.size != (1536, 1024):
        im = ImageOps.fit(im, (1536, 1024), Image.LANCZOS)
    save_jpeg(im, name, quality=90)


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
    ap.add_argument("--ingredients", required=True, help="raw-ingredients photo (PNG or JPEG)")
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    print(f"→ {os.path.relpath(OUT, ROOT)}")
    cover(args.src)
    photo(args.kitchen, "kitchen.jpg")
    photo(args.ingredients, "ingredients.jpg")
    qr()


if __name__ == "__main__":
    main()
