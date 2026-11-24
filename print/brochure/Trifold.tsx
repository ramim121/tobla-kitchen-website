import type { ReactNode } from "react";
import {
  Beef,
  CalendarDays,
  ChefHat,
  ClipboardCheck,
  CookingPot,
  Droplet,
  Drumstick,
  Egg,
  Globe,
  LeafyGreen,
  MapPin,
  MessageSquareText,
  Package,
  Phone,
  ShieldCheck,
  Soup,
  Sprout,
  Truck,
  UserRound,
  Users,
  type LucideIcon,
} from "lucide-react";

import { LogoMark, LogoWordmark } from "../../src/components/brand/Logo";
import { BROCHURE_PANELS, SHEET_MM, type BrochurePanel, type BrochureSide } from "../../src/content/brochure";
import { Skyline } from "./Skyline";

import coverPlate from "./assets/cover-plate.jpg";
import kitchen from "./assets/kitchen.jpg";
import ingredients from "./assets/ingredients.jpg";
import qrSvg from "./assets/qr.svg?raw";

/*
 * The owner's first concept, panel for panel: outside — cream "Let's plan", solid orange "Before you
 * decide", the dark cover; inside — three cream panels with an orange bar over each heading, the
 * ingredients photo along the bottom of the first and a dark city band at the foot of the last.
 * Colours are the logo's: orange #F36F21 and black #231F20, with a warm cream.
 */

export type Mode = "trim" | "print";

const BLEED = 3; // mm, print mode
const SLUG = 12; // mm from the page edge to the trim, print mode

/* ───────────────────────── Building blocks ───────────────────────── */

function Icon({ icon: I, className }: { icon: LucideIcon; className: string }) {
  return (
    <span className={className}>
      <I strokeWidth={1.7} aria-hidden="true" />
    </span>
  );
}

/** Heading with the accent line in orange: <Title lead="Good Food Starts with" accent="Better Ingredients" /> */
function Title({ lead, accent, className = "title" }: { lead: ReactNode; accent: ReactNode; className?: string }) {
  return (
    <h2 className={className}>
      {lead}
      <br />
      <em>{accent}</em>
    </h2>
  );
}

/* ───────────────────────── Outside ───────────────────────── */

/** Outside left — the flap that folds in: plan your office lunch, the QR code and contact details. */
function PlanPanel() {
  return (
    <>
      <Title lead={<>Let&rsquo;s Plan Your</>} accent="Office Lunch" />
      <p className="body">
        Tell us about your team, location and lunch requirements. We&rsquo;ll share a tailored service proposal for your office:
        menu options, pricing and a delivery plan.
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
      <circle cx="112" cy="236" r="58" fill="#EBDCC9" />
    </svg>
  );
}

/** Outside middle — the back panel, solid orange: three ways to check us before signing up. */
function DecidePanel() {
  const checks: { icon: LucideIcon; title: ReactNode; text: string }[] = [
    { icon: ChefHat, title: "See the Kitchen", text: "Visit our Tejgaon kitchen and see for yourself how we work." },
    {
      icon: ShieldCheck,
      title: (
        <>
          Understand
          <br />
          the Standards
        </>
      ),
      text: "From ingredient sourcing and hygiene to our daily quality control.",
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
      <h2 className="title title--white">
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
      <p className="promise">
        Our own team eats the same food
        <br />
        we serve you, every single day.
      </p>
    </>
  );
}

function DecideDecor() {
  return (
    <svg className="decor-full" viewBox="0 0 100 216" preserveAspectRatio="none" aria-hidden="true">
      {/* a lighter and a deeper orange curve along the foot of the panel */}
      <path d="M0 176 C 30 160, 70 170, 100 150 V216 H0 Z" fill="#FFFFFF" fillOpacity="0.09" />
      <path d="M0 196 C 35 182, 72 196, 100 178 V216 H0 Z" fill="#C9520F" fillOpacity="0.22" />
    </svg>
  );
}

/** Outside right — the front cover, dark. The plate sits in the decor layer so it can run into the bleed. */
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
      <p className="cover-lead">Reliable, hygienic and nutritious lunch service for your office, cooked fresh every working day.</p>
    </>
  );
}

