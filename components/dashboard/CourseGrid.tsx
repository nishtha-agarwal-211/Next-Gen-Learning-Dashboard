'use client';

/**
 * CourseGrid — renders course tiles with staggered entry animation.
 * Handles empty state when no courses exist.
 * This is a Client Component because it uses Framer Motion.
 */
import { motion } from 'framer-motion';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { CourseTile } from './CourseTile';
import { CourseEmptyState } from './CourseEmptyState';
import type { Course } from '@/lib/types';

interface CourseGridProps {
  courses: Course[];
}

export function CourseGrid({ courses }: CourseGridProps) {
  const { stagger, entryTransition, shouldReduceMotion } =
    useAnimationConfig();

  if (courses.length === 0) {
    return <CourseEmptyState />;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: 0.1,
          },
        },
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      {courses.map((course, index) => (
        <motion.div
          key={course.id}
          variants={{
            hidden: shouldReduceMotion
              ? {}
              : { opacity: 0, y: 20, filter: 'blur(10px)' },
            visible: shouldReduceMotion
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: entryTransition,
                },
          }}
        >
          <CourseTile course={course} index={index} />
        </motion.div>
      ))}
    </motion.div>
  );
}
