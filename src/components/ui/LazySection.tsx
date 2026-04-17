"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ============================================================
// LazySection - Wrapper that only renders children when in view
// Uses Intersection Observer via Framer Motion's useInView hook.
// Single Responsibility: Only handles visibility detection
// ============================================================

interface LazySectionProps {
  children: React.ReactNode;
  id: string;
  className?: string;
  /** How much of the element should be visible before triggering (0-1) */
  threshold?: number;
}

export default function LazySection({
  children,
  id,
  className = "",
  threshold = 0.1,
}: LazySectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: "100px 0px",
  });

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </section>
  );
}
