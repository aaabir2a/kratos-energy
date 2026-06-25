import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { ROICalculator } from "@/components/sections/ROICalculator";
// import { GuideDownload } from "@/components/sections/GuideDownload";

export const metadata: Metadata = {
  title: "Solar Savings & ROI Calculator",
  description:
    "Model your solar payback period and 25-year net benefit. Adjust system size and bill to see exactly when your solar pays for itself.",
};

export default function SavingsCalculatorPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Savings & ROI Calculator"
        title={
          <>
            See exactly when <span className="text-green-600">solar pays off.</span>
          </>
        }
        subtitle="Adjust your system size and power bill to model your payback period and 25-year return — no email required."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <ROICalculator />
          <p className="mx-auto mt-8 max-w-[680px] text-center font-body text-[12.5px] leading-relaxed text-ash-500">
            *Estimates only, based on indicative pricing and average generation
            under CEC guidelines. Actual savings vary with usage, tariff, feed-in
            rate and site conditions.
          </p>
        </div>
      </section>

      {/* <GuideDownload /> */}
    </SiteLayout>
  );
}
