import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
  type RefObject,
} from "react";
import { BellRing, Flame, Pause, Play, Rocket, Sprout, TriangleAlert, UtensilsCrossed, type LucideIcon } from "lucide-react";

import plateHeroL from "../assets/food/plate-hero-960.webp";
import plateHeroS from "../assets/food/plate-hero-560.webp";
import dishRoast from "../assets/food/dish-roast-520.webp";

import { LogoLockup } from "../components/brand/Logo";
import { Stamp } from "../components/ui/Stamp";
import { TablaRings } from "../components/ui/TablaRings";
import { Vapour } from "./Vapour";
import "./gate.css";

/* ─────────────────────────────────────────────────────────────────────────
   "Launch or lunch?" construction gate for Tobla Kitchen.

   • The headline is a one-glyph pun. In Bangla, লঞ্চ (launch) becomes লাঞ্চ
     (lunch) by adding a single stroke, the "া"; in English, "Launch" becomes
     "Lunch" by dropping the "a". The page flips between the two every few
     seconds: one side counts down to the website launch, the other to the
     visitor's next lunch (1 PM on their own clock).
   • Steam rises across the whole page (see Vapour.tsx).
   • The email box is also the secret unlock: typing the pass-phrase and
     submitting reveals the real site. Any other input gets a (fake) "you're
     on the list" confirmation — so general visitors never learn the phrase.

   This is a soft gate: because the site is static, the phrase lives in the
   shipped JS. It keeps casual visitors out and teases the launch; it is NOT
   real security. The real home page is still code-split and only downloaded
   after unlock (see GatedRoot.tsx). The gate only appears in builds with
   VITE_GATE=on (see vite.config.ts and README).
   ──────────────────────────────────────────────────────────────────────── */

/**
 * The secret unlock phrase. Typing this in the email box (and submitting)
 * reveals the real site. Compared case-insensitively, so "Bestwebsite",
 * "BESTWEBSITE" etc. all work. Change it to rotate the password.
 */
const UNLOCK_PHRASES = ["bestwebsite"];

/**
 * When the launch countdown ends.
 * Edit this one line to move the target (Dhaka time, UTC+6).
 */
const LAUNCH_AT = new Date("2026-11-20T18:00:00+06:00").getTime();

/** Lunch is at 1 PM on the visitor's own clock; "it's lunchtime" stays up for an hour. */
const LUNCH_HOUR = 13;

/** Page colour behind the gate, and the browser theme colour the real site uses. */
const GATE_BG = "#231f20";
const SITE_THEME = "#FFFFFF";

/** How long each side of the pun stays up before it flips by itself. */
const FLIP_MS = 5200;
/** The first flip comes sooner, so visitors catch the joke straight away. */
const FIRST_FLIP_MS = 2400;

type Lang = "bn" | "en";
type Mode = "launch" | "lunch";
type Pair = { bn: string; en: string };

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
const toBn = (s: string | number) => String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

