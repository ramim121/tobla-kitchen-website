import { motion } from "motion/react";
import { ArrowRight, Beef, CalendarDays, Check, Droplets, Egg, Fish, Package, Phone, ShieldCheck, type LucideIcon } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { Rich } from "../ui/Rich";
import { TablaRings } from "../ui/TablaRings";
import { CONTACT, site } from "../../content/site";
import { useLang } from "../../lib/i18n";

const INCLUDED_ICON: Record<string, LucideIcon> = {
  menu: CalendarDays,
  farm: Egg,
  beef: Beef,
  fresh: Fish,
  spice: Droplets,
  box: Package,
};

/** "Plan your menu and budget with us": a no-numbers quote band + what every meal includes. */
export function Quote() {
  const { t } = useLang();
  const q = site.quote;

  return (
    <section id="quote" tabIndex={-1} aria-labelledby="quote-title" className="relative py-16 outline-none sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-orange px-5 py-10 text-ink sm:rounded-[44px] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <TablaRings className="pointer-events-none absolute -right-40 -top-40 size-[520px] opacity-40" />
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow inline-flex items-center gap-2.5 text-ink">
                  <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
                  {t(q.eyebrow)}
                </p>
                <h2 id="quote-title" className="mt-4 text-[1.75rem] font-semibold sm:text-[2.3rem] lg:text-[2.6rem]">
                  <Rich text={t(q.title)} accent="text-ink underline decoration-ink/30 decoration-[0.08em] underline-offset-[0.18em]" />
                </h2>
                <p className="mt-5 max-w-lg text-[17px] text-ink sm:text-lg">{t(q.lead)}</p>
                <p className="mt-5 inline-flex max-w-lg items-start gap-2.5 rounded-2xl bg-ink/[0.08] px-4 py-3 text-[15px] font-semibold text-ink">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                  {t(q.promise)}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <AnchorLink
                    to="contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
                  >
                    {t(q.cta)}
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                  </AnchorLink>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full border-2 border-ink/80 px-5 py-2.5 font-semibold transition-colors duration-300 hover:bg-ink hover:text-paper"
                  >
                    <Phone className="size-4" aria-hidden="true" />
                    {t(CONTACT.phoneDisplay)}
                  </a>
                </div>
              </div>

              <div className="rounded-[28px] bg-paper p-6 shadow-[0_40px_80px_-40px_rgba(35,31,32,0.55)] sm:p-8">
                <h3 className="font-sans text-sm font-semibold text-muted">{t(q.includedTitle)}</h3>
                <motion.ul
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  className="mt-4 divide-y divide-line"
                >
                  {q.included.map((x) => {
                    const Icon = INCLUDED_ICON[x.key] ?? Check;
                    return (
                      <motion.li key={x.key} variants={item} className="flex items-start gap-4 py-3.5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700" aria-hidden="true">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="pt-2 text-[15.5px] leading-snug text-ink">{t(x.text)}</span>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
