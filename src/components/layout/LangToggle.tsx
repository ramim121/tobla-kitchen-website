import { useId } from "react";
import { motion } from "motion/react";
import { useLang, type Lang } from "../../lib/i18n";
import { site } from "../../content/site";
import { cx } from "../../lib/cx";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "bn", label: "বাংলা" },
  { lang: "en", label: "EN" },
];

/** বাংলা | EN switch with a sliding thumb. */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const id = useId();
  return (
    <div
      role="group"
      aria-label={t(site.nav.language)}
      className={cx("relative inline-flex items-center rounded-full border border-ink/10 bg-white/80 p-1 shadow-[0_1px_2px_rgba(35,31,32,0.06)]", className)}
    >
      {OPTIONS.map((o) => {
        const on = lang === o.lang;
        return (
          <button
            key={o.lang}
            type="button"
            lang={o.lang}
            aria-pressed={on}
            onClick={() => setLang(o.lang)}
            className={cx(
              "relative min-w-11 rounded-full px-3 py-1.5 text-[13px] font-semibold leading-5 transition-colors duration-300",
              on ? "text-paper" : "text-ink/75 hover:text-ink",
            )}
          >
            {on && (
              <motion.span
                layoutId={`lang-thumb-${id}`}
                className="absolute inset-0 rounded-full bg-ink"
                transition={{ type: "spring", stiffness: 520, damping: 38 }}
              />
            )}
            <span className="relative">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}
