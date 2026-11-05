import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { item, stagger } from "../ui/Reveal";
import { site } from "../../content/site";
import { ICONS, type IconKey } from "../../content/images";
import { useLang } from "../../lib/i18n";

export function Sourcing() {
  const { t } = useLang();
  return (
    <section id="sourcing" tabIndex={-1} className="relative py-20 outline-none sm:py-28">
      <Container>
        <SectionHeading eyebrow={site.sourcing.eyebrow} title={site.sourcing.title} lead={site.sourcing.lead} />

        <motion.ul
          variants={stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:mt-16 lg:grid-cols-3 lg:gap-5"
        >
          {site.sourcing.items.map((it) => (
            <motion.li key={it.key} variants={item}>
              {/* phones: compact row (icon left); tablet+: tall card */}
              <article className="group relative flex h-full gap-4 rounded-[24px] border border-line bg-white p-5 transition-[transform,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-orange/35 hover:shadow-[0_30px_60px_-36px_rgba(35,31,32,0.5)] sm:flex-col sm:gap-0 sm:rounded-[28px] sm:p-7">
                <div className="flex shrink-0 items-start justify-between">
                  <div className="relative grid size-16 place-items-center sm:size-[88px]">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full bg-orange-50 transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <img
                      src={ICONS[it.key as IconKey]}
                      alt=""
                      width={72}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="relative size-[54px] transition-transform duration-500 ease-out group-hover:-rotate-6 group-hover:scale-105 sm:size-[72px]"
                    />
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-ink sm:mt-6 sm:text-[1.35rem]">{t(it.title)}</h3>
                  <p className="mt-1.5 text-[15px] text-muted sm:mt-2.5 sm:text-[15.5px]">{t(it.text)}</p>
                  {it.tag && (
                    <p className="mt-3 sm:mt-auto sm:pt-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink/75">
                        <MapPin className="size-3.5 shrink-0 text-orange-600" aria-hidden="true" />
                        {t(it.tag)}
                      </span>
                    </p>
                  )}
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
