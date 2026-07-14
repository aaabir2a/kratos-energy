import Link from "next/link";
import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Large-Scale Solar Projects Australia | Solar Farms & BESS",
  description:
    "Kratos Energy develops and delivers large-scale solar projects, commercial solar systems, solar farms, Battery Energy Storage Solutions, and investor-ready renewable energy opportunities across Australia.",
  keywords: [
    "Large-scale solar projects Australia",
    "Solar farm development Australia",
    "Utility-scale solar Australia",
    "Solar EPC company Australia",
    "Battery Energy Storage Systems Australia",
    "BESS projects Australia",
    "Ready-to-build solar farm investment",
  ],
};

const HERO_IMAGE =
  "https://api.kratos-energy.com/kratos-uploads/hero/desktop/169b3551-ce95-4008-bb93-06aefc2257db/optimized.webp";

/* --------------------------------------------------------------- content -- */

type Capability = { icon: IconName; title: string; body: string };

const CAPABILITIES: Capability[] = [
  {
    icon: "sun",
    title: "Solar Farm Development",
    body: "We identify, assess, and develop solar farm opportunities with a focus on site suitability, grid connection potential, regulatory feasibility, and long-term generation value.",
  },
  {
    icon: "wrench",
    title: "EPC & Project Construction",
    body: "Engineering, Procurement and Construction support for commercial and utility-scale solar, delivered with technical precision, quality control and reliable execution.",
  },
  {
    icon: "battery",
    title: "Battery Energy Storage Systems",
    body: "We integrate BESS to improve energy flexibility, grid stability, load management and renewable energy utilisation for commercial and large-scale applications.",
  },
  {
    icon: "zap",
    title: "Grid Connection & Network Coordination",
    body: "We support grid connection, network provider coordination, technical approvals and compliance requirements to help projects move forward efficiently.",
  },
  {
    icon: "trend",
    title: "Project Investment Opportunities",
    body: "Investor-ready renewable projects, including ready-to-build solar farm opportunities designed for long-term participation in Australia's clean energy transition.",
  },
  {
    icon: "shield",
    title: "Operations & Maintenance",
    body: "Ongoing performance support through monitoring, maintenance planning, system optimisation and operational support to maximise output and asset reliability.",
  },
];

type FarmProject = { name: string; type: string; location: string; overview: string };

const FARMS: FarmProject[] = [
  {
    name: "Kerta Solar Farm",
    type: "Solar Farm",
    location: "Australia",
    overview:
      "Reflects Kratos Energy's capability in developing and delivering renewable energy infrastructure that supports clean power generation and long-term sustainability.",
  },
  {
    name: "Northern Solar Farm",
    type: "Solar Farm",
    location: "Australia",
    overview:
      "Demonstrates Kratos Energy's commitment to expanding solar generation capacity through well-planned, future-focused renewable energy projects.",
  },
  {
    name: "South Hammock 1",
    type: "Solar Farm",
    location: "Australia",
    overview:
      "Part of Kratos Energy's large-scale portfolio, supporting the transition toward cleaner energy systems and sustainable infrastructure development.",
  },
  {
    name: "South Hammock 2",
    type: "Solar Farm",
    location: "Australia",
    overview:
      "Further strengthens Kratos Energy's presence in solar farm development and our experience managing renewable assets across project stages.",
  },
];

type CommercialProject = {
  name: string;
  overview: string;
  metrics: { label: string; value: string }[];
};

const COMMERCIAL: CommercialProject[] = [
  {
    name: "Mollymook Club, NSW",
    overview:
      "Highlights the financial and environmental value of commercial solar — cutting energy costs and lowering emissions while improving long-term operating efficiency.",
    metrics: [
      { label: "System size", value: "99 kW" },
      { label: "Annual generation", value: "142,076 kWh" },
      { label: "Annual carbon cut", value: "120 t" },
      { label: "Annual bill savings", value: "~$32,500" },
      { label: "Estimated ROI", value: "2.5 yrs" },
    ],
  },
  {
    name: "Mudgee Soldiers Club, NSW",
    overview:
      "Showcases the strong commercial potential of larger rooftop systems — significant annual savings, reduced emissions and a short return-on-investment period.",
    metrics: [
      { label: "System size", value: "337 kW" },
      { label: "Annual generation", value: "483,409 kWh" },
      { label: "Annual carbon cut", value: "407.8 t" },
      { label: "Annual bill savings", value: "~$96,681" },
      { label: "Estimated ROI", value: "3 yrs" },
    ],
  },
];

