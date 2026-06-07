'use client';

/**
 * WeeklyGoalBar — premium progress indicator for the hero tile.
 * Features: animated fill, checkpoint markers at 25/50/75/100%,
 * and celebratory sparkle when goal is ≥ 75%.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WeeklyGoalBarProps {
  percent: number;
}

const CHECKPOINTS = [25, 50, 75, 100];

export function WeeklyGoalBar({ percent }: WeeklyGoalBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-zinc-400">Weekly Goal</span>
        <div className="flex items-center gap-1">
          {clamped >= 75 && !shouldReduceMotion && (
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles className="h-3 w-3 text-emerald-400" />
            </motion.div>
          )}
          <span className="font-medium text-emerald-400">{clamped}%</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-zinc-800">
        {/* Animated fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: clamped / 100 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }
          }
          style={{ transformOrigin: 'left', width: '100%' }}
        />
        {/* Shimmer sweep */}
        {!shouldReduceMotion && clamped > 0 && (
          <motion.div
            className="shimmer-bar absolute inset-y-0 left-0 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: clamped / 100 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6,
            }}
            style={{ transformOrigin: 'left', width: '100%' }}
          />
        )}
        {/* Checkpoint markers */}
        {CHECKPOINTS.map((cp) => (
          <div
            key={cp}
            className={`absolute top-0 h-full w-[2px] transition-colors duration-500 ${
              clamped >= cp ? 'bg-emerald-300/30' : 'bg-zinc-600/30'
            }`}
            style={{ left: `${cp}%` }}
          />
        ))}
      </div>
    </div>
  );
}
