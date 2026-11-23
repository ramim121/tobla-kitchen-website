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
      { id: "about", label: { bn: "আমাদের কথা", en: "About" } },
      { id: "enquiry", label: { bn: "কোটেশন", en: "Get a quote" } },
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
   * The hero keeps the owner's title and buttons exactly as written on the Bangla page (a Bangla–English
   * mix with English buttons); its four highlights are Bangla there, using the English word written in
   * Bangla where a pure-Bangla one would read stiffly. Every other section is all Bangla on the Bangla page
   * and all English on the English page. English-only strings get lang="en" when shown (langFor in
   * src/lib/i18n.tsx).
   */
  hero: {
    eyebrow: { bn: "কর্পোরেট ক্যাটারিং · ঢাকা", en: "Corporate catering · Dhaka" },
    titleLead: { bn: "Office Lunch-এ একদিন ভালো খাবার যথেষ্ট না।", en: "For office lunch, one good day isn't enough." },
    titleAccent: { bn: "Consistency matters.", en: "Consistency matters." },
    /** → the enquiry form, with "free sample first" ticked */
    primary: { bn: "Request Free Sample", en: "Request Free Sample" },
    /** → the enquiry form */
    secondary: { bn: "Get Corporate Quote", en: "Get Corporate Quote" },
    /** two columns: the first two on the left, the last two on the right */
    points: [
      { bn: "ডেইলি কোয়ালিটি চেক", en: "Daily Quality Check" },
      { bn: "ফ্রেশ উপকরণ, ডেইলি সোর্সিং", en: "Fresh Ingredients, Daily Sourcing" },
      { bn: "কিচেন ভিজিটের সুযোগ", en: "Kitchen Visit Available" },
      { bn: "দিনে ৫,০০০ মিল পর্যন্ত ক্যাপাসিটি", en: "Up to 5,000 Meals/Day Capacity" },
    ],
    plateAlt: {
      bn: "দুপুরের খাবারের টেবিল: সাদা ভাত, মুরগির তরকারি, রুই মাছ, ডাল আর সবজি",
      en: "A lunch table with rice, chicken curry, rui fish, dal and vegetables",
    },
  },

  /** Section 2 — "Don't just take our word for it" */
  trust: {
    eyebrow: { bn: "তবলা কিচেন বেছে নেওয়ার আগে", en: "Before You Choose Tobla Kitchen" },
    title: { bn: "শুধু আমাদের কথায় নয়, নিজেই যাচাই করুন।", en: "Don't Just Take Our Word for It." },
    items: [
      {
        key: "visit",
        title: { bn: "কিচেন ভিজিট করুন", en: "Visit the Kitchen" },
        text: {
          bn: "আমাদের কিচেন ভিজিট করুন। কোথায়, কেমন পরিবেশে আপনার অফিসের লাঞ্চ তৈরি হবে — নিজেই দেখে নিন।",
          en: "Visit our kitchen and see for yourself where — and in what environment — your office lunch is prepared.",
        },
      },
      {
        key: "standards",
        title: { bn: "আমাদের স্ট্যান্ডার্ড জেনে নিন", en: "Understand the Standards" },
        text: {
          bn: "উপকরণ কোথা থেকে আসে, হাইজিন কীভাবে মেইনটেইন করি আর প্রতিদিনের কোয়ালিটি চেক কীভাবে হয় — জেনে নিন।",
          en: "Find out where our ingredients come from, how we maintain hygiene and how our daily quality check works.",
        },
      },
      {
        key: "taste",
        title: { bn: "সিদ্ধান্তের আগে টেস্ট করে দেখুন", en: "Taste Before You Decide" },
        text: {
          bn: "সার্ভিস শুরুর আগে ফ্রি টেস্টিংয়ের সুযোগ আছে। খাবারের স্বাদ, পোরশন আর কোয়ালিটি নিজেই যাচাই করে নিন।",
          en: "Before service begins, you can have a free tasting and judge the taste, portion size and quality yourself.",
        },
      },
    ],
  },

  /** Section 3 — ingredient cards that slide to the left (photos: src/content/images.ts › INGREDIENT_PHOTOS) */
  ingredients: {
    eyebrow: { bn: "উপকরণ ও সোর্সিং", en: "Ingredients & Sourcing" },
    title: { bn: "আপনার অফিস লাঞ্চ তৈরি হয় কী দিয়ে?", en: "What Goes Into Your Office Lunch?" },
    docs: { bn: "সাপ্লায়ার ডকুমেন্টস দেখুন", en: "View Supplier Documents" },
    docsNote: {
      bn: "চিকেন ও ডিম সাপ্লায়ারের বিস্তারিত তথ্য ও সংশ্লিষ্ট ডকুমেন্টস।",
      en: "Chicken & egg supplier details and related documents.",
    },
    items: [
      {
        key: "chicken",
        title: { bn: "অ্যান্টিবায়োটিক-ফ্রি চিকেন", en: "Antibiotic-Free Chicken" },
        text: {
          bn: "অর্গানিক চিকেনসহ বাছাই করা সাপ্লায়ারদের অ্যান্টিবায়োটিক-ফ্রি চিকেন।",
          en: "Antibiotic-free chicken from selected suppliers, including Organik Chicken.",
        },
        alt: { bn: "কাঠের বোর্ডে কাঁচা মুরগির বুকের মাংস ও রান", en: "Raw chicken breasts and drumsticks on a wooden board" },
      },
      {
        key: "eggs",
        title: { bn: "ওমেগা-৩ ডিম", en: "Omega-3 Eggs" },
        text: { bn: "আমাদের নির্দিষ্ট সাপ্লায়ারের ওমেগা-৩ ডিম।", en: "Omega-3 eggs from our designated supplier." },
        alt: {
          bn: "ঝুড়িভর্তি বাদামি ডিম, সামনের বাটিতে ভাঙা ডিমের গাঢ় কমলা কুসুম",
          en: "A basket of brown eggs, with one cracked into a bowl showing a deep orange yolk",
        },
      },
      {
        key: "fish",
        title: { bn: "ডেইলি ফ্রেশ মাছ", en: "Daily Fresh Fish" },
        text: {
          bn: "মাছ প্রতিদিন বাজার থেকে কেনা হয়। ফ্রোজেন স্টক ব্যবহার করি না।",
          en: "Fish is bought fresh from the market every day. We never use frozen stock.",
        },
        alt: { bn: "বরফের ওপর দুটি টাটকা রুই মাছ", en: "Two fresh rui fish on crushed ice" },
      },
      {
        key: "meat",
        title: { bn: "বিশ্বস্ত ভেন্ডরের গরু ও খাসির মাংস", en: "Beef & Mutton from Authentic Vendors" },
        text: {
          bn: "গরু ও খাসির মাংস নেওয়া হয় শুধু বাছাই করা ভেন্ডরদের কাছ থেকে।",
          en: "Our beef and mutton come only from selected, trusted vendors.",
        },
        alt: {
          bn: "কাঠের বোর্ডে গরুর মাংসের টুকরা আর হাড়সহ খাসির মাংস",
          en: "Cubes of beef and bone-in mutton on a wooden board",
        },
      },
      {
        key: "vegetables",
        title: { bn: "ডেইলি ফ্রেশ সবজি", en: "Daily Fresh Vegetables" },
        text: {
          bn: "সবজি প্রতিদিন বাজার থেকে কেনা হয়। ফ্রোজেন স্টক ব্যবহার করি না।",
          en: "Vegetables are bought fresh from the market every day — never from frozen stock.",
        },
        alt: {
          bn: "বাঁশের ঝুড়িতে বেগুন, টমেটো, ঢেঁড়স, লাউ, লাল শাক আর কাঁচা মরিচ",
          en: "Aubergines, tomatoes, okra, gourd, red amaranth and green chillies in a bamboo basket",
        },
      },
      {
        key: "spices",
        title: { bn: "ইন-হাউস গ্রাইন্ডেড মসলা", en: "In-house Ground Spices" },
        text: {
          bn: "রেডিমেড মসলা মিক্স নয়। আস্ত মসলা কিনে মিলে গ্রাইন্ড করাই।",
          en: "No ready-made spice mixes. We buy whole spices and have them ground at the mill.",
        },
        alt: {
          bn: "বাটিতে জিরা, ধনে, শুকনা মরিচ, এলাচ, লবঙ্গ আর হলুদ-মরিচ-ধনের গুঁড়া",
          en: "Bowls of cumin, coriander, dried chillies, cardamom and cloves beside fresh turmeric, chilli and coriander powder",
        },
      },
      {
        key: "oil",
        title: { bn: "ব্র্যান্ডেড কুকিং অয়েল", en: "Branded Cooking Oil" },
        text: {
          bn: "ব্র্যান্ডেড কুকিং অয়েল ব্যবহার করি — রিইউজড অয়েল নয়।",
          en: "We cook with branded cooking oil — never reused oil.",
        },
        alt: { bn: "সিল করা বোতলে সয়াবিন তেল, পাশে বাটিতে সোনালি তেল", en: "A sealed bottle of soybean oil beside a bowl of golden oil" },
      },
      {
        key: "rice",
        title: { bn: "প্রিমিয়াম নাজিরশাইল চাল", en: "Premium Nazirshail Rice" },
        text: {
          bn: "কোয়ালিটি চাল ব্যবহার করি — প্রিমিয়াম নাজিরশাইল।",
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
    eyebrow: { bn: "আমাদের সাপ্তাহিক অফিস লাঞ্চ মেনু", en: "Our Weekly Office Lunch Menu" },
    title: { bn: "৬টি মেনু। সপ্তাহজুড়ে ভিন্ন ভিন্ন কম্বিনেশন।", en: "6 Menus. Different Combinations Throughout the Week." },
    lead: {
      bn: "শনিবার থেকে বৃহস্পতিবার — ৬টি ভিন্ন লাঞ্চ কম্বিনেশন। কোন মেনু কোন দিন যাবে সেটা ফিক্সড না, তবে প্রতিটি মেনুতে কী কী থাকছে, সেটা আগে থেকেই জানা যাবে।",
      en: "Six different lunch combinations, Saturday to Thursday. Which menu goes out on which day isn't fixed — but you'll always know in advance exactly what each menu includes.",
    },
    tabs: { bn: "মেনু বাছুন", en: "Choose a menu" },
    /** tab label prefix: "মেনু ০১" / "Menu 01" … (combinations, not days — no weekday names) */
    tab: { bn: "মেনু", en: "Menu" },
    subtitle: { bn: "কমপ্লিট মিল কম্বিনেশন", en: "Complete meal combination" },
    pictured: { bn: "ছবিতে", en: "Pictured" },
    note: {
      bn: "কোনো উপকরণ বদলাতে হলে তা আপনার অফিসের সঙ্গে এগ্রি করা কর্পোরেট মিল প্ল্যান অনুযায়ীই বদলায়। প্রতিটি মেনুর ডায়েটারি ইনফরমেশন চাইলেই পাবেন।",
      en: "Any ingredient substitution follows your agreed corporate meal plan. Dietary information for every menu is available on request.",
    },
    cta: { bn: "ফ্রি স্যাম্পল নিন", en: "Request Free Sample" },
  },

  /** Section 8 — corporate lunch enquiry form (rules: src/lib/enquiry.ts · server: api/enquiry.ts) */
  enquiry: {
    eyebrow: { bn: "কর্পোরেট লাঞ্চ এনকোয়ারি", en: "Corporate Lunch Enquiry" },
    title: { bn: "চলুন আপনার অফিস লাঞ্চ নিয়ে কথা বলি।", en: "Let's Talk About Your Office Lunch." },
    lead: {
      bn: "আপনার অফিসে প্রতিদিন কতগুলো মিল লাগবে, লোকেশন কোথায় আর কবে থেকে সার্ভিস শুরু করতে চান — এই তথ্যগুলো শেয়ার করুন। এরপর মেনু অপশন, প্রাইসিং আর ডেলিভারি অ্যারেঞ্জমেন্ট নিয়ে আলোচনা করা যাবে।",
      en: "Tell us how many meals your office needs a day, where you're located and when you'd like to start. Then we'll talk through menu options, pricing and delivery.",
    },
    points: [
      {
        key: "share",
        title: { bn: "আপনার রিকোয়ারমেন্ট জানান", en: "Share Your Requirements" },
        text: { bn: "দৈনিক মিল সংখ্যা, লোকেশন, শিডিউল", en: "Daily meal count, location, schedule" },
      },
      {
        key: "discuss",
        title: { bn: "মেনু ও প্রাইসিং নিয়ে আলোচনা", en: "Discuss Menu & Pricing" },
        text: { bn: "আপনার অফিসের রিকোয়ারমেন্ট অনুযায়ী", en: "Based on your office requirements" },
      },
      {
        key: "sample",
        title: { bn: "ফ্রি স্যাম্পলিংয়ের সুযোগ", en: "Free Sampling Available" },
        text: { bn: "আসল মিল অপশনগুলো টেস্ট করে দেখুন", en: "Experience the actual meal options" },
      },
    ],
    formTitle: { bn: "কর্পোরেট কোট রিকোয়েস্ট করুন", en: "Request a Corporate Quote" },
    formSub: { bn: "আপনার অফিস সম্পর্কে একটু জানান।", en: "Tell us a little about your office." },
    optional: { bn: "অপশনাল", en: "optional" },
    required: { bn: "আবশ্যক", en: "required" },
    fields: {
      company: { label: { bn: "কোম্পানি / অফিসের নাম", en: "Company / Office Name" }, placeholder: { bn: "কোম্পানির নাম লিখুন", en: "Enter company name" } },
      person: { label: { bn: "কন্টাক্ট পারসন", en: "Contact Person" }, placeholder: { bn: "পুরো নাম", en: "Full name" } },
      phone: { label: { bn: "ফোন / হোয়াটসঅ্যাপ", en: "Phone / WhatsApp" }, placeholder: { bn: "০১XXXXXXXXX", en: "01XXXXXXXXX" } },
      email: { label: { bn: "ইমেইল", en: "Email" }, placeholder: { bn: "name@company.com", en: "name@company.com" } },
      location: { label: { bn: "অফিস লোকেশন", en: "Office Location" }, placeholder: { bn: "সার্ভিস এরিয়া বেছে নিন", en: "Select service area" } },
      meals: { label: { bn: "দৈনিক আনুমানিক মিল", en: "Approx. Daily Meals" }, placeholder: { bn: "আনুমানিক মিল সংখ্যা", en: "Estimated meal count" } },
      start: { label: { bn: "শুরুর সম্ভাব্য তারিখ", en: "Preferred Start Date" }, placeholder: { bn: "তারিখ বেছে নিন", en: "Select date" } },
      budget: { label: { bn: "প্রতি মিলের আনুমানিক বাজেট", en: "Approx. Budget per Meal" }, placeholder: { bn: "যেমন ২৫০", en: "e.g. 250" } },
      notes: {
        label: { bn: "স্পেশাল রিকোয়ারমেন্ট", en: "Special Requirements" },
        placeholder: { bn: "ডায়েটারি রিকোয়ারমেন্ট, ডেলিভারির সময় বা অন্য কিছু", en: "Dietary needs, delivery time or anything else" },
      },
    },
    /** the service areas in the location list — `en` is also the value the form sends (src/lib/enquiry.ts › SERVICE_AREAS) */
    areas: [
      { bn: "গুলশান", en: "Gulshan" },
      { bn: "বনানী", en: "Banani" },
      { bn: "নিকেতন", en: "Niketon" },
      { bn: "বারিধারা", en: "Baridhara" },
      { bn: "বারিধারা ডিওএইচএস", en: "Baridhara DOHS" },
      { bn: "মহাখালী", en: "Mohakhali" },
      { bn: "মহাখালী ডিওএইচএস", en: "Mohakhali DOHS" },
      { bn: "তেজগাঁও", en: "Tejgaon" },
    ],
    /** "Other" asks us to check coverage */
    otherArea: { bn: "অন্য এলাকা (কভারেজ চেক করে জানাব)", en: "Other (we'll check coverage)" },
    currency: { bn: "৳", en: "Tk" },
    sample: { bn: "আগে একটা ফ্রি স্যাম্পল চাই", en: "I'd like a free sample first" },
    submit: { bn: "কর্পোরেট কোট রিকোয়েস্ট করুন", en: "Request Corporate Quote" },
    sending: { bn: "পাঠানো হচ্ছে…", en: "Sending…" },
    privacy: {
      bn: "এই তথ্য শুধু আপনার এনকোয়ারির উত্তর দিতে ব্যবহার করা হবে।",
      en: "We'll only use these details to reply to your enquiry.",
    },
    errors: {
      company: { bn: "কোম্পানি বা অফিসের নাম লিখুন।", en: "Please enter your company or office name." },
      person: { bn: "কন্টাক্ট পারসনের নাম লিখুন।", en: "Please enter the contact person's name." },
      phone: { bn: "সঠিক ফোন নম্বর লিখুন (যেমন ০১৭১২৩৪৫৬৭৮)।", en: "Please enter a valid phone number (e.g. 01712345678)." },
      location: { bn: "অফিস লোকেশন বেছে নিন।", en: "Please choose your office location." },
      meals: { bn: "দৈনিক মিল সংখ্যা লিখুন (শুধু সংখ্যা)।", en: "Please enter the number of meals per day (numbers only)." },
      email: { bn: "সঠিক ইমেইল লিখুন, অথবা ঘরটি খালি রাখুন।", en: "Please enter a valid email, or leave it empty." },
      budget: { bn: "শুধু সংখ্যা লিখুন, অথবা ঘরটি খালি রাখুন।", en: "Numbers only, or leave it empty." },
      start: { bn: "আজ বা পরের কোনো তারিখ বেছে নিন।", en: "Please choose today or a later date." },
      notes: { bn: "লেখাটি একটু ছোট করুন (১,০০০ অক্ষরের মধ্যে)।", en: "Please keep this under 1,000 characters." },
    },
    fixFields: { bn: "লাল চিহ্নিত ঘরগুলো ঠিক করে দিন।", en: "Please fix the highlighted fields." },
    success: {
      title: { bn: "ধন্যবাদ — আপনার এনকোয়ারি আমরা পেয়েছি।", en: "Thank you — we've received your enquiry." },
      /** `{phone}` → the number they gave */
      text: {
        bn: "আপনার অফিস লাঞ্চ নিয়ে কথা বলতে আমাদের টিম শিগগিরই {phone} নম্বরে যোগাযোগ করবে।",
        en: "Our team will contact you on {phone} shortly to talk about your office lunch.",
      },
      again: { bn: "আরেকটি এনকোয়ারি পাঠান", en: "Send another enquiry" },
    },
    failure: {
      title: { bn: "দুঃখিত, এই মুহূর্তে এনকোয়ারি পাঠানো যায়নি।", en: "Sorry — we couldn't send your enquiry just now." },
      text: { bn: "সরাসরি কল করুন, অথবা একটু পরে আবার চেষ্টা করুন।", en: "Please call us directly, or try again in a moment." },
      call: { bn: "কল করুন: ০১৭১১ ৪০০ ১৫১", en: "Call 01711 400 151" },
    },
  },

  /** Section 9 — about us */
  aboutUs: {
    eyebrow: { bn: "আমাদের কথা", en: "About Us" },
    title: { bn: "অফিস লাঞ্চকে আমরা **সিরিয়াসলি নিই।**", en: "We Take Office Lunch **Seriously.**" },
    body: {
      bn: "২০২৫ সালে শুরু হওয়া তবলা কিচেন ঢাকাভিত্তিক একটি কর্পোরেট ক্যাটারিং সার্ভিস, যার ফোকাস নিয়মিত অফিস লাঞ্চ। উপকরণ সোর্সিং আর কিচেন হাইজিন থেকে শুরু করে রান্না ও ডেলিভারি — প্রতিটি কাজে আমরা স্পষ্ট স্ট্যান্ডার্ড মেনে চলি।",
      en: "Founded in 2025, Tobla Kitchen is a Dhaka-based corporate catering service focused on regular office lunches. From ingredient sourcing and kitchen hygiene to food preparation and delivery, we maintain clear standards across our operations.",
    },
    valuesTitle: { bn: "আমাদের কাছে যা গুরুত্বপূর্ণ", en: "What Matters to Us" },
    values: [
      {
        title: { bn: "ফুড সেফটি সবার আগে", en: "Food Safety First" },
        text: {
          bn: "উপকরণ কোথা থেকে আসে আর রান্নার আগে কীভাবে হ্যান্ডেল করা হয় — সেদিকে আমরা খেয়াল রাখি।",
          en: "We pay attention to where our ingredients come from and how they're handled before cooking.",
        },
      },
      {
        title: { bn: "পরিচ্ছন্নতায় ছাড় নেই", en: "Hygiene Without Shortcuts" },
        text: {
          bn: "কিচেনের পরিচ্ছন্নতা, সঠিক ফুড হ্যান্ডলিং আর হাইজিন আমাদের প্রতিদিনের কাজের অংশ।",
          en: "Kitchen cleanliness, proper food handling and hygiene are part of our daily operations.",
        },
      },
      {
        title: { bn: "কোয়ান্টিটির চেয়ে কোয়ালিটি", en: "Quality Over Quantity" },
        text: {
          bn: "কম দাম দেখানোর জন্য উপকরণের কোয়ালিটি বা কিচেন স্ট্যান্ডার্ডে আমরা কম্প্রোমাইজ করি না।",
          en: "We don't compromise on ingredient quality or kitchen standards just to offer a lower price.",
        },
      },
    ],
  },

  /** Section 10 — contact (its heading differs from section 8's so the page doesn't repeat itself) */
  contactUs: {
    eyebrow: { bn: "যোগাযোগ", en: "Contact Us" },
    title: { bn: "সরাসরি কথা বলতে চান? আমাদের টিমকে কল করুন।", en: "Prefer to Talk? Reach Our Team Directly." },
    lead: {
      bn: "মেনু, প্রাইসিং, ডেলিভারি বা কর্পোরেট লাঞ্চ রিকোয়ারমেন্ট নিয়ে সরাসরি আমাদের টিমের সঙ্গে কথা বলতে পারেন।",
      en: "Talk to our team directly about menus, pricing, delivery or your office's lunch requirements.",
    },
    knowTitle: { bn: "কী লাগবে, আগে থেকেই জানেন?", en: "Already know what you need?" },
    knowText: {
      bn: "কর্পোরেট কোটেশনের জন্য ওপরের এনকোয়ারি ফর্ম ব্যবহার করতে পারেন।",
      en: "Use the enquiry form above to request a corporate quotation.",
    },
    toForm: { bn: "এনকোয়ারি ফর্মে যান", en: "Go to the enquiry form" },
    direct: { bn: "সরাসরি যোগাযোগ", en: "Direct Contact" },
    phone: { bn: "০১৭১১ ৪০০ ১৫১", en: "01711 400 151" },
    call: { bn: "কল করুন", en: "Call Now" },
    copy: { bn: "নম্বর কপি করুন", en: "Copy Number" },
    copied: { bn: "কপি হয়েছে!", en: "Copied!" },
    personLabel: { bn: "কন্টাক্ট পারসন", en: "Contact Person" },
    person: { bn: "রায়হান মাহমুদ", en: "Raihan Mahmud" },
    role: { bn: "জিএম, বিজনেস ডেভেলপমেন্ট", en: "GM, Business Development" },
    addressLabel: { bn: "কিচেনের ঠিকানা", en: "Kitchen Address" },
    address: { bn: "১৭/৫ কুনিপাড়া, তেজগাঁও, ঢাকা", en: "17/5 Kunipara, Tejgaon, Dhaka" },
    map: { bn: "গুগল ম্যাপে দেখুন", en: "View on Google Maps" },
    webLabel: { bn: "ওয়েবসাইট", en: "Website" },
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

  footer: {
    tagline: { bn: "কর্পোরেট অফিস লাঞ্চ • ঢাকা", en: "Corporate Office Lunch • Dhaka" },
    links: [
      { id: "top", label: { bn: "হোম", en: "Home" } },
      { id: "ingredients", label: { bn: "আমাদের স্ট্যান্ডার্ড", en: "Our Standards" } },
      { id: "menu", label: { bn: "মেনু", en: "Menus" } },
      { id: "about", label: { bn: "আমাদের কথা", en: "About Us" } },
      { id: "contact", label: { bn: "যোগাযোগ", en: "Contact" } },
    ],
    rights: { bn: "© ২০২৬ তবলা কিচেন। সর্বস্বত্ব সংরক্ষিত।", en: "© 2026 Tobla Kitchen. All rights reserved." },
    top: { bn: "উপরে যান", en: "Back to top" },
  },
};

export type SiteContent = typeof site;