/**
 * The cover plate, drawn as one SVG in mm: the site's tabla rings, the orange disc offset behind the photo
 * (like the screen-print offset in the logo) and the round photo. It runs off the bottom-right corner into
 * the bleed. One SVG, not stacked boxes: Chromium splits boxes that cross the page edge when printing and
 * drops their rounded corners; an SVG is printed whole.
 */
function CoverPlate() {
  const R = 58; // plate radius, mm
  const S = 2 * R * 1.29; // the rings' box (as on the site: rings 29% wider than the plate)
  const c = S / 2;
  const ring = (f: number) => (f / 200) * S; // TablaRings radii are given on a 200 grid
  const photo = 2 * R * 1.04; // scaled up a touch so the turned square always fills the circle
  // plate centre on the cover: 60 mm in from the fold, 172 mm down
  const style = { width: `${S}mm`, height: `${S}mm`, left: `${60 - c}mm`, top: `calc(var(--bleed) + ${172 - c}mm)` };
  return (
    <svg className="plate" viewBox={`0 0 ${S} ${S}`} style={style} aria-hidden="true">
      <defs>
        <clipPath id="plate-clip">
          <circle cx={c} cy={c} r={R} />
        </clipPath>
        <radialGradient id="plate-shadow">
          <stop offset="0.8" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={ring(99)} fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="0.33" strokeDasharray="0.45 1.75" strokeLinecap="round" />
      <circle cx={c} cy={c} r={ring(90)} fill="none" stroke="#F36F21" strokeOpacity="0.85" strokeWidth="0.45" />
      <circle cx={c} cy={c} r={ring(81)} fill="none" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="0.3" />
      <circle cx={c + 0.05 * 2 * R} cy={c - 0.05 * 2 * R} r={R} fill="#F36F21" />
      <circle cx={c - 1} cy={c + 4} r={R + 3.5} fill="url(#plate-shadow)" />
      <g clipPath="url(#plate-clip)">
        <rect x={c - R} y={c - R} width={2 * R} height={2 * R} fill="#5B5D63" />
        {/* turned so the fish, the rice and the vegetables sit in the part of the plate that stays on the page */}
        <image href={coverPlate} x={c - photo / 2} y={c - photo / 2} width={photo} height={photo} preserveAspectRatio="xMidYMid slice" transform={`rotate(120 ${c} ${c})`} />
      </g>
    </svg>
  );
}

/* ───────────────────────── Inside ───────────────────────── */

