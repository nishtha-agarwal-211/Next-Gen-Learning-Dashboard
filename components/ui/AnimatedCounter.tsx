'use client';

/**
 * AnimatedCounter — smoothly counts from 0 to a target number.
 * Uses Framer Motion's `animate` utility for performant number transitions.
 * Features: color transition during count (dim → bright), subtle scale pop on completion.
 * Respects reduced motion preferences.
 */
import { useEffect, useRef, useState } from 'react';
import { animate, useReducedMotion, motion } from 'framer-motion';

interface AnimatedCounterProps {
  /** Target value to count up to */
  target: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Optional prefix (e.g., "🔥") */
  prefix?: string;
  /** Optional suffix (e.g., "XP") */
  suffix?: string;
  /** CSS class for the number */
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1.5,
  prefix,
  suffix,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    if (shouldReduceMotion) {
      ref.current.textContent = String(target);
      setIsComplete(true);
      return;
    }

    setIsComplete(false);

    const controls = animate(0, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (value) => {
        if (ref.current) {
          ref.current.textContent = Math.round(value).toString();
        }
      },
      onComplete: () => {
        setIsComplete(true);
      },
    });

    return () => controls.stop();
  }, [target, duration, shouldReduceMotion]);

  return (
    <motion.span
      className={className}
      animate={
        !shouldReduceMotion && isComplete
          ? { scale: [1, 1.08, 1] }
          : {}
      }
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {prefix && <span>{prefix}</span>}
      <span
        ref={ref}
        className={`tabular-nums transition-opacity duration-500 ${
          isComplete ? 'opacity-100' : 'opacity-70'
        }`}
      >
        {shouldReduceMotion ? target : 0}
      </span>
      {suffix && <span> {suffix}</span>}
    </motion.span>
  );
}
