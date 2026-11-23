/* Images: the hero plate, the ingredient photos, icons and the brochure renders. */

import heroL from "../assets/food/plate-hero-960.webp";
import heroS from "../assets/food/plate-hero-560.webp";


import iconMarket from "../assets/images/icon-market.webp";
import iconCook from "../assets/images/icon-cook.webp";
import iconPack from "../assets/images/icon-pack.webp";
import iconDeliver from "../assets/images/icon-deliver.webp";

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

import brochureOutside from "../assets/brochure/page-1.webp";
import brochureInside from "../assets/brochure/page-2.webp";
import brochureCover from "../assets/brochure/thumb-p1-3.webp";
import brochureAbout from "../assets/brochure/thumb-p2-1.webp";
import brochureSource from "../assets/brochure/thumb-p2-2.webp";

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

/** Illustrated icons for the process steps (market → cook → pack → deliver). */
export const ICONS = {
  market: iconMarket,
  cook: iconCook,
  pack: iconPack,
  deliver: iconDeliver,
} as const;

export type IconKey = keyof typeof ICONS;

/** Brochure renders: two A4-landscape spreads (2400×1697) and three panel thumbnails. */
export const BROCHURE = {
  pages: { outside: brochureOutside, inside: brochureInside },
  pageSize: { w: 2400, h: 1697 },
  thumbs: { cover: brochureCover, about: brochureAbout, source: brochureSource },
} as const;
