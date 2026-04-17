"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import type { Project } from "@/lib/data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.demo || project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block group relative overflow-hidden rounded-2xl bg-card border border-white/5 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8 }}
      data-cursor-hover
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
        <motion.div
          className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-accent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        >
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
        </motion.div>
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
    </motion.a>
  );
}


export default function Projects() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle number="02" title="Selected Work" />

        {/* Section headline */}
        <motion.h2
          className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          DIGITAL
          <br />
          ARTIFACTS<span className="text-accent">.</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
