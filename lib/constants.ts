/**
 * Constants and mock data for the Learning Dashboard.
 * Hero stats, activity data, motivational quotes, and navigation items.
 */
import type { HeroStats, ContributionDay, DailyStudy, NavItem } from './types';

// ─── User Config ──────────────────────────────────────────────────────────────

export const USER_NAME = 'Nishtha';

// ─── Hero Stats (Mock) ────────────────────────────────────────────────────────

export const HERO_STATS: HeroStats = {
  streak: 17,
  activeCourses: 4,
  xp: 1240,
  weeklyGoalPercent: 78,
};

// ─── Motivational Quotes ──────────────────────────────────────────────────────

export const QUOTES: string[] = [
  'The expert in anything was once a beginner.',
  'Every line of code is a step forward.',
  'Consistency beats intensity. Keep going.',
  'Learning is not a sprint — it\'s a marathon.',
  'Small daily improvements lead to stunning results.',
  'The best way to predict the future is to create it.',
  'Code is poetry written for machines to understand.',
];

/**
 * Get a quote that rotates daily based on the current date.
 */
export function getDailyQuote(): string {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return QUOTES[dayOfYear % QUOTES.length];
}

/**
 * Get a time-of-day aware greeting.
 */
export function getTimeOfDayGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Calculate user level from XP (every 500 XP = 1 level).
 */
export function getUserLevel(xp: number): { level: number; progress: number } {
  const xpPerLevel = 500;
  const level = Math.floor(xp / xpPerLevel) + 1;
  const progress = ((xp % xpPerLevel) / xpPerLevel) * 100;
  return { level, progress };
}

/** Trend percentage compared to last week (mock) */
export const WEEKLY_TREND_PERCENT = 12;

// ─── Activity Data (Mock) ─────────────────────────────────────────────────────

/**
 * Generate mock contribution heatmap data for the past N weeks.
 */
export function generateContributionData(weeks: number = 20): ContributionDay[] {
  const data: ContributionDay[] = [];
  const today = new Date();

  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - (w * 7 + (6 - d)));

      // Deterministic pseudo-random number based on the date string to avoid hydration mismatches
      const dateStr = date.toISOString().split('T')[0];
      let hash = 0;
      for (let i = 0; i < dateStr.length; i++) {
        hash = dateStr.charCodeAt(i) + ((hash << 5) - hash);
      }
      const rand = Math.abs(hash % 100) / 100;

      let level: 0 | 1 | 2 | 3 | 4;
      if (rand < 0.3) level = 0;
      else if (rand < 0.55) level = 1;
      else if (rand < 0.75) level = 2;
      else if (rand < 0.9) level = 3;
      else level = 4;

      data.push({
        date: dateStr,
        level,
      });
    }
  }

  return data;
}

/** Weekly study hours (mock) */
export const WEEKLY_STUDY_HOURS: DailyStudy[] = [
  { day: 'Mon', hours: 2.5 },
  { day: 'Tue', hours: 1.0 },
  { day: 'Wed', hours: 3.0 },
  { day: 'Thu', hours: 2.0 },
  { day: 'Fri', hours: 0.5 },
  { day: 'Sat', hours: 3.5 },
  { day: 'Sun', hours: 1.5 },
];

export const TOTAL_WEEKLY_HOURS = WEEKLY_STUDY_HOURS.reduce(
  (sum, d) => sum + d.hours,
  0
);
export const TOTAL_ALL_TIME_HOURS = 47;

// ─── Navigation Items ─────────────────────────────────────────────────────────

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', iconName: 'LayoutDashboard', href: '/' },
  { id: 'courses', label: 'Courses', iconName: 'BookMarked', href: '#' },
  { id: 'analytics', label: 'Analytics', iconName: 'BarChart3', href: '#' },
  { id: 'settings', label: 'Settings', iconName: 'Settings', href: '#' },
];

export const PROFILE_NAV_ITEM: NavItem = {
  id: 'profile',
  label: 'Profile',
  iconName: 'User',
  href: '#',
};
