import { Headset } from "lucide-react";

import { SectionHeading } from "../ui/SectionHeading";
import { site } from "../../content/site";
import { langFor, useLang } from "../../lib/i18n";

/**
 * Section 7 — "What happens when something isn't right?": the dedicated account manager and the
 * report → review → resolve loop. Owner's spec: white, ≤ 1200px, 80/48px padding, intro ≤ 720px,
 * a full-width #FFF4EA strip for the account manager, three even columns (stacked on phones),
 * subtle dividers, no animation and no button.
 */
export function Support() {
  const { t } = useLang();
  const s = site.support;
  const m = s.manager;
  const [title, sub, text] = [t(m.title), t(m.sub), t(m.text)];

  return (
    <section id="support" tabIndex={-1} aria-labelledby="support-title" className="relative bg-paper py-12 outline-none lg:py-20">
      <div className="mx-auto w-full max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <SectionHeading still size="md" eyebrow={s.eyebrow} title={s.title} lead={s.lead} titleId="support-title" className="max-w-[720px]" />

        <div
          data-account-manager
          className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-[#FFF4EA] p-5 sm:p-6 lg:mt-10 lg:grid-cols-[minmax(0,26rem)_1fr] lg:items-center lg:gap-0 lg:px-8 lg:py-7"
        >
          <div className="flex items-center gap-4 lg:pr-8">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-paper text-orange-600 shadow-[0_8px_20px_-14px_rgba(35,31,32,0.5)]" aria-hidden="true">
              <Headset className="size-[22px]" strokeWidth={1.9} />
            </span>
            <div>
              <h3 lang={langFor(title)} className="text-[1.1rem] font-semibold text-ink sm:text-[1.2rem]">
                {title}
              </h3>
              <p lang={langFor(sub)} className="mt-0.5 text-[14.5px] text-ink/70">
                {sub}
              </p>
            </div>
          </div>
          <p lang={langFor(text)} className="text-[15.5px] leading-relaxed text-ink/80 lg:border-l lg:border-orange/25 lg:pl-8">
            {text}
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0 lg:mt-12" data-support-steps>
          {s.steps.map((step, i) => {
            const tag = `${String(i + 1).padStart(2, "0")} / ${t(step.label)}`;
            const heading = t(step.title);
            return (
              <li key={step.key} className="py-6 first:pt-0 last:pb-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
                <p lang={langFor(tag)} className="eyebrow text-orange-700">
                  {tag}
                </p>
                <h3 lang={langFor(heading)} className="mt-2.5 text-[1.15rem] font-semibold text-ink sm:text-[1.2rem]">
                  {heading}
                </h3>
                <p lang={langFor(t(step.text))} className="mt-2 text-[15.5px] leading-relaxed text-muted">
                  {t(step.text)}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
