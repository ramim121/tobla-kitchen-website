import { motion } from "motion/react";
import { ArrowRight, Beef, CalendarDays, Check, Droplets, Egg, Fish, Package, Phone, type LucideIcon } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { CountUp } from "../ui/CountUp";
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

/** The Tk 275 highlight: what a lunch costs and exactly what that price covers. */
export function Pricing() {
  const { t, lang } = useLang();
  const p = site.pricing;

  return (
    <section id="pricing" tabIndex={-1} aria-labelledby="pricing-title" className="relative py-16 outline-none sm:py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-orange px-5 py-10 text-ink sm:rounded-[44px] sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <TablaRings className="pointer-events-none absolute -right-40 -top-40 size-[520px] opacity-40" />
            <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />

            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
              <div>
                <p className="eyebrow inline-flex items-center gap-2.5 text-ink">
                  <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
                  {t(p.eyebrow)}
                </p>
                <h2 id="pricing-title" className="mt-4 text-[1.75rem] font-semibold sm:text-[2.3rem] lg:text-[2.6rem]">
                  <Rich text={t(p.title)} accent="text-ink underline decoration-ink/30 decoration-[0.08em] underline-offset-[0.18em]" />
                </h2>
                <p className="mt-4 max-w-lg text-[17px] text-ink sm:text-lg">{t(p.lead)}</p>

                <div className="mt-8 flex flex-wrap items-end gap-x-4 gap-y-1">
                  <p className="font-display text-[4.5rem] font-semibold leading-none sm:text-[6.5rem]">
                    <CountUp value={275} from={150} prefix={lang === "bn" ? "৳" : "Tk "} duration={1.6} />
                  </p>
                  <p className="pb-2 text-lg font-medium sm:pb-3 sm:text-xl">{t(p.card.unit)}</p>
                </div>

                <ul className="mt-6 space-y-2 text-[15px] font-medium">
                  {p.card.notes.map((n) => (
                    <li key={n.en} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-ink" />
                      {t(n)}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <AnchorLink
                    to="contact"
                    className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 font-semibold text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
                  >
                    {t(p.card.cta)}
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
                <h3 className="font-sans text-sm font-semibold text-muted">{t(p.includedTitle)}</h3>
                <motion.ul
                  variants={stagger(0.06)}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  className="mt-4 divide-y divide-line"
                >
                  {p.included.map((x) => {
                    const Icon = INCLUDED_ICON[x.key] ?? Check;
                    return (
                      <motion.li key={x.key} variants={item} className="flex items-start gap-4 py-3.5">
                        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700" aria-hidden="true">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="pt-2 text-[15.5px] leading-snug text-ink">
                          <Rich text={t(x.text)} />
                        </span>
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
