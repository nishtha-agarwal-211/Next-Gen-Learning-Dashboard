'use client';

/**
 * ProgressBar — animated progress indicator with shimmer effect.
 * Animates from 0% to the target value on mount using scaleX for GPU acceleration.
 * Features shimmer sweep across the fill, optional percentage label.
 * Accessible with proper ARIA attributes.
 */
import { motion, useReducedMotion } from 'framer-motion';

interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Gradient color class for the fill */
  gradientClass?: string;
  /** CSS class for the container */
  className?: string;
  /** Accessible label */
  label?: string;
  /** Whether to show the percentage text */
  showPercent?: boolean;
}

export function ProgressBar({
  value,
  gradientClass = 'bg-gradient-to-r from-indigo-500 to-violet-500',
  className = '',
  label = 'Progress',
  showPercent = false,
}: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${clampedValue}%`}
        className="relative h-2 w-full overflow-hidden rounded-full bg-zinc-800/80"
      >
        {/* Main fill */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${gradientClass}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: clampedValue / 100 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3,
                }
          }
          style={{ transformOrigin: 'left', width: '100%' }}
        />
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${gradientClass} opacity-40 blur-sm`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: clampedValue / 100 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : {
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.3,
                }
          }
          style={{ transformOrigin: 'left', width: '100%' }}
        />
        {/* Shimmer sweep overlay */}
        {!shouldReduceMotion && clampedValue > 0 && (
          <motion.div
            className="shimmer-bar absolute inset-y-0 left-0 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: clampedValue / 100 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.3,
            }}
            style={{ transformOrigin: 'left', width: '100%' }}
          />
        )}
      </div>
      {/* Percentage label */}
      {showPercent && (
        <motion.span
          className="shrink-0 text-xs font-medium tabular-nums text-zinc-400"
          initial={shouldReduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { delay: 1.5, duration: 0.4 }
          }
        >
          {clampedValue}%
        </motion.span>
      )}
    </div>
  );
}
