import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { scrollToId } from "../../lib/smooth-scroll";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  children: ReactNode;
  onNavigate?: () => void;
};

/** In-page link that scrolls smoothly (Lenis) and still works as a plain anchor without JS. */
export function AnchorLink({ to, children, onNavigate, onClick, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    const fromKeyboard = e.detail === 0;
    onNavigate?.();
    // let a closing menu release the scroll lock first
    requestAnimationFrame(() => {
      scrollToId(to);
      if (fromKeyboard) document.getElementById(to)?.focus({ preventScroll: true });
    });
  };
  return (
    <a href={`#${to}`} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
