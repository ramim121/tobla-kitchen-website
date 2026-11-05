import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, CircleCheck, CircleX } from "lucide-react";

import { AutoHeight } from "../ui/AutoHeight";
import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { RISKS, SEVERITIES, type Risk, type Severity } from "../../content/risks";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";

const SEVERITY_STYLE: Record<Severity, { dot: string; text: string }> = {
  critical: { dot: "bg-critical", text: "text-critical" },
  high: { dot: "bg-high", text: "text-high" },
  medium: { dot: "bg-medium", text: "text-medium" },
};

export function RiskCompare() {
  const { t, num } = useLang();
  const [severity, setSeverity] = useState<Severity>("critical");
  const [openId, setOpenId] = useState<string | null>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const list = RISKS.filter((r) => r.severity === severity);

  const select = (s: Severity) => {
    setSeverity(s);
    setOpenId(null);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (index + delta + SEVERITIES.length) % SEVERITIES.length;
    select(SEVERITIES[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section id="risks" tabIndex={-1} className="relative bg-cream py-20 outline-none sm:py-28">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow={site.risks.eyebrow} title={site.risks.title} lead={site.risks.lead} />

          <Reveal delay={0.1} className="mt-8 lg:mt-10">
            <div
              role="tablist"
              aria-label={t(site.risks.tablistLabel)}
              className="grid grid-cols-3 gap-1.5 rounded-2xl bg-white/50 p-1 ring-1 ring-line sm:gap-2 lg:flex lg:flex-col lg:bg-transparent lg:p-0 lg:ring-0"
            >
              {SEVERITIES.map((s, i) => {
                const on = s === severity;
                const count = RISKS.filter((r) => r.severity === s).length;
                return (
                  <button
                    key={s}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`${baseId}-tab-${s}`}
                    aria-selected={on}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => select(s)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cx(
                      "relative min-w-0 rounded-xl px-2 py-2.5 text-left transition-colors duration-300 sm:px-4 sm:py-3 lg:rounded-2xl lg:px-5 lg:py-4",
                      on ? "text-ink" : "text-ink/75 hover:bg-white/60 hover:text-ink",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId={`${baseId}-sev`}
                        className="absolute inset-0 rounded-xl bg-white shadow-[0_14px_34px_-22px_rgba(35,31,32,0.5)] ring-1 ring-line lg:rounded-2xl"
                        transition={{ type: "spring", stiffness: 420, damping: 36 }}
                      />
                    )}
                    <span className="relative flex items-center justify-center gap-1.5 sm:gap-3 lg:justify-start">
                      <span aria-hidden="true" className={cx("size-2 shrink-0 rounded-full sm:size-2.5", SEVERITY_STYLE[s].dot)} />
                      <span className="truncate font-display text-[15px] font-semibold sm:text-lg">{t(site.risks.severity[s].label)}</span>
                      <span className="rounded-full bg-ink/[0.06] px-1.5 py-0.5 text-[11px] font-semibold tabular-nums sm:px-2 sm:text-xs lg:ml-auto">{num(count)}</span>
                    </span>
                    <span className="relative mt-1 hidden pl-[22px] text-sm text-muted lg:block">{t(site.risks.severity[s].hint)}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div
            role="tabpanel"
            id={`${baseId}-panel`}
            aria-labelledby={`${baseId}-tab-${severity}`}
            className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_70px_-50px_rgba(35,31,32,0.55)] ring-1 ring-line"
          >
            <div className="hidden grid-cols-2 border-b border-line text-sm font-semibold md:grid">
              <p className="flex items-center gap-2 px-6 py-4 text-ink/70">
                <CircleX className={cx("size-4", SEVERITY_STYLE[severity].text)} aria-hidden="true" />
                {t(site.risks.colRisk)}
              </p>
              <p className="flex items-center gap-2 bg-orange-50 px-6 py-4 text-ink">
                <CircleCheck className="size-4 text-safe" aria-hidden="true" />
                {t(site.risks.colFix)}
              </p>
            </div>

            <AutoHeight>
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={severity}
                  variants={stagger(0.06)}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, transition: { duration: 0.16 } }}
                  className="divide-y divide-line"
                >
                  {list.map((r) => (
                    <RiskRow
                      key={r.id}
                      risk={r}
                      open={openId === r.id}
                      onToggle={() => setOpenId((cur) => (cur === r.id ? null : r.id))}
                    />
                  ))}
                </motion.ul>
              </AnimatePresence>
            </AutoHeight>
          </div>
          <p className="mt-5 text-xs text-muted">{t(site.risks.footnote)}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function RiskRow({ risk, open, onToggle }: { risk: Risk; open: boolean; onToggle: () => void }) {
  const { t } = useLang();
  const detailId = useId();
  return (
    <motion.li variants={item} className="grid md:grid-cols-2">
      <div className="px-5 pb-3 pt-5 sm:px-6 md:py-5">
        <div className="flex items-start gap-3">
          <CircleX className={cx("mt-1 size-[18px] shrink-0", SEVERITY_STYLE[risk.severity].text)} aria-hidden="true" />
          <div className="min-w-0">
            <h3 className="font-sans text-[17px] font-semibold leading-snug text-ink">{t(risk.risk)}</h3>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={open}
              aria-controls={detailId}
              className="mt-1.5 inline-flex items-center gap-1 rounded-full text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {t(open ? site.risks.less : site.risks.more)}
              <ChevronDown className={cx("size-3.5 transition-transform duration-300", open && "rotate-180")} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.p
                  id={detailId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                  className="overflow-hidden text-sm text-muted"
                >
                  <span className="block pt-2">{t(risk.typical)}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="mx-4 mb-4 flex items-start gap-3 rounded-2xl bg-orange-50 px-4 py-3.5 sm:mx-5 md:m-0 md:rounded-none md:px-6 md:py-5">
        <CircleCheck className="mt-1 size-[18px] shrink-0 text-safe" aria-hidden="true" />
        <p className="text-[15.5px] text-ink/85">{t(risk.fix)}</p>
      </div>
    </motion.li>
  );
}
