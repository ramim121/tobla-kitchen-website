/*
 * POST /api/enquiry — the corporate-lunch enquiry form (section 8).
 *
 * Checks the enquiry with the same rules as the form (src/lib/enquiry.ts), then:
 *   1. saves it as a JSON file in the project's private Vercel Blob store (enquiries/YYYY-MM/…), and
 *   2. notifies the team on every channel that is configured (Vercel → Project → Settings → Environment
 *      Variables; redeploy after adding one):
 *        TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   message to a Telegram chat or group
 *        RESEND_API_KEY + LEAD_EMAIL_TO           email via Resend (LEAD_EMAIL_FROM optional, comma-separated TO)
 *        LEAD_WEBHOOK_URL                         JSON POST to any CRM / Google Sheets script / Zapier / Make
 * It answers OK when at least one of these took the enquiry; otherwise 503, and the form asks the visitor
 * to call instead, so no enquiry is silently lost.
 *
 * GET /api/enquiry                        → { ready } (is anywhere configured to receive enquiries?)
 * GET /api/enquiry?export=csv&key=…        → every saved enquiry as a CSV file, when LEADS_KEY is set
 */

import { get, list, put } from "@vercel/blob";

import { looksAutomated, validateEnquiry, type Enquiry, type EnquiryInput } from "../src/lib/enquiry.js";

declare const process: { env: Record<string, string | undefined> };
const env = (key: string) => process.env[key]?.trim() || undefined;

type Lead = Enquiry & { id: string; receivedAt: string };

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });
const TIMEOUT = 8000;

const hasBlob = () => Boolean(env("BLOB_READ_WRITE_TOKEN") || env("BLOB_STORE_ID"));

function channels() {
  const send: Array<[string, (lead: Lead) => Promise<unknown>]> = [];
  if (hasBlob()) send.push(["blob", saveToBlob]);
  if (env("TELEGRAM_BOT_TOKEN") && env("TELEGRAM_CHAT_ID")) send.push(["telegram", sendTelegram]);
  if (env("RESEND_API_KEY") && env("LEAD_EMAIL_TO")) send.push(["email", sendEmail]);
  if (env("LEAD_WEBHOOK_URL")) send.push(["webhook", sendWebhook]);
  return send;
}

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > 16_000) return json({ ok: false, error: "too-large" }, 413);
  let input: EnquiryInput;
  try {
    input = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: "bad-json" }, 400);
  }
  if (!input || typeof input !== "object") return json({ ok: false, error: "bad-json" }, 400);

  // bots get the same "thanks" a person would, and nothing is stored or sent
  if (looksAutomated(input)) return json({ ok: true });

  const checked = validateEnquiry(input);
  if (!checked.ok) return json({ ok: false, error: "invalid", errors: checked.errors }, 422);

  const receivedAt = new Date().toISOString();
  const lead: Lead = { id: `${receivedAt.replace(/\D/g, "").slice(0, 14)}-${crypto.randomUUID().slice(0, 8)}`, receivedAt, ...checked.data };

  const send = channels();
  if (!send.length) {
    console.error("enquiry: nowhere to send it — connect a Blob store or set a notification channel");
    return json({ ok: false, error: "unavailable" }, 503);
  }
  const results = await Promise.allSettled(send.map(([, fn]) => fn(lead)));
  results.forEach((r, i) => r.status === "rejected" && console.error(`enquiry: ${send[i][0]} failed`, r.reason));
  if (!results.some((r) => r.status === "fulfilled")) return json({ ok: false, error: "unavailable" }, 503);

  return json({ ok: true, id: lead.id });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("export") !== "csv") return json({ ready: channels().length > 0 });

  const key = env("LEADS_KEY");
  if (!key || !hasBlob() || !sameSecret(url.searchParams.get("key") ?? "", key)) return json({ ok: false }, 404);
  const leads = await readLeads();
  return new Response(toCsv(leads), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="tobla-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      "cache-control": "no-store",
    },
  });
}

// ── destinations ──

async function saveToBlob(lead: Lead) {
  const slug = lead.company.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "enquiry";
  await put(`enquiries/${lead.receivedAt.slice(0, 7)}/${lead.receivedAt.replace(/[:.]/g, "-")}-${slug}.json`, JSON.stringify(lead, null, 2), {
    access: "private",
    addRandomSuffix: true,
    contentType: "application/json",
  });
}

function summary(lead: Lead) {
  const lines = [
    "New corporate lunch enquiry",
    "",
    `Company: ${lead.company}`,
    `Contact: ${lead.person} · ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    `Area: ${lead.location}${lead.location === "Other" ? " (coverage check needed)" : ""}`,
    `Meals a day: ${lead.meals}`,
    lead.start && `Preferred start: ${lead.start}`,
    lead.budget && `Budget: Tk ${lead.budget} per meal`,
    `Free sample first: ${lead.sample ? "yes" : "no"}`,
    lead.notes && `Notes: ${lead.notes}`,
    "",
    `Received ${lead.receivedAt} · ${lead.lang === "bn" ? "Bangla" : "English"} site · ${lead.id}`,
  ];
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

async function ensureOk(res: Response) {
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 200)}`);
}

async function sendTelegram(lead: Lead) {
  const res = await fetch(`https://api.telegram.org/bot${env("TELEGRAM_BOT_TOKEN")}/sendMessage`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ chat_id: env("TELEGRAM_CHAT_ID"), text: summary(lead), disable_web_page_preview: true }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  await ensureOk(res);
}

async function sendEmail(lead: Lead) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "content-type": "application/json", authorization: `Bearer ${env("RESEND_API_KEY")}` },
    body: JSON.stringify({
      from: env("LEAD_EMAIL_FROM") ?? "Tobla Kitchen website <onboarding@resend.dev>",
      to: env("LEAD_EMAIL_TO")!.split(",").map((s) => s.trim()).filter(Boolean),
      subject: `Lunch enquiry: ${lead.company} (${lead.meals} meals/day)`,
      text: summary(lead),
      ...(lead.email ? { reply_to: lead.email } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  await ensureOk(res);
}

async function sendWebhook(lead: Lead) {
  const res = await fetch(env("LEAD_WEBHOOK_URL")!, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(TIMEOUT),
  });
  await ensureOk(res);
}

// ── CSV export ──

async function readLeads(): Promise<Lead[]> {
  const files: string[] = [];
  let cursor: string | undefined;
  do {
    const page = await list({ prefix: "enquiries/", cursor, limit: 1000 });
    files.push(...page.blobs.map((b) => b.pathname));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor && files.length < 5000);

  const leads = await Promise.all(
    files.map(async (pathname) => {
      const file = await get(pathname, { access: "private" });
      if (!file || file.statusCode !== 200) return null;
      try {
        return JSON.parse(await new Response(file.stream).text()) as Lead;
      } catch {
        return null;
      }
    }),
  );
  return leads.filter((l): l is Lead => l !== null).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

const COLUMNS: Array<keyof Lead> = ["receivedAt", "company", "person", "phone", "email", "location", "meals", "start", "budget", "sample", "notes", "lang", "id"];

function toCsv(leads: Lead[]) {
  const cell = (v: unknown) => {
    const s = v === null || v === undefined ? "" : String(v);
    // quote everything; neutralise leading = + - @ so spreadsheets don't run it as a formula
    return `"${(/^[=+\-@]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
  };
  // BOM so Excel opens Bangla text correctly
  return "﻿" + [COLUMNS.join(","), ...leads.map((l) => COLUMNS.map((c) => cell(l[c])).join(","))].join("\r\n");
}

function sameSecret(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
