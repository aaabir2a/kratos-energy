/**
 * Server-rendered sizing reference for /build.
 *
 * SystemConfigurator is a client component, so the crawler otherwise sees a
 * hero, a JS widget and a CTA on one of our highest-intent pages.
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

export function SystemSizingGuide() {
  return (
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
  );
}
