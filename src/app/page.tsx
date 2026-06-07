"use client";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import ChatWidget from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <Header />

        <main className="relative z-10">
          <Hero />
          
          <div id="about">
            <About />
          </div>
          
          <div id="skills">
            <Skills />
          </div>
          
          <div id="projects">
            <Projects />
          </div>
          
          <div id="certificates">
            <Certificates />
          </div>

          <div id="contact">
            <Contact />
          </div>
        </main>

        <ChatWidget />
      </div>
    </ThemeProvider>
  );
}
