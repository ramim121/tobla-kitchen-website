import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Briefcase,
  CalendarRange,
  Check,
  ConciergeBell,
  Copy,
  Globe,
  MapPin,
  PhoneCall,
  Presentation,
  UserRound,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TablaRings } from "../ui/TablaRings";
import { CONTACT, site } from "../../content/site";
import { useLang } from "../../lib/i18n";

const SERVICE_ICON: Record<string, LucideIcon> = {
  daily: UtensilsCrossed,
  monthly: CalendarRange,
  meeting: Presentation,
  executive: Briefcase,
  buffet: ConciergeBell,
};

export function Contact() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.phoneRaw);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable — the number is visible anyway */
    }
  };

  return (
    <section
      id="contact"
      tabIndex={-1}
      className="relative overflow-hidden rounded-t-[36px] bg-ink pb-20 pt-20 text-paper outline-none sm:rounded-t-[56px] sm:pt-28"
    >
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[0.08]" />
      <TablaRings dark className="pointer-events-none absolute -bottom-80 -left-80 size-[640px] opacity-40" />

      <Container className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading dark eyebrow={site.contact.eyebrow} title={site.contact.title} lead={site.contact.lead} />
          <Reveal delay={0.1} className="mt-12">
            <h3 className="eyebrow font-sans text-paper/55">{t(site.contact.servicesTitle)}</h3>
            <motion.ul
              variants={stagger(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-5 flex flex-wrap gap-2.5"
            >
              {site.contact.services.map((s) => {
                const Icon = SERVICE_ICON[s.key];
                return (
                  <motion.li
                    key={s.key}
                    variants={item}
                    className="inline-flex items-center gap-2.5 rounded-full border border-paper/15 bg-paper/[0.04] px-4 py-2.5 text-[15px] text-paper/90 transition-colors duration-300 hover:border-orange/60 hover:bg-paper/[0.07]"
                  >
                    <Icon className="size-4 text-orange" aria-hidden="true" />
                    {t(s.label)}
                  </motion.li>
                );
              })}
            </motion.ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="rounded-[32px] bg-paper p-6 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)] sm:p-9">
            <p className="text-sm font-medium text-muted">{t(site.contact.callDirect)}</p>
            <a
              href={CONTACT.phoneHref}
              className="mt-1 block whitespace-nowrap font-display text-[2.35rem] font-semibold leading-tight text-ink transition-colors duration-300 hover:text-orange-600 sm:text-5xl"
            >
              {t(CONTACT.phoneDisplay)}
            </a>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange px-4 py-3 font-semibold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-5"
              >
                <PhoneCall className="size-4" aria-hidden="true" />
                {t(site.contact.callNow)}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-4 py-3 font-semibold transition-colors duration-300 hover:border-ink/40 sm:min-w-[9.5rem] sm:px-5"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2 text-safe">
                      <Check className="size-4" strokeWidth={3} aria-hidden="true" />
                      {t(site.contact.copied)}
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                      <Copy className="size-4" aria-hidden="true" />
                      {t(site.contact.copy)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t(site.contact.copied) : ""}
              </span>
            </div>

            <ul className="mt-8 space-y-5 border-t border-line pt-7">
              <InfoRow icon={UserRound} label={t(site.contact.personLabel)}>
                <span className="block font-semibold">{t(site.contact.person)}</span>
                <span className="block text-sm text-muted">{t(site.contact.role)}</span>
              </InfoRow>
              <InfoRow icon={MapPin} label={t(site.contact.kitchenLabel)}>
                <span className="block font-semibold">{t(site.contact.address)}</span>
                <a
                  href={CONTACT.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-orange-700 underline-offset-4 hover:underline"
                >
                  {t(site.contact.openMap)} ↗
                </a>
              </InfoRow>
              <InfoRow icon={Globe} label={t(site.contact.webLabel)}>
                <span className="block font-semibold">{CONTACT.website}</span>
                <a
                  href={CONTACT.brochurePdf}
                  download={CONTACT.brochureFileName}
                  className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-orange-700 underline-offset-4 hover:underline"
                >
                  {t(site.contact.brochureLink)} ↓
                </a>
              </InfoRow>
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700" aria-hidden="true">
        <Icon className="size-[18px]" />
      </span>
      <div>
        <p className="text-xs font-medium text-muted">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </li>
  );
}
