"use client";

import { motion } from "framer-motion";
import { HERO_DATA } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";

// ============================================================
// Hero Section - Full-screen landing with animated headline
// Single Responsibility: Only renders the hero/landing area
// ============================================================

const letterVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5 + i * 0.04,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  }),
};

function AnimatedLine({ text, lineIndex }: { text: string; lineIndex: number }) {
  return (
    <span className="block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={`${lineIndex}-${i}`}
          className="inline-block"
          custom={lineIndex * 10 + i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const lines = HERO_DATA.title.split("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-10 px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Greeting */}
        <motion.p
          className="text-accent font-mono text-sm md:text-base tracking-wider mb-4 md:mb-6 uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {HERO_DATA.greeting} {HERO_DATA.name}
        </motion.p>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-8 md:mb-10">
          {lines.map((line, i) => (
            <AnimatedLine key={i} text={line} lineIndex={i} />
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-secondary text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          {HERO_DATA.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Button href="#projects" size="lg">
            {HERO_DATA.cta}
            <ArrowDown size={16} />
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full border border-secondary/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
