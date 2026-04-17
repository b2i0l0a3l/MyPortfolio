"use client";

import { motion } from "framer-motion";

// ============================================================
// SectionTitle - Reusable section header with animated number
// Single Responsibility: Only renders section titles consistently
// ============================================================

interface SectionTitleProps {
  number: string;
  title: string;
  className?: string;
}

export default function SectionTitle({
  number,
  title,
  className = "",
}: SectionTitleProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 md:mb-16 ${className}`}>
      <motion.span
        className="text-accent font-mono text-sm tracking-widest opacity-70"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {number}
      </motion.span>
      <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
      <motion.h2
        className="text-xs md:text-sm uppercase tracking-[0.3em] text-secondary font-medium"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>
    </div>
  );
}
