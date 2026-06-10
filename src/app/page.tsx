import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { SystemPricing } from "@/components/sections/SystemPricing";
import { BatteryRange } from "@/components/sections/BatteryRange";
import { BrandWall } from "@/components/sections/BrandWall";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { RebateBanner } from "@/components/sections/RebateBanner";
import { GuideDownload } from "@/components/sections/GuideDownload";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <BatteryRange />
      <SystemPricing />
      <BrandWall />
      <SavingsCalculator />
      <Services />
      <CaseStudies />
      <Testimonials />
      <RebateBanner />
      <GuideDownload />
      <QuoteCTA />
    </SiteLayout>
  );
}