const copy = {
  tagline: { bn: "কর্পোরেট ক্যাটারিং · ঢাকা", en: "Corporate catering · Dhaka" },
  title: { bn: "লঞ্চ, নাকি লাঞ্চ? — তবলা কিচেন", en: "Launch or lunch? — Tobla Kitchen" },
  eyebrow: { bn: "কিছু একটা রান্না হচ্ছে", en: "Something's cooking" },
  heading: {
    launch: { bn: "লঞ্চ হতে বাকি", en: "Launch in" },
    lunch: { bn: "লাঞ্চ হতে বাকি", en: "Lunch in" },
  },
  units: {
    d: { bn: "দিন", en: "Days" },
    h: { bn: "ঘণ্টা", en: "Hours" },
    m: { bn: "মিনিট", en: "Mins" },
    s: { bn: "সেকেন্ড", en: "Secs" },
  },
  modeLabel: { bn: "কীসের কাউন্টডাউন", en: "Which countdown" },
  modes: {
    launch: { bn: "লঞ্চ", en: "Launch" },
    lunch: { bn: "লাঞ্চ", en: "Lunch" },
  },
  caption: {
    launch: { bn: "নতুন ওয়েবসাইট আসছে", en: "Our new website is coming" },
    launchDone: { bn: "রান্না শেষ — প্রায় তৈরি!", en: "The dish is ready — almost there!" },
    lunchToday: { bn: "আজ দুপুর ১টায় লাঞ্চ", en: "Lunch today at 1 PM" },
    lunchTomorrow: { bn: "আগামীকাল দুপুর ১টায় লাঞ্চ", en: "Lunch tomorrow at 1 PM" },
    lunchNow: { bn: "এখন লাঞ্চের সময় — খেয়ে আসুন!", en: "It's lunchtime — go eat!" },
  },
  lead: {
    bn: "আমাদের নতুন ওয়েবসাইট এখন চুলায়। যতদিন না আমরা পরিবেশন করছি, ততদিন",
    en: "Our new website is still on the stove. Until we serve you,",
  },
  leadPunch: { bn: "বুঝেশুনে লাঞ্চ করুন।", en: "lunch responsibly." },
  seal: { bn: "বুঝেশুনে লাঞ্চ করুন • LUNCH RESPONSIBLY • ", en: "LUNCH RESPONSIBLY • বুঝেশুনে লাঞ্চ করুন • " },
  formLabel: { bn: "তৈরি হলে সবার আগে জানতে চান?", en: "Want to know the moment we open?" },
  placeholder: { bn: "আপনার ইমেইল", en: "Your email" },
  button: { bn: "জানিয়ে দিন", en: "Notify me" },
  success: {
    bn: "ধন্যবাদ! তৈরি হলেই আপনাকে সবার আগে জানাব।",
    en: "Thanks! You'll be the first to know when we open.",
  },
  empty: { bn: "অনুগ্রহ করে একটি ইমেইল দিন।", en: "Please enter an email." },
  trust: { bn: "১০০% ট্রেসেবল উপকরণ", en: "100% traceable ingredients" },
  phonePrefix: { bn: "এখনই অর্ডার", en: "Order now" },
  warnLabel: { bn: "সংবিধিবদ্ধ সতর্কীকরণ:", en: "Statutory warning:" },
  warn: {
    bn: "খালি পেটে অপেক্ষা করা স্বাস্থ্যের জন্য ক্ষতিকর।",
    en: "waiting on an empty stomach is injurious to health.",
  },
  pause: { bn: "অ্যানিমেশন থামান", en: "Pause animation" },
  resume: { bn: "অ্যানিমেশন চালান", en: "Play animation" },
} as const;

/**
 * The pun, one glyph per language. `combo` is the letter before the glyph plus
 * the glyph itself — it is drawn as one run so Bangla shaping stays correct
 * (see gate.css). `onMode` is the side on which the glyph is present.
 */
const PUN = {
  bn: { pre: "ল", combo: "লা", post: "ঞ্চ", rest: " হতে বাকি", onMode: "lunch", guess: { pre: 0.62, glyph: 0.3 } },
  en: { pre: "L", combo: "La", post: "unch", rest: " in", onMode: "launch", guess: { pre: 0.5, glyph: 0.52 } },
} as const;

const MODES: Mode[] = ["launch", "lunch"];
const MODE_ICON: Record<Mode, LucideIcon> = { launch: Rocket, lunch: UtensilsCrossed };
const UNITS = ["d", "h", "m", "s"] as const;

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function useReducedMotion() {
  const [reduce, setReduce] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduce;
}

/** Milliseconds → [days, hours, minutes, seconds]. */
function split(ms: number) {
  return [
    Math.floor(ms / 86_400_000),
    Math.floor((ms % 86_400_000) / 3_600_000),
    Math.floor((ms % 3_600_000) / 60_000),
    Math.floor((ms % 60_000) / 1000),
  ] as const;
}

/** Time left until the visitor's next 1 PM lunch (zero while lunch is on). */
function nextLunch(now: number): { left: number; when: "today" | "tomorrow" | "now" } {
  const d = new Date(now);
  const today = new Date(d.getFullYear(), d.getMonth(), d.getDate(), LUNCH_HOUR).getTime();
  if (now < today) return { left: today - now, when: "today" };
  if (now < today + 3_600_000) return { left: 0, when: "now" };
  const tomorrow = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, LUNCH_HOUR).getTime();
  return { left: tomorrow - now, when: "tomorrow" };
}

