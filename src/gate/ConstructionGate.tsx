import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

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

/** The secret unlock phrase. Change this to rotate it. Compared case-insensitively. */
const UNLOCK_PHRASE = "bestwebsite";

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
  phone: { bn: "এখনই অর্ডার: ০১৭১১ ৪০০ ১৫১", en: "Order now: 01711 400 151" },
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
    if (v.toLowerCase() === UNLOCK_PHRASE) {
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

      {/* soft warm glow + grain, echoing the hero surface */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60rem 40rem at 50% -10%, var(--color-orange-50), transparent 60%), radial-gradient(40rem 30rem at 85% 110%, var(--color-orange-100), transparent 55%)",
        }}
      />
      <div aria-hidden className="grain pointer-events-none absolute inset-0 opacity-[0.04]" />

      {/* language toggle */}
      <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6">
        <div className="inline-flex overflow-hidden rounded-full border border-line bg-paper/80 text-sm font-semibold backdrop-blur">
          {(["bn", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-3.5 py-1.5 transition-colors ${
                lang === l ? "bg-ink text-paper" : "text-muted hover:text-ink"
              }`}
            >
              {l === "bn" ? "বাংলা" : "EN"}
            </button>
          ))}
        </div>
      </div>

      <main className="relative z-[1] mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* steaming pot mark */}
        <SteamingPot />

        <p className="eyebrow mt-8 text-orange-700">{t(copy.eyebrow)}</p>
        <h1
          className="mt-3 whitespace-pre-line text-balance text-5xl font-extrabold tracking-tight sm:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t(copy.heading)}
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">{t(copy.sub)}</p>

        {/* countdown */}
        <section className="mt-10 w-full" aria-label={t(copy.countdownLabel)}>
          <p className="eyebrow text-muted">{done ? t(copy.ready) : t(copy.countdownLabel)}</p>
          <div className="mt-3 flex items-stretch justify-center gap-2.5 sm:gap-4">
            {units.map(([n, label], i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="grid h-20 w-20 place-items-center rounded-2xl border border-line bg-paper shadow-sm tabular-nums sm:h-24 sm:w-24">
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
        <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md" noValidate>
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
              className="min-w-0 flex-1 rounded-full border border-line bg-paper px-5 py-3 text-base text-ink outline-none placeholder:text-muted/70 focus:border-orange-600"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-orange px-6 py-3 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
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

        <p className="mt-8 text-sm text-muted">
          <a href="tel:+8801711400151" className="font-semibold text-ink underline-offset-4 hover:underline">
            {t(copy.phone)}
          </a>
        </p>
      </main>
    </div>
  );
}

/** A small kettle/pot with three rising steam wisps. */
function SteamingPot() {
  return (
    <div className="relative grid h-28 w-28 place-items-center" aria-hidden>
      <svg className="steam absolute -top-1 h-16 w-16" viewBox="0 0 64 64" fill="none">
        {[16, 32, 48].map((x, i) => (
          <path
            key={x}
            className="steam-wisp"
            style={{ animationDelay: `${i * 0.6}s` }}
            d={`M${x} 56 C ${x - 7} 46, ${x + 7} 40, ${x} 30 C ${x - 7} 22, ${x + 7} 16, ${x} 8`}
            stroke="var(--color-orange)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <svg className="relative h-20 w-20 drop-shadow-sm" viewBox="0 0 96 96" fill="none">
        {/* lid */}
        <path d="M24 46 Q48 30 72 46 Z" fill="var(--color-ink)" />
        <rect x="44" y="30" width="8" height="8" rx="4" fill="var(--color-orange)" />
        {/* pot body */}
        <path d="M22 48 H74 L70 76 Q68 84 60 84 H36 Q28 84 26 76 Z" fill="var(--color-orange)" />
        <path d="M22 48 H74 L73 55 H23 Z" fill="var(--color-orange-600)" />
        {/* handles */}
        <path d="M18 54 q-8 2 -8 10 q0 8 8 8" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M78 54 q8 2 8 10 q0 8 -8 8" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}

function GateStyles() {
  return (
    <style>{`
      @keyframes steamRise {
        0%   { opacity: 0; transform: translateY(6px) scaleY(0.85); }
        35%  { opacity: 0.7; }
        100% { opacity: 0; transform: translateY(-10px) scaleY(1.1); }
      }
      .steam-wisp {
        transform-origin: center bottom;
        animation: steamRise 3s ease-in-out infinite;
      }
      @media (prefers-reduced-motion: reduce) {
        .steam-wisp { animation: none; opacity: 0.45; }
      }
    `}</style>
  );
}
