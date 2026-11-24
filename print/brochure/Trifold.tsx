import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Beef,
  CalendarDays,
  Check,
  ChefHat,
  ClipboardCheck,
  CookingPot,
  Droplet,
  Drumstick,
  Egg,
  Fish,
  GlassWater,
  Globe,
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
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { LogoMark, LogoWordmark } from "../../src/components/brand/Logo";
import { BROCHURE_PANELS, SHEET_MM, type BrochurePanel, type BrochureSide } from "../../src/content/brochure";
import { Skyline } from "./Skyline";

import coverPlate from "./assets/cover-plate.jpg";
import platter from "./assets/platter.jpg";
import kitchen from "./assets/kitchen.jpg";
import chicken from "./assets/chicken.jpg";
import fish from "./assets/fish.jpg";
import vegetables from "./assets/vegetables.jpg";
import qrSvg from "./assets/qr.svg?raw";

export type Mode = "trim" | "print";

const BLEED = 3; // mm, print mode
const SLUG = 12; // mm from the page edge to the trim, print mode

/* ───────────────────────── Building blocks ───────────────────────── */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function Chip({ icon: Icon, round, small }: { icon: LucideIcon; round?: boolean; small?: boolean }) {
  return (
    <span className={`chip${round ? " chip--round" : ""}${small ? " chip--sm" : ""}`}>
      <Icon strokeWidth={1.9} aria-hidden="true" />
    </span>
  );
}

function Row({ icon, title, children }: { icon: LucideIcon; title: string; children: ReactNode }) {
  return (
    <li>
      <Chip icon={icon} />
      <div>
        <p className="item-title">{title}</p>
        <p className="item-text">{children}</p>
      </div>
    </li>
  );
}

