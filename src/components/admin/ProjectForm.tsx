"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadDropzone } from "@/lib/uploadthing";

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

interface ProjectFormProps {
  initialData?: Project | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProjectForm({
  initialData,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStackRaw: "",
    githubLink: "",
    liveLink: "",
    image: "",
    category: "Web Application",
    featured: false,
    order: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        techStackRaw: initialData.techStack?.join(", ") || "",
        githubLink: initialData.githubLink || "",
        liveLink: initialData.liveLink || "",
        image: initialData.image || "",
        category: initialData.category || "Web Application",
        featured: initialData.featured || false,
        order: initialData.order || 0,
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      techStack: formData.techStackRaw
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
      githubLink: formData.githubLink || null,
      liveLink: formData.liveLink || null,
      image: formData.image || null,
    };

    try {
      const url = initialData ? `/api/projects/${initialData.id}` : "/api/projects";
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSuccess();
      } else {
        alert("Failed to save project");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="proj-title">Project Title</Label>
        <Input
          id="proj-title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="e.g. POS System"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="proj-desc">Description</Label>
        <Textarea
          id="proj-desc"
          required
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="What is this project about?"
          className="resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="proj-category">Category</Label>
          <Input
            id="proj-category"
            required
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            placeholder="e.g. Web Application"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="proj-order">Display Order</Label>
          <Input
            id="proj-order"
            type="number"
            required
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
            }
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="proj-tech">Tech Stack (comma separated)</Label>
        <Input
          id="proj-tech"
          required
          value={formData.techStackRaw}
          onChange={(e) =>
            setFormData({ ...formData, techStackRaw: e.target.value })
          }
          placeholder="C#, ASP.NET Core, Next.js"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="proj-git">GitHub Link</Label>
          <Input
            id="proj-git"
            type="url"
            value={formData.githubLink}
            onChange={(e) =>
              setFormData({ ...formData, githubLink: e.target.value })
            }
            placeholder="https://github.com/..."
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="proj-live">Live Link</Label>
          <Input
            id="proj-live"
            type="url"
            value={formData.liveLink}
            onChange={(e) =>
              setFormData({ ...formData, liveLink: e.target.value })
            }
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Project Image</Label>
        <div className="grid grid-cols-1 gap-3">
          <Input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Enter image URL directly"
          />
          <div className="text-center text-xs text-muted-foreground font-mono">
            Or upload via Uploadthing:
          </div>
          <UploadDropzone
            endpoint="projectImage"
            onClientUploadComplete={(res) => {
              if (res && res[0]) {
                const url = res[0].serverData?.url || res[0].ufsUrl || res[0].url;
                setFormData((prev) => ({ ...prev, image: url }));
                alert("Upload complete!");
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Upload failed: ${error.message}`);
            }}
            className="ut-label:text-xs ut-button:bg-accent ut-button:text-accent-foreground ut-allowed-content:text-[10px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 justify-end pt-4 border-t border-border/60">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-accent hover:bg-accent-hover text-accent-foreground"
        >
          {loading ? "Saving..." : initialData ? "Update Project" : "Add Project"}
        </Button>
      </div>
    </form>
  );
}
