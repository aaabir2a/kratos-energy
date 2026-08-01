import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Free 7-Night Luxury Getaway Offer",
  description:
    "Switch to solar and battery with Kratos Energy and claim a complimentary seven-night luxury holiday accommodation in Bali, Phuket, or Mombasa. Eligible NSW homeowners can access government incentives & $0-interest loans up to $15,000.",
};

const DESTINATIONS = [
  {
    name: "Bali, Indonesia",
    image: "/assets/getaway-bali.png",
    description:
      "Indulge in a tropical paradise. Relax in a premium resort featuring lush green rice terrace vistas, stunning infinity pools, and serene traditional Balinese architectural details. Perfect for rejuvenating your mind and body.",
    highlights: ["Lush tropical surroundings", "Traditional spa treatments", "Private villa style resorts", "Infinity pools overlooking forests"],
  },
  {
    name: "Phuket, Thailand",
    image: "/assets/getaway-phuket.png",
    description:
      "Escape to the Pearl of the Andaman. Enjoy pristine white sandy beaches, crystal-clear turquoise waters, and world-class luxury beachside resorts. Experience vibrant night markets, exquisite Thai cuisine, and legendary hospitality.",
    highlights: ["Pristine white sand beaches", "Turquoise Andaman sea waters", "Exceptional local cuisine", "Ocean-view resort properties"],
  },
  {
    name: "Mombasa, Kenya",
    image: "/assets/getaway-mombasa.png",
    description:
      "Discover the exotic beauty of the African coast. Stay in a luxury resort on the white sands of the Indian Ocean, featuring classic Swahili-style architecture, thatched-roof pavilions, and rich cultural excursions.",
    highlights: ["Indian Ocean coastal escape", "Rich Swahili heritage & culture", "Pristine white-washed architecture", "Exotic marine life and safaris"],
  },
];

const PACKAGES = [
  {
    size: "6.6kW",
    audience: "2–4 People",
    idealFor: "Lower daytime use, work from home, singles/couples.",
    savings: "$1,800",
    specs: [
      "Trina 475W or Jinko Tier 1 panels",
      "5kW power inverter",
      "14 × 475W panels",
      "Single-phase compatible",
    ],
    recommended: false,
  },
  {
    size: "10kW",
    audience: "4–6 People",
    idealFor: "Multi zone Air-Con, full family appliance use, home theatre.",
    savings: "$2,310",
    specs: [
      "Trina 475W or Jinko Tier 1 panels",
      "8–10kW power inverter",
      "21 × 475W panels",
      "Battery & EV ready (hybrid-ready)",
    ],
    recommended: true,
  },
  {
    size: "13kW",
    audience: "6–10 People",
    idealFor: "High-powered loads, heated pool/spa, EV charging station.",
    savings: "$2,900",
    specs: [
      "Trina 475W or Jinko Tier 1 panels",
      "10kW power inverter",
      "27 × 475W panels",
      "Three-phase compatible",
    ],
    recommended: false,
  },
];

const STEPS = [
  {
    num: "01",
    title: "Request Free Assessment",
    text: "Call 1300 089 547 or click the button below to request your free, no-obligation solar-and-battery design quotation.",
  },
  {
    num: "02",
    title: "Choose Your Package",
    text: "Select a residential solar and battery storage package sized perfectly for your home's daily electricity usage.",
  },
  {
    num: "03",
    title: "Confirm Within 7 Days",
    text: "Accept your quotation, sign your contract, and pay the 10% deposit within 7 days to secure your complimentary accommodation.",
  },
  {
    num: "04",
    title: "Receive Your Getaway",
    text: "Claim a free voucher for 7 nights of luxury resort accommodation in Bali, Phuket, or Mombasa! Pack your bags and start saving.",
  },
];

