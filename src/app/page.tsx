"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import CustomCursor from "@/components/ui/CustomCursor";
import Header from "@/components/Header";
import LazySection from "@/components/ui/LazySection";
import Hero from "@/components/sections/Hero";
import dynamic from 'next/dynamic';

const Projects = dynamic(() => import("@/components/sections/Projects"));
const About = dynamic(() => import("@/components/sections/About"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Contact = dynamic(() => import("@/components/sections/Contact"));


export default function Home() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Header />

      <main>
        <Hero />

        <LazySection id="about">
          <About />
        </LazySection>

        <LazySection id="skills">
          <Skills />
        </LazySection>
        <LazySection id="projects">
          <Projects />
        </LazySection>

        <LazySection id="contact">
          <Contact />
        </LazySection>
      </main>
    </ThemeProvider>
  );
}
