import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Egg, Feather, Leaf, ShieldCheck, type LucideIcon } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { AutoHeight } from "../ui/AutoHeight";
import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { TablaRings } from "../ui/TablaRings";
import { DAYS, DAY_KEYS, MENU, TAGS, todayKey, type DayKey, type TagKey } from "../../content/menu";
import { PLATES, plateSrcSet, type PlateKey } from "../../content/images";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";

const PLATE_SIZES = "(min-width: 1024px) 460px, (min-width: 640px) 400px, 300px";

const TAG_STYLE: Record<TagKey, { icon: LucideIcon; cls: string }> = {
  FR: { icon: Feather, cls: "bg-orange-50 text-[#9a3f0b] ring-orange-200/80" },
  O3: { icon: Egg, cls: "bg-amber-50 text-amber-900 ring-amber-200/80" },
  AP: { icon: ShieldCheck, cls: "bg-rose-50 text-rose-900 ring-rose-200/80" },
  DS: { icon: Leaf, cls: "bg-emerald-50 text-emerald-900 ring-emerald-200/80" },
};

/** Keep showing the current plate until the next photo is decoded, so swaps never flash empty. */
function useDecodedPlate(target: PlateKey) {
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (target === shown) return;
    let cancelled = false;
    const img = new Image();
    img.sizes = PLATE_SIZES;
    img.srcset = plateSrcSet(target);
    img.src = PLATES[target].large;
    img
      .decode()
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setShown(target);
      });
    return () => {
      cancelled = true;
    };
  }, [target, shown]);
  return shown;
}

