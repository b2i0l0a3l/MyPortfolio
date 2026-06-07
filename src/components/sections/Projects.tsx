"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string | null;
  liveLink: string | null;
  image: string | null;
  category: string;
  featured: boolean;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
          
          // Extract unique categories
          const cats = new Set<string>();
          cats.add("All");
          data.forEach((p: Project) => {
            if (p.category) cats.add(p.category);
          });
          setCategories(Array.from(cats));
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = activeTab === "All" 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <section id="projects" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 md:px-10 lg:px-20 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-12 md:mb-16">
          <span className="text-accent font-mono text-sm tracking-widest opacity-70">
            02
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-accent/30" />
          <h2 className="text-xs md:text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
            Selected Work
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            DIGITAL
            <br />
            ARTIFACTS<span className="text-accent">.</span>
          </h2>

          {!loading && categories.length > 1 && (
            <Tabs defaultValue="All" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-muted/50 border border-border rounded-full p-1 flex-wrap gap-1 h-auto">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-wider data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[1, 2].map((i) => (
              <Card key={i} className="bg-card/50 border-border animate-pulse h-[400px]" />
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No projects added yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredProjects.map((project) => (
              <Card 
                key={project.id} 
                className="group relative overflow-hidden bg-card/50 border-border hover:border-accent/40 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-purple-900/10 text-muted-foreground font-mono text-sm">
                      No Preview Image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {project.category && (
                    <span className="absolute top-4 left-4 text-[10px] font-mono uppercase text-white tracking-wider bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                  )}
                </div>

                <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <Badge 
                        key={tech} 
                        variant="secondary" 
                        className="bg-accent/5 text-accent border border-accent/10 text-[10px] font-mono uppercase rounded-md px-2 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border mt-auto">
                    {project.githubLink && (
                      <Button variant="outline" size="sm" className="rounded-full gap-2 text-xs" render={<a href={project.githubLink} target="_blank" rel="noopener noreferrer" />}>
                        <FaGithub className="size-3.5" />
                        Code
                      </Button>
                    )}
                    {project.liveLink && (
                      <Button size="sm" className="rounded-full gap-2 text-xs bg-accent hover:bg-accent-hover text-accent-foreground" render={<a href={project.liveLink} target="_blank" rel="noopener noreferrer" />}>
                        <ExternalLink className="size-3.5" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
