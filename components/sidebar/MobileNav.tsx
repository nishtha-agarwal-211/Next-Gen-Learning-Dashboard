'use client';

/**
 * MobileNav — premium bottom navigation bar for mobile viewports (<768px).
 * Features: frosted glass effect, gradient pill active indicator,
 * smooth layoutId transitions, and proper accessibility.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { DynamicIcon } from '@/lib/icon-registry';
import { NAV_ITEMS, PROFILE_NAV_ITEM } from '@/lib/constants';

const MOBILE_ITEMS = [...NAV_ITEMS, PROFILE_NAV_ITEM];

export function MobileNav() {
  const [activeId, setActiveId] = useState('dashboard');

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/[0.06] bg-zinc-950/80 backdrop-blur-2xl backdrop-saturate-150 md:hidden"
    >
      {/* Top gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <ul className="flex items-center justify-around py-2 px-1" role="list">
        {MOBILE_ITEMS.map((item) => {
          const isActive = activeId === item.id;

          return (
            <li key={item.id}>
              <button
                onClick={() => setActiveId(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center gap-0.5 px-3 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
              >
                {/* Active pill background */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-pill"
                    className="absolute inset-0 -top-0.5 rounded-xl bg-gradient-to-b from-indigo-500/15 to-transparent"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                {/* Top bar indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-active-indicator"
                    className="absolute -top-2.5 h-[2px] w-8 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <DynamicIcon
                  name={item.iconName}
                  className={`relative z-10 h-5 w-5 transition-colors duration-150 ${
                    isActive ? 'text-indigo-400' : 'text-zinc-500'
                  }`}
                />
                <span
                  className={`relative z-10 text-[10px] font-medium transition-colors duration-150 ${
                    isActive ? 'text-indigo-400' : 'text-zinc-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
