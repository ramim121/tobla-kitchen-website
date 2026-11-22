import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { TablaRings } from "../ui/TablaRings";
import { item, stagger } from "../ui/Reveal";
import { site } from "../../content/site";
import { PLATES, plateSrcSet } from "../../content/images";
import { langFor, useLang } from "../../lib/i18n";
import { EASE_OUT } from "../../lib/cx";

/** Both buttons share one line on every screen, so they shrink together on narrow phones. */
const BUTTON =
  "inline-flex h-12 min-w-0 flex-1 items-center justify-center whitespace-nowrap rounded-full text-[13px] font-semibold transition-colors duration-300 min-[380px]:text-sm sm:h-[52px] sm:flex-none sm:text-base";

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const ringsRotate = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const accent = t(site.hero.titleAccent);
  const primary = t(site.hero.primary);
  const secondary = t(site.hero.secondary);

  return (
    <section id="top" ref={ref} tabIndex={-1} className="relative overflow-hidden bg-paper outline-none">
      <Container className="relative grid grid-cols-1 items-center gap-14 pb-16 pt-28 sm:pt-32 lg:min-h-[min(100svh,980px)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-20 lg:pt-28">
        <motion.div variants={stagger(0.09, 0.2)} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="eyebrow inline-flex items-center gap-2.5 rounded-full border border-orange/25 bg-orange-50/80 px-3.5 py-1.5 text-orange-700"
          >
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-orange" />
            </span>
            {t(site.hero.eyebrow)}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-6 text-[2.05rem] font-semibold text-ink min-[400px]:text-[2.3rem] sm:text-5xl lg:text-[3.5rem]"
          >
            <span className="block">{t(site.hero.titleLead)}</span>
            <span lang={langFor(accent)} className="relative mt-[0.1em] inline-block pb-[0.08em] text-orange-600">
              {accent}
              <BrushUnderline />
            </span>
          </motion.h1>

          <motion.div variants={item} className="mt-10 flex max-w-xl flex-nowrap items-center gap-2 sm:gap-3">
            <AnchorLink
              to="contact"
              lang={langFor(primary)}
              className={`${BUTTON} group gap-3 bg-ink px-3.5 text-paper shadow-[0_16px_32px_-14px_rgba(35,31,32,0.7)] hover:bg-ink-2 sm:pl-6 sm:pr-2`}
            >
              {primary}
              <span className="hidden size-9 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-out group-hover:-rotate-45 sm:grid">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </AnchorLink>
            <AnchorLink
              to="quote"
              lang={langFor(secondary)}
              className={`${BUTTON} border border-ink/15 bg-white px-3.5 text-ink hover:border-ink/35 hover:bg-mist sm:px-6`}
            >
              {secondary}
            </AnchorLink>
          </motion.div>

          {/* 2 × 2: the first two points on the left, the last two on the right */}
          <motion.ul
            variants={item}
            className="mt-9 grid max-w-xl grid-flow-col grid-cols-2 grid-rows-[auto_auto] gap-x-5 gap-y-3 text-[14px] font-medium text-ink/80 sm:gap-x-8 sm:text-[15px]"
          >
            {site.hero.points.map((p) => {
              const label = t(p);
              return (
                <li key={p.en} lang={langFor(label)} className="flex items-start gap-2">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-safe/12 text-safe" aria-hidden="true">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {label}
                </li>
              );
            })}
          </motion.ul>
        </motion.div>

        <HeroVisual plateRotate={plateRotate} ringsRotate={ringsRotate} y={visualY} />
      </Container>
    </section>
  );
}

/** Brush stroke under the accent words; revealed left→right with a clip so it spans any width. */
function BrushUnderline() {
  return (
    <motion.svg
      viewBox="0 0 300 16"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="absolute -bottom-[0.06em] left-[1%] h-[0.26em] w-[98%] overflow-visible"
      initial={{ clipPath: "inset(-50% 100% -50% 0%)" }}
      animate={{ clipPath: "inset(-50% 0% -50% 0%)" }}
      transition={{ delay: 0.95, duration: 1.1, ease: EASE_OUT }}
    >
      <path
        d="M3 11 C 60 4, 140 3, 297 8"
        fill="none"
        stroke="#F36F21"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        className="[stroke-width:5px] sm:[stroke-width:7px]"
      />
    </motion.svg>
  );
}

type VisualProps = {
  plateRotate: MotionValue<number>;
  ringsRotate: MotionValue<number>;
  y: MotionValue<number>;
};

/** The plate on tabla rings. (The owner will supply a new photo for this spot.) */
function HeroVisual({ plateRotate, ringsRotate, y }: VisualProps) {
  const { t } = useLang();
  return (
    <motion.div style={{ y }} className="relative mx-auto w-full max-w-[min(520px,86vw)] lg:max-w-[540px]">
      <motion.div
        className="relative aspect-square"
        initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.3, ease: EASE_OUT, delay: 0.15 }}
      >
        <motion.div style={{ rotate: ringsRotate }} className="absolute -inset-[7%]">
          <TablaRings className="size-full" />
        </motion.div>

        {/* offset orange disc, like the screen-print offset in the logo */}
        <div aria-hidden="true" className="absolute inset-[6%] translate-x-[3.2%] translate-y-[3.6%] rounded-full bg-orange" />

        <div className="absolute inset-[6%] overflow-hidden rounded-full bg-[#5b5d63] shadow-[0_44px_90px_-34px_rgba(35,31,32,0.6)] ring-1 ring-ink/10">
          <motion.img
            src={PLATES.hero.large}
            srcSet={plateSrcSet("hero")}
            sizes="(min-width: 1024px) 480px, 80vw"
            width={960}
            height={960}
            alt={t(site.hero.plateAlt)}
            fetchPriority="high"
            decoding="async"
            draggable={false}
            style={{ rotate: plateRotate }}
            className="size-full scale-[1.07] object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
