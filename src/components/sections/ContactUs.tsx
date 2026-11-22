import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Globe, MapPin, Phone, UserRound, type LucideIcon } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { CONTACT, site } from "../../content/site";
import { langFor, useLang } from "../../lib/i18n";

/** Section 10 — call us directly: phone (call / copy), contact person, kitchen address, website. */
export function ContactUs() {
  const { t } = useLang();
  const c = site.contactUs;
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
      /* clipboard blocked — the number is on screen anyway */
    }
  };

  const know = t(c.knowTitle);
  return (
    <section id="contact" tabIndex={-1} aria-labelledby="contact-title" className="relative bg-linen py-12 outline-none lg:py-20">
      <div className="mx-auto grid w-full max-w-[1264px] grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16 lg:px-8">
        <div>
          <SectionHeading size="md" eyebrow={c.eyebrow} title={c.title} lead={c.lead} titleId="contact-title" />
          <Reveal delay={0.05} className="mt-8 max-w-xl border-t border-line pt-6">
            <h3 lang={langFor(know)} className="font-sans text-[16px] font-semibold text-ink">
              {know}
            </h3>
            <p lang={langFor(t(c.knowText))} className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {t(c.knowText)}
            </p>
            <AnchorLink
              to="enquiry"
              className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-orange-700 underline-offset-4 hover:underline"
            >
              {t(c.toForm)}
              <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
            </AnchorLink>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-[24px] bg-paper p-6 ring-1 ring-line sm:p-8" data-contact-card>
            <p lang={langFor(t(c.direct))} className="eyebrow text-muted">
              {t(c.direct)}
            </p>
            <a href={CONTACT.phoneHref} className="mt-2 block whitespace-nowrap font-display text-[2rem] font-semibold leading-tight text-ink transition-colors hover:text-orange-600 sm:text-[2.4rem]">
              {t(c.phone)}
            </a>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:flex">
              <a
                href={CONTACT.phoneHref}
                lang={langFor(t(c.call))}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ink px-3 text-[14px] font-semibold text-paper transition-colors duration-300 hover:bg-ink-2 sm:px-5 sm:text-[15px]"
              >
                <Phone className="size-4" aria-hidden="true" />
                {t(c.call)}
              </a>
              <button
                type="button"
                onClick={copy}
                lang={langFor(t(c.copy))}
                className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full border border-ink/15 px-3 text-[14px] font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:min-w-[10.5rem] sm:px-5 sm:text-[15px]"
              >
                {copied ? <Check className="size-4 text-safe" strokeWidth={3} aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {t(copied ? c.copied : c.copy)}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? t(c.copied) : ""}
              </span>
            </div>

            <ul className="mt-7 divide-y divide-line border-t border-line">
              <Row icon={UserRound} label={t(c.personLabel)}>
                <span className="block font-semibold text-ink">{t(c.person)}</span>
                <span className="block text-[14.5px] text-muted">{t(c.role)}</span>
              </Row>
              <Row icon={MapPin} label={t(c.addressLabel)}>
                <span className="block font-semibold text-ink">{t(c.address)}</span>
                <a
                  href={CONTACT.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1 text-[14.5px] font-semibold text-orange-700 underline-offset-4 hover:underline"
                >
                  {t(c.map)}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
              </Row>
              <Row icon={Globe} label={t(c.webLabel)}>
                <span className="block font-semibold text-ink">{CONTACT.website}</span>
              </Row>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Row({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5 last:pb-0">
      <Icon className="mt-0.5 size-5 shrink-0 text-orange-600" aria-hidden="true" />
      <div className="min-w-0">
        <p lang={langFor(label)} className="eyebrow text-muted">
          {label}
        </p>
        <div className="mt-1">{children}</div>
      </div>
    </li>
  );
}
