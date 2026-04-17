"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ============================================================
// Custom Cursor - Follows mouse, inverts color on text hover,
// and scales up when hovering over interactive elements.
// Single Responsibility: Only manages cursor rendering & state.
// ============================================================

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
        if (!isVisible) setIsVisible(true);
      });
    },
    [cursorX, cursorY, isVisible]
  );

  useEffect(() => {
    // Hide on touch devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", () => setIsVisible(false));
    document.addEventListener("mouseenter", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest(
        "a, button, h1, h2, h3, h4, p, span, li, [data-cursor-hover]"
      );
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="custom-cursor-ring"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 80 : 40,
          height: isHovering ? 80 : 40,
          borderRadius: "50%",
          border: "1.5px solid var(--cursor-color)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 0.5 : 0,
          transition: "width 0.3s, height 0.3s, opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
      {/* Inner dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovering ? 40 : 8,
          height: isHovering ? 40 : 8,
          borderRadius: "50%",
          backgroundColor: "var(--cursor-color)",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "width 0.25s, height 0.25s, opacity 0.3s",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
