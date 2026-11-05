import { Fragment, useRef, type ReactNode } from "react";
import { useInView } from "motion/react";
import { cx } from "../../lib/cx";

/** Marker-pen highlight that draws itself in when it scrolls into view. */
export function Mark({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  return (
    <mark ref={ref} className={cx("mark-hl bg-transparent text-current", dark && "mark-hl-dark", inView && "is-on")}>
      {children}
    </mark>
  );
}

const TOKEN = /(\*\*[^*]+\*\*|==[^=]+==)/g;

/** Renders copy with `**accent**` and `==marker==` segments. */
export function Rich({ text, accent = "text-orange-600", dark = false }: { text: string; accent?: string; dark?: boolean }) {
  return (
    <>
      {text
        .split(TOKEN)
        .filter(Boolean)
        .map((part, i) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <span key={i} className={accent}>
                {part.slice(2, -2)}
              </span>
            );
          }
          if (part.startsWith("==") && part.endsWith("==")) {
            return (
              <Mark key={i} dark={dark}>
                {part.slice(2, -2)}
              </Mark>
            );
          }
          return <Fragment key={i}>{part}</Fragment>;
        })}
    </>
  );
}
