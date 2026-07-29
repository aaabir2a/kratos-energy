"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/lib/api";

/* --------------------------------------------------------------- helpers -- */

function projectMonth(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-AU", { month: "short", year: "numeric" });
}

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

/** Cover-image card. Location + date badge, title on a gradient scrim. */
function ProjectCard({
  project,
  onOpen,
  className = "",
}: {
  project: Project;
  onOpen: () => void;
  className?: string;
}) {
  const cover = project.images[0];
  const month = projectMonth(project.projectDate);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`ke-lift group relative flex aspect-[4/3] w-full flex-col justify-end overflow-hidden rounded-xl bg-forest-900 text-left ${className}`}
    >
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={cover}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-green-300">
          <Icon name="sun" size={44} />
        </div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,59,40,0.92)_0%,rgba(12,59,40,0.35)_42%,transparent_70%)]" />

      {project.images.length > 1 && (
        <span className="absolute right-3.5 top-3.5 z-[1] inline-flex items-center gap-1 rounded-pill bg-forest-900/70 px-2.5 py-1 font-display text-[11px] font-bold text-white ring-1 ring-inset ring-white/20">
          <Icon name="play" size={11} /> {project.images.length}
        </span>
      )}

      <div className="relative z-[1] p-5">
        {(project.location || month) && (
          <div className="mb-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[12.5px] font-semibold text-green-300">
            {project.location && (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="mapPin" size={13} /> {project.location}
              </span>
            )}
            {month && (
              <span className="inline-flex items-center gap-1.5 text-white/70">
                <Icon name="clock" size={12} /> {month}
              </span>
            )}
          </div>
        )}
        <h3 className="font-display text-[18px] font-extrabold leading-snug text-white [text-wrap:balance]">
          {project.title}
        </h3>
        <span className="mt-2.5 inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-white/85 opacity-0 transition-opacity group-hover:opacity-100">
          View project <Icon name="arrow" size={14} stroke={2.4} />
        </span>
      </div>
    </button>
  );
}

/* -------------------------------------------------------------- lightbox -- */

