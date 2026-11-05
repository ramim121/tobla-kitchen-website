import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { TrendingUp } from "lucide-react";

import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
import { Reveal } from "../ui/Reveal";
import { Rich } from "../ui/Rich";
import { TablaRings } from "../ui/TablaRings";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";

const NOW = 41.47;
const THEN = 8.5;

/** Problem statement: one hero figure + a meter (single ratio, with the earlier value as a reference mark). */
export function StatBand() {
  const { t } = useLang();
  return (
    <section id="why" tabIndex={-1} aria-labelledby="why-title" className="relative overflow-hidden bg-ink py-20 text-paper outline-none sm:py-28">
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />
      <TablaRings dark className="pointer-events-none absolute -right-44 -top-44 size-[540px] opacity-60" />

      <Container className="relative grid grid-cols-1 gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <Reveal>
          <h2 id="why-title" className="eyebrow inline-flex items-center gap-2.5 font-sans text-orange">
            <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
            {t(site.stat.eyebrow)}
          </h2>
          <p className="mt-6 font-display text-[4.6rem] font-semibold leading-none text-paper sm:text-[7rem] lg:text-[8.25rem]">
            <CountUp value={NOW} decimals={2} suffix="%" />
          </p>
          <p className="mt-4 text-lg text-paper/80 sm:text-xl">{t(site.stat.label)}</p>
          <Meter />
          <p className="mt-5 inline-flex items-start gap-2 text-sm text-paper/70">
            <TrendingUp className="mt-0.5 size-4 shrink-0 text-orange" aria-hidden="true" />
            {t(site.stat.delta)}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="text-xl leading-relaxed text-paper/85 sm:text-[1.6rem] sm:leading-relaxed">
            <Rich text={t(site.stat.body)} dark />
          </p>
          <p className="mt-9 border-l-[3px] border-orange pl-5 font-display text-2xl font-semibold text-paper sm:text-[1.85rem]">
            <Rich text={t(site.stat.punch)} accent="text-orange" />
          </p>
          <p className="mt-9 text-xs text-paper/50">{t(site.stat.source)}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Meter() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [tip, setTip] = useState<null | "now" | "then">(null);

  return (
    <div ref={ref} className="relative mt-8 max-w-md" role="img" aria-label={t(site.stat.meterLabel)}>
      {/* hover tooltip */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-12 inset-x-0 h-10">
        <AnimatePresence>
          {tip && (
            <motion.div
              key={tip}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-0 -translate-x-1/2 whitespace-nowrap rounded-lg bg-paper px-3 py-1.5 text-xs font-medium text-ink shadow-lg"
              style={{ left: `${tip === "now" ? Math.min(NOW, 80) : Math.max(THEN, 22)}%` }}
            >
              {t(tip === "now" ? site.stat.tipNow : site.stat.tipThen)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div aria-hidden="true" className="relative h-3 rounded-full bg-orange/20">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-orange"
          initial={{ width: 0 }}
          animate={{ width: inView ? `${NOW}%` : 0 }}
          transition={{ duration: 1.9, ease: EASE_OUT, delay: 0.15 }}
        />
        {/* hit areas (bigger than the marks) */}
        <span
          className="absolute -inset-y-3 left-[10.5%] cursor-default"
          style={{ width: `${NOW - 10.5}%` }}
          onPointerEnter={() => setTip("now")}
          onPointerLeave={() => setTip(null)}
        />
        <span
          className={cx("absolute -inset-y-3 w-6 -translate-x-1/2 cursor-default")}
          style={{ left: `${THEN}%` }}
          onPointerEnter={() => setTip("then")}
          onPointerLeave={() => setTip(null)}
        />
        {/* 2022–23 reference mark */}
        <span className="pointer-events-none absolute -bottom-1.5 -top-1.5 w-[3px] -translate-x-1/2 rounded-full bg-paper ring-2 ring-ink" style={{ left: `${THEN}%` }} />
      </div>

      <div aria-hidden="true" className="relative mt-2.5 h-5 text-xs">
        <span className="absolute -translate-x-1/2 text-paper/60" style={{ left: `${THEN}%` }}>
          {t(site.stat.thenTick)}
        </span>
        <span className="absolute -translate-x-1/2 font-semibold text-paper" style={{ left: `${NOW}%` }}>
          {t({ bn: "২০২৫", en: "2025" })}
        </span>
        <span className="absolute right-0 text-paper/40">{t({ bn: "১০০%", en: "100%" })}</span>
      </div>
    </div>
  );
}
