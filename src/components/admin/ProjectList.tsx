"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ExternalLink } from "lucide-react";

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
  order: number;
}

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectList({
  projects,
  onEdit,
  onDelete,
}: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-10 text-xs font-mono text-muted-foreground border border-dashed border-border rounded-xl">
        No projects found. Add your first project!
      </div>
    );
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card/20 backdrop-blur-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Order</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Title</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Category</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Tech Stack</TableHead>
            <TableHead className="font-mono text-xs uppercase tracking-wider">Links</TableHead>
            <TableHead className="text-right font-mono text-xs uppercase tracking-wider">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((proj) => (
            <TableRow key={proj.id} className="hover:bg-muted/10">
              <TableCell className="font-mono text-xs">{proj.order}</TableCell>
              <TableCell className="font-semibold text-sm">{proj.title}</TableCell>
              <TableCell className="text-xs">{proj.category}</TableCell>
              <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                {proj.techStack.join(", ")}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {proj.githubLink && (
                    <a
                      href={proj.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      Git <ExternalLink className="size-3" />
                    </a>
                  )}
                  {proj.liveLink && (
                    <a
                      href={proj.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline inline-flex items-center gap-0.5"
                    >
                      Live <ExternalLink className="size-3" />
                    </a>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(proj)}
                    className="size-8 rounded-lg text-muted-foreground hover:text-foreground"
                    title="Edit project"
                  >
                    <Edit className="size-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this project?")) {
                        onDelete(proj.id);
                      }
                    }}
                    className="size-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
                    title="Delete project"
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
