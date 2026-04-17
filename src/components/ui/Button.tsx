"use client";

import { motion } from "framer-motion";

// ============================================================
// Button - Reusable button with pill shape and hover animation
// Single Responsibility: Only renders styled buttons
// ============================================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20",
  outline:
    "border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent",
  ghost: "text-secondary hover:text-primary hover:bg-white/5",
};

const sizes = {
  sm: "px-5 py-2 text-xs",
  md: "px-7 py-3 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const baseStyle = `
    inline-flex items-center justify-center gap-2
    rounded-full font-medium tracking-wide
    transition-all duration-300 ease-out
    ${variants[variant]} ${sizes[size]} ${className}
  `.trim();

  const motionProps = {
    whileHover: { scale: 1.03, y: -1 },
    whileTap: { scale: 0.97 },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseStyle}
        data-cursor-hover
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseStyle}
      data-cursor-hover
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
