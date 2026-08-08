import Link from "next/link";
import {
  STATE_SCHEMES,
  STC_PRICE,
  STC_SCHEME_END_YEAR,
  ZONE_RATING,
  VERIFIED,
  calcStc,
  calcFederalBatteryRebate,
  federalBatteryBreakdown,
  money,
  type StateCode,
} from "@/lib/rebates";

/**
 * Server-rendered rebate reference that sits beneath the interactive explorer.
 *
 * The explorer is a client component, so without this the page has nothing
 * indexable on it — a hero, a JS widget and a CTA. Everything here comes from
 * the same rebate engine the calculators use, so the numbers can't drift.
 */

const YEAR = 2026;

/** Representative capital-city postcode per state, for worked examples. */
const EXAMPLE_POSTCODE: Record<StateCode, { postcode: number; capital: string }> = {
  NSW: { postcode: 2000, capital: "Sydney" },
  VIC: { postcode: 3000, capital: "Melbourne" },
  QLD: { postcode: 4000, capital: "Brisbane" },
  SA: { postcode: 5000, capital: "Adelaide" },
  WA: { postcode: 6000, capital: "Perth" },
  TAS: { postcode: 7000, capital: "Hobart" },
  ACT: { postcode: 2600, capital: "Canberra" },
  NT: { postcode: 800, capital: "Darwin" },
};

/** Only the states we install in have their own guide page. */
const STATE_PAGE: Partial<Record<StateCode, string>> = {
  NSW: "/solar/nsw",
  VIC: "/solar/vic",
  ACT: "/solar/act",
};

const SIZES = [6.6, 10, 13.2];

