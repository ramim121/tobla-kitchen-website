import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ChevronDown, ClipboardList, FileText, Loader2, PhoneCall, Utensils, type LucideIcon } from "lucide-react";

import { SectionHeading } from "../ui/SectionHeading";
import { CONTACT, site } from "../../content/site";
import { dhakaToday, REQUIRED, SERVICE_AREAS, validateEnquiry, type EnquiryErrors, type EnquiryField } from "../../lib/enquiry";
import { onRequestSample } from "../../lib/enquiry-intent";
import { langFor, useLang } from "../../lib/i18n";
import { cx } from "../../lib/cx";

const POINT_ICON: Record<string, LucideIcon> = { share: ClipboardList, discuss: FileText, sample: Utensils };

/** Field order on screen — the first one with a problem gets focus. */
const ORDER: EnquiryField[] = ["company", "person", "phone", "email", "location", "meals", "start", "budget", "notes"];
const EMPTY = Object.fromEntries(ORDER.map((f) => [f, ""])) as Record<EnquiryField, string>;

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; phone: string } | { kind: "failed" };

const INPUT =
  "block h-12 w-full rounded-xl border border-[#d9d9de] bg-paper px-4 text-[16px] text-ink placeholder:text-ink/45 transition-[border-color,box-shadow] duration-200 focus:border-orange focus:outline-none focus:ring-[3px] focus:ring-orange/20 aria-[invalid=true]:border-critical aria-[invalid=true]:focus:ring-critical/15";

/**
 * Section 8 — corporate lunch enquiry. Owner's spec: white, ≤ 1200px, 45% information / 55% form,
 * the form on a #FAF9F6 panel with white fields and an orange button; phones show heading → text →
 * form → process points; no photos, no animation. Rules live in src/lib/enquiry.ts (shared with the
 * server, api/enquiry.ts), which saves the enquiry and notifies the team.
 */
