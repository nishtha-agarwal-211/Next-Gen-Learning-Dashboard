'use client';

/**
 * CourseTile — premium course card.
 * Features: dynamic icon with colored background, animated progress bar,
 * gradient mesh background, shimmer border on hover, hover CTA button,
 * and completion badge for finished courses.
 */
import { motion } from 'framer-motion';
import { DynamicIcon } from '@/lib/icon-registry';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { CheckCircle, ArrowRight } from 'lucide-react';
import type { Course } from '@/lib/types';

interface CourseTileProps {
  course: Course;
  /** Index for staggered gradient variant */
  index: number;
}

/** Per-card gradient variants for visual variety */
const CARD_GRADIENTS = [
  'radial-gradient(ellipse 80% 60% at 20% 80%, rgba(99,102,241,0.1), transparent)',
  'radial-gradient(ellipse 80% 60% at 80% 20%, rgba(139,92,246,0.1), transparent)',
  'radial-gradient(ellipse 80% 60% at 50% 90%, rgba(52,211,153,0.08), transparent)',
  'radial-gradient(ellipse 80% 60% at 30% 30%, rgba(244,114,182,0.08), transparent)',
];

const PROGRESS_GRADIENTS = [
  'bg-gradient-to-r from-indigo-500 to-violet-500',
  'bg-gradient-to-r from-violet-500 to-purple-500',
  'bg-gradient-to-r from-emerald-500 to-teal-400',
  'bg-gradient-to-r from-pink-500 to-rose-400',
];

const GLOW_COLORS = [
  'rgba(99, 102, 241, 0.2)',
  'rgba(139, 92, 246, 0.2)',
  'rgba(52, 211, 153, 0.15)',
  'rgba(244, 114, 182, 0.15)',
];

const ICON_BG_CLASSES = [
  'from-indigo-500/20 to-violet-500/20 border-indigo-400/20',
  'from-violet-500/20 to-purple-500/20 border-violet-400/20',
  'from-emerald-500/20 to-teal-500/20 border-emerald-400/20',
  'from-pink-500/20 to-rose-500/20 border-pink-400/20',
];

const ICON_TEXT_CLASSES = [
  'text-indigo-400',
  'text-violet-400',
  'text-emerald-400',
  'text-pink-400',
];

export function CourseTile({ course, index }: CourseTileProps) {
  const { hoverScale, springConfig, shouldReduceMotion } = useAnimationConfig();
  const gradientIndex = index % CARD_GRADIENTS.length;
  const isComplete = course.progress >= 100;

  return (
    <motion.article
      whileHover={shouldReduceMotion ? undefined : { scale: hoverScale }}
      transition={springConfig}
      className="group glow-card relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-5 backdrop-blur-xl transition-all duration-300 ease-out will-change-transform hover:border-white/[0.12] hover:shadow-[0_0_0_1px_var(--glow),0_0_30px_var(--glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
      style={{ '--glow': GLOW_COLORS[gradientIndex] } as React.CSSProperties}
      tabIndex={0}
      aria-label={`${course.title}: ${course.progress}% complete`}
    >
      {/* Gradient mesh background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 group-hover:opacity-150"
        style={{ background: CARD_GRADIENTS[gradientIndex] }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Icon + title + completion badge */}
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border bg-gradient-to-br ${ICON_BG_CLASSES[gradientIndex]} transition-transform duration-300 group-hover:scale-110`}>
            <DynamicIcon name={course.icon_name} className={`h-5 w-5 ${ICON_TEXT_CLASSES[gradientIndex]}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-sm font-semibold text-zinc-100">
                {course.title}
              </h3>
              {isComplete && (
                <CheckCircle className="h-4 w-4 shrink-0 text-emerald-400" />
              )}
            </div>
            <p className="text-xs text-zinc-500">
              {isComplete ? 'Completed!' : `${course.progress}% complete`}
            </p>
          </div>

          {/* Hover CTA arrow */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 0, x: -8 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="pointer-events-none opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] transition-colors duration-200 group-hover:bg-white/[0.1]">
              <ArrowRight className="h-4 w-4 text-zinc-300" />
            </div>
          </motion.div>
        </div>

        {/* Progress bar */}
        <ProgressBar
          value={course.progress}
          gradientClass={PROGRESS_GRADIENTS[gradientIndex]}
          label={course.title}
          showPercent
        />
      </div>
    </motion.article>
  );
}
