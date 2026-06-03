import type { Metadata } from "next";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { ReferForm } from "@/components/sections/ReferForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Refer a Friend",
  description:
    "Love your Kratos solar? Refer a friend and you'll both be rewarded when they install. $200 for you, $200 off for them.",
};

const STEPS = [
  ["Share your link", "Send your unique referral to friends, family or neighbours."],
  ["They go solar", "When they install a Kratos system, your referral is tracked."],
  ["You both win", "You get $200, they get $200 off their system. Simple."],
];

export default function ReferPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Refer & Earn"
        title={
          <>
            Share the sun, <span className="text-green-600">share the savings.</span>
          </>
        }
        subtitle="Refer a friend to Kratos Energy — they save $200 on their system, and you pocket $200 once it's installed."
      />

      <section className="bg-white py-[78px]">
        <div className="container-ke">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STEPS.map(([title, body], i) => (
              <div key={title} className="rounded-lg border border-ash-200 bg-white p-7 shadow-md">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-display text-[18px] font-extrabold text-white">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-display text-[18px] font-bold text-navy-700">
                  {title}
                </h3>
                <p className="font-body text-[14.5px] leading-relaxed text-ash-700">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper py-[70px]">
        <div className="container-ke max-w-[680px]">
          <div className="mb-8 text-center">
            <Eyebrow center>Send a Referral</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(26px,3vw,38px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Refer in 30 seconds.
            </h2>
          </div>
          <ReferForm />
          <p className="mt-5 flex items-center justify-center gap-2 font-body text-[13px] text-ash-500">
            <Icon name="shield" size={14} stroke={2} className="text-green-500" />
            We&rsquo;ll only contact your friend about solar, in line with our
            privacy policy.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
