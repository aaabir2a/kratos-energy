"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export function GetawayPromoSection() {
  return (
    <section className="bg-navy-900 py-16 sm:py-24 text-white overflow-hidden relative border-b border-ash-700">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gold-400/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container-ke relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Promotion Details */}
          <div className="lg:col-span-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-pill border border-gold-400/40 bg-gold-400/15 px-3.5 py-1.5">
              <Icon name="award" size={15} className="text-gold-400" />
              <span className="font-display text-[12.5px] font-bold tracking-[0.04em] text-gold-400 uppercase">
                Limited Time Promotion
              </span>
            </div>
            
            <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              Power Your Home. <br />
              Get a <span className="text-gold-400 text-glow">Free Luxury Getaway!</span>
            </h2>
            
            <p className="mt-5 max-w-[580px] font-body text-[17.5px] leading-relaxed text-[#c4d2ef]">
              Thinking about going solar? Switch to solar and battery storage today, reduce your energy bills, and reward yourself with a complimentary <strong className="text-white">seven-night luxury getaway</strong> to Bali, Phuket, or Mombasa.
            </p>

            {/* Campaign Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-gold-400">
                  <Icon name="sun" size={18} />
                </span>
                <div>
                  <h4 className="font-display text-[15px] font-bold text-white">Clean Energy by Day</h4>
                  <p className="font-body text-[13.5px] text-[#9fb2d8] mt-0.5">Generate your own electricity during the day to offset peak rates.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-gold-400">
                  <Icon name="battery" size={18} />
                </span>
                <div>
                  <h4 className="font-display text-[15px] font-bold text-white">Stored Power by Night</h4>
                  <p className="font-body text-[13.5px] text-[#9fb2d8] mt-0.5">Store excess energy to power your home during the evening peak hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-gold-400">
                  <Icon name="calculator" size={18} />
                </span>
                <div>
                  <h4 className="font-display text-[15px] font-bold text-white">NSW Government Loans</h4>
                  <p className="font-body text-[13.5px] text-[#9fb2d8] mt-0.5">Access zero-interest loans up to $15,000 to cover upfront costs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/10 text-gold-400">
                  <Icon name="shield" size={18} />
                </span>
                <div>
                  <h4 className="font-display text-[15px] font-bold text-white">10-Year Repayments</h4>
                  <p className="font-body text-[13.5px] text-[#9fb2d8] mt-0.5">Repay your zero-interest solar loan over up to 10 years, stress-free.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-5 items-center">
              <Link href="/luxury-getaway">
                <Button variant="gold" size="lg" icon="arrow">
                  Claim Your Getaway
                </Button>
              </Link>
              <div className="text-sm font-semibold text-[#9fb2d8]">
                Or speak to an expert: <a href="tel:1300089547" className="text-white underline-offset-4 hover:underline hover:text-gold-300">1300 089 547</a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Destination Previews */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Bali Card */}
              <div className="group relative rounded-lg overflow-hidden border border-white/10 shadow-lg ke-lift">
                <div className="relative aspect-[4/5] w-full">
                  <Image 
                    src="/assets/getaway-bali.png" 
                    alt="Bali Luxury Getaway"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-display text-[16px] font-bold text-white block">Bali, Indonesia</span>
                    <span className="font-body text-[11.5px] text-gold-300 font-bold uppercase tracking-wider">7 Nights Free</span>
                  </div>
                </div>
              </div>

              {/* Phuket Card */}
              <div className="group relative rounded-lg overflow-hidden border border-white/10 shadow-lg ke-lift">
                <div className="relative aspect-[4/5] w-full">
                  <Image 
                    src="/assets/getaway-phuket.png" 
                    alt="Phuket Luxury Getaway"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-display text-[16px] font-bold text-white block">Phuket, Thailand</span>
                    <span className="font-body text-[11.5px] text-gold-300 font-bold uppercase tracking-wider">7 Nights Free</span>
                  </div>
                </div>
              </div>

              {/* Mombasa Card */}
              <div className="group relative col-span-2 rounded-lg overflow-hidden border border-white/10 shadow-lg ke-lift">
                <div className="relative aspect-[16/9] w-full">
                  <Image 
                    src="/assets/getaway-mombasa.png" 
                    alt="Mombasa Coastal Resort"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="font-display text-[18px] font-bold text-white block">Mombasa, Kenya</span>
                    <span className="font-body text-[12px] text-gold-300 font-bold uppercase tracking-wider">7 Nights Luxury Accommodation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
