/**
 * Dashboard Page — Server Component.
 *
 * Architecture:
 * - HeroTile and ActivityTile render immediately (static/mock data)
 * - CourseSection is wrapped in Suspense (async Supabase fetch)
 * - Only course cards show loading skeletons
 *
 * This demonstrates granular Suspense — not wrapping the entire page.
 */
import { Suspense } from "react";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { CourseSection } from "@/components/dashboard/CourseSection";
import { CourseSkeletons } from "@/components/dashboard/CourseSkeletons";

function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const dateString = formatDate();

  return (
    <div className="w-full px-6 py-6 lg:px-8 lg:py-8">
      {/* Page header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            Dashboard
          </h2>
        </div>
        <time
          dateTime={new Date().toISOString()}
          className="rounded-full border border-white/[0.06] bg-zinc-900/40 px-3 py-1 text-xs text-zinc-500 backdrop-blur-sm"
        >
          {dateString}
        </time>
      </div>

      {/* Bento grid layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
        {/* Left column — Hero + Courses */}
        <div className="flex flex-col gap-5">
          {/* Hero tile — renders instantly (no data dependency) */}
          <HeroTile />

          {/* Course section — wrapped in Suspense for streaming SSR */}
          <Suspense fallback={<CourseSkeletons />}>
            <CourseSection />
          </Suspense>
        </div>

        {/* Right column — Activity tile */}
        <div className="flex flex-col gap-5">
          <ActivityTile />
        </div>
      </div>
    </div>
  );
}
