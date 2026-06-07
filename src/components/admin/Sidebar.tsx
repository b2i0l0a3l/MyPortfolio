"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, Award, LogOut, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/projects", label: "Projects", icon: FolderKanban },
    { href: "/admin/certificates", label: "Certificates", icon: Award },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/40 backdrop-blur-md flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 mb-8 group">
          <ArrowLeft className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground font-semibold font-mono">
            Back to Site
          </span>
        </Link>

        <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-accent font-bold mb-8 pl-1">
          Admin Panel
        </h2>

        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="size-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-6 border-t border-border/60">
        <SignOutButton redirectUrl="/">
          <Button variant="destructive" className="w-full rounded-lg gap-2 text-xs py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive border-0">
            <LogOut className="size-3.5" />
            Sign Out
          </Button>
        </SignOutButton>
      </div>
    </aside>
  );
}