export default function LuxuryGetawayPage() {
  return (
    <SiteLayout>
      {/* Campaign Hero Section */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-24 text-white">
        {/* Ambient Blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-ke relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7">
              <div className="mb-4 inline-flex items-center gap-2 rounded-pill border border-gold-400/40 bg-gold-400/15 px-3.5 py-1.5">
                <Icon name="clock" size={15} className="text-gold-400" />
                <span className="font-display text-[12px] font-bold tracking-[0.05em] text-gold-400 uppercase">
                  Limited Time Offer · 7-Day Window
                </span>
              </div>

              <h1 className="font-display text-[clamp(32px,4.5vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
                Power Your Home. <br />
                Get a Free <span className="text-gold-400 text-glow">Luxury Getaway!</span>
              </h1>

              <p className="mt-5 max-w-[620px] font-body text-[18px] sm:text-[19.5px] leading-relaxed text-[#c4d2ef]">
                Thinking about going solar? Switch to solar and battery storage with Kratos Energy today, slash your power bills, and reward yourself with a complimentary <strong className="text-white">7-night luxury getaway to Bali, Phuket, or Mombasa!</strong>
              </p>

              {/* NSW Incentives Card */}
              <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.05] p-6 max-w-[620px] backdrop-blur-sm">
                <div className="flex items-center gap-3 font-display text-[17px] font-bold text-white">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500 text-white">
                    <Icon name="shield" size={16} stroke={2.5} />
                  </span>
                  NSW Government Incentives Available
                </div>
                <p className="mt-3.5 font-body text-[14.5px] leading-relaxed text-[#a8bcdb]">
                  Eligible New South Wales homeowners may access state government incentives and a <strong className="text-white">zero-interest loan of up to $15,000</strong>, repayable over up to <strong className="text-white">10 years</strong>.
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-bold text-gold-300">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="check" size={14} stroke={3} className="text-green-400" /> $0 Upfront Finance
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="check" size={14} stroke={3} className="text-green-400" /> Repay Up to 10 Years
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="check" size={14} stroke={3} className="text-green-400" /> Interest-Free
                  </span>
                </div>
              </div>
            </div>

            {/* Right lead form column */}
            <div className="lg:col-span-5">
              <LeadForm
                formId="2f859ddd-beca-4399-a893-c2ac3e83aae7"
                staticTitle="Claim Your Free Quote & Getaway"
                staticSubmitLabel="Claim My Getaway Now"
                successNote="Thanks! Your luxury getaway assessment request has been received. A Kratos Energy specialist will call you within one business day."
                className="rounded-xl border border-white/10 bg-white p-[30px] shadow-2xl relative"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Campaign Process Section */}
      <section className="bg-white py-16 sm:py-24 border-b border-ash-200">
        <div className="container-ke">
          <div className="mb-14 text-center">
            <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Go Solar & Start Packing
            </h2>
            <p className="mx-auto mt-3.5 max-w-[580px] font-body text-base sm:text-lg text-ash-700">
              Securing your complimentary luxury accommodation is simple. Just follow these steps within seven days of receiving your quotation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="relative rounded-xl border border-ash-200 bg-paper p-6 transition-all duration-200 hover:-translate-y-1 hover:border-green-500 hover:shadow-md"
              >
                <div className="font-display text-[44px] font-extrabold leading-none text-green-500/25 mb-4">
                  {s.num}
                </div>
                <h3 className="font-display text-[17px] font-extrabold text-navy-800 mb-2">
                  {s.title}
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Showcase Section */}
      <section className="bg-paper py-16 sm:py-24 border-b border-ash-200">
        <div className="container-ke">
          <div className="mb-14 text-center">
            <span className="font-display text-[13px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3.5 py-1.5 rounded-pill border border-green-200">
              Choose Your Paradise
            </span>
            <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700 mt-4">
              Three Luxury Destinations. Free Accommodation.
            </h2>
            <p className="mx-auto mt-3.5 max-w-[580px] font-body text-base text-ash-700">
              Accept your quotation and pay the 10% deposit within 7 days, and you will receive a complimentary 7-night voucher for luxury resort accommodation in your choice of:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {DESTINATIONS.map((d) => (
              <div
                key={d.name}
                className="flex flex-col bg-white rounded-xl overflow-hidden border border-ash-200 shadow-md ke-lift"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <span className="font-display text-xl font-extrabold text-white">
                      {d.name}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="font-body text-[14.5px] leading-relaxed text-ash-700">
                      {d.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {d.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 font-body text-[13.5px] text-ink font-semibold"
                        >
                          <Icon
                            name="check"
                            size={14}
                            stroke={3}
                            className="text-green-500 flex-none"
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-ash-200 text-xs font-bold text-forest-700 flex items-center gap-1.5">
                    <Icon name="award" size={14} className="text-gold-500" />
                    Complimentary 7-Night Resort Voucher Included
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-navy-900 text-white p-6 max-w-[800px] mx-auto text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
              <div className="text-left">
                <h4 className="font-display text-[18px] font-extrabold text-white">
                  Getaway Accommodation Details
                </h4>
                <p className="font-body text-[13.5px] text-[#c4d2ef] mt-1 max-w-[500px]">
                  Vouchers cover 7 nights of luxury resort accommodation for two adults. Destinations include curated, highly-rated resorts. Vouchers are valid for up to 18 months. Excludes flights and meals.
                </p>
              </div>
              <a href="tel:1300089547">
                <Button variant="gold" size="md" icon="phone">
                  Call 1300 089 547
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Residential Packages Section */}
      <section className="bg-white py-16 sm:py-24 border-b border-ash-200">
        <div className="container-ke">
          <div className="mb-14 text-center">
            <span className="font-display text-[13px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-3.5 py-1.5 rounded-pill border border-green-200">
              System Selection
            </span>
            <h2 className="font-display text-[clamp(28px,3.2vw,42px)] font-extrabold tracking-[-0.02em] text-navy-700 mt-4">
              Choose Your Solar-and-Battery Package
            </h2>
            <p className="mx-auto mt-3.5 max-w-[580px] font-body text-base text-ash-700">
              We size systems to match your roof space and household electricity usage. All packages feature premium tier-1 equipment and CEC accredited installation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto items-stretch">
            {PACKAGES.map((p) => (
              <div
                key={p.size}
                className={`relative flex flex-col rounded-lg bg-white p-7 border ${
                  p.recommended
                    ? "border-2 border-green-500 shadow-xl scale-[1.02] md:translate-y-[-4px]"
                    : "border-ash-200 shadow-md"
                }`}
              >
                {p.recommended && (
                  <span className="absolute -top-3.5 left-7 rounded-pill bg-green-500 px-3.5 py-[5px] font-display text-[11px] font-bold uppercase tracking-[0.06em] text-white">
                    Most Popular Sizing
                  </span>
                )}

                <div className="mt-1 font-display text-[38px] font-extrabold leading-none text-navy-800">
                  {p.size} System
                </div>
                <div className="mt-1 font-display text-[13.5px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded inline-block self-start mt-2">
                  Suitable for {p.audience}
                </div>

                <p className="mt-4 font-body text-[14px] leading-relaxed text-ash-700 min-h-[44px]">
                  <strong>Ideal for:</strong> {p.idealFor}
                </p>

                <div className="my-5 border-y border-ash-200 py-4">
                  <div className="font-body text-[12px] font-bold uppercase tracking-[0.06em] text-ash-500">
                    Est. Bill Savings
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="font-display text-[32px] font-extrabold leading-none text-green-600">
                      {p.savings}
                    </span>
                    <span className="pb-0.5 font-body text-[13px] font-semibold text-ash-500">
                      / year
                    </span>
                  </div>
                </div>

                <ul className="mb-8 flex flex-col gap-2.5">
                  {p.specs.map((s) => (
                    <li
                      key={s}
                      className="flex items-start gap-2 font-body text-[13.5px] text-ink"
                    >
                      <Icon
                        name="check"
                        size={14}
                        stroke={3}
                        className="flex-none text-green-500 mt-0.5"
                      />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <Link href="#quote" className="w-full block">
                    <Button
                      variant={p.recommended ? "primary" : "navy"}
                      size="md"
                      icon="arrow"
                      fullWidth
                    >
                      Enquire for Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-[680px] text-center font-body text-[12.5px] leading-relaxed text-ash-500">
            *Performance and savings figures are estimates based on NSW Clean Energy Council guidelines and site orientation. Switch to solar and battery package refers to an integrated design package including solar photovoltaic panels and battery storage inverter.
          </p>
        </div>
      </section>

      {/* Technical Campaign FAQ/Terms Section */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="container-ke">
          <div className="max-w-[760px] mx-auto">
            <h2 className="font-display text-[26px] font-extrabold tracking-[-0.02em] text-navy-800 mb-6 text-center">
              Campaign Terms & Eligibility FAQ
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-5 border border-ash-200 shadow-sm">
                <h3 className="font-display text-[15.5px] font-bold text-navy-800 mb-1.5">
                  How do I qualify for the free luxury getaway?
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  To receive the seven nights of free luxury accommodation, you must request your assessment, select a residential solar-and-battery package from Kratos Energy, accept the quotation, sign your contract, and pay the 10% deposit within seven (7) days of quotation issue.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-ash-200 shadow-sm">
                <h3 className="font-display text-[15.5px] font-bold text-navy-800 mb-1.5">
                  Who is eligible for the $15,000 zero-interest loan?
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  Eligible New South Wales (NSW) homeowners who are installing integrated solar-and-battery systems or adding storage to existing systems can access government incentives and zero-interest loans of up to $15,000, which can be repaid over up to 10 years. Our team handles the rebate applications and paperwork.
                </p>
              </div>

              <div className="bg-white rounded-lg p-5 border border-ash-200 shadow-sm">
                <h3 className="font-display text-[15.5px] font-bold text-navy-800 mb-1.5">
                  What is included in the accommodation package?
                </h3>
                <p className="font-body text-[14px] leading-relaxed text-ash-700">
                  The getaway package includes seven nights of luxury resort accommodation in Bali, Phuket, or Mombasa for two adults. Flights, transfers, taxes, meals, and booking fees are not included. The voucher is valid for 18 months, giving you plenty of time to book your getaway.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking and Contact details footer block */}
      <section id="quote" className="bg-navy-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="container-ke relative z-10">
          <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.2] text-white">
            Secure Your Complimentary Getaway Today
          </h2>
          <p className="mt-3.5 mx-auto max-w-[500px] font-body text-base text-[#c4d2ef]">
            Start saving with Kratos Energy today. Request your free assessment, select your solar-and-battery package, and secure your seven-night holiday!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link href="#top">
              <Button variant="gold" size="lg" icon="arrow">
                Book My Free Assessment
              </Button>
            </Link>
            <a href="tel:1300089547" className="inline-flex items-center gap-2 font-display text-[18px] font-extrabold text-white hover:text-gold-300 transition-colors">
              <Icon name="phone" size={18} stroke={2.5} className="text-gold-400" />
              1300 089 547
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
