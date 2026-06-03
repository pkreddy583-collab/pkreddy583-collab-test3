/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  ChevronDown,
  LayoutGrid,
  Activity,
  ShieldCheck,
  LayoutDashboard,
  Eye,
  Users,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GlobalTimeSlicer } from './GlobalTimeSlicer';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

import { motion, AnimatePresence } from 'motion/react';

const topNav = [
  { label: 'Operations', path: '/operations' },
  { label: 'Reliability', path: '/reliability' },
  { label: 'AI & Automation', path: '/ai-automation' },
  { label: 'Governance', path: '/governance' },
  { label: 'Observability', path: '/observability' },
  { label: 'Reports', path: '/reports' },
];

export function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className={cn(
      "h-16 sticky top-0 z-50 border-b backdrop-blur-3xl transition-all duration-700 w-full",
      isDarkMode ? "bg-black/60 border-white/10" : "bg-white/30 border-white/40"
    )}>
      <div className="max-w-[1600px] mx-auto h-full flex items-center justify-between px-6 md:px-10 lg:px-14">
        {/* Glossy Overlay */}
        <div className={cn(
          "absolute inset-x-0 top-0 h-[1px] pointer-events-none",
          isDarkMode ? "bg-white/10" : "bg-white/50"
        )} />
        
        {/* Left side - Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10 hover:opacity-80 transition-opacity">
          <div className="w-11 h-11 bg-slate-900 rounded-full flex items-center justify-center shadow-2xl ring-1 ring-white/10">
              <div className="w-5 h-5 bg-white/30 blur-[1px] rounded-full" />
          </div>
          <span className={cn(
            "text-2xl font-black tracking-tighter uppercase",
            isDarkMode ? "text-white" : "text-slate-800"
          )}>Ti<span className="text-blue-500">OPS</span></span>
        </Link>
  
        {/* Center Nav - Robust Positioning */}
        <nav className="hidden md:flex flex-1 items-center justify-center gap-4 xl:gap-8 h-full mx-4">
          {topNav.map((item) => (
            <NavLink 
              key={item.label} 
              to={item.path}
              className={({ isActive }) => cn(
                "text-[11px] font-black uppercase tracking-[0.15em] h-full flex items-center border-b-[3px] transition-all px-2 whitespace-nowrap",
                isActive 
                  ? (isDarkMode ? "border-blue-500 text-white" : "border-slate-800 text-slate-900")
                  : (isDarkMode ? "border-transparent text-white/30 hover:text-white" : "border-transparent text-slate-400 hover:text-slate-900 hover:border-slate-200")
              )}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
  
        {/* Right side actions - Minimalist Icons */}
        <div className="flex items-center gap-4 xl:gap-5 relative z-10 w-auto xl:w-auto justify-end shrink-0">
          <div className="relative group hidden lg:block shrink-0">
            <div className={cn(
              "flex items-center backdrop-blur-md rounded-full px-4 py-1.5 transition-all cursor-pointer shadow-sm border",
              isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/40 border-white/60 hover:bg-white/60"
            )}>
              <Search className="text-slate-500" size={14} />
              <input 
                type="text" 
                placeholder="GLOBAL DISCOVERY" 
                className={cn(
                  "bg-transparent border-none focus:ring-0 text-[10px] ml-2 w-24 lg:w-32 xl:w-40 placeholder:font-black tracking-widest uppercase",
                  isDarkMode ? "text-white placeholder:text-white/20" : "text-slate-800 placeholder:text-slate-400"
                )}
              />
            </div>
          </div>
  
          {/* Global Time Slicer */}
          <div className="hidden md:block">
            <GlobalTimeSlicer />
          </div>
  
          <div className="flex items-center gap-3 xl:gap-4">
             <button 
               onClick={toggleDarkMode}
               className={cn(
                 "w-10 h-10 flex items-center justify-center border rounded-full transition-all shrink-0 shadow-lg",
                 isDarkMode 
                   ? "bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20 shadow-yellow-500/10" 
                   : "bg-white/60 border-white/60 text-slate-800 hover:bg-white hover:border-slate-300"
               )}
               title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
             >
               {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
             </button>
  
             <button className={cn(
               "w-10 h-10 flex items-center justify-center border rounded-full transition-all relative shrink-0",
               isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white/60 border-white/60 text-slate-800 hover:bg-white"
             )}>
               <Bell size={18} strokeWidth={2.5} />
               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-900 shadow-sm" />
             </button>
             
             <div className="relative">
               <button 
                 onClick={() => setIsProfileOpen(!isProfileOpen)}
                 className={cn(
                   "w-11 h-11 rounded-full border transition-all overflow-hidden shadow-xl shrink-0 hover:ring-4 hover:ring-blue-500/10",
                   isDarkMode ? "bg-slate-800 border-white/20" : "bg-white border-white"
                 )}
               >
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                  />
                </button>
  
                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                          "absolute right-0 mt-2 w-48 backdrop-blur-3xl border rounded-[1.5rem] shadow-2xl z-50 overflow-hidden p-1.5",
                          isDarkMode ? "bg-slate-900/95 border-white/10" : "bg-white/95 border-slate-200"
                        )}
                      >
                        <div className="px-3 py-2 border-b border-white/5 mb-1.5">
                          <p className={cn("text-[10px] font-black uppercase tracking-widest", isDarkMode ? "text-white" : "text-slate-900")}>Alex Rivera</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase">Executive Director</p>
                        </div>
  
                        <button className={cn(
                          "w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all mt-1",
                          isDarkMode ? "text-white/70 hover:bg-white/5" : "text-slate-600 hover:bg-slate-50"
                        )}>
                          <Users size={14} className="opacity-40" />
                          <span>Team Access</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}
