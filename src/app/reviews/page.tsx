import { SiteLayout } from "@/components/layout/SiteLayout";
import { Stars } from "@/components/ui/Stars";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo/metadata";
import { REVIEWS, GOOGLE_REVIEW_LINK } from "@/lib/reviews";

export const metadata = pageMetadata({
  title: "Customer Reviews & Ratings",
  description:
    "See what Australian homeowners say about Kratos Energy. Rated 5.0 stars for our premium solar and battery system installations, customer service, and value.",
  path: "/reviews",
});

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  return (
    <span
      className="flex flex-none items-center justify-center rounded-full bg-green-100 font-display font-extrabold text-forest-700 ring-1 ring-inset ring-green-200"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {name[0]}
    </span>
  );
}

export default function ReviewsPage() {
  return (
    <SiteLayout>
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-navy-900 py-16 sm:py-24 text-white">
        {/* Ambient Blurs */}
        <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[450px] h-[450px] bg-gold-400/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-ke relative z-10 text-center">
          <div className="mx-auto max-w-[800px]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-pill border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
              <GoogleG size={16} />
              <span className="font-display text-[13px] font-bold text-white uppercase tracking-wider">
                Google Business Reviews
              </span>
            </div>
            
            <h1 className="font-display text-[clamp(32px,5vw,60px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-white">
              Rated <span className="text-gold-400 text-glow">5.0 Stars</span> by Australian Homes
            </h1>
            
            <p className="mt-5 font-body text-[18px] sm:text-[20px] leading-relaxed text-[#c4d2ef] max-w-[640px] mx-auto">
              Read real, verified reviews from families across New South Wales, Victoria, and ACT who have switched to solar with Kratos Energy.
            </p>
          </div>
        </div>
      </section>

      {/* Review Submission CTA */}
      <section className="bg-paper py-12 border-b border-ash-200">
        <div className="container-ke">
          <div className="mx-auto max-w-[760px] rounded-2xl border border-ash-200 bg-white p-6 shadow-lg sm:p-8 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:text-left sm:justify-between">
              <div className="max-w-[480px]">
                <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                  <Stars size={18} />
                  <span className="font-display text-sm font-bold text-navy-700">5.0 Score</span>
                </div>
                <h3 className="font-display text-lg font-extrabold text-navy-800">
                  Shared Your Solar Experience Yet?
                </h3>
                <p className="mt-1 font-body text-[14.5px] leading-relaxed text-ash-600">
                  Help other Australian homeowners choose reliable renewable energy by leaving your honest review on Google Business Profile.
                </p>
              </div>
              <a href={GOOGLE_REVIEW_LINK} target="_blank" rel="noopener noreferrer" className="flex-none">
                <Button variant="primary" size="lg" icon="arrow">
                  Write Google Review
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container-ke">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.n}
                className="flex flex-col justify-between rounded-2xl border border-ash-200 bg-white p-6 shadow-md hover:border-green-500/50 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <Stars size={16} />
                    <GoogleG size={20} />
                  </div>
                  <blockquote className="font-body text-[14.5px] leading-relaxed text-ink [overflow-wrap:anywhere]">
                    &ldquo;{r.q}&rdquo;
                  </blockquote>
                </div>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-ash-200 pt-4">
                  <Avatar name={r.n} />
                  <div className="min-w-0">
                    <div className="truncate font-display text-[14.5px] font-bold text-navy-700">
                      {r.n}
                    </div>
                    <div className="font-body text-[12.5px] text-ash-500">
                      {r.when} ·{" "}
                      <span className="font-semibold text-green-600">
                        {r.sys ? r.sys : "Verified"}
                      </span>
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Get a Quote Promo Section */}
      <section className="bg-navy-900 text-white py-16 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-green-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="container-ke relative z-10">
          <h2 className="font-display text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.2] text-white">
            Ready to Start Saving with Solar?
          </h2>
          <p className="mt-3.5 mx-auto max-w-[500px] font-body text-base text-[#c4d2ef]">
            Join hundreds of satisfied Australian homes. Request your tailored, free design and financial assessment today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-5">
            <a href="/get-a-quote">
              <Button variant="gold" size="lg" icon="arrow">
                Get My Free Quote
              </Button>
            </a>
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
