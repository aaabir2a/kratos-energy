import type { Metadata } from "next";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectsGallery } from "@/components/sections/Projects";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { Icon } from "@/components/ui/Icon";
import { Stars } from "@/components/ui/Stars";
import { getProjectsServer, type Project } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "See real solar and battery installations by Kratos Energy across Australia — homes and businesses generating their own clean power.",
};

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
      <PageHero
        eyebrow="Our Projects"
        title={
          <>
            Real installs, <span className="text-green-600">real savings.</span>
          </>
        }
        subtitle="A look at the solar and battery systems we've designed and installed for Australian homes and businesses."
      >
        <div className="flex items-center justify-center gap-2.5 font-body text-[14px] font-bold text-ash-700">
          <Stars size={16} /> 4.9/5 from 2,847 Australian installs
        </div>
      </PageHero>

      {/* Gallery */}
      <section className="bg-white py-14 sm:py-[72px]">
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
