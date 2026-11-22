/**
 * All page copy, Bangla first. Inline markup:
 *   **text**  → accent colour (headings)
 *   ==text==  → marker highlight that draws in on scroll
 */

export const CONTACT = {
  phoneDisplay: { bn: "০১৭১১ ৪০০ ১৫১", en: "01711 400 151" },
  phoneHref: "tel:+8801711400151",
  phoneRaw: "01711400151",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=17%2F5%20Kunipara%2C%20Tejgaon%2C%20Dhaka",
  website: "toblakitchen.com",
  brochurePdf: "/brochure/tobla-kitchen-brochure.pdf",
  brochureFileName: "Tobla-Kitchen-Brochure.pdf",
};

export const site = {
  meta: {
    title: {
      bn: "তবলা কিচেন — অফিসের খাবার, ঘরের মতো নিরাপদ",
      en: "Tobla Kitchen — Office food, as safe as home",
    },
    description: {
      bn: "ঢাকার অফিসগুলোর জন্য প্রতিদিনের দুপুর ও রাতের খাবার। ফ্রি-রেঞ্জ মুরগি, ঘরে ভাঙা মসলা আর ফিল্টার করা পানি — প্রতিটি উপকরণের উৎস আমাদের জানা।",
      en: "Daily lunch and dinner for corporate teams in Dhaka. Free-range chicken, spices ground in-house, filtered water — we know where every ingredient comes from.",
    },
  },

  brand: { bn: "তবলা কিচেন", en: "Tobla Kitchen" },

  nav: {
    items: [
      { id: "trust", label: { bn: "কেন আমরা", en: "Why us" } },
      { id: "menu", label: { bn: "মেনু", en: "Menu" } },
      { id: "kitchen-to-office", label: { bn: "কাজের ধাপ", en: "How we work" } },
      { id: "about", label: { bn: "আমাদের কথা", en: "About" } },
      { id: "brochure", label: { bn: "ব্রোশিওর", en: "Brochure" } },
      { id: "contact", label: { bn: "যোগাযোগ", en: "Contact" } },
    ],
    call: { bn: "কল করুন", en: "Call us" },
    skip: { bn: "মূল অংশে যান", en: "Skip to content" },
    openMenu: { bn: "মেনু খুলুন", en: "Open menu" },
    closeMenu: { bn: "মেনু বন্ধ করুন", en: "Close menu" },
    language: { bn: "ভাষা", en: "Language" },
    home: { bn: "তবলা কিচেন — শুরুতে যান", en: "Tobla Kitchen — back to top" },
  },

  /*
   * Sections 1–6 (hero → kitchen to office) use the owner's copy exactly as written for the Bangla page —
   * English headings and buttons, Bangla sentences with English words — and a full translation for the
   * English page. English-only strings get lang="en" when shown (langFor in src/lib/i18n.tsx).
   */
  hero: {
    eyebrow: { bn: "কর্পোরেট ক্যাটারিং · ঢাকা", en: "Corporate catering · Dhaka" },
    titleLead: { bn: "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না।", en: "For office lunch, one good day isn't enough." },
    titleAccent: { bn: "Consistency matters.", en: "Consistency matters." },
    /** → the contact section */
    primary: { bn: "Request Free Sample", en: "Request Free Sample" },
    /** → the "get a quote" panel */
    secondary: { bn: "Get Corporate Quote", en: "Get Corporate Quote" },
    /** two columns: the first two on the left, the last two on the right */
    points: [
      { bn: "Daily Quality Check", en: "Daily Quality Check" },
      { bn: "Fresh Ingredients, Daily Sourcing", en: "Fresh Ingredients, Daily Sourcing" },
      { bn: "Kitchen Visit Available", en: "Kitchen Visit Available" },
      { bn: "Up to 5,000 Meals/Day Capacity", en: "Up to 5,000 Meals/Day Capacity" },
    ],
    plateAlt: {
      bn: "দুপুরের খাবারের টেবিল: সাদা ভাত, মুরগির তরকারি, রুই মাছ, ডাল আর সবজি",
      en: "A lunch table with rice, chicken curry, rui fish, dal and vegetables",
    },
  },

  /** Section 2 — "Don't just take our word for it" */
  trust: {
    eyebrow: { bn: "Before You Choose Tobla Kitchen", en: "Before You Choose Tobla Kitchen" },
    title: { bn: "Don't Just Take Our Word for It.", en: "Don't Just Take Our Word for It." },
    items: [
      {
        key: "visit",
        title: { bn: "Visit the Kitchen", en: "Visit the Kitchen" },
        text: {
          bn: "আমাদের kitchen visit করুন। কোথায়, কী environment-এ আপনার অফিসের lunch তৈরি হবে, নিজেই দেখুন।",
          en: "Visit our kitchen and see for yourself where — and in what environment — your office lunch is prepared.",
        },
      },
      {
        key: "standards",
        title: { bn: "Understand the Standards", en: "Understand the Standards" },
        text: {
          bn: "Ingredients কোথা থেকে আসে, hygiene কীভাবে maintain করি আর daily quality check কীভাবে হয়, জেনে নিন।",
          en: "Find out where our ingredients come from, how we maintain hygiene and how our daily quality check works.",
        },
      },
      {
        key: "taste",
        title: { bn: "Taste Before You Decide", en: "Taste Before You Decide" },
        text: {
          bn: "Service শুরু করার আগে free tasting-এর সুযোগ আছে। খাবারের taste, portion আর quality নিজেই যাচাই করতে পারবেন।",
          en: "Before service begins, you can have a free tasting and judge the taste, portion size and quality yourself.",
        },
      },
    ],
  },

  /** Section 3 — ingredient cards that slide to the left (photos: src/content/images.ts › INGREDIENT_PHOTOS) */
  ingredients: {
    eyebrow: { bn: "Ingredients & Sourcing", en: "Ingredients & Sourcing" },
    title: { bn: "What Goes Into Your Office Lunch?", en: "What Goes Into Your Office Lunch?" },
    docs: { bn: "View Supplier Documents", en: "View Supplier Documents" },
    docsNote: {
      bn: "Chicken & Egg supplier details and related documents.",
      en: "Chicken & egg supplier details and related documents.",
    },
    items: [
      {
        key: "chicken",
        title: { bn: "Antibiotic-Free Chicken", en: "Antibiotic-Free Chicken" },
        text: {
          bn: "Antibiotic-free chicken from selected suppliers, including Organik Chicken.",
          en: "Antibiotic-free chicken from selected suppliers, including Organik Chicken.",
        },
        alt: { bn: "কাঠের বোর্ডে কাঁচা মুরগির বুকের মাংস ও রান", en: "Raw chicken breasts and drumsticks on a wooden board" },
      },
      {
        key: "eggs",
        title: { bn: "Omega-3 Eggs", en: "Omega-3 Eggs" },
        text: { bn: "Omega-3 eggs from our designated supplier.", en: "Omega-3 eggs from our designated supplier." },
        alt: {
          bn: "ঝুড়িভর্তি বাদামি ডিম, সামনের বাটিতে ভাঙা ডিমের গাঢ় কমলা কুসুম",
          en: "A basket of brown eggs, with one cracked into a bowl showing a deep orange yolk",
        },
      },
      {
        key: "fish",
        title: { bn: "Daily Fresh Fish", en: "Daily Fresh Fish" },
        text: {
          bn: "Fish daily market থেকে কেনা হয়। Frozen stock ব্যবহার করি না।",
          en: "Fish is bought fresh from the market every day. We never use frozen stock.",
        },
        alt: { bn: "বরফের ওপর দুটি টাটকা রুই মাছ", en: "Two fresh rui fish on crushed ice" },
      },
      {
        key: "meat",
        title: { bn: "Beef & Mutton from Authentic Vendors", en: "Beef & Mutton from Authentic Vendors" },
        text: {
          bn: "Beef ও mutton selected vendors থেকে নেওয়া হয়।",
          en: "Our beef and mutton come only from selected, trusted vendors.",
        },
        alt: {
          bn: "কাঠের বোর্ডে গরুর মাংসের টুকরা আর হাড়সহ খাসির মাংস",
          en: "Cubes of beef and bone-in mutton on a wooden board",
        },
      },
      {
        key: "vegetables",
        title: { bn: "Daily Fresh Vegetables", en: "Daily Fresh Vegetables" },
        text: {
          bn: "Vegetables daily market থেকে কেনা হয়। Frozen stock ব্যবহার করি না।",
          en: "Vegetables are bought fresh from the market every day — never from frozen stock.",
        },
        alt: {
          bn: "বাঁশের ঝুড়িতে বেগুন, টমেটো, ঢেঁড়স, লাউ, লাল শাক আর কাঁচা মরিচ",
          en: "Aubergines, tomatoes, okra, gourd, red amaranth and green chillies in a bamboo basket",
        },
      },
      {
        key: "spices",
        title: { bn: "In-house Ground Spices", en: "In-house Ground Spices" },
        text: {
          bn: "Ready-made spice mix নয়। Whole spices কিনে mill-এ grind করাই।",
          en: "No ready-made spice mixes. We buy whole spices and have them ground at the mill.",
        },
        alt: {
          bn: "বাটিতে জিরা, ধনে, শুকনা মরিচ, এলাচ, লবঙ্গ আর হলুদ-মরিচ-ধনের গুঁড়া",
          en: "Bowls of cumin, coriander, dried chillies, cardamom and cloves beside fresh turmeric, chilli and coriander powder",
        },
      },
      {
        key: "oil",
        title: { bn: "Branded Cooking Oil", en: "Branded Cooking Oil" },
        text: {
          bn: "Branded cooking oil ব্যবহার করি, reused oil নয়।",
          en: "We cook with branded cooking oil — never reused oil.",
        },
        alt: { bn: "সিল করা বোতলে সয়াবিন তেল, পাশে বাটিতে সোনালি তেল", en: "A sealed bottle of soybean oil beside a bowl of golden oil" },
      },
      {
        key: "rice",
        title: { bn: "Premium Nazirshail Rice", en: "Premium Nazirshail Rice" },
        text: {
          bn: "Quality rice ব্যবহার করি — premium Nazirshail চাল।",
          en: "We cook with quality rice — premium Nazirshail.",
        },
        alt: { bn: "কাঠের বাটি আর পাটের থলেতে লম্বা, সরু নাজিরশাইল চাল", en: "Long, slender Nazirshail rice in a wooden bowl and a jute sack" },
      },
    ],
    // carousel (screen readers + controls)
    carousel: { bn: "উপকরণ", en: "Ingredients" },
    carouselKind: { bn: "স্লাইডার", en: "carousel" },
    slideKind: { bn: "কার্ড", en: "slide" },
    prev: { bn: "আগের কার্ড", en: "Previous card" },
    next: { bn: "পরের কার্ড", en: "Next card" },
    pause: { bn: "স্লাইড থামান", en: "Pause the slides" },
    play: { bn: "স্লাইড চালু করুন", en: "Play the slides" },
  },

  /** Section 4 — Menu 01–06 (the combinations themselves: src/content/lunch-menus.ts) */
  weeklyMenu: {
    eyebrow: { bn: "Our Weekly Office Lunch Menu", en: "Our Weekly Office Lunch Menu" },
    title: { bn: "6 Menus. Different Combinations Throughout the Week.", en: "6 Menus. Different Combinations Throughout the Week." },
    lead: {
      bn: "৬টি different lunch combination, Saturday to Thursday। কোন menu কোন দিন যাবে সেটা fixed না—তবে প্রতিটি menu-তে কী কী থাকছে, সেটা আগে থেকেই জানা যাবে।",
      en: "Six different lunch combinations, Saturday to Thursday. Which menu goes out on which day isn't fixed — but you'll always know in advance exactly what each menu includes.",
    },
    tabs: { bn: "মেনু বাছুন", en: "Choose a menu" },
    /** tab label prefix: "Menu 01" … "Menu 06" (combinations, not days — no weekday names) */
    tab: { bn: "Menu", en: "Menu" },
    subtitle: { bn: "Complete meal combination", en: "Complete meal combination" },
    pictured: { bn: "ছবিতে", en: "Pictured" },
    note: {
      bn: "কোনো ingredient বদলাতে হলে তা আপনার agreed corporate meal plan অনুযায়ীই বদলায়। প্রতিটি menu-র dietary information চাইলেই পাবেন।",
      en: "Any ingredient substitution follows your agreed corporate meal plan. Dietary information for every menu is available on request.",
    },
    cta: { bn: "Request Free Sample", en: "Request Free Sample" },
  },

  /** Section 6 — from kitchen to office */
  kitchenToOffice: {
    eyebrow: { bn: "From Kitchen to Office", en: "From Kitchen to Office" },
    title: { bn: "A Good Menu Is Only Half the Job.", en: "A Good Menu Is Only Half the Job." },
    steps: [
      {
        key: "qc",
        label: { bn: "Quality Check", en: "Quality Check" },
        title: { bn: "Daily Taste & Quality Check", en: "Daily Taste & Quality Check" },
        text: {
          bn: "রান্না শেষে প্রতিদিন taste ও quality check হয়। এরপর packing ও dispatch।",
          en: "Every day, once cooking is done, the food is tasted and quality-checked. Only then is it packed and dispatched.",
        },
      },
      {
        key: "packaging",
        label: { bn: "Packaging", en: "Packaging" },
        title: { bn: "Packaging Matters Too", en: "Packaging Matters Too" },
        text: {
          bn: "Delivery boxes নিয়মিত maintain করা হয় এবং প্রতি ২ মাসে replace করা হয়।",
          en: "Our delivery boxes are maintained regularly and replaced every two months.",
        },
      },
      {
        key: "delivery",
        label: { bn: "Delivery", en: "Delivery" },
        title: { bn: "Delivered Within 1 Hour of Cooking Completion", en: "Delivered Within 1 Hour of Cooking Completion" },
        text: {
          bn: "রান্না শেষ হওয়ার ১ ঘণ্টার মধ্যে office-এ lunch delivery। Service area অনুযায়ী delivery routes আগেই planned থাকে।",
          en: "Lunch reaches your office within an hour of cooking being completed. Delivery routes are planned in advance for each service area.",
        },
      },
    ],
    coverageTitle: { bn: "Delivery Coverage", en: "Delivery Coverage" },
    areas: [
      { bn: "Gulshan", en: "Gulshan" },
      { bn: "Banani", en: "Banani" },
      { bn: "Niketon", en: "Niketon" },
      { bn: "Baridhara", en: "Baridhara" },
      { bn: "Baridhara DOHS", en: "Baridhara DOHS" },
      { bn: "Mohakhali", en: "Mohakhali" },
      { bn: "Mohakhali DOHS", en: "Mohakhali DOHS" },
      { bn: "Tejgaon", en: "Tejgaon" },
    ],
  },

  marquee: [
    { bn: "গলদা চিংড়ি ভুনা", en: "Galda Prawn Bhuna" },
    { bn: "রুই মাছের কালিয়া", en: "Rui Fish Kalia" },
    { bn: "মুরগির রোস্ট", en: "Chicken Roast" },
    { bn: "খাসির মাংস ভুনা", en: "Mutton Bhuna" },
    { bn: "গরুর ভুনা", en: "Beef Bhuna" },
    { bn: "পোলাও", en: "Polao" },
    { bn: "মুরগির ঝোল", en: "Chicken Jhol" },
    { bn: "খিচুড়ি", en: "Khichuri" },
    { bn: "তেলাপিয়া মাছ", en: "Tilapia Fish" },
    { bn: "মুরগির তরকারি", en: "Chicken Curry" },
    { bn: "মিশ্র সবজি", en: "Mixed Vegetables" },
    { bn: "ডাল", en: "Dal" },
  ],

  stat: {
    eyebrow: { bn: "কেন এটা জরুরি", en: "Why it matters" },
    value: 41.47,
    label: { bn: "২০২৫ সালে পরীক্ষা করা খাবারের নমুনা অনিরাপদ পাওয়া গেছে", en: "of tested food samples were unsafe in 2025" },
    delta: {
      bn: "২০২২–২৩ সালে এই হার ছিল ৮.৫% — বেড়েছে প্রায় ৫ গুণ",
      en: "Up from 8.5% in 2022–23 — almost five times higher",
    },
    meterLabel: {
      bn: "অনিরাপদ নমুনার হার: ২০২৫ সালে ৪১.৪৭%, ২০২২–২৩ সালে ৮.৫%",
      en: "Share of unsafe samples: 41.47% in 2025, 8.5% in 2022–23",
    },
    tipNow: {
      bn: "২০২৫: ১১,২২০টি নমুনার ৪,৬৫৩টি অনিরাপদ",
      en: "2025: 4,653 of 11,220 samples unsafe",
    },
    tipThen: { bn: "২০২২–২৩: ৮.৫% অনিরাপদ", en: "2022–23: 8.5% unsafe" },
    thenTick: { bn: "২০২২–২৩", en: "2022–23" },
    body: {
      bn: "২০২৫ সালে বাংলাদেশ নিরাপদ খাদ্য কর্তৃপক্ষ ১১,২২০টি খাবারের নমুনা পরীক্ষা করে। এর মধ্যে ==৪,৬৫৩টিই অনিরাপদ== পাওয়া যায়।",
      en: "In 2025 the Bangladesh Food Safety Authority tested 11,220 food samples and found ==4,653 of them unsafe.==",
    },
    punch: {
      bn: "বেশিরভাগ ঝুঁকি খাবারে ঢোকে রান্নার আগেই — উপকরণ, তেল আর পানির মাধ্যমে। তাই আমরা **প্রতিটি উপকরণের উৎস নিজেরাই বেছে নিই।**",
      en: "Most risks enter a meal before cooking starts — through ingredients, oil and water. So **we control each one at its source.**",
    },
    source: { bn: "সূত্র: বাংলাদেশ নিরাপদ খাদ্য কর্তৃপক্ষ (বিএফএসএ)", en: "Source: Bangladesh Food Safety Authority (BFSA)" },
  },

  sourcing: {
    eyebrow: { bn: "কেন তবলা কিচেন", en: "Why Tobla Kitchen" },
    title: { bn: "প্রতিটি উপকরণের **উৎস আমরা জানি**", en: "We know **where every ingredient comes from**" },
    lead: {
      bn: "কোথা থেকে এসেছে না জেনে কোনো উপকরণ আমাদের রান্নাঘরে ঢোকে না।",
      en: "No ingredient enters our kitchen unless we know where it came from.",
    },
    items: [
      {
        key: "chicken",
        title: { bn: "ফ্রি-রেঞ্জ মুরগি", en: "Free-range chicken" },
        text: {
          bn: "আসে একটি নির্দিষ্ট খামার থেকে। অ্যান্টিবায়োটিক বা হরমোন ছাড়াই খোলামেলা পরিবেশে বড় হয়, জবাই হয় হালাল উপায়ে।",
          en: "From one named farm. Raised without antibiotics or hormones, and halal-slaughtered.",
        },
        tag: { bn: "অর্গানিক চিকেন · কালিয়াকৈর, গাজীপুর", en: "Organik Chicken · Kaliakoir, Gazipur" },
      },
      {
        key: "eggs",
        title: { bn: "ওমেগা-৩ ডিম", en: "Omega-3 eggs" },
        text: {
          bn: "একই খামারের মুক্তভাবে চরে বেড়ানো মুরগির ডিম, আসে সিল করা ডজন প্যাকে।",
          en: "From free-range hens at the same farm, delivered in sealed dozens.",
        },
      },
      {
        key: "beef",
        title: { bn: "বিশ্বস্ত উৎসের গরুর মাংস", en: "Beef from trusted partners" },
        text: {
          bn: "চেনা-জানা এগ্রো পার্টনারদের কাছ থেকে কেনা — খোলা কাঁচাবাজার থেকে কখনোই নয়।",
          en: "Bought from known agro partners — never from open wet markets.",
        },
      },
      {
        key: "fish-veg",
        title: { bn: "প্রতিদিনের মাছ ও সবজি", en: "Fish & vegetables, daily" },
        text: {
          bn: "যতজন খাবেন, প্রতিদিন ঠিক ততটুকুই কিনি — তাই কিছুই ফ্রিজে জমে থাকে না।",
          en: "Bought each day for that day's headcount, so nothing sits in storage.",
        },
      },
      {
        key: "spices",
        title: { bn: "ঘরে ভাঙা মসলা", en: "Spices ground in-house" },
        text: {
          bn: "আস্ত মসলা কিনে নিজেদের রান্নাঘরেই বেছে, পরিষ্কার করে গুঁড়া করি — রেডিমেড গুঁড়া মসলা নয়।",
          en: "We buy whole spices, then clean and grind them in our own kitchen. No ready-made powders.",
        },
      },
      {
        key: "oil-water",
        title: { bn: "প্যাকেটজাত তেল, ফিল্টার করা পানি", en: "Packaged oil, filtered water" },
        text: {
          bn: "শুধু ভালো মানের প্যাকেটজাত সয়াবিন তেল — খোলা ড্রামের তেল নয়। রান্নার সব পানি ফিল্টার করা।",
          en: "Only best-quality packaged soybean oil, never loose drum oil. Filtered water for all cooking.",
        },
      },
    ],
  },

  risks: {
    eyebrow: { bn: "ঝুঁকি বনাম আমাদের নিয়ম", en: "Risks vs. our rules" },
    title: { bn: "বাইরে যা হয়, **আমরা তা হতে দিই না**", en: "What happens elsewhere, **we don't allow**" },
    lead: {
      bn: "সাধারণ ক্যাটারার আর রেস্টুরেন্টে খাবারের যেসব ঝুঁকি প্রায়ই দেখা যায় — আর আমরা কীভাবে প্রতিটি এড়িয়ে চলি।",
      en: "The food-safety risks common at caterers and restaurants — and how we avoid each one.",
    },
    colRisk: { bn: "সাধারণত যা হয়", en: "What usually happens" },
    colFix: { bn: "তবলা কিচেনে", en: "At Tobla Kitchen" },
    more: { bn: "বিস্তারিত", en: "Details" },
    less: { bn: "কম দেখুন", en: "Less" },
    tablistLabel: { bn: "ঝুঁকির মাত্রা", en: "Risk level" },
    severity: {
      critical: {
        label: { bn: "গুরুতর", en: "Critical" },
        hint: { bn: "কয়েক ঘণ্টার মধ্যেই অসুস্থ করে দিতে পারে", en: "Can make people sick within hours" },
      },
      high: {
        label: { bn: "উচ্চ", en: "High" },
        hint: { bn: "ধীরে ধীরে শরীরের ক্ষতি করে", en: "Harm that builds up over time" },
      },
      medium: {
        label: { bn: "মাঝারি", en: "Medium" },
        hint: { bn: "ঝুঁকি আছে, তবে তুলনায় কম", en: "A real but lower risk" },
      },
    },
    footnote: {
      bn: "তথ্যসূত্র: বিএফএসএ, জাতীয় সংবাদমাধ্যম ও গবেষণাপত্র। পূর্ণ তালিকা চাইলে আমরা দিতে পারি।",
      en: "Sources: BFSA data, national news reports and peer-reviewed studies. Full list available on request.",
    },
    summary: {
      title: { bn: "সারকথা", en: "In short" },
      text: {
        bn: "সাধারণ ক্যাটারারের খাবারে আপনার টিম প্রতিদিন এই ঝুঁকিগুলো নেয় — যাচাই করার কোনো উপায় ছাড়াই। তবলা কিচেনে প্রতিটি উপকরণের উৎস জানা, প্রতিটি খাবার আসে ফুড-গ্রেড বাক্সে, আর **আমাদের নিজেদের টিমও প্রতিদিন একই খাবার খায়।**",
        en: "At a typical caterer, your team takes on every one of these risks, every day, with no way to check. At Tobla Kitchen every ingredient has a known source, every meal arrives in a food-safe box, and **our own team eats the same food, every day.**",
      },
    },
  },

  menu: {
    eyebrow: { bn: "সাপ্তাহিক মেনু", en: "Weekly menu" },
    title: { bn: "সাপ্তাহিক **অফিস মেনু**", en: "Our weekly **office menu**" },
    lead: {
      bn: "শনিবার থেকে বৃহস্পতিবার — প্রতিদিন আলাদা মেনু, ঘরোয়া স্বাদে। দিন বাছুন, প্লেট বদলে যাবে।",
      en: "Saturday to Thursday — a different home-style menu every day. Pick a day to see the plate.",
    },
    daysLabel: { bn: "শনিবার — বৃহস্পতিবার", en: "Saturday — Thursday" },
    dayTabs: { bn: "দিন বাছুন", en: "Choose a day" },
    today: { bn: "আজ", en: "Today" },
    note: {
      bn: "মেনু প্রতি সপ্তাহে বদলায় — আপনার টিমের স্বাদ, বাজেট আর ডায়েট মিলিয়ে সাজিয়ে নেওয়া যায়।",
      en: "The menu changes every week and can be set to your team's taste, budget and diet.",
    },
    legendTitle: { bn: "চিহ্নের মানে", en: "What the tags mean" },
    quoteTeaser: { bn: "আপনার টিমের মেনু ও বাজেট সাজাতে প্রস্তাব নিন", en: "Get a proposal for your team's menu and budget" },
    everyDish: {
      title: { bn: "প্রতিটি পদে", en: "In every dish" },
      items: [
        { bn: "ঘরে ভাঙা মসলা", en: "Spices ground in-house" },
        { bn: "প্যাকেটজাত সয়াবিন তেল", en: "Packaged soybean oil" },
        { bn: "ফিল্টার করা পানি", en: "Filtered water" },
        { bn: "ফুড-গ্রেড বাক্স", en: "Food-safe box" },
      ],
    },
  },

  premium: {
    eyebrow: { bn: "প্রিমিয়াম পদ", en: "Premium dishes" },
    title: { bn: "বিশেষ দিনের জন্য **বিশেষ পদ**", en: "Special dishes for **special days**" },
    lead: {
      bn: "মিটিং, অতিথি আপ্যায়ন বা টিমের ছোট উৎসবে — আমাদের সমৃদ্ধ স্বাদের কিছু পদ।",
      en: "For meetings, guests or a small team celebration — a few of our richest dishes.",
    },
    badge: { bn: "প্রিমিয়াম", en: "Premium" },
    swipeLabel: { bn: "প্রিমিয়াম পদ — পাশে সোয়াইপ করে দেখুন", en: "Premium dishes — swipe sideways to see more" },
    dishes: [
      {
        key: "prawn",
        name: { bn: "গলদা চিংড়ি ভুনা", en: "Galda prawn bhuna" },
        text: {
          bn: "বড় গলদা চিংড়ি, পেঁয়াজ আর ঘরে ভাঙা মসলায় ধীরে ভুনা।",
          en: "Big river prawns, slow-cooked with onion and our own ground spices.",
        },
        alt: { bn: "সাদা প্লেটে তিনটি বড় গলদা চিংড়ি ভুনা", en: "Three large galda prawns in bhuna masala on a white plate" },
        tags: ["DS"],
      },
      {
        key: "fish",
        name: { bn: "রুই মাছের কালিয়া", en: "Rui fish kalia" },
        text: {
          bn: "ভাজা রুই মাছের বড় পিস, ঘন মসলাদার ঝোলে।",
          en: "A thick, fried rui steak in a rich, spiced gravy.",
        },
        alt: { bn: "ঘন লাল ঝোলে ভাজা রুই মাছের বড় পিস", en: "A large fried rui fish steak in thick red gravy" },
        tags: ["DS"],
      },
      {
        key: "roast",
        name: { bn: "মুরগির রোস্ট", en: "Chicken roast" },
        text: {
          bn: "ফ্রি-রেঞ্জ মুরগির বিয়েবাড়ির স্বাদের রোস্ট, বেরেস্তা দিয়ে।",
          en: "Wedding-style roast with free-range chicken and crispy fried onions.",
        },
        alt: { bn: "সাদা প্লেটে বেরেস্তা ছড়ানো মুরগির রোস্ট", en: "Chicken roast topped with fried onions on a white plate" },
        tags: ["FR"],
      },
      {
        key: "mutton",
        name: { bn: "খাসির মাংস ভুনা", en: "Mutton bhuna" },
        text: {
          bn: "নরম খাসির মাংস, অনেকক্ষণ ধরে কষানো ঘন মসলায়।",
          en: "Tender mutton, slow-cooked in a thick spice masala.",
        },
        alt: { bn: "বাটিতে হাড়সহ খাসির মাংস ভুনা, ধনেপাতা দিয়ে", en: "A bowl of mutton bhuna on the bone, garnished with coriander" },
        tags: [],
      },
      {
        key: "beef",
        name: { bn: "গরুর মাংস ভুনা", en: "Beef bhuna" },
        text: {
          bn: "বিশ্বস্ত উৎসের গরুর মাংস, ঘরোয়া কায়দায় ভুনা।",
          en: "Beef from trusted partners, cooked the home-style bhuna way.",
        },
        alt: { bn: "বাটিতে গরুর মাংস ভুনা, ধনেপাতা দিয়ে", en: "A bowl of beef bhuna garnished with coriander" },
        tags: ["AP"],
      },
    ],
    plans: {
      eyebrow: { bn: "মিল প্যাকেজ", en: "Meal plans" },
      title: { bn: "আপনার টিমের জন্য **বেছে নিন**", en: "Pick a plan **for your team**" },
      items: [
        {
          name: { bn: "বেসিক মিল", en: "Basic meal" },
          text: { bn: "প্রতিদিনের ভারসাম্যপূর্ণ খাবার — সৎ, পেটভরা, নির্ভরযোগ্য।", en: "Balanced everyday food — honest, filling, reliable." },
        },
        {
          name: { bn: "প্রিমিয়াম মিল", en: "Premium meal" },
          text: { bn: "বেশি বৈচিত্র্য, সমৃদ্ধ স্বাদ আর আরও ভালো উপকরণ।", en: "More variety, richer flavours and better ingredients." },
        },
        {
          name: { bn: "এক্সিকিউটিভ মিল", en: "Executive meal" },
          text: { bn: "নেতৃত্ব ও ক্লায়েন্ট মিটিংয়ের জন্য বিশেষ পদ।", en: "Special dishes for leadership and client meetings." },
        },
      ],
      cta: { bn: "প্যাকেজ নিয়ে কথা বলি", en: "Talk to us about a plan" },
    },
  },

  gallery: {
    eyebrow: { bn: "গ্যালারি", en: "Gallery" },
    title: { bn: "আমাদের **রান্নাঘর থেকে**", en: "From **our kitchen**" },
    lead: {
      bn: "প্রতিটি ছবি আমাদের নিজেদের রান্নার — যেমন রাঁধি, তেমনই পৌঁছে দিই।",
      en: "Every photo is our own cooking — it reaches you just the way you see it.",
    },
    /** `{n}` is replaced with the number of photos shown */
    count: { bn: "{n}টি ছবি", en: "{n} photos" },
    filterLabel: { bn: "ধরন অনুযায়ী দেখুন", en: "Show by type" },
    open: { bn: "বড় করে দেখুন", en: "view larger" },
    // lightbox
    prev: { bn: "আগের ছবি", en: "Previous photo" },
    next: { bn: "পরের ছবি", en: "Next photo" },
    close: { bn: "বন্ধ করুন", en: "Close" },
  },

  quote: {
    eyebrow: { bn: "প্রস্তাব", en: "Get a quote" },
    title: { bn: "আপনার অফিসের মেনু ও বাজেট **আমাদের সঙ্গে সাজিয়ে নিন**", en: "Plan your office menu and budget **with us**" },
    lead: {
      bn: "কতজন খাবেন, কোন মেনু আর কোন প্যাকেজ — সব মিলিয়ে আপনার টিমের জন্য আলাদা প্রস্তাব পাঠাই।",
      en: "Tell us your headcount, menu and plan — we'll send a proposal made for your team.",
    },
    promise: {
      bn: "যে প্যাকেজই নিন, খাদ্য নিরাপত্তার কোনো নিয়মে ছাড় নেই।",
      en: "Whatever the plan, not one food-safety rule is skipped.",
    },
    cta: { bn: "প্রস্তাব চাই", en: "Get a quote" },
    includedTitle: { bn: "প্রতিটি মিলে যা থাকছে", en: "In every meal" },
    included: [
      { key: "menu", text: { bn: "শনি থেকে বৃহস্পতি — প্রতিদিন আলাদা মেনু", en: "A different menu every day, Saturday to Thursday" } },
      { key: "farm", text: { bn: "এক নির্দিষ্ট খামারের ফ্রি-রেঞ্জ মুরগি ও ওমেগা-৩ ডিম", en: "Free-range chicken and omega-3 eggs from one named farm" } },
      { key: "beef", text: { bn: "বিশ্বস্ত উৎসের হাড় ছাড়া গরুর মাংস", en: "Boneless beef from trusted partners" } },
      { key: "fresh", text: { bn: "প্রতিদিন কেনা টাটকা মাছ ও সবজি", en: "Fish and vegetables bought fresh every day" } },
      { key: "spice", text: { bn: "ঘরে ভাঙা মসলা, প্যাকেটজাত সয়াবিন তেল আর ফিল্টার করা পানি", en: "Spices ground in-house, packaged soybean oil, filtered water" } },
      { key: "box", text: { bn: "ফুড-গ্রেড বাক্সে প্রতিদিন সময়মতো ডেলিভারি", en: "On-time daily delivery in food-safe boxes" } },
    ],
  },

  process: {
    eyebrow: { bn: "কীভাবে কাজ করি", en: "How we work" },
    title: { bn: "বাজার থেকে **আপনার টেবিল** পর্যন্ত", en: "From the market **to your table**" },
    lead: {
      bn: "প্রতিটি ধাপে একই নিয়ম — পরিষ্কার, টাটকা আর সময়মতো।",
      en: "The same rule at every step — clean, fresh and on time.",
    },
    steps: [
      {
        key: "market",
        title: { bn: "প্রতিদিনের বাজার", en: "Daily shopping" },
        text: {
          bn: "সেদিনের অর্ডার মিলিয়ে টাটকা মাছ আর সবজি কেনা হয়।",
          en: "Fresh fish and vegetables, bought to match that day's orders.",
        },
      },
      {
        key: "cook",
        title: { bn: "পরিষ্কার রান্নাঘরে রান্না", en: "Cooked in a clean kitchen" },
        text: {
          bn: "রান্নাঘর প্রতিদিন জীবাণুমুক্ত করা হয়; কর্মীরা পরেন গ্লাভস, মাস্ক আর হেয়ারনেট।",
          en: "Sanitized every day. Staff wear gloves, masks and hairnets.",
        },
      },
      {
        key: "pack",
        title: { bn: "নিরাপদ প্যাকিং", en: "Safe packing" },
        text: {
          bn: "বারবার ব্যবহারযোগ্য, বিপিএ-মুক্ত ফুড-গ্রেড বাক্সে — পলিথিন বা ফোমে নয়।",
          en: "Reusable, BPA-free, food-safe boxes. No polythene or foam.",
        },
      },
      {
        key: "deliver",
        title: { bn: "সময়মতো ডেলিভারি", en: "On-time delivery" },
        text: {
          bn: "পরিষ্কার গাড়িতে, প্রতিদিন ঠিক সময়ে আপনার অফিসে।",
          en: "In clean transport, at your office on time, every day.",
        },
      },
    ],
    promisesTitle: { bn: "আরও যা নিশ্চিত করি", en: "Plus, every day" },
    promises: [
      {
        key: "hands",
        title: { bn: "অভিজ্ঞ হাত", en: "Experienced hands" },
        text: { bn: "রান্না ও সার্ভিস টিমের কয়েক দশকের ক্যাটারিং অভিজ্ঞতা।", en: "Kitchen and service staff with decades of catering experience." },
      },
      {
        key: "equipment",
        title: { bn: "আধুনিক সরঞ্জাম", en: "Modern equipment" },
        text: { bn: "খাদ্য নিরাপত্তা আর সহজে পরিষ্কারের কথা ভেবে বাছাই করা।", en: "Chosen for food safety and easy cleaning." },
      },
      {
        key: "fresh",
        title: { bn: "কখনো ফ্রিজের বা বাসি নয়", en: "Never frozen or reused" },
        text: { bn: "যতজন খাবেন, সেদিন ততজনের জন্যই রান্না — কিছুই পরের দিনের জন্য রাখা হয় না।", en: "Cooked fresh for that day's headcount; nothing carries over." },
      },
    ],
  },

  about: {
    eyebrow: { bn: "আমাদের কথা", en: "About us" },
    quote: {
      bn: "আমরা শুধু খাবার পৌঁছে দিই না — **পৌঁছে দিই আস্থা।**",
      en: "We don't just deliver food — **we deliver trust.**",
    },
    body: {
      bn: "তবলা কিচেন একটি বাংলাদেশি ক্যাটারিং প্রতিষ্ঠান। আমাদের বিশ্বাস একটাই — অফিসের খাবারও হতে হবে ঘরের রান্নার মতো নিরাপদ। তাই খামার থেকে খাবারের বাক্স পর্যন্ত সবকিছু আমরা নিজেরাই দেখি।",
      en: "Tobla Kitchen is a Bangladeshi catering company built on one idea: office food should be as safe as food cooked at home. So we look after everything ourselves — from the farm to the box.",
    },
    mission: {
      title: { bn: "আমাদের লক্ষ্য", en: "Our mission" },
      text: {
        bn: "বাংলাদেশের অফিসগুলোতে নিরাপদ, পরিচ্ছন্ন, ঘরোয়া খাবার পৌঁছে দেওয়া — যার প্রতিটি উপকরণের উৎস আমাদের জানা, আর প্রতিটি পরিবেশনে মান আগে, পরিমাণ পরে।",
        en: "To serve corporate teams in Bangladesh safe, hygienic, home-style meals made from ingredients we can trace — quality over quantity in every portion.",
      },
    },
    vision: {
      title: { bn: "আমাদের স্বপ্ন", en: "Our vision" },
      text: {
        bn: "এমন অফিস লাঞ্চ, যার ওপর কর্মীরা ঘরের রান্নার মতোই ভরসা করেন — আর কর্পোরেট ক্যাটারিংয়ে খাদ্য নিরাপত্তার মাপকাঠি হবে তবলা কিচেন।",
        en: "An office lunch employees trust as much as food cooked at home — with Tobla Kitchen setting the standard for food safety in corporate catering.",
      },
    },
    valuesTitle: { bn: "আমাদের নিয়ম", en: "What we stand for" },
    values: [
      {
        title: { bn: "খাদ্য নিরাপত্তা সবার আগে", en: "Food safety first" },
        text: {
          bn: "উৎস না জেনে কোনো উপকরণ রান্নাঘরে ঢোকে না।",
          en: "No ingredient enters our kitchen unless we know its source.",
        },
      },
      {
        title: { bn: "পরিচ্ছন্নতায় ছাড় নেই", en: "Hygiene without shortcuts" },
        text: {
          bn: "রান্নাঘর প্রতিদিন জীবাণুমুক্ত করি; গ্লাভস, মাস্ক আর হেয়ারনেট ছাড়া কোনো কাজ নয়।",
          en: "The kitchen is sanitized daily. Gloves, masks and hairnets, always.",
        },
      },
      {
        title: { bn: "পরিমাণের চেয়ে মান", en: "Quality over quantity" },
        text: {
          bn: "যতটুকু ভালোভাবে রাঁধতে পারি, ততটুকুই রাঁধি।",
          en: "We cook only what we can cook well.",
        },
      },
      {
        title: { bn: "যা রাঁধি, তা-ই খাই", en: "We eat what we cook" },
        text: {
          bn: "আমাদের নিজেদের টিমও প্রতিদিন একই খাবার খায়।",
          en: "Our own team eats the same food we serve, every day.",
        },
      },
    ],
    facts: [
      { value: { bn: "২০২৫", en: "2025" }, label: { bn: "যাত্রা শুরু", en: "Founded" } },
      { value: { bn: "১,০০০+", en: "1,000+" }, label: { bn: "মিলের দৈনিক সক্ষমতা", en: "Meals a day" } },
      { value: { bn: "হালাল", en: "Halal" }, label: { bn: "সতেজ ও হালাল উপকরণ", en: "Fresh, halal ingredients" } },
      { value: { bn: "তেজগাঁও", en: "Tejgaon" }, label: { bn: "নিজস্ব রান্নাঘর", en: "Our own kitchen" } },
    ],
  },

  brochure: {
    eyebrow: { bn: "ব্রোশিওর", en: "Brochure" },
    title: { bn: "এক নজরে **তবলা কিচেন**", en: "Tobla Kitchen **at a glance**" },
    lead: {
      bn: "আমাদের নিয়ম, সেবা আর প্রতিটি উপকরণের উৎস — সব এক ব্রোশিওরে। এখানেই দেখে নিন, অথবা ডাউনলোড করে টিমের সাথে শেয়ার করুন।",
      en: "Our rules, services and where every ingredient comes from — all in one brochure. View it here, or download it to share with your team.",
    },
    preview: { bn: "ব্রোশিওর দেখুন", en: "Preview brochure" },
    download: { bn: "ডাউনলোড (PDF)", en: "Download PDF" },
    meta: { bn: "২ পাতা · পূর্ণ মানের PDF, ২৩.৭ এমবি · ইংরেজিতে লেখা", en: "2 pages · full-quality PDF, 23.7 MB · in English" },
    modalTitle: { bn: "তবলা কিচেন ব্রোশিওর", en: "Tobla Kitchen brochure" },
    outside: { bn: "বাইরের দিক", en: "Outside" },
    inside: { bn: "ভেতরের দিক", en: "Inside" },
    zoomIn: { bn: "বড় করে দেখুন", en: "Zoom in" },
    zoomOut: { bn: "ছোট করুন", en: "Zoom out" },
    close: { bn: "বন্ধ করুন", en: "Close" },
    swipeHint: { bn: "নিচে স্ক্রল করে পুরো ব্রোশিওর দেখুন", en: "Scroll down to read every panel" },
    pageAlt: {
      outside: {
        bn: "ব্রোশিওরের বাইরের দিক: আমাদের নিয়ম ও লক্ষ্য, সেবা ও যোগাযোগ, আর প্রচ্ছদ",
        en: "Brochure outside: our values and mission, services and contact, and the cover",
      },
      inside: {
        bn: "ব্রোশিওরের ভেতরের দিক: আমাদের কথা, প্রস্তুতি ও ডেলিভারি, আর উপকরণের উৎস",
        en: "Brochure inside: about us, how we prepare and deliver, and where ingredients come from",
      },
    },
  },

  contact: {
    eyebrow: { bn: "যোগাযোগ", en: "Contact" },
    title: { bn: "আপনার অফিসের খাবার নিয়ে **কথা বলি?**", en: "Let's talk about **your office meals**" },
    lead: {
      bn: "একটা কল দিন। আপনার টিমের জন্য মেনু আর খরচের প্রস্তাব পাঠিয়ে দেব।",
      en: "Give us a call. We'll send a menu and price proposal for your team.",
    },
    servicesTitle: { bn: "আমাদের সেবা", en: "Our services" },
    services: [
      { key: "daily", label: { bn: "প্রতিদিনের অফিস লাঞ্চ", en: "Daily office lunch" } },
      { key: "monthly", label: { bn: "মাসিক কর্পোরেট মিল প্ল্যান", en: "Monthly corporate meal plans" } },
      { key: "meeting", label: { bn: "মিটিং ও ট্রেনিংয়ের খাবার", en: "Meeting & training meals" } },
      { key: "executive", label: { bn: "এক্সিকিউটিভ লাঞ্চ বক্স", en: "Executive lunch boxes" } },
      { key: "buffet", label: { bn: "বুফে আয়োজন", en: "Buffet arrangements" } },
    ],
    callDirect: { bn: "সরাসরি কল করুন", en: "Call us directly" },
    callNow: { bn: "কল করুন", en: "Call now" },
    copy: { bn: "নম্বর কপি", en: "Copy" },
    copied: { bn: "কপি হয়েছে!", en: "Copied!" },
    personLabel: { bn: "যার সাথে কথা বলবেন", en: "Contact person" },
    person: { bn: "রায়হান মাহমুদ", en: "Raihan Mahmud" },
    role: { bn: "জিএম, বিজনেস ডেভেলপমেন্ট", en: "GM, Business Development" },
    kitchenLabel: { bn: "আমাদের রান্নাঘর", en: "Kitchen" },
    address: { bn: "১৭/৫ কুনিপাড়া, তেজগাঁও, ঢাকা", en: "17/5 Kunipara, Tejgaon, Dhaka" },
    openMap: { bn: "ম্যাপে দেখুন", en: "Open in Maps" },
    webLabel: { bn: "ওয়েবসাইট", en: "Website" },
    brochureLink: { bn: "ব্রোশিওর ডাউনলোড (PDF)", en: "Download brochure (PDF)" },
  },

  footer: {
    tagline: {
      bn: "আমরা শুধু খাবার পৌঁছে দিই না — পৌঁছে দিই আস্থা।",
      en: "We don't just deliver food — we deliver trust.",
    },
    rights: { bn: "© ২০২৬ তবলা কিচেন। সর্বস্বত্ব সংরক্ষিত।", en: "© 2026 Tobla Kitchen. All rights reserved." },
    top: { bn: "উপরে যান", en: "Back to top" },
  },
};

export type SiteContent = typeof site;
