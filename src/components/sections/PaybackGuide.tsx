import Link from "next/link";
import { SYSTEMS } from "@/lib/systems";
import { money } from "@/lib/rebates";

/**
 * Server-rendered payback reference for /savings-calculator.
 *
 * ROICalculator is client-side, so this is what a crawler actually reads. The
 * savings figures come from SYSTEMS — the same numbers quoted on the system
 * pages — scaled by how much of your generation you self-consume.
 */

/**
 * Self-consumption drives payback more than anything else: exported power earns
 * a feed-in tariff of a few cents, power you use yourself avoids the full
 * retail rate. These three profiles bracket a typical Australian household.
 */
const PROFILES = [
  { label: "Out all day", factor: 0.75, note: "Most generation exported" },
  { label: "Someone home part-time", factor: 1.0, note: "Typical household" },
  { label: "Home all day / battery", factor: 1.25, note: "High self-consumption" },
];

export function PaybackGuide() {
  const residential = SYSTEMS.filter((s) => s.category === "residential" && s.price !== null);

  return (
    <div className="flex flex-col gap-14">
      <section id="payback-table">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          Solar payback periods in Australia
        </h2>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-ash-700">
          Payback is simply your system price divided by what it saves each year. Prices below
          include GST and already have the federal STC rebate deducted. The three columns show
          how much your daily routine matters: power you use yourself avoids the full retail
          rate, while exported power only earns a feed-in tariff of a few cents.
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left font-body text-[15px]">
            <caption className="sr-only">
              Estimated solar payback period by system size and household type
            </caption>
            <thead>
              <tr className="border-b border-ash-200 bg-paper">
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  System
                </th>
                <th className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500">
                  Price
                </th>
                {PROFILES.map((p) => (
                  <th
                    key={p.label}
                    className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500"
                  >
                    {p.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {residential.map((s) => (
                <tr key={s.slug} className="border-b border-ash-200">
                  <th className="px-4 py-3 font-display text-[15px] font-bold text-navy-800">
                    <Link href={`/systems/${s.slug}`} className="hover:text-green-600">
                      {s.size}
                    </Link>
                  </th>
                  <td className="px-4 py-3 text-ash-700">{money(s.price!)}</td>
                  {PROFILES.map((p) => {
                    const annual = s.savingsPerYear * p.factor;
                    const years = s.price! / annual;
                    return (
                      <td key={p.label} className="px-4 py-3 text-forest-700">
                        {years.toFixed(1)} yrs
                        <span className="block font-body text-[12.5px] text-ash-500">
                          {money(annual)}/yr
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 font-body text-[13.5px] text-ash-500">
          Estimates using indicative pricing and average Australian generation. Panels are
          warranted for 25 years, so most systems spend the majority of their life in profit.
        </p>
      </section>

      <section id="what-affects-payback">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          What changes your payback period
        </h2>

        <div className="mt-5 flex flex-col gap-6">
          <div>
            <h3 className="font-display text-[18px] font-extrabold text-navy-800">
              How much solar you use yourself
            </h3>
            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ash-700">
              The single biggest factor. Running the dishwasher, washing machine and pool pump
              during daylight converts export credits worth a few cents into avoided retail
              power worth several times more.
            </p>
          </div>
          <div>
            <h3 className="font-display text-[18px] font-extrabold text-navy-800">
              Your location and roof orientation
            </h3>
            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ash-700">
              Generation per kW varies across Australia, and north-facing panels produce most.
              East and west splits generate slightly less overall but spread output across
              morning and evening, which often suits usage better.{" "}
              <Link
                href="/calculators/solar-output"
                className="font-semibold text-green-600 underline underline-offset-2"
              >
                Estimate your generation
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-[18px] font-extrabold text-navy-800">
              Your tariff and feed-in rate
            </h3>
            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ash-700">
              A higher retail rate makes solar pay back faster, because every self-consumed
              kilowatt-hour is worth more.{" "}
              <Link
                href="/calculators/feed-in-tariff"
                className="font-semibold text-green-600 underline underline-offset-2"
              >
                Check 2026 feed-in tariffs by state
              </Link>
              .
            </p>
          </div>
          <div>
            <h3 className="font-display text-[18px] font-extrabold text-navy-800">
              Rebates and whether you add a battery
            </h3>
            <p className="mt-1.5 font-body text-[15px] leading-relaxed text-ash-700">
              The federal STC rebate is already in the prices above, and the Cheaper Home
              Batteries Program discounts storage per usable kWh. A battery costs more up front
              but lifts self-consumption sharply.{" "}
              <Link
                href="/rebates"
                className="font-semibold text-green-600 underline underline-offset-2"
              >
                See every 2026 rebate
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
