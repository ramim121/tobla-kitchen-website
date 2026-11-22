import { motion } from "motion/react";
import { ClipboardCheck, MapPin, Utensils, type LucideIcon } from "lucide-react";

import { Container } from "../ui/Container";
import { item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { site } from "../../content/site";
import { langFor, useLang } from "../../lib/i18n";

const ICON: Record<string, LucideIcon> = { visit: MapPin, standards: ClipboardCheck, taste: Utensils };

/**
 * Section 2 — "Don't just take our word for it": three ways to check us before signing up.
 * (Real photos of the kitchen, the preparation and an actual meal can join these cards later.)
 */
export function Trust() {
  const { t } = useLang();
  const s = site.trust;

  return (
    <section id="trust" tabIndex={-1} aria-labelledby="trust-title" className="relative bg-mist py-16 outline-none sm:py-24">
      <Container>
        <div className="rounded-[28px] bg-paper p-5 ring-1 ring-line sm:rounded-[32px] sm:p-9 lg:p-12">
          <SectionHeading size="md" eyebrow={s.eyebrow} title={s.title} titleId="trust-title" />

          <motion.ol
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-8 grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3 lg:mt-10 lg:gap-5"
          >
            {s.items.map((it, i) => {
              const Icon = ICON[it.key] ?? MapPin;
              const heading = t(it.title);
              return (
                <motion.li key={it.key} variants={item}>
                  <article className="group flex h-full flex-col rounded-[22px] border border-line bg-paper p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_26px_50px_-34px_rgba(35,31,32,0.5)] sm:p-7">
                    <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-600 transition-transform duration-500 ease-out group-hover:-rotate-6" aria-hidden="true">
                      <Icon className="size-[22px]" strokeWidth={1.9} />
                    </span>
                    <h3 lang={langFor(heading)} className="mt-5 text-[1.2rem] font-semibold text-ink sm:text-[1.3rem]">
                      {i + 1}. {heading}
                    </h3>
                    <p lang={langFor(t(it.text))} className="mt-2.5 text-[15.5px] leading-relaxed text-muted">
                      {t(it.text)}
                    </p>
                  </article>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </Container>
    </section>
  );
}