export function Enquiry() {
  const { t, lang } = useLang();
  const e = site.enquiry;
  const id = useId();
  const [values, setValues] = useState(EMPTY);
  const [sample, setSample] = useState(false);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [summary, setSummary] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const shownAt = useRef(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);
  const fields = useRef<Partial<Record<EnquiryField, HTMLElement | null>>>({});
  const doneHeading = useRef<HTMLHeadingElement>(null);

  // every "Request Free Sample" button on the page ticks the sample box
  useEffect(() => onRequestSample(() => setSample(true)), []);
  useEffect(() => {
    if (status.kind === "sent") doneHeading.current?.focus();
  }, [status.kind]);

  const errorsFor = (next: Record<EnquiryField, string>) => {
    const r = validateEnquiry({ ...next, sample });
    return r.ok ? {} : r.errors;
  };
  const change = (f: EnquiryField) => (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [f]: ev.target.value };
    setValues(next);
    if (touched[f]) setErrors((err) => ({ ...err, [f]: errorsFor(next)[f] }));
  };
  const blur = (f: EnquiryField) => () => {
    setTouched((tc) => ({ ...tc, [f]: true }));
    setErrors((err) => ({ ...err, [f]: errorsFor(values)[f] }));
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (status.kind === "sending") return;
    const checked = validateEnquiry({ ...values, sample, lang });
    if (!checked.ok) {
      setErrors(checked.errors);
      setTouched(Object.fromEntries(ORDER.map((f) => [f, true])));
      setSummary(true);
      const first = ORDER.find((f) => checked.errors[f]);
      if (first) fields.current[first]?.focus();
      return;
    }
    setSummary(false);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, sample, lang, website: honeypot.current?.value ?? "", elapsed: Date.now() - shownAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: EnquiryErrors };
      if (res.ok && body.ok) return setStatus({ kind: "sent", phone: values.phone.trim() });
      if (res.status === 422 && body.errors) {
        setErrors(body.errors);
        setSummary(true);
        return setStatus({ kind: "idle" });
      }
      setStatus({ kind: "failed" });
    } catch {
      setStatus({ kind: "failed" });
    }
  };

  const reset = () => {
    setValues(EMPTY);
    setSample(false);
    setErrors({});
    setTouched({});
    setStatus({ kind: "idle" });
    shownAt.current = Date.now();
  };

  /** Common props for a field: ids, a11y wiring, value and handlers. */
  const bind = (f: EnquiryField) => ({
    id: `${id}-${f}`,
    name: f,
    value: values[f],
    onChange: change(f),
    onBlur: blur(f),
    ref: (el: HTMLElement | null) => {
      fields.current[f] = el;
    },
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${id}-${f}-error` : undefined,
    "aria-required": REQUIRED.includes(f) || undefined,
  });

  const field = (f: EnquiryField, control: ReactNode, wide = false) => {
    const label = t(e.fields[f].label);
    return (
      <div className={cx("min-w-0", wide && "sm:col-span-2")}>
        <label htmlFor={`${id}-${f}`} className="flex items-baseline gap-1.5 text-[14px] font-semibold text-ink">
          <span lang={langFor(label)}>{label}</span>
          {REQUIRED.includes(f) ? (
            <span className="text-orange-700" aria-hidden="true">
              *
            </span>
          ) : (
            <span lang={langFor(t(e.optional))} className="text-[12.5px] font-normal text-muted">
              ({t(e.optional)})
            </span>
          )}
        </label>
        <div className="mt-1.5">{control}</div>
        {errors[f] && (
          <p id={`${id}-${f}-error`} className="mt-1.5 flex items-start gap-1.5 text-[13.5px] font-medium text-critical">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t(e.errors[f])}
          </p>
        )}
      </div>
    );
  };

  const ph = (f: EnquiryField) => t(e.fields[f].placeholder);
  /** the form sends the English area name; people see it in their language */
  const areaName = (a: string) => {
    const known = e.areas.find((x) => x.en === a);
    return known ? t(known) : t(e.otherArea);
  };
  const formTitle = t(e.formTitle);

  return (
    // follows the white about section: a hairline at the top, then the usual 48 / 80px padding
    <section id="enquiry" tabIndex={-1} aria-labelledby="enquiry-title" className="relative bg-paper pb-12 outline-none lg:pb-20">
      <div className="mx-auto w-full max-w-[1264px] px-4 sm:px-6 lg:px-8">
        <div className="border-t border-line pt-12 lg:pt-20">
          <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-[45fr_55fr] lg:grid-rows-[auto_1fr] lg:gap-x-14">
            {/* left: heading + paragraph (phones: first) */}
            <SectionHeading still size="md" eyebrow={e.eyebrow} title={e.title} lead={e.lead} titleId="enquiry-title" className="lg:col-start-1 lg:row-start-1" />

            {/* right: the form (phones: second) */}
            <div className="rounded-[24px] bg-linen p-5 ring-1 ring-[#eeebe5] sm:p-8 lg:col-start-2 lg:row-span-2 lg:row-start-1" data-enquiry-panel>
              {status.kind === "sent" ? (
                <div className="flex flex-col items-center py-10 text-center sm:py-14" role="status">
                  <CheckCircle2 className="size-14 text-safe" strokeWidth={1.6} aria-hidden="true" />
                  <h3 ref={doneHeading} tabIndex={-1} className="mt-5 text-[1.4rem] font-semibold text-ink outline-none sm:text-2xl">
                    {t(e.success.title)}
                  </h3>
                  <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">{t(e.success.text).replace("{phone}", status.phone)}</p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-7 inline-flex h-12 items-center rounded-full border border-ink/15 bg-paper px-6 text-[15px] font-semibold text-ink transition-colors hover:border-ink/35"
                  >
                    {t(e.success.again)}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate aria-labelledby={`${id}-title`} data-enquiry-form>
                  <h3 id={`${id}-title`} lang={langFor(formTitle)} className="text-[1.35rem] font-semibold text-ink sm:text-[1.5rem]">
                    {formTitle}
                  </h3>
                  <p lang={langFor(t(e.formSub))} className="mt-1 text-[14.5px] text-muted">
                    {t(e.formSub)}
                  </p>

                  {summary && Object.values(errors).some(Boolean) && (
                    <p role="alert" className="mt-5 flex items-center gap-2 rounded-xl bg-critical/[0.07] px-4 py-3 text-[14.5px] font-medium text-critical">
                      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                      {t(e.fixFields)}
                    </p>
                  )}

                  <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                    {field("company", <input {...bind("company")} type="text" autoComplete="organization" placeholder={ph("company")} maxLength={120} className={INPUT} />, true)}
                    {field("person", <input {...bind("person")} type="text" autoComplete="name" placeholder={ph("person")} maxLength={80} className={INPUT} />, true)}
                    {field("phone", <input {...bind("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder={ph("phone")} maxLength={20} className={INPUT} />)}
                    {field("email", <input {...bind("email")} type="email" inputMode="email" autoComplete="email" placeholder={ph("email")} maxLength={120} className={INPUT} />)}
                    {field(
                      "location",
                      <div className="relative">
                        <select {...bind("location")} className={cx(INPUT, "appearance-none pr-11", !values.location && "text-ink/45")}>
                          <option value="" disabled>
                            {ph("location")}
                          </option>
                          {SERVICE_AREAS.map((a) => (
                            <option key={a} value={a} className="text-ink">
                              {areaName(a)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-ink/60" aria-hidden="true" />
                      </div>,
                    )}
                    {field("meals", <input {...bind("meals")} type="text" inputMode="numeric" autoComplete="off" placeholder={ph("meals")} maxLength={7} className={INPUT} />)}
                    {field("start", <input {...bind("start")} type="date" min={dhakaToday()} className={cx(INPUT, !values.start && "text-ink/45")} />)}
                    {field(
                      "budget",
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] font-medium text-ink/60" aria-hidden="true">
                          {t(e.currency)}
                        </span>
                        <input {...bind("budget")} type="text" inputMode="numeric" autoComplete="off" placeholder={ph("budget")} maxLength={7} className={cx(INPUT, "pl-11")} />
                      </div>,
                    )}
                    {field(
                      "notes",
                      <textarea {...bind("notes")} rows={3} placeholder={ph("notes")} maxLength={1000} className={cx(INPUT, "h-auto min-h-[96px] resize-y py-3 leading-relaxed")} />,
                      true,
                    )}

                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl bg-paper px-4 py-2.5 text-[15px] font-medium text-ink ring-1 ring-[#e6e4df] sm:col-span-2">
                      <input
                        type="checkbox"
                        name="sample"
                        checked={sample}
                        onChange={(ev) => setSample(ev.target.checked)}
                        className="size-5 shrink-0 accent-[#F36F21]"
                        data-sample-box
                      />
                      {t(e.sample)}
                    </label>

                    {/* people never see this; bots fill it in */}
                    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                      <label>
                        Website
                        <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" />
                      </label>
                    </div>
                  </div>

                  {status.kind === "failed" && (
                    <div role="alert" className="mt-6 rounded-xl bg-paper p-4 ring-1 ring-critical/30">
                      <p className="flex items-center gap-2 text-[15px] font-semibold text-critical">
                        <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                        {t(e.failure.title)}
                      </p>
                      <p className="mt-1 text-[14.5px] text-muted">{t(e.failure.text)}</p>
                      <a
                        href={CONTACT.phoneHref}
                        className="mt-3 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14.5px] font-semibold text-paper transition-colors hover:bg-ink-2"
                      >
                        <PhoneCall className="size-4" aria-hidden="true" />
                        {t(e.failure.call)}
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status.kind === "sending"}
                    lang={langFor(t(e.submit))}
                    className="group mt-6 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-xl bg-orange px-6 text-[16.5px] font-semibold text-ink shadow-[0_16px_32px_-18px_rgba(243,111,33,0.9)] transition-colors duration-300 hover:bg-[#e8641a] disabled:cursor-wait disabled:opacity-80"
                  >
                    {status.kind === "sending" ? (
                      <>
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                        {t(e.sending)}
                      </>
                    ) : (
                      <>
                        {t(e.submit)}
                        <ArrowRight className="size-[18px] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[13px] text-muted">{t(e.privacy)}</p>
                </form>
              )}
            </div>

            {/* left: how it works (phones: after the form) */}
            <ul className="space-y-5 border-t border-line pt-8 lg:col-start-1 lg:row-start-2 lg:self-start" data-enquiry-points>
              {e.points.map((p) => {
                const Icon = POINT_ICON[p.key] ?? ClipboardList;
                const title = t(p.title);
                return (
                  <li key={p.key} className="flex items-start gap-4">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-orange-600" aria-hidden="true">
                      <Icon className="size-5" strokeWidth={1.9} />
                    </span>
                    <div>
                      <h3 lang={langFor(title)} className="font-sans text-[16.5px] font-semibold text-ink">
                        {title}
                      </h3>
                      <p lang={langFor(t(p.text))} className="mt-0.5 text-[14.5px] text-muted">
                        {t(p.text)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
