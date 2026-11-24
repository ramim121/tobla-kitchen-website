/**
 * A line drawing of a city skyline — office towers and low-rise blocks, no landmarks or religious
 * buildings — for the "offices in Dhaka" band. Drawn in hairlines so it stays quiet behind the text.
 * viewBox is in mm: 97 wide, 23 tall, ground on the bottom edge.
 */
type Top = "flat" | "step" | "antenna" | "slant" | "slantL" | "crown" | "spire";
type Block = { x: number; w: number; h: number; top: Top };

const W = 97;
const G = 22.4; // ground line

const BLOCKS: Block[] = [
  { x: 0, w: 6.5, h: 7, top: "flat" },
  { x: 6.5, w: 4.6, h: 12, top: "step" },
  { x: 11.1, w: 3.8, h: 16.2, top: "antenna" },
  { x: 14.9, w: 7.4, h: 9, top: "flat" },
  { x: 22.3, w: 4.8, h: 14, top: "slant" },
  { x: 27.1, w: 3.3, h: 18.6, top: "crown" },
  { x: 30.4, w: 5.2, h: 10.5, top: "flat" },
  { x: 35.6, w: 4.2, h: 13.4, top: "step" },
  { x: 39.8, w: 3.6, h: 20.2, top: "spire" },
  { x: 43.4, w: 4.2, h: 11.2, top: "flat" },
  { x: 47.6, w: 4.8, h: 12.8, top: "step" },
  { x: 52.4, w: 3.9, h: 17.2, top: "antenna" },
  { x: 56.3, w: 6.6, h: 9.6, top: "flat" },
  { x: 62.9, w: 4.4, h: 15, top: "slantL" },
  { x: 67.3, w: 5.6, h: 19.6, top: "crown" },
  { x: 72.9, w: 5, h: 11.6, top: "flat" },
  { x: 77.9, w: 3.9, h: 15.8, top: "antenna" },
  { x: 81.8, w: 6.8, h: 8.8, top: "step" },
  { x: 88.6, w: 8.4, h: 12.6, top: "flat" },
];

function outline({ x, w, h, top }: Block) {
  const y = G - h;
  const r = x + w;
  switch (top) {
    case "step": {
      const s = Math.min(1.6, w * 0.3);
      return `M${x} ${G}V${y + 1.8}H${x + s}V${y}H${r - s}V${y + 1.8}H${r}V${G}`;
    }
    case "antenna":
      return `M${x} ${G}V${y}H${r}V${G}M${x + w / 2} ${y}V${y - 3.2}`;
    case "slant":
      return `M${x} ${G}V${y + 2.2}L${r} ${y}V${G}`;
    case "slantL":
      return `M${x} ${G}V${y}L${r} ${y + 2.2}V${G}`;
    case "crown":
      return `M${x} ${G}V${y + 1.2}L${x + w / 2} ${y - 1.4}L${r} ${y + 1.2}V${G}M${x + w / 2} ${y - 1.4}V${y - 3.4}`;
    case "spire": // a tall tower with a stepped crown and a mast
      return `M${x} ${G}V${y + 2}H${x + 0.6}V${y}H${r - 0.6}V${y + 2}H${r}V${G}M${x + w / 2} ${y}V${y - 2.8}`;
    default:
      return `M${x} ${G}V${y}H${r}V${G}`;
  }
}

/** rows of short dashes for windows */
function windows({ x, w, h }: Block) {
  const out: string[] = [];
  const cols = Math.max(1, Math.floor((w - 1.2) / 1.35));
  const gap = (w - cols * 0.55) / (cols + 1);
  for (let wy = G - h + 2.6; wy < G - 1.2; wy += 1.7) {
    for (let c = 0; c < cols; c++) out.push(`M${(x + gap + c * (0.55 + gap)).toFixed(2)} ${wy.toFixed(2)}h0.55`);
  }
  return out.join("");
}

/** tone: "light" = ink lines on a light ground, "dark" = pale lines on the black band */
export function Skyline({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const line = tone === "dark" ? "#FFFFFF" : "#231F20";
  const k = tone === "dark" ? 0.9 : 1; // pale lines read stronger on black
  return (
    <svg viewBox={`0 0 ${W} 23`} preserveAspectRatio="xMidYMax slice" className={className} aria-hidden="true">
      <g fill="none" stroke={line} strokeLinecap="round" strokeLinejoin="round">
        <path d={BLOCKS.map(outline).join("")} strokeOpacity={0.36 * k} strokeWidth="0.24" />
        <path d={BLOCKS.map(windows).join("")} strokeOpacity={0.22 * k} strokeWidth="0.32" />
        <path d={`M0 ${G}H${W}`} strokeOpacity={0.42 * k} strokeWidth="0.26" />
      </g>
    </svg>
  );
}