export function MenuExplorer() {
  const { t, num } = useLang();
  const today = useMemo(() => todayKey(), []);
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState<DayKey>(today);
  const id = useId();

  const entry = MENU[week][day];
  const plate = useDecodedPlate(entry.photo);

  return (
    <section id="menu" tabIndex={-1} className="relative overflow-hidden py-20 outline-none sm:py-28">
      <Container>
        <SectionHeading eyebrow={site.menu.eyebrow} title={site.menu.title} lead={site.menu.lead} />

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2 lg:grid-rows-[auto_auto_1fr] lg:gap-x-16 lg:gap-y-7">
          {/* A — controls */}
          <Reveal className="lg:col-start-2 lg:row-start-1">
            <div role="group" aria-label={t(site.menu.weekTabs)} className="grid w-full grid-cols-4 rounded-full bg-cream p-1 ring-1 ring-line sm:inline-flex sm:w-auto">
              {MENU.map((_, i) => {
                const on = week === i;
                return (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setWeek(i)}
                    className={cx(
                      "relative rounded-full px-2 py-2 text-[13px] font-semibold transition-colors duration-300 sm:px-5 sm:text-sm",
                      on ? "text-paper" : "text-ink/75 hover:text-ink",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId={`${id}-week`}
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 460, damping: 36 }}
                      />
                    )}
                    <span className="relative whitespace-nowrap">
                      {t(site.menu.week)} {num(i + 1)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label={t(site.menu.dayTabs)}
              className="mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap"
            >
              {DAY_KEYS.map((k) => {
                const on = day === k;
                return (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDay(k)}
                    className={cx(
                      "relative inline-flex items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-[background-color,border-color,color] duration-300 sm:px-4",
                      on ? "border-orange bg-orange text-ink" : "border-line bg-white text-ink/75 hover:border-ink/25 hover:text-ink",
                    )}
                  >
                    {t(DAYS[k].short)}
                    {k === today && (
                      <>
                        {/* phones: a dot; wider screens: a small "today" badge */}
                        <span aria-hidden="true" className={cx("absolute right-2 top-1.5 size-1.5 rounded-full sm:hidden", on ? "bg-ink" : "bg-orange")} />
                        <span className={cx("hidden rounded-full px-1.5 py-px text-[10px] font-semibold leading-4 sm:inline", on ? "bg-ink text-paper" : "bg-orange-50 text-orange-700")}>
                          {t(site.menu.today)}
                        </span>
                        <span className="sr-only sm:hidden">({t(site.menu.today)})</span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* B — plate */}
          <Reveal className="lg:col-start-1 lg:row-span-2 lg:row-start-1" delay={0.05}>
            <div className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px]">
              <TablaRings className="absolute -inset-[7%] size-[114%]" />
              <div aria-hidden="true" className="absolute inset-[3%] translate-x-[2.6%] translate-y-[3%] rounded-full bg-orange" />
              <div className="absolute inset-[3%] overflow-hidden rounded-full bg-cream shadow-[0_40px_80px_-34px_rgba(35,31,32,0.55)] ring-1 ring-ink/10">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={plate}
                    src={PLATES[plate].large}
                    srcSet={plateSrcSet(plate)}
                    sizes={PLATE_SIZES}
                    width={960}
                    height={960}
                    alt={t(PLATES[plate].alt)}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    initial={{ opacity: 0, rotate: -55, scale: 1.2 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1.07 }}
                    exit={{ opacity: 0, rotate: 45, scale: 1.0 }}
                    transition={{ duration: 0.95, ease: EASE_OUT }}
                    className="absolute inset-0 size-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${week}-${day}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="whitespace-nowrap rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper shadow-lg"
                  >
                    {t(site.menu.week)} {num(week + 1)} · {t(DAYS[day].long)}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>

          {/* C — dishes + legend */}
          <Reveal className="lg:col-start-2 lg:row-span-2 lg:row-start-2" delay={0.1}>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_70px_-52px_rgba(35,31,32,0.6)] ring-1 ring-line sm:p-8" aria-live="polite">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-semibold text-ink">{t(DAYS[day].long)}</h3>
                <span className="text-sm text-muted">
                  {t(site.menu.week)} {num(week + 1)}
                </span>
              </div>
              <AutoHeight>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ul
                    key={`${week}-${day}`}
                    variants={stagger(0.05)}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.14 } }}
                    className="mt-3 divide-y divide-line"
                  >
                    {entry.dishes.map((dish) => (
                      <motion.li key={dish.name.en} variants={item} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3.5">
                        <span className="text-[17px] font-medium text-ink">{t(dish.name)}</span>
                        {dish.tags && dish.tags.length > 0 && (
                          <span className="flex flex-wrap gap-1.5">
                            {dish.tags.map((tag) => (
                              <TagChip key={tag} tag={tag} />
                            ))}
                          </span>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              </AutoHeight>
              <p className="mt-3 text-xs text-muted">{t(site.menu.rotateNote)}</p>
            </div>

            <div className="mt-6">
              <h3 className="font-sans text-sm font-semibold text-ink/70">{t(site.menu.legendTitle)}</h3>
              <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {(Object.keys(TAGS) as TagKey[]).map((tag) => (
                  <li key={tag} className="flex items-center gap-2.5 text-sm text-muted">
                    <TagChip tag={tag} iconOnly />
                    {t(TAGS[tag].long)}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* D — every dish + price */}
          <Reveal className="lg:col-start-1 lg:row-start-3" delay={0.1}>
            <div className="mx-auto max-w-[460px] lg:max-w-none">
              <p className="text-center text-sm font-semibold text-ink/70 lg:text-left">{t(site.menu.everyDish.title)}</p>
              <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                {site.menu.everyDish.items.map((x) => (
                  <li key={x.en} className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-[13px] font-medium text-ink/80">
                    <Check className="size-3.5 text-safe" strokeWidth={3} aria-hidden="true" />
                    {t(x)}
                  </li>
                ))}
              </ul>

              <div className="relative mt-6 overflow-hidden rounded-[28px] bg-ink p-6 text-paper sm:p-8">
                <TablaRings dark className="pointer-events-none absolute -right-24 -top-24 size-64 opacity-70" />
                <p className="relative text-sm text-paper/70">{t(site.menu.price.label)}</p>
                <p className="relative mt-1 flex flex-wrap items-baseline gap-x-3">
                  <span className="font-display text-5xl font-semibold text-orange sm:text-6xl">{t(site.menu.price.value)}</span>
                  <span className="text-paper/80">{t(site.menu.price.unit)}</span>
                </p>
                <p className="relative mt-3 max-w-sm text-sm text-paper/60">{t(site.menu.price.note)}</p>
                <AnchorLink
                  to="contact"
                  className="group relative mt-6 inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-paper"
                >
                  {t(site.menu.price.cta)}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </AnchorLink>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function TagChip({ tag, iconOnly = false }: { tag: TagKey; iconOnly?: boolean }) {
  const { t } = useLang();
  const { icon: Icon, cls } = TAG_STYLE[tag];
  return (
    <span
      title={t(TAGS[tag].long)}
      className={cx(
        "inline-flex shrink-0 items-center gap-1 rounded-full font-medium ring-1",
        iconOnly ? "size-7 justify-center" : "px-2.5 py-1 text-xs",
        cls,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {!iconOnly && t(TAGS[tag].short)}
    </span>
  );
}
