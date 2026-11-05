import type { L } from "../lib/i18n";

export type Severity = "critical" | "high" | "medium";
export const SEVERITIES: Severity[] = ["critical", "high", "medium"];

export type Risk = { id: string; severity: Severity; risk: L; typical: L; fix: L };

/** From the proposal's food-safety comparison, ranked by severity. */
export const RISKS: Risk[] = [
  {
    id: "stale",
    severity: "critical",
    risk: { bn: "বাসি খাবার আবার পরিবেশন", en: "Stale leftovers served again" },
    typical: {
      bn: "বাসি খাবার রেখে আবার বিক্রির জন্য ভ্রাম্যমাণ আদালত প্রায়ই জরিমানা করে।",
      en: "Mobile courts regularly fine eateries for keeping stale food and serving it again.",
    },
    fix: {
      bn: "প্রতিদিন সেদিনের লোকসংখ্যা অনুযায়ী টাটকা রান্না। রান্না করা খাবার পরের দিনে যায় না।",
      en: "Cooked fresh each day for that day's headcount. Cooked food never carries over.",
    },
  },
  {
    id: "dead-chicken",
    severity: "critical",
    risk: { bn: "মরা মুরগি ও অজানা উৎসের মাংস", en: "Dead chicken and meat of unknown origin" },
    typical: {
      bn: "পরিবহনের সময় মারা যাওয়া হাজারো মুরগি প্রতিদিন ঢাকায় ঢোকে, যার কিছু খাবারের দোকানে পৌঁছায়।",
      en: "Thousands of chickens die in transit to Dhaka every day, and some end up in eateries.",
    },
    fix: {
      bn: "সব মুরগি এক নির্দিষ্ট খামারের, হালাল জবাই। গরুর মাংস বিশ্বস্ত পার্টনারের, খোলা বাজারের নয়।",
      en: "All chicken from one named farm, halal-slaughtered. Beef from trusted partners, never open markets.",
    },
  },
  {
    id: "raw-cooked",
    severity: "critical",
    risk: { bn: "কাঁচা ও রান্না করা খাবার একসাথে রাখা", en: "Raw and cooked food stored together" },
    typical: {
      bn: "অভিযানে একই জায়গায় কাঁচা মাছ-মাংস আর রান্না করা খাবার পাওয়া গেছে।",
      en: "Inspections keep finding raw meat, fish and cooked food in the same storage.",
    },
    fix: {
      bn: "কাঁচা ও রান্না করা খাবার সবসময় আলাদা রাখা হয়।",
      en: "Raw and cooked food are always stored separately.",
    },
  },
  {
    id: "water",
    severity: "critical",
    risk: { bn: "দূষিত পানি", en: "Contaminated water" },
    typical: {
      bn: "২০২৫ সালের এক গবেষণায় সাভারের রেস্টুরেন্টের খাবার পানিতে ই-কোলাই পাওয়া গেছে।",
      en: "A 2025 study found E. coli in the drinking water at restaurants in Savar.",
    },
    fix: { bn: "সব রান্নায় ফিল্টার করা পানি ব্যবহার করা হয়।", en: "Filtered water is used for all cooking." },
  },
  {
    id: "hands",
    severity: "high",
    risk: { bn: "অপরিষ্কার হাত ও বাসনপত্র", en: "Unwashed hands and dirty utensils" },
    typical: {
      bn: "ঢাকার ১৫টি রেস্টুরেন্টে রাঁধুনিদের হাত ও বাসনের ৪৬.৭% নমুনায় ক্ষতিকর জীবাণু মিলেছে।",
      en: "46.7% of swabs from cooks' hands and utensils at 15 Dhaka restaurants grew harmful germs.",
    },
    fix: {
      bn: "অভিজ্ঞ কর্মীরা গ্লাভস, মাস্ক ও হেয়ারনেট পরে খাবার ধরেন।",
      en: "Experienced staff handle food wearing gloves, masks and hairnets.",
    },
  },
  {
    id: "eggs",
    severity: "high",
    risk: { bn: "পচা ডিম", en: "Rotten eggs" },
    typical: {
      bn: "রেস্টুরেন্টের নোংরা রান্নাঘরে পচা ডিমের বড় মজুত ধরা পড়েছে।",
      en: "Large stocks of rotten eggs have been found in restaurant kitchens.",
    },
    fix: {
      bn: "শুধু নির্দিষ্ট খামারের ওমেগা-৩ ডিম, সিল করা ডজনে।",
      en: "Only omega-3 free-range eggs from one named farm, in sealed dozens.",
    },
  },
  {
    id: "colour",
    severity: "high",
    risk: { bn: "খাবারে কাপড়ের রং", en: "Textile colour in food" },
    typical: {
      bn: "পোলাও ও জর্দায় কাপড়ের রং দেওয়ায় এক রেস্টুরেন্টকে ৪ লাখ টাকা জরিমানা করা হয়েছে।",
      en: "A restaurant was fined Tk 400,000 for using textile colour in polao and jorda.",
    },
    fix: { bn: "কোনো কৃত্রিম রং নয়। রং আসে মসলা থেকেই।", en: "No artificial colour. The colour comes from the spices." },
  },
  {
    id: "spices",
    severity: "high",
    risk: { bn: "ভেজাল গুঁড়া মসলা", en: "Adulterated spice powders" },
    typical: {
      bn: "হলুদে সীসাযুক্ত রং আর গুঁড়া মসলায় পোকা পাওয়া গেছে।",
      en: "Lead-based colour in turmeric and insects in spice powders have been found.",
    },
    fix: {
      bn: "আস্ত মসলা কিনে নিজেরাই পরিষ্কার করে গুঁড়া করি।",
      en: "Whole spices from trusted vendors, cleaned and ground in our kitchen.",
    },
  },
  {
    id: "loose-oil",
    severity: "high",
    risk: { bn: "খোলা ড্রামের ভেজাল তেল", en: "Adulterated loose cooking oil" },
    typical: {
      bn: "আট বিভাগের খোলা তেলের নমুনায় খাঁটি সয়াবিন বা পাম তেল মেলেনি।",
      en: "Loose oil samples from all eight divisions held no pure soybean or palm oil.",
    },
    fix: { bn: "শুধু ভালো মানের প্যাকেটজাত সয়াবিন তেল।", en: "Only best-quality packaged soybean oil." },
  },
  {
    id: "reused-oil",
    severity: "high",
    risk: { bn: "একই তেলে বারবার ভাজা", en: "Frying oil reused again and again" },
    typical: {
      bn: "রাজশাহীর ৩৮টির মধ্যে ২২টি হোটেলের ভাজার তেলে ক্ষতিকর উপাদান সীমার বেশি।",
      en: "22 of 38 hotels in Rajshahi had harmful compounds above safe limits in frying oil.",
    },
    fix: { bn: "তেল নিয়মিত বদলাই, বারবার ব্যবহার করি না।", en: "Oil is changed regularly and never reused again and again." },
  },
  {
    id: "pesticide",
    severity: "high",
    risk: { bn: "সবজিতে কীটনাশক", en: "Pesticide residue on vegetables" },
    typical: {
      bn: "বিএফএসএ-র জরিপে ৬০% সবজিতে অতিরিক্ত কীটনাশক পাওয়া গেছে।",
      en: "A BFSA survey found excessive pesticide residue in 60% of vegetables.",
    },
    fix: {
      bn: "প্রতিদিন টাটকা সবজি কিনে ফিল্টার করা পানিতে ধুয়ে নিই।",
      en: "Vegetables are bought fresh daily and washed in filtered water.",
    },
  },
  {
    id: "kitchen",
    severity: "high",
    risk: { bn: "নোংরা রান্নাঘর ও পোকামাকড়", en: "Dirty kitchens, fridges and pests" },
    typical: {
      bn: "এক জরিপে প্রতি ১০টি রেস্টুরেন্টের মাত্র ৪টি মান রক্ষা করতে পেরেছে।",
      en: "A BFSA survey found only 4 in 10 restaurants met quality standards.",
    },
    fix: {
      bn: "প্রতিদিন রান্নাঘর জীবাণুমুক্ত করা হয়, সরঞ্জাম সহজে পরিষ্কারযোগ্য।",
      en: "The kitchen is sanitized every day, with equipment that's easy to clean.",
    },
  },
  {
    id: "antibiotic",
    severity: "medium",
    risk: { bn: "ব্রয়লার মুরগিতে অ্যান্টিবায়োটিক", en: "Antibiotic residue in broiler chicken" },
    typical: {
      bn: "জাতীয় গবেষণায় বেশিরভাগ ব্রয়লার মাংসের নমুনায় অ্যান্টিবায়োটিকের অবশেষ পাওয়া গেছে।",
      en: "A national study found antibiotic residues in most broiler meat samples.",
    },
    fix: {
      bn: "শুধু অ্যান্টিবায়োটিক ও হরমোনমুক্ত ফ্রি-রেঞ্জ মুরগি।",
      en: "Only free-range chicken raised without antibiotics or hormones.",
    },
  },
  {
    id: "formalin",
    severity: "medium",
    risk: { bn: "মাছে ফরমালিন", en: "Formalin on fish" },
    typical: {
      bn: "ঢাকার মাছের নমুনার ৩৬.৮%-এ ফরমালিন পাওয়া গেছে।",
      en: "Formalin was found in 36.8% of fish samples in Dhaka.",
    },
    fix: {
      bn: "প্রতিদিন সেদিনের রান্নার জন্য টাটকা মাছ কিনি, জমিয়ে রাখি না।",
      en: "Fish is bought fresh each day for that day's cooking, never stored for days.",
    },
  },
  {
    id: "packaging",
    severity: "medium",
    risk: { bn: "পলিথিন, খবরের কাগজ বা ফোমে খাবার", en: "Food packed in polythene, newspaper or foam" },
    typical: {
      bn: "ছাপার কালি থেকে গরম, তেলতেলে খাবারে ভারী ধাতু মিশতে পারে।",
      en: "Printing ink can pass heavy metals into hot, oily food.",
    },
    fix: {
      bn: "বারবার ব্যবহারযোগ্য, বিপিএ-মুক্ত, ফুড-সেফ বাক্স।",
      en: "Reusable, BPA-free, food-safe containers.",
    },
  },
];
