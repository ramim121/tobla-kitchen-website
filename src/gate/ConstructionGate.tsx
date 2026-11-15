import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { BellRing, Flame, Sprout } from "lucide-react";

import plateHeroL from "../assets/food/plate-hero-960.webp";
import plateHeroS from "../assets/food/plate-hero-560.webp";
import dishRoast from "../assets/food/dish-roast-520.webp";
import dishPrawn from "../assets/food/dish-prawn-520.webp";

/** Brand mark lives in public/ — reference by URL, not import. */
const logoUrl = "/favicon.svg";

/* ─────────────────────────────────────────────────────────────────────────
   "Something's cooking" construction gate for Tobla Kitchen.

   • Shows a 5-day countdown + a launch-tease waitlist form to the public.
   • The email box is also the secret unlock: typing the pass-phrase and
     submitting reveals the real site. Any other input gets a (fake) "you're
     on the list" confirmation — so general visitors never learn the phrase.

   This is a soft gate: because the site is static, the phrase lives in the
   shipped JS. It keeps casual visitors out and teases the launch; it is NOT
   real security. The real home page is still code-split and only downloaded
   after unlock (see Root.tsx).
   ──────────────────────────────────────────────────────────────────────── */

/**
 * The secret unlock phrase. Typing this in the email box (and submitting)
 * reveals the real site. Compared case-insensitively, so "Bestwebsite",
 * "BESTWEBSITE" etc. all work. Change it to rotate the password.
 */
const UNLOCK_PHRASES = ["bestwebsite"];

/**
 * When the countdown ends. Set to ~5 days from the launch of the gate.
 * Edit this one line to move the target (Dhaka time, UTC+6).
 */
const LAUNCH_AT = new Date("2026-11-20T18:00:00+06:00").getTime();

type Lang = "bn" | "en";
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (s: string | number) => String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

const copy = {
  brand: { bn: "তবলা কিচেন", en: "Tobla Kitchen" },
  tagline: { bn: "কর্পোরেট ক্যাটারিং · ঢাকা", en: "Corporate catering · Dhaka" },
  eyebrow: { bn: "শীঘ্রই আসছে", en: "Coming soon" },
  heading: { bn: "কিছু একটা\nরান্না হচ্ছে", en: "Something's\ncooking" },
  sub: {
    bn: "আমাদের নতুন ওয়েবসাইট এখন চুলায়। একটু সময় দিন — গরম গরম পরিবেশন করব।",
    en: "Our new website is on the stove. Give us a moment — we'll serve it hot.",
  },
  countdownLabel: { bn: "লঞ্চ হতে বাকি", en: "Launching in" },
  units: {
    d: { bn: "দিন", en: "Days" },
    h: { bn: "ঘণ্টা", en: "Hours" },
    m: { bn: "মিনিট", en: "Mins" },
    s: { bn: "সেকেন্ড", en: "Secs" },
  },
  formLabel: { bn: "তৈরি হলে সবার আগে জানতে চান?", en: "Want to know the moment we open?" },
  placeholder: { bn: "আপনার ইমেইল", en: "Your email" },
  button: { bn: "জানিয়ে দিন", en: "Notify me" },
  success: {
    bn: "ধন্যবাদ! তৈরি হলেই আপনাকে সবার আগে জানাব।",
    en: "Thanks! You'll be the first to know when we open.",
  },
  empty: { bn: "অনুগ্রহ করে একটি ইমেইল দিন।", en: "Please enter an email." },
  ready: { bn: "রান্না শেষ — প্রায় তৈরি!", en: "The dish is ready — almost there!" },
  trust: { bn: "১০০% ট্রেসেবল উপকরণ", en: "100% traceable ingredients" },
  phonePrefix: { bn: "এখনই অর্ডার", en: "Order now" },
} as const;

function useCountdown(target: number) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const done = diff <= 0;
  const d = Math.floor(diff / 86_400_000);
  const h = Math.floor((diff % 86_400_000) / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { d, h, m, s, done };
}

