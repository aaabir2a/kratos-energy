import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { SolarSegment, type Service } from "@/components/sections/SolarSegment";

export const metadata: Metadata = {
  title: "Residential Solar",
  description:
    "Home solar and battery systems from Kratos Energy — 6.6kW to 13kW, Tier-1 panels, CEC-accredited installation, rebates handled and a 25-year warranty.",
};

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
      <SolarSegment
        category="residential"
        eyebrow="Residential Solar"
        title={
          <>
            Power your home with <span className="text-green-600">the sun.</span>
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
