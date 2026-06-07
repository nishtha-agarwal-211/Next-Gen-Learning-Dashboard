'use client';

/**
 * CourseSkeletons — loading skeleton for the course section.
 * Shown while <CourseSection> is fetching from Supabase via Suspense.
 */
import { Skeleton } from '@/components/ui/Skeleton';

export function CourseSkeletons() {
  return (
    <section aria-label="Loading courses" aria-busy="true">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/[0.06] bg-zinc-900/40 p-5"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="mt-4 h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </section>
  );
}