function Lightbox({
  project,
  onClose,
  initial = 0,
}: {
  project: Project;
  onClose: () => void;
  initial?: number;
}) {
  const [i, setI] = useState(initial);
  const count = project.images.length;
  const month = projectMonth(project.projectDate);

  const go = useCallback((d: number) => setI((p) => (p + d + count) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [go, onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-900/80 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div
        className="relative flex max-h-[95vh] w-[95vw] max-w-[1280px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl lg:flex-row lg:h-[82vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image stage */}
        <div className="relative flex-1 bg-[#0b100e]">
          <div className="relative h-[40vh] w-full lg:aspect-auto lg:h-full lg:min-h-[440px]">
            {project.images[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={project.images[i]}
                src={project.images[i]}
                alt={`${project.title} — image ${i + 1}`}
                className="absolute inset-0 h-full w-full object-contain"
              />
            )}
          </div>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-lg transition-all hover:bg-white hover:scale-105 active:scale-95"
              >
                <Icon name="chevron" size={24} className="rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy-800 shadow-lg transition-all hover:bg-white hover:scale-105 active:scale-95"
              >
                <Icon name="chevron" size={24} className="-rotate-90" />
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {project.images.map((img, idx) => (
                  <button
                    key={img}
                    type="button"
                    aria-label={`Image ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-1.5 rounded-full transition-all ${idx === i ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="flex w-full flex-col p-6 sm:p-8 lg:w-[380px] lg:flex-none bg-white">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[13.5px] font-semibold text-forest-700">
            {project.location && (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="mapPin" size={15} className="text-green-500" /> {project.location}
              </span>
            )}
            {month && (
              <span className="inline-flex items-center gap-1.5 text-ash-500">
                <Icon name="clock" size={14} /> {month}
              </span>
            )}
          </div>
          <h3 className="font-display text-[22px] font-extrabold leading-tight tracking-[-0.01em] text-navy-800">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ash-700 line-clamp-2">
              {project.description}
            </p>
          )}

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <Link
              href={`/projects/${encodeURIComponent(project.title)}`}
              onClick={onClose}
              className="ke-press flex w-full items-center justify-center gap-2 rounded-pill bg-forest-900 px-6 py-3.5 font-display text-[14.5px] font-bold text-white shadow-md hover:bg-forest-800"
            >
              View Details <Icon name="arrow" size={17} stroke={2.4} className="text-green-400" />
            </Link>
            <Link
              href="/get-a-quote"
              onClick={onClose}
              className="ke-press flex w-full items-center justify-center gap-2 rounded-pill border-[1.5px] border-green-500 bg-white px-6 py-3.5 font-display text-[14.5px] font-bold text-forest-700 hover:bg-green-50"
            >
              Get a system like this
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-md transition-all hover:bg-white hover:scale-105 active:scale-95"
        >
          <Icon name="x" size={18} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------- gallery (page) --------- */

/** Wide two-column project card (institution-style): identity + gallery + meta
 *  on the left, overview + highlights + CTAs on the right. */
function WideProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: (imageIndex: number) => void;
}) {
  const cover = project.images[0];
  const thumbs = project.images.slice(0, 3);
  const month = projectMonth(project.projectDate);
  const chips = specChips(`${project.title} ${project.description ?? ""}`);

  return (
    <article className="grid gap-6 rounded-2xl border border-ash-200 bg-white p-5 shadow-md sm:p-6 lg:grid-cols-[minmax(0,1fr)_1.25fr]">
      {/* Left — identity, gallery, meta */}
      <div className="flex flex-col">
        <div className="flex items-center gap-3.5">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={project.title}
              loading="lazy"
              className="h-14 w-14 flex-none rounded-lg object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-green-50 text-green-600">
              <Icon name="sun" size={26} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="font-display text-[20px] font-extrabold leading-tight tracking-[-0.01em] text-navy-800">
              {project.title}
            </h3>
            <span className="font-display text-[11.5px] font-bold uppercase tracking-[0.09em] text-green-600">
              {categoryLabel(project.title)}
            </span>
          </div>
        </div>

        {/* Left column description removed as requested */}

        {thumbs.length > 0 && (
          <div className="mt-5 grid grid-cols-3 gap-2.5">
            {thumbs.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => onOpen(i)}
                aria-label={`Open ${project.title} gallery`}
                className="ke-press relative aspect-[4/3] overflow-hidden rounded-md ring-1 ring-inset ring-ash-200"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="" loading="lazy" className="h-full w-full object-cover" />
                {i === 2 && project.images.length > 3 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-forest-900/65 font-display text-[14px] font-bold text-white">
                    +{project.images.length - 3}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-5 flex flex-col gap-2 border-t border-ash-200 pt-4 font-body text-[13.5px] font-semibold text-ash-700">
          {project.location && (
            <span className="inline-flex items-center gap-2">
              <Icon name="mapPin" size={15} className="text-green-500" /> {project.location}
            </span>
          )}
          {month && (
            <span className="inline-flex items-center gap-2">
              <Icon name="clock" size={14} className="text-green-500" /> Completed {month}
            </span>
          )}
          <span className="inline-flex items-center gap-2">
            <Icon name="play" size={13} className="text-green-500" /> {project.images.length}{" "}
            photo{project.images.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* Right — overview, highlights, CTAs */}
      <div className="flex flex-col lg:border-l lg:border-ash-200 lg:pl-8">
        <h4 className="font-display text-[13px] font-bold uppercase tracking-[0.08em] text-navy-700">
          Project Overview
        </h4>
        <p className="mt-2 font-body text-[14px] leading-relaxed text-ash-700 line-clamp-3">
          {project.description ||
            `A solar${/battery/i.test(project.title) ? " and battery" : ""
            } installation delivered end-to-end by the Kratos Energy team${project.location ? ` in ${project.location}` : ""
            }.`}
        </p>

        {chips.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {chips.map((c) => (
              <span key={c} className="flex items-center gap-2 font-body text-[13.5px] text-ink">
                <Icon name="check" size={15} stroke={3} className="flex-none text-green-500" />
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          <Link
            href={`/projects/${encodeURIComponent(project.title)}`}
            className="ke-press inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-forest-900 px-4 py-2.5 font-display text-[13.5px] font-bold text-white hover:bg-forest-800"
          >
            Details <Icon name="arrow" size={15} stroke={2.4} className="text-green-400" />
          </Link>
          <button
            type="button"
            onClick={() => onOpen(0)}
            className="ke-press inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-ash-300 bg-white px-4 py-2.5 font-display text-[13.5px] font-bold text-navy-700 hover:bg-ash-50"
          >
            Gallery
          </button>
          <Link
            href="/get-a-quote"
            className="ke-press inline-flex flex-1 items-center justify-center gap-2 rounded-pill border border-green-500 bg-green-50 px-4 py-2.5 font-display text-[13.5px] font-bold text-forest-700 hover:bg-green-100"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<{ p: number; img: number } | null>(null);

  if (projects.length === 0) {
    return (
      <p className="font-body text-[15px] text-ash-700">
        Our latest installs are being added — check back soon, or{" "}
        <Link href="/get-a-quote" className="font-bold text-green-600 hover:underline">
          get a quote
        </Link>{" "}
        to start your own.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-6">
        {projects.map((p, idx) => (
          <WideProjectCard
            key={p.id}
            project={p}
            onOpen={(img) => setOpen({ p: idx, img })}
          />
        ))}
      </div>
      {open !== null && projects[open.p] && (
        <Lightbox
          project={projects[open.p]}
          initial={open.img}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}

/* ------------------------------------------------ showcase (home slider) --- */

export function ProjectShowcase({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  if (projects.length === 0) return null;

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.9, 360), behavior: "smooth" });
  };

  return (
    <section id="recent-projects" className="bg-paper py-[84px]">
      <div className="container-ke">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[560px]">
            <div className="mb-2 flex items-center gap-3">
              <span className="h-px w-9 bg-green-500/70" />
              <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-green-600">
                Recent Installs
              </span>
            </div>
            <h2 className="font-display text-[clamp(28px,3.4vw,44px)] font-extrabold tracking-[-0.02em] text-navy-700">
              Real Kratos projects across Australia.
            </h2>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous projects"
              className="ke-press flex h-11 w-11 items-center justify-center rounded-full border border-ash-300 text-forest-700 hover:border-green-500 hover:text-green-600"
            >
              <Icon name="chevron" size={20} className="rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next projects"
              className="ke-press flex h-11 w-11 items-center justify-center rounded-full border border-ash-300 text-forest-700 hover:border-green-500 hover:text-green-600"
            >
              <Icon name="chevron" size={20} className="-rotate-90" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="-mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className="w-[300px] flex-none snap-start sm:w-[360px]"
            >
              <ProjectCard project={p} onOpen={() => setOpen(idx)} />
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href="/get-a-quote"
            className="ke-press inline-flex items-center justify-center gap-2.5 rounded-pill bg-green-500 px-[30px] py-[14px] font-display text-[15.5px] font-bold text-white shadow-green hover:bg-green-600"
          >
            Start your project <Icon name="arrow" size={19} stroke={2.4} />
          </Link>
          <Link
            href="/projects"
            className="ke-press inline-flex items-center gap-2 font-display text-[15px] font-bold text-forest-700 underline-offset-4 hover:underline"
          >
            View all projects <Icon name="arrow" size={16} stroke={2.4} />
          </Link>
        </div>
      </div>

      {open !== null && projects[open] && (
        <Lightbox project={projects[open]} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
