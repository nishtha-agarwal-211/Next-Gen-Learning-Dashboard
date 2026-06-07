'use client';

/**
 * SidebarItem — individual navigation item with layoutId highlight animation.
 * Features: gradient-filled active indicator, notification dot,
 * keyboard navigation, ARIA, and focus-visible states.
 */
import { motion } from 'framer-motion';
import { DynamicIcon } from '@/lib/icon-registry';
import type { NavItem } from '@/lib/types';

interface SidebarItemProps {
  item: NavItem;
  isActive: boolean;
  isCollapsed: boolean;
  onSelect: (id: string) => void;
  /** Optional notification dot */
  showBadge?: boolean;
}

export function SidebarItem({
  item,
  isActive,
  isCollapsed,
  onSelect,
  showBadge,
}: SidebarItemProps) {
  return (
    <li>
      <button
        onClick={() => onSelect(item.id)}
        aria-current={isActive ? 'page' : undefined}
        className="group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-zinc-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
        title={isCollapsed ? item.label : undefined}
      >
        {/* Active indicator — animated background with gradient fill and glow */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-indicator"
            className="absolute inset-0 rounded-lg border border-indigo-500/20 bg-gradient-to-r from-indigo-500/[0.08] to-violet-500/[0.06] shadow-[inset_0_1px_0_rgba(129,140,248,0.1)]"
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        )}

        {/* Hover background */}
        {!isActive && (
          <div className="absolute inset-0 rounded-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100 bg-zinc-800/40" />
        )}

        <span className="relative z-10 flex items-center gap-3">
          <span className="relative">
            <DynamicIcon
              name={item.iconName}
              className={`h-[18px] w-[18px] shrink-0 transition-colors duration-150 ${isActive ? 'text-indigo-400' : 'group-hover:text-zinc-300'}`}
            />
            {/* Notification badge dot */}
            {showBadge && (
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-zinc-950 bg-rose-500" />
            )}
          </span>
          {!isCollapsed && (
            <span className={`transition-colors duration-150 ${isActive ? 'text-zinc-100' : ''}`}>
              {item.label}
            </span>
          )}
        </span>
      </button>
    </li>
  );
}
