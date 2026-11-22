import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Beef,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Drumstick,
  Egg,
  FileText,
  Fish,
  LeafyGreen,
  Pause,
  Play,
  Sprout,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { site } from "../../content/site";
import { INGREDIENT_PHOTOS, ingredientSrcSet, type IngredientKey } from "../../content/images";
import { langFor, useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";

const ICON: Record<IngredientKey, LucideIcon> = {
  chicken: Drumstick,
  eggs: Egg,
  fish: Fish,
  meat: Beef,
  vegetables: LeafyGreen,
  spices: Sprout,
  oil: Droplet,
  rice: Wheat,
};

/** Auto-slide speed (px per second) — slow enough to read a card as it passes. */
const SPEED = 34;
/** After a drag, swipe or arrow press, wait this long before sliding on again. */
const RESUME_AFTER = 2600;
const ARROW_MS = 520;

const items = site.ingredients.items;

/**
 * Section 3 — "What goes into your office lunch?": ingredient cards sliding to the left in an
 * endless loop, with a link to the supplier documents.
 */
export function Ingredients() {
  const { t } = useLang();
  const s = site.ingredients;
  const docs = t(s.docs);
  const note = t(s.docsNote);

  return (
    <section id="ingredients" tabIndex={-1} aria-labelledby="ingredients-title" className="relative overflow-hidden bg-paper py-16 outline-none sm:py-24">
      <Container className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
        <SectionHeading size="md" eyebrow={s.eyebrow} title={s.title} titleId="ingredients-title" />
        <Reveal delay={0.05} className="shrink-0 lg:pb-1.5 lg:text-right">
          {/* the brochure names our chicken & egg farm; it stands in until the supplier documents are online */}
          <AnchorLink
            to="brochure"
            lang={langFor(docs)}
            className="group inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-orange bg-paper px-5 py-3 text-[15px] font-semibold text-orange-700 transition-colors duration-300 hover:bg-orange-50"
          >
            <FileText className="size-[18px]" aria-hidden="true" />
            {docs}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </AnchorLink>
          <p lang={langFor(note)} className="mt-2.5 text-[13.5px] text-muted">
            {note}
          </p>
        </Reveal>
      </Container>

      <Reveal delay={0.1} className="mt-10 lg:mt-12">
        <IngredientCarousel />
      </Reveal>
    </section>
  );
}

type Motion = {
  offset: number; // how far the strip has slid (px); shown modulo one loop
  loop: number; // width of one full set of cards, incl. the gap after it
  step: number; // one card + gap
  hover: boolean;
  focus: boolean;
  visible: boolean;
  resumeAt: number;
  glide: number; // px/ms after a fling
  tween: { from: number; to: number; start: number } | null;
  drag: { id: number; x0: number; offset0: number; lastX: number; lastT: number; v: number; moved: boolean } | null;
};

function IngredientCarousel() {
  const { t } = useLang();
  const s = site.ingredients;
  const reduce = useReducedMotion() ?? false;
  const [playing, setPlaying] = useState(true);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const m = useRef<Motion>({
    offset: 0,
    loop: 0,
    step: 0,
    hover: false,
    focus: false,
    visible: false,
    resumeAt: 0,
    glide: 0,
    tween: null,
    drag: null,
  });
  // the animation loop reads these without restarting
  const autoplay = useRef(true);
  autoplay.current = playing && !reduce;

  // measure one loop (the second copy starts exactly one loop after the first) and one step
  useLayoutEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const cards = el.children as HTMLCollectionOf<HTMLElement>;
      if (cards.length < items.length + 1) return;
      m.current.loop = cards[items.length].offsetLeft - cards[0].offsetLeft;
      m.current.step = cards[1].offsetLeft - cards[0].offsetLeft;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // only animate while on screen
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (m.current.visible = e.isIntersecting), { rootMargin: "100px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(now - last, 50);
      last = now;
      const st = m.current;
      const el = track.current;
      if (!el || !st.loop || !st.visible) return;

      if (st.tween) {
        const p = Math.min(1, (now - st.tween.start) / ARROW_MS);
        st.offset = st.tween.from + (st.tween.to - st.tween.from) * (1 - (1 - p) ** 3);
        if (p === 1) st.tween = null;
      } else if (!st.drag) {
        if (Math.abs(st.glide) > 0.02) {
          st.offset += st.glide * dt;
          st.glide *= 0.94 ** (dt / 16.7);
        } else {
          st.glide = 0;
          if (autoplay.current && !st.hover && !st.focus && now >= st.resumeAt) st.offset += (SPEED * dt) / 1000;
        }
        st.offset = ((st.offset % st.loop) + st.loop) % st.loop;
      }
      const x = ((st.offset % st.loop) + st.loop) % st.loop;
      el.style.transform = `translate3d(${-x}px, 0, 0)`;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const nudge = (dir: 1 | -1) => {
    const st = m.current;
    if (!st.step) return;
    const from = st.tween ? st.tween.to : st.offset;
    const to = (Math.round(from / st.step) + dir) * st.step; // land with a card on the left edge
    st.glide = 0;
    // the animation loop draws it: instantly with reduced motion, else a short ease-out
    if (reduce) {
      st.tween = null;
      st.offset = to;
    } else {
      st.tween = { from: st.offset, to, start: performance.now() };
    }
    st.resumeAt = performance.now() + ARROW_MS + RESUME_AFTER;
  };

  // drag / swipe (vertical page scrolling stays native: touch-action pan-y)
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const st = m.current;
    st.tween = null;
    st.glide = 0;
    st.drag = { id: e.pointerId, x0: e.clientX, offset0: st.offset, lastX: e.clientX, lastT: e.timeStamp, v: 0, moved: false };
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = m.current;
    const d = st.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x0;
    if (!d.moved) {
      if (Math.abs(dx) < 6) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    st.offset = d.offset0 - dx;
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = 0.75 * ((d.lastX - e.clientX) / dt) + 0.25 * d.v;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
  };
  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const st = m.current;
    const d = st.drag;
    if (!d || e.pointerId !== d.id) return;
    if (d.moved && !reduce && e.timeStamp - d.lastT < 80) st.glide = Math.max(-3, Math.min(3, d.v));
    st.drag = null;
    st.resumeAt = performance.now() + RESUME_AFTER;
    // reduced motion: no glide, settle on the nearest card
    if (reduce && d.moved && st.step) st.offset = Math.round(st.offset / st.step) * st.step;
  };

  const control =
    "grid size-11 place-items-center rounded-full border border-line bg-paper text-ink transition-colors duration-300 hover:border-ink/30 hover:bg-mist";

  return (
    <div
      role="region"
      aria-roledescription={t(s.carouselKind)}
      aria-label={t(s.carousel)}
      // keyboard focus on the controls holds the slides still (a mouse click on "play" must not)
      onFocus={(e) => (m.current.focus = (e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) m.current.focus = false;
      }}
    >
      <div
        ref={viewport}
        data-ingredient-viewport
        onPointerEnter={(e) => e.pointerType === "mouse" && (m.current.hover = true)}
        onPointerLeave={(e) => e.pointerType === "mouse" && (m.current.hover = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="cursor-grab touch-pan-y select-none overflow-hidden active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,#000_2.5%,#000_97.5%,transparent)]"
      >
        <ul
          ref={track}
          data-ingredient-track
          className="flex w-max gap-4 pb-8 pl-4 pt-1 will-change-transform sm:gap-5 sm:pl-6 lg:pl-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
        >
          {[0, 1].map((copy) =>
            items.map((it, i) => {
              const key = it.key as IngredientKey;
              const Icon = ICON[key];
              const title = t(it.title);
              const text = t(it.text);
              const twin = copy === 1;
              return (
                <li
                  key={`${copy}-${it.key}`}
                  aria-hidden={twin || undefined}
                  inert={twin || undefined}
                  role={twin ? undefined : "group"}
                  aria-roledescription={twin ? undefined : t(s.slideKind)}
                  aria-label={twin ? undefined : `${i + 1} / ${items.length}: ${title}`}
                  className="w-[min(78vw,300px)] shrink-0 sm:w-[300px] lg:w-[312px]"
                >
                  <article className="flex h-full flex-col overflow-hidden rounded-[22px] bg-paper shadow-[0_22px_44px_-36px_rgba(35,31,32,0.55)] ring-1 ring-line">
                    <div className="aspect-[4/3] overflow-hidden bg-[#5b5d63]">
                      <img
                        src={INGREDIENT_PHOTOS[key].large}
                        srcSet={ingredientSrcSet(key)}
                        sizes="(min-width: 1024px) 312px, (min-width: 640px) 300px, 78vw"
                        width={840}
                        height={560}
                        alt={twin ? "" : t(it.alt)}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-3">
                        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600" aria-hidden="true">
                          <Icon className="size-[22px]" strokeWidth={1.9} />
                        </span>
                        <h3 lang={langFor(title)} className="text-[1.08rem] font-semibold leading-snug text-ink">
                          {title}
                        </h3>
                      </div>
                      <p lang={langFor(text)} className="mt-3 text-[15px] leading-relaxed text-muted">
                        {text}
                      </p>
                    </div>
                  </article>
                </li>
              );
            }),
          )}
        </ul>
      </div>

      <Container className="mt-0 flex items-center justify-end gap-2">
        <button type="button" onClick={() => nudge(-1)} aria-label={t(s.prev)} className={control}>
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        {!reduce && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={t(playing ? s.pause : s.play)}
            data-ingredient-toggle
            className={cx(control, !playing && "border-orange/50 text-orange-700")}
          >
            {playing ? <Pause className="size-[18px]" aria-hidden="true" /> : <Play className="size-[18px]" aria-hidden="true" />}
          </button>
        )}
        <button type="button" onClick={() => nudge(1)} aria-label={t(s.next)} className={control}>
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </Container>
    </div>
  );
}
