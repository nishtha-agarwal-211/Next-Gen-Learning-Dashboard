'use client';

/**
 * Skeleton loading primitive.
 * Renders a shimmer-animated placeholder matching the component it replaces.
 * Uses a moving gradient for a premium loading effect.
 */
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  /** Render as a circle (for avatar placeholders) */
  circle?: boolean;
}

export function Skeleton({ className, circle }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'skeleton-shimmer',
        circle ? 'rounded-full' : 'rounded-xl',
        className
      )}
    />
  );
}
