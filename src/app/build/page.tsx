import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { SystemConfigurator } from "@/components/sections/SystemConfigurator";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Build Your Solar System",
  description:
    "Design your own solar system — pick panels, inverter, battery and EV charging and see live pricing. Then request your tailored Kratos quote.",
};

export default function BuildPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Build Your System"
        title={
          <>
            Design your solar, <span className="text-green-600">your way.</span>
          </>
        }
        subtitle="Mix and match panels, inverter, battery and EV charging — watch the price update live, then request your build."
      />

      <section className="bg-paper py-14">
        <div className="container-ke">
          <SystemConfigurator />
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
