"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FolderKanban, Award } from "lucide-react";

interface DashboardStatsProps {
  loading: boolean;
  projectsCount: number;
  certificatesCount: number;
}

export default function DashboardStats({
  loading,
  projectsCount,
  certificatesCount,
}: DashboardStatsProps) {
  const statCards = [
    {
      title: "Total Projects",
      value: projectsCount,
      description: "Projects showcase on site",
      icon: FolderKanban,
    },
    {
      title: "Total Certificates",
      value: certificatesCount,
      description: "Acreditations & courses completed",
      icon: Award,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="bg-card/40 border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <span className="text-xs uppercase tracking-wider font-mono text-muted-foreground">
                {stat.title}
              </span>
              <Icon className="size-4 text-accent" />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="h-8 w-16 bg-muted animate-pulse rounded" />
              ) : (
                <>
                  <div className="text-3xl font-bold font-mono">{stat.value}</div>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
