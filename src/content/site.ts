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
      { id: "why", label: { bn: "কেন আমরা", en: "Why us" } },
      { id: "menu", label: { bn: "মেনু", en: "Menu" } },
      { id: "process", label: { bn: "কাজের ধাপ", en: "How we work" } },
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

  hero: {
    eyebrow: { bn: "কর্পোরেট ক্যাটারিং · ঢাকা", en: "Corporate catering · Dhaka" },
    titleLead: { bn: "অফিসের খাবার,", en: "Office food," },
    titleAccent: { bn: "ঘরের মতো নিরাপদ।", en: "as safe as home." },
    lead: {
      bn: "অফিসের টিমের জন্য প্রতিদিন দুপুর আর রাতের খাবার রাঁধি। খামারের মুরগি থেকে খাবারের বাক্স পর্যন্ত — ==প্রতিটি ধাপ আমরা নিজেরাই দেখি।==",
      en: "We cook lunch and dinner for corporate teams, every day. From the farm our chicken comes from to the box it arrives in — ==we look after every step ourselves.==",
    },
    primary: { bn: "মেনু দেখুন", en: "See the menu" },
    points: [
      { bn: "ফ্রি-রেঞ্জ মুরগি", en: "Free-range chicken" },
      { bn: "ঘরে ভাঙা মসলা", en: "Spices ground in-house" },
      { bn: "ফিল্টার করা পানি", en: "Filtered water" },
    ],
    badgeFresh: {
      title: { bn: "প্রতিদিন টাটকা রান্না", en: "Cooked fresh daily" },
      sub: { bn: "বাসি খাবার কখনো নয়", en: "Never yesterday's food" },
    },
    stamp: {
      bn: "আমরা যা রাঁধি • নিজেরাও তা-ই খাই • ",
      en: "WE EAT WHAT WE COOK • EVERY DAY • ",
    },
    plateAlt: {
      bn: "দুপুরের খাবারের টেবিল: সাদা ভাত, মুরগির তরকারি, রুই মাছ, ডাল আর সবজি",
      en: "A lunch table with rice, chicken curry, rui fish, dal and vegetables",
    },
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
