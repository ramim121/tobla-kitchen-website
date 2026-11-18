import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { GALLERY_CATEGORIES, type GalleryItem } from "../../content/gallery";
import { site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { EASE_OUT } from "../../lib/cx";
import { lockScroll } from "../../lib/smooth-scroll";
import { useBackToClose } from "../../lib/use-back-to-close";

type Props = {
  items: GalleryItem[];
  /** Index into `items`; `null` = closed. */
  index: number | null;
  onIndex: (index: number) => void;
  onClose: () => void;
};

const PHOTO_SIZES = "(min-width: 1200px) 1120px, 94vw";

/**
 * Photo modal: a white card over a dimmed page — the photo (full 3:2 frame) with round ‹ › arrows,
 * and the dish name + description underneath (beside it on short landscape screens).
 * ←/→/Esc, swipe, phone Back, focus kept inside, page scroll locked, neighbours preloaded. Wraps around.
 */
export function Lightbox({ items, index, onIndex, onClose }: Props) {
  // phone Back closes the photo rather than leaving the site; ×, Esc and the scrim go through requestClose
  const requestClose = useBackToClose(index !== null, onClose);
  return (
    <AnimatePresence>
      {index !== null && items[index] && <Dialog key="lightbox" items={items} index={index} onIndex={onIndex} onClose={requestClose} />}
    </AnimatePresence>
  );
}

function Dialog({ items, index, onIndex, onClose }: Props & { index: number }) {
  const { t, num } = useLang();
  const g = site.gallery;
  const reduce = useReducedMotion();
  const present = useIsPresent();
  const item = items[index];
  const count = items.length;
  const [dir, setDir] = useState<1 | -1>(1);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const nameId = useId();
  const textId = useId();

  const go = useCallback(
    (delta: 1 | -1) => {
      setDir(delta);
      onIndex((index + delta + count) % count);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    lockScroll(true);
    closeRef.current?.focus({ preventScroll: true });
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    if (!present) return; // closing: let the exit play without reacting to keys
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight" && count > 1) {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" && count > 1) {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        trapFocus(e, cardRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [present, count, go, onClose]);

  // fetch the neighbours so ‹ › feel instant
  useEffect(() => {
    if (count < 2) return;
    for (const d of [1, -1]) {
      const next = items[(index + d + count) % count];
      const img = new Image();
      img.sizes = PHOTO_SIZES;
      img.srcset = next.srcSet;
      img.src = next.large;
    }
  }, [index, items, count]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const category = GALLERY_CATEGORIES.find((c) => c.key === item.category);
  const slide = reduce ? 0 : 56;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={nameId}
      aria-describedby={textId}
      className="fixed inset-0 z-[90] grid place-items-center p-3 sm:p-6 short:p-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        ref={cardRef}
        data-card
        className="relative flex w-[min(1120px,94vw,calc((100dvh-14rem)*1.5))] flex-col overflow-hidden rounded-[24px] bg-paper shadow-[0_40px_120px_-30px_rgba(0,0,0,0.55)] sm:rounded-[28px] short:w-auto short:flex-row"
        initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        {/* photo — the tile image (already loaded) sits underneath until the large one is in */}
        <div
          data-photo
          className="relative aspect-[3/2] w-full shrink-0 overflow-hidden bg-[#5b5d63] bg-cover bg-center short:w-[min(calc((100dvh-1.5rem)*1.5),calc(100vw-14.5rem))]"
          style={{ backgroundImage: `url(${item.small})` }}
        >
          <AnimatePresence initial={false} custom={dir}>
            <motion.img
              key={item.key}
              data-full
              src={item.large}
              srcSet={item.srcSet}
              sizes={PHOTO_SIZES}
              width={1600}
              height={1067}
              alt={t(item.alt)}
              draggable={false}
              initial={{ opacity: 0, x: dir * slide }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * slide }}
              transition={{ duration: reduce ? 0.15 : 0.45, ease: EASE_OUT }}
              drag={count > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={onDragEnd}
              className="absolute inset-0 size-full cursor-grab touch-pan-y select-none object-cover active:cursor-grabbing"
            />
          </AnimatePresence>

          {count > 1 && (
            <>
              <button
                type="button"
                data-prev
                onClick={() => go(-1)}
                aria-label={t(g.prev)}
                className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-md ring-1 ring-ink/5 transition-colors hover:bg-paper sm:left-4 sm:size-12"
              >
                <ChevronLeft className="size-5 sm:size-6" aria-hidden="true" />
              </button>
              <button
                type="button"
                data-next
                onClick={() => go(1)}
                aria-label={t(g.next)}
                className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow-md ring-1 ring-ink/5 transition-colors hover:bg-paper sm:right-4 sm:size-12"
              >
                <ChevronRight className="size-5 sm:size-6" aria-hidden="true" />
              </button>
            </>
          )}
          <button
            ref={closeRef}
            type="button"
            data-close
            onClick={onClose}
            aria-label={t(g.close)}
            className="absolute right-3 top-3 grid size-10 place-items-center rounded-full bg-paper/90 text-ink shadow-md ring-1 ring-ink/5 transition-transform duration-300 hover:rotate-90 sm:right-4 sm:top-4"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        {/* caption */}
        <div aria-live="polite" className="flex items-start justify-between gap-4 p-5 sm:px-7 sm:py-6 short:w-52 short:flex-col short:justify-between short:p-4">
          <div className="min-w-0">
            {category && (
              <p className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 ring-1 ring-orange-100">
                {t(category.label)}
              </p>
            )}
            <h3 id={nameId} data-caption-name className="mt-2 text-xl font-semibold text-ink sm:text-2xl short:text-lg">
              {t(item.name)}
            </h3>
            <p id={textId} data-caption-text className="mt-1 text-[15px] text-muted sm:text-base short:text-sm">
              {t(item.text)}
            </p>
          </div>
          <p data-counter className="shrink-0 pt-1 text-sm font-semibold tabular-nums text-ink/70">
            {num(index + 1)} / {num(count)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Keep Tab / Shift+Tab cycling through the dialog's own buttons. */
function trapFocus(e: KeyboardEvent, root: HTMLElement | null) {
  if (!root) return;
  const focusable = [...root.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;
  if (e.shiftKey && (active === first || !root.contains(active))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (active === last || !root.contains(active))) {
    e.preventDefault();
    first.focus();
  }
}
