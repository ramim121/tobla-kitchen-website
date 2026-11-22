/*
 * Section 4: the six office-lunch combinations, shown as "Menu 01" … "Menu 06".
 *
 * They are combinations, not days: the six run across Saturday–Thursday in no fixed order, so nothing
 * here (or on the page) ties a menu to a weekday. Each one is edited on its own — change the dishes,
 * the photo or the order freely; the tabs follow this list.
 *
 * For now these are the six lunch menus from the brochure. Each photo is a real Tobla Kitchen photo of
 * one dish from that menu (from the gallery, src/content/gallery.ts); the page names the dish it shows
 * ("Pictured: …"). When a photo of the whole meal exists, add it to the gallery (or import it) and point
 * `photo` at it.
 */

import type { L } from "../lib/i18n";
import { GALLERY, type GalleryItem } from "./gallery";

export type LunchMenuItem = {
  name: L;
  /** the main dish — shown a little stronger */
  main?: boolean;
  note?: L;
};

export type LunchMenu = {
  /** a real photo from the gallery, by its key */
  photo: GalleryItem;
  items: LunchMenuItem[];
  /** optional: dietary information for this menu (allergens, spice level, …), shown under the dishes */
  dietary?: L;
};

function galleryPhoto(key: string): GalleryItem {
  const photo = GALLERY.find((g) => g.key === key);
  if (!photo) throw new Error(`lunch-menus: no gallery photo "${key}" (see src/content/gallery.ts)`);
  return photo;
}

const item = (bn: string, en: string, extra: Partial<LunchMenuItem> = {}): LunchMenuItem => ({ name: { bn, en }, ...extra });
const rice = item("সাদা ভাত", "Plain rice");
const dal = item("ডাল", "Dal");
const saladChutney = item("সালাদ ও চাটনি", "Salad & chutney");

export const LUNCH_MENUS: LunchMenu[] = [
  {
    photo: galleryPhoto("chicken-curry"),
    items: [rice, item("মুরগির তরকারি", "Chicken curry", { main: true }), item("মিশ্র সবজি", "Mixed vegetables"), dal, saladChutney],
  },
  {
    photo: galleryPhoto("rui"),
    items: [rice, item("রুই মাছের তরকারি", "Rui fish curry", { main: true }), item("মৌসুমি সবজি", "Seasonal vegetables"), dal, saladChutney],
  },
  {
    photo: galleryPhoto("beef"),
    items: [rice, item("গরুর ভুনা", "Beef bhuna", { main: true }), item("ভাজি", "Vegetable bhaji"), dal, saladChutney],
  },
  {
    photo: galleryPhoto("polao"),
    items: [item("পোলাও", "Polao"), item("মুরগির ঝোল", "Chicken jhol", { main: true }), item("সবজি", "Vegetables"), dal, saladChutney],
  },
  {
    photo: galleryPhoto("khichuri"),
    items: [item("খিচুড়ি", "Khichuri"), item("তেলাপিয়া মাছ", "Tilapia fish", { main: true }), item("সিদ্ধ ডিম", "Boiled egg"), item("সবজি", "Vegetables"), saladChutney],
  },
  {
    photo: galleryPhoto("mutton"),
    items: [rice, item("স্পেশাল মেনু", "Special of the week", { main: true }), item("সবজি", "Vegetables"), dal, saladChutney],
  },
];
