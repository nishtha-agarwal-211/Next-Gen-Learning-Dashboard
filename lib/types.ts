/**
 * TypeScript interfaces for the Learning Dashboard.
 * All Supabase data payloads and component props are typed here.
 */

/** Course record from the Supabase `courses` table */
export interface Course {
  id: string;
  title: string;
  progress: number;
  icon_name: string;
  created_at: string;
}

/** Hero tile statistics (mock data) */
export interface HeroStats {
  streak: number;
  activeCourses: number;
  xp: number;
  weeklyGoalPercent: number;
}

/** Single day in the contribution heatmap */
export interface ContributionDay {
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

/** Daily study hours for the weekly bar chart */
export interface DailyStudy {
  day: string;
  hours: number;
}

/** Navigation item in the sidebar */
export interface NavItem {
  id: string;
  label: string;
  iconName: string;
  href: string;
}
