"use client";

// ============================================================
// Button - Reusable button with pill shape (CSS only, no framer-motion)
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
    hover:scale-[1.03] hover:-translate-y-[1px] active:scale-[0.97]
    ${variants[variant]} ${sizes[size]} ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={baseStyle}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseStyle}>
      {children}
    </button>
  );
}
