import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ProjectsGallery } from "@/components/sections/Projects";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { getProjectsServer, type Project } from "@/lib/api";
import { pageMetadata } from "@/lib/seo/metadata";

const HEADER_IMAGE =
  "https://api.kratos-energy.com/kratos-uploads/hero/desktop/dd403ceb-d379-48e9-8102-589925043402/optimized.webp";

export const metadata = pageMetadata({
  title: "Our Solar Projects",
  description:
    "Real solar and battery installations by Kratos Energy across New South Wales, Victoria and the ACT — homes and businesses generating their own clean power.",
  path: "/projects",
});

async function loadProjects(): Promise<Project[]> {
  try {
    return await getProjectsServer(48);
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <SiteLayout>
      {/* Header — statement left, audited-quality card right */}
      <section className="pb-16 pt-12 relative isolate bg-forest-900 text-white min-h-[500px] flex flex-col justify-center overflow-hidden py-16 lg:py-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HEADER_IMAGE}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,#0c3b28_6%,rgba(12,59,40,0.85)_40%,rgba(12,59,40,0.40)_70%,rgba(12,59,40,0.12)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-900 via-forest-900/30 to-transparent" />

        <div className="container-ke relative z-10">
          <div className="max-w-[760px]">
            <h1 className="m-0 font-display text-[clamp(40px,5vw,60px)] font-extrabold leading-[1.02] tracking-[-0.025em] text-white [text-wrap:balance]">
              Our Projects
            </h1>
            <p className="mt-4 max-w-[560px] font-body text-[18px] leading-relaxed text-white/85">
              Real solar and battery installations designed and delivered by our
              Australian-owned team — for homes and businesses generating their
              own clean power. Explore the systems we&rsquo;ve built.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 font-display text-[13px] font-bold text-white transition-colors">
                <Icon name="shield" size={15} stroke={2.2} /> CEC-Accredited Installer
              </span>
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 font-display text-[13px] font-bold text-white transition-colors">
                <Icon name="award" size={15} stroke={2.2} /> 2,847+ Homes Powered
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-paper py-14 sm:py-[64px]">
        <div className="container-ke">
          <ProjectsGallery projects={projects} />
        </div>
      </section>

      {/* Mid-page CTA band — placed right after the visitor has seen the proof */}
      <section className="bg-forest-900 py-16">
        <div className="container-ke flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="max-w-[560px]">
            <h2 className="font-display text-[clamp(24px,2.8vw,34px)] font-extrabold leading-[1.12] tracking-[-0.02em] text-white">
              Want a system like these on your roof?
            </h2>
            <p className="mt-2.5 font-body text-[16px] leading-relaxed text-[#a9c4a3]">
              Free design, rebates handled, 25-year warranty. Get your tailored
              quote in under two minutes.
            </p>
          </div>
          <Link
            href="/get-a-quote"
            className="ke-press inline-flex flex-none items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[34px] py-[16px] font-display text-[16px] font-bold text-white shadow-green hover:bg-green-600"
          >
            Get a Free Quote <Icon name="arrow" size={20} stroke={2.4} />
          </Link>
        </div>
      </section>

      <QuoteCTA />
    </SiteLayout>
  );
}


