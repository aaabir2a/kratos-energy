"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";

export function NetSellerCertification() {
  return (
    <section className="bg-paper py-20 border-t border-ash-200">
      <div className="container-ke grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
        {/* Certificate Card */}
        <div className="lg:col-span-5 relative bg-white border border-ash-200 rounded-md p-8 shadow-lg max-w-[450px] mx-auto w-full overflow-hidden">
          {/* Subtle watermark in background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center select-none font-display font-extrabold text-[90px] rotate-[-25deg] text-navy-900 leading-none">
            NETCC
          </div>

          <div className="flex justify-between items-center mb-6 relative">
            <div>
              <span className="font-body text-[10px] font-bold uppercase tracking-[0.1em] text-ash-400">
                Official Signatory
              </span>
              <h3 className="font-display text-[22px] font-extrabold text-navy-800 mt-1">
                Kratos Energy
              </h3>
            </div>
            <div className="relative w-28 h-28 flex-none ml-4">
              <Image
                src="/new energy tech approvide seller.png"
                alt="New Energy Tech Approved Seller Badge"
                fill
                sizes="150px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-6 relative font-body text-[13.5px] text-ash-700 leading-relaxed">
            <p>
              This is to certify that Kratos Energy is a signatory to the{" "}
              <strong className="text-navy-900 font-bold">New Energy Tech Consumer Code</strong> and a{" "}
              <strong className="text-navy-900 font-bold">New Energy Tech Approved Seller</strong>.
            </p>

            <div className="pt-6 border-t border-dashed border-ash-200">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-ash-400 mb-1">
                Authorized By
              </span>
              <div className="flex items-end justify-between">
                <div>
                  <span className="block font-[sans-serif] text-[15px] italic text-navy-800 font-bold tracking-wide">
                    Penelope Crossley
                  </span>
                  <span className="block text-[10px] text-ash-500 mt-0.5">
                    Chair of the Code Monitoring and Compliance Panel
                  </span>
                </div>
                {/* Visual Seal Accent */}
                <div className="w-10 h-10 rounded-full border-2 border-green-500/20 flex items-center justify-center text-[10px] font-bold text-green-600/60 uppercase tracking-widest rotate-[-15deg] select-none">
                  SEAL
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text Details */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-pill bg-green-500/10 px-3.5 py-1.5 text-green-700">
            <Icon name="award" size={16} className="text-green-600" />
            <span className="font-display text-[12.5px] font-bold tracking-[0.04em]">
              TRUSTED COMMITMENT
            </span>
          </div>

          <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy-800">
            Upholding Australia&rsquo;s standards in solar protection.
          </h2>

          <p className="font-body text-[16px] leading-relaxed text-ash-700">
            As a signatory to the <strong className="text-navy-900 font-bold">New Energy Tech Consumer Code</strong>, we have committed to uphold the consumer protection standards outlined to protect you through your entire solar journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="flex flex-col gap-2 p-4 bg-white border border-ash-200 rounded-sm shadow-sm hover:border-green-500 transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Icon name="check" size={16} stroke={3} />
              </div>
              <h4 className="font-display text-[14.5px] font-bold text-navy-800">
                Industry Designed
              </h4>
              <p className="font-body text-[12px] text-ash-500 leading-relaxed">
                Designed by peak industry and consumer bodies for total fairness.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-white border border-ash-200 rounded-sm shadow-sm hover:border-green-500 transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Icon name="shield" size={16} stroke={2.5} />
              </div>
              <h4 className="font-display text-[14.5px] font-bold text-navy-800">
                ACCC Authorised
              </h4>
              <p className="font-body text-[12px] text-ash-500 leading-relaxed">
                Authorised by the ACCC, proving the highest standard of corporate integrity.
              </p>
            </div>

            <div className="flex flex-col gap-2 p-4 bg-white border border-ash-200 rounded-sm shadow-sm hover:border-green-500 transition-colors">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                <Icon name="clock" size={16} stroke={2.5} />
              </div>
              <h4 className="font-display text-[14.5px] font-bold text-navy-800">
                Complete Journey
              </h4>
              <p className="font-body text-[12px] text-ash-500 leading-relaxed">
                Upholding standards across the entire purchase and support timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
