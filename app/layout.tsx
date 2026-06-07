import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { MobileNav } from "@/components/sidebar/MobileNav";
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
  title: "Andaz — Next-Gen Learning Dashboard",
  description:
    "A futuristic student dashboard with real-time course tracking, learning analytics, and progress visualization. Built with Next.js, Supabase, and Framer Motion.",
  keywords: [
    "learning dashboard",
    "student portal",
    "course tracker",
    "education",
    "analytics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full bg-[#09090b] text-zinc-50">
        {/* Desktop / Tablet sidebar */}
        <Sidebar />

        {/* Main content area */}
        <main className="mesh-gradient-bg relative flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="relative z-10">{children}</div>
        </main>

        {/* Mobile bottom nav */}
        <MobileNav />
      </body>
    </html>
  );
}
