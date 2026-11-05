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
      bn: "কর্পোরেট টিমের জন্য প্রতিদিনের দুপুর ও রাতের খাবার। ফ্রি-রেঞ্জ মুরগি, ঘরে ভাঙা মসলা, ফিল্টার করা পানি — প্রতিটি উপকরণের উৎস আমরা জানি।",
      en: "Daily lunch and dinner for corporate teams in Dhaka. Free-range chicken, spices ground in-house, filtered water — we know where every ingredient comes from.",
    },
  },

  brand: { bn: "তবলা কিচেন", en: "Tobla Kitchen" },

  nav: {
    items: [
      { id: "why", label: { bn: "কেন আমরা", en: "Why us" } },
      { id: "menu", label: { bn: "মেনু ও দাম", en: "Menu & price" } },
      { id: "process", label: { bn: "কীভাবে", en: "How we work" } },
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
      bn: "কর্পোরেট টিমের জন্য প্রতিদিন দুপুর ও রাতের খাবার রান্না করি। মুরগির খামার থেকে খাবারের বাক্স পর্যন্ত — ==সবকিছুর খোঁজ আমরা রাখি।==",
      en: "We cook lunch and dinner for corporate teams, every day. From the farm our chicken comes from to the box it arrives in — ==we know where everything comes from.==",
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
    price: {
      value: { bn: "৳২৭৫", en: "Tk 275" },
      title: { bn: "গড়ে জনপ্রতি, প্রতিদিন", en: "average per person, per day" },
      sub: { bn: "পুরো দুপুরের খাবার · ভ্যাট ও এআইটি ছাড়া", en: "A full lunch · excl. VAT & AIT" },
    },
    stamp: {
      bn: "আমরা যা রাঁধি • নিজেরাও তা-ই খাই • ",
      en: "WE EAT WHAT WE COOK • EVERY DAY • ",
    },
    plateAlt: {
      bn: "ভাত, মুরগির মাংস, ডাল, সবজি আর সালাদ দিয়ে সাজানো দুপুরের খাবার",
      en: "A lunch plate with rice, chicken curry, dal, vegetables and salad",
    },
  },

  marquee: [
    { bn: "পোলাও", en: "Polao" },
    { bn: "গরুর রেজালা", en: "Beef Rezala" },
    { bn: "মুরগির রোস্ট", en: "Chicken Roast" },
    { bn: "ভুনা খিচুড়ি", en: "Bhuna Khichuri" },
    { bn: "রুই মাছ ভুনা", en: "Rui Fish Bhuna" },
    { bn: "গরুর তেহারি", en: "Beef Tehari" },
    { bn: "খাসির কাচ্চি", en: "Mutton Kacchi" },
    { bn: "মুরগির ঝাল ফ্রাই", en: "Chicken Jhal Fry" },
    { bn: "মুড়িঘণ্ট", en: "Muri Ghonto" },
    { bn: "ফিরনি", en: "Firni" },
    { bn: "জর্দা", en: "Jorda" },
    { bn: "বোরহানি", en: "Borhani" },
  ],

  stat: {
    eyebrow: { bn: "কেন এটা জরুরি", en: "Why it matters" },
    value: 41.47,
    label: { bn: "পরীক্ষিত খাবারের নমুনা অনিরাপদ, ২০২৫", en: "of tested food samples were unsafe in 2025" },
    delta: {
      bn: "২০২২–২৩ সালে ছিল ৮.৫% — প্রায় ৫ গুণ বেড়েছে",
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
      bn: "বেশিরভাগ ঝুঁকি ঢোকে রান্নার আগেই — উপকরণ, তেল আর পানি দিয়ে। তাই আমরা **প্রতিটি জিনিস উৎস থেকেই নিয়ন্ত্রণ করি।**",
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
          bn: "একটি নির্দিষ্ট খামার থেকে আসে। অ্যান্টিবায়োটিক ও হরমোন ছাড়া পালিত, হালাল উপায়ে জবাই করা।",
          en: "From one named farm. Raised without antibiotics or hormones, and halal-slaughtered.",
        },
        tag: { bn: "অর্গানিক চিকেন · কালিয়াকৈর, গাজীপুর", en: "Organik Chicken · Kaliakoir, Gazipur" },
      },
      {
        key: "eggs",
        title: { bn: "ওমেগা-৩ ডিম", en: "Omega-3 eggs" },
        text: {
          bn: "একই খামারের খোলা জায়গায় চরে বেড়ানো মুরগির ডিম। আসে সিল করা ডজনে।",
          en: "From free-range hens at the same farm, delivered in sealed dozens.",
        },
      },
      {
        key: "beef",
        title: { bn: "বিশ্বস্ত উৎসের গরুর মাংস", en: "Beef from trusted partners" },
        text: {
          bn: "পরিচিত এগ্রো পার্টনারদের কাছ থেকে কেনা। খোলা কাঁচাবাজার থেকে কখনো নয়।",
          en: "Bought from known agro partners — never from open wet markets.",
        },
      },
      {
        key: "fish-veg",
        title: { bn: "প্রতিদিনের মাছ ও সবজি", en: "Fish & vegetables, daily" },
        text: {
          bn: "যতজন খাবেন, প্রতিদিন ঠিক ততটুকুই কেনা হয়। তাই কিছুই জমিয়ে রাখা হয় না।",
          en: "Bought each day for that day's headcount, so nothing sits in storage.",
        },
      },
      {
        key: "spices",
        title: { bn: "ঘরে ভাঙা মসলা", en: "Spices ground in-house" },
        text: {
          bn: "আস্ত মসলা কিনে নিজেদের রান্নাঘরে পরিষ্কার করে গুঁড়া করি। কোনো রেডিমেড গুঁড়া মসলা নয়।",
          en: "We buy whole spices, then clean and grind them in our own kitchen. No ready-made powders.",
        },
      },
      {
        key: "oil-water",
        title: { bn: "প্যাকেটের তেল, ফিল্টারের পানি", en: "Packaged oil, filtered water" },
        text: {
          bn: "শুধু ভালো মানের প্যাকেটজাত সয়াবিন তেল, খোলা ড্রামের তেল নয়। সব রান্নায় ফিল্টার করা পানি।",
          en: "Only best-quality packaged soybean oil, never loose drum oil. Filtered water for all cooking.",
        },
      },
    ],
  },

  risks: {
    eyebrow: { bn: "ঝুঁকি বনাম আমাদের নিয়ম", en: "Risks vs. our rules" },
    title: { bn: "বাইরে যা হয়, **আমরা তা হতে দিই না**", en: "What happens elsewhere, **we don't allow**" },
    lead: {
      bn: "সাধারণ ক্যাটারার ও রেস্টুরেন্টে খাদ্য নিরাপত্তার যে ঝুঁকিগুলো দেখা যায় — আর আমরা কীভাবে প্রতিটি এড়িয়ে চলি।",
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
        hint: { bn: "কয়েক ঘণ্টার মধ্যে অসুস্থ করতে পারে", en: "Can make people sick within hours" },
      },
      high: {
        label: { bn: "বেশি", en: "High" },
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
        bn: "সাধারণ ক্যাটারারে আপনার টিম প্রতিদিন এই সব ঝুঁকি নেয় — যাচাই করার কোনো উপায় ছাড়াই। তবলা কিচেনে প্রতিটি উপকরণের উৎস জানা, প্রতিটি মিল আসে ফুড-সেফ বাক্সে, আর **আমাদের টিমও প্রতিদিন একই খাবার খায়।**",
        en: "At a typical caterer, your team takes on every one of these risks, every day, with no way to check. At Tobla Kitchen every ingredient has a known source, every meal arrives in a food-safe box, and **our own team eats the same food, every day.**",
      },
    },
  },

  menu: {
    eyebrow: { bn: "সাপ্তাহিক মেনু", en: "Weekly menu" },
    title: { bn: "৪ সপ্তাহের মেনু, **প্রতিদিন নতুন স্বাদ**", en: "A 4-week menu, **something new every day**" },
    lead: {
      bn: "ঘরোয়া স্বাদের মেনু ৪ সপ্তাহ পরপর ঘুরে আসে — সপ্তাহের সাত দিনই।",
      en: "Home-style dishes on a 4-week rotation — seven days a week.",
    },
    week: { bn: "সপ্তাহ", en: "Week" },
    weekTabs: { bn: "সপ্তাহ বাছুন", en: "Choose a week" },
    dayTabs: { bn: "দিন বাছুন", en: "Choose a day" },
    today: { bn: "আজ", en: "Today" },
    rotateNote: { bn: "“/” মানে আমরা পালা করে দিই", en: "“/” means we rotate between them" },
    legendTitle: { bn: "চিহ্নের মানে", en: "What the tags mean" },
    priceTeaser: { bn: "গড়ে জনপ্রতি / দিন — দাম ও যা থাকছে দেখুন", en: "avg. per person / day — see what's included" },
    everyDish: {
      title: { bn: "প্রতিটি পদে", en: "In every dish" },
      items: [
        { bn: "ঘরে ভাঙা মসলা", en: "Spices ground in-house" },
        { bn: "প্যাকেটজাত সয়াবিন তেল", en: "Packaged soybean oil" },
        { bn: "ফিল্টার করা পানি", en: "Filtered water" },
        { bn: "ফুড-সেফ বাক্স", en: "Food-safe box" },
      ],
    },
  },

  pricing: {
    eyebrow: { bn: "দাম", en: "Pricing" },
    title: { bn: "দুপুরের খাবারের **দাম কত?**", en: "What does **lunch cost?**" },
    lead: {
      bn: "জনপ্রতি, প্রতিদিন — ৪ সপ্তাহের পুরো মেনু ধরে গড়। এই দামেও খাদ্য নিরাপত্তার একটি নিয়মও বাদ যায় না।",
      en: "Per person, per day — averaged across the full 4-week menu. Not one food-safety rule is skipped at this price.",
    },
    card: {
      label: { bn: "গড় খরচ", en: "Average cost" },
      value: { bn: "৳২৭৫", en: "Tk 275" },
      unit: { bn: "জনপ্রতি / দিন", en: "per person / day" },
      notes: [
        { bn: "ভ্যাট ও এআইটি ছাড়া", en: "Excluding VAT & AIT" },
        { bn: "দিনে গড়ে ৫০০ লাঞ্চ, সপ্তাহে ৭ দিন ধরে হিসাব", en: "Based on ~500 lunches a day, 7 days a week" },
        { bn: "আপনার টিমের মাপে আলাদা প্রস্তাব দিই", en: "We quote to your team's size" },
      ],
      cta: { bn: "প্রস্তাব চাই", en: "Get a quote" },
    },
    includedTitle: { bn: "এই দামে যা যা থাকছে", en: "What the price includes" },
    included: [
      { key: "menu", text: { bn: "৪ সপ্তাহের ঘুরে-ফিরে আসা মেনু, সপ্তাহের ৭ দিন", en: "A 4-week rotating menu, 7 days a week" } },
      { key: "farm", text: { bn: "এক নির্দিষ্ট খামারের ফ্রি-রেঞ্জ মুরগি ও ওমেগা-৩ ডিম", en: "Free-range chicken and omega-3 eggs from one named farm" } },
      { key: "beef", text: { bn: "হাড় ছাড়া গরুর মাংস — ==১ কেজিতে ৯ জন, জনপ্রতি প্রায় ১১০ গ্রাম==", en: "Boneless beef — ==1 kg serves 9, about 110 g each==" } },
      { key: "fresh", text: { bn: "প্রতিদিন কেনা টাটকা মাছ ও সবজি", en: "Fish and vegetables bought fresh every day" } },
      { key: "spice", text: { bn: "ঘরে ভাঙা মসলা, প্যাকেটজাত সয়াবিন তেল, ফিল্টার পানি", en: "Spices ground in-house, packaged soybean oil, filtered water" } },
      { key: "box", text: { bn: "ফুড-সেফ বাক্সে প্রতিদিন সময়মতো ডেলিভারি", en: "On-time daily delivery in food-safe boxes" } },
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
          bn: "প্রতিদিন জীবাণুমুক্ত রান্নাঘর। কর্মীরা গ্লাভস, মাস্ক ও হেয়ারনেট পরেন।",
          en: "Sanitized every day. Staff wear gloves, masks and hairnets.",
        },
      },
      {
        key: "pack",
        title: { bn: "নিরাপদ প্যাকিং", en: "Safe packing" },
        text: {
          bn: "বারবার ব্যবহারযোগ্য, বিপিএ-মুক্ত ফুড-সেফ বাক্সে। পলিথিন বা ফোম নয়।",
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
    promisesTitle: { bn: "এর সাথে প্রতিদিন", en: "Plus, every day" },
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
        title: { bn: "কখনো ফ্রোজেন বা বাসি নয়", en: "Never frozen or reused" },
        text: { bn: "সেদিনের লোকসংখ্যা অনুযায়ী সেদিনই রান্না, পরের দিনে কিছুই যায় না।", en: "Cooked fresh for that day's headcount; nothing carries over." },
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
        bn: "বাংলাদেশের কর্পোরেট টিমকে নিরাপদ, পরিচ্ছন্ন, ঘরোয়া খাবার দেওয়া — এমন উপকরণে, যার উৎস আমরা জানি। প্রতিটি ভাগে পরিমাণের চেয়ে মান আগে।",
        en: "To serve corporate teams in Bangladesh safe, hygienic, home-style meals made from ingredients we can trace — quality over quantity in every portion.",
      },
    },
    vision: {
      title: { bn: "আমাদের স্বপ্ন", en: "Our vision" },
      text: {
        bn: "এমন অফিস লাঞ্চ, যাকে কর্মীরা ঘরের রান্নার মতোই বিশ্বাস করেন — আর কর্পোরেট ক্যাটারিংয়ে খাদ্য নিরাপত্তার মান ঠিক করবে তবলা কিচেন।",
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
          bn: "প্রতিদিন রান্নাঘর জীবাণুমুক্ত করা হয়। গ্লাভস, মাস্ক, হেয়ারনেট সবসময়।",
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
      { value: { bn: "১,০০০+", en: "1,000+" }, label: { bn: "মিল প্রতিদিন", en: "Meals a day" } },
      { value: { bn: "৭ দিন", en: "7 days" }, label: { bn: "সপ্তাহে সেবা", en: "A week" } },
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
    meta: { bn: "২ পাতা · ২.৫ এমবি · ইংরেজিতে লেখা", en: "2 pages · 2.5 MB · in English" },
    modalTitle: { bn: "তবলা কিচেন ব্রোশিওর", en: "Tobla Kitchen brochure" },
    outside: { bn: "বাইরের দিক", en: "Outside" },
    inside: { bn: "ভেতরের দিক", en: "Inside" },
    zoomIn: { bn: "বড় করে দেখুন", en: "Zoom in" },
    zoomOut: { bn: "ছোট করুন", en: "Zoom out" },
    close: { bn: "বন্ধ করুন", en: "Close" },
    swipeHint: { bn: "নিচে স্ক্রল করে সব পাতা দেখুন", en: "Scroll down to read every panel" },
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
    personLabel: { bn: "যোগাযোগ", en: "Contact person" },
    person: { bn: "রায়হান মাহমুদ", en: "Raihan Mahmud" },
    role: { bn: "জিএম, বিজনেস ডেভেলপমেন্ট", en: "GM, Business Development" },
    kitchenLabel: { bn: "রান্নাঘর", en: "Kitchen" },
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
