/**
 * CourseSection — Server Component that fetches courses from Supabase.
 * This is the only component that talks to the database.
 * It's wrapped in a <Suspense> boundary in page.tsx.
 * Includes a 3s timeout to fail fast when Supabase is unreachable.
 */
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CourseGrid } from './CourseGrid';
import type { Course } from '@/lib/types';

export async function CourseSection() {
  let courses: Course[] = [];

  try {
    const supabase = createServerSupabaseClient();

    // Fetch with a Promise.race timeout to avoid aborting the request itself,
    // which can trigger Next.js development server HMR reload loops.
    const fetchPromise = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    const timeoutPromise = new Promise<{ data: any; error: any }>((resolve) =>
      setTimeout(() => resolve({ data: null, error: new Error('Database query timed out after 3s') }), 3000)
    );

    const result = await Promise.race([fetchPromise, timeoutPromise]);

    if (result.error) {
      console.warn('Supabase fetch error:', result.error.message);
    } else {
      courses = (result.data as Course[]) ?? [];
    }
  } catch (err: any) {
    console.warn('Failed to connect to Supabase:', err?.message || err);
  }

  return (
    <section aria-label="Your courses">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-300">Your Courses</h2>
        <span className="text-xs text-zinc-500">
          {courses.length} {courses.length === 1 ? 'course' : 'courses'}
        </span>
      </div>
      <CourseGrid courses={courses} />
    </section>
  );
}
