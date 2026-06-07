/**
 * Loading fallback — shown during route-level navigation.
 * Renders a full skeleton matching the dashboard bento layout
 * with premium shimmer animation.
 */
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="w-full px-6 py-6 lg:px-8 lg:py-8">
      {/* Page header skeleton */}
      <div className="mb-6 flex items-center justify-between">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-40 rounded-full" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8">
        {/* Left column skeleton */}
        <div className="flex flex-col gap-5">
          {/* Hero skeleton */}
          <Skeleton className="h-56 w-full rounded-2xl" />

          {/* Course section skeleton */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-28 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </div>

        {/* Right column skeleton */}
        <div className="flex flex-col gap-5">
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