export function RebateSchemeGuide() {
  const zones = [1, 2, 3, 4] as const;
  const battery13 = calcFederalBatteryRebate(13.5);
  const tiers = federalBatteryBreakdown(50);

  return (
    <div className="flex flex-col gap-14">
      {/* ── Federal STC ─────────────────────────────────────────────── */}
      <section id="stc">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          The federal solar rebate (STCs), explained
        </h2>
        <div className="mt-4 flex flex-col gap-3 font-body text-[16px] leading-relaxed text-ash-700">
          <p>
            Australia&rsquo;s main solar rebate isn&rsquo;t a cash payment. It&rsquo;s Small-scale
            Technology Certificates &mdash; STCs &mdash; created by the Small-scale Renewable Energy
            Scheme and applied by your installer as an upfront discount, so you never
            handle the paperwork.
          </p>
          <p>
            Your certificate count is <strong>system size (kW) &times; your postcode&rsquo;s zone
            rating &times; the years left in the scheme</strong>, rounded down. Each certificate is
            worth roughly ${STC_PRICE} once broker fees come out. Because the scheme is
            legislated to end on 31 December {STC_SCHEME_END_YEAR}, the deeming period drops by
            one year every January &mdash; the same system installed next year earns less.
          </p>
        </div>

        <h3 className="mt-7 font-display text-[19px] font-extrabold text-navy-700">
          STC rebate by system size and solar zone ({YEAR})
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left font-body text-[15px]">
            <thead>
              <tr className="border-b border-ash-200 bg-paper">
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  System size
                </th>
                {zones.map((z) => (
                  <th
                    key={z}
                    className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500"
                  >
                    Zone {z} ({ZONE_RATING[z]})
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SIZES.map((kw) => (
                <tr key={kw} className="border-b border-ash-200">
                  <th className="px-4 py-3 font-display text-[15px] font-bold text-navy-800">
                    {kw} kW
                  </th>
                  {zones.map((z) => {
                    // One postcode per zone gives a representative figure.
                    const postcode = { 1: 6770, 2: 2830, 3: 2000, 4: 3000 }[z];
                    const stc = calcStc(kw, postcode, YEAR);
                    return (
                      <td key={z} className="px-4 py-3 text-forest-700">
                        {stc ? money(stc.rebate) : "—"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-body text-[13.5px] text-ash-500">
          Estimates at ${STC_PRICE} per certificate, {YEAR} deeming. Zone 1 covers the sunniest
          inland regions; Sydney, Brisbane, Perth and Adelaide are Zone 3; Melbourne and
          Tasmania are Zone 4.{" "}
          <Link href="/calculators/solar-rebate" className="font-semibold text-green-600 underline underline-offset-2">
            Calculate your exact rebate by postcode
          </Link>
          .
        </p>
      </section>

      {/* ── Federal battery rebate ──────────────────────────────────── */}
      <section id="battery">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          The federal battery rebate: Cheaper Home Batteries
        </h2>
        <div className="mt-4 flex flex-col gap-3 font-body text-[16px] leading-relaxed text-ash-700">
          <p>
            The Cheaper Home Batteries Program discounts home battery storage Australia-wide,
            on top of your solar STCs. It pays per <strong>usable</strong> kilowatt-hour, and
            it tapers: the first 14 kWh attracts the full rate, the next band 60% of it, and
            capacity beyond 50 kWh nothing at all. A typical 13.5 kWh battery attracts about{" "}
            <strong>{money(battery13)}</strong>.
          </p>
        </div>

        <h3 className="mt-7 font-display text-[19px] font-extrabold text-navy-700">
          How the tapered tiers work
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left font-body text-[15px]">
            <thead>
              <tr className="border-b border-ash-200 bg-paper">
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  Capacity band
                </th>
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  Rate
                </th>
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  Rebate for this band
                </th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((t) => (
                <tr key={t.label} className="border-b border-ash-200">
                  <th className="px-4 py-3 font-display text-[15px] font-bold text-navy-800">
                    {t.label}
                  </th>
                  <td className="px-4 py-3 text-ash-700">
                    ${t.rate.toFixed(2)} per usable kWh
                  </td>
                  <td className="px-4 py-3 text-forest-700">{money(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-body text-[13.5px] text-ash-500">
          Figures for a 50 kWh system to show every band.{" "}
          <Link href="/calculators/battery-rebate" className="font-semibold text-green-600 underline underline-offset-2">
            Work out your own battery rebate
          </Link>
          .
        </p>
      </section>

      {/* ── State by state ──────────────────────────────────────────── */}
      <section id="states">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          State and territory solar schemes in {YEAR}
        </h2>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-ash-700">
          State support sits on top of the two federal schemes above. Many are zero-interest
          loans rather than cash, and they change often &mdash; so each entry links to the
          official source rather than quoting a number we can&rsquo;t keep current.
        </p>

        <div className="mt-6 flex flex-col gap-6">
          {(Object.keys(STATE_SCHEMES) as StateCode[]).map((code) => {
            const scheme = STATE_SCHEMES[code];
            const ex = EXAMPLE_POSTCODE[code];
            const stc = calcStc(6.6, ex.postcode, YEAR);
            const page = STATE_PAGE[code];

            return (
              <article
                key={code}
                className="rounded-xl border border-ash-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-[20px] font-extrabold tracking-[-0.01em] text-navy-800">
                  {scheme.name} solar rebates {YEAR}
                </h3>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-ash-700">
                  {scheme.battery}
                </p>
                <p className="mt-2 font-body text-[15px] leading-relaxed text-ash-700">
                  A 6.6 kW system in {ex.capital} sits in STC Zone {stc?.zone} and earns roughly{" "}
                  <strong>{stc ? money(stc.rebate) : "—"}</strong> in federal certificates, plus
                  the Cheaper Home Batteries rebate if you add storage.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-4 font-display text-[14px] font-bold">
                  {page ? (
                    <Link href={page} className="text-green-600 hover:text-green-700">
                      Solar in {scheme.name} &rarr;
                    </Link>
                  ) : (
                    <span className="rounded-pill bg-paper px-3 py-1 font-display text-[12px] font-bold text-ash-500">
                      We install in NSW, VIC &amp; ACT only
                    </span>
                  )}
                  <a
                    href={scheme.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ash-500 hover:text-navy-700"
                  >
                    Official {code} source &rarr;
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-6 font-body text-[13.5px] text-ash-500">
          Rates last checked against primary sources on {VERIFIED}. Estimates only &mdash; your
          final rebate is confirmed at installation.
        </p>
      </section>
    </div>
  );
}
