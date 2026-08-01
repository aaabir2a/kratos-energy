"use client";

/**
 * Shared lead-capture form card. Renders the CRM-managed form
 * (GET /public/lead-form) when one is configured, otherwise falls back to a
 * built-in static form. Submits to POST /leads/submit. Used by the homepage
 * QuoteCTA and the /contact page.
 */
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import {
  submitLead,
  ApiError,
  type LeadSubmission,
  type LeadFormField,
} from "@/lib/api";
import { useContentStore } from "@/lib/store";

/** field_name values that map to first-class lead columns; everything else on
 *  the CRM form goes into `customFields`. */
const KNOWN_LEAD_KEYS = new Set([
  "firstName",
  "lastName",
  "email",
  "phone",
  "suburb",
  "state",
  "postcode",
  "message",
  "consentMarketing",
]);

/** Pull `{ field, message }[]` out of a 400 validation error. */
function fieldErrorsFrom(err: unknown): Record<string, string> {
  if (!(err instanceof ApiError)) return {};
  const details = err.details as { fields?: { field: string; message: string }[] } | undefined;
  const out: Record<string, string> = {};
  for (const f of details?.fields ?? []) out[f.field] = f.message;
  return out;
}

/** Pull UTM / click-id attribution off the current URL for lead source. */
function attribution() {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const pick = (k: string) => q.get(k) || undefined;
  return {
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    gclid: pick("gclid"),
    fbclid: pick("fbclid"),
    referrerUrl: document.referrer || undefined,
  };
}

const inputClass =
  "w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none";

/** Renders one CRM-defined field by its `type`. */
function Field({ field, error }: { field: LeadFormField; error?: string }) {
  const base = `${inputClass}${error ? " border-red-400" : ""}`;
  const ph = field.placeholder || field.label;
  const req = field.required;
  const common = {
    name: field.field_name,
    id: field.field_name,
    required: req,
    "aria-required": req,
    "aria-invalid": error ? true : undefined,
    className: base,
  } as const;

  // Checkbox owns its own label layout.
  if (field.type === "checkbox") {
    return (
      <label className="flex items-start gap-2.5 font-body text-[14px] text-ink">
        <input
          type="checkbox"
          name={field.field_name}
          required={req}
          className="mt-1 h-4 w-4 flex-none accent-green-500"
        />
        <span>
          {field.label}
          {req && <span className="text-green-600"> *</span>}
          {field.help_text && (
            <span className="block font-body text-xs text-ash-500">{field.help_text}</span>
          )}
          {error && <span className="block font-body text-xs text-red-600">{error}</span>}
        </span>
      </label>
    );
  }

  let control: ReactNode;
  switch (field.type) {
    case "textarea":
      control = <textarea {...common} placeholder={ph} rows={4} />;
      break;
    case "select":
      control = (
        <select {...common} defaultValue="">
          <option value="" disabled>
            {ph}
          </option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      );
      break;
    case "multiselect":
      control = (
        <select {...common} multiple className={`${base} min-h-[120px]`}>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
      break;
    case "radio":
      control = (
        <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
          {field.options?.map((o, i) => (
            <label
              key={o}
              className="inline-flex items-center gap-2 font-body text-[14.5px] text-ink"
            >
              <input
                type="radio"
                name={field.field_name}
                value={o}
                required={req && i === 0}
                className="h-4 w-4 accent-green-500"
              />
              {o}
            </label>
          ))}
        </div>
      );
      break;
    case "number":
      control = (
        <input
          {...common}
          type="number"
          placeholder={ph}
          min={field.validation?.min}
          max={field.validation?.max}
        />
      );
      break;
    case "email":
      control = <input {...common} type="email" placeholder={ph} />;
      break;
    case "phone":
      control = <input {...common} type="tel" placeholder={ph} />;
      break;
    case "date":
      control = <input {...common} type="date" />;
      break;
    default:
      control = (
        <input {...common} type="text" placeholder={ph} pattern={field.validation?.pattern} />
      );
  }

  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-display text-[13px] font-semibold text-navy-700">
        {field.label}
        {req && <span className="text-green-600"> *</span>}
      </span>
      {control}
      {field.help_text && (
        <span className="font-body text-xs text-ash-500">{field.help_text}</span>
      )}
      {error && <span className="font-body text-xs text-red-600">{error}</span>}
    </label>
  );
}

