import { cx } from "../../lib/cx";

/**
 * Concentric rings — a nod to the tabla drum-head in the logo.
 * Pure decoration; strokes stay hairline at any size.
 */
export function TablaRings({ className, dark = false }: { className?: string; dark?: boolean }) {
  const line = dark ? "#FFFDFB" : "#231F20";
  return (
    <svg viewBox="0 0 200 200" className={cx("pointer-events-none", className)} aria-hidden="true">
      <circle cx="100" cy="100" r="99" fill="none" stroke={line} strokeOpacity={0.12} strokeWidth="1" strokeDasharray="2 6" vectorEffect="non-scaling-stroke" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#F36F21" strokeOpacity={0.55} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <circle cx="100" cy="100" r="81" fill="none" stroke={line} strokeOpacity={0.08} strokeWidth="1" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
