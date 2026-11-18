/* The kitchen gallery: one best shot of each unique dish or platter from the photographer's
   colour-corrected finals (files exported by scripts/export-photos.py). */

import type { L } from "../lib/i18n";

export type GalleryCategory = "mains" | "rice" | "veg" | "platters";

export type GalleryItem = {
  key: string;
  category: GalleryCategory;
  name: L;
  text: L;
  alt: L;
  /** CSS object-position for the 4:3 tile crop of the 3:2 photo */
  focus: string;
  /** 720w (tiles) */
  small: string;
  /** 1200w */
  medium: string;
  /** 1600w */
  large: string;
  srcSet: string;
};

export const GALLERY_CATEGORIES: { key: "all" | GalleryCategory; label: L }[] = [
  { key: "all", label: { bn: "সব", en: "All" } },
  { key: "mains", label: { bn: "মাছ, মাংস ও ডিম", en: "Fish, meat & eggs" } },
  { key: "rice", label: { bn: "পোলাও, খিচুড়ি ও ডাল", en: "Rice dishes & dal" } },
  { key: "veg", label: { bn: "সবজি ও ভর্তা", en: "Vegetables & bharta" } },
  { key: "platters", label: { bn: "প্ল্যাটার", en: "Platters" } },
];

const FILES = import.meta.glob<string>("../assets/gallery/*.webp", { eager: true, import: "default" });

function file(key: string, width: 720 | 1200 | 1600) {
  const src = FILES[`../assets/gallery/${key}-${width}.webp`];
  if (!src) throw new Error(`gallery: missing src/assets/gallery/${key}-${width}.webp — run scripts/export-photos.py`);
  return src;
}

type Entry = Pick<GalleryItem, "key" | "category" | "name" | "text" | "alt"> & { focus?: string };

