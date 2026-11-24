/* Images: the hero plate, the ingredient photos and the brochure renders. */

import heroL from "../assets/food/plate-hero-960.webp";
import heroS from "../assets/food/plate-hero-560.webp";

import chickenL from "../assets/ingredients/chicken-840.webp";
import chickenS from "../assets/ingredients/chicken-560.webp";
import eggsL from "../assets/ingredients/eggs-840.webp";
import eggsS from "../assets/ingredients/eggs-560.webp";
import fishRawL from "../assets/ingredients/fish-840.webp";
import fishRawS from "../assets/ingredients/fish-560.webp";
import meatL from "../assets/ingredients/meat-840.webp";
import meatS from "../assets/ingredients/meat-560.webp";
import vegL from "../assets/ingredients/vegetables-840.webp";
import vegS from "../assets/ingredients/vegetables-560.webp";
import spicesL from "../assets/ingredients/spices-840.webp";
import spicesS from "../assets/ingredients/spices-560.webp";
import oilL from "../assets/ingredients/oil-840.webp";
import oilS from "../assets/ingredients/oil-560.webp";
import riceL from "../assets/ingredients/rice-840.webp";
import riceS from "../assets/ingredients/rice-560.webp";

import brochureOutside from "../assets/brochure/outside.webp";
import brochureInside from "../assets/brochure/inside.webp";
import brochureCover from "../assets/brochure/panel-cover.webp";
import brochureDecide from "../assets/brochure/panel-decide.webp";
import brochureKitchen from "../assets/brochure/panel-kitchen.webp";

import type { L } from "../lib/i18n";

/** The hero's round, top-down plate (square image, shown inside a circle). */
export const PLATES = {
  hero: {
    small: heroS,
    large: heroL,
    alt: {
      bn: "দুপুরের খাবারের টেবিল: সাদা ভাত, মুরগির তরকারি, রুই মাছ, ডাল আর সবজি",
      en: "A lunch table with rice, chicken curry, rui fish, dal and vegetables",
    } as L,
  },
} as const;

export const plateSrcSet = (key: keyof typeof PLATES) => `${PLATES[key].small} 560w, ${PLATES[key].large} 960w`;

/**
 * Raw-ingredient photos for the sliding cards in section 3 (3:2, 840/560 px). Generated stand-ins
 * in the photographer's style (slate, leaves, wood) — swap in real sourcing photos when they exist.
 */
export type IngredientKey = "chicken" | "eggs" | "fish" | "meat" | "vegetables" | "spices" | "oil" | "rice";

export const INGREDIENT_PHOTOS: Record<IngredientKey, { small: string; large: string }> = {
  chicken: { small: chickenS, large: chickenL },
  eggs: { small: eggsS, large: eggsL },
  fish: { small: fishRawS, large: fishRawL },
  meat: { small: meatS, large: meatL },
  vegetables: { small: vegS, large: vegL },
  spices: { small: spicesS, large: spicesL },
  oil: { small: oilS, large: oilL },
  rice: { small: riceS, large: riceL },
};

export const ingredientSrcSet = (key: IngredientKey) =>
  `${INGREDIENT_PHOTOS[key].small} 560w, ${INGREDIENT_PHOTOS[key].large} 840w`;

/**
 * Brochure renders, made from the PDF by `npm run brochure`: the two A4-landscape sides (2400×1697) and
 * three single panels, 520 px wide, for the fanned cards — the flap ("decide") is 97 mm wide, so its card is a
 * little taller. Panel positions: src/content/brochure.ts.
 */
export const BROCHURE = {
  pages: { outside: brochureOutside, inside: brochureInside },
  pageSize: { w: 2400, h: 1697 },
  thumbs: {
    cover: { src: brochureCover, w: 520, h: 1092 },
    decide: { src: brochureDecide, w: 520, h: 1126 },
    kitchen: { src: brochureKitchen, w: 520, h: 1092 },
  },
} as const;
