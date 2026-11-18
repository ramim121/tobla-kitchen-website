import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Expand } from "lucide-react";

import { Lightbox } from "../ui/Lightbox";
import { Reveal } from "../ui/Reveal";
import { Rich } from "../ui/Rich";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from "../../content/gallery";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";

type Filter = "all" | GalleryCategory;

/** Tiles crop the 3:2 photo to 4:3, so they need ~1.13× their width — sizes says a little more. */
const TILE_SIZES = "(min-width: 1024px) 340px, (min-width: 640px) 36vw, 56vw";

const countOf = (f: Filter) => (f === "all" ? GALLERY.length : GALLERY.filter((i) => i.category === f).length);

/** Every unique dish we have photographed, with category filters. Lives inside the premium section. */
export function Gallery() {
  const { t, num } = useLang();
  const g = site.gallery;
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const items = useMemo(() => (filter === "all" ? GALLERY : GALLERY.filter((i) => i.category === filter)), [filter]);

  // back to the tile that opened the photo (Safari doesn't focus buttons on click, so remember it)
  const close = useCallback(() => {
    setOpen(null);
    opener.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div id="gallery" tabIndex={-1} className="mt-20 scroll-mt-[84px] outline-none sm:mt-28">
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <Reveal className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2.5 text-orange-700">
            <span aria-hidden="true" className="h-[2px] w-6 rounded-full bg-current" />
            {t(g.eyebrow)}
          </p>
          <h3 className="mt-4 text-[1.75rem] font-semibold text-ink sm:text-[2.25rem]">
            <Rich text={t(g.title)} />
          </h3>
          <p className="mt-3 text-[17px] text-muted sm:text-lg">{t(g.lead)}</p>
        </Reveal>

        <Reveal delay={0.05} className="lg:max-w-[34rem] lg:shrink-0">
          <div role="group" aria-label={t(g.filterLabel)} className="flex flex-wrap gap-2 lg:justify-end">
            {GALLERY_CATEGORIES.map((c) => {
              const on = filter === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  data-filter={c.key}
                  aria-pressed={on}
                  onClick={() => setFilter(c.key)}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                    on ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink/80 hover:border-ink/30 hover:text-ink",
                  )}
                >
                  {t(c.label)}
                  <span className={cx("rounded-full px-1.5 text-[11px] font-semibold tabular-nums", on ? "bg-paper/20" : "bg-mist text-ink/70")}>
                    {num(countOf(c.key))}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </div>

      <p className="sr-only" aria-live="polite">
        {t(g.count).replace("{n}", num(items.length))}
      </p>

      <motion.ul data-gallery-grid layout className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => (
            <motion.li
              key={item.key}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(i);
                }}
                aria-haspopup="dialog"
                aria-label={`${t(item.name)} — ${t(g.open)}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[22px] bg-[#5b5d63] text-left ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_26px_50px_-30px_rgba(35,31,32,0.55)]"
              >
                <img
                  src={item.small}
                  srcSet={item.srcSet}
                  sizes={TILE_SIZES}
                  width={720}
                  height={480}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  style={{ objectPosition: item.focus }}
                  className="size-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                />
                <span
                  data-name
                  className="absolute bottom-2.5 left-2.5 inline-block max-w-[calc(100%-1.25rem)] rounded-xl bg-paper/95 px-3 py-1.5 text-[13px] font-semibold leading-snug text-ink shadow-sm sm:bottom-3 sm:left-3 sm:text-sm"
                >
                  {t(item.name)}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-paper/95 text-ink opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                >
                  <Expand className="size-4" />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <Lightbox items={items} index={open} onIndex={setOpen} onClose={close} />
    </div>
  );
}
