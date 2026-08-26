"use client";

import { useState } from "react";
import { Lightbox } from "@/components/sections/Projects";
import { Icon } from "@/components/ui/Icon";
import type { Project } from "@/lib/api";

type ProjectGalleryInteractiveProps = {
  project: Project;
};

export default function ProjectGalleryInteractive({ project }: ProjectGalleryInteractiveProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!project.images || project.images.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-ash-200 pb-4">
        <h2 className="font-display text-[22px] sm:text-[26px] font-extrabold text-navy-800 flex items-center gap-2">
          <Icon name="image" size={24} className="text-green-500" />
          Project Gallery
        </h2>
        <span className="font-body text-[13.5px] font-semibold text-ash-500 bg-ash-200/50 px-3 py-1 rounded-full">
          {project.images.length} Photos
        </span>
      </div>

      {/* Masonry-like CSS column layout so images flow with natural sizes and are NEVER cropped */}
      <div className="columns-1 sm:columns-2 gap-4 space-y-4">
        {project.images.map((img, idx) => (
          <div
            key={idx}
            className="break-inside-avoid relative overflow-hidden rounded-xl border border-ash-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group cursor-pointer"
            onClick={() => setOpenIdx(idx)}
          >
            <img
              src={img}
              alt={`${project.title} — Image ${idx + 1}`}
              loading="lazy"
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
            />
            {/* Soft glass overlay on hover */}
            <div className="absolute inset-0 bg-navy-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-white px-4 py-2 text-[13px] font-bold text-navy-800 shadow-md transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 font-display">
                <Icon name="zoomIn" size={16} stroke={2.5} className="text-green-500" />
                Zoom Photo
              </span>
            </div>
          </div>
        ))}
      </div>

      {openIdx !== null && (
        <Lightbox
          project={project}
          initial={openIdx}
          onClose={() => setOpenIdx(null)}
        />
      )}
    </div>
  );
}
