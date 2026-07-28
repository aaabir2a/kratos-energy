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

function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [i, setI] = useState(0);
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
        className="relative flex max-h-full w-full max-w-[1000px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl lg:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image stage */}
        <div className="relative flex-1 bg-forest-900">
          <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[440px]">
            {project.images[i] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={project.images[i]}
                src={project.images[i]}
                alt={`${project.title} — image ${i + 1}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
          </div>
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="ke-press absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-md hover:bg-white"
              >
                <Icon name="chevron" size={20} className="rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="ke-press absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-md hover:bg-white"
              >
                <Icon name="chevron" size={20} className="-rotate-90" />
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
        <div className="flex w-full flex-col p-6 sm:p-7 lg:w-[340px] lg:flex-none">
          <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-[13px] font-semibold text-forest-700">
            {project.location && (
              <span className="inline-flex items-center gap-1.5">
                <Icon name="mapPin" size={14} className="text-green-500" /> {project.location}
              </span>
            )}
            {month && (
              <span className="inline-flex items-center gap-1.5 text-ash-500">
                <Icon name="clock" size={13} /> {month}
              </span>
            )}
          </div>
          <h3 className="font-display text-[22px] font-extrabold leading-tight tracking-[-0.01em] text-navy-800">
            {project.title}
          </h3>
          {project.description && (
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ash-700">
              {project.description}
            </p>
          )}
          <Link
            href="/get-a-quote"
            className="ke-press mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-green-500 px-6 py-3 font-display text-[14.5px] font-bold text-white shadow-green hover:bg-green-600"
          >
            Get a system like this <Icon name="arrow" size={17} stroke={2.4} />
          </Link>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="ke-press absolute right-3 top-3 z-[2] flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-forest-900 shadow-md hover:bg-white"
        >
          <Icon name="x" size={18} stroke={2.4} />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------- gallery (page) --------- */

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, idx) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setOpen(idx)} />
        ))}
      </div>
      {open !== null && projects[open] && (
        <Lightbox project={projects[open]} onClose={() => setOpen(null)} />
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
