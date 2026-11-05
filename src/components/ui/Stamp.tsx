import { useId, useLayoutEffect, useRef } from "react";
import { LogoMark } from "../brand/Logo";
import { cx } from "../../lib/cx";

const R = 45; // text circle radius inside a 120 box
const CIRCUMFERENCE = 2 * Math.PI * R;

/**
 * Round "seal" with the logo mark and a slowly turning line of text.
 * Font size is fitted at runtime so one copy of the text wraps the circle
 * exactly (no letter-spacing tricks, which would break Bangla shaping).
 */
export function Stamp({ text, className }: { text: string; className?: string }) {
  const pathId = useId();
  const textRef = useRef<SVGTextElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  useLayoutEffect(() => {
    const fit = () => {
      const t = textRef.current;
      const m = measureRef.current;
      if (!t || !m) return;
      m.style.fontSize = "10px";
      const len = m.getComputedTextLength();
      if (len > 0) t.style.fontSize = `${(10 * CIRCUMFERENCE * 0.985) / len}px`;
    };
    fit();
    document.fonts?.ready.then(fit).catch(() => {});
  }, [text]);

  return (
    <div className={cx("relative grid place-items-center rounded-full bg-paper shadow-[0_18px_40px_-18px_rgba(35,31,32,0.45)] ring-1 ring-ink/5", className)}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 size-full animate-spin-slow" aria-hidden="true">
        <defs>
          <path id={pathId} d={`M60,60 m-${R},0 a${R},${R} 0 1,1 ${R * 2},0 a${R},${R} 0 1,1 -${R * 2},0`} />
        </defs>
        <text ref={measureRef} className="font-display font-semibold" visibility="hidden" x="0" y="-20">
          {text}
        </text>
        <text ref={textRef} className="fill-ink font-display font-semibold" style={{ fontSize: 9 }}>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <LogoMark className="relative h-[46%] w-auto" />
    </div>
  );
}
