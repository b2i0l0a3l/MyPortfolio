"use client";

import { HERO_DATA, CONTACT_DATA } from "@/lib/data";
import Button from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

// ============================================================
// Hero Section - Full-screen landing with CSS-only animations
// Replaced framer-motion with CSS @keyframes for performance
// ============================================================

export default function Hero() {
  const lines = HERO_DATA.title.split("\n");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-10 px-6 md:px-10 lg:px-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full bg-accent/10 md:bg-accent/5 blur-[60px] md:blur-[120px]" />
        <div className="absolute bottom-1/4 -left-1/4 w-[200px] md:w-[400px] h-[200px] md:h-[400px] rounded-full bg-accent/5 md:bg-accent/3 blur-[50px] md:blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        
        {/* Greeting */}
        <p
          className="text-accent font-mono text-sm md:text-base tracking-wider mb-4 md:mb-6 uppercase animate-fade-in-left"
          style={{ animationDelay: "0.2s" }}
        >
          {HERO_DATA.greeting} {HERO_DATA.name}
        </p>

        {/* Main Title - word-by-word CSS animation instead of letter-by-letter motion.span */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9] mb-8 md:mb-10">
          {lines.map((line, lineIdx) => (
            <span key={lineIdx} className="block overflow-hidden">
              {line.split(" ").map((word, wordIdx) => (
                <span
                  key={`${lineIdx}-${wordIdx}`}
                  className="inline-block animate-slide-up"
                  style={{
                    animationDelay: `${0.5 + (lineIdx * 3 + wordIdx) * 0.12}s`,
                  }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="text-secondary text-base md:text-lg lg:text-xl max-w-xl leading-relaxed mb-10 md:mb-12 animate-fade-in-up"
          style={{ animationDelay: "1.2s" }}
        >
          {HERO_DATA.subtitle}
        </p>

        {/* CTA and Socials */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "1.5s" }}
        >
          <Button href="#projects" size="lg">
            {HERO_DATA.cta}
            <ArrowDown size={16} />
          </Button>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {CONTACT_DATA.socials.map((social) => {
              const Icon = social.name === "GitHub" ? FaGithub : FaLinkedin;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full border border-white/10 text-secondary hover:text-primary hover:border-accent/50 hover:bg-white/5 transition-all duration-300"
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator - CSS only */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in-up"
        style={{ animationDelay: "2s" }}
      >
        <div className="w-5 h-9 rounded-full border border-secondary/30 flex justify-center pt-2 animate-bounce-slow">
          <div className="w-1 h-2 rounded-full bg-accent/60" />
        </div>
      </div>
    </section>
  );
}
