"use client";

import { useState, useEffect, useCallback } from "react";
import { useTheme } from "@/context/ThemeContext";
import { NAV_LINKS, HERO_DATA } from "@/lib/data";
import { Sun, Moon, Menu, X } from "lucide-react";

// ============================================================
// Header - Pure CSS, zero framer-motion for max performance
// ============================================================

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const pageOrder = ["hero", "about", "skills", "projects", "contact"];
      for (let i = pageOrder.length - 1; i >= 0; i--) {
        const el = document.getElementById(pageOrder[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(pageOrder[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const scrollTo = useCallback(
    (href: string) => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setIsMobileOpen(false);
    },
    []
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-3 backdrop-blur-md border-b border-border"
            : "py-5 bg-transparent"
        }`}
        style={isScrolled ? { backgroundColor: 'color-mix(in srgb, var(--background) 80%, transparent)' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#hero");
            }}
            className="text-primary font-bold text-lg tracking-tight hover:scale-105 transition-transform duration-200"
          >
            {HERO_DATA.name.toUpperCase()}<span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`text-xs uppercase tracking-[0.2em] transition-colors duration-300 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-accent"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary hover:text-primary hover:bg-white/5 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-secondary hover:text-primary transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-primary"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - CSS transition, no framer-motion */}
      <div
        className={`md:hidden fixed inset-0 top-0 pt-20 backdrop-blur-md z-[99] transition-all duration-300 ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: 'color-mix(in srgb, var(--background) 95%, transparent)' }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-10">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className={`text-2xl uppercase tracking-[0.3em] font-light transition-all duration-300 ${
                activeSection === link.href.replace("#", "")
                  ? "text-accent"
                  : "text-secondary"
              }`}
              style={{
                transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms",
                transform: isMobileOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isMobileOpen ? 1 : 0,
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
