/* Food photography: real dish photos, plus day plates composed from them (see docs). */

import heroL from "../assets/food/plate-hero-960.webp";
import heroS from "../assets/food/plate-hero-560.webp";
import satL from "../assets/food/plate-sat-960.webp";
import satS from "../assets/food/plate-sat-560.webp";
import sunL from "../assets/food/plate-sun-960.webp";
import sunS from "../assets/food/plate-sun-560.webp";
import monL from "../assets/food/plate-mon-960.webp";
import monS from "../assets/food/plate-mon-560.webp";
import tueL from "../assets/food/plate-tue-960.webp";
import tueS from "../assets/food/plate-tue-560.webp";
import wedL from "../assets/food/plate-wed-960.webp";
import wedS from "../assets/food/plate-wed-560.webp";
import thuL from "../assets/food/plate-thu-960.webp";
import thuS from "../assets/food/plate-thu-560.webp";

import prawnL from "../assets/food/dish-prawn-800.webp";
import prawnS from "../assets/food/dish-prawn-520.webp";
import fishL from "../assets/food/dish-fish-800.webp";
import fishS from "../assets/food/dish-fish-520.webp";
import roastL from "../assets/food/dish-roast-800.webp";
import roastS from "../assets/food/dish-roast-520.webp";
import muttonL from "../assets/food/dish-mutton-800.webp";
import muttonS from "../assets/food/dish-mutton-520.webp";
import beefL from "../assets/food/dish-beef-800.webp";
import beefS from "../assets/food/dish-beef-520.webp";

import iconChicken from "../assets/images/icon-chicken.webp";
import iconEggs from "../assets/images/icon-eggs.webp";
import iconBeef from "../assets/images/icon-beef.webp";
import iconFishVeg from "../assets/images/icon-fish-veg.webp";
import iconSpices from "../assets/images/icon-spices.webp";
import iconOilWater from "../assets/images/icon-oil-water.webp";
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

/** Round, top-down "plates" (square images; shown inside a circle). */
export type PlateKey = "hero" | "sat" | "sun" | "mon" | "tue" | "wed" | "thu";

export const PLATES: Record<PlateKey, { small: string; large: string; alt: L }> = {
  hero: {
    small: heroS,
    large: heroL,
    alt: {
      bn: "দুপুরের খাবারের টেবিল: সাদা ভাত, মুরগির তরকারি, রুই মাছ, ডাল আর সবজি",
      en: "A lunch table with rice, chicken curry, rui fish, dal and vegetables",
    },
  },
  sat: {
    small: satS,
    large: satL,
    alt: { bn: "শনিবারের খাবার: সাদা ভাত, মুরগির তরকারি, মিশ্র সবজি ও ডাল", en: "Saturday: rice, chicken curry, mixed vegetables and dal" },
  },
  sun: {
    small: sunS,
    large: sunL,
    alt: { bn: "রোববারের খাবার: সাদা ভাত, রুই মাছের তরকারি, মৌসুমি সবজি ও ডাল", en: "Sunday: rice, rui fish curry, seasonal vegetables and dal" },
  },
  mon: {
    small: monS,
    large: monL,
    alt: { bn: "সোমবারের খাবার: সাদা ভাত, গরুর ভুনা, ভাজি ও ডাল", en: "Monday: rice, beef bhuna, vegetable bhaji and dal" },
  },
  tue: {
    small: tueS,
    large: tueL,
    alt: { bn: "মঙ্গলবারের খাবার: পোলাও, মুরগির ঝোল, সবজি ও ডাল", en: "Tuesday: polao, chicken jhol, vegetables and dal" },
  },
  wed: {
    small: wedS,
    large: wedL,
    alt: { bn: "বুধবারের খাবার: খিচুড়ি, তেলাপিয়া মাছ, সিদ্ধ ডিম ও সবজি", en: "Wednesday: khichuri, tilapia fish, boiled eggs and vegetables" },
  },
  thu: {
    small: thuS,
    large: thuL,
    alt: { bn: "বৃহস্পতিবারের খাবার: সাদা ভাত, খাসির মাংস ভুনা, সবজি ও ডাল", en: "Thursday: rice, mutton bhuna, vegetables and dal" },
  },
};

export const plateSrcSet = (key: PlateKey) => `${PLATES[key].small} 560w, ${PLATES[key].large} 960w`;

/** Premium dish photos (4:3). */
export type DishKey = "prawn" | "fish" | "roast" | "mutton" | "beef";

export const DISH_PHOTOS: Record<DishKey, { small: string; large: string }> = {
  prawn: { small: prawnS, large: prawnL },
  fish: { small: fishS, large: fishL },
  roast: { small: roastS, large: roastL },
  mutton: { small: muttonS, large: muttonL },
  beef: { small: beefS, large: beefL },
};

export const dishSrcSet = (key: DishKey) => `${DISH_PHOTOS[key].small} 520w, ${DISH_PHOTOS[key].large} 800w`;

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
 * Section 6's photo: one real photo of quality check / packing / dispatch. Until there is one, the
 * section shows an illustrated stand-in. To add it: put the file in src/assets/, import it here and set
 * e.g. `{ src: opsPhoto, width: 1200, height: 1500, alt: { bn: "…", en: "…" } }`.
 */
export const OPS_PHOTO: { src: string; width: number; height: number; alt: L } | null = null;

export const ICONS = {
  chicken: iconChicken,
  eggs: iconEggs,
  beef: iconBeef,
  "fish-veg": iconFishVeg,
  spices: iconSpices,
  "oil-water": iconOilWater,
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
