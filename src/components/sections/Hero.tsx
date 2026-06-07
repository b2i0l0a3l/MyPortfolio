"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { HERO_DATA, CONTACT_DATA } from "@/lib/data";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

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

const AnimatedLine = memo(function AnimatedLine({
  text,
  lineIndex,
}: {
  text: string;
  lineIndex: number;
}) {
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
});

export default function Hero() {
  const { theme } = useTheme();
  const lines = HERO_DATA.title.split("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-10 px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      <ParticleField isDark={theme === "dark"} />

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.p
          className="text-accent font-mono text-sm md:text-base tracking-wider mb-4 md:mb-6 uppercase"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {HERO_DATA.greeting} {HERO_DATA.name}
        </motion.p>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-8 md:mb-10">
          {lines.map((line, i) => (
            <AnimatedLine key={i} text={line} lineIndex={i} />
          ))}
        </h1>

        <motion.p
          className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-10 md:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
        >
          {HERO_DATA.subtitle}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-5 bg-accent text-accent-foreground hover:bg-accent-hover shadow-lg shadow-accent/20 gap-2 text-base"
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {HERO_DATA.cta}
            <ArrowDown size={16} />
          </Button>

          <div className="flex items-center gap-3">
            {CONTACT_DATA.socials.map((social) => {
              const Icon = social.name === "GitHub" ? FaGithub : FaLinkedin;
              return (
                <Tooltip key={social.name}>
                  <TooltipTrigger
                    render={
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/5 transition-all duration-300"
                        aria-label={social.name}
                      >
                        <Icon size={20} />
                      </a>
                    }
                  />
                  <TooltipContent>{social.name}</TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="w-5 h-9 rounded-full border border-muted-foreground/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