const ENTRIES: Entry[] = [
  // ── fish, meat & eggs ──
  {
    key: "prawn",
    category: "mains",
    name: { bn: "গলদা চিংড়ি ভুনা", en: "Galda prawn bhuna" },
    text: {
      bn: "বড় গলদা চিংড়ি, পেঁয়াজ আর ঘরে ভাঙা মসলায় ধীরে ভুনা।",
      en: "Big river prawns, slow-cooked with onion and our own ground spices.",
    },
    alt: { bn: "ডিম্বাকার সাদা প্লেটে তিনটি গলদা চিংড়ি ভুনা", en: "Three galda prawns in bhuna masala on an oval white plate" },
  },
  {
    key: "rui",
    category: "mains",
    name: { bn: "রুই মাছের কালিয়া", en: "Rui fish kalia" },
    text: { bn: "ভাজা রুই মাছের বড় পিস, ঘন মসলাদার ঝোলে।", en: "A thick fried rui steak in a rich, spiced gravy." },
    alt: { bn: "সাদা প্লেটে লাল ঝোলে রুই মাছের কালিয়া", en: "Rui fish kalia in red gravy on a white plate" },
  },
  {
    key: "roast",
    category: "mains",
    name: { bn: "মুরগির রোস্ট", en: "Chicken roast" },
    text: {
      bn: "ফ্রি-রেঞ্জ মুরগির বিয়েবাড়ির স্বাদের রোস্ট, ওপরে বেরেস্তা।",
      en: "Wedding-style roast with free-range chicken, topped with crispy fried onion.",
    },
    alt: { bn: "ডিম্বাকার প্লেটে বেরেস্তা ছড়ানো মুরগির রানের রোস্ট", en: "A chicken leg roast topped with fried onion on an oval plate" },
  },
  {
    key: "chicken-curry",
    category: "mains",
    name: { bn: "মুরগির তরকারি", en: "Chicken curry" },
    text: { bn: "ফ্রি-রেঞ্জ মুরগি, ঘরোয়া মসলায় রান্না।", en: "Free-range chicken cooked in home-style spices." },
    alt: { bn: "বাঁশের ম্যাটের ওপর বাটিতে মুরগির তরকারি, ধনেপাতা দিয়ে", en: "A bowl of chicken curry with coriander on a bamboo mat" },
  },
  {
    key: "mutton",
    category: "mains",
    name: { bn: "খাসির মাংস ভুনা", en: "Mutton bhuna" },
    text: {
      bn: "হাড়সহ নরম খাসির মাংস, অনেকক্ষণ ধরে কষানো ঘন মসলায়।",
      en: "Tender mutton on the bone, slow-cooked in a thick masala.",
    },
    alt: {
      bn: "বাটিতে হাড়সহ খাসির মাংস ভুনা, কাঁচা মরিচ ও ধনেপাতা দিয়ে",
      en: "A bowl of mutton bhuna on the bone with green chilli and coriander",
    },
  },
  {
    key: "beef",
    category: "mains",
    name: { bn: "গরুর মাংস ভুনা", en: "Beef bhuna" },
    text: {
      bn: "বিশ্বস্ত উৎসের হাড় ছাড়া গরুর মাংস, ঘরোয়া কায়দায় ভুনা।",
      en: "Boneless beef from trusted partners, cooked the home-style bhuna way.",
    },
    alt: { bn: "সাদা বাটিতে গরুর মাংস ভুনা", en: "A white bowl of beef bhuna" },
  },
  {
    key: "beef-potato",
    category: "mains",
    name: { bn: "আলু দিয়ে গরুর মাংস", en: "Beef curry with potato" },
    text: { bn: "গরুর মাংস আর আলু, ঘরের মতো ঝোলে রান্না।", en: "Beef and potato, cooked in a home-style gravy." },
    alt: { bn: "বাটিতে আলু দিয়ে রান্না গরুর মাংসের ঝোল", en: "A bowl of beef and potato curry" },
  },
  {
    key: "egg",
    category: "mains",
    name: { bn: "ডিম ভুনা", en: "Egg bhuna" },
    text: { bn: "খামারের ওমেগা-৩ ডিম, ঘন মসলায় ভুনা।", en: "Omega-3 farm eggs in a thick, spiced masala." },
    alt: { bn: "বাটিতে তিনটি ডিম ভুনা", en: "A bowl of egg bhuna with three eggs" },
  },

  // ── rice dishes & dal ──
  {
    key: "polao",
    category: "rice",
    name: { bn: "পোলাও", en: "Polao" },
    text: { bn: "সুগন্ধি চালের পোলাও, ওপরে মচমচে বেরেস্তা।", en: "Fragrant polao rice topped with crispy fried onion." },
    alt: { bn: "সাদা প্লেটে বেরেস্তা ছড়ানো পোলাও", en: "Polao topped with fried onion on a white plate" },
  },
  {
    key: "khichuri",
    category: "rice",
    name: { bn: "ভুনা খিচুড়ি", en: "Bhuna khichuri" },
    text: {
      bn: "চাল আর ডাল একসঙ্গে মসলায় ভুনা, ওপরে বেরেস্তা।",
      en: "Rice and lentils cooked together in spices, topped with fried onion.",
    },
    alt: { bn: "সাদা প্লেটে হলুদ ভুনা খিচুড়ি", en: "Yellow bhuna khichuri on a white plate" },
  },
  {
    key: "tehari",
    category: "rice",
    name: { bn: "তেহারি", en: "Tehari" },
    text: {
      bn: "ছোট টুকরো মাংস দিয়ে রান্না সুগন্ধি তেহারি, সঙ্গে সালাদ।",
      en: "Fragrant rice cooked with small pieces of meat, served with salad.",
    },
    alt: { bn: "প্লেটে তেহারি, পাশে শসা-টমেটো-লেবুর সালাদ", en: "Tehari on a plate with a cucumber, tomato and lime salad" },
  },
  {
    key: "dal",
    category: "rice",
    name: { bn: "ডাল", en: "Dal" },
    text: { bn: "প্রতিদিনের পাতলা ডাল, ধনেপাতা দিয়ে।", en: "Everyday thin lentil dal with fresh coriander." },
    alt: { bn: "বাটিতে হলুদ পাতলা ডাল, পাশে শুকনো মরিচ", en: "A bowl of thin yellow dal with a dried chilli beside it" },
  },
  {
    key: "moong-dal",
    category: "rice",
    name: { bn: "সবজি দিয়ে মুগ ডাল", en: "Moong dal with vegetables" },
    text: {
      bn: "মুগ ডাল আর সবজি একসঙ্গে, শুকনো মরিচের ফোড়নে।",
      en: "Moong dal cooked with vegetables, tempered with dried chilli.",
    },
    alt: { bn: "কাঠের ওপর রাখা বাটিতে সবজি দিয়ে মুগ ডাল", en: "A bowl of moong dal with vegetables on a wooden board" },
  },

  // ── vegetables & bharta ──
  {
    key: "bharta",
    category: "veg",
    name: { bn: "রকমারি ভর্তা", en: "Assorted bharta" },
    text: {
      bn: "আলু, বেগুন, টমেটোসহ হাতে মাখা কয়েক রকম ভর্তা।",
      en: "Hand-mashed bharta — potato, aubergine, tomato and more.",
    },
    alt: { bn: "দুটি লম্বা প্লেটে চার রকম ভর্তা", en: "Four kinds of bharta on two long plates" },
  },
  {
    key: "lal-shak",
    category: "veg",
    name: { bn: "লাল শাক ভাজি", en: "Red amaranth stir-fry" },
    text: { bn: "আজকের বাজারের টাটকা লাল শাক, হালকা ভাজা।", en: "Fresh red amaranth from today's market, lightly stir-fried." },
    alt: { bn: "সাদা বাটিতে লাল শাক ভাজি", en: "A white bowl of red amaranth stir-fry" },
  },
  {
    key: "okra",
    category: "veg",
    name: { bn: "ঢেঁড়স ভাজি", en: "Okra stir-fry" },
    text: { bn: "টাটকা ঢেঁড়স, হালকা মসলায় ভাজা।", en: "Fresh okra, lightly fried with mild spices." },
    alt: { bn: "সাদা বাটিতে ঢেঁড়স ভাজি", en: "A white bowl of okra stir-fry" },
  },
  {
    key: "mixed-veg",
    category: "veg",
    name: { bn: "মিশ্র সবজি", en: "Mixed vegetables" },
    text: { bn: "আলু, গাজর আর মৌসুমি সবজির হালকা রান্না।", en: "Potato, carrot and seasonal vegetables, lightly cooked." },
    alt: { bn: "বাটিতে আলু-গাজরের মিশ্র সবজি", en: "A bowl of mixed vegetables with potato and carrot" },
  },
  {
    key: "korola",
    category: "veg",
    name: { bn: "করলা ভাজি", en: "Bitter gourd stir-fry" },
    text: { bn: "পাতলা করে কাটা টাটকা করলা ভাজি।", en: "Thin-sliced fresh bitter gourd, stir-fried." },
    alt: { bn: "সাদা বাটিতে করলা ভাজি", en: "A white bowl of bitter gourd stir-fry" },
  },

  // ── platters ──
  {
    key: "polao-platter",
    category: "platters",
    name: { bn: "পোলাও প্ল্যাটার", en: "Polao platter" },
    text: {
      bn: "পোলাও, মুরগির রোস্ট, ডিম আর গরুর মাংস ভুনা — সঙ্গে সালাদ।",
      en: "Polao with chicken roast, egg and beef bhuna, plus salad.",
    },
    alt: {
      bn: "এক প্লেটে পোলাও, মুরগির রোস্ট, ডিম, গরুর মাংস ও সালাদ",
      en: "One plate of polao, chicken roast, egg, beef bhuna and salad",
    },
  },
  {
    key: "khichuri-platter",
    category: "platters",
    name: { bn: "খিচুড়ি প্ল্যাটার", en: "Khichuri platter" },
    text: {
      bn: "ভুনা খিচুড়ি, গরুর মাংস ভুনা আর ডিম ভুনা — সঙ্গে সালাদ।",
      en: "Bhuna khichuri with beef bhuna, egg bhuna and salad.",
    },
    alt: { bn: "এক প্লেটে খিচুড়ি, গরুর মাংস, ডিম ভুনা ও সালাদ", en: "One plate of khichuri, beef, egg bhuna and salad" },
  },
  {
    key: "bharta-platter",
    category: "platters",
    name: { bn: "খিচুড়ি-ভর্তা প্ল্যাটার", en: "Khichuri & bharta platter" },
    text: {
      bn: "খিচুড়ি, ডিম আর গরুর মাংসের সঙ্গে টমেটো ও বেগুন ভর্তা।",
      en: "Khichuri, egg and beef with tomato and aubergine bharta.",
    },
    alt: {
      bn: "প্লেটে খিচুড়ি, ডিম, গরুর মাংস, পাশে দুই রকম ভর্তা",
      en: "A plate of khichuri, egg and beef with two bhartas on the side",
    },
  },
  {
    key: "fish-platter",
    category: "platters",
    name: { bn: "ভাত-মাছের প্লেট", en: "Rice & fish plate" },
    text: {
      bn: "সাদা ভাত, মাছ ভাজা, মিশ্র সবজি, আলু ভর্তা আর ডাল।",
      en: "Rice, fried fish, mixed vegetables, aloo bharta and dal.",
    },
    alt: {
      bn: "প্লেটে ভাত, মাছ ভাজা, সবজি ও আলু ভর্তা, পাশে এক বাটি ডাল",
      en: "A plate of rice, fried fish, vegetables and aloo bharta, with a bowl of dal",
    },
  },
];

export const GALLERY: GalleryItem[] = ENTRIES.map((e) => {
  const small = file(e.key, 720);
  const medium = file(e.key, 1200);
  const large = file(e.key, 1600);
  return { ...e, focus: e.focus ?? "50% 50%", small, medium, large, srcSet: `${small} 720w, ${medium} 1200w, ${large} 1600w` };
});
