import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const navItems = [
  { label: 'Home', path: '/operations' },
  { label: 'SLA Command', path: '/operations/sla-command' },
  { label: 'Incident Command', path: '/operations/incident-command' },
  { label: 'Backlog', path: '/operations/backlog-management' },
  { label: 'Major Incident', path: '/operations/major-incident-center' },
  { label: 'Transfers', path: '/operations/transfer-analytics' },
  { label: 'SRE Coverage', path: '/operations/sre-coverage' },
  { label: 'One-Shot', path: '/operations/one-shot-intelligence' },
  { label: 'Insights', path: '/operations/insights' },
  { label: 'Action Center', path: '/operations/action-center' },
];

import { useTheme } from '../contexts/ThemeContext';

export function OperationsSubNav() {
  const { isDarkMode } = useTheme();

  return (
    <div className={cn(
      "w-full px-6 py-1 sticky top-16 z-40 backdrop-blur-3xl border-b transition-all duration-700",
      isDarkMode ? "bg-black/40 border-white/10" : "bg-white/10 border-white/20"
    )}>
      <div className="max-w-[1600px] mx-auto flex items-center justify-center gap-1 overflow-x-auto no-scrollbar py-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/operations'}
            className={({ isActive }) => cn(
              "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all whitespace-nowrap border",
              isActive 
                ? (isDarkMode ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20" : "bg-slate-900 text-white shadow-xl shadow-slate-900/10 border-slate-900")
                : (isDarkMode ? "text-white/40 border-transparent hover:text-white hover:bg-white/5" : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-white/40 hover:border-white/60")
            )}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
