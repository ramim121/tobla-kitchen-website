import type { L } from "../lib/i18n";
import type { PlateKey } from "./images";

/** Ingredient-source tags from the proposal. */
export type TagKey = "FR" | "O3" | "AP" | "DS";

export const TAGS: Record<TagKey, { short: L; long: L }> = {
  FR: {
    short: { bn: "ফ্রি-রেঞ্জ", en: "Free-range" },
    long: { bn: "ফ্রি-রেঞ্জ মুরগি — অ্যান্টিবায়োটিক ও হরমোন ছাড়া", en: "Free-range chicken, no antibiotics or hormones" },
  },
  O3: {
    short: { bn: "ওমেগা-৩", en: "Omega-3" },
    long: { bn: "খামারের ফ্রি-রেঞ্জ ওমেগা-৩ ডিম", en: "Omega-3 free-range egg from the farm" },
  },
  AP: {
    short: { bn: "বিশ্বস্ত উৎস", en: "Trusted source" },
    long: { bn: "বিশ্বস্ত এগ্রো পার্টনারের গরুর মাংস", en: "Beef from trusted agro partners" },
  },
  DS: {
    short: { bn: "আজকের বাজার", en: "Fresh today" },
    long: { bn: "মাছ ও সবজি প্রতিদিন টাটকা কেনা", en: "Fish and vegetables bought fresh daily" },
  },
};

