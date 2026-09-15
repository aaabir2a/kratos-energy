/**
 * Australian phone number validation.
 *
 * Deliberately permissive about *formatting* — spaces, dashes, brackets and
 * `+61` / `0061` / `61` prefixes all pass — and strict about *structure*. The
 * job is to catch typos and junk before they reach the CRM, not to turn away a
 * real customer who writes their number differently. A rejected lead costs far
 * more than a slightly untidy one.
 *
 * Landlines are accepted alongside mobiles: a meaningful share of the audience
 * is older homeowners who give one.
 */

/** Mobiles: 04xx xxx xxx. */
const MOBILE = /^04\d{8}$/;
/** Geographic landlines: 02 NSW/ACT, 03 VIC/TAS, 07 QLD, 08 SA/WA/NT (05 = VoIP//services). */
const LANDLINE = /^0[23578]\d{8}$/;
/** Business inbound: 1300 xxx xxx and 1800 xxx xxx — plausible on commercial enquiries. */
const INBOUND = /^1(?:300|800)\d{6}$/;
/** Short business inbound: 13 xx xx. */
const INBOUND_SHORT = /^13\d{4}$/;

/**
 * Reduce any written form to bare national digits with the leading trunk `0`.
 * `+61 412 345 678`, `(02) 1234 5678` and `0412-345-678` all normalise cleanly.
 */
function toNationalDigits(input: string): string {
  const raw = input.replace(/[^\d+]/g, "");

  // Strip an Australian country code, then any trunk 0 the writer kept as well
  // (`+61 0412…` is wrong but common enough to be worth absorbing).
  if (raw.startsWith("+61")) return normaliseAfterCountryCode(raw.slice(3));
  if (raw.startsWith("0061")) return normaliseAfterCountryCode(raw.slice(4));
  if (raw.startsWith("61") && raw.length >= 11) return normaliseAfterCountryCode(raw.slice(2));

  return raw.replace(/\D/g, "");
}

/** Re-attach the trunk `0` that international format drops. */
function normaliseAfterCountryCode(rest: string): string {
  const digits = rest.replace(/\D/g, "").replace(/^0+/, "");
  return digits ? `0${digits}` : "";
}

/** True when `input` is a structurally valid Australian phone number. */
export function isValidAuPhone(input: string): boolean {
  const d = toNationalDigits(input);
  return MOBILE.test(d) || LANDLINE.test(d) || INBOUND.test(d) || INBOUND_SHORT.test(d);
}

/**
 * Validation message for a phone field, or `null` when the value is acceptable.
 * An empty optional field is acceptable — only `required` fields complain.
 *
 * Messages name the fix rather than the rule, and always show a real example.
 */
export function auPhoneError(input: string, opts: { required?: boolean } = {}): string | null {
  const value = input.trim();

  if (!value) {
    return opts.required ? "Please add a phone number so we can call you back." : null;
  }

  // Accept first, diagnose second — otherwise short-but-valid inbound numbers
  // (13 xx xx) get caught by the length checks below.
  if (isValidAuPhone(value)) return null;

  if (/[a-z]/i.test(value)) {
    return "Phone numbers can only contain digits — for example 0412 345 678.";
  }

  // A foreign country code is a clearer thing to say than "too long".
  if (value.startsWith("+") && !value.replace(/\s/g, "").startsWith("+61")) {
    return "We can only take Australian numbers — for example 0412 345 678.";
  }

  const d = toNationalDigits(value);

  if (d.length < 10) {
    return "That number looks too short. Australian numbers have 10 digits, like 0412 345 678.";
  }

  if (d.length > 10) {
    return "That number looks too long. Australian numbers have 10 digits, like 0412 345 678.";
  }

  if (!d.startsWith("0") && !d.startsWith("1")) {
    return "Australian numbers start with 0 — for example 0412 345 678 or (02) 4225 1234.";
  }

  return "Enter a valid Australian number — 0412 345 678 for a mobile, or (02) 4225 1234 for a landline.";
}
