import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon, type IconName } from "@/components/ui/Icon";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbLd, ORG_ID, WEBSITE_ID } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/seo/site";
import { PHONE, PHONE_HREF } from "@/lib/nav";

export const metadata = pageMetadata({
  title: "About Us · Australian Renewable Energy",
  description:
    "Founded in 2016, Kratos Energy delivers integrated solar, battery, EPC and renewable project development across Australia. From rooftops to megawatt infrastructure.",
  path: "/about",
  keywords: [
    "About Kratos Energy",
    "Australian solar company",
    "solar EPC contractor Australia",
    "renewable energy developer NSW",
    "commercial solar installers",
    "battery energy storage systems",
  ],
});

/** 6 Core Capabilities across scale */
const CAPABILITIES: {
  id: string;
  title: string;
  badge: string;
  description: string;
  icon: IconName;
  href?: string;
}[] = [
  {
    id: "residential",
    title: "Residential",
    badge: "Rooftop Solar & Storage",
    description:
      "Solar and battery systems designed around the household's energy consumption, roof conditions and future energy requirements.",
    icon: "sun",
    href: "/residential-solar",
  },
  {
    id: "commercial",
    title: "Commercial & Industrial",
    badge: "30kW to 100kW+",
    description:
      "Solar PV, battery storage and tailored energy solutions designed to reduce electricity expenditure and improve long-term energy resilience.",
    icon: "building",
    href: "/commercial-solar",
  },
  {
    id: "solar-farms",
    title: "Solar Farms & BESS",
    badge: "Utility-Scale Storage",
    description:
      "Development of small, medium and large-scale renewable projects, including solar farms integrated with Battery Energy Storage Systems.",
    icon: "battery",
    href: "/packages/large-scale",
  },
  {
    id: "development",
    title: "Renewable Project Development",
    badge: "Feasibility to Approvals",
    description:
      "Development of investment-ready and shovel-ready renewable energy opportunities, from early-stage assessment through approvals and construction readiness.",
    icon: "trend",
    href: "/projects",
  },
  {
    id: "epc",
    title: "EPC",
    badge: "Turnkey Delivery",
    description:
      "Engineering, Procurement and Construction capability supporting renewable energy projects from design through commissioning.",
    icon: "shield",
  },
  {
    id: "om",
    title: "Operations & Maintenance",
    badge: "Asset Longevity",
    description:
      "Ongoing system monitoring, maintenance and technical support designed to protect system performance throughout its operational life.",
    icon: "wrench",
    href: "/support",
  },
];

/** 4-Stage Methodology */
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Understand",
    lead: "Assess Before Recommending",
    body: "Every project starts by understanding the customer, site, energy profile and long-term objectives. We assess the opportunity before recommending the solution.",
    icon: "sun" as IconName,
  },
  {
    num: "02",
    title: "Design",
    lead: "Engineered for Performance",
    body: "Our team develops a tailored energy solution balancing generation, storage, system performance, commercial objectives and future energy requirements.",
    icon: "zap" as IconName,
  },
  {
    num: "03",
    title: "Deliver",
    lead: "Coordinated Execution",
    body: "From procurement and engineering to installation, commissioning and project management, Kratos coordinates the critical stages required to bring the project to life.",
    icon: "shield" as IconName,
  },
  {
    num: "04",
    title: "Support",
    lead: "Long-Term Protection",
    body: "Our involvement does not end when the system is switched on. Through monitoring, technical support and O&M services, we help customers maintain performance and value throughout the life of their renewable-energy assets.",
    icon: "wrench" as IconName,
  },
];

