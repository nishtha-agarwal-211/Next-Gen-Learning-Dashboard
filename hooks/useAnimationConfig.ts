'use client';

/**
 * Central animation configuration hook.
 * Respects the user's `prefers-reduced-motion` system preference.
 * All animated components consume this hook for consistent behavior.
 */
import { useReducedMotion } from 'framer-motion';

export function useAnimationConfig() {
  const shouldReduceMotion = useReducedMotion();

  return {
    /** Whether to disable animations entirely */
    shouldReduceMotion: !!shouldReduceMotion,

    /** Stagger delay between children (seconds) */
    stagger: shouldReduceMotion ? 0 : 0.08,

    /** Tile entry animation variants */
    tileEntry: shouldReduceMotion
      ? { initial: {}, animate: {} }
      : {
          initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        },

    /** Hover scale multiplier */
    hoverScale: shouldReduceMotion ? 1 : 1.02,

    /** Spring physics config for hover and interactions */
    springConfig: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 20,
    },

    /** Entry transition with blur */
    entryTransition: shouldReduceMotion
      ? { duration: 0 }
      : {
          type: 'spring' as const,
          stiffness: 100,
          damping: 15,
          filter: { duration: 0.4 },
        },
  };
}
