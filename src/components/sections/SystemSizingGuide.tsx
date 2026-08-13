import Link from "next/link";
import { SYSTEMS } from "@/lib/systems";
import { money } from "@/lib/rebates";

/**
 * Server-rendered sizing reference for /build.
 *
 * SystemConfigurator is a client component, so the crawler otherwise sees a
 * hero, a JS widget and a CTA on one of our highest-intent pages. Everything
 * here is derived from SYSTEMS, the same data the system pages use.
 */

export const SIZING_STEPS: { name: string; text: string }[] = [
  {
    name: "Check your daily usage",
    text: "Find the average daily kWh on your electricity bill. Most Australian homes use 16–25 kWh a day; households with ducted air-conditioning, a pool or an EV use considerably more.",
  },
  {
    name: "Match panels to that usage",
    text: "As a rule of thumb, each kW of solar generates about 4 kWh a day across most of Australia. A 6.6kW system covers a typical family home; 10kW suits higher usage or a future battery.",
  },
  {
    name: "Check your roof and phase",
    text: "Panel count is limited by usable north, east and west roof area, and inverter choice depends on whether your home is single or three phase. We confirm both during the free design.",
  },
  {
    name: "Decide on a battery",
    text: "A battery lets you use your daytime solar after dark instead of exporting it cheaply. The federal Cheaper Home Batteries rebate discounts it per usable kWh, which shortens payback considerably.",
  },
  {
    name: "Add EV charging if relevant",
    text: "A 7kW charger fills most EVs overnight from surplus solar. Sizing solar a few kW larger up front is far cheaper than adding panels later.",
  },
];

function SystemTable({ rows, caption }: { rows: typeof SYSTEMS; caption: string }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-left font-body text-[15px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-ash-200 bg-paper">
            {["System", "Best for", "Price (incl. GST, after STC rebate)", "Est. annual savings"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-ash-500"
                >
                  {h}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((s) => (
            <tr key={s.slug} className="border-b border-ash-200">
              <th className="px-4 py-3 font-display text-[15px] font-bold text-navy-800">
                <Link href={`/packages/${s.slug}`} className="hover:text-green-600">
                  {s.size}
                </Link>
              </th>
              <td className="px-4 py-3 text-ash-700">{s.audience}</td>
              <td className="px-4 py-3 text-forest-700">
                {s.price === null ? "Enquire" : money(s.price)}
              </td>
              <td className="px-4 py-3 text-ash-700">{money(s.savingsPerYear)} a year</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SystemSizingGuide() {
  const residential = SYSTEMS.filter((s) => s.category === "residential");
  const commercial = SYSTEMS.filter((s) => s.category === "commercial");

  return (
    <div className="flex flex-col gap-14">
      <section id="sizes">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          Solar system sizes and prices compared
        </h2>
        <p className="mt-4 font-body text-[16px] leading-relaxed text-ash-700">
          Every price below already includes GST and has the federal STC rebate deducted, so
          it&rsquo;s what you actually pay. Build a custom configuration above, or start from one
          of these standard packages.
        </p>

        <h3 className="mt-7 font-display text-[19px] font-extrabold text-navy-700">
          Home solar systems
        </h3>
        <SystemTable rows={residential} caption="Residential solar system sizes, prices and savings" />

        <h3 className="mt-9 font-display text-[19px] font-extrabold text-navy-700">
          Commercial solar systems
        </h3>
        <SystemTable rows={commercial} caption="Commercial solar system sizes, prices and savings" />

        <p className="mt-3 font-body text-[13.5px] text-ash-500">
          Savings are estimates based on typical Australian usage and tariffs; your figure
          depends on how much of your generation you use on site.{" "}
          <Link
            href="/savings-calculator"
            className="font-semibold text-green-600 underline underline-offset-2"
          >
            Model your own payback
          </Link>
          .
        </p>
      </section>

      <section id="how-to-size">
        <h2 className="font-display text-[clamp(24px,3vw,34px)] font-extrabold tracking-[-0.02em] text-navy-700">
          How to size your solar system
        </h2>
        <ol className="mt-5 flex flex-col gap-5">
          {SIZING_STEPS.map((step, i) => (
            <li key={step.name} className="flex gap-4">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-green-50 font-display text-[15px] font-extrabold text-green-600">
                {i + 1}
              </span>
              <div>
                <h3 className="font-display text-[17px] font-extrabold text-navy-800">
                  {step.name}
                </h3>
                <p className="mt-1 font-body text-[15px] leading-relaxed text-ash-700">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
