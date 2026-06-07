'use client';

/**
 * GlowCard — a reusable animated card wrapper with mouse-tracking gradient.
 * Features:
 * - Glassmorphism background
 * - Mouse-tracking radial gradient that follows cursor
 * - Spring-physics hover scale (transform only — zero layout shift)
 * - Border glow on hover (box-shadow transition)
 * - Grain texture overlay
 * - Reduced motion support
 */
import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';
import { useAnimationConfig } from '@/hooks/useAnimationConfig';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  /** Accent color for the glow (CSS color value) */
  glowColor?: string;
  /** Whether to show the grain texture overlay */
  grain?: boolean;
}

export function GlowCard({
  children,
  className,
  glowColor = 'rgba(129, 140, 248, 0.15)',
  grain = false,
}: GlowCardProps) {
  const { hoverScale, springConfig, shouldReduceMotion } = useAnimationConfig();
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    },
    [reducedMotion]
  );

  return (
    <motion.div
      ref={cardRef}
      whileHover={shouldReduceMotion ? undefined : { scale: hoverScale }}
      transition={springConfig}
      onMouseMove={handleMouseMove}
      className={cn(
        'glow-card relative overflow-hidden rounded-2xl',
        'border border-white/[0.06] bg-zinc-900/60 backdrop-blur-xl',
        'transition-shadow duration-300 ease-out',
        'hover:shadow-[0_0_0_1px_var(--glow),0_0_30px_var(--glow)]',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400',
        'will-change-transform',
        className
      )}
      style={{ '--glow': glowColor } as React.CSSProperties}
    >
      {/* Mouse-tracking radial gradient */}
      {!reducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent)`,
          }}
        />
      )}

      {grain && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
