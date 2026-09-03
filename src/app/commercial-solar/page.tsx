import { SiteLayout } from "@/components/layout/SiteLayout";
import { SolarSegment, type Service } from "@/components/sections/SolarSegment";
import { pageMetadata } from "@/lib/seo/metadata";
import { serviceLd } from "@/lib/seo/schema";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = pageMetadata({
  title: "Commercial Solar Systems Australia 30–100kW+ | NSW, VIC, ACT",
  description:
    "Commercial solar installations across Australia — 30kW to 100kW+ systems with energy audit, ROI modelling, finance, Australian grid approvals and maintenance.",
  path: "/commercial-solar",
  keywords: ["commercial solar Australia", "business solar system NSW", "commercial solar 100kW Australia"],
});

const SERVICES: Service[] = [
  {
    icon: "building",
    title: "Energy audit & system design",
    body: "We assess your load profile, tariff and roof or ground space to design a system that offsets the most expensive parts of your bill.",
  },
  {
    icon: "zap",
    title: "Three-phase & multi-inverter",
    body: "Larger sites need three-phase supply and multi-inverter configurations — engineered for high yield and clean grid connection.",
  },
  {
    icon: "trend",
    title: "ROI & bill-reduction modelling",
    body: "Clear projections of payback period, annual savings and return on investment before you commit, based on your real usage.",
  },
  {
    icon: "calculator",
    title: "Finance & tax incentives",
    body: "Flexible payment plans plus guidance on the instant asset write-off and available business incentives to improve cash flow.",
  },
  {
    icon: "wrench",
    title: "Operations & maintenance",
    body: "Performance monitoring, scheduled maintenance and rapid support keep your system generating at its designed output.",
  },
  {
    icon: "shield",
    title: "Compliance & grid connection",
    body: "We manage network provider coordination, technical approvals and compliance so your project moves forward without delays.",
  },
];

export default function CommercialSolarPage() {
  return (
    <SiteLayout>
      <JsonLd
        data={serviceLd({
          name: "Commercial Solar Installation",
          description:
            "Commercial solar from 30kW to 100kW+, including energy audit, ROI modelling, grid connection and ongoing maintenance.",
          path: "/commercial-solar",
          serviceType: "Commercial solar installation",
        })}
      />
      <SolarSegment
        category="commercial"
        eyebrow="Commercial Solar"
        heroBgImage="https://api.kratos-energy.com/kratos-uploads/hero/desktop/fc169765-17c9-4c33-a532-19a323767493/optimized.webp"
        title={
          <>
            Cut operating costs with{" "}
            <span className="text-green-300">commercial solar.</span>
          </>
        }
        subtitle="Scalable commercial solar that reduces overheads and meets your sustainability goals. From 30kW rooftops to 100kW+ installations — with ROI modelling, finance and ongoing support."
        servicesHeading="What we provide for your business"
        services={SERVICES}
        systemsHeading="Commercial systems"
        systemsIntro="Standard commercial configurations for offices, warehouses and industrial sites. Choose a size to see the full spec, or talk to us about a custom multi-inverter design."
      />
    </SiteLayout>
  );
}