/** The hand-drawn orange stroke under the accent words (as under "Consistency matters." on the site). */
function Brush({ children }: { children: ReactNode }) {
  return (
    <span className="brush">
      {children}
      <svg viewBox="0 0 300 16" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 11 C 60 4, 140 3, 297 8" fill="none" stroke="#F36F21" strokeLinecap="round" strokeWidth="4.6" vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  );
}

/* ───────────────────────── Outside ───────────────────────── */

/** Outside left — the flap that folds in: how to get started, the QR code and contact details. */
function PlanPanel() {
  return (
    <>
      <Eyebrow>Get started</Eyebrow>
      <h2 className="title">
        Let&rsquo;s Plan Your
        <br />
        <em>Office Lunch.</em>
      </h2>
      <p className="lead">
        Tell us about your team, location and lunch requirements. We&rsquo;ll share a tailored proposal for your office: menu
        options, pricing and a delivery plan.
      </p>

      <ol className="steps">
        <li>
          <span className="num">01</span>
          <div>
            <p className="item-title">Share your requirements</p>
            <p className="item-text">Daily meal count, office location and start date.</p>
          </div>
        </li>
        <li>
          <span className="num">02</span>
          <div>
            <p className="item-title">Get your proposal</p>
            <p className="item-text">Menus, pricing and delivery, built around your team.</p>
          </div>
        </li>
        <li>
          <span className="num">03</span>
          <div>
            <p className="item-title">Taste, then decide</p>
            <p className="item-text">A free sample at your office before service begins.</p>
          </div>
        </li>
      </ol>

      <div className="qr-card">
        <div className="qr" dangerouslySetInnerHTML={{ __html: qrSvg }} />
        <div>
          <p className="item-title">Request a corporate quote</p>
          <p className="item-text">Scan the code to open our enquiry form.</p>
          <p className="url">
            toblakitchen.com
            <ArrowUpRight strokeWidth={2.2} aria-hidden="true" />
          </p>
        </div>
      </div>

      <p className="label contacts-label">Talk to us directly</p>
      <ul className="contacts">
        <li>
          <Chip icon={Phone} round />
          <div>
            <p className="phone">01711 400 151</p>
            <p className="who">Raihan Mahmud · GM, Business Development</p>
          </div>
        </li>
        <li>
          <Chip icon={MapPin} round />
          <p className="line">17/5 Kunipara, Tejgaon, Dhaka</p>
        </li>
        <li>
          <Chip icon={Globe} round />
          <p className="line">toblakitchen.com</p>
        </li>
      </ul>
    </>
  );
}

/** Outside middle — the back cover: three ways to check us before signing up. */
function DecidePanel() {
  const checks: { icon: LucideIcon; title: string; text: string }[] = [
    {
      icon: ChefHat,
      title: "1. See the Kitchen",
      text: "Visit our Tejgaon kitchen and see for yourself where, and how, your office lunch is cooked.",
    },
    {
      icon: ShieldCheck,
      title: "2. Understand the Standards",
      text: "Learn where every ingredient comes from, how we keep the kitchen hygienic and how our daily quality check works.",
    },
    {
      icon: Soup,
      title: "3. Taste Before You Decide",
      text: "Try a complimentary sample at your office and judge the taste, portion and quality yourself.",
    },
  ];
  return (
    <>
      <Eyebrow>Before you decide</Eyebrow>
      <h2 className="title">
        Don&rsquo;t Just Take
        <br />
        <em>Our Word for It.</em>
      </h2>
      <p className="lead">Your team eats our food every working day, so we&rsquo;d rather earn your trust first.</p>
      <ul className="checks">
        {checks.map((c) => (
          <li key={c.title} className="card">
            <Chip icon={c.icon} />
            <div>
              <p className="item-title">{c.title}</p>
              <p className="item-text">{c.text}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="taste">
        <figure className="taste__photo">
          <img src={platter} alt="Polao with chicken roast, egg, beef and salad on a white plate" />
        </figure>
        <figure className="promise">
          <q>
            Our own team eats the same food we serve you, <em>every single day.</em>
          </q>
          <figcaption className="sign">The Tobla Kitchen promise</figcaption>
        </figure>
      </div>
    </>
  );
}

/** Outside right — the front cover. The plate sits in the panel's decor layer so it can run into the bleed. */
function CoverPanel() {
  return (
    <>
      <div className="lockup">
        <LogoMark className="mark" title="Tobla Kitchen" />
        <LogoWordmark className="word" />
      </div>
      <p className="pill">Corporate catering · Dhaka</p>
      <h1 className="cover-title">
        Corporate Lunch,
        <br />
        <em>
          Professionally
          <br />
          <Brush>Managed.</Brush>
        </em>
      </h1>
      <p className="cover-lead">
        Reliable, hygienic and nutritious lunch for Dhaka&rsquo;s offices, cooked fresh and delivered every working day.
      </p>
      <ul className="cover-points">
        {["Daily quality check", "Up to 5,000 meals a day", "Free sample tasting"].map((p) => (
          <li key={p}>
            <span className="tick">
              <Check strokeWidth={3} aria-hidden="true" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

/**
 * The cover plate, drawn as one SVG in mm: the site's tabla rings, the orange disc offset behind the photo
 * (like the screen-print offset in the logo), a soft shadow and the round photo. It runs off the
 * bottom-right corner into the bleed. One SVG, not stacked boxes: Chromium splits boxes that cross the
 * page edge when printing and drops their rounded corners; an SVG is printed whole.
 */
function CoverPlate() {
  const R = 57; // plate radius, mm
  const S = 2 * R * 1.29; // the rings' box (as on the site: rings 29% wider than the plate)
  const c = S / 2;
  const ring = (f: number) => (f / 200) * S; // TablaRings radii are given on a 200 grid
  const photo = 2 * R * 1.04; // the photo is scaled up a touch so the turned square always fills the circle
  // plate centre on the cover: 62 mm in from the fold, 180 mm down
  const style = { width: `${S}mm`, height: `${S}mm`, left: `${62 - c}mm`, top: `calc(var(--bleed) + ${180 - c}mm)` };
  return (
    <svg className="plate" viewBox={`0 0 ${S} ${S}`} style={style} aria-hidden="true">
      <defs>
        <clipPath id="plate-clip">
          <circle cx={c} cy={c} r={R} />
        </clipPath>
        <radialGradient id="plate-shadow">
          <stop offset="0.8" stopColor="#231F20" stopOpacity="0.32" />
          <stop offset="1" stopColor="#231F20" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={c} cy={c} r={ring(99)} fill="none" stroke="#231F20" strokeOpacity="0.22" strokeWidth="0.33" strokeDasharray="0.45 1.75" strokeLinecap="round" />
      <circle cx={c} cy={c} r={ring(90)} fill="none" stroke="#F36F21" strokeOpacity="0.6" strokeWidth="0.42" />
      <circle cx={c} cy={c} r={ring(81)} fill="none" stroke="#231F20" strokeOpacity="0.1" strokeWidth="0.3" />
      <circle cx={c + 0.034 * 2 * R} cy={c - 0.036 * 2 * R} r={R} fill="#F36F21" />
      <circle cx={c - 1} cy={c + 4.5} r={R + 3} fill="url(#plate-shadow)" />
      <g clipPath="url(#plate-clip)">
        <rect x={c - R} y={c - R} width={2 * R} height={2 * R} fill="#5B5D63" />
        {/* turned so the fish, the rice and the vegetables sit in the part of the plate that stays on the page */}
        <image href={coverPlate} x={c - photo / 2} y={c - photo / 2} width={photo} height={photo} preserveAspectRatio="xMidYMid slice" transform={`rotate(120 ${c} ${c})`} />
      </g>
    </svg>
  );
}

/* ───────────────────────── Inside ───────────────────────── */

/** Inside left — what goes into the food. */
function IngredientsPanel() {
  return (
    <>
      <Eyebrow>Ingredients &amp; sourcing</Eyebrow>
      <h2 className="title">
        Good Food Starts with
        <br />
        <em>Better Ingredients.</em>
      </h2>
      <ul className="rows ingredients">
        <Row icon={Drumstick} title="Antibiotic-free chicken">
          From selected suppliers, including Organik Chicken.
        </Row>
        <Row icon={Egg} title="Omega-3 eggs">
          From our designated supplier.
        </Row>
        <Row icon={Fish} title="Fish & vegetables, bought daily">
          Fresh from the market every day, never from frozen stock.
        </Row>
        <Row icon={Beef} title="Beef & mutton from trusted vendors">
          Only from selected, vetted vendors, never open markets.
        </Row>
        <Row icon={Droplet} title="Branded cooking oil">
          Packaged oil only, and never reused.
        </Row>
        <Row icon={Sprout} title="Whole spices, milled for us">
          No ready-made spice mixes. Whole spices, ground at the mill.
        </Row>
        <Row icon={Wheat} title="Premium Nazirshail rice">
          Long, slender grains of quality rice in every meal.
        </Row>
        <Row icon={GlassWater} title="Filtered water">
          For all cooking, and for washing vegetables.
        </Row>
      </ul>
      <div className="tiles">
        {[
          { src: chicken, label: "Chicken" },
          { src: fish, label: "Fish" },
          { src: vegetables, label: "Vegetables" },
        ].map((t) => (
          <figure key={t.label} className="tile">
            <img src={t.src} alt="" />
            <span>{t.label}</span>
          </figure>
        ))}
      </div>
      <p className="footnote">No artificial colour, ever: the colour in our food comes from the spices.</p>
    </>
  );
}

/** Inside middle — how lunch gets from the kitchen to the office. */
function KitchenPanel() {
  const flow: { icon: LucideIcon; title: string; text: string }[] = [
    { icon: CookingPot, title: "Hygienic kitchen", text: "Sanitised every day; gloves, masks and hairnets on every shift." },
    { icon: ClipboardCheck, title: "Daily taste & quality check", text: "Every batch is tasted and checked before packing." },
    { icon: Package, title: "Safe packaging", text: "Reusable, BPA-free food-grade boxes, replaced every two months." },
    { icon: Truck, title: "Route-planned delivery", text: "At your office within an hour of cooking." },
  ];
  return (
    <>
      <Eyebrow>From our kitchen</Eyebrow>
      <h2 className="title">
        From Kitchen to Office,
        <br />
        <em>with Care.</em>
      </h2>
      <p className="lead">Cooked fresh every day for that day&rsquo;s headcount: never frozen, never carried over to the next day.</p>
      <figure className="photo">
        <img src={kitchen} alt="Cooks in hairnets, masks and gloves preparing lunch boxes in a clean steel kitchen" />
      </figure>
      <ol className="flow">
        {flow.map((f, i) => (
          <li key={f.title}>
            <div className="head">
              <Chip icon={f.icon} small />
              <span className="step">0{i + 1}</span>
            </div>
            <p className="item-title">{f.title}</p>
            <p className="item-text">{f.text}</p>
          </li>
        ))}
      </ol>
      <div className="capacity">
        <Chip icon={Users} round />
        <div>
          <span className="upto">Up to</span>
          <span className="big">5,000</span>
        </div>
        <span className="divider" />
        <p className="what">
          meals a day
          <small>production capacity</small>
        </p>
      </div>
    </>
  );
}

/** Inside right — support, menus and where we deliver. */
function PartnerPanel() {
  const areas = ["Gulshan", "Banani", "Niketon", "Baridhara", "Baridhara DOHS", "Mohakhali", "Mohakhali DOHS", "Tejgaon"];
  return (
    <>
      <Eyebrow>Client support</Eyebrow>
      <h2 className="title">
        A Reliable Partner
        <br />
        <em>for Your Office.</em>
      </h2>
      <ul className="rows partner">
        <Row icon={UserRound} title="Dedicated account manager">
          One named contact for coordination, questions and service changes.
        </Row>
        <li>
          <Chip icon={MessageSquareText} />
          <div>
            <p className="item-title">Feedback &amp; complaint handling</p>
            <p className="item-text">Tell us what went wrong. We find the cause and fix it, quickly.</p>
            <ol className="loop" aria-label="How a complaint is handled">
              {["Report", "Review", "Resolve"].map((s) => (
                <li key={s}>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </li>
        <Row icon={CalendarDays} title="Menu variety & rotation">
          Six complete lunch menus rotate from Saturday to Thursday. Dietary information on request.
        </Row>
      </ul>

      <div className="coverage">
        <svg className="coverage__bg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="band" x1="0" y1="0" x2="0.35" y2="1">
              <stop offset="0" stopColor="#FFEEE2" />
              <stop offset="1" stopColor="#FFF8F3" />
            </linearGradient>
          </defs>
          <path d="M0 9 C 28 1, 62 -1, 100 4 V100 H0 Z" fill="url(#band)" />
          <path d="M54 1.2 C 72 0.4, 88 1.1, 100 3" fill="none" stroke="#F36F21" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <Skyline className="coverage__skyline" />
        <div className="coverage__head">
          <Chip icon={MapPin} />
          <p className="item-title">
            Corporate lunch service
            <br />
            for offices across Dhaka
          </p>
        </div>
        <ul className="areas">
          {areas.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <p className="note">Somewhere else in Dhaka? Ask us, and we&rsquo;ll check coverage.</p>
      </div>
    </>
  );
}

/* ───────────────────────── Sheets ───────────────────────── */

const CONTENT: Record<BrochurePanel["id"], { bg: string; body: ReactNode; decor?: ReactNode }> = {
  plan: { bg: "bg-white", body: <PlanPanel /> },
  decide: { bg: "bg-warm", body: <DecidePanel /> },
  cover: { bg: "bg-white", body: <CoverPanel />, decor: <CoverPlate /> },
  ingredients: { bg: "bg-white", body: <IngredientsPanel /> },
  kitchen: { bg: "bg-linen", body: <KitchenPanel /> },
  partner: { bg: "bg-white", body: <PartnerPanel /> },
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
