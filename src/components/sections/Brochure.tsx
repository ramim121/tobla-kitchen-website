import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { ArrowUpRight, Download, Eye, FileText, X, ZoomIn, ZoomOut } from "lucide-react";

import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { CONTACT, site } from "../../content/site";
import { BROCHURE } from "../../content/images";
import { useLang, type L } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";
import { lockScroll } from "../../lib/smooth-scroll";

type Side = "outside" | "inside";

/** Trifold panels in reading order (page side + column within the spread). */
const PANELS: { id: string; side: Side; col: 0 | 1 | 2; label: L }[] = [
  { id: "cover", side: "outside", col: 2, label: { bn: "প্রচ্ছদ", en: "Cover" } },
  { id: "about", side: "inside", col: 0, label: { bn: "আমাদের কথা ও ডেলিভারি", en: "About us & how we deliver" } },
  { id: "source-a", side: "inside", col: 1, label: { bn: "উপকরণের উৎস (১–২)", en: "Where ingredients come from (1–2)" } },
  { id: "source-b", side: "inside", col: 2, label: { bn: "উপকরণের উৎস (৩–৫)", en: "Where ingredients come from (3–5)" } },
  { id: "values", side: "outside", col: 0, label: { bn: "আমাদের নিয়ম ও লক্ষ্য", en: "Our values & mission" } },
  { id: "contact", side: "outside", col: 1, label: { bn: "সেবা ও যোগাযোগ", en: "Services & contact" } },
];

const b = site.brochure;

export function Brochure() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const opener = useRef<HTMLButtonElement | null>(null);

  const show = (el: HTMLButtonElement | null) => {
    opener.current = el;
    setOpen(true);
  };
  const close = useCallback(() => {
    setOpen(false);
    opener.current?.focus({ preventScroll: true });
  }, []);

  return (
    <section id="brochure" tabIndex={-1} className="relative overflow-hidden bg-cream py-20 outline-none sm:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={b.eyebrow} title={b.title} lead={b.lead} />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={(e) => show(e.currentTarget)}
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-5 pr-2 text-base font-semibold text-paper shadow-[0_16px_32px_-14px_rgba(35,31,32,0.7)] transition-colors duration-300 hover:bg-ink-2"
            >
              <Eye className="size-4 text-orange" aria-hidden="true" />
              {t(b.preview)}
              <span className="grid size-9 place-items-center rounded-full bg-orange text-ink transition-transform duration-500 ease-out group-hover:rotate-45">
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </span>
            </button>
            <a
              href={CONTACT.brochurePdf}
              download={CONTACT.brochureFileName}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-base font-semibold text-ink transition-colors duration-300 hover:border-ink/35 hover:bg-white"
            >
              <Download className="size-4 text-orange-700" aria-hidden="true" />
              {t(b.download)}
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
              <FileText className="size-4" aria-hidden="true" />
              {t(b.meta)}
            </p>
          </Reveal>
        </div>

        <BrochureFan onOpen={show} />
      </Container>

      <BrochureViewer open={open} onClose={close} />
    </section>
  );
}

