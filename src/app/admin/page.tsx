"use client";

import { useEffect, useState } from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FolderKanban, Award, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Stats {
  projectsCount: number;
  certificatesCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ projectsCount: 0, certificatesCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projRes, certRes] = await Promise.all([
          fetch("/api/projects"),
          fetch("/api/certificates"),
        ]);
        
        if (projRes.ok && certRes.ok) {
          const projs = await projRes.json();
          const certs = await certRes.json();
          setStats({
            projectsCount: projs.length,
            certificatesCount: certs.length,
          });
        }
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here is a summary of your portfolio contents.
        </p>
      </div>

      <DashboardStats 
        loading={loading}
        projectsCount={stats.projectsCount}
        certificatesCount={stats.certificatesCount}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card/40 border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FolderKanban className="size-4 text-accent" />
              Quick Projects Manage
            </CardTitle>
            <CardDescription className="text-xs">
              Add new work, edit details, or delete completed milestones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              href="/admin/projects"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium"
            >
              Go to Projects List
              <ChevronRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="size-4 text-accent" />
              Quick Certificates Manage
            </CardTitle>
            <CardDescription className="text-xs">
              Upload credentials, certificates, or awards to showcase your expertise.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              href="/admin/certificates"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover font-medium"
            >
              Go to Certificates List
              <ChevronRight className="size-3.5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
