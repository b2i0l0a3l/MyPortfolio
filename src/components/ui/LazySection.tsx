"use client";

// ============================================================
// LazySection - Simple wrapper with section id (no framer-motion)
// Intersection Observer animations handled by CSS
// ============================================================

interface LazySectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
}

export default function LazySection({
  children,
  id,
  className = "",
}: LazySectionProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      {children}
    </section>
  );
}
