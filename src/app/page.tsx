import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { getHeroImagesServer, type HeroImages } from "@/lib/api";
import { TrustBar } from "@/components/sections/TrustBar";
import { SystemPricing } from "@/components/sections/SystemPricing";
import { BatteryRange } from "@/components/sections/BatteryRange";
import { BrandWall } from "@/components/sections/BrandWall";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { RebateBanner } from "@/components/sections/RebateBanner";
// import { GuideDownload } from "@/components/sections/GuideDownload";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { NetSellerCertification } from "@/components/sections/NetSellerCertification";

/** Hero images fetched at render time (ISR) so URLs ship in the first HTML —
 *  no post-hydration swap. Falls back to empty (static hero asset) on error. */
async function loadHeroImages(): Promise<HeroImages> {
  try {
    return await getHeroImagesServer();
  } catch {
    return { desktop: [], mobile: [] };
  }
}

export default async function HomePage() {
  const heroImages = await loadHeroImages();
  return (
    <SiteLayout>
      <Hero images={heroImages} />
      <TrustBar />
      <BatteryRange />
      <SystemPricing />
      <BrandWall />
      <SavingsCalculator />
      {/* <Services /> */}
      <CaseStudies />
      <Testimonials />
      <RebateBanner />
      {/* <GuideDownload /> */}
      <QuoteCTA />
      <NetSellerCertification />
    </SiteLayout>
  );
}
