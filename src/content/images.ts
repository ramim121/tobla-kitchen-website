/* Generated imagery (OpenAI image MCP), optimised to WebP. */

import thali560 from "../assets/images/plate-hero-thali-560.webp";
import thali960 from "../assets/images/plate-hero-thali-960.webp";
import polaoRoast560 from "../assets/images/plate-polao-roast-560.webp";
import polaoRoast960 from "../assets/images/plate-polao-roast-960.webp";
import tehari560 from "../assets/images/plate-tehari-560.webp";
import tehari960 from "../assets/images/plate-tehari-960.webp";
import beefCurry560 from "../assets/images/plate-beef-curry-560.webp";
import beefCurry960 from "../assets/images/plate-beef-curry-960.webp";
import jhalFry560 from "../assets/images/plate-jhal-fry-560.webp";
import jhalFry960 from "../assets/images/plate-jhal-fry-960.webp";
import friedRice560 from "../assets/images/plate-fried-rice-560.webp";
import friedRice960 from "../assets/images/plate-fried-rice-960.webp";
import fish560 from "../assets/images/plate-fish-bhuna-560.webp";
import fish960 from "../assets/images/plate-fish-bhuna-960.webp";
import khichuri560 from "../assets/images/plate-khichuri-560.webp";
import khichuri960 from "../assets/images/plate-khichuri-960.webp";

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

import type { L } from "../lib/i18n";

export type PlateKey = "thali" | "polaoRoast" | "tehari" | "beefCurry" | "jhalFry" | "friedRice" | "fish" | "khichuri";

export const PLATES: Record<PlateKey, { small: string; large: string; alt: L }> = {
  thali: {
    small: thali560,
    large: thali960,
    alt: { bn: "ভাত, মুরগির মাংস, ডাল, সবজি ও সালাদ", en: "Rice, chicken curry, dal, vegetables and salad" },
  },
  polaoRoast: {
    small: polaoRoast560,
    large: polaoRoast960,
    alt: { bn: "পোলাও, মুরগির রোস্ট ও সেদ্ধ ডিম", en: "Polao with chicken roast and a boiled egg" },
  },
  tehari: {
    small: tehari560,
    large: tehari960,
    alt: { bn: "গরুর মাংসের তেহারি ও সালাদ", en: "Beef tehari with salad" },
  },
  beefCurry: {
    small: beefCurry560,
    large: beefCurry960,
    alt: { bn: "সাদা ভাত, গরুর মাংস, ডাল ও সবজি", en: "Rice with beef curry, dal and vegetables" },
  },
  jhalFry: {
    small: jhalFry560,
    large: jhalFry960,
    alt: { bn: "সাদা ভাত, মুরগির ঝাল ফ্রাই ও সবজি", en: "Rice with chicken jhal fry and vegetables" },
  },
  friedRice: {
    small: friedRice560,
    large: friedRice960,
    alt: { bn: "ফ্রাইড রাইস, ফ্রাইড চিকেন ও চাইনিজ সবজি", en: "Fried rice, fried chicken and Chinese vegetables" },
  },
  fish: {
    small: fish560,
    large: fish960,
    alt: { bn: "রুই মাছ ও ডিম ভুনা, ভাত ও সবজি", en: "Rui fish and egg bhuna with rice and vegetables" },
  },
  khichuri: {
    small: khichuri560,
    large: khichuri960,
    alt: { bn: "ভুনা খিচুড়ি, গরুর রেজালা ও চাটনি", en: "Bhuna khichuri with beef rezala and chutney" },
  },
};

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

export const plateSrcSet = (key: PlateKey) => `${PLATES[key].small} 560w, ${PLATES[key].large} 960w`;
