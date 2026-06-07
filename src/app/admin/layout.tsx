"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ADMIN_EMAIL } from "@/lib/data";
import Sidebar from "@/components/admin/Sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-mono text-sm">
        Loading admin session...
      </div>
    );
  }

  // Not signed in
  if (!isSignedIn) {
    redirect("/sign-in");
  }

  // Check email
  const userEmail = user?.emailAddresses[0]?.emailAddress;
  if (userEmail !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar />

        {/* Content area */}
        <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
