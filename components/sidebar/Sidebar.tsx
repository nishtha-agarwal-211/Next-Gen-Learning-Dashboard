'use client';

/**
 * Sidebar — premium collapsible navigation with glassmorphism.
 * Desktop: full sidebar with labels. Tablet: icon-only. Mobile: hidden.
 * Features: layoutId-animated active indicator, gradient accent line,
 * user avatar section, animated brand glow, and keyboard navigation.
 */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, PanelLeftClose, PanelLeft } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { NAV_ITEMS, PROFILE_NAV_ITEM, USER_NAME } from '@/lib/constants';

export function Sidebar() {
  const [activeId, setActiveId] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden h-screen flex-col border-r border-white/[0.06] bg-zinc-950/80 backdrop-blur-xl md:flex"
      style={{ position: 'sticky', top: 0 }}
    >
      {/* Top gradient accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-60" />

      <div className="flex h-full flex-col px-3 py-4">
        {/* Logo / Brand */}
        <div className="mb-6 flex items-center justify-between px-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="relative">
              <Sparkles className="h-5 w-5 shrink-0 text-indigo-400" />
              {/* Glow behind logo */}
              <div className="absolute inset-0 -z-10 h-5 w-5 rounded-full bg-indigo-400/20 blur-md" />
            </div>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-sm font-bold tracking-tight text-transparent"
              >
                Andaz
              </motion.span>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="rounded-md p-1 text-zinc-500 transition-colors hover:bg-zinc-800/60 hover:text-zinc-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            {isCollapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Main nav items */}
        <ul className="flex flex-1 flex-col gap-1" role="list">
          {NAV_ITEMS.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              isCollapsed={isCollapsed}
              onSelect={setActiveId}
            />
          ))}
        </ul>

        {/* Divider */}
        <div className="my-3 border-t border-white/[0.06]" />

        {/* User section (bottom-pinned) */}
        <div className="flex flex-col gap-2">
          <SidebarItem
            item={PROFILE_NAV_ITEM}
            isActive={activeId === PROFILE_NAV_ITEM.id}
            isCollapsed={isCollapsed}
            onSelect={setActiveId}
          />

          {/* User avatar + info */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 flex items-center gap-3 rounded-lg border border-white/[0.04] bg-zinc-800/30 px-3 py-2.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600">
                <span className="text-xs font-bold text-white">{USER_NAME.charAt(0)}</span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-zinc-200">{USER_NAME}</p>
                <p className="text-[10px] text-zinc-500">Student</p>
              </div>
            </motion.div>
          )}

          {/* Collapsed avatar */}
          {isCollapsed && (
            <div className="flex justify-center py-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600">
                <span className="text-xs font-bold text-white">{USER_NAME.charAt(0)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
