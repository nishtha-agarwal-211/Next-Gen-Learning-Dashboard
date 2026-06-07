'use client';

/**
 * ActivityTile — premium analytics compound component.
 * Combines:
 * 1. Animated circular progress ring (weekly goal)
 * 2. Summary stats with trend indicators
 * 3. Contribution heatmap
 * 4. Weekly study hours bar chart
 */
import { motion } from 'framer-motion';
import { BarChart3, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { ContributionHeatmap } from './ContributionHeatmap';
import { WeeklyBarChart } from './WeeklyBarChart';
import {
  generateContributionData,
  WEEKLY_STUDY_HOURS,
  TOTAL_WEEKLY_HOURS,
  TOTAL_ALL_TIME_HOURS,
  WEEKLY_TREND_PERCENT,
  HERO_STATS,
} from '@/lib/constants';
import { useMemo } from 'react';

/**
 * Animated SVG circular progress ring.
 */
function CircularProgress({ percent }: { percent: number }) {
  const { shouldReduceMotion } = useAnimationConfig();
  const clamped = Math.min(100, Math.max(0, percent));
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className="relative flex h-24 w-24 items-center justify-center shrink-0">
      <svg className="-rotate-90" width="96" height="96" viewBox="0 0 96 96">
        {/* Track */}
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke="rgba(39, 39, 42, 0.8)"
          strokeWidth="6"
        />
        {/* Progress arc with gradient */}
        <motion.circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke="url(#ring-gradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }
          }
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tabular-nums text-zinc-100">{clamped}%</span>
        <span className="text-[9px] font-medium text-zinc-500">Weekly</span>
      </div>
    </div>
  );
}

export function ActivityTile() {
  const { tileEntry, entryTransition } = useAnimationConfig();
  const contributionData = useMemo(() => generateContributionData(20), []);

  return (
    <motion.section
      initial={tileEntry.initial}
      animate={tileEntry.animate}
      transition={entryTransition}
      aria-label="Learning activity"
      className="glow-card relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-5 backdrop-blur-xl sm:p-6"
    >
      {/* Subtle gradient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 80% 20%, rgba(99,102,241,0.06), transparent), ' +
            'radial-gradient(ellipse 50% 60% at 20% 80%, rgba(139,92,246,0.04), transparent)',
        }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-400/20">
              <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">
              Learning Activity
            </h2>
          </div>
          <span className="rounded-full border border-white/[0.06] bg-zinc-800/60 px-2.5 py-0.5 text-[10px] font-medium text-zinc-400">
            Last 20 weeks
          </span>
        </div>

        {/* Circular progress + Summary stats side by side */}
        <div className="flex items-center gap-4">
          <CircularProgress percent={HERO_STATS.weeklyGoalPercent} />

          <div className="flex flex-1 flex-col gap-2.5">
            <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-indigo-500/10">
                <Clock className="h-3.5 w-3.5 text-indigo-400" />
              </div>
              <div className="flex-1">
                <p className="text-base font-semibold tabular-nums text-zinc-100">
                  {TOTAL_WEEKLY_HOURS}h
                </p>
                <p className="text-[10px] text-zinc-500">This Week</p>
              </div>
              {/* Trend badge */}
              <div className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5">
                <ArrowUpRight className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-400">{WEEKLY_TREND_PERCENT}%</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.04] bg-zinc-800/40 px-3 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500/10">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div>
                <p className="text-base font-semibold tabular-nums text-zinc-100">
                  {TOTAL_ALL_TIME_HOURS}h
                </p>
                <p className="text-[10px] text-zinc-500">Total Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contribution heatmap */}
        <div>
          <p className="mb-2 text-xs font-medium text-zinc-400">
            Contributions
          </p>
          <ContributionHeatmap data={contributionData} />
        </div>

        {/* Weekly bar chart */}
        <div>
          <p className="mb-2 text-xs font-medium text-zinc-400">
            This Week
          </p>
          <WeeklyBarChart data={WEEKLY_STUDY_HOURS} />
        </div>
      </div>
    </motion.section>
  );
}