/** 7 Value Pillars */
const WHY_KRATOS = [
  {
    title: "Integrated Capability",
    description:
      "From system design and development to EPC, batteries, financing solutions and O&M.",
    icon: "zap" as IconName,
  },
  {
    title: "Experience Across Scale",
    description:
      "Capability extending from residential kilowatt systems to commercial and multi-megawatt renewable projects.",
    icon: "trend" as IconName,
  },
  {
    title: "Tailored Solutions",
    description:
      "Energy systems are developed around the site and customers rather than forcing customers into a standard package.",
    icon: "check" as IconName,
  },
  {
    title: "Solar + Storage Expertise",
    description:
      "Combining renewable generation and energy storage to create smarter and more resilient energy solutions.",
    icon: "battery" as IconName,
  },
  {
    title: "Australian Focus",
    description:
      "Experience delivering and developing renewable-energy projects within the Australian energy environment.",
    icon: "award" as IconName,
  },
  {
    title: "Long-Term Thinking",
    description:
      "We consider performance, economics, maintenance and future energy requirements—not simply the installation itself.",
    icon: "shield" as IconName,
  },
  {
    title: "Innovation & Collaboration",
    description:
      "Our involvement with universities, industry partners and community initiatives supports the development of new renewable-energy applications.",
    icon: "leaf" as IconName,
  },
];

