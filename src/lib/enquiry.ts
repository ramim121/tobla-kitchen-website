/*
 * The corporate-lunch enquiry (section 8): fields, service areas and validation.
 * Shared by the form (src/components/sections/Enquiry.tsx) and the server (api/enquiry.ts), so both
 * apply exactly the same rules. Keep this file free of browser- or Node-only code.
 */

/** The eight confirmed delivery areas, plus "Other" for enquiries that need a coverage check. */
export const SERVICE_AREAS = [
  "Gulshan",
  "Banani",
  "Niketon",
  "Baridhara",
  "Baridhara DOHS",
  "Mohakhali",
  "Mohakhali DOHS",
  "Tejgaon",
  "Other",
] as const;
export type ServiceArea = (typeof SERVICE_AREAS)[number];

export type EnquiryField = "company" | "person" | "phone" | "location" | "meals" | "start" | "email" | "budget" | "notes";
export const REQUIRED: EnquiryField[] = ["company", "person", "phone", "location", "meals"];

/** What the form sends. Everything arrives as text; `sample` is the "free sample first" box. */
export type EnquiryInput = Partial<Record<EnquiryField, string>> & {
  sample?: boolean;
  lang?: string;
  /** honeypot — people never see it, so it must stay empty */
  website?: string;
  /** milliseconds between the form appearing and being sent (bots are instant) */
  elapsed?: number;
};

export type Enquiry = {
  company: string;
  person: string;
  /** normalised: +8801XXXXXXXXX for mobiles, +880… for landlines */
  phone: string;
  location: ServiceArea;
  meals: number;
  start: string | null; // YYYY-MM-DD
  email: string | null;
  budget: number | null; // Tk per meal
  notes: string | null;
  sample: boolean;
  lang: "bn" | "en";
};

export type EnquiryErrors = Partial<Record<EnquiryField, "required" | "invalid">>;

const LIMITS: Partial<Record<EnquiryField, number>> = { company: 120, person: 80, email: 120, notes: 1000 };
const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** Bangla digits → Latin, so "০১৭১১…" and "৩০০" are accepted. */
export const toLatinDigits = (s: string) => s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));

const clean = (s: unknown) => (typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "");

/** Bangladeshi phone numbers: mobiles 01[3-9]XXXXXXXX, or landlines 0 + 8–10 digits; +88/88 prefix allowed. */
export function normalizePhone(raw: string): string | null {
  let d = toLatinDigits(raw).replace(/[\s\-().]/g, "");
  if (d.startsWith("+")) d = d.slice(1);
  if (d.startsWith("880")) d = d.slice(2); // 8801… → 01…
  if (!/^0\d+$/.test(d)) return null;
  if (d.startsWith("01")) return /^01[3-9]\d{8}$/.test(d) ? `+88${d}` : null;
  return d.length >= 9 && d.length <= 11 ? `+88${d}` : null;
}

/** A whole number from 1 to 100,000 ("1,200" and Bangla digits are fine); no minimum order is implied. */
export function parseCount(raw: string): number | null {
  const d = toLatinDigits(raw).replace(/[,\s]/g, "");
  if (!/^\d{1,6}$/.test(d)) return null;
  const n = Number(d);
  return n >= 1 && n <= 100_000 ? n : null;
}

/** Today's date in Dhaka (UTC+6), as YYYY-MM-DD. */
export function dhakaToday(now = Date.now()): string {
  return new Date(now + 6 * 3600_000).toISOString().slice(0, 10);
}

const FIELDS: EnquiryField[] = ["company", "person", "phone", "location", "meals", "start", "email", "budget", "notes"];

export function validateEnquiry(input: EnquiryInput, now = Date.now()): { ok: true; data: Enquiry } | { ok: false; errors: EnquiryErrors } {
  const v = Object.fromEntries(
    FIELDS.map((k) => {
      const raw = input[k];
      // notes keep their line breaks; every other field is one tidy line
      const text = k === "notes" && typeof raw === "string" ? raw.trim().replace(/\n{3,}/g, "\n\n") : clean(raw);
      return [k, text];
    }),
  ) as Record<EnquiryField, string>;
  const errors: EnquiryErrors = {};

  for (const f of REQUIRED) if (!v[f]) errors[f] = "required";
  for (const [f, max] of Object.entries(LIMITS) as [EnquiryField, number][]) if (v[f].length > max) errors[f] = "invalid";

  const phone = v.phone ? normalizePhone(v.phone) : null;
  if (v.phone && !phone) errors.phone = "invalid";

  const location = SERVICE_AREAS.find((a) => a === v.location);
  if (v.location && !location) errors.location = "invalid";

  const meals = v.meals ? parseCount(v.meals) : null;
  if (v.meals && meals === null) errors.meals = "invalid";

  const budget = v.budget ? parseCount(v.budget) : null;
  if (v.budget && budget === null) errors.budget = "invalid";

  if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) errors.email = "invalid";

  if (v.start) {
    const ok = /^\d{4}-\d{2}-\d{2}$/.test(v.start) && !Number.isNaN(Date.parse(v.start));
    // a day of slack for visitors' clocks; no more than two years ahead
    const earliest = dhakaToday(now - 24 * 3600_000);
    const latest = dhakaToday(now + 730 * 24 * 3600_000);
    if (!ok || v.start < earliest || v.start > latest) errors.start = "invalid";
  }

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    data: {
      company: v.company,
      person: v.person,
      phone: phone!,
      location: location!,
      meals: meals!,
      start: v.start || null,
      email: v.email || null,
      budget,
      notes: v.notes || null,
      sample: input.sample === true,
      lang: input.lang === "en" ? "en" : "bn",
    },
  };
}

/** Bots fill the hidden field or send instantly; they get a quiet "thanks" and nothing is saved. */
export const looksAutomated = (input: EnquiryInput) => Boolean(input.website) || (typeof input.elapsed === "number" && input.elapsed < 2500);
