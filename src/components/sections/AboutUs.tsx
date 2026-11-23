import { motion } from "motion/react";

import { item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { site } from "../../content/site";
import { langFor, useLang } from "../../lib/i18n";

/** Section 9 — "We take office lunch seriously": who we are, and the three things that matter to us. */
export function AboutUs() {
  const { t, num } = useLang();
  const a = site.aboutUs;
  const label = t(a.valuesTitle);

  return (
    // follows the white brochure: a hairline at the top, then the usual 48 / 80px padding (as the enquiry section)
    <section id="about" tabIndex={-1} aria-labelledby="about-title" className="relative bg-paper pb-12 outline-none lg:pb-20">
      <div className="mx-auto w-full max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16 lg:pt-20">
          <div>
            <SectionHeading size="md" eyebrow={a.eyebrow} title={a.title} titleId="about-title" />
            <p lang={langFor(t(a.body))} className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-[17px]">
              {t(a.body)}
            </p>
          </div>

          <div>
            <h3 lang={langFor(label)} className="eyebrow font-sans text-muted">
              {label}
            </h3>
            <motion.ol
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="mt-4 space-y-3"
            >
              {a.values.map((v, i) => {
                const title = t(v.title);
                return (
                  <motion.li key={v.title.en} variants={item} className="flex items-start gap-4 rounded-[20px] bg-paper p-5 ring-1 ring-line sm:p-6">
                    <span className="pt-0.5 font-display text-sm font-semibold text-orange-700">{num(String(i + 1).padStart(2, "0"))}</span>
                    <div>
                      <h4 lang={langFor(title)} className="text-[1.1rem] font-semibold text-ink">
                        {title}
                      </h4>
                      <p lang={langFor(t(v.text))} className="mt-1.5 text-[15px] leading-relaxed text-muted">
                        {t(v.text)}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