const PROCESS = [
  {
    title: "Site Identification & Feasibility",
    body: "We assess land, solar resource potential, grid proximity, planning requirements and project viability.",
  },
  {
    title: "Technical & Commercial Planning",
    body: "We evaluate system design, generation capacity, financial modelling, energy usage and return potential.",
  },
  {
    title: "Approvals & Network Coordination",
    body: "We support development approvals, network provider engagement, grid connection and compliance processes.",
  },
  {
    title: "Engineering, Procurement & Construction",
    body: "We coordinate design, equipment selection, procurement, installation and construction management.",
  },
  {
    title: "Commissioning & Operation",
    body: "We support testing, commissioning, performance monitoring and long-term operational reliability.",
  },
];

const WHY: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "award",
    title: "Experienced in Renewable Energy Development",
    body: "Since 2016, involved in renewable energy development, construction, operation and delivery across key Australian markets.",
  },
  {
    icon: "mapPin",
    title: "Strong Local & Network Relationships",
    body: "Close coordination with local government, regulatory stakeholders and network providers supports smoother approval pathways.",
  },
  {
    icon: "wrench",
    title: "End-to-End Project Management",
    body: "From early-stage development to construction and operation — integrated support that reduces complexity and improves delivery.",
  },
  {
    icon: "trend",
    title: "Commercially Focused Solutions",
    body: "Projects designed around performance, return on investment, energy savings and long-term asset value.",
  },
  {
    icon: "leaf",
    title: "Sustainability with Real Impact",
    body: "Built to reduce emissions, support clean energy adoption and advance Australia's transition to a sustainable energy future.",
  },
];

const PARTNERS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "trend",
    title: "For Investors",
    body: "Access renewable energy project opportunities with long-term growth potential in Australia's expanding clean energy sector.",
  },
  {
    icon: "sun",
    title: "For Landowners",
    body: "Explore how suitable land can be transformed into productive renewable energy infrastructure.",
  },
  {
    icon: "building",
    title: "For Businesses",
    body: "Reduce energy costs, improve sustainability performance and strengthen long-term operational efficiency.",
  },
  {
    icon: "zap",
    title: "For Strategic Partners",
    body: "Collaborate on solar farms, BESS projects, commercial rooftop systems and community-focused initiatives.",
  },
];

const SUSTAINABILITY = [
  "Reduced carbon emissions",
  "Increased renewable energy generation",
  "Lower energy costs for commercial clients",
  "Improved energy independence",
  "Long-term sustainability leadership",
  "Community-focused renewable infrastructure",
];

/* ----------------------------------------------------------------- page --- */

