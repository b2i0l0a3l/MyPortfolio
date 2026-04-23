"use client";

// ============================================================
// SectionTitle - Reusable section header (CSS only, no framer-motion)
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
      <span className="text-accent font-mono text-sm tracking-widest opacity-70">
        {number}
      </span>
      <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
      <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-secondary font-medium">
        {title}
      </h2>
    </div>
  );
}
