"use client";

import { motion } from "framer-motion";
import { TECH_SKILLS } from "@/lib/data";
import SectionTitle from "@/components/ui/SectionTitle";
import {
  SiSharp,
  SiDotnet,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiPostgresql,
  SiJsonwebtokens,
  SiMysql,
  SiGit,
  SiGithub,
  SiNextdotjs,
} from "react-icons/si";

// Map names to icon components
const TECH_ICONS: Record<string, React.ElementType> = {
  SiSharp,
  SiDotnet,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiJavascript,
  SiPostgresql,
  SiJsonwebtokens,
  SiMysql,
  SiGit,
  SiGithub,
};



export default function Skills() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20 bg-surface-alt/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionTitle number="01.5" title="Technical Arsenal" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-12">
          {TECH_SKILLS.map((skill, index) => {
            const Icon = TECH_ICONS[skill.iconName];

            return (
              <motion.div
                key={skill.name}
                className="group relative flex flex-col items-center justify-center p-8 rounded-2xl bg-card border border-white/5 hover:border-accent/40 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-cursor-hover
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Icon */}
                {Icon && (
                  <Icon className="text-4xl md:text-5xl text-secondary group-hover:text-accent transition-colors duration-500 mb-4 z-10" />
                )}
                
                {/* Skill Name */}
                <span className="text-sm font-medium tracking-wide text-primary z-10">
                  {skill.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
