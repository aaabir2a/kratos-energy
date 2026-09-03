import { SiteLayout } from "@/components/layout/SiteLayout";
import { SolarSegment, type Service } from "@/components/sections/SolarSegment";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Residential Solar Systems Australia | 6.6kW, 10kW & Battery",
  description:
    "Australian home solar from 6.6kW to 13.2kW with Tier-1 panels, CEC-accredited installation and 25-year warranty. We claim all federal STC and state rebates for you in NSW, VIC & ACT.",
  path: "/residential-solar",
  keywords: ["residential solar Australia", "home solar panels Australia", "6.6kW solar system Australia"],
});

const SERVICES: Service[] = [
  {
    icon: "sun",
    title: "Right-sized system design",
    body: "We size your system to your roof, orientation and power usage — no over- or under-selling. Free design and engineering.",
  },
  {
    icon: "battery",
    title: "Battery & EV ready",
    body: "Every home system is built ready for a battery and EV charger, so you can add storage and car charging whenever you're ready.",
  },
  {
    icon: "calculator",
    title: "Rebates & finance handled",
    body: "We claim your federal STC rebate and any state incentives for you, with $0-upfront finance and interest-free options available.",
  },
  {
    icon: "shield",
    title: "Tier-1 gear, 25-year warranty",
    body: "Trina or Jinko Tier-1 panels on quality mounting, installed by CEC-accredited electricians and backed by a 25-year panel warranty.",
  },
  {
    icon: "trend",
    title: "Monitoring from one app",
    body: "Track your generation, self-consumption and savings live from your phone with Wi-Fi production monitoring included.",
  },
  {
    icon: "wrench",
    title: "Install & aftercare",
    body: "One Australian-owned team handles design, installation, grid-connection paperwork and ongoing support — no subcontractor handballing.",
  },
];

export default function ResidentialSolarPage() {
  return (
    <SiteLayout>
      <JsonLd
        data={serviceLd({
          name: "Residential Solar Installation",
          description:
            "Design, supply and CEC-accredited installation of home solar and battery systems from 6.6kW to 13.2kW.",
          path: "/residential-solar",
          serviceType: "Solar panel installation",
        })}
      />
      <SolarSegment
        category="residential"
        eyebrow="Residential Solar"
        heroBgImage="https://api.kratos-energy.com/kratos-uploads/hero/desktop/dd403ceb-d379-48e9-8102-589925043402/optimized.webp"
        title={
          <>
            Power your home with <span className="text-green-300">the sun.</span>
          </>
        }
        subtitle="Premium home solar and battery systems, designed and installed by an Australian-owned team. From compact 6.6kW setups to whole-home 13kW systems — rebates handled, 25-year warranty."
        servicesHeading="What we provide for your home"
        services={SERVICES}
        systemsHeading="Residential systems"
        systemsIntro="Standard sizes for most Australian homes. Pick a starting point below to see the full spec and pricing, or build a custom system to match your exact usage."
      />
    </SiteLayout>
  );
}
