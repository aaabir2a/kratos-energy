"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { submitLead, type LeadFormField } from "@/lib/api";
import { useContentStore } from "@/lib/store";
import { stateForPostcode } from "@/lib/rebates";

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

/**
 * Fill the CRM's global lead-form schema so validation passes. `maps_to`
 * (then type/label) routes contact fields; required choice fields use
 * `choiceSeed` (the funnel's Residential/Commercial answer) when it matches an
 * option, else fall back to the first.
 */
function schemaAutoFill(
  fields: LeadFormField[],
  contact: Record<string, string | undefined>,
  choiceSeed?: string,
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields) {
    const mapped = f.maps_to ? contact[f.maps_to] : undefined;
    if (mapped) { out[f.field_name] = mapped; continue; }
    if (f.type === "email" && contact.email) { out[f.field_name] = contact.email; continue; }
    if (f.type === "phone" && contact.phone) { out[f.field_name] = contact.phone; continue; }
    if (f.type === "text" && /name/i.test(`${f.label} ${f.field_name}`) && contact.firstName) {
      out[f.field_name] = contact.firstName; continue;
    }
    if ((f.type === "select" || f.type === "radio") && f.required && f.options?.length) {
      out[f.field_name] =
        (choiceSeed && f.options.find((o) => o.toLowerCase() === choiceSeed.toLowerCase())) ||
        f.options.find((o) => /residential/i.test(o)) ||
        f.options[0];
      continue;
    }
    if (f.type === "checkbox" && f.required) out[f.field_name] = true;
  }
  return out;
}

type Data = {
  category: string;
  bill: string;
  roof: string;
  postcode: string;
  name: string;
  email: string;
  phone: string;
};

const EMPTY: Data = {
  category: "",
  bill: "",
  roof: "",
  postcode: "",
  name: "",
  email: "",
  phone: "",
};

const STEPS = ["Property", "Energy use", "Roof", "Your details"];

const CATEGORIES = [
  { id: "Residential", icon: "sun", note: "A home or apartment" },
  { id: "Commercial", icon: "building", note: "A business or site" },
];
const BILLS = ["$100 – $250", "$250 – $400", "$400 – $600", "$600+"];
const ROOFS = ["Tin / metal", "Tile", "Flat / concrete", "Not sure"];

const inputClass =
  "w-full rounded-md border-[1.5px] border-ash-300 bg-white px-[15px] py-[13px] font-body text-[15px] text-ink outline-none";

