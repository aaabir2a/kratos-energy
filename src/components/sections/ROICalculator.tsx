"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const SYSTEM_OPTIONS = [
  { size: "6.6kW", cost: 3990, annual: 1800 },
  { size: "10kW", cost: 5490, annual: 2310 },
  { size: "13.2kW", cost: 7990, annual: 2900 },
  { size: "20kW", cost: 11990, annual: 4200 },
];

const YEARS = 25;

function money(n: number) {
  return "$" + Math.round(n).toLocaleString();
}

export function ROICalculator() {
  const [idx, setIdx] = useState(1);
  const [bill, setBill] = useState(350); // monthly $
  const sys = SYSTEM_OPTIONS[idx];

  // Scale baseline annual savings by how the user's bill compares to a
  // reference $350/mo bill, capped so small bills don't over-save.
  const annual = useMemo(() => {
    const factor = Math.min(bill / 350, 1.6);
    return Math.round(sys.annual * factor);
  }, [bill, sys]);

  const paybackYears = sys.cost / annual;
  const lifetime = annual * YEARS - sys.cost;

  // Build cumulative net-position series for the chart.
  const series = useMemo(() => {
    return Array.from({ length: YEARS + 1 }, (_, y) => annual * y - sys.cost);
  }, [annual, sys.cost]);

  const minV = series[0];
  const maxV = series[YEARS];
  const W = 640;
  const H = 240;
  const pad = 8;

  const x = (y: number) => pad + (y / YEARS) * (W - pad * 2);
  const yScale = (v: number) =>
    H - pad - ((v - minV) / (maxV - minV)) * (H - pad * 2);

  const zeroY = yScale(0);
  const linePath = series
    .map((v, y) => `${y === 0 ? "M" : "L"} ${x(y).toFixed(1)} ${yScale(v).toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L ${x(YEARS).toFixed(1)} ${zeroY.toFixed(1)} L ${x(0).toFixed(1)} ${zeroY.toFixed(1)} Z`;

  return (
    <div className="grid grid-cols-1 gap-7 lg:grid-cols-[360px_1fr]">
      {/* Controls */}
      <div className="rounded-xl border border-ash-200 bg-white p-7 shadow-md">
        <div className="mb-5">
          <div className="mb-2.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-ash-500">
            System size
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {SYSTEM_OPTIONS.map((s, i) => (
              <button
                key={s.size}
                onClick={() => setIdx(i)}
                className={cn(
                  "rounded-md border-[1.5px] px-3 py-3 font-display text-[15px] font-bold transition-all",
                  idx === i
                    ? "border-green-500 bg-green-50 text-forest-700"
                    : "border-ash-300 text-ash-700 hover:border-green-300",
                )}
              >
                {s.size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="font-display text-[13px] font-bold uppercase tracking-[0.06em] text-ash-500">
              Monthly bill
            </span>
            <span className="font-display text-[16px] font-extrabold text-forest-700">
              ${bill}
            </span>
          </div>
          <input
            type="range"
            min={100}
            max={900}
            step={10}
            value={bill}
            onChange={(e) => setBill(+e.target.value)}
            className="w-full"
            aria-label="Monthly electricity bill"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3.5">
          <div className="rounded-md bg-paper p-4">
            <div className="font-display text-[24px] font-extrabold leading-none text-navy-800">
              {money(sys.cost)}
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-ash-500">
              System cost (after rebate)
            </div>
          </div>
          <div className="rounded-md bg-green-50 p-4">
            <div className="font-display text-[24px] font-extrabold leading-none text-green-600">
              {money(annual)}
            </div>
            <div className="mt-1.5 font-body text-[12.5px] text-ash-500">
              Savings per year
            </div>
          </div>
        </div>
      </div>

      {/* Chart + headline */}
      <div className="rounded-xl border border-ash-200 bg-white p-7 shadow-md">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-ash-500">
              Payback period
            </div>
            <div className="font-display text-[40px] font-extrabold leading-none text-navy-800">
              {paybackYears.toFixed(1)}{" "}
              <span className="font-body text-[17px] font-semibold text-ash-500">
                years
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="font-body text-[12.5px] font-bold uppercase tracking-[0.06em] text-ash-500">
              25-year net benefit
            </div>
            <div className="font-display text-[40px] font-extrabold leading-none text-green-600">
              {money(lifetime)}
            </div>
          </div>
        </div>

        {/* Chart */}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Cumulative net savings over 25 years"
        >
          <defs>
            <linearGradient id="roiFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6cae34" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#6cae34" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* break-even line */}
          <line
            x1={pad}
            y1={zeroY}
            x2={W - pad}
            y2={zeroY}
            stroke="#cbd2c6"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          <text x={pad + 4} y={zeroY - 6} className="fill-ash-500" style={{ font: "600 11px var(--font-body)" }}>
            Break even
          </text>

          <path d={areaPath} fill="url(#roiFill)" />
          <path d={linePath} fill="none" stroke="#559025" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* payback marker */}
          <circle cx={x(paybackYears)} cy={zeroY} r="6" fill="#fff" stroke="#559025" strokeWidth="2.5" />
        </svg>

        <div className="mt-3 flex justify-between font-body text-[11.5px] text-ash-500">
          <span>Year 0</span>
          <span>Year 25</span>
        </div>

        <a
          href="/get-a-quote"
          className="ke-press mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-pill bg-green-500 px-7 py-[15px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Lock In These Savings <Icon name="arrow" size={19} stroke={2.4} />
        </a>
      </div>
    </div>
  );
}
