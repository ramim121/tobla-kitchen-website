import type { L } from "../lib/i18n";
import type { PlateKey } from "./images";

/** Ingredient-source tags. */
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

/** The weekly office menu runs Saturday → Thursday (Friday off). */
export const DAY_KEYS = ["sat", "sun", "mon", "tue", "wed", "thu"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export const DAYS: Record<DayKey, { short: L; long: L }> = {
  sat: { short: { bn: "শনি", en: "Sat" }, long: { bn: "শনিবার", en: "Saturday" } },
  sun: { short: { bn: "রবি", en: "Sun" }, long: { bn: "রোববার", en: "Sunday" } },
  mon: { short: { bn: "সোম", en: "Mon" }, long: { bn: "সোমবার", en: "Monday" } },
  tue: { short: { bn: "মঙ্গল", en: "Tue" }, long: { bn: "মঙ্গলবার", en: "Tuesday" } },
  wed: { short: { bn: "বুধ", en: "Wed" }, long: { bn: "বুধবার", en: "Wednesday" } },
  thu: { short: { bn: "বৃহস্পতি", en: "Thu" }, long: { bn: "বৃহস্পতিবার", en: "Thursday" } },
};

/** Today's menu day; on Friday (no service) the menu opens on Saturday. */
export function todayKey(date = new Date()): { key: DayKey; isToday: boolean } {
  const byWeekday: (DayKey | null)[] = ["sun", "mon", "tue", "wed", "thu", null, "sat"]; // getDay(): 0 = Sunday
  const key = byWeekday[date.getDay()];
  return key ? { key, isToday: true } : { key: "sat", isToday: false };
}

export type Dish = { name: L; tags?: TagKey[]; main?: boolean; note?: L };
type DayMenu = { photo: PlateKey; dishes: Dish[] };

const d = (bn: string, en: string, ...tags: TagKey[]): Dish => ({ name: { bn, en }, tags });
const main = (dish: Dish): Dish => ({ ...dish, main: true });
const rice = d("সাদা ভাত", "Plain rice");
const dal = d("ডাল", "Dal");
const saladChutney = d("সালাদ ও চাটনি", "Salad & chutney");

/** From the weekly office menu in our brochure. */
export const MENU: Record<DayKey, DayMenu> = {
  sat: {
    photo: "sat",
    dishes: [rice, main(d("মুরগির তরকারি", "Chicken curry", "FR")), d("মিশ্র সবজি", "Mixed vegetables", "DS"), dal, saladChutney],
  },
  sun: {
    photo: "sun",
    dishes: [rice, main(d("রুই মাছের তরকারি", "Rui fish curry", "DS")), d("মৌসুমি সবজি", "Seasonal vegetables", "DS"), dal, saladChutney],
  },
  mon: {
    photo: "mon",
    dishes: [rice, main(d("গরুর ভুনা", "Beef bhuna", "AP")), d("ভাজি", "Vegetable bhaji", "DS"), dal, saladChutney],
  },
  tue: {
    photo: "tue",
    dishes: [d("পোলাও", "Polao"), main(d("মুরগির ঝোল", "Chicken jhol", "FR")), d("সবজি", "Vegetables", "DS"), dal, saladChutney],
  },
  wed: {
    photo: "wed",
    dishes: [
      d("খিচুড়ি", "Khichuri"),
      main(d("তেলাপিয়া মাছ", "Tilapia fish", "DS")),
      d("সিদ্ধ ডিম", "Boiled egg", "O3"),
      d("সবজি", "Vegetables", "DS"),
      saladChutney,
    ],
  },
  thu: {
    photo: "thu",
    dishes: [
      rice,
      {
        ...main(d("স্পেশাল মেনু", "Special of the week")),
        note: { bn: "ছবিতে: খাসির মাংস ভুনা", en: "Pictured: mutton bhuna" },
      },
      d("সবজি", "Vegetables", "DS"),
      dal,
      saladChutney,
    ],
  },
};
