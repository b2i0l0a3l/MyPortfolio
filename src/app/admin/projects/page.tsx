"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ProjectForm from "@/components/admin/ProjectForm";
import ProjectList from "@/components/admin/ProjectList";

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

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsOpen(true);
  };

  const handleClose = () => {
    setEditingProject(null);
    setIsOpen(false);
  };

  const handleSuccess = () => {
    fetchProjects();
    handleClose();
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Display your work dynamically on the main page.
          </p>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-accent hover:bg-accent-hover text-accent-foreground gap-2 text-sm"
        >
          <Plus className="size-4" />
          Add Project
        </Button>
      </div>

      {loading ? (
        <div className="h-64 w-full bg-card/20 border border-border animate-pulse rounded-xl" />
      ) : (
        <ProjectList
          projects={projects}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Dialog for form */}
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-lg bg-background/95 border-border backdrop-blur-lg overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {editingProject ? "Update details of the selected project." : "Create a new project listing."}
            </DialogDescription>
          </DialogHeader>
          <ProjectForm
            initialData={editingProject}
            onSuccess={handleSuccess}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
