import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { QuoteFunnel } from "@/components/sections/QuoteFunnel";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";

export const metadata: Metadata = {
  title: "Get a Free Solar Quote",
  description:
    "Answer four quick questions and get a tailored solar quote from Kratos Energy — no obligation, no pushy sales calls.",
};

const PROMISES = [
  "Free, no-obligation quote",
  "No pushy sales tactics",
  "Tier 1 panels only",
  "25-year warranty",
];

export default function QuotePage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Free Solar Quote"
        title={
          <>
            Your tailored quote, <span className="text-green-600">in 2 minutes.</span>
          </>
        }
        subtitle="Four quick questions about your place — we'll handle the design, rebates and numbers."
      >
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
          {PROMISES.map((p) => (
            <span
              key={p}
              className="inline-flex items-center gap-2 font-body text-[14px] font-semibold text-forest-700"
            >
              <Icon name="check" size={15} stroke={3} className="text-green-500" />
              {p}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="bg-white py-14">
        <div className="container-ke">
          <QuoteFunnel />
          <div className="mt-8 flex items-center justify-center gap-2.5 font-body text-[14px] font-bold text-ash-700">
            <Stars size={16} /> 4.9/5 from 2,847 Australian installs
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
