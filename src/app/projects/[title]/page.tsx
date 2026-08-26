import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { Icon } from "@/components/ui/Icon";
import { getProjectsServer } from "@/lib/api";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { pageMetadata } from "@/lib/seo/metadata";
import ProjectGalleryInteractive from "@/components/sections/ProjectGalleryInteractive";

type Params = { params: Promise<{ title: string }> };

/** Residential vs Commercial label inferred from the system size in the title. */
function categoryLabel(title: string): string {
    const m = title.match(/(\d+(?:\.\d+)?)\s?kw\b/i);
    const kw = m ? parseFloat(m[1]) : null;
    if (kw !== null) return kw >= 30 ? "Commercial Solar" : "Residential Solar";
    return "Solar & Battery";
}

/** Pull short spec "highlight" chips from the title + description. */
function specChips(text: string): string[] {
    const out: string[] = [];
    const push = (v: string) => {
        if (v && !out.includes(v)) out.push(v);
    };
    const kw = text.match(/(\d+(?:\.\d+)?)\s?kw\b/i);
    if (kw) push(`${kw[1]}kW system`);
    const panels = text.match(/(\d+)\s?panels?/i);
    if (panels) push(`${panels[1]} panels`);
    const kwh = text.match(/(\d+(?:\.\d+)?)\s?kwh\b/i);
    if (kwh) push(`${kwh[1]}kWh battery`);
    const brand = text.match(/\b(goodwe|sungrow|fronius|fox\s?ess|sigenergy|sofar|tesla|huawei|jinko|trina)\b/i);
    if (brand) push(`${brand[1].replace(/\s+/g, " ")} hardware`);
    if (/inverter/i.test(text)) push("Hybrid inverter");
    return out.slice(0, 4);
}

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
    const project = projects.find(
        (p) => p.title.toLowerCase() === decoded.toLowerCase() || encodeURIComponent(p.title) === title
    );

    if (!project) notFound();

    const month = project.projectDate
        ? new Date(project.projectDate).toLocaleDateString("en-AU", { month: "short", year: "numeric" })
        : "";

    // Extract key metrics from project title & description
    const systemSizeMatch = project.title.match(/(\d+(?:\.\d+)?)\s?kw/i) || (project.description && project.description.match(/(\d+(?:\.\d+)?)\s?kw/i));
    const systemSize = systemSizeMatch ? `${systemSizeMatch[1]} kW` : null;

    const batterySizeMatch = project.title.match(/(\d+(?:\.\d+)?)\s?kwh/i) || (project.description && project.description.match(/(\d+(?:\.\d+)?)\s?kwh/i));
    const batterySize = batterySizeMatch ? `${batterySizeMatch[1]} kWh` : null;

    const panelsMatch = project.description && project.description.match(/(\d+)\s?panels?/i);
    const panels = panelsMatch ? `${panelsMatch[1]} Panels` : null;

    return (
        <SiteLayout>
            {/* Hero Section */}
            <section className="bg-forest-900 pt-20 pb-16 sm:pt-24 sm:pb-20 relative overflow-hidden shadow-inner">
                {/* Visual background decorations */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(108,174,52,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-forest-900/60" />

                <div className="container-ke max-w-container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        
                        {/* Hero Text */}
                        <div className="lg:col-span-7 flex flex-col justify-center text-left">
                            <nav className="mb-6 flex items-center gap-2 font-body text-[12px] sm:text-[13px] text-green-200/70">
                                <Link href="/projects" className="hover:text-green-300 transition-colors">
                                    Our Projects
                                </Link>
                                <Icon name="chevron" size={12} className="-rotate-90 opacity-60 text-green-300" />
                                <span className="font-semibold text-white/90 line-clamp-1">
                                    {project.title}
                                </span>
                            </nav>

                            <span className="inline-flex self-start items-center gap-1.5 rounded-pill bg-green-500/20 px-3 py-1 font-display text-[12px] font-bold text-green-300 ring-1 ring-inset ring-green-500/30 mb-4">
                                <Icon name="leaf" size={13} className="text-green-400" />
                                {categoryLabel(project.title)}
                            </span>

                            <h1 className="font-display text-[clamp(28px,4.5vw,46px)] font-extrabold leading-tight text-white mb-6 tracking-tight [text-wrap:balance]">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-body text-[14px] text-white/80">
                                {project.location && (
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-pill">
                                        <Icon name="mapPin" size={16} className="text-green-400" />
                                        <span>{project.location}</span>
                                    </div>
                                )}
                                {month && (
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-pill">
                                        <Icon name="clock" size={15} className="text-green-400" />
                                        <span>{month}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-pill">
                                    <Icon name="image" size={15} className="text-green-400" />
                                    <span>{project.images.length} Photos</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image Container */}
                        <div className="lg:col-span-5 relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-forest-950/40">
                            {project.images[0] && (
                                <>
                                    <img
                                        // eslint-disable-next-line @next/next/no-img-element
                                        src={project.images[0]}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover filter blur-md opacity-30 scale-105"
                                    />
                                    <img
                                        // eslint-disable-next-line @next/next/no-img-element
                                        src={project.images[0]}
                                        alt={project.title}
                                        className="relative z-10 w-full h-full object-contain"
                                    />
                                </>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                        </div>

                    </div>
                </div>
            </section>

            {/* Overview & Gallery Section */}
            <section className="bg-paper py-12 sm:py-16">
                <div className="container-ke max-w-container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        
                        {/* Left/Main Column: Overview, Stats, and Gallery */}
                        <div className="lg:col-span-2 space-y-8">
                            
                            {/* Overview Card */}
                            {project.description && (
                                <div className="p-6 sm:p-8 bg-white shadow-sm border border-ash-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500" />
                                    <h2 className="font-display text-[22px] sm:text-[26px] font-extrabold text-navy-800 mb-4">
                                        Project Overview
                                    </h2>
                                    <p className="font-body text-[15px] sm:text-[16.5px] leading-relaxed text-ash-700 whitespace-pre-line">
                                        {project.description}
                                    </p>
                                </div>
                            )}

                            {/* Specs Highlights Grid */}
                            {(systemSize || batterySize || panels) && (
                                <div className="space-y-4">
                                    <h3 className="font-display text-[18px] sm:text-[20px] font-extrabold text-navy-800">
                                        Key System Metrics
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {systemSize && (
                                            <div className="bg-white border border-ash-200 hover:border-green-300 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 flex-shrink-0">
                                                    <Icon name="zap" size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-body text-[11px] text-ash-500 uppercase tracking-wider font-semibold">System Size</p>
                                                    <p className="font-display text-[18px] font-extrabold text-navy-800 mt-0.5">{systemSize}</p>
                                                </div>
                                            </div>
                                        )}
                                        {batterySize && (
                                            <div className="bg-white border border-ash-200 hover:border-green-300 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 flex-shrink-0">
                                                    <Icon name="battery" size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-body text-[11px] text-ash-500 uppercase tracking-wider font-semibold">Battery Storage</p>
                                                    <p className="font-display text-[18px] font-extrabold text-navy-800 mt-0.5">{batterySize}</p>
                                                </div>
                                            </div>
                                        )}
                                        {panels && (
                                            <div className="bg-white border border-ash-200 hover:border-green-300 rounded-xl p-5 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 flex-shrink-0">
                                                    <Icon name="sun" size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-body text-[11px] text-ash-500 uppercase tracking-wider font-semibold">Solar Panels</p>
                                                    <p className="font-display text-[18px] font-extrabold text-navy-800 mt-0.5">{panels}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Gallery Client Component */}
                            <ProjectGalleryInteractive project={project} />

                        </div>

                        {/* Right Column: Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-[90px] space-y-6">
                                
                                {/* Specs Card */}
                                <div className="bg-white rounded-xl border border-ash-200 p-6 shadow-sm space-y-6">
                                    <h3 className="font-display text-[18px] sm:text-[20px] font-extrabold text-navy-800 border-b border-ash-200 pb-3">
                                        Installation Details
                                    </h3>
                                    
                                    <dl className="space-y-4">
                                        <div>
                                            <dt className="font-body text-[11px] text-ash-500 uppercase font-semibold">Project Type</dt>
                                            <dd className="font-display text-[15px] font-bold text-navy-800 mt-0.5">{categoryLabel(project.title)}</dd>
                                        </div>
                                        {project.location && (
                                            <div>
                                                <dt className="font-body text-[11px] text-ash-500 uppercase font-semibold">Location</dt>
                                                <dd className="font-display text-[15px] font-bold text-navy-800 mt-0.5">{project.location}</dd>
                                            </div>
                                        )}
                                        {month && (
                                            <div>
                                                <dt className="font-body text-[11px] text-ash-500 uppercase font-semibold">Installed Date</dt>
                                                <dd className="font-display text-[15px] font-bold text-navy-800 mt-0.5">{month}</dd>
                                            </div>
                                        )}
                                        {specChips(project.description || "").length > 0 && (
                                            <div>
                                                <dt className="font-body text-[11px] text-ash-500 uppercase font-semibold mb-2">Key Hardware</dt>
                                                <dd className="flex flex-wrap gap-2">
                                                    {specChips(project.description || "").map((chip) => (
                                                        <span 
                                                            key={chip} 
                                                            className="inline-flex items-center rounded-md bg-paper border border-ash-200 px-2.5 py-1 font-body text-[12px] font-medium text-ash-700"
                                                        >
                                                            {chip}
                                                        </span>
                                                    ))}
                                                </dd>
                                            </div>
                                        )}
                                    </dl>
                                </div>

                                {/* Custom CTA Card */}
                                <div className="bg-gradient-to-br from-forest-800 to-forest-950 rounded-xl p-6 shadow-lg border border-forest-700 text-white relative overflow-hidden group">
                                    <div className="absolute -right-8 -bottom-8 opacity-10 text-green-300 pointer-events-none transition-transform duration-500 group-hover:scale-110">
                                        <Icon name="sun" size={160} />
                                    </div>
                                    <h4 className="font-display text-[20px] font-extrabold leading-tight mb-2">
                                        Get a system like this
                                    </h4>
                                    <p className="font-body text-[14px] text-green-100/90 leading-relaxed mb-6">
                                        Interested in solar or battery storage for your home or business? Get a free, personalized design and quote.
                                    </p>
                                    <Link
                                        href="/get-a-quote"
                                        className="ke-press w-full flex items-center justify-center gap-2 rounded-pill bg-green-500 px-6 py-3.5 font-display text-[14.5px] font-bold text-white shadow-green hover:bg-green-600 transition-colors"
                                    >
                                        Request Free Quote <Icon name="arrow" size={17} stroke={2.4} />
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <QuoteCTA />
        </SiteLayout>
    );
}
