import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Check, Flame, Phone } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { Rich } from "../ui/Rich";
import { Stamp } from "../ui/Stamp";
import { TablaRings } from "../ui/TablaRings";
import { item, stagger } from "../ui/Reveal";
import { CONTACT, site } from "../../content/site";
import { PLATES, plateSrcSet } from "../../content/images";
import { useLang } from "../../lib/i18n";
import { EASE_OUT } from "../../lib/cx";

export function Hero() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const plateRotate = useTransform(scrollYProgress, [0, 1], [0, 34]);
  const ringsRotate = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section id="top" ref={ref} tabIndex={-1} className="relative overflow-hidden outline-none">
      {/* atmosphere */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[18%] -top-[28%] size-[min(900px,140vw)] rounded-full bg-[radial-gradient(closest-side,rgba(243,111,33,0.17),transparent)]" />
        <div className="absolute -bottom-[38%] -left-[18%] size-[min(760px,130vw)] rounded-full bg-[radial-gradient(closest-side,rgba(253,230,213,0.95),transparent)]" />
        <div className="grain absolute inset-0 opacity-[0.045]" />
      </div>

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

          <motion.h1 variants={item} className="mt-6 text-[2.55rem] font-semibold text-ink sm:text-6xl lg:text-[4.35rem]">
            <span className="block">{t(site.hero.titleLead)}</span>
            <span className="relative inline-block pb-[0.08em] text-orange-600">
              {t(site.hero.titleAccent)}
              <BrushUnderline />
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            <Rich text={t(site.hero.lead)} />
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <AnchorLink
              to="menu"
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-base font-semibold text-paper shadow-[0_16px_32px_-14px_rgba(35,31,32,0.7)] transition-colors duration-300 hover:bg-ink-2"
            >
              {t(site.hero.primary)}
              <span className="grid size-9 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-out group-hover:-rotate-45">
                <ArrowRight className="size-4" aria-hidden="true" />
              </span>
            </AnchorLink>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-base font-semibold text-ink backdrop-blur-sm transition-colors duration-300 hover:border-ink/35 hover:bg-white"
            >
              <Phone className="size-4 text-orange-600" aria-hidden="true" />
              {t(CONTACT.phoneDisplay)}
            </a>
          </motion.div>

          <motion.ul variants={item} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-[15px] font-medium text-ink/80">
            {site.hero.points.map((p) => (
              <li key={p.en} className="inline-flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full bg-safe/12 text-safe" aria-hidden="true">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {t(p)}
              </li>
            ))}
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

        {/* fresh-daily badge */}
        <motion.div
          className="absolute -left-[3%] top-[11%] sm:-left-[8%]"
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: EASE_OUT }}
        >
          <div className="flex animate-float items-center gap-3 rounded-2xl bg-paper/95 py-2.5 pl-2.5 pr-4 shadow-[0_20px_44px_-22px_rgba(35,31,32,0.55)] ring-1 ring-ink/5 sm:py-3 sm:pl-3 sm:pr-5">
            <span className="grid size-9 place-items-center rounded-xl bg-orange-50 text-orange-600 sm:size-10" aria-hidden="true">
              <Flame className="size-5" />
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-ink sm:text-sm">{t(site.hero.badgeFresh.title)}</span>
              <span className="mt-0.5 block text-[11px] text-muted sm:text-xs">{t(site.hero.badgeFresh.sub)}</span>
            </span>
          </div>
        </motion.div>

        {/* rotating seal */}
        <motion.div
          className="absolute -top-[3%] right-[1%] size-[25%] min-w-20 max-w-32"
          initial={{ opacity: 0, scale: 0.6, rotate: -40 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 1.3, duration: 1, ease: EASE_OUT }}
        >
          <Stamp text={t(site.hero.stamp)} className="size-full" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
