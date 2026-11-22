"""Export the photographer's colour-corrected finals into the website's WebP images.

The originals (152 JPEGs, ~7 MB each) live in the shared Drive folder
"Food Photography - Final Shots after color correction" and are NOT kept in this repo.
Download the files named below into one folder, then run (needs Pillow):

    python3 scripts/export-photos.py --src /path/to/originals

Writes
  src/assets/gallery/<key>-{720,1200,1600}.webp  full 3:2 frame (the gallery crops tiles in CSS)

To add or swap a gallery photo: change GALLERY below, re-run, then edit src/content/gallery.ts.
"""

import argparse
import os

from PIL import Image, ImageOps

# one best shot per unique dish (near-identical repeats left out)
GALLERY = {
    "prawn": "DSC02807",
    "rui": "DSC02794",
    "roast": "DSC02772",
    "chicken-curry": "DSC02787",
    "mutton": "DSC02768",
    "beef": "DSC02754",
    "beef-potato": "DSC02899",
    "egg": "DSC02841",
    "polao": "DSC02903",
    "khichuri": "DSC02908",
    "tehari": "DSC02834",
    "dal": "DSC02882",
    "moong-dal": "DSC02891",
    "bharta": "DSC02851",
    "lal-shak": "DSC02863",
    "okra": "DSC02866",
    "mixed-veg": "DSC02872",
    "korola": "DSC02878",
    "polao-platter": "DSC02816",
    "khichuri-platter": "DSC02812",
    "bharta-platter": "DSC02823",
    "fish-platter": "DSC02828",
}
# width → byte budget. 720 covers grid tiles on retina screens (a 4:3 tile crops the 3:2 photo, so it
# needs ~1.13× the tile width); 1200/1600 serve the lightbox on phones / large and retina screens.
GALLERY_WIDTHS = {720: 120_000, 1200: 280_000, 1600: 440_000}


def load(src, name):
    im = Image.open(os.path.join(src, f"{name}.JPG"))
    return ImageOps.exif_transpose(im).convert("RGB")


def crop_to(im, ratio, focus=(0.5, 0.5)):
    """Largest crop of `ratio` (w/h) around `focus`, kept inside the image."""
    w, h = im.size
    cw, ch = (w, round(w / ratio)) if w / h <= ratio else (round(h * ratio), h)
    cw, ch = min(cw, w), min(ch, h)
    left = min(max(round(focus[0] * w - cw / 2), 0), w - cw)
    top = min(max(round(focus[1] * h - ch / 2), 0), h - ch)
    return im.crop((left, top, left + cw, top + ch))


def resized(im, size):
    # plain Lanczos: the finals are already sharp, and extra sharpening only inflates the files
    return im.resize(size, Image.LANCZOS)


def save_webp(im, path, budget=None, quality=78):
    while True:
        im.save(path, "WEBP", quality=quality, method=6)
        if budget is None or os.path.getsize(path) <= budget or quality <= 58:
            return quality
        quality -= 4


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--src", required=True, help="folder with the DSC0xxxx.JPG originals")
    ap.add_argument("--root", default=os.path.join(os.path.dirname(__file__), ".."), help="repo root")
    args = ap.parse_args()

    gdir = os.path.join(args.root, "src/assets/gallery")
    os.makedirs(gdir, exist_ok=True)

    for key, name in GALLERY.items():
        frame = crop_to(load(args.src, name), 3 / 2)
        for width, budget in GALLERY_WIDTHS.items():
            q = save_webp(resized(frame, (width, round(width * 2 / 3))), os.path.join(gdir, f"{key}-{width}.webp"), budget)
            print(f"gallery {key:17} {width:5}w  q{q}")


if __name__ == "__main__":
    main()
