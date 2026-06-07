'use client';

/**
 * HeroTile — the visual centerpiece of the dashboard.
 * Displays: time-aware greeting, user avatar, motivational quote,
 * animated stat counters, level badge, and weekly learning goal progress.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, BookOpen, Zap, Target, Trophy } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { WeeklyGoalBar } from '@/components/ui/WeeklyGoalBar';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import {
  USER_NAME,
  HERO_STATS,
  getDailyQuote,
  getTimeOfDayGreeting,
  getUserLevel,
} from '@/lib/constants';

interface HeroTileProps {
  /** Number of active courses (from Supabase data) */
  activeCourseCount?: number;
}

const STAT_ITEMS = [
  {
    icon: Flame,
    value: HERO_STATS.streak,
    label: 'Day Streak',
    color: 'text-orange-400',
    bgColor: 'bg-orange-400/10',
    borderColor: 'border-orange-400/20',
    glowColor: 'rgba(251, 146, 60, 0.15)',
  },
  {
    icon: BookOpen,
    value: HERO_STATS.activeCourses,
    label: 'Active Courses',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-400/10',
    borderColor: 'border-indigo-400/20',
    glowColor: 'rgba(129, 140, 248, 0.15)',
    dynamic: true, // uses activeCourseCount prop
  },
  {
    icon: Zap,
    value: HERO_STATS.xp,
    label: 'XP Earned',
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    borderColor: 'border-amber-400/20',
    glowColor: 'rgba(251, 191, 36, 0.15)',
  },
];

export function HeroTile({ activeCourseCount }: HeroTileProps) {
  const { tileEntry, entryTransition, shouldReduceMotion } = useAnimationConfig();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const quote = mounted ? getDailyQuote() : 'Consistency beats intensity. Keep going.';
  const greeting = mounted ? getTimeOfDayGreeting() : 'Welcome';
  const userLevel = getUserLevel(HERO_STATS.xp);

  return (
    <motion.section
      initial={tileEntry.initial}
      animate={tileEntry.animate}
      transition={entryTransition}
      aria-label="Welcome section"
      className="glow-card-animate relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/60 p-6 backdrop-blur-xl sm:p-8"
    >
      {/* Gradient mesh background — richer with more color stops */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(99,102,241,0.1), transparent), ' +
            'radial-gradient(ellipse 60% 60% at 80% 20%, rgba(139,92,246,0.08), transparent), ' +
            'radial-gradient(ellipse 50% 50% at 60% 80%, rgba(52,211,153,0.05), transparent), ' +
            'radial-gradient(ellipse 40% 40% at 90% 60%, rgba(244,114,182,0.04), transparent)',
        }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">
        {/* Top row: Avatar + Greeting + Level Badge */}
        <header className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* User avatar with animated gradient ring */}
            <div className="avatar-ring relative h-12 w-12 shrink-0 sm:h-14 sm:w-14">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600">
                <span className="text-lg font-bold text-white sm:text-xl">
                  {USER_NAME.charAt(0)}
                </span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
                {greeting}, {USER_NAME}{' '}
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="inline-block origin-[70%_70%]"
                >
                  👋
                </motion.span>
              </h1>
              <p className="mt-1 text-sm text-zinc-400 italic">
                &ldquo;{quote}&rdquo;
              </p>
            </div>
          </div>

          {/* Level badge */}
          <motion.div
            initial={shouldReduceMotion ? {} : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.8 }}
            className="flex shrink-0 flex-col items-center gap-1 rounded-xl border border-amber-400/20 bg-amber-400/10 px-3 py-2 sm:px-4 sm:py-2.5"
          >
            <div className="flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">Level</span>
            </div>
            <span className="text-xl font-bold tabular-nums text-amber-300 sm:text-2xl">
              {userLevel.level}
            </span>
          </motion.div>
        </header>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {STAT_ITEMS.map((stat, i) => {
            const Icon = stat.icon;
            const value = stat.dynamic && activeCourseCount !== undefined
              ? activeCourseCount
              : stat.value;

            return (
              <motion.div
                key={stat.label}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { delay: 0.3 + i * 0.1, duration: 0.5, ease: 'easeOut' }
                }
                className={`group relative flex items-center gap-3 overflow-hidden rounded-xl border ${stat.borderColor} ${stat.bgColor} p-3 transition-shadow duration-300 hover:shadow-[0_0_20px_var(--glow)] sm:p-4`}
                style={{ '--glow': stat.glowColor } as React.CSSProperties}
              >
                {/* Icon with gradient background */}
                <div className={`rounded-lg ${stat.bgColor} border ${stat.borderColor} p-2 transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                </div>
                <div>
                  <AnimatedCounter
                    target={value}
                    className={`text-lg font-semibold ${stat.color} sm:text-xl`}
                  />
                  <p className="text-[11px] text-zinc-500 sm:text-xs">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}

          {/* Weekly Goal — spans full width on mobile, single cell on desktop */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { delay: 0.6, duration: 0.5, ease: 'easeOut' }
            }
            className="col-span-2 flex flex-col justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 sm:col-span-1 sm:p-4"
          >
            <div className="mb-1 flex items-center gap-2">
              <Target className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" />
              <span className="text-xs font-medium text-emerald-400">Goal</span>
            </div>
            <WeeklyGoalBar percent={HERO_STATS.weeklyGoalPercent} />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
