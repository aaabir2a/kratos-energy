import { SiteLayout } from "@/components/layout/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { getHeroImagesServer, getProjectsServer, type HeroImages, type Project } from "@/lib/api";
import { ProjectShowcase } from "@/components/sections/Projects";
import { TrustBar } from "@/components/sections/TrustBar";
import { GetawayPromoSection } from "@/components/sections/GetawayPromoSection";
import { SystemPricing } from "@/components/sections/SystemPricing";
import { BatteryRange } from "@/components/sections/BatteryRange";
import { BrandWall } from "@/components/sections/BrandWall";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Testimonials } from "@/components/sections/Testimonials";
import { RebateBanner } from "@/components/sections/RebateBanner";
// import { GuideDownload } from "@/components/sections/GuideDownload";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { NetSellerCertification } from "@/components/sections/NetSellerCertification";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Solar Panels & Batteries for Australian Homes",
  description:
    "Compare solar system costs, claim your 2026 STC rebate and see your payback in seconds. CEC-approved installation across NSW, Victoria and the ACT since 2016.",
  path: "/",
  keywords: [
    "solar panels Australia",
    "solar rebate 2026",
    "home battery rebate",
    "solar savings calculator",
    "solar installer NSW",
  ],
});

/** Hero images fetched at render time (ISR) so URLs ship in the first HTML —
 *  no post-hydration swap. Falls back to empty (static hero asset) on error. */
async function loadHeroImages(): Promise<HeroImages> {
  try {
    return await getHeroImagesServer();
  } catch {
    return { desktop: [], mobile: [] };
  }
}

async function loadProjects(): Promise<Project[]> {
  try {
    return await getProjectsServer(12);
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [heroImages, projects] = await Promise.all([loadHeroImages(), loadProjects()]);
  return (
    <SiteLayout>
      {/* The hero slider needs raw <img> for the crossfade, so its URL isn't
          discoverable until React hydrates. Preloading here puts the LCP
          request in the initial HTML parse instead. */}
      {heroImages.desktop[0] && (
        <link
          rel="preload"
          as="image"
          href={heroImages.desktop[0].url}
          fetchPriority="high"
          media="(min-width: 640px)"
        />
      )}
      {heroImages.mobile[0] && (
        <link
          rel="preload"
          as="image"
          href={heroImages.mobile[0].url}
          fetchPriority="high"
          media="(max-width: 639px)"
        />
      )}

      <Hero images={heroImages} />
      <TrustBar />
      <GetawayPromoSection />
      <BatteryRange />
      <SystemPricing />
      <BrandWall />
      <SavingsCalculator />
      {/* <Services /> */}
      <ProjectShowcase projects={projects} />
      <CaseStudies />
      <Testimonials />
      <RebateBanner />
      {/* <GuideDownload /> */}
      <QuoteCTA />
      <NetSellerCertification />
    </SiteLayout>
  );
}