export default function LargeScalePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate flex min-h-[560px] flex-col justify-center overflow-hidden bg-forest-900 py-16 text-white lg:py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_IMAGE}
          alt="Utility-scale solar farm at dusk"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0c3b28_6%,rgba(12,59,40,0.85)_40%,rgba(12,59,40,0.45)_72%,rgba(12,59,40,0.15)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent" />

        <div className="container-ke relative z-10">
          <nav className="mb-7 flex items-center gap-2 font-body text-[13.5px] text-white/60">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Icon name="chevron" size={14} className="-rotate-90 opacity-50" />
            <span className="font-semibold text-green-300">Our Products</span>
            <Icon name="chevron" size={14} className="-rotate-90 opacity-50" />
            <span className="font-semibold text-white">Large-Scale Systems</span>
          </nav>

          <div className="max-w-[760px]">
            <Eyebrow light>Utility-Scale · Commercial · BESS</Eyebrow>
            <h1 className="mt-3 font-display text-[clamp(38px,5vw,66px)] font-extrabold leading-[0.98] tracking-[-0.025em] text-white [text-wrap:balance]">
              Powering Australia&rsquo;s future through{" "}
              <span className="text-green-300">large-scale solar.</span>
            </h1>
            <p className="mt-5 max-w-[560px] font-body text-[18px] leading-relaxed text-white/85">
              Kratos Energy develops, constructs and delivers utility-scale solar
              farms, commercial solar systems, Battery Energy Storage Solutions,
              and investor-ready renewable energy projects across Australia.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[32px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
              >
                Discuss a Project <Icon name="arrow" size={20} stroke={2.4} />
              </a>
              <a
                href="#investors"
                className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-white/25 bg-white/10 px-7 py-[14px] font-display text-[16px] font-bold text-white transition-colors hover:bg-white/20"
              >
                Explore Investment
              </a>
              <a
                href="#projects"
                className="ke-press inline-flex items-center gap-2.5 rounded-pill border-[1.5px] border-white/25 bg-white/10 px-7 py-[14px] font-display text-[16px] font-bold text-white transition-colors hover:bg-white/20"
              >
                View Our Projects
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white py-[84px]">
        <div className="container-ke grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>End-to-End Delivery</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy-700">
              End-to-end renewable energy project delivery.
            </h2>
          </div>
          <div className="flex flex-col gap-4 font-body text-[16.5px] leading-relaxed text-ash-700">
            <p>
              Kratos Energy specialises in the development, construction,
              operation and delivery of large-scale renewable energy projects
              across Australia. From commercial rooftop solar to solar farms and
              Battery Energy Storage Systems, we provide complete project
              solutions built for long-term performance, financial viability and
              clean energy impact.
            </p>
            <p>
              With experience across South Australia, Victoria and New South
              Wales, we work closely with local authorities, network providers,
              investors, landowners and commercial clients to bring projects from
              concept to operation.
            </p>
            <p>
              Our approach combines technical expertise, regulatory coordination,
              commercial planning and sustainable engineering to create
              infrastructure that delivers measurable value.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-paper py-[84px]">
        <div className="container-ke">
          <div className="mb-12 max-w-[640px]">
            <Eyebrow>Core Capabilities</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Large-scale solar capabilities built for performance.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c) => (
              <div
                key={c.title}
                className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-md"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-[16px] bg-green-50 text-green-600">
                  <Icon name={c.icon} size={28} />
                </span>
                <h3 className="mb-2 font-display text-[19px] font-bold text-navy-700">
                  {c.title}
                </h3>
                <p className="font-body text-[14.5px] leading-relaxed text-ash-700">
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {/* <section id="projects" className="scroll-mt-24 bg-white py-[84px]">
        <div className="container-ke">
          <div className="mb-12 max-w-[680px]">
            <Eyebrow>Featured Projects</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Proven renewable energy projects across Australia.
            </h2>
            <p className="mt-3 font-body text-[16.5px] leading-relaxed text-ash-700">
              A growing portfolio ranging from commercial rooftop installations
              to operational solar farms and large-scale clean energy
              developments.
            </p>
          </div>

         
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FARMS.map((p) => (
              <article
                key={p.name}
                className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-paper p-6"
              >
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-pill bg-forest-900/90 px-3 py-1.5 font-display text-[11.5px] font-bold text-white">
                  <Icon name="sun" size={13} /> {p.type}
                </span>
                <h3 className="font-display text-[18px] font-bold text-navy-700">
                  {p.name}
                </h3>
                <div className="mt-1 flex items-center gap-1.5 font-body text-[13px] font-semibold text-forest-700">
                  <Icon name="mapPin" size={13} /> {p.location}
                </div>
                <p className="mt-3 font-body text-[14px] leading-relaxed text-ash-700">
                  {p.overview}
                </p>
              </article>
            ))}
          </div>

      
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {COMMERCIAL.map((p) => (
              <article
                key={p.name}
                className="flex flex-col rounded-xl border-2 border-green-500/70 bg-white p-7 shadow-lg"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-green-50 text-green-600">
                    <Icon name="building" size={22} />
                  </span>
                  <h3 className="font-display text-[20px] font-extrabold text-navy-700">
                    {p.name}
                  </h3>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-display text-[20px] font-extrabold leading-none text-green-600">
                        {m.value}
                      </div>
                      <div className="mt-1 font-body text-[12px] font-semibold text-ash-700">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-5 font-body text-[14.5px] leading-relaxed text-ash-700">
                  {p.overview}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      {/* Development Approach */}
      <section className="bg-forest-900 py-[84px] text-white">
        <div className="container-ke">
          <div className="mb-12 max-w-[640px]">
            <Eyebrow light>Our Process</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-white">
              From site assessment to long-term operation.
            </h2>
            <p className="mt-3 font-body text-[16.5px] leading-relaxed text-[#a9c4a3]">
              Every large-scale project demands careful planning, technical
              expertise and strong coordination. We manage each stage with a
              structured, commercially focused approach.
            </p>
          </div>
          <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS.map((step, i) => (
              <li
                key={step.title}
                className="flex flex-col rounded-xl bg-white/[0.06] p-6 ring-1 ring-inset ring-white/10"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-display text-[16px] font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="mb-2 font-display text-[16px] font-bold text-white">
                  {step.title}
                </h3>
                <p className="font-body text-[13.5px] leading-relaxed text-[#a9c4a3]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-white py-[84px]">
        <div className="container-ke">
          <div className="mb-12 max-w-[640px]">
            <Eyebrow>Why Kratos Energy</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              A trusted partner for large-scale renewable energy.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w) => (
              <div key={w.title} className="flex gap-4">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-[12px] bg-green-50 text-green-600">
                  <Icon name={w.icon} size={22} />
                </span>
                <div>
                  <h3 className="mb-1.5 font-display text-[16.5px] font-bold text-navy-700">
                    {w.title}
                  </h3>
                  <p className="font-body text-[14.5px] leading-relaxed text-ash-700">
                    {w.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor / Partner */}
      <section id="investors" className="scroll-mt-24 bg-paper py-[84px]">
        <div className="container-ke">
          <div className="mb-12 max-w-[680px]">
            <Eyebrow>Partnership Opportunities</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Partner with Kratos Energy in Australia&rsquo;s renewable future.
            </h2>
            <p className="mt-3 font-body text-[16.5px] leading-relaxed text-ash-700">
              We work with investors, landowners, commercial property owners,
              businesses and strategic partners to develop projects that create
              both environmental and financial value — from ready-to-build solar
              farms to commercial rooftop solar and Battery Energy Storage.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <div
                key={p.title}
                className="ke-lift flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-md"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-[14px] bg-forest-900 text-green-300">
                  <Icon name={p.icon} size={24} />
                </span>
                <h3 className="mb-2 font-display text-[17px] font-bold text-navy-700">
                  {p.title}
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="#quote"
              className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[32px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
            >
              Start a partnership conversation{" "}
              <Icon name="arrow" size={20} stroke={2.4} />
            </a>
          </div>
        </div>
      </section>

      {/* Sustainability Impact */}
      <section className="bg-white py-[84px]">
        <div className="container-ke grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <Eyebrow>Sustainability</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em] text-navy-700">
              Creating clean energy impact beyond generation.
            </h2>
            <p className="mt-4 max-w-[440px] font-body text-[16.5px] leading-relaxed text-ash-700">
              Large-scale renewable projects are long-term infrastructure
              investments — supporting cleaner communities, lower emissions,
              improved resilience and a more sustainable economy.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            {SUSTAINABILITY.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-md border border-ash-200 bg-paper p-4 font-body text-[14.5px] font-semibold text-ink"
              >
                <Icon
                  name="leaf"
                  size={18}
                  stroke={2.4}
                  className="mt-0.5 flex-none text-green-500"
                />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}
