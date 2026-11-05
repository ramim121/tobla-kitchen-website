import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";

import { LogoLockup } from "../brand/Logo";
import { AnchorLink } from "../ui/AnchorLink";
import { Container } from "../ui/Container";
import { LangToggle } from "./LangToggle";
import { CONTACT, site } from "../../content/site";
import { useLang } from "../../lib/i18n";
import { cx, EASE_OUT } from "../../lib/cx";
import { isNavigating, lockScroll } from "../../lib/smooth-scroll";

/** Which nav item lights up while a section is in the middle of the screen. */
const SECTION_TO_NAV: Record<string, string | null> = {
  top: null,
  why: "why",
  sourcing: "why",
  risks: "why",
  menu: "menu",
  pricing: "menu",
  process: "process",
  about: "about",
  brochure: "brochure",
  contact: "contact",
};

function useActiveNav() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(SECTION_TO_NAV[e.target.id] ?? null);
      },
      { rootMargin: "-45% 0px -54% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveNav();
  const { scrollY } = useScroll();
  const menuButton = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    if (Math.abs(y - prev) < 3) return;
    if (isNavigating()) return setHidden(false);
    setHidden(y > 520 && y > prev);
  });

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  }, []);

  const solid = scrolled || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -96 }}
        animate={{ y: hidden && !open ? -96 : 0 }}
        transition={{ duration: 0.55, ease: EASE_OUT }}
      >
        <div
          className={cx(
            "transition-[background-color,box-shadow] duration-500",
            solid ? "bg-paper/90 shadow-[0_1px_0_rgba(35,31,32,0.08)] backdrop-blur-xl backdrop-saturate-150" : "bg-transparent",
          )}
        >
          <Container className="flex h-16 items-center justify-between gap-3 sm:h-[72px]">
            <AnchorLink to="top" aria-label={t(site.nav.home)} className="shrink-0 rounded-xl">
              <LogoLockup />
            </AnchorLink>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-0.5">
                {site.nav.items.map((item) => {
                  const on = active === item.id;
                  return (
                    <li key={item.id}>
                      <AnchorLink
                        to={item.id}
                        aria-current={on ? "true" : undefined}
                        className={cx(
                          "relative block whitespace-nowrap rounded-full px-3 py-2 text-[15px] font-medium transition-colors duration-300 xl:px-4",
                          on ? "text-ink" : "text-ink/75 hover:text-ink",
                        )}
                      >
                        {on && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute inset-0 rounded-full bg-ink/[0.06]"
                            transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          />
                        )}
                        <span className="relative">{t(item.label)}</span>
                      </AnchorLink>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LangToggle />
              <a
                href={CONTACT.phoneHref}
                aria-label={t(site.nav.call)}
                className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition-colors duration-300 hover:bg-orange hover:text-ink sm:inline-flex lg:px-3 xl:px-4"
              >
                <Phone className="size-4" aria-hidden="true" />
                <span className="lg:hidden xl:inline">{t(site.nav.call)}</span>
              </a>
              <button
                ref={menuButton}
                type="button"
                onClick={() => setOpen(true)}
                aria-label={t(site.nav.openMenu)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="grid size-10 place-items-center rounded-full border border-ink/10 bg-white/80 text-ink transition-colors hover:bg-white lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </button>
            </div>
          </Container>
        </div>
      </motion.header>

      <MobileMenu open={open} active={active} onClose={close} />
    </>
  );
}

function MobileMenu({ open, active, onClose }: { open: boolean; active: string | null; onClose: () => void }) {
  const { t } = useLang();
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t(site.nav.openMenu)}
          className="fixed inset-0 z-[60] lg:hidden"
          initial="closed"
          animate="open"
          exit="closed"
        >
          <motion.div
            className="absolute inset-0 bg-ink/45 backdrop-blur-[3px]"
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute inset-x-3 top-3 max-h-[calc(100svh-24px)] overflow-y-auto rounded-[28px] bg-paper p-5 shadow-[0_30px_80px_-20px_rgba(35,31,32,0.6)] sm:inset-x-6"
            variants={{
              closed: { opacity: 0, y: -18, scale: 0.98 },
              open: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
          >
            <div className="flex items-center justify-between">
              <LogoLockup />
              <button
                ref={closeButton}
                type="button"
                onClick={onClose}
                aria-label={t(site.nav.closeMenu)}
                className="grid size-10 place-items-center rounded-full bg-ink text-paper"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-4">
              <ul className="divide-y divide-line">
                {site.nav.items.map((item, i) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      closed: { opacity: 0, x: -10 },
                      open: { opacity: 1, x: 0, transition: { delay: 0.06 + i * 0.045, duration: 0.4, ease: EASE_OUT } },
                    }}
                  >
                    <AnchorLink
                      to={item.id}
                      onNavigate={onClose}
                      aria-current={active === item.id ? "true" : undefined}
                      className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-ink"
                    >
                      <span className={cx(active === item.id && "text-orange-600")}>{t(item.label)}</span>
                      <ArrowUpRight className="size-5 text-orange-600" aria-hidden="true" />
                    </AnchorLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
              <LangToggle />
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-3 text-sm font-semibold text-ink"
              >
                <Phone className="size-4" aria-hidden="true" />
                {t(CONTACT.phoneDisplay)}
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