/** Multi-step lead-capture funnel. */
export function QuoteFunnel() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(EMPTY);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Live CRM form schema — its required fields must be satisfied on submit.
  const { data: leadSchema } = useContentStore((s) => s.leadForm);
  const loadLeadForm = useContentStore((s) => s.loadLeadForm);
  useEffect(() => {
    loadLeadForm();
  }, [loadLeadForm]);

  const set = (k: keyof Data, v: string) =>
    setData((d) => ({ ...d, [k]: v }));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setError(null);

    const fd = new FormData(e.currentTarget);
    // Honeypot — bots fill this; humans never see it.
    if (String(fd.get("website") ?? "").trim()) {
      setDone(true);
      return;
    }

    const [first, ...rest] = data.name.trim().split(/\s+/);
    const pc = parseInt(data.postcode, 10);
    const state = Number.isFinite(pc) ? stateForPostcode(pc) ?? undefined : undefined;

    const summary = [
      "Quote request (get-a-quote funnel):",
      `- Property: ${data.category}`,
      `- Monthly bill: ${data.bill}`,
      `- Roof type: ${data.roof}`,
      `- Postcode: ${data.postcode}${state ? ` (${state})` : ""}`,
    ].join("\n");

    setSending(true);
    try {
      await submitLead({
        firstName: first || data.name.trim(),
        lastName: rest.length ? rest.join(" ") : undefined,
        email: data.email.trim() || undefined,
        phone: data.phone.trim() || undefined,
        postcode: data.postcode.trim() || undefined,
        state,
        message: summary,
        consentMarketing: true,
        customFields: {
          ...schemaAutoFill(
            leadSchema?.fieldsSchema ?? [],
            { firstName: first, email: data.email.trim(), phone: data.phone.trim() },
            data.category,
          ),
          lead_source: "get_a_quote_funnel",
          source_page: "/get-a-quote",
          enquiry_type: data.category,
          property_type: data.category,
          monthly_bill: data.bill,
          roof_type: data.roof,
        },
        ...attribution(),
      });
      setDone(true);
    } catch {
      setError("Sorry — we couldn't send that just now. Please try again or call us.");
    } finally {
      setSending(false);
    }
  }

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const canAdvance =
    (step === 0 && data.category) ||
    (step === 1 && data.bill) ||
    (step === 2 && data.roof) ||
    step === 3;

  if (done) {
    return (
      <div className="mx-auto max-w-[560px] rounded-xl border border-ash-200 bg-white p-10 text-center shadow-lg">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Icon name="check" size={34} stroke={3} />
        </span>
        <h2 className="mb-2 font-display text-[26px] font-extrabold text-navy-700">
          Thanks, {data.name.split(" ")[0] || "there"}! 🌱
        </h2>
        <p className="font-body text-[16px] leading-relaxed text-ash-700">
          A Kratos Energy specialist will call you within one business day with a
          tailored {data.category.toLowerCase()} solar quote for{" "}
          {data.postcode || "your area"}.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[620px] rounded-xl border border-ash-200 bg-white p-7 shadow-lg sm:p-9">
      {/* Progress */}
      <div className="mb-7">
        <div className="mb-2.5 flex items-center justify-between">
          <span className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-green-600">
            Step {step + 1} of {STEPS.length}
          </span>
          <span className="font-body text-[13px] font-semibold text-ash-500">
            {STEPS[step]}
          </span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-pill transition-colors",
                i <= step ? "bg-green-500" : "bg-ash-200",
              )}
            />
          ))}
        </div>
      </div>

      {/* Step 0 — category */}
      {step === 0 && (
        <div>
          <h3 className="mb-4 font-display text-[21px] font-bold text-navy-700">
            What are we powering?
          </h3>
          <div className="grid grid-cols-2 gap-3.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => set("category", c.id)}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-lg border-[1.5px] p-5 text-left transition-all",
                  data.category === c.id
                    ? "border-green-500 bg-green-50"
                    : "border-ash-300 hover:border-green-300",
                )}
              >
                <Icon name={c.icon} size={28} className="text-green-600" />
                <div>
                  <div className="font-display text-[16px] font-bold text-navy-700">
                    {c.id}
                  </div>
                  <div className="font-body text-[13px] text-ash-500">
                    {c.note}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 — bill */}
      {step === 1 && (
        <div>
          <h3 className="mb-4 font-display text-[21px] font-bold text-navy-700">
            Roughly your monthly power bill?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {BILLS.map((b) => (
              <button
                key={b}
                onClick={() => set("bill", b)}
                className={cn(
                  "rounded-md border-[1.5px] px-4 py-4 font-display text-[15px] font-bold transition-all",
                  data.bill === b
                    ? "border-green-500 bg-green-50 text-forest-700"
                    : "border-ash-300 text-ash-700 hover:border-green-300",
                )}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — roof */}
      {step === 2 && (
        <div>
          <h3 className="mb-4 font-display text-[21px] font-bold text-navy-700">
            What&rsquo;s your roof type?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ROOFS.map((r) => (
              <button
                key={r}
                onClick={() => set("roof", r)}
                className={cn(
                  "rounded-md border-[1.5px] px-4 py-4 font-display text-[15px] font-bold transition-all",
                  data.roof === r
                    ? "border-green-500 bg-green-50 text-forest-700"
                    : "border-ash-300 text-ash-700 hover:border-green-300",
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 — details */}
      {step === 3 && (
        <form onSubmit={handleSubmit} noValidate>
          <h3 className="mb-4 font-display text-[21px] font-bold text-navy-700">
            Where should we send your quote?
          </h3>
          {/* Honeypot — hidden from users, must stay empty. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />
          <div className="flex flex-col gap-3">
            <input
              className={inputClass}
              placeholder="Full name"
              value={data.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
            <input
              className={inputClass}
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) => set("email", e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputClass}
                placeholder="Phone"
                value={data.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
              />
              <input
                className={inputClass}
                placeholder="Postcode"
                value={data.postcode}
                onChange={(e) => set("postcode", e.target.value)}
                required
              />
            </div>
          </div>
          {error && (
            <p className="mt-4 rounded-md bg-red-50 px-3.5 py-2.5 font-body text-[13.5px] text-red-700">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={sending}
            className={cn(
              "ke-press mt-5 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-7 py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600",
              sending && "opacity-70",
            )}
          >
            {sending ? "Sending…" : "Get My Free Quote"}
            {!sending && <Icon name="arrow" size={19} stroke={2.4} />}
          </button>
          <p className="mt-3.5 text-center font-body text-xs text-ash-500">
            <Icon name="shield" size={13} stroke={2} className="-mb-0.5 mr-1 inline-block" />
            Your information is 100% secure and never shared.
          </p>
        </form>
      )}

      {/* Footer nav */}
      {step < 3 && (
        <div className="mt-7 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className={cn(
              "font-display text-[14px] font-bold transition-colors",
              step === 0
                ? "cursor-not-allowed text-ash-300"
                : "text-ash-500 hover:text-forest-700",
            )}
          >
            ← Back
          </button>
          <button
            onClick={next}
            disabled={!canAdvance}
            className={cn(
              "ke-press inline-flex items-center gap-2 rounded-pill px-7 py-3 font-display text-[15px] font-bold text-white transition-all",
              canAdvance
                ? "bg-green-500 shadow-green hover:bg-green-600"
                : "cursor-not-allowed bg-ash-300",
            )}
          >
            Continue <Icon name="arrow" size={17} stroke={2.4} />
          </button>
        </div>
      )}
    </div>
  );
}
