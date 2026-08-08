import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Solar Finance & $0 Upfront Plans",
  description:
    "Flexible solar finance — zero deposit, interest-free payment plans and green loans, including the ACT Sustainable Household Scheme. Start saving from day one.",
  path: "/finance",
  keywords: ["solar finance Australia", "$0 upfront solar", "interest free solar payment plan"],
});

const OPTIONS = [
  {
    icon: "zap",
    name: "$0 Deposit Plan",
    rate: "0% deposit",
    body: "Get your system installed with nothing upfront and start saving from your very first bill.",
    points: ["No deposit required", "Pay from your savings", "Fast approval"],
    featured: true,
  },
  {
    icon: "calculator",
    name: "Interest-Free Terms",
    rate: "Up to 24 mo",
    body: "Spread the cost over up to 24 months interest-free on approved purchases.",
    points: ["No interest charges", "Fixed weekly repayments", "Flexible terms"],
    featured: false,
  },
  {
    icon: "leaf",
    name: "Green Loan",
    rate: "From 3.99% p.a.",
    body: "Longer-term green finance for larger residential and commercial systems.",
    points: ["Terms to 7 years", "Battery & EV included", "Competitive rates"],
    featured: false,
  },
];

const STEPS = [
  ["Choose your system", "Pick a size with your consultant — we lock in all rebates."],
  ["Pick a payment plan", "Select $0 deposit, interest-free, or a green loan."],
  ["Quick approval", "Most applications are approved same-day."],
  ["Install & save", "We install, connect and you start saving immediately."],
];

export default function FinancePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Finance & $0 Upfront"
        title={
          <>
            Go solar today, <span className="text-green-600">pay as you save.</span>
          </>
        }
        subtitle="Flexible, transparent finance so the savings can cover the system. Zero deposit options available on approved applications."
      >
        <Link
          href="/get-a-quote"
          className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
        >
          Check My Eligibility <Icon name="arrow" size={20} stroke={2.4} />
        </Link>
      </PageHero>

      {/* Options */}
      <section className="bg-white py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>Payment Options</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Finance that fits your budget.
            </h2>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {OPTIONS.map((o) => (
              <div
                key={o.name}
                className={
                  "flex flex-col rounded-lg p-7 " +
                  (o.featured
                    ? "border-2 border-green-500 shadow-lg"
                    : "border border-ash-200 shadow-md")
                }
              >
                <span className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-green-50 text-green-600">
                  <Icon name={o.icon} size={28} />
                </span>
                <h3 className="font-display text-[21px] font-bold text-navy-700">
                  {o.name}
                </h3>
                <div className="mb-3 mt-1 font-display text-[15px] font-extrabold text-green-600">
                  {o.rate}
                </div>
                <p className="mb-5 font-body text-[15px] leading-relaxed text-ash-700">
                  {o.body}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {o.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-center gap-2.5 font-body text-[14.5px] text-ink"
                    >
                      <Icon name="check" size={16} stroke={3} className="flex-none text-green-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-7 max-w-[680px] text-center font-body text-[12.5px] leading-relaxed text-ash-500">
            Finance is subject to approval, terms, conditions, fees and charges.
            Rates shown are indicative — speak to a consultant for an exact quote.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-paper py-[78px]">
        <div className="container-ke">
          <div className="mb-10 text-center">
            <Eyebrow center>How It Works</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Four steps to lower bills.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, body], i) => (
              <div key={title} className="rounded-lg border border-ash-200 bg-white p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-display text-[18px] font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-display text-[17px] font-bold text-navy-700">
                  {title}
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
