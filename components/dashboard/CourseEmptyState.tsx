'use client';

/**
 * CourseEmptyState — shown when Supabase returns zero courses.
 * Premium illustration with animated floating icon, encouraging copy,
 * and a gradient CTA button.
 */
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';

export function CourseEmptyState() {
  const { shouldReduceMotion } = useAnimationConfig();

  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700/60 bg-zinc-900/30 px-6 py-14 text-center backdrop-blur-sm">
      {/* Floating icon with glow */}
      <motion.div
        animate={
          shouldReduceMotion
            ? {}
            : { y: [0, -8, 0] }
        }
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }
        className="relative mb-5"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 to-violet-500/10">
          <BookOpen className="h-8 w-8 text-indigo-400" />
        </div>
        {/* Glow behind icon */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-indigo-500/10 blur-xl" />
      </motion.div>

      <h3 className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-lg font-semibold text-transparent">
        No active courses yet
      </h3>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-zinc-500">
        Start your learning journey today. Explore our course catalog and find
        something that sparks your curiosity.
      </p>

      <motion.button
        whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:shadow-indigo-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        type="button"
      >
        <Sparkles className="h-4 w-4" />
        Explore Courses
        <ArrowRight className="h-4 w-4" />
      </motion.button>
    </div>
  );
}
