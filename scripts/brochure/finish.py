"""Finish the brochure PDFs and make the site's preview images (called by scripts/brochure/export.mjs).

    python3 -I scripts/brochure/finish.py <a4.pdf> <print.pdf> <tmp dir>

- both PDFs: document info (title, author, subject)
- the print PDF: TrimBox (the A4 page) and BleedBox (3 mm around it) inside the 12 mm slug, so a
  printer's software knows where to cut
- src/assets/brochure/{outside,inside}.webp: the two sides at 2400 px (the brochure viewer)
- src/assets/brochure/panel-{cover,decide,kitchen}.webp: single panels at 520 px (the fanned cards)
Needs pikepdf, Pillow and poppler's pdftocairo.
"""

import os
import subprocess
import sys

import pikepdf
from PIL import Image

ROOT = os.path.normpath(os.path.join(os.path.dirname(__file__), "..", ".."))
ASSETS = os.path.join(ROOT, "src", "assets", "brochure")

MM = 72 / 25.4  # points per mm
TRIM = (297, 210)
BLEED = 3
SLUG = 12  # trim offset from the page edge in the print PDF

PREVIEW_W = 2400
PANEL_W = 520
# (file, page index, left mm, width mm) — must match src/content/brochure.ts
PANELS = [("panel-cover", 0, 197, 100), ("panel-decide", 0, 97, 100), ("panel-kitchen", 1, 100, 100)]

INFO = {
    "/Title": "Tobla Kitchen — Corporate Lunch, Professionally Managed",
    "/Author": "Tobla Kitchen",
    "/Subject": "Tri-fold brochure (A4 landscape): corporate office lunch in Dhaka",
    "/Keywords": "Tobla Kitchen, corporate catering, office lunch, Dhaka, brochure",
}


def tag(pdf_path, boxes=False):
    with pikepdf.open(pdf_path, allow_overwriting_input=True) as pdf:
        for k, v in INFO.items():
            pdf.docinfo[k] = v
        if boxes:
            for page in pdf.pages:
                x0, y0, x1, y1 = [float(v) for v in page.mediabox]
                top = y1 - SLUG * MM  # measured from the top: Chromium may round the page height
                trim = [x0 + SLUG * MM, top - TRIM[1] * MM, x0 + (SLUG + TRIM[0]) * MM, top]
                bleed = [trim[0] - BLEED * MM, trim[1] - BLEED * MM, trim[2] + BLEED * MM, trim[3] + BLEED * MM]
                page.obj["/TrimBox"] = pikepdf.Array([round(v, 3) for v in trim])
                page.obj["/BleedBox"] = pikepdf.Array([round(v, 3) for v in bleed])
        pdf.save(pdf_path)


def render(pdf_path, tmp):
    dpi = PREVIEW_W / (TRIM[0] / 25.4)
    prefix = os.path.join(tmp, "side")
    subprocess.run(["pdftocairo", "-png", "-r", f"{dpi:.3f}", pdf_path, prefix], check=True)
    pages = sorted(f for f in os.listdir(tmp) if f.startswith("side") and f.endswith(".png"))
    size = (PREVIEW_W, round(PREVIEW_W * TRIM[1] / TRIM[0]))
    sides = []
    for name, f in zip(["outside", "inside"], pages):
        im = Image.open(os.path.join(tmp, f)).convert("RGB")
        if im.size != size:
            im = im.resize(size, Image.LANCZOS)
        sides.append(im)
        save_webp(im, f"{name}.webp", 84)
    px_per_mm = PREVIEW_W / TRIM[0]
    for name, page, left, width in PANELS:
        box = (round(left * px_per_mm), 0, round((left + width) * px_per_mm), sides[page].height)
        crop = sides[page].crop(box)
        crop = crop.resize((PANEL_W, round(PANEL_W * crop.height / crop.width)), Image.LANCZOS)
        save_webp(crop, f"{name}.webp", 84)


def save_webp(im, name, quality):
    path = os.path.join(ASSETS, name)
    im.save(path, "WEBP", quality=quality, method=6)
    print(f"  {os.path.relpath(path, ROOT):52s} {os.path.getsize(path) // 1024:>6} KB  {im.size[0]}×{im.size[1]}")


def main():
    a4, print_pdf, tmp = sys.argv[1:4]
    tag(a4)
    tag(print_pdf, boxes=True)
    os.makedirs(ASSETS, exist_ok=True)
    print("→ previews for the site")
    render(a4, tmp)


if __name__ == "__main__":
    main()