/** Three brochure panels that fan out when scrolled into view (and a little more on hover). */
function BrochureFan({ onOpen }: { onOpen: (el: HTMLButtonElement) => void }) {
  const { t } = useLang();
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [hover, setHover] = useState(false);
  const spread = inView ? (hover ? 1.18 : 1) : 0;

  const cards = [
    { src: BROCHURE.thumbs.about, dir: -1 },
    { src: BROCHURE.thumbs.source, dir: 1 },
    { src: BROCHURE.thumbs.cover, dir: 0 },
  ];

  return (
    <button
      ref={ref}
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={t(b.preview)}
      className="group relative mx-auto block aspect-[1.18] w-full max-w-[560px] cursor-zoom-in rounded-[32px]"
    >
      <span aria-hidden="true" className="absolute inset-x-[12%] bottom-[4%] h-[18%] rounded-[50%] bg-ink/25 blur-2xl" />
      {cards.map((c) => (
        <motion.img
          key={c.src}
          src={c.src}
          alt=""
          width={520}
          height={1103}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute left-1/2 top-[3%] w-[37%] rounded-[14px] shadow-[0_30px_60px_-24px_rgba(35,31,32,0.6)] ring-1 ring-ink/10"
          initial={false}
          animate={{
            x: `${-50 + c.dir * 74 * spread}%`,
            rotate: c.dir * 8 * spread,
            y: c.dir === 0 ? 0 : `${4 * spread}%`,
            scale: c.dir === 0 ? 1 : 0.94,
          }}
          transition={{ type: "spring", stiffness: 110, damping: 17, mass: 0.9 }}
        />
      ))}
      <span className="absolute bottom-0 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-lg ring-1 ring-ink/5 transition-transform duration-300 group-hover:-translate-y-0.5">
        <Eye className="size-4 text-orange-700" aria-hidden="true" />
        {t(b.preview)}
      </span>
    </button>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Full-screen preview: spreads with zoom on desktop, readable panels one after another on phones. */
function BrochureViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang();
  const [side, setSide] = useState<Side>("outside");
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const tabId = useId();

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    closeBtn.current?.focus();
    // warm the other spread so switching is instant
    const other = new Image();
    other.src = BROCHURE.pages.inside;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setSide("inside");
      if (e.key === "ArrowLeft") setSide("outside");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lockScroll(false);
      setZoom(false);
    };
  }, [open, onClose]);

  // keep keyboard focus inside the dialog
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialog.current) return;
    const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const { w, h } = BROCHURE.pageSize;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={t(b.modalTitle)}
          onKeyDown={trapFocus}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 px-3 py-3 text-paper sm:px-6">
            <p className="truncate font-display text-base font-semibold sm:text-lg">{t(b.modalTitle)}</p>

            <div role="tablist" aria-label={t(b.modalTitle)} className="hidden rounded-full bg-paper/10 p-1 md:flex">
              {(["outside", "inside"] as const).map((s) => {
                const on = side === s;
                return (
                  <button
                    key={s}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => {
                      setSide(s);
                      setZoom(false);
                    }}
                    className={cx("relative rounded-full px-4 py-1.5 text-sm font-semibold transition-colors", on ? "text-ink" : "text-paper/80 hover:text-paper")}
                  >
                    {on && (
                      <motion.span
                        layoutId={`${tabId}-side`}
                        className="absolute inset-0 rounded-full bg-paper"
                        transition={{ type: "spring", stiffness: 480, damping: 36 }}
                      />
                    )}
                    <span className="relative">{t(s === "outside" ? b.outside : b.inside)}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setZoom((z) => !z)}
                aria-pressed={zoom}
                aria-label={t(zoom ? b.zoomOut : b.zoomIn)}
                className="hidden size-10 place-items-center rounded-full bg-paper/10 text-paper transition-colors hover:bg-paper/20 md:grid"
              >
                {zoom ? <ZoomOut className="size-5" aria-hidden="true" /> : <ZoomIn className="size-5" aria-hidden="true" />}
              </button>
              <a
                href={CONTACT.brochurePdf}
                download={CONTACT.brochureFileName}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-orange px-4 text-sm font-semibold text-ink transition-colors hover:bg-paper"
              >
                <Download className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t(b.download)}</span>
                <span className="sr-only sm:hidden">{t(b.download)}</span>
              </a>
              <button
                ref={closeBtn}
                type="button"
                onClick={onClose}
                aria-label={t(b.close)}
                className="grid size-10 place-items-center rounded-full bg-paper text-ink transition-transform hover:rotate-90"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* desktop / tablet: one spread at a time, click to zoom */}
          <div className="relative hidden min-h-0 flex-1 md:block">
            <div
              data-lenis-prevent
              onClick={() => setZoom((z) => !z)}
              className={cx("absolute inset-0 overflow-auto", zoom ? "cursor-zoom-out" : "grid cursor-zoom-in place-items-center px-6 pb-6")}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={side}
                  src={BROCHURE.pages[side]}
                  alt={t(b.pageAlt[side])}
                  width={w}
                  height={h}
                  draggable={false}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                  className={cx(
                    "select-none shadow-[0_40px_90px_-30px_rgba(0,0,0,0.8)]",
                    zoom ? "mx-auto block h-auto max-w-none" : "h-auto w-auto max-w-full rounded-lg",
                  )}
                  style={zoom ? { width: w } : { maxHeight: "calc(100svh - 96px)" }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* phones: panels in reading order, full width */}
          <div data-lenis-prevent className="min-h-0 flex-1 overflow-y-auto px-3 pb-8 md:hidden">
            <p className="text-center text-xs text-paper/70">{t(b.swipeHint)}</p>
            <ol className="mx-auto mt-3 max-w-md space-y-5">
              {PANELS.map((p, i) => (
                <li key={p.id}>
                  <p className="mb-2 text-xs font-semibold text-paper/80">
                    {i + 1}/{PANELS.length} · {t(p.label)}
                  </p>
                  <div className="relative overflow-hidden rounded-xl bg-paper shadow-lg" style={{ aspectRatio: `${w / 3} / ${h}` }}>
                    <img
                      src={BROCHURE.pages[p.side]}
                      alt={`${t(b.modalTitle)} — ${t(p.label)}`}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      draggable={false}
                      className="absolute inset-y-0 left-0 h-full max-w-none"
                      style={{ width: "300%", transform: `translateX(-${(p.col * 100) / 3}%)` }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
