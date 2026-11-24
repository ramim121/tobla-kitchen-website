import type { ComponentType, ReactNode } from "react";
import {
  Beef,
  CalendarDays,
  ChefHat,
  ClipboardList,
  Globe,
  Leaf,
  MapPin,
  MessageSquareText,
  Package,
  Phone,
  ShieldCheck,
  Soup,
  Truck,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { LogoMark, LogoWordmark } from "../../src/components/brand/Logo";
import { BROCHURE_PANELS, SHEET_MM, type BrochurePanel, type BrochureSide } from "../../src/content/brochure";
import { SkylineArt, SKYLINE } from "./Skyline";

import mealBox from "./assets/meal-box.jpg";
import kitchen from "./assets/kitchen.jpg";
import ingredients from "./assets/ingredients.jpg";
import qrSvg from "./assets/qr.svg?raw";

/*
 * After the owner's first concept and their reviews: outside — cream "Let's plan", solid orange "Before you
 * decide", the black cover with a close-up of a steaming lunch box; inside — "Built on better ingredients"
 * with round icons over a wave of fresh produce, "From kitchen to office" under a full-width kitchen photo,
 * and "A reliable partner" with an orange band for the Dhaka service areas. Large type throughout. Logo
 * colours: orange #F36F21, black #231F20, with a warm cream.
 */

export type Mode = "trim" | "print";

const BLEED = 3; // mm, print mode
const SLUG = 12; // mm from the page edge to the trim, print mode

/* ───────────────────────── Icons ───────────────────────── */

/** lucide icons and the few drawn here share one shape: a component taking a stroke width */
type IconLike = ComponentType<{ strokeWidth?: number }>;
const STROKE = 1.7;

/** Icons lucide doesn't have, drawn on its 24 grid with its stroke style. */
function Glyph({ strokeWidth = STROKE, children }: { strokeWidth?: number; children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}
/** a hen, facing left: comb, beak, raised tail, wing and feet (the owner's concept) */
function Hen({ strokeWidth }: { strokeWidth?: number }) {
  return (
    <Glyph strokeWidth={strokeWidth}>
      <path d="M3.6 8.2 5.6 7.2C5.8 5.3 7.2 4.4 8.6 4.6c1.6.3 2.3 1.8 1.9 3.4-.3 1.4.8 2.6 2.5 2.6 1.8 0 3.2-1 4.2-2.6l2.2-3.4.2 3.6 1.6-1.6c.4 4.4-.8 8.8-4.6 11-3 1.6-7.4 1.4-9.6-1-1.8-2-2-5-.8-7Z" />
      <path d="M7.3 4.7c-.2-1.3 1-1.8 1.6-.8.7-.8 1.9-.1 1.3 1.1" />
      <path d="M11 13.6c1.6 2 4.6 2 6.2-.2" />
      <path d="M11 18.9v2.3M14.4 18.6v2.6M9.8 21.2h2.4M13.2 21.2h2.4" />
      <circle cx="8.1" cy="6.6" r=".45" fill="currentColor" />
    </Glyph>
  );
}
/** an egg with a little highlight */
function EggIcon({ strokeWidth }: { strokeWidth?: number }) {
  return (
    <Glyph strokeWidth={strokeWidth}>
      <path d="M12 2.6c-3.6 0-6.7 6-6.7 11.2a6.7 6.7 0 0 0 13.4 0C18.7 8.6 15.6 2.6 12 2.6Z" />
      <path d="M15.4 14.4a3.4 3.4 0 0 1-2.8 3.3" />
    </Glyph>
  );
}
/** a drop of oil with a little highlight */
function OilDrop({ strokeWidth }: { strokeWidth?: number }) {
  return (
    <Glyph strokeWidth={strokeWidth}>
      <path d="M12 2.8s-6.2 6.8-6.2 11.5a6.2 6.2 0 0 0 12.4 0C18.2 9.6 12 2.8 12 2.8Z" />
      <path d="M8.9 14.6a3.2 3.2 0 0 0 2.7 3" />
    </Glyph>
  );
}
/** whole spices: two crossed cinnamon sticks and a cardamom pod */
function Spices({ strokeWidth }: { strokeWidth?: number }) {
  return (
    <Glyph strokeWidth={strokeWidth}>
      <rect x="3" y="9.2" width="15" height="3.6" rx="1.8" transform="rotate(-52 10.5 11)" />
      <rect x="4.6" y="10.6" width="15.4" height="3.6" rx="1.8" transform="rotate(-6 12.3 12.4)" />
      <ellipse cx="17.8" cy="19.2" rx="2.5" ry="1.45" transform="rotate(-28 17.8 19.2)" />
    </Glyph>
  );
}

function Icon({ icon: I, className }: { icon: IconLike; className: string }) {
  return (
    <span className={className}>
      <I strokeWidth={STROKE} />
    </span>
  );
}

/** An item with a bold headline and a line of subtext, its icon on an orange-tinted tile. */
function Item({ icon, title, children }: { icon: IconLike; title: ReactNode; children: ReactNode }) {
  return (
    <li className="item">
      <Icon icon={icon} className="tile" />
      <div>
        <p className="item-title">{title}</p>
        <p className="item-text">{children}</p>
      </div>
    </li>
  );
}

/* ───────────────────────── Outside ───────────────────────── */

/** Outside left — the flap that folds in: plan your office lunch, the QR code and contact details. */
function PlanPanel() {
  return (
    <>
      <h2 className="title">
        Let&rsquo;s Plan Your
        <br />
        <em>Office Lunch</em>
      </h2>
      <p className="body">
        Tell us about your team, location and lunch requirements. We&rsquo;ll share a tailored service proposal for your office.
      </p>

      <div className="qr-row">
        <div className="qr" dangerouslySetInnerHTML={{ __html: qrSvg }} />
        <div>
          <p className="qr-title">Visit Our Website</p>
          <p className="qr-text">Scan the QR code or visit</p>
          <p className="qr-url">toblakitchen.com</p>
        </div>
      </div>

      <hr className="rule" />

      <ul className="contacts">
        <li>
          <Icon icon={Phone} className="dot" />
          <div>
            <p className="contact-main">01711 400 151</p>
            <p className="contact-sub">Raihan Mahmud, GM Business Development</p>
          </div>
        </li>
        <li>
          <Icon icon={MapPin} className="dot" />
          <p className="contact-main">17/5 Kunipara, Tejgaon, Dhaka</p>
        </li>
        <li>
          <Icon icon={Globe} className="dot" />
          <p className="contact-main">toblakitchen.com</p>
        </li>
      </ul>
    </>
  );
}

function PlanDecor() {
  return (
    <svg className="decor-full" viewBox="0 0 100 216" preserveAspectRatio="none" aria-hidden="true">
      {/* orange swoosh in the top-left corner, tan disc rising from the bottom-right */}
      <path d="M0 0 H32 C 18 3, 6 15, 0 44 Z" fill="#F36F21" />
      <circle cx="114" cy="240" r="58" fill="#EBDCC9" />
    </svg>
  );
}

/** Outside middle — the back panel, solid orange: three ways to check us before signing up. */
function DecidePanel() {
  const checks: { icon: LucideIcon; title: ReactNode; text: string }[] = [
    { icon: ChefHat, title: "See the Kitchen", text: "Visit our kitchen and see for yourself how we work." },
    {
      icon: ShieldCheck,
      title: (
        <>
          Understand
          <br />
          the Standards
        </>
      ),
      text: "From ingredient sourcing to hygiene and quality control.",
    },
    {
      icon: Soup,
      title: (
        <>
          Taste Before
          <br />
          You Decide
        </>
      ),
      text: "Try a meal at your office with a complimentary sampling.",
    },
  ];
  return (
    <>
      <h2 className="title title--white title--xl">
        Before
        <br />
        You Decide
      </h2>
      <ul className="checks">
        {checks.map((c, i) => (
          <li key={i}>
            <Icon icon={c.icon} className="badge" />
            <div>
              <p className="check-title">{c.title}</p>
              <p className="check-text">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="promise">Our own team eats the same food we serve you, every single day.</p>
    </>
  );
}

function DecideDecor() {
  return (
    <svg className="decor-full" viewBox="0 0 100 216" preserveAspectRatio="none" aria-hidden="true">
      {/* a lighter and a deeper orange curve along the foot of the panel */}
      <path d="M0 182 C 30 166, 70 176, 100 158 V216 H0 Z" fill="#FFFFFF" fillOpacity="0.09" />
      <path d="M0 200 C 35 187, 72 200, 100 184 V216 H0 Z" fill="#C9520F" fillOpacity="0.22" />
    </svg>
  );
}

/** Outside right — the front cover, black, with the lunch box below the words. */
function CoverPanel() {
  return (
    <>
      <div className="lockup">
        <LogoMark tone="light" className="mark" title="Tobla Kitchen" />
        <LogoWordmark tone="light" className="word" />
      </div>
      <h1 className="cover-title">
        Corporate Lunch,
        <br />
        <em>
          Professionally
          <br />
          Managed.
        </em>
      </h1>
      <p className="cover-lead">Reliable, hygienic and nutritious lunch service for your office.</p>
    </>
  );
}

/**
 * The steaming lunch box, close up: one SVG in mm. The photo already holds everything (prepare-assets.py): its
 * black matches the cover, its top fades into it so the steam rises out of the page, and the orange disc sits
 * behind the box with the steam in front of it. 108 mm wide: its right edge on the bleed, 5 mm cut off at the
 * fold, and its foot runs off the bottom, so the box is never shown whole. An SVG, not stacked boxes:
 * Chromium splits boxes that cross the page edge when printing.
 */
function CoverMealBox() {
  const W = 108; // keep in step with MEAL_BOX_WIDTH_MM in prepare-assets.py
  const H = W * 1.5; // the photo is 2:3
  return (
    <svg className="art" viewBox={`0 0 ${W} ${H}`} style={{ width: `${W}mm`, height: `${H}mm`, left: "-5mm", top: "calc(var(--bleed) + 66mm)" }} aria-hidden="true">
      <image href={mealBox} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}

/* ───────────────────────── Inside ───────────────────────── */

/** Inside left — what goes into the food, over a wave of fresh produce. */
function IngredientsPanel() {
  return (
    <>
      <span className="bar" />
      <h2 className="title">
        Built on
        <br />
        <em>Better Ingredients</em>
      </h2>
      <ul className="items items--lined">
        <Item icon={Hen} title="Antibiotic-free chicken">
          Sourced from trusted, vetted suppliers.
        </Item>
        <Item icon={EggIcon} title="Omega-3 eggs">
          Nutritious, high-quality eggs for balanced meals.
        </Item>
        <Item icon={Leaf} title="Daily fresh vegetables and fish">
          Seasonal, fresh and carefully selected.
        </Item>
        <Item icon={Beef} title="Selected meat vendors">
          From quality and compliant sources.
        </Item>
        <Item icon={OilDrop} title="Branded cooking oil">
          Only trusted, recognized brands.
        </Item>
        <Item icon={Spices} title="Whole spices, externally milled">
          For richer, more authentic flavor and better food safety.
        </Item>
      </ul>
    </>
  );
}

/**
 * Fresh produce along the foot of the panel, cut by a wave (the owner's concept): high at the fold, dipping,
 * a little hump, then lower at the right. The wave is a vector clip, so the photo stays one plain JPEG.
 */
function IngredientsPhoto() {
  const W = 103; // the panel + the bleed on the left
  const TOP = 143; // mm from the trim top
  const H = 210 + BLEED - TOP;
  // the photo, 140 mm wide (3:2), its foot on the bleed edge: tomatoes, chicken, eggs and spices fill the wave
  const PW = 140;
  const PH = PW / 1.5;
  return (
    <svg className="art" viewBox={`0 0 ${W} ${H}`} style={{ width: `${W}mm`, height: `${H}mm`, left: `calc(var(--bleed) - ${BLEED}mm)`, top: `calc(var(--bleed) + ${TOP}mm)` }} aria-hidden="true">
      <defs>
        <clipPath id="produce-wave">
          <path d={`M0 3C14 3.5 20 21 37 21 51 21 58 16.5 72 17 86 17.5 96 21.5 ${W} 24V${H}H0Z`} />
        </clipPath>
      </defs>
      <image href={ingredients} x={-17} y={H - PH} width={PW} height={PH} preserveAspectRatio="xMidYMid slice" clipPath="url(#produce-wave)" />
    </svg>
  );
}

/** Inside middle — the kitchen photo across the whole panel, then how lunch gets to the office. */
function KitchenPanel() {
  return (
    <>
      <span className="bar" />
      <h2 className="title">
        From Kitchen
        <br />
        to <em>Office</em>
      </h2>
      <ul className="items items--kitchen">
        <Item icon={ShieldCheck} title="Hygienic kitchen operations">
          Clean processes, trained team and strict food safety.
        </Item>
        <Item icon={ClipboardList} title="Daily taste & quality check">
          Every batch is checked before dispatch.
        </Item>
        <Item icon={Package} title="Safe & organized packaging">
          Food-grade, secure boxes, replaced every 3 months.
        </Item>
        <Item icon={Truck} title="Route-planned delivery">
          On-time, fresh and reliable to your office.
        </Item>
      </ul>
    </>
  );
}

/** The kitchen photo, fold to fold and into the top bleed; its foot fades into the panel (baked into the photo). */
function KitchenPhoto() {
  const W = 100;
  const H = 87; // includes the 3 mm top bleed
  return (
    <svg className="art" viewBox={`0 0 ${W} ${H}`} style={{ width: `${W}mm`, height: `${H}mm`, left: 0, top: `calc(var(--bleed) - ${BLEED}mm)` }} aria-hidden="true">
      <image href={kitchen} width={W} height={H} preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}

/** Inside right — support and menus, then the orange band: where we deliver. */
function PartnerPanel() {
  return (
    <>
      <span className="bar" />
      <h2 className="title">
        A Reliable Partner
        <br />
        <em>for Your Office</em>
      </h2>
      <ul className="items items--lined items--partner">
        <Item icon={UserRound} title="Dedicated Account Manager">
          A single point of contact for smooth service.
        </Item>
        <Item icon={MessageSquareText} title="Feedback & Complaint Handling">
          We listen, review and take corrective action quickly.
        </Item>
        <Item icon={CalendarDays} title="Menu Variety & Rotation">
          A balanced, varied menu to keep your team satisfied.
        </Item>
      </ul>
      <div className="band">
        <div className="band__head">
          <Icon icon={CalendarDays} className="band__icon" />
          <p>
            Corporate Lunch Service
            <br />
            for Offices in Dhaka
          </p>
        </div>
        <p className="band__areas">
          {["Gulshan", "Banani", "Niketon", "Baridhara", "Baridhara DOHS", "Mohakhali", "Mohakhali DOHS", "Tejgaon"]
            .map((a) => a.replace(/ /g, "\u00a0"))
            .join(" · ")}
        </p>
      </div>
    </>
  );
}

/**
 * The band at the foot, shaped as in the owner's concept — a wide rounded corner at the fold, its top rising
 * gently to the right, a lighter shape peeking out behind it — in an orange gradient instead of black, with a
 * skyline on the right. Drawn in mm: 100 wide (the panel + the bleed on the right), down to the bleed edge.
 */
function PartnerDecor() {
  const W = 100;
  const TOP = 112; // mm from the trim top
  const H = 210 + BLEED - TOP;
  const s = 0.7; // skyline scale: 68 mm wide, its ground 5 mm above the trim
  return (
    <svg className="art" viewBox={`0 0 ${W} ${H}`} style={{ width: `${W}mm`, height: `${H}mm`, left: 0, top: `calc(var(--bleed) + ${TOP}mm)` }} aria-hidden="true">
      <defs>
        <linearGradient id="band-fill" x1="0.95" y1="0" x2="0.1" y2="1">
          <stop offset="0" stopColor="#F8964A" />
          <stop offset="0.45" stopColor="#F36F21" />
          <stop offset="1" stopColor="#D8540F" />
        </linearGradient>
        <linearGradient id="band-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDDDC2" />
          <stop offset="1" stopColor="#F9B07A" />
        </linearGradient>
      </defs>
      <ellipse cx="88" cy="26" rx="34" ry="16" fill="url(#band-glow)" />
      <path d={`M0 ${H}V52C0 38 10 28.5 26 26 50 22.5 78 19 ${W} 18V${H}Z`} fill="url(#band-fill)" />
      <g transform={`translate(${W - SKYLINE.w * s} ${H - BLEED - 5 - SKYLINE.ground * s}) scale(${s})`}>
        <SkylineArt tone="onOrange" />
      </g>
    </svg>
  );
}

/* ───────────────────────── Sheets ───────────────────────── */

const CONTENT: Record<BrochurePanel["id"], { bg: string; body: ReactNode; decor?: ReactNode }> = {
  plan: { bg: "bg-cream", body: <PlanPanel />, decor: <PlanDecor /> },
  decide: { bg: "bg-orange", body: <DecidePanel />, decor: <DecideDecor /> },
  cover: { bg: "bg-ink", body: <CoverPanel />, decor: <CoverMealBox /> },
  ingredients: { bg: "bg-cream", body: <IngredientsPanel />, decor: <IngredientsPhoto /> },
  kitchen: { bg: "bg-cream-light", body: <KitchenPanel />, decor: <KitchenPhoto /> },
  partner: { bg: "bg-cream", body: <PartnerPanel />, decor: <PartnerDecor /> },
};

function Marks({ side }: { side: BrochureSide }) {
  // crop marks at the four corners (outside the bleed) and dashed fold marks above and below each fold
  const W = SHEET_MM.w + 2 * SLUG;
  const H = SHEET_MM.h + 2 * SLUG;
  const t = SLUG; // trim offset
  const gap = BLEED + 1; // marks stop short of the bleed
  const len = SLUG - gap - 2;
  const crops: string[] = [];
  for (const x of [t, t + SHEET_MM.w]) {
    for (const [y0, dir] of [
      [t - gap, -1],
      [t + SHEET_MM.h + gap, 1],
    ] as const)
      crops.push(`M${x} ${y0}v${dir * len}`);
  }
  for (const y of [t, t + SHEET_MM.h]) {
    for (const [x0, dir] of [
      [t - gap, -1],
      [t + SHEET_MM.w + gap, 1],
    ] as const)
      crops.push(`M${x0} ${y}h${dir * len}`);
  }
  const folds = BROCHURE_PANELS[side].slice(1).map((p) => t + p.x);
  const foldPaths = folds.map((x) => `M${x} ${t - gap}v${-len}M${x} ${t + SHEET_MM.h + gap}v${len}`).join("");
  return (
    <svg className="marks" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <path d={crops.join("")} stroke="#000" strokeWidth="0.1" fill="none" />
      <path d={foldPaths} stroke="#000" strokeWidth="0.1" strokeDasharray="1 0.8" fill="none" />
    </svg>
  );
}

function Sheet({ side, mode }: { side: BrochureSide; mode: Mode }) {
  const panels = BROCHURE_PANELS[side];
  return (
    <section className="sheet" data-side={side}>
      <div className="bleedbox">
        <div className="trim">
          {panels.map((p, i) => {
            const c = CONTENT[p.id];
            const edge = i === 0 ? " panel--first" : i === panels.length - 1 ? " panel--last" : "";
            return (
              <article key={p.id} className={`panel panel--${p.id}${edge}`} data-panel={p.id} style={{ left: `${p.x}mm`, width: `${p.w}mm` }}>
                <div className={`panel__bg ${c.bg}`} />
                {c.decor && <div className="panel__decor">{c.decor}</div>}
                <div className="panel__in">{c.body}</div>
              </article>
            );
          })}
        </div>
      </div>
      {mode === "print" && (
        <>
          <Marks side={side} />
          {/* printer's notes in the slug, each between two marks */}
          <p className="slug-note" style={{ left: `${SLUG + 4}mm` }}>
            Tobla Kitchen tri-fold · {side === "outside" ? "OUTSIDE" : "INSIDE"} · A4 297 × 210 mm + 3 mm bleed
          </p>
          <p className="slug-note" style={{ left: `${SLUG + panels[1].x + 4}mm` }}>
            Roll fold at {panels[1].x} and {panels[2].x} mm (dashed marks) · the {side === "outside" ? "left" : "right"} panel folds in
          </p>
        </>
      )}
    </section>
  );
}

export function Trifold({ mode }: { mode: Mode }) {
  return (
    <div className={`doc doc--${mode}`}>
      <Sheet side="outside" mode={mode} />
      <Sheet side="inside" mode={mode} />
    </div>
  );
}
