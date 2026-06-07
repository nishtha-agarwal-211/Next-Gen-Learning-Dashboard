'use client';

/**
 * WeeklyBarChart — vertical bar chart showing daily study hours.
 * Features: gradient fills, "today" highlight, average line,
 * hover effects, and staggered bar animation.
 */
import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { DailyStudy } from '@/lib/types';

interface WeeklyBarChartProps {
  data: DailyStudy[];
}

const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function WeeklyBarChart({ data }: WeeklyBarChartProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const maxHours = Math.max(...data.map((d) => d.hours), 1);
  const avgHours = data.reduce((s, d) => s + d.hours, 0) / data.length;
  const avgPercent = (avgHours / maxHours) * 100;

  // Determine "today" day name abbreviation (only on client to avoid hydration mismatch)
  const todayAbbrev = mounted
    ? DAY_NAMES_FULL[new Date().getDay()].slice(0, 3)
    : '';

  return (
    <div className="relative" role="img" aria-label="Weekly study hours chart">
      {/* Average line */}
      <div
        className="absolute left-0 right-0 z-10 border-t border-dashed border-zinc-600/40"
        style={{ bottom: `${avgPercent * 0.8 + 20}px` }}
      >
        <span className="absolute -top-3 right-0 text-[9px] font-medium text-zinc-600">
          avg {avgHours.toFixed(1)}h
        </span>
      </div>

      <div className="flex items-end gap-1.5 sm:gap-2">
        {data.map((day, i) => {
          const isToday = day.day === todayAbbrev;

          return (
            <div key={day.day} className="flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] tabular-nums text-zinc-500">
                {day.hours > 0 ? `${day.hours}h` : ''}
              </span>
              <div className="group relative w-full" style={{ height: '80px' }}>
                <motion.div
                  className={`absolute bottom-0 w-full rounded-t-md transition-shadow duration-200 ${
                    isToday
                      ? 'bar-today'
                      : 'bg-gradient-to-t from-indigo-600/80 to-indigo-400/60'
                  } group-hover:shadow-[0_0_10px_rgba(99,102,241,0.3)]`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: day.hours / maxHours }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { delay: 0.3 + i * 0.05, duration: 0.6, ease: 'easeOut' }
                  }
                  style={{
                    transformOrigin: 'bottom',
                    height: '100%',
                  }}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  isToday ? 'text-indigo-400' : 'text-zinc-500'
                }`}
              >
                {day.day}
                {isToday && (
                  <span className="ml-0.5 inline-block h-1 w-1 rounded-full bg-indigo-400" />
                )}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
