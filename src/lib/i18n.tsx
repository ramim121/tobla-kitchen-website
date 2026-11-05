import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "bn" | "en";
/** Every user-facing string is stored as a Bangla/English pair. */
export type L = { bn: string; en: string };

const STORAGE_KEY = "tobla-lang";
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBnDigits = (s: string) => s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);

function readInitialLang(): Lang {
  if (typeof window === "undefined") return "bn";
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "bn" || fromUrl === "en") return fromUrl;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "bn" || saved === "en") return saved;
  } catch {
    /* storage can be blocked — Bangla is the default */
  }
  return "bn";
}

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** pick the active language from a pair */
  t: (pair: L) => string;
  /** localise digits in a plain number string */
  num: (value: string | number) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

type Meta = { title: L; description: L };

export function LanguageProvider({ children, meta }: { children: ReactNode; meta: Meta }) {
  const [lang, setLangState] = useState<Lang>(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = meta.title[lang];
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description[lang]);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href);
    if (lang === "en") url.searchParams.set("lang", "en");
    else url.searchParams.delete("lang");
    window.history.replaceState(window.history.state, "", url);
  }, [lang, meta]);

  const setLang = useCallback((next: Lang) => {
    setLangState((prev) => {
      if (prev === next) return prev;
      // soft cross-fade of the page text so the swap never feels jumpy
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        document
          .getElementById("main")
          ?.animate([{ opacity: 0.35 }, { opacity: 1 }], { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
      }
      return next;
    });
  }, []);

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      t: (pair) => pair[lang],
      num: (value) => (lang === "bn" ? toBnDigits(String(value)) : String(value)),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
