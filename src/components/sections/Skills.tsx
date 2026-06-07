"use client";

import { memo } from "react";
import { TECH_SKILLS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import type { IconType } from "react-icons";
import {
  SiSharp,
  SiDotnet,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiJsonwebtokens,
  SiMysql,
  SiGit,
  SiGithub,
  SiNextdotjs,
  SiPython,
  SiDocker,
  SiPrisma,
} from "react-icons/si";

const TECH_ICONS: Record<string, IconType> = {
  SiSharp,
  SiDotnet,
  SiHtml5,
  SiCss,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiPostgresql,
  SiJsonwebtokens,
  SiMysql,
  SiGit,
  SiGithub,
  SiPython,
  SiDocker,
  SiPrisma,
};

const SkillCard = memo(function SkillCard({
  skill,
  Icon,
}: {
  skill: { name: string; iconName: string };
  Icon: IconType | undefined;
}) {
  return (
    <Card className="group relative bg-card/50 border-border hover:border-accent/40 transition-all duration-500 overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center p-6 md:p-8">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {Icon && (
          <Icon className="text-3xl md:text-4xl text-muted-foreground group-hover:text-accent transition-colors duration-500 mb-3 z-10" />
        )}

        <span className="text-sm font-medium tracking-wide text-foreground z-10">
          {skill.name}
        </span>
      </CardContent>
    </Card>
  );
});

export default function Skills() {
  return (
    <div className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-20 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-accent font-mono text-sm tracking-widest opacity-70">
            01.5
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Technical Arsenal
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {TECH_SKILLS.map((skill) => {
            const Icon = TECH_ICONS[skill.iconName];
            return <SkillCard key={skill.name} skill={skill} Icon={Icon} />;
          })}
        </div>
      </div>
    </div>
  );
}
