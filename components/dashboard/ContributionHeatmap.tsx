'use client';

/**
 * ContributionHeatmap — GitHub-style contribution grid with tooltips.
 * Each cell is color-coded by activity level (0–4) with vibrant indigo tones.
 * Features: staggered cell animation, hover tooltips, and activity legend.
 */
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import type { ContributionDay } from '@/lib/types';

interface ContributionHeatmapProps {
  data: ContributionDay[];
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'bg-zinc-800/60',
  1: 'bg-indigo-900/50',
  2: 'bg-indigo-600/60',
  3: 'bg-indigo-500/80',
  4: 'bg-indigo-400',
};

const LEVEL_LABELS: Record<number, string> = {
  0: 'No activity',
  1: 'Light activity',
  2: 'Moderate activity',
  3: 'High activity',
  4: 'Peak activity',
};

export function ContributionHeatmap({ data }: ContributionHeatmapProps) {
  const shouldReduceMotion = useReducedMotion();
  const weeks = Math.ceil(data.length / 7);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-2">
      {/* Heatmap grid */}
      <div className="relative overflow-x-auto">
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateRows: 'repeat(7, 1fr)',
            gridTemplateColumns: `repeat(${weeks}, 1fr)`,
            gridAutoFlow: 'column',
          }}
          role="img"
          aria-label="Learning activity contribution heatmap"
        >
          {data.map((day, i) => (
            <div key={day.date} className="relative">
              <motion.div
                className={`h-[10px] w-[10px] rounded-[2px] transition-transform duration-150 hover:scale-125 sm:h-3 sm:w-3 sm:rounded-[3px] ${LEVEL_COLORS[day.level]} cursor-pointer`}
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: i * 0.002, duration: 0.3 }
                }
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
              {/* Tooltip */}
              {hoveredIndex === i && (
                <div className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/[0.08] bg-zinc-800/95 px-2 py-1 text-[10px] text-zinc-300 shadow-lg backdrop-blur-sm">
                  <span className="font-medium">{day.date}</span>
                  <span className="ml-1.5 text-zinc-500">· {LEVEL_LABELS[day.level]}</span>
                  <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-b border-r border-white/[0.08] bg-zinc-800/95" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-[10px] w-[10px] rounded-[2px] sm:h-3 sm:w-3 ${LEVEL_COLORS[level]}`}
            title={LEVEL_LABELS[level]}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
