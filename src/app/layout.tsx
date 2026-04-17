import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creating Cultural Interfaces",
  description:
    "Architect & Digital Designer crafting immersive experiences at the intersection of technology and culture.",
  keywords: ["portfolio", "architect", "digital designer", "UI/UX", "creative"],
  openGraph: {
    title: "Portfolio | Creating Cultural Interfaces",
    description:
      "Architect & Digital Designer crafting immersive experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