export const DAY_KEYS = ["mon", "tue", "wed", "thu", "fri", "satsun"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export const DAYS: Record<DayKey, { short: L; long: L }> = {
  mon: { short: { bn: "সোম", en: "Mon" }, long: { bn: "সোমবার", en: "Monday" } },
  tue: { short: { bn: "মঙ্গল", en: "Tue" }, long: { bn: "মঙ্গলবার", en: "Tuesday" } },
  wed: { short: { bn: "বুধ", en: "Wed" }, long: { bn: "বুধবার", en: "Wednesday" } },
  thu: { short: { bn: "বৃহস্পতি", en: "Thu" }, long: { bn: "বৃহস্পতিবার", en: "Thursday" } },
  fri: { short: { bn: "শুক্র", en: "Fri" }, long: { bn: "শুক্রবার", en: "Friday" } },
  satsun: { short: { bn: "শনি–রবি", en: "Sat–Sun" }, long: { bn: "শনি ও রবিবার", en: "Saturday & Sunday" } },
};

export function todayKey(date = new Date()): DayKey {
  const d = date.getDay(); // 0 Sun … 6 Sat
  return d === 0 || d === 6 ? "satsun" : DAY_KEYS[d - 1];
}

type Dish = { name: L; tags?: TagKey[] };
type DayMenu = { photo: PlateKey; dishes: Dish[] };

/* Reusable dishes */
const d = (bn: string, en: string, ...tags: TagKey[]): Dish => ({ name: { bn, en }, tags });
const rice = d("সাদা ভাত", "Plain rice");
const dal = d("ডাল", "Dal");
const salad = d("মৌসুমি সালাদ", "Seasonal salad", "DS");
const veg = d("সবজি", "Vegetables", "DS");
const fishThu = [
  rice,
  d("রুই মাছ ও ডিম ভুনা", "Rui fish & egg bhuna", "DS", "O3"),
  d("মৌসুমি সবজি / মিক্সড সবজি", "Seasonal veg / mixed veg", "DS"),
  d("মাছের মাথার মুড়িঘণ্ট", "Muri ghonto with fish head", "DS"),
  salad,
];
const weekend: DayMenu = {
  photo: "thali",
  dishes: [rice, d("মুরগির মাংস", "Chicken curry", "FR"), veg, dal, salad],
};
const dessert = d("পায়েস / ফিরনি / জর্দা / কোল্ড ড্রিংকস", "Payesh / Firni / Jorda / Cold drink");

export const MENU: Record<DayKey, DayMenu>[] = [
  // Week 1
  {
    mon: {
      photo: "polaoRoast",
      dishes: [
        d("পোলাও", "Polao"),
        d("গরুর রেজালা / মুরগির রোস্ট", "Beef rezala / Chicken roast", "AP", "FR"),
        salad,
        d("কোল্ড ড্রিংকস / বোরহানি / সেমাই / ফিরনি", "Cold drink / Borhani / Shemai / Firni"),
      ],
    },
    tue: {
      photo: "jhalFry",
      dishes: [rice, d("মুরগির ঝাল ফ্রাই ও সবজি", "Chicken jhal fry & vegetables", "FR", "DS"), dal, d("সালাদ", "Salad", "DS")],
    },
    wed: {
      photo: "beefCurry",
      dishes: [rice, d("গরুর মাংস / মুরগির ঝাল ফ্রাই", "Beef curry / Chicken jhal fry", "AP", "FR"), veg, dal, salad],
    },
    thu: { photo: "fish", dishes: fishThu },
    fri: {
      photo: "tehari",
      dishes: [
        d("গরুর তেহারি / পোলাও", "Beef tehari / Polao", "AP"),
        d("মুরগির রোস্ট ও সেদ্ধ ডিম", "Chicken roast & boiled egg", "FR", "O3"),
        salad,
        dessert,
      ],
    },
    satsun: weekend,
  },
  // Week 2
  {
    mon: {
      photo: "beefCurry",
      dishes: [rice, d("গরুর মাংস / মুরগির মাংস", "Beef curry / Chicken curry", "AP", "FR"), veg, dal, salad],
    },
    tue: {
      photo: "friedRice",
      dishes: [
        d("ফ্রাইড রাইস", "Fried rice"),
        d("ফ্রাইড চিকেন", "Fried chicken", "FR"),
        d("চাইনিজ সবজি", "Chinese vegetables", "DS"),
        d("কোল্ড ড্রিংকস", "Cold drink"),
      ],
    },
    wed: { photo: "thali", dishes: [rice, d("মুরগির মাংস", "Chicken curry", "FR"), veg, dal, salad] },
    thu: { photo: "fish", dishes: fishThu },
    fri: { photo: "tehari", dishes: [d("খাসির কাচ্চি", "Mutton kacchi"), salad, dessert] },
    satsun: weekend,
  },
  // Week 3
  {
    mon: {
      photo: "khichuri",
      dishes: [
        d("ভুনা খিচুড়ি", "Bhuna khichuri"),
        d("গরুর রেজালা / মুরগির মাংস", "Beef rezala / Chicken curry", "AP", "FR"),
        d("চাটনি", "Chutney"),
        salad,
        d("কোল্ড ড্রিংকস / বোরহানি / সেমাই", "Cold drink / Borhani / Shemai"),
      ],
    },
    tue: {
      photo: "jhalFry",
      dishes: [rice, d("মুরগির ঝাল ফ্রাই ও সবজি", "Chicken jhal fry & vegetables", "FR", "DS"), d("ডাল ও সালাদ", "Dal & salad", "DS")],
    },
    wed: {
      photo: "beefCurry",
      dishes: [rice, d("গরুর মাংস / মুরগির ঝাল ফ্রাই", "Beef curry / Chicken jhal fry", "AP", "FR"), veg, dal, salad],
    },
    thu: { photo: "fish", dishes: fishThu },
    fri: {
      photo: "friedRice",
      dishes: [d("ফ্রাইড রাইস", "Fried rice"), d("ফ্রাইড চিকেন", "Fried chicken", "FR"), d("চাইনিজ সবজি", "Chinese vegetables", "DS"), dessert],
    },
    satsun: weekend,
  },
  // Week 4
  {
    mon: {
      photo: "beefCurry",
      dishes: [rice, d("গরুর মাংস / মুরগির মাংস", "Beef curry / Chicken curry", "AP", "FR"), veg, dal, salad],
    },
    tue: {
      photo: "friedRice",
      dishes: [
        d("ফ্রাইড রাইস", "Fried rice"),
        d("ফ্রাইড চিকেন", "Fried chicken", "FR"),
        d("চাইনিজ সবজি", "Chinese vegetables", "DS"),
        d("কোল্ড ড্রিংকস", "Cold drink"),
      ],
    },
    wed: { photo: "jhalFry", dishes: [rice, d("মুরগির ঝাল ফ্রাই", "Chicken jhal fry", "FR"), veg, dal, salad] },
    thu: { photo: "fish", dishes: fishThu },
    fri: {
      photo: "polaoRoast",
      dishes: [d("পোলাও", "Polao"), d("মুরগির রোস্ট", "Chicken roast", "FR"), d("সেদ্ধ ডিম", "Boiled egg", "O3"), salad, dessert],
    },
    satsun: weekend,
  },
];
