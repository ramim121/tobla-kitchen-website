import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { Reveal, item, stagger } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { LUNCH_MENUS } from "../../content/lunch-menus";
import { site } from "../../content/site";
import { requestSample } from "../../lib/enquiry-intent";
import { langFor, useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";

const PHOTO_SIZES = "(min-width: 1280px) 640px, (min-width: 1024px) 50vw, 92vw";

function loadPhoto(i: number) {
  const p = LUNCH_MENUS[i].photo;
  const img = new Image();
  img.sizes = PHOTO_SIZES;
  img.srcset = p.srcSet;
  img.src = p.medium;
  return img;
}

/** Keep showing the current photo until the next one is decoded, so a tab switch never flashes empty. */
function useDecodedIndex(target: number) {
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (target === shown) return;
    let cancelled = false;
    loadPhoto(target)
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

/** Once the section is close, quietly fetch every menu's photo so switching tabs is instant. */
function usePrefetchPhotos(ref: RefObject<HTMLElement | null>) {
  const near = useInView(ref, { once: true, margin: "600px 0px 600px 0px" });
  useEffect(() => {
    if (!near) return;
    const run = () => LUNCH_MENUS.forEach((_, i) => loadPhoto(i));
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(run);
    else setTimeout(run, 600);
  }, [near]);
}

/**
 * Section 4 — six lunch combinations as tabs "Menu 01" … "Menu 06" (combinations, not days). Each tab
 * swaps the photo and the dish list together. Phones scroll the tab row sideways.
 */
export function WeeklyMenu() {
  const { t, num } = useLang();
  const w = site.weeklyMenu;
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const shown = useDecodedIndex(index);
  const sectionRef = useRef<HTMLElement>(null);
  const tabRow = useRef<HTMLDivElement>(null);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  usePrefetchPhotos(sectionRef);

  const label = (i: number) => `${t(w.tab)} ${num(String(i + 1).padStart(2, "0"))}`;
  const menu = LUNCH_MENUS[index];
  const photo = LUNCH_MENUS[shown].photo;
  const cta = t(w.cta);

  // phones: keep the chosen tab in view inside the sideways-scrolling row (never scrolls the page)
  useEffect(() => {
    const row = tabRow.current;
    const tab = tabs.current[index];
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [index, reduce]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = LUNCH_MENUS.length;
    const next =
      e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <section ref={sectionRef} id="menu" tabIndex={-1} aria-labelledby="menu-title" className="relative bg-mist py-16 outline-none sm:py-24">
      <Container>
        <div className="rounded-[28px] bg-paper p-5 ring-1 ring-line sm:rounded-[32px] sm:p-9 lg:p-12">
          <SectionHeading size="md" eyebrow={w.eyebrow} title={w.title} lead={w.lead} titleId="menu-title" className="max-w-4xl" />

          <Reveal delay={0.05} className="mt-8 border-t border-line pt-7 lg:mt-10 lg:pt-8">
            <div
              ref={tabRow}
              role="tablist"
              aria-label={t(w.tabs)}
              className="no-scrollbar relative -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-9 sm:px-9 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
            >
              {LUNCH_MENUS.map((_, i) => {
                const on = i === index;
                return (
                  <button
                    key={i}
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${i}`}
                    aria-selected={on}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={on ? 0 : -1}
                    lang={langFor(label(i))}
                    onClick={() => setIndex(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={cx(
                      "shrink-0 whitespace-nowrap rounded-full border px-5 py-2.5 text-[15px] font-semibold transition-[background-color,border-color,color] duration-300",
                      on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink/75 hover:border-ink/30 hover:text-ink",
                    )}
                  >
                    {label(i)}
                  </button>
                );
              })}
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel`}
              aria-labelledby={`${baseId}-tab-${index}`}
              className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-[55fr_45fr] lg:items-center lg:gap-12"
            >
              {/* photo — 55% on desktop */}
              <figure className="relative aspect-[3/2] overflow-hidden rounded-[20px] bg-[#5b5d63]" data-menu-photo>
                <AnimatePresence initial={false}>
                  <motion.img
                    key={shown}
                    src={photo.medium}
                    srcSet={photo.srcSet}
                    sizes={PHOTO_SIZES}
                    width={1200}
                    height={800}
                    alt={t(photo.alt)}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT }}
                    style={{ objectPosition: photo.focus }}
                    className="absolute inset-0 size-full object-cover"
                  />
                </AnimatePresence>
                <figcaption className="absolute bottom-3 left-3 max-w-[calc(100%-1.5rem)] rounded-xl bg-paper/95 px-3 py-1.5 text-[13px] font-semibold leading-snug text-ink shadow-sm sm:bottom-4 sm:left-4 sm:text-sm">
                  <span className="font-medium text-muted">{t(w.pictured)}:</span> {t(photo.name)}
                </figcaption>
              </figure>

              {/* the complete meal — 45% on desktop */}
              <div className="min-w-0">
                <h3 lang={langFor(label(index))} className="text-2xl font-semibold text-ink sm:text-[1.75rem]">
                  {label(index)}
                </h3>
                <p lang={langFor(t(w.subtitle))} className="mt-1 text-[15px] text-muted">
                  {t(w.subtitle)}
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ul
                    key={index}
                    variants={stagger(0.05)}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, transition: { duration: 0.12 } }}
                    className="mt-5 space-y-3.5 border-t border-line pt-5"
                    data-menu-items
                  >
                    {menu.items.map((dish) => (
                      <motion.li key={dish.name.en} variants={item} className="flex items-start gap-3">
                        <Check className="mt-[0.3em] size-4 shrink-0 text-orange-600" strokeWidth={2.75} aria-hidden="true" />
                        <span className="min-w-0">
                          <span className={cx("block text-[16.5px]", dish.main ? "font-semibold text-ink" : "text-ink/85")}>{t(dish.name)}</span>
                          {dish.note && <span className="mt-0.5 block text-sm text-muted">{t(dish.note)}</span>}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
                {menu.dietary && <p className="mt-5 rounded-xl bg-mist px-4 py-3 text-sm text-ink/80">{t(menu.dietary)}</p>}
              </div>
            </div>
          </Reveal>

          <div className="mt-9 flex flex-col items-center gap-5 border-t border-line pt-7 text-center lg:mt-10">
            <p className="max-w-2xl text-[14px] leading-relaxed text-muted">{t(w.note)}</p>
            <AnchorLink
              to="enquiry"
              onClick={requestSample}
              lang={langFor(cta)}
              className="group inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-base font-semibold text-ink shadow-[0_16px_32px_-16px_rgba(243,111,33,0.9)] transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {cta}
              <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </AnchorLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
