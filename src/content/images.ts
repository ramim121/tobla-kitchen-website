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