export function ConstructionGate({ onUnlock }: { onUnlock: () => void }) {
  const [lang, setLang] = useState<Lang>("bn");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "empty">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const { d, h, m, s, done } = useCountdown(LAUNCH_AT);

  const t = useMemo(() => (pair: { bn: string; en: string }) => pair[lang], [lang]);
  const num = (n: number) => (lang === "bn" ? toBn(String(n).padStart(2, "0")) : String(n).padStart(2, "0"));

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const prev = document.title;
    document.title = lang === "bn" ? "শীঘ্রই আসছে — তবলা কিচেন" : "Coming soon — Tobla Kitchen";
    return () => {
      document.title = prev;
    };
  }, [lang]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const v = value.trim();
    if (UNLOCK_PHRASES.includes(v.toLowerCase())) {
      onUnlock();
      return;
    }
    if (!v) {
      setStatus("empty");
      inputRef.current?.focus();
      return;
    }
    // Any other input: pretend to subscribe (fake confirmation).
    setStatus("success");
    setValue("");
  }

  const units: Array<[number, { bn: string; en: string }]> = [
    [d, copy.units.d],
    [h, copy.units.h],
    [m, copy.units.m],
    [s, copy.units.s],
  ];

  return (
    <div className="relative min-h-dvh overflow-hidden bg-cream text-ink">
      <GateStyles />

      {/* warm glows + grain, echoing the hero surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55rem 38rem at 78% -8%, var(--color-orange-100), transparent 58%), radial-gradient(42rem 32rem at 8% 108%, var(--color-orange-50), transparent 55%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />

      {/* top bar: brand lockup + language toggle */}
      <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <a href="/" className="flex items-center gap-2.5" aria-label={t(copy.brand)}>
          <img src={logoUrl} alt="" className="h-9 w-9 sm:h-10 sm:w-10" />
          <span className="flex flex-col leading-tight">
            <span className="text-base font-extrabold tracking-tight sm:text-lg" style={{ fontFamily: "var(--font-display)" }}>
              {t(copy.brand)}
            </span>
            <span className="hidden text-[11px] font-medium text-muted sm:block">{t(copy.tagline)}</span>
          </span>
        </a>
        <div className="inline-flex overflow-hidden rounded-full border border-line bg-paper/80 text-sm font-semibold backdrop-blur">
          {(["bn", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-3.5 py-1.5 transition-colors ${lang === l ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              {l === "bn" ? "বাংলা" : "EN"}
            </button>
          ))}
        </div>
      </header>

      <main className="relative z-[1] mx-auto flex min-h-dvh max-w-6xl flex-col justify-center px-6 pb-14 pt-28 sm:pt-32 lg:py-24">
        <div className="grid items-center gap-y-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-x-12 xl:gap-x-20">
          {/* ───────── left: message + countdown + form ───────── */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="eyebrow inline-flex items-center gap-2 text-orange-700">
              <Flame className="pulse-flame h-4 w-4" strokeWidth={2.5} aria-hidden />
              {t(copy.eyebrow)}
            </p>
            <h1
              className="mt-3 whitespace-pre-line text-balance text-5xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t(copy.heading)}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-lg text-muted lg:mx-0">{t(copy.sub)}</p>

            {/* countdown */}
            <section className="mt-9" aria-label={t(copy.countdownLabel)}>
              <p className="eyebrow text-muted">{done ? t(copy.ready) : t(copy.countdownLabel)}</p>
              <div className="mt-3 flex items-stretch justify-center gap-2.5 sm:gap-3.5 lg:justify-start">
                {units.map(([n, label], i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="relative grid h-[76px] w-[72px] place-items-center overflow-hidden rounded-2xl bg-ink text-paper shadow-lg tabular-nums sm:h-24 sm:w-[84px]">
                      <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-orange" />
                      <span className="text-3xl font-bold sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                        {num(n)}
                      </span>
                    </div>
                    <span className="mt-2 text-xs font-semibold text-muted">{t(label)}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* waitlist / secret-unlock form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-9 w-full max-w-md lg:mx-0" noValidate>
              <label htmlFor="notify" className="block text-sm font-semibold text-ink">
                {t(copy.formLabel)}
              </label>
              <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
                <input
                  ref={inputRef}
                  id="notify"
                  name="email"
                  type="text"
                  inputMode="email"
                  autoComplete="off"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (status !== "idle") setStatus("idle");
                  }}
                  placeholder={t(copy.placeholder)}
                  aria-describedby="notify-msg"
                  className="min-w-0 flex-1 rounded-full border border-line bg-paper px-5 py-3 text-base text-ink shadow-sm outline-none placeholder:text-muted/70 focus:border-orange-600"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-base font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <BellRing className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden />
                  {t(copy.button)}
                </button>
              </div>
              <p
                id="notify-msg"
                role="status"
                aria-live="polite"
                className={`mt-2.5 min-h-5 text-sm ${status === "empty" ? "text-critical" : "text-orange-700"}`}
              >
                {status === "success" ? t(copy.success) : status === "empty" ? t(copy.empty) : " "}
              </p>
            </form>

            <p className="mt-6 text-sm text-muted">
              <span className="font-medium">{t(copy.phonePrefix)}: </span>
              <a href="tel:+8801711400151" className="font-semibold text-ink underline-offset-4 hover:underline">
                {lang === "bn" ? "০১৭১১ ৪০০ ১৫১" : "01711 400 151"}
              </a>
            </p>
          </div>

          {/* ───────── right: food composition ───────── */}
          <div className="order-1 flex justify-center lg:order-2">
            <FoodHero trust={t(copy.trust)} />
          </div>
        </div>
      </main>
    </div>
  );
}

/** A big steaming plate in a ringed circle, with floating dish chips + a trust badge. */
function FoodHero({ trust }: { trust: string }) {
  return (
    <div className="relative aspect-square w-[min(84vw,300px)] sm:w-[380px] lg:w-[440px]">
      {/* soft glow behind */}
      <div aria-hidden className="absolute -inset-5 rounded-full bg-orange-100 opacity-60 blur-2xl" />
      {/* rotating dashed ring */}
      <div aria-hidden className="animate-spin-slow absolute inset-0 rounded-full border-2 border-dashed border-orange-200" />
      {/* thin solid inner ring */}
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-line" />

      {/* steam rising off the plate */}
      <svg aria-hidden className="absolute -top-5 left-1/2 z-10 h-20 w-24 -translate-x-1/2" viewBox="0 0 96 80" fill="none">
        {[30, 48, 66].map((x, i) => (
          <path
            key={x}
            className="steam-wisp"
            style={{ animationDelay: `${i * 0.65}s` }}
            d={`M${x} 76 C ${x - 9} 62, ${x + 9} 52, ${x} 38 C ${x - 9} 26, ${x + 9} 18, ${x} 6`}
            stroke="var(--color-orange)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {/* the plate photo */}
      <div className="absolute inset-[11%] overflow-hidden rounded-full shadow-2xl ring-[6px] ring-paper">
        <img
          src={plateHeroS}
          srcSet={`${plateHeroS} 560w, ${plateHeroL} 960w`}
          sizes="(min-width:1024px) 440px, (min-width:640px) 380px, 300px"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>

      {/* floating dish chips */}
      <img
        src={dishRoast}
        alt=""
        className="animate-float absolute -left-2 bottom-10 h-20 w-20 rounded-full object-cover shadow-xl ring-4 ring-paper sm:-left-4 sm:h-24 sm:w-24"
      />
      <img
        src={dishPrawn}
        alt=""
        className="animate-float absolute -right-1 top-8 h-16 w-16 rounded-full object-cover shadow-xl ring-4 ring-paper sm:right-0 sm:h-20 sm:w-20"
        style={{ animationDelay: "1.3s" }}
      />

      {/* trust badge */}
      <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-lg ring-1 ring-line sm:text-sm">
        <Sprout className="h-4 w-4 text-safe" strokeWidth={2.5} aria-hidden />
        {trust}
      </div>
    </div>
  );
}

function GateStyles() {
  return (
    <style>{`
      @keyframes steamRise {
        0%   { opacity: 0; transform: translateY(6px) scaleY(0.85); }
        35%  { opacity: 0.65; }
        100% { opacity: 0; transform: translateY(-12px) scaleY(1.12); }
      }
      .steam-wisp {
        transform-origin: center bottom;
        animation: steamRise 3.2s ease-in-out infinite;
      }
      @keyframes pulseFlame {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.6; transform: scale(0.88); }
      }
      .pulse-flame { animation: pulseFlame 1.8s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .steam-wisp { animation: none; opacity: 0.4; }
        .pulse-flame { animation: none; }
      }
    `}</style>
  );
}