type GateProps = {
  /** Show the real site. */
  onUnlock: () => void;
  /** Called the moment the phrase is accepted, before the reveal plays (used to preload the site). */
  onUnlockStart?: () => void;
};

export function ConstructionGate({ onUnlock, onUnlockStart }: GateProps) {
  const [lang, setLang] = useState<Lang>("bn");
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "empty">("idle");
  const [mode, setMode] = useState<Mode>("launch");
  const [auto, setAuto] = useState(true);
  const [flips, setFlips] = useState(0);
  const [paused, setPaused] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const now = useNow();

  const t = useMemo(() => (pair: Pair) => pair[lang], [lang]);
  const num = (n: number) => {
    const s = String(n).padStart(2, "0");
    return lang === "bn" ? toBn(s) : s;
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const prev = document.title;
    document.title = copy.title[lang];
    return () => {
      document.title = prev;
    };
  }, [lang]);

  // The site behind the gate is light, the gate is dark. A VITE_GATE=on build already
  // paints the page dark (vite.config.ts, so there is no white flash before the gate shows);
  // this keeps it that way and hands the light colours back on unlock.
  useEffect(() => {
    const root = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]');
    root.style.background = GATE_BG;
    document.body.style.background = GATE_BG;
    meta?.setAttribute("content", GATE_BG);
    return () => {
      root.style.background = "";
      document.body.style.background = "";
      meta?.setAttribute("content", SITE_THEME);
    };
  }, []);

  // The pun flips by itself until the visitor picks a side, pauses, or prefers less motion.
  const autoOn = auto && !paused && !reduce && !leaving;
  const flipIn = flips === 0 ? FIRST_FLIP_MS : FLIP_MS;
  useEffect(() => {
    if (!autoOn) return;
    const id = window.setTimeout(() => {
      setFlips((n) => n + 1);
      setMode((m) => (m === "launch" ? "lunch" : "launch"));
    }, flipIn);
    return () => window.clearTimeout(id);
  }, [autoOn, mode, flipIn]);

  function pick(next: Mode) {
    setAuto(false);
    setMode(next);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (leaving) return;
    const v = value.trim();
    if (UNLOCK_PHRASES.includes(v.toLowerCase())) {
      onUnlockStart?.();
      if (reduce) {
        onUnlock();
        return;
      }
      // the steam fills the screen, then the real site is there
      setLeaving(true);
      window.setTimeout(onUnlock, 820);
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

  const launchLeft = Math.max(0, LAUNCH_AT - now);
  const lunch = nextLunch(now);
  const launchParts = split(launchLeft);
  const lunchParts = split(lunch.left);

  const caption =
    mode === "launch"
      ? launchLeft <= 0
        ? copy.caption.launchDone
        : copy.caption.launch
      : lunch.when === "now"
        ? copy.caption.lunchNow
        : lunch.when === "today"
          ? copy.caption.lunchToday
          : copy.caption.lunchTomorrow;

  return (
    <div className={`gate relative flex min-h-dvh flex-col overflow-hidden bg-ink text-paper ${paused ? "is-paused" : ""} ${leaving ? "is-leaving" : ""}`}>
      {/* heat from below + a soft vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(62rem 30rem at 50% 114%, rgba(243,111,33,0.22), transparent 62%), radial-gradient(120% 90% at 50% 36%, transparent 54%, rgba(0,0,0,0.4))",
        }}
      />

      {/* steam: over the plate, behind the words */}
      <Vapour
        sourceRef={plateRef}
        paused={paused}
        burst={leaving}
        className={`pointer-events-none fixed inset-0 size-full ${leaving ? "z-[55]" : "z-10"}`}
      />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-[11] opacity-[0.07]" />

      {/* top bar: brand lockup + language toggle */}
      <header className="gate-content absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <div className="flex items-center gap-3">
          <a href="/" className="rounded-xl">
            <LogoLockup tone="light" />
          </a>
          <span className="hidden border-l border-paper/20 pl-3 text-[11px] font-medium text-paper/70 sm:block">{t(copy.tagline)}</span>
        </div>
        <div className="inline-flex overflow-hidden rounded-full border border-paper/20 bg-paper/[0.06] text-sm font-semibold backdrop-blur">
          {(["bn", "en"] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-3.5 py-1.5 transition-colors ${lang === l ? "bg-paper text-ink" : "text-paper/75 hover:text-paper"}`}
            >
              {l === "bn" ? "বাংলা" : "EN"}
            </button>
          ))}
        </div>
      </header>

      <main className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pb-10 pt-28 sm:pt-32 lg:pb-10 lg:pt-28">
        <div className="grid items-center gap-y-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-x-12 xl:gap-x-20">
          {/* ───────── left: the pun + countdown + form ───────── */}
          <div className="gate-content relative z-20 order-2 min-w-0 text-center lg:order-1 lg:text-left">
            {/* a soft dark cloud behind the words keeps them crisp when steam passes */}
            <div aria-hidden="true" className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[72px] bg-ink/35 blur-3xl" />

            <p className="eyebrow inline-flex items-center gap-2 text-orange">
              <Flame className="gate-flame h-4 w-4" strokeWidth={2.5} aria-hidden="true" />
              {t(copy.eyebrow)}
            </p>

            <PunHeading key={lang} lang={lang} mode={mode} label={t(copy.heading[mode])} />

            {/* countdown: launch on one side of the pun, lunch on the other */}
            <section className="mt-6" aria-label={t(copy.heading[mode])}>
              <div className="flex items-stretch justify-center gap-2 min-[360px]:gap-2.5 sm:gap-3.5 lg:justify-start">
                {UNITS.map((unit, i) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="relative h-[76px] w-[min(72px,19vw)] overflow-hidden rounded-2xl border border-paper/15 bg-paper/[0.08] shadow-[0_18px_40px_-20px_rgba(0,0,0,0.85)] backdrop-blur-md sm:h-24 sm:w-[84px]">
                      <span aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-1 bg-orange" />
                      <RollNumber index={i} mode={mode} launch={num(launchParts[i])} lunch={num(lunchParts[i])} />
                    </div>
                    <span className="mt-2 text-xs font-semibold text-paper/70">{t(copy.units[unit])}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col items-center gap-x-4 gap-y-2.5 sm:flex-row sm:justify-center lg:justify-start">
                <div role="group" aria-label={t(copy.modeLabel)} className="inline-flex rounded-full border border-paper/15 bg-paper/[0.06] p-1 backdrop-blur">
                  {MODES.map((k) => {
                    const on = mode === k;
                    const Icon = MODE_ICON[k];
                    return (
                      <button
                        key={k}
                        type="button"
                        aria-pressed={on}
                        onClick={() => pick(k)}
                        className={`relative inline-flex items-center gap-1.5 overflow-hidden rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300 ${
                          on ? "bg-orange text-ink" : "text-paper/75 hover:text-paper"
                        }`}
                      >
                        <Icon className="h-4 w-4" strokeWidth={2.4} aria-hidden="true" />
                        {t(copy.modes[k])}
                        {on && autoOn && (
                          <span
                            key={flips}
                            aria-hidden="true"
                            className="gate-mode-timer absolute inset-x-3 bottom-[3px] h-[2px] rounded-full bg-ink/50"
                            style={{ "--flip-ms": `${flipIn}ms` } as CSSProperties}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                <p className="text-sm font-medium text-paper/80">{t(caption)}</p>
              </div>
            </section>

            <p className="mx-auto mt-7 max-w-md text-lg text-paper/80 lg:mx-0">
              {t(copy.lead)}{" "}
              <mark className="mark-hl mark-hl-dark is-on bg-transparent font-semibold text-paper">{t(copy.leadPunch)}</mark>
            </p>

            {/* waitlist / secret-unlock form */}
            <form onSubmit={handleSubmit} className="mx-auto mt-7 w-full max-w-md lg:mx-0" noValidate>
              <label htmlFor="notify" className="block text-sm font-semibold text-paper">
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
                  className="min-w-0 flex-1 rounded-full border border-paper/25 bg-ink/50 px-5 py-3 text-base text-paper shadow-sm outline-none backdrop-blur placeholder:text-paper/55 focus:border-orange"
                />
                <button
                  type="submit"
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-orange px-6 py-3 text-base font-semibold text-ink shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <BellRing className="h-[18px] w-[18px]" strokeWidth={2.5} aria-hidden="true" />
                  {t(copy.button)}
                </button>
              </div>
              <p
                id="notify-msg"
                role="status"
                aria-live="polite"
                className={`mt-2.5 min-h-5 text-sm ${status === "empty" ? "text-[#ffa497]" : "text-orange"}`}
              >
                {status === "success" ? t(copy.success) : status === "empty" ? t(copy.empty) : " "}
              </p>
            </form>

            <p className="mt-4 text-sm text-paper/70">
              <span className="font-medium">{t(copy.phonePrefix)}: </span>
              <a href="tel:+8801711400151" className="font-semibold text-paper underline-offset-4 hover:underline">
                {lang === "bn" ? "০১৭১১ ৪০০ ১৫১" : "01711 400 151"}
              </a>
            </p>
          </div>

          {/* ───────── right: the plate the steam rises from ───────── */}
          <div className="gate-content order-1 flex justify-center lg:order-2">
            <FoodHero plateRef={plateRef} trust={t(copy.trust)} seal={t(copy.seal)} />
          </div>
        </div>
      </main>

      {/* the small print, in the manner of a health warning */}
      <footer className="gate-content relative z-20 flex flex-col items-center justify-between gap-3 px-6 pb-5 text-xs text-paper/70 sm:flex-row sm:px-8">
        <p className="inline-flex items-start gap-2 text-center sm:text-left">
          <TriangleAlert className="mt-px h-3.5 w-3.5 shrink-0 text-orange" strokeWidth={2.4} aria-hidden="true" />
          <span>
            <span className="font-semibold text-paper/90">{t(copy.warnLabel)}</span> {t(copy.warn)}
          </span>
        </p>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-paper/20 px-3 py-1.5 font-semibold text-paper/80 transition-colors hover:border-paper/45 hover:text-paper"
          >
            {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
            {t(paused ? copy.resume : copy.pause)}
          </button>
        )}
      </footer>

      {/* unlock: the screen whites out to the colour of the real site */}
      <div aria-hidden="true" className={`gate-flood pointer-events-none fixed inset-0 z-[60] bg-paper ${leaving ? "is-on" : ""}`} />
    </div>
  );
}

/**
 * "লঞ্চ হতে বাকি" ⇄ "লাঞ্চ হতে বাকি" (or "Launch in" ⇄ "Lunch in").
 * Only one glyph changes; it condenses in like steam and evaporates out.
 */
function PunHeading({ lang, mode, label }: { lang: Lang; mode: Mode; label: string }) {
  const pun = PUN[lang];
  const on = mode === pun.onMode;
  const ref = useRef<HTMLHeadingElement>(null);
  // widths in em, so they hold at every font size: the letter before the glyph, and the glyph itself
  const [m, setM] = useState<{ pre: number; glyph: number }>(pun.guess);

  useLayoutEffect(() => {
    const h = ref.current;
    if (!h) return;
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const word = h.querySelector<HTMLElement>("[data-pun-word]");
      const pre = h.querySelector<HTMLElement>("[data-m=pre]")?.getBoundingClientRect().width ?? 0;
      const combo = h.querySelector<HTMLElement>("[data-m=combo]")?.getBoundingClientRect().width ?? 0;
      const fontSize = word ? parseFloat(getComputedStyle(word).fontSize) : 0;
      if (fontSize > 0 && pre > 0 && combo > pre) setM({ pre: pre / fontSize, glyph: (combo - pre) / fontSize });
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      alive = false;
    };
  }, [lang]);

  return (
    <h1
      ref={ref}
      aria-label={label}
      className="mt-3 whitespace-nowrap text-[clamp(2.4rem,12.2vw,5.4rem)] text-paper"
      style={{ fontFamily: "var(--font-display)" }}
    >
      <span aria-hidden="true">
        <span data-pun-word className="relative font-extrabold">
          {pun.pre}
          <span className={`pun-slot ${on ? "is-on" : ""}`} style={{ "--pun-w": `${m.glyph}em`, "--pun-pre": `${m.pre}em` } as CSSProperties}>
            {"​"}
            <span className="pun-glyph">{pun.combo}</span>
          </span>
          {pun.post}
          <span className="pun-measure">
            <span data-m="pre">{pun.pre}</span>
            <span data-m="combo">{pun.combo}</span>
          </span>
        </span>
        <span className="font-medium text-paper/75">{pun.rest}</span>
      </span>
    </h1>
  );
}

/** One countdown tile: both numbers live in it, and the mode decides which one is showing. */
function RollNumber({ index, mode, launch, lunch }: { index: number; mode: Mode; launch: string; lunch: string }) {
  return (
    <span className="roll text-3xl font-bold tabular-nums text-paper sm:text-4xl" style={{ fontFamily: "var(--font-display)", "--i": index } as CSSProperties}>
      <span className="roll-v" data-state={mode === "launch" ? "show" : "above"} aria-hidden={mode !== "launch"}>
        {launch}
      </span>
      <span className="roll-v" data-state={mode === "lunch" ? "show" : "below"} aria-hidden={mode !== "lunch"}>
        {lunch}
      </span>
    </span>
  );
}

/** The plate, lit warm from below, with the "lunch responsibly" seal and a trust badge. */
function FoodHero({ plateRef, trust, seal }: { plateRef: RefObject<HTMLDivElement | null>; trust: string; seal: string }) {
  return (
    <div className="relative aspect-square w-[min(80vw,300px)] sm:w-[380px] lg:w-[440px]">
      {/* ember glow */}
      <div
        aria-hidden="true"
        className="absolute -inset-[26%] rounded-full bg-[radial-gradient(closest-side,rgba(243,111,33,0.36),rgba(243,111,33,0)_72%)]"
      />
      <TablaRings dark className="animate-spin-slow absolute -inset-[7%] size-[114%]" />
      {/* offset orange disc, like the screen-print offset in the logo */}
      <div aria-hidden="true" className="absolute inset-[6%] translate-x-[3.2%] translate-y-[3.6%] rounded-full bg-orange" />

      {/* the plate photo — the steam rises from here */}
      <div
        ref={plateRef}
        className="absolute inset-[6%] overflow-hidden rounded-full bg-[#5b5d63] shadow-[0_44px_90px_-30px_rgba(0,0,0,0.95)] ring-1 ring-paper/15"
      >
        <img
          src={plateHeroS}
          srcSet={`${plateHeroS} 560w, ${plateHeroL} 960w`}
          sizes="(min-width:1024px) 400px, (min-width:640px) 340px, 270px"
          alt=""
          fetchPriority="high"
          draggable={false}
          className="h-full w-full scale-[1.07] object-cover"
        />
      </div>

      {/* a second dish, floating */}
      <img
        src={dishRoast}
        alt=""
        draggable={false}
        className="animate-float absolute -left-3 bottom-[8%] h-20 w-20 rounded-full object-cover shadow-xl ring-4 ring-ink sm:-left-5 sm:h-24 sm:w-24"
      />

      {/* the seal and the badge sit in front of the steam */}
      <div className="absolute -top-[3%] right-0 z-20 aspect-square w-[27%] min-w-[84px] max-w-32">
        <Stamp text={seal} className="size-full" />
      </div>
      <div className="absolute -bottom-2 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-3.5 py-2 text-xs font-semibold text-ink shadow-lg ring-1 ring-line sm:text-sm">
        <Sprout className="h-4 w-4 text-safe" strokeWidth={2.5} aria-hidden="true" />
        {trust}
      </div>
    </div>
  );
}
