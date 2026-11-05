import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;
let navigatingUntil = 0;

/**
 * True while a nav-triggered scroll is running — the header stays visible
 * instead of hiding as if the reader had scrolled down by hand.
 */
export const isNavigating = () => performance.now() < navigatingUntil;

/**
 * Buttery wheel scrolling on desktop. Touch devices keep native scrolling
 * (syncTouch off), and people who prefer reduced motion get plain scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({
      autoRaf: true,
      lerp: 0.095,
      smoothWheel: true,
      syncTouch: false,
      stopInertiaOnNavigate: true,
    });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
}

/**
 * Scroll to a section. The space kept above it comes from the section's CSS
 * `scroll-margin-top` (see index.css), which Lenis, `scrollIntoView` and plain
 * anchor jumps all respect — one source of truth.
 */
export function scrollToId(id: string) {
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;
  navigatingUntil = performance.now() + 1800;

  if (lenis) {
    lenis.scrollTo(el ?? 0, {
      duration: 1.25,
      force: true,
      onComplete: () => {
        navigatingUntil = performance.now() + 120;
      },
    });
    return;
  }
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  if (el) el.scrollIntoView({ behavior, block: "start" });
  else window.scrollTo({ top: 0, behavior });
}

/** Freeze page scrolling (used while the mobile menu is open). */
export function lockScroll(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
