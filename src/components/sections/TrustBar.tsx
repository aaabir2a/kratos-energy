import { Icon } from "@/components/ui/Icon";

const STATS: [string, string][] = [
  ["3,100+", "Systems Installed"],
  ["$8.2M", "Customer Savings"],
  ["10+", "Years Experience"],
  ["100%", "Aussie Owned"],
];

const ACCRED = [
  "Clean Energy Council — Approved Retailer",
  "Powered by NRN",
  "CEC Accredited Installer",
];

export function TrustBar() {
  return (
    <section className="border-b border-ash-200 bg-white py-[54px]">
      <div className="container-ke">
        <div className="mb-[34px] grid grid-cols-2 gap-5 md:grid-cols-4">
          {STATS.map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="font-display text-[clamp(30px,3.6vw,44px)] font-extrabold leading-none text-green-600">
                {value}
              </div>
              <div className="mt-1.5 font-body text-sm font-semibold text-ash-700">
                {label}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3.5">
          {ACCRED.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-2 rounded-pill border border-green-200 bg-green-50 px-4 py-2 font-display text-[13px] font-bold text-forest-700"
            >
              <Icon name="shield" size={16} stroke={2.2} className="text-green-600" />
              {a}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
