import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { ChefHat, Flame, Sparkles, type LucideIcon } from "lucide-react";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { item, stagger } from "../ui/Reveal";
import { site } from "../../content/site";
import { ICONS, type IconKey } from "../../content/images";
import { useLang } from "../../lib/i18n";

const PROMISE_ICON: Record<string, LucideIcon> = { hands: ChefHat, equipment: Sparkles, fresh: Flame };

export function Process() {
  const { t, num } = useLang();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 78%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });

  return (
    <section id="process" tabIndex={-1} className="relative bg-cream py-20 outline-none sm:py-28">
      <Container>
        <SectionHeading align="center" eyebrow={site.process.eyebrow} title={site.process.title} lead={site.process.lead} />

        <motion.ol
          ref={listRef}
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          className="relative mx-auto mt-14 grid max-w-xl grid-cols-1 gap-10 lg:mt-20 lg:max-w-none lg:grid-cols-4 lg:gap-8"
        >
          {/* path that fills as you scroll — horizontal on desktop, vertical on phones */}
          <div aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-16 hidden h-[2px] rounded-full bg-ink/10 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-orange" />
          </div>
          <div aria-hidden="true" className="absolute bottom-10 left-[43px] top-10 w-[2px] rounded-full bg-ink/10 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="size-full origin-top rounded-full bg-orange" />
          </div>

          {site.process.steps.map((s, i) => (
            <motion.li key={s.key} variants={item} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <div className="relative grid size-[88px] shrink-0 place-items-center rounded-full bg-white shadow-[0_18px_40px_-24px_rgba(35,31,32,0.45)] ring-1 ring-line lg:size-32">
                <img
                  src={ICONS[s.key as IconKey]}
                  alt=""
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="size-14 lg:size-20"
                />
                <span className="absolute -right-1 -top-1 grid size-8 place-items-center rounded-full bg-orange font-display text-sm font-semibold text-ink ring-4 ring-cream lg:size-9">
                  {num(i + 1)}
                </span>
              </div>
              <div className="pt-1.5 lg:pt-6">
                <h3 className="text-xl font-semibold text-ink">{t(s.title)}</h3>
                <p className="mt-2 text-[15.5px] text-muted lg:mx-auto lg:max-w-[16rem]">{t(s.text)}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>

        {/* more from "How we prepare and deliver" */}
        <div className="mx-auto mt-16 max-w-xl lg:mt-20 lg:max-w-none">
          <p className="text-center font-sans text-sm font-semibold text-muted">{t(site.process.promisesTitle)}</p>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          >
            {site.process.promises.map((pr) => {
              const Icon = PROMISE_ICON[pr.key] ?? Flame;
              return (
                <motion.li key={pr.key} variants={item} className="flex items-start gap-4 rounded-[22px] bg-white p-5 ring-1 ring-line">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700" aria-hidden="true">
                    <Icon className="size-[18px]" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold text-ink">{t(pr.title)}</h3>
                    <p className="mt-1 text-sm text-muted">{t(pr.text)}</p>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </Container>
    </section>
  );
}
