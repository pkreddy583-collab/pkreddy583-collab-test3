import React, { useState, useRef, useEffect } from 'react';
import { Clock, ChevronDown, Calendar, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

const timeOptions = [
  { id: '1h', label: 'Last Hour' },
  { id: '24h', label: 'Last 24 Hours' },
  { id: '7d', label: 'Last 7 Days', sub: 'Week Selection' },
  { id: '30d', label: 'Last 30 Days', sub: 'Month Selection' },
  { id: '1y', label: 'Last Year', sub: 'Year Selection' },
  { id: 'custom', label: 'Custom Range', sub: 'Time Bound' },
];

const timeZones = [
  { label: 'UTC', offset: '+00:00' },
  { label: 'EST', offset: '-05:00' },
  { label: 'PST', offset: '-08:00' },
  { label: 'IST', offset: '+05:30' },
];

export function GlobalTimeSlicer() {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(timeOptions[3]); // Default to Last 30 Days
  const [selectedTZ, setSelectedTZ] = useState(timeZones[0]);
  const [showTZ, setShowTZ] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowTZ(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center gap-2" ref={containerRef}>
      <button 
        onClick={() => { setIsOpen(!isOpen); }}
        className={cn(
          "flex items-center gap-2 border backdrop-blur-md rounded-full px-3 py-1.5 transition-all cursor-pointer shadow-sm group",
          isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/40 border-white/60 hover:bg-white/60"
        )}
      >
        <Clock size={16} className={cn("transition-colors", isDarkMode ? "text-blue-400" : "text-slate-500 group-hover:text-blue-500")} />
        <div className="flex flex-col items-start leading-none gap-0.5 min-w-[80px]">
           <span className={cn("text-[10px] font-black uppercase tracking-widest", isDarkMode ? "text-white" : "text-slate-800")}>{selected.label}</span>
           {selected.sub && <span className={cn("text-[8px] font-bold uppercase tracking-tighter", isDarkMode ? "text-white/30" : "text-slate-400")}>{selected.sub}</span>}
        </div>
        <ChevronDown size={14} className={cn("transition-transform duration-300", isDarkMode ? "text-white/20" : "text-slate-400 font-bold", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={cn(
              "absolute right-0 mt-3 w-64 backdrop-blur-2xl border rounded-[2rem] shadow-2xl z-50 overflow-hidden p-2",
              isDarkMode ? "bg-slate-900 border-white/10" : "bg-white/90 border-white"
            )}
          >
            <div className={cn("p-3 border-b mb-2", isDarkMode ? "border-white/5" : "border-slate-100")}>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] px-2">Temporal Slicer</span>
            </div>
            
            {selected.id === 'custom' && (
               <div className={cn(
                 "p-4 mb-2 rounded-2xl border space-y-3",
                 isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-900/5 border-slate-900/10"
               )}>
                  <div className="flex flex-col gap-2">
                     <span className="text-[8px] font-black text-slate-400 uppercase">Start Date</span>
                     <div className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold border shadow-sm",
                        isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-100 text-slate-800"
                     )}>
                        <span>2026-05-01</span>
                        <Calendar size={12} className="text-slate-300" />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[8px] font-black text-slate-400 uppercase">End Date</span>
                     <div className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-bold border shadow-sm",
                        isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-100 text-slate-800"
                     )}>
                        <span>2026-06-01</span>
                        <Calendar size={12} className="text-slate-300" />
                     </div>
                  </div>
                  <button className="w-full bg-blue-600 text-white rounded-xl py-2 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all">Apply Range</button>
               </div>
            )}

            <div className="space-y-1">
              {timeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelected(option);
                    if (option.id !== 'custom') setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                    selected.id === option.id 
                      ? (isDarkMode ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "bg-slate-900 text-white") 
                      : (isDarkMode ? "text-white/60 hover:bg-white/5" : "text-slate-600 hover:bg-white hover:shadow-md")
                  )}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-[10px] font-black uppercase tracking-widest">{option.label}</span>
                    {option.sub && (
                      <span className={cn(
                        "text-[8px] font-bold uppercase tracking-tighter mt-0.5",
                        selected.id === option.id ? "text-white/40" : "text-slate-400"
                      )}>
                        {option.sub}
                      </span>
                    )}
                  </div>
                  {selected.id === option.id ? (
                    <Check size={14} className={isDarkMode ? "text-white" : "text-blue-400"} />
                  ) : option.id === 'custom' ? (
                    <Calendar size={14} className="text-slate-300 group-hover:text-slate-500" />
                  ) : null}
                </button>
              ))}
            </div>
            
            <div className={cn(
              "mt-2 p-3 rounded-2xl border",
              isDarkMode ? "bg-blue-500/10 border-blue-500/20" : "bg-blue-500/5 border-blue-500/10"
            )}>
               <div className="flex items-center gap-2 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Real-time Sync Active
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
