import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import { Reveal, item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { site } from "../../content/site";
import { ICONS, OPS_PHOTO, type IconKey } from "../../content/images";
import { langFor, useLang } from "../../lib/i18n";

/**
 * Section 6 — "A good menu is only half the job": quality check → packaging → delivery, the operations
 * photo, and where we deliver. Built to the owner's spec: warm off-white, content ≤ 1200px, 55/45
 * columns with a 52px gap, 80px (desktop) / 48px (phone) padding, 18–20px step headings, 15–16px body,
 * hairline dividers, photo with 14px corners.
 */
export function KitchenToOffice() {
  const { t, num } = useLang();
  const k = site.kitchenToOffice;
  const coverage = t(k.coverageTitle);

  return (
    <section id="kitchen-to-office" tabIndex={-1} aria-labelledby="k2o-title" className="relative bg-linen py-12 outline-none lg:py-20">
      <div className="mx-auto w-full max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[55fr_45fr] lg:gap-x-[52px]">
          <div>
            <SectionHeading size="md" eyebrow={k.eyebrow} title={k.title} titleId="k2o-title" />

            <motion.ol
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="mt-6 divide-y divide-line lg:mt-8"
              data-k2o-steps
            >
              {k.steps.map((s, i) => {
                const tag = `${num(String(i + 1).padStart(2, "0"))} / ${t(s.label)}`;
                const title = t(s.title);
                return (
                  <motion.li key={s.key} variants={item} className="py-6 first:pt-3 last:pb-0">
                    <p lang={langFor(tag)} className="eyebrow text-orange-700">
                      {tag}
                    </p>
                    <h3 lang={langFor(title)} className="mt-2 text-[1.15rem] font-semibold text-ink sm:text-[1.25rem]">
                      {title}
                    </h3>
                    <p lang={langFor(t(s.text))} className="mt-2 max-w-xl text-[15.5px] leading-relaxed text-muted">
                      {t(s.text)}
                    </p>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>

          <Reveal delay={0.1} className="lg:h-full">
            <OpsVisual />
          </Reveal>
        </div>

        <Reveal className="mt-10 flex items-start gap-3 border-t border-line pt-7 lg:mt-14">
          <MapPin className="mt-0.5 size-5 shrink-0 text-orange-600" aria-hidden="true" />
          <div>
            <h3 lang={langFor(coverage)} className="font-sans text-base font-semibold text-ink">
              {coverage}
            </h3>
            <ul className="mt-1.5 flex flex-wrap gap-y-1 text-[15px] text-muted" data-coverage>
              {k.areas.map((a) => (
                <li key={a.en} lang={langFor(t(a))} className="after:mx-2 after:text-ink/30 after:content-['·'] last:after:content-none">
                  {t(a)}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const STAND_IN: { icon: IconKey; step: number }[] = [
  { icon: "cook", step: 0 },
  { icon: "pack", step: 1 },
  { icon: "deliver", step: 2 },
];

/** The real operations photo once there is one (OPS_PHOTO in src/content/images.ts); until then an illustrated stand-in. */
function OpsVisual() {
  const { t } = useLang();
  if (OPS_PHOTO) {
    return (
      <div className="relative h-full min-h-[320px] overflow-hidden rounded-[14px] bg-[#5b5d63]">
        <img
          src={OPS_PHOTO.src}
          width={OPS_PHOTO.width}
          height={OPS_PHOTO.height}
          alt={t(OPS_PHOTO.alt)}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }
  const steps = site.kitchenToOffice.steps;
  return (
    <div
      aria-hidden="true"
      data-ops-standin
      className="surface-glow flex h-full min-h-[340px] flex-col justify-center rounded-[14px] px-8 py-10 ring-1 ring-orange-100 sm:px-12"
    >
      <ol className="relative mx-auto w-full max-w-[19rem]">
        <span className="absolute bottom-10 left-10 top-10 border-l-2 border-dashed border-orange/45" />
        {STAND_IN.map(({ icon, step }) => (
          <li key={icon} className="relative flex items-center gap-5 py-3">
            <span className="grid size-20 shrink-0 place-items-center rounded-full bg-paper shadow-[0_16px_34px_-22px_rgba(35,31,32,0.55)] ring-1 ring-line">
              <img src={ICONS[icon]} alt="" width={56} height={56} loading="lazy" decoding="async" draggable={false} className="size-14" />
            </span>
            <span lang={langFor(t(steps[step].label))} className="eyebrow text-ink/80">
              {t(steps[step].label)}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
