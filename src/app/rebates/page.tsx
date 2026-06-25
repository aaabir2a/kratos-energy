import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { RebateExplorer } from "@/components/sections/RebateExplorer";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Government Solar Rebates by State",
  description:
    "See the federal STCs and state solar & battery rebates available where you live. Kratos Energy handles all the paperwork for you.",
};

export default function RebatesPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Government Rebates 2026"
        title={
          <>
            How much can <span className="text-green-600">you claim?</span>
          </>
        }
        subtitle="Solar rebates step down every year. Select your state to see what's available right now — we handle every form for you."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <RebateExplorer />
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
