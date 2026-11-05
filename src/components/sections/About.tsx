import { motion } from "motion/react";

import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { Rich } from "../ui/Rich";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";

export function About() {
  const { t, num } = useLang();
  return (
    <section id="about" tabIndex={-1} className="relative py-20 outline-none sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-2.5 text-orange-700">
              <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
              {t(site.about.eyebrow)}
            </p>
            <h2 className="mt-6 text-[2rem] font-semibold text-ink sm:text-[2.6rem] lg:text-[3.1rem]">
              <span aria-hidden="true" className="mr-1 text-orange">“</span>
              <Rich text={t(site.about.quote)} />
            </h2>
            <p className="mt-6 max-w-xl text-lg text-muted">{t(site.about.body)}</p>
          </Reveal>

          <motion.dl
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-10 sm:grid-cols-4"
          >
            {site.about.facts.map((f) => (
              <motion.div key={f.label.en} variants={item} className="flex flex-col-reverse">
                <dt className="mt-1 text-sm text-muted">{t(f.label)}</dt>
                <dd className="font-display text-[1.75rem] font-semibold leading-tight text-ink sm:text-3xl">{t(f.value)}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <div>
          <Reveal>
            <h3 className="eyebrow font-sans text-muted">{t(site.about.valuesTitle)}</h3>
          </Reveal>
          <motion.ul
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            className="mt-6 space-y-3"
          >
            {site.about.values.map((v, i) => {
              const signature = i === site.about.values.length - 1;
              return (
                <motion.li
                  key={v.title.en}
                  variants={item}
                  className={cx(
                    "flex items-start gap-4 rounded-3xl p-5 ring-1 transition-[box-shadow,transform] duration-500 ease-out hover:-translate-y-0.5 sm:p-6",
                    signature ? "bg-orange text-ink ring-orange shadow-[0_24px_50px_-28px_rgba(243,111,33,0.9)]" : "bg-white ring-line hover:shadow-[0_24px_50px_-36px_rgba(35,31,32,0.5)]",
                  )}
                >
                  <span className={cx("pt-1 font-display text-sm font-semibold", signature ? "text-ink" : "text-orange-700")}>
                    {num(String(i + 1).padStart(2, "0"))}
                  </span>
                  <div>
                    <h4 className="text-lg font-semibold sm:text-xl">{t(v.title)}</h4>
                    <p className={cx("mt-1 text-[15.5px]", signature ? "text-ink" : "text-muted")}>{t(v.text)}</p>
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
