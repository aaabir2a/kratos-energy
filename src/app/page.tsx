import { PromoBar } from "@/components/layout/PromoBar";
import { ChromeShell } from "@/components/layout/ChromeShell";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { SavingsCalculator } from "@/components/sections/SavingsCalculator";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { RebateBanner } from "@/components/sections/RebateBanner";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export default function HomePage() {
  return (
    <>
      <PromoBar />
      <ChromeShell />
      <main>
        <Hero />
        <TrustBar />
        <SavingsCalculator />
        <Services />
        <Testimonials />
        <RebateBanner />
        <QuoteCTA />
      </main>
      <Footer />
    </>
  );
}
