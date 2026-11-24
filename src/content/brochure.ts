/* The tri-fold brochure's geometry — shared by the print layout (print/brochure/) and the site's
   brochure viewer (src/components/sections/Brochure.tsx), so the two always agree. */

import type { L } from "../lib/i18n";

export type BrochureSide = "outside" | "inside";

export type BrochurePanel = {
  id: "plan" | "decide" | "cover" | "ingredients" | "kitchen" | "partner";
  side: BrochureSide;
  /** left edge and width in mm on its A4 side */
  x: number;
  w: number;
  label: L;
};

/** A4 landscape, trimmed size in mm */
export const SHEET_MM = { w: 297, h: 210 } as const;

/**
 * Roll fold (letter fold): the flap that folds in — outside left, inside right — is 3 mm narrower,
 * so it tucks in without buckling. Folds sit at 97 / 197 mm on the outside, 100 / 200 mm inside.
 * Outside: the flap (seen first when the cover opens), the back, the cover.
 */
export const BROCHURE_PANELS: Record<BrochureSide, BrochurePanel[]> = {
  outside: [
    { id: "decide", side: "outside", x: 0, w: 97, label: { bn: "সিদ্ধান্তের আগে যাচাই করুন", en: "Before you decide" } },
    { id: "plan", side: "outside", x: 97, w: 100, label: { bn: "অফিস লাঞ্চের পরিকল্পনা ও যোগাযোগ", en: "Plan your office lunch & contact" } },
    { id: "cover", side: "outside", x: 197, w: 100, label: { bn: "প্রচ্ছদ", en: "Cover" } },
  ],
  inside: [
    { id: "ingredients", side: "inside", x: 0, w: 100, label: { bn: "ভালো উপকরণ", en: "Better ingredients" } },
    { id: "kitchen", side: "inside", x: 100, w: 100, label: { bn: "কিচেন থেকে অফিসে", en: "From kitchen to office" } },
    { id: "partner", side: "inside", x: 200, w: 97, label: { bn: "আপনার অফিসের নির্ভরযোগ্য পার্টনার", en: "A reliable partner" } },
  ],
};

/** Phones show one panel at a time, in the order a reader meets them: the cover, the flap behind it, the inside,
    the back. */
export const BROCHURE_READING_ORDER: BrochurePanel["id"][] = ["cover", "decide", "ingredients", "kitchen", "partner", "plan"];

export const brochurePanel = (id: BrochurePanel["id"]) =>
  [...BROCHURE_PANELS.outside, ...BROCHURE_PANELS.inside].find((p) => p.id === id)!;