export default function AboutUsPage() {
  const url = absoluteUrl("/about");

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: "About Us · Kratos Energy",
    description:
      "Founded in 2016, Kratos Energy is an Australian renewable energy company specializing in solar, battery storage, EPC, and project development.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };

  const breadcrumbs = breadcrumbLd([
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ]);

  return (
    <SiteLayout>
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbs} />

      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION
         ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0c3b28] via-[#092d1f] to-[#0a2e20] text-white">
        {/* Background glow & subtle solar radial light */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-15 [background:radial-gradient(circle_at_top_right,rgba(108,174,52,0.4)_0%,transparent_60%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-green-500/10 blur-3xl"
        />

        <div className="container-ke relative pb-16 pt-16 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28">
          <div className="max-w-3xl">
            <Eyebrow light className="mb-4">
              About Us — Kratos Energy
            </Eyebrow>

            <h1 className="font-display text-[clamp(36px,5.2vw,64px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-white [text-wrap:balance]">
              Powering Australia’s{" "}
              <span className="bg-gradient-to-r from-green-400 to-green-200 bg-clip-text text-transparent">
                Energy Transition
              </span>
            </h1>

            <p className="mt-4 font-display text-[clamp(18px,2.2vw,24px)] font-bold text-green-300">
              From rooftops to renewable infrastructure.
            </p>

            <div className="mt-6 flex flex-col gap-4 font-body text-[17px] leading-relaxed text-[#c7dfd2] sm:text-[18.5px]">
              <p>
                Kratos Energy delivers integrated solar, battery and renewable
                energy solutions designed for homes, businesses, communities and
                large-scale energy projects across Australia.
              </p>
              <p>
                From residential and commercial solar installations to battery
                energy storage, solar farm development, EPC and long-term
                operations, we bring together the expertise, technology and
                partnerships needed to turn renewable energy opportunities into
                real-world outcomes.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#who-we-are"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-7 py-3.5 font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
              >
                Discover Kratos Energy
                <Icon name="arrow" size={18} stroke={2.4} />
              </a>

              <Link
                href="/projects"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill border border-white/25 bg-white/10 px-7 py-3.5 font-display text-[15.5px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:border-white/40"
              >
                Explore Our Projects
              </Link>
            </div>
          </div>

          {/* Quick Metrics / Authority Strip */}
          <div className="mt-14 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-6">
            <div>
              <div className="font-display text-[clamp(24px,3vw,34px)] font-extrabold text-gold-400">
                2016
              </div>
              <div className="font-body text-xs text-[#a9c4a3] sm:text-sm">
                Founded in Australia
              </div>
            </div>
            <div>
              <div className="font-display text-[clamp(24px,3vw,34px)] font-extrabold text-white">
                kW to MW
              </div>
              <div className="font-body text-xs text-[#a9c4a3] sm:text-sm">
                Rooftops to Solar Farms
              </div>
            </div>
            <div>
              <div className="font-display text-[clamp(24px,3vw,34px)] font-extrabold text-white">
                NSW · VIC · ACT
              </div>
              <div className="font-body text-xs text-[#a9c4a3] sm:text-sm">
                Active Service Footprint
              </div>
            </div>
            <div>
              <div className="font-display text-[clamp(24px,3vw,34px)] font-extrabold text-green-400">
                CEC Approved
              </div>
              <div className="font-body text-xs text-[#a9c4a3] sm:text-sm">
                Accredited Clean Energy Retailer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. WHO WE ARE
         ───────────────────────────────────────────────────────────── */}
      <section id="who-we-are" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="container-ke">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow className="mb-3">Who We Are</Eyebrow>
              <h2 className="font-display text-[clamp(30px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
                Renewable Energy.{" "}
                <span className="text-green-600">
                  Engineered for the Real World.
                </span>
              </h2>

              <div className="mt-6 flex flex-col gap-4 font-body text-[16.5px] leading-relaxed text-ash-700">
                <p>
                  Founded in 2016, Kratos Energy is an Australian renewable energy
                  company specializing in the development, engineering,
                  construction and operation of solar and energy-storage
                  projects.
                </p>
                <p>
                  Our experience extends across the renewable energy
                  landscape—from residential and commercial rooftops to
                  ground-mounted solar farms and megawatt-scale infrastructure.
                </p>
                <p>
                  We work closely with customers, engineering partners, network
                  providers, communities and industry stakeholders to develop
                  energy solutions that are practical, financially considered and
                  built for long-term performance.
                </p>
              </div>

              {/* Callout box: Our Objective */}
              <div className="mt-8 rounded-lg border-l-4 border-green-500 bg-paper p-6 sm:p-7">
                <div className="font-display text-xs font-bold uppercase tracking-[0.08em] text-green-700">
                  Our Objective
                </div>
                <p className="mt-2 font-display text-[18px] font-bold leading-snug text-navy-900 sm:text-[20px]">
                  &ldquo;Make clean energy more accessible, more reliable and more
                  valuable for the people and organizations that use it.&rdquo;
                </p>
              </div>
            </div>

            {/* Right side card — Heritage & Headquarters */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-ash-200 bg-paper p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-green-100 text-green-700">
                  <Icon name="award" size={26} stroke={2.2} />
                </div>

                <h3 className="mt-5 font-display text-[22px] font-extrabold text-navy-800">
                  Australian Innovation Campus
                </h3>
                <p className="mt-3 font-body text-[15px] leading-relaxed text-ash-700">
                  Based at <strong>iAccelerate</strong>, University of Wollongong
                  Innovation Campus, Kratos Energy combines cutting-edge academic
                  research partnerships with rigorous on-the-ground engineering.
                </p>

                <div className="mt-6 border-t border-ash-200 pt-6">
                  <div className="flex items-start gap-3 text-sm text-ash-700">
                    <Icon
                      name="mapPin"
                      size={18}
                      className="mt-0.5 flex-none text-green-600"
                    />
                    <span>
                      SmartSpace Suite 66, Enterprise 1, Squires Way, North
                      Wollongong NSW 2500
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 text-sm text-ash-700">
                  <Icon name="shield" size={18} className="flex-none text-green-600" />
                  <span>Clean Energy Council Approved Seller</span>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    href="/contact"
                    className="ke-press inline-flex items-center gap-2 font-display text-sm font-bold text-green-600 hover:text-green-700"
                  >
                    Contact our engineering team
                    <Icon name="arrow" size={16} stroke={2.4} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. WHAT MAKES KRATOS DIFFERENT
         ───────────────────────────────────────────────────────────── */}
      <section id="different" className="scroll-mt-20 bg-paper py-16 sm:py-24">
        <div className="container-ke">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center className="mb-3">
              What Makes Kratos Different
            </Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
              From Kilowatts to Megawatts
            </h2>
            <p className="mt-4 font-body text-[17px] leading-relaxed text-ash-700">
              Renewable energy is not a one-size-fits-all solution. A homeowner
              looking to reduce grid dependence has very different requirements
              from a commercial facility managing daytime energy demand, or an
              investor developing a multi-megawatt solar and battery project.
            </p>
            <p className="mt-2 font-display text-[16.5px] font-bold text-green-700">
              Kratos Energy brings these capabilities together under one
              renewable energy platform.
            </p>
          </div>

          {/* 6 Capabilities Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.id}
                className="ke-lift flex flex-col justify-between rounded-xl border border-ash-200 bg-white p-7 shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-green-50 text-green-600">
                      <Icon name={cap.icon} size={24} stroke={2} />
                    </span>
                    <span className="rounded-pill bg-mist px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider text-ash-700">
                      {cap.badge}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-[21px] font-extrabold text-navy-900">
                    {cap.title}
                  </h3>

                  <p className="mt-3 font-body text-[15px] leading-relaxed text-ash-700">
                    {cap.description}
                  </p>
                </div>

                {cap.href && (
                  <div className="mt-6 border-t border-ash-200 pt-4">
                    <Link
                      href={cap.href}
                      className="inline-flex items-center gap-1.5 font-display text-[13.5px] font-bold text-green-600 transition-colors hover:text-green-700"
                    >
                      Learn more
                      <Icon name="arrow" size={14} stroke={2.4} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. OUR APPROACH
         ───────────────────────────────────────────────────────────── */}
      <section id="approach" className="scroll-mt-20 bg-white py-16 sm:py-24">
        <div className="container-ke">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow center className="mb-3">
              Our Approach
            </Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
              Built Around Your Energy Needs
            </h2>
            <p className="mt-4 font-body text-[17px] leading-relaxed text-ash-700">
              We apply an engineering-first, structured workflow to guarantee
              maximum financial yield, safety and long-term asset reliability.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.num}
                className="relative flex flex-col rounded-xl border border-ash-200 bg-paper p-7"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-[32px] font-extrabold tracking-tight text-green-600">
                    {step.num}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-700">
                    <Icon name={step.icon} size={18} stroke={2.2} />
                  </span>
                </div>

                <h3 className="mt-4 font-display text-[22px] font-extrabold text-navy-900">
                  {step.title}
                </h3>
                <div className="mt-1 font-display text-xs font-bold uppercase tracking-wider text-green-700">
                  {step.lead}
                </div>

                <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ash-700">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. PURPOSE, VISION & MISSION
         ───────────────────────────────────────────────────────────── */}
      <section
        id="purpose"
        className="scroll-mt-20 bg-gradient-to-b from-[#0a2e20] to-[#0c3b28] py-16 text-white sm:py-24"
      >
        <div className="container-ke">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow light center className="mb-3">
              Guiding Principles
            </Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              Purpose, Vision &amp; Mission
            </h2>
            <p className="mt-3 font-body text-[17px] text-[#c7dfd2]">
              The core principles driving our engineering, team and customer
              commitments every day.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-3">
            {/* Purpose */}
            <div className="flex flex-col rounded-xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <span className="mb-5 inline-block rounded-md bg-green-500/20 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-green-300">
                Our Purpose
              </span>
              <h3 className="font-display text-[24px] font-extrabold text-white">
                Making Sustainable Energy Work
              </h3>
              <div className="mt-4 flex flex-col gap-3 font-body text-[15px] leading-relaxed text-[#c7dfd2]">
                <p>
                  Our purpose is to accelerate the transition towards cleaner
                  energy by developing renewable-energy solutions that create
                  measurable environmental, operational and economic value.
                </p>
                <p>
                  We believe renewable energy should not simply be installed. It
                  should be engineered intelligently, deployed responsibly and
                  supported for the long term.
                </p>
                <p className="font-semibold text-white">
                  Whether the project is a family home, a commercial facility, a
                  community energy initiative or a multi-megawatt solar
                  development, our focus remains the same.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="flex flex-col rounded-xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <span className="mb-5 inline-block rounded-md bg-gold-400/20 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-gold-300">
                Our Vision
              </span>
              <h3 className="font-display text-[24px] font-extrabold text-white">
                A Future Powered by Smarter, Cleaner Energy
              </h3>
              <div className="mt-4 flex flex-col gap-3 font-body text-[15px] leading-relaxed text-[#c7dfd2]">
                <p>
                  Our vision is an Australia where renewable energy is not
                  considered an alternative source of power, but an essential
                  part of homes, businesses, communities and critical
                  infrastructure.
                </p>
                <p>
                  We aim to contribute to that future through solar, battery
                  storage, renewable project development, engineering and
                  innovation.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="flex flex-col rounded-xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm">
              <span className="mb-5 inline-block rounded-md bg-green-500/20 px-3.5 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-green-300">
                Our Mission
              </span>
              <h3 className="font-display text-[24px] font-extrabold text-white">
                Turning Renewable Potential into Real Energy Solutions
              </h3>
              <div className="mt-4">
                <div className="mb-3 font-body text-[15px] text-[#c7dfd2]">
                  Our mission is to:
                </div>
                <ul className="flex flex-col gap-2.5 font-body text-[14.5px] leading-snug text-[#eaf3e6]">
                  {[
                    "Develop renewable-energy opportunities with long-term value.",
                    "Engineer reliable and commercially considered energy systems.",
                    "Deliver projects safely and effectively.",
                    "Innovate through research, partnerships and emerging technologies.",
                    "Support our customers and renewable assets beyond installation.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Icon
                        name="check"
                        size={16}
                        stroke={3}
                        className="mt-0.5 flex-none text-green-400"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. WHY KRATOS ENERGY?
         ───────────────────────────────────────────────────────────── */}
      <section id="why-kratos" className="scroll-mt-20 bg-paper py-16 sm:py-24">
        <div className="container-ke">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow center className="mb-3">
              Why Kratos Energy?
            </Eyebrow>
            <h2 className="font-display text-[clamp(30px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-900">
              More Than Solar.{" "}
              <span className="text-green-600">A Renewable Energy Partner.</span>
            </h2>
            <p className="mt-4 font-body text-[17px] leading-relaxed text-ash-700">
              We partner with you for the complete lifecycle of your clean energy
              investment.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_KRATOS.map((item, idx) => (
              <div
                key={item.title}
                className={`ke-lift flex flex-col rounded-xl border border-ash-200 bg-white p-7 shadow-sm ${
                  idx === 6 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-green-50 text-green-600">
                  <Icon name={item.icon} size={22} stroke={2.2} />
                </div>

                <h3 className="mt-4 font-display text-[19px] font-extrabold text-navy-900">
                  {item.title}
                </h3>

                <p className="mt-2.5 font-body text-[14.5px] leading-relaxed text-ash-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM CALL TO ACTION (CTA DIV)
         ───────────────────────────────────────────────────────────── */}
      <section
        id="cta"
        className="relative overflow-hidden bg-gradient-to-br from-[#0c3b28] via-[#092e1f] to-[#061e14] py-16 text-white sm:py-20 lg:py-24"
      >
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_center,rgba(108,174,52,0.45)_0%,transparent_70%)]"
        />

        <div className="container-ke relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-3 inline-block rounded-pill border border-gold-400/35 bg-gold-400/10 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-gold-300">
              Take the Next Step
            </span>

            <h2 className="mt-2 font-display text-[clamp(32px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-white [text-wrap:balance]">
              Ready to Power Your Energy Transition?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl font-body text-[17px] leading-relaxed text-[#c7dfd2] sm:text-[18.5px]">
              Whether you are looking for a high-efficiency residential solar
              system, commercial power bill reduction, or multi-megawatt
              renewable project development—our engineers are here to assist.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-a-quote"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-8 py-4 font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
              >
                Request a Free Consultation
                <Icon name="arrow" size={18} stroke={2.4} />
              </Link>

              <a
                href={PHONE_HREF}
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill border border-white/25 bg-white/10 px-8 py-4 font-display text-[16px] font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Icon name="phone" size={18} className="text-green-400" />
                Call {PHONE}
              </a>

              <Link
                href="/#systems"
                className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill border border-transparent px-6 py-4 font-display text-[15px] font-semibold text-green-300 hover:text-white"
              >
                Explore Solar Packages
              </Link>
            </div>

            {/* Credential row */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-xs font-body text-[#a9c4a3] sm:text-sm">
              <span className="flex items-center gap-2">
                <Icon name="shield" size={16} className="text-green-400" />
                Clean Energy Council Approved Seller
              </span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <span className="flex items-center gap-2">
                <Icon name="award" size={16} className="text-gold-400" />
                25-Year Performance Warranties
              </span>
              <span className="hidden sm:inline" aria-hidden>
                ·
              </span>
              <span className="flex items-center gap-2">
                <Icon name="mapPin" size={16} className="text-green-400" />
                NSW · Victoria · ACT
              </span>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
