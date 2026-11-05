import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";

type Props = { value: number; decimals?: number; suffix?: string; className?: string; duration?: number };

/**
 * Counts up once when visible. The final value is laid out invisibly to reserve
 * the width (proportional figures at display size), so nothing around it shifts.
 */
export function CountUp({ value, decimals = 0, suffix = "", className, duration = 1.9 }: Props) {
  const { num } = useLang();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCurrent(value);
      return;
    }
    const controls = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setCurrent });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  const format = (n: number) => num(n.toFixed(decimals)) + suffix;

  return (
    <span ref={ref} className={cx("relative inline-block whitespace-nowrap", className)}>
      <span className="invisible" aria-hidden="true">
        {format(value)}
      </span>
      <span className="absolute inset-0" aria-hidden="true">
        {format(current)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
