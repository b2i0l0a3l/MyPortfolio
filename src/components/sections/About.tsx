"use client";

import { ABOUT_DATA, SKILLS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Brain,
  Layout,
  Play,
  Code,
  RefreshCw,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  building: <Building2 size={18} />,
  layout: <Layout size={18} />,
  play: <Play size={18} />,
  code: <Code size={18} />,
  brain: <Brain size={18} />,
  refresh: <RefreshCw size={18} />,
};

function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-12 md:mb-16">
      <span className="text-accent font-mono text-sm tracking-widest opacity-70">
        {number}
      </span>
      <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
      <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
        {title}
      </h2>
    </div>
  );
}

export default function About() {
  return (
    <div className="py-24 md:py-32 px-6 md:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <SectionLabel number="01" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
            {ABOUT_DATA.headline.split(" ").map((word, i) =>
              word === "Software" || word === "Engineer" ? (
                <span key={i} className="text-accent">
                  {word}{" "}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h3>

          <p className="text-muted-foreground text-base md:text-lg leading-relaxed self-end">
            {ABOUT_DATA.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-20">
          {ABOUT_DATA.stats.map((stat) => (
            <Card key={stat.label} className="bg-card/50 border-border hover:border-accent/30 transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <span className="block text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-[0.2em]">
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-16 opacity-30" />

        {/* Core Competencies */}
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8 font-medium">
            Core Competencies
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/50 border border-border hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
              >
                <Badge variant="secondary" className="bg-accent/10 text-accent border-0 p-1.5">
                  {ICON_MAP[skill.icon]}
                </Badge>
                <span className="text-sm text-foreground font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