export function LeadForm({
  formId,
  staticTitle = "Get Your Free Quote",
  staticSubmitLabel = "Get My Free Quote",
  successNote = "Thanks. A Kratos Energy specialist will call you within one business day with your tailored quote.",
  className = "rounded-xl bg-white p-[30px] shadow-lg",
}: {
  formId?: string;
  staticTitle?: string;
  staticSubmitLabel?: string;
  successNote?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const { status: formStatus, data: schema } = useContentStore((s) => s.leadForm);
  const loadLeadForm = useContentStore((s) => s.loadLeadForm);

  useEffect(() => {
    loadLeadForm(formId);
  }, [loadLeadForm, formId]);

  // Use the CRM-managed form once it's fetched and configured; otherwise the
  // built-in static form keeps working (slow API / none configured / error).
  const useDynamic = formStatus === "ready" && !!schema && schema.fieldsSchema.length > 0;
  const fields = useDynamic
    ? [...schema.fieldsSchema].sort((a, b) => a.order - b.order)
    : [];

  /** Submit the CRM-defined schema: coerce each field by type, then split into
   *  first-class lead columns vs. customFields. */
  async function handleDynamicSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError(null);
    setFieldErrors({});

    const fd = new FormData(e.currentTarget);
    // Honeypot: only bail when a real string was typed. `.trim()` guards against
    // password managers autofilling the hidden field with whitespace.
    if (String(fd.get("website_spam") ?? "").trim()) {
      setSent(true);
      return;
    }

    const top: Record<string, unknown> = {};
    const custom: Record<string, unknown> = {};

    for (const field of fields) {
      const name = field.field_name;
      const label = (field.label || "").toLowerCase();
      let value: unknown;
      switch (field.type) {
        case "multiselect":
          value = fd.getAll(name).map(String);
          if ((value as string[]).length === 0) value = undefined;
          break;
        case "checkbox":
          value = fd.get(name) != null;
          break;
        case "number": {
          const raw = fd.get(name);
          value = raw === null || raw === "" ? undefined : Number(raw);
          break;
        }
        default: {
          const raw = String(fd.get(name) ?? "").trim();
          value = raw === "" ? undefined : raw;
        }
      }
      if (value === undefined) continue;

      // Fields keyed by a first-class column name go straight to the lead.
      if (KNOWN_LEAD_KEYS.has(name)) {
        top[name] = value;
        continue;
      }

      // Schema-declared mapping (maps_to) wins over heuristics.
      if (field.maps_to && KNOWN_LEAD_KEYS.has(field.maps_to) && top[field.maps_to] === undefined) {
        top[field.maps_to] = value;
        custom[name] = value;
        continue;
      }

      // Otherwise keep the raw value in customFields (the CRM validates the
      // schema by field_name) AND mirror common contact fields onto the
      // first-class lead columns by type/label so the lead is actually usable.
      custom[name] = value;
      if (typeof value === "string") {
        if (field.type === "email" && !top.email) top.email = value;
        else if (field.type === "phone" && !top.phone) top.phone = value;
        else if (
          field.type === "text" &&
          !top.firstName &&
          /\b(first\s*name|full\s*name|your\s*name|name)\b/.test(label)
        ) {
          const [first, ...rest] = value.split(/\s+/);
          top.firstName = first;
          if (rest.length) top.lastName = rest.join(" ");
        }
      }
    }

    // firstName is required by the API — derive a fallback if the form has no
    // name field, so a valid submission is never blocked client-side.
    if (!top.firstName) {
      const email = typeof top.email === "string" ? top.email : "";
      top.firstName = (email && email.split("@")[0]) || "Website enquiry";
    }

    if (Object.keys(custom).length > 0) top.customFields = custom;

    setSending(true);
    try {
      await submitLead({
        ...(top as unknown as LeadSubmission),
        customLeadFormId: formId,
        ...attribution(),
      });
      setSent(true);
    } catch (err) {
      const fe = fieldErrorsFrom(err);
      if (Object.keys(fe).length > 0) setFieldErrors(fe);
      setError(
        err instanceof ApiError && err.code === "BAD_REQUEST"
          ? "Please check the highlighted fields and try again."
          : err instanceof ApiError && err.code === "NETWORK"
            ? err.message
            : "Sorry — we couldn't send that just now. Please try again or call us.",
      );
    } finally {
      setSending(false);
    }
  }

  async function handleStaticSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError(null);

    const fd = new FormData(e.currentTarget);
    // Honeypot — bots fill this; humans never see it. Trim guards autofill.
    if (String(fd.get("website_spam") ?? "").trim()) {
      setSent(true);
      return;
    }

    const bill = String(fd.get("bill") || "");
    setSending(true);
    try {
      await submitLead({
        firstName: String(fd.get("firstName") || "").trim(),
        lastName: String(fd.get("lastName") || "").trim() || undefined,
        email: String(fd.get("email") || "").trim() || undefined,
        phone: String(fd.get("phone") || "").trim() || undefined,
        suburb: String(fd.get("suburb") || "").trim() || undefined,
        message: bill ? `Monthly electricity bill: ${bill}` : undefined,
        customFields: bill ? { monthly_bill: bill } : undefined,
        consentMarketing: true,
        ...attribution(),
      });
      setSent(true);
    } catch {
      setError(
        "Sorry — we couldn't send that just now. Please try again or call us.",
      );
    } finally {
      setSending(false);
    }
  }

  const honeypot = (
    <input
      type="text"
      name="website_spam"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );

  const secureNote = (
    <p className="mt-3.5 text-center font-body text-xs text-ash-500">
      <Icon name="shield" size={13} stroke={2} className="-mb-0.5 mr-1 inline-block" />
      Your information is 100% secure and never shared.
    </p>
  );

  return (
    <div className={className}>
      {sent ? (
        <div className="px-2.5 py-[30px] text-center">
          <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
            <Icon name="check" size={34} stroke={3} />
          </span>
          <h3 className="mb-2 font-display text-2xl font-extrabold text-navy-700">
            You&rsquo;re all set! 🌱
          </h3>
          <p className="mb-[22px] font-body text-base leading-relaxed text-ash-700">
            {successNote}
          </p>
          <Button variant="ghost" size="md" onClick={() => setSent(false)}>
            Submit another
          </Button>
        </div>
      ) : useDynamic ? (
        <form onSubmit={handleDynamicSubmit} noValidate>
          <h3 className="mb-[18px] font-display text-[21px] font-bold text-navy-700">
            {schema.formTitle || staticTitle}
          </h3>
          {honeypot}
          <div className="flex flex-col gap-4">
            {fields.map((f) => (
              <Field key={f.field_name} field={f} error={fieldErrors[f.field_name]} />
            ))}
          </div>
          {error && (
            <p className="mt-4 rounded-md bg-red-50 px-3.5 py-2.5 font-body text-[13.5px] text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={sending ? undefined : "arrow"}
            fullWidth
            disabled={sending}
            className={`mt-4${sending ? " opacity-70" : ""}`}
          >
            {sending ? "Sending…" : schema.submitButtonText || staticSubmitLabel}
          </Button>
          {secureNote}
        </form>
      ) : (
        <form onSubmit={handleStaticSubmit} noValidate>
          <h3 className="mb-[18px] font-display text-[21px] font-bold text-navy-700">
            {staticTitle}
          </h3>
          {honeypot}
          <div className="mb-3 grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1">
              <span className="sr-only">First name</span>
              <input name="firstName" className={inputClass} placeholder="First name" required aria-required="true" />
            </label>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Last name</span>
              <input name="lastName" className={inputClass} placeholder="Last name" required aria-required="true" />
            </label>
          </div>
          <div className="mb-[18px] flex flex-col gap-3">
            <label className="flex flex-col gap-1">
              <span className="sr-only">Email address</span>
              <input
                name="email"
                className={inputClass}
                type="email"
                placeholder="Email address"
                required
                aria-required="true"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1">
                <span className="sr-only">Phone number</span>
                <input name="phone" className={inputClass} type="tel" placeholder="Phone" required aria-required="true" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="sr-only">Suburb</span>
                <input name="suburb" className={inputClass} placeholder="Suburb" required aria-required="true" />
              </label>
            </div>
            <label className="flex flex-col gap-1">
              <span className="sr-only">Monthly electricity bill</span>
              <select name="bill" className={inputClass} defaultValue="" aria-required="true">
                <option value="" disabled>
                  Monthly electricity bill
                </option>
                <option>$100 – $250</option>
                <option>$250 – $400</option>
                <option>$400 – $600</option>
                <option>$600+</option>
              </select>
            </label>
          </div>
          {error && (
            <p className="mb-3 rounded-md bg-red-50 px-3.5 py-2.5 font-body text-[13.5px] text-red-700">
              {error}
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={sending ? undefined : "arrow"}
            fullWidth
            disabled={sending}
            className={sending ? "opacity-70" : undefined}
          >
            {sending ? "Sending…" : staticSubmitLabel}
          </Button>
          {secureNote}
        </form>
      )}
    </div>
  );
}
