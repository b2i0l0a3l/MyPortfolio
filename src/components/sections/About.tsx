"use client";

import { motion } from "framer-motion";
import { ABOUT_DATA, SKILLS } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  Building2,
  Box,
  Layout,
  Play,
  Code,
  Globe,
  Brain,
  RefreshCw,
} from "lucide-react";


const ICON_MAP: Record<string, React.ReactNode> = {
  building: <Building2 size={20} />,
  box: <Box size={20} />,
  layout: <Layout size={20} />,
  play: <Play size={20} />,
  code: <Code size={20} />,
  globe: <Globe size={20} />,
  brain: <Brain size={20} />,
  refresh: <RefreshCw size={20} />,
};

// ============================================================
// StatCard - Displays a single statistic
// Single Responsibility: Only renders one stat
// ============================================================

function StatCard({
  value,
  label,
  index,
}: {
  value: string;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      className="text-center p-6 rounded-2xl bg-card border border-white/5"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className="block text-3xl md:text-4xl font-bold text-accent mb-1">
        {value}
      </span>
      <span className="text-xs text-secondary uppercase tracking-[0.2em]">
        {label}
      </span>
    </motion.div>
  );
}

function SkillBadge({
  skill,
  index,
}: {
  skill: (typeof SKILLS)[0];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-white/5 hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      data-cursor-hover
    >
      <span className="text-accent">{ICON_MAP[skill.icon]}</span>
      <span className="text-sm text-primary font-medium">{skill.name}</span>
    </motion.div>
  );
}

// ============================================================
// About Section - Bio, stats, timeline, and skills
// Single Responsibility: Only renders the about section layout
// ============================================================

export default function About() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionTitle number="01" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {ABOUT_DATA.headline.split(" ").map((word, i) =>
              word === "Digital" || word === "Technical" ? (
                <span key={i} className="text-accent">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </motion.h2>

          <motion.p
            className="text-secondary text-base md:text-lg leading-relaxed self-end"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {ABOUT_DATA.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {ABOUT_DATA.stats.map((stat, i) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} index={i} />
          ))}
        </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs uppercase tracking-[0.3em] text-secondary mb-8 font-medium">
              Core Competencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {SKILLS.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
