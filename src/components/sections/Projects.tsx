"use client";

import { memo } from "react";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Project } from "@/lib/data";

// ============================================================
// ProjectCard - Uses CSS animations instead of framer-motion
// ============================================================

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.demo || project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-2xl bg-card border border-white/5 hover:-translate-y-2 transition-transform duration-500"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-transparent to-purple-900/30 pointer-events-none" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />

        <span className="absolute top-4 left-4 text-xs font-mono text-white/60 tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          {project.id}
        </span>

        {/* Year badge */}
        <span className="absolute top-4 right-4 text-xs font-mono text-white/60 tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          {project.year}
        </span>

        {/* View arrow on hover */}
        <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="text-white -rotate-45"
          >
            <path
              d="M4 12L12 4M12 4H5M12 4V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6">
        <p className="text-[10px] uppercase tracking-[0.25em] text-accent/80 mb-2 font-medium">
          {project.category}
        </p>
        <h3 className="text-lg md:text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-secondary leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </a>
  );
});


export default function Projects() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle number="02" title="Selected Work" />

        {/* Section headline */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 md:mb-20">
          DIGITAL
          <br />
          ARTIFACTS<span className="text-accent">.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