/** Inside left — what goes into the food, over a photo of fresh ingredients. */
function IngredientsPanel() {
  const items: { icon: LucideIcon; lead: string; rest: ReactNode }[] = [
    { icon: Drumstick, lead: "Antibiotic-free chicken", rest: "from trusted sources, including Organik Chicken" },
    { icon: Egg, lead: "Omega-3 eggs", rest: "from our designated supplier" },
    { icon: LeafyGreen, lead: "Daily sourced", rest: "fresh vegetables and fish, never frozen" },
    { icon: Beef, lead: "Selected meat vendors", rest: "for beef and mutton, never open markets" },
    { icon: Droplet, lead: "Branded, packaged", rest: "cooking oil, never reused" },
    {
      icon: Sprout,
      lead: "Whole spices,",
      rest: (
        <>
          externally milled: no <span className="nowrap">ready-made</span> mixes
        </>
      ),
    },
  ];
  return (
    <>
      <span className="bar" />
      <Title lead="Good Food Starts with" accent="Better Ingredients" />
      <ul className="rows">
        {items.map((it) => (
          <li key={it.lead}>
            <Icon icon={it.icon} className="circle" />
            <p className="row-text">
              <strong>{it.lead}</strong> {it.rest}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function IngredientsDecor() {
  return (
    <div className="produce">
      <svg width="0" height="0" aria-hidden="true">
        <clipPath id="produce-clip" clipPathUnits="objectBoundingBox">
          <path d="M0 0.04 C 0.3 -0.03, 0.62 0.12, 1 0.36 V1 H0 Z" />
        </clipPath>
      </svg>
      <img src={ingredients} alt="Fresh tomatoes, chillies, greens, cauliflower, aubergine, chicken, eggs and whole spices" />
    </div>
  );
}

/** Inside middle — how lunch gets from the kitchen to the office. */
function KitchenPanel() {
  const flow: { icon: LucideIcon; label: ReactNode }[] = [
    { icon: CookingPot, label: <>Hygienic kitchen operations</> },
    { icon: ClipboardCheck, label: <>Daily taste &amp; quality check</> },
    { icon: Package, label: <>Safe &amp; organized packaging</> },
    { icon: Truck, label: <>Route-planned, on-time delivery</> },
  ];
  return (
    <>
      <span className="bar" />
      <Title lead="From Kitchen to Office," accent="with Care" />
      <p className="body body--tight">
        Cooked fresh every day for that day&rsquo;s headcount, tasted, packed and at your office within an hour.
      </p>
      <figure className="photo">
        <img src={kitchen} alt="Cooks in hairnets, masks and gloves preparing lunch boxes in a clean steel kitchen" />
      </figure>
      <ul className="flow">
        {flow.map((f, i) => (
          <li key={i}>
            <Icon icon={f.icon} className="line-icon" />
            <p>{f.label}</p>
          </li>
        ))}
      </ul>
      <div className="capacity">
        <Icon icon={Users} className="circle circle--lg" />
        <div>
          <span className="upto">Up to</span>
          <span className="big">5,000</span>
        </div>
        <span className="divider" />
        <p className="what">
          Meals per day
          <br />
          production capacity
        </p>
      </div>
    </>
  );
}

/** Inside right — support and menus, then the dark band: where we deliver. */
function PartnerPanel() {
  return (
    <>
      <span className="bar" />
      <Title lead="A Reliable Partner" accent="for Your Office" />
      <ul className="rows rows--partner">
        {[
          {
            icon: UserRound,
            title: "Dedicated Account Manager",
            text: (
              <>
                A single point of contact for smooth, <span className="nowrap">day-to-day</span> service.
              </>
            ),
          },
          { icon: MessageSquareText, title: "Feedback & Complaint Handling", text: "We listen, review the cause and take corrective action quickly." },
          { icon: CalendarDays, title: "Menu Variety & Rotation", text: "Six balanced lunch menus rotate through the week to keep your team satisfied." },
        ].map((r) => (
          <li key={r.title}>
            <Icon icon={r.icon} className="circle circle--md" />
            <div>
              <p className="row-title">{r.title}</p>
              <p className="row-desc">{r.text}</p>
            </div>
          </li>
        ))}
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
          Gulshan · Banani · Niketon · Baridhara · Baridhara DOHS · Mohakhali · Mohakhali DOHS · Tejgaon
        </p>
      </div>
    </>
  );
}

function PartnerDecor() {
  return (
    <div className="band-bg">
      <svg className="band-bg__shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {/* an orange sweep over the right of the band's curved top edge */}
        <path d="M30 13 C 55 1, 80 -2, 100 0 V 12 C 80 9, 58 12, 34 20 Z" fill="#F36F21" />
        <path d="M0 30 C 26 12, 60 8, 100 10 V100 H0 Z" fill="#231F20" />
      </svg>
      <Skyline className="band-bg__skyline" tone="dark" />
    </div>
  );
}

/* ───────────────────────── Sheets ───────────────────────── */

const CONTENT: Record<BrochurePanel["id"], { bg: string; body: ReactNode; decor?: ReactNode }> = {
  plan: { bg: "bg-cream", body: <PlanPanel />, decor: <PlanDecor /> },
  decide: { bg: "bg-orange", body: <DecidePanel />, decor: <DecideDecor /> },
  cover: { bg: "bg-ink", body: <CoverPanel />, decor: <CoverPlate /> },
  ingredients: { bg: "bg-cream", body: <IngredientsPanel />, decor: <IngredientsDecor /> },
  kitchen: { bg: "bg-cream-light", body: <KitchenPanel /> },
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
