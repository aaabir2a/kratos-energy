import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Icon } from "@/components/ui/Icon";
import { getProjectsServer } from "@/lib/api";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { pageMetadata } from "@/lib/seo/metadata";

type Params = { params: Promise<{ title: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { title } = await params;
    const decoded = decodeURIComponent(title);

    return pageMetadata({
        // The root template appends the brand — no manual suffix.
        title: decoded,
        description: `Solar installation details for ${decoded} — system size, equipment and results from this Kratos Energy project.`,
        // Canonical uses the raw encoded param, so it matches the URL that was
        // actually requested and the one listed in the sitemap.
        path: `/projects/${title}`,
    });
}

export default async function ProjectPage({ params }: Params) {
    const { title } = await params;
    const decoded = decodeURIComponent(title).replace(/-/g, " ");

    const projects = await getProjectsServer(100);
    const project = projects.find((p) => p.title.toLowerCase() === decoded.toLowerCase() || encodeURIComponent(p.title) === title);

    if (!project) notFound();

    const month = project.projectDate
        ? new Date(project.projectDate).toLocaleDateString("en-AU", { month: "short", year: "numeric" })
        : "";

    return (
        <SiteLayout>
            {/* Hero Section */}
            <section className="bg-forest-900 pt-16 pb-12 sm:pt-20 sm:pb-16 min-h-[40vh] flex flex-col justify-end relative shadow-inner overflow-hidden">
                {project.images[0] && (
                    <img
                        // eslint-disable-next-line @next/next/no-img-element
                        src={project.images[0]}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-center opacity-40 mix-blend-overlay"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900 to-transparent" />

                <div className="container-ke relative z-10 mt-auto pt-16 sm:pt-24">
                    <nav className="mb-6 flex items-center gap-2 font-body text-[12px] sm:text-[13px] text-white/60">
                        <Link href="/projects" className="hover:text-white transition-colors">
                            Our Projects
                        </Link>
                        <Icon name="chevron" size={12} className="-rotate-90 opacity-50" />
                        <span className="font-semibold text-white/90 line-clamp-1">
                            {project.title}
                        </span>
                    </nav>

                    <h1 className="font-display text-[clamp(28px,4vw,48px)] font-extrabold leading-tight text-white mb-4 [text-wrap:balance]">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mt-2 font-body text-[14px] text-green-300">
                        {project.location && (
                            <div className="flex items-center gap-1.5">
                                <Icon name="mapPin" size={16} />
                                {project.location}
                            </div>
                        )}
                        {month && (
                            <div className="flex items-center gap-1.5 text-white/70">
                                <Icon name="clock" size={15} />
                                {month}
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 text-white/70">
                            <Icon name="image" size={15} />
                            {project.images.length} Photos
                        </div>
                    </div>
                </div>
            </section>

            {/* Overview & Gallery Section */}
            <section className="bg-paper py-12 sm:py-20">
                <div className="container-ke max-w-[840px] mx-auto">
                    {project.description && (
                        <div className="mb-12 p-6 sm:p-8 bg-white shadow-sm border border-ash-200 rounded-xl relative overflow-hidden">
                            {/* Accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500" />
                            <h2 className="font-display text-[22px] sm:text-[26px] font-bold text-navy-800 mb-4">
                                Project Overview
                            </h2>
                            <p className="font-body text-[15px] sm:text-[16px] leading-relaxed text-ash-700">
                                {project.description}
                            </p>

                            <div className="mt-8 pt-6 border-t border-ash-200 flex flex-wrap gap-4 items-center">
                                <Link
                                    href="/get-a-quote"
                                    className="ke-press inline-flex items-center justify-center gap-2 rounded-pill bg-green-500 px-6 py-3 font-display text-[14px] font-bold text-white hover:bg-green-600"
                                >
                                    Get a Quote for a similar system <Icon name="arrow" size={16} stroke={2.4} />
                                </Link>
                            </div>
                        </div>
                    )}

                    <h2 className="font-display text-[22px] sm:text-[26px] font-bold text-navy-800 mb-6">
                        Project Gallery
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {project.images.map((img, i) => (
                            <div key={i} className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-ash-200 bg-white">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={img}
                                    alt={`${project.title} — Image ${i + 1}`}
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <QuoteCTA />
        </SiteLayout>
    );
}
