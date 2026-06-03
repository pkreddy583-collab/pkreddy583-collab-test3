/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  change: number;
  color: string;
  icon: React.ReactNode;
  delay: number;
}

export function StatCard({ label, value, change, color, icon, delay }: StatCardProps) {
  const isPositive = change > 0;
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn(
        "backdrop-blur-3xl p-6 rounded-[2.5rem] border hover:shadow-2xl hover:-translate-y-1 transition-all group relative overflow-hidden",
        isDarkMode 
          ? "bg-white/5 border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.4)] hover:border-white/20" 
          : "bg-white/20 border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:border-white/70"
      )}
    >
      {/* Specular Highlight (Rim) */}
      <div className={cn(
        "absolute inset-0 border rounded-[2.5rem] pointer-events-none",
        isDarkMode ? "border-white/5" : "border-white/30"
      )} />
      <div className={cn(
        "absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br via-transparent to-transparent pointer-events-none",
        isDarkMode ? "from-white/10" : "from-white/50 opacity-40"
      )} />
      
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={cn(
          "w-11 h-11 rounded-2xl border backdrop-blur-md flex items-center justify-center transition-all group-hover:scale-110 duration-300",
          isDarkMode ? "bg-white/10 border-white/10" : "bg-white/30 border-white/40"
        )}>
          <div style={{ color: color }} className="opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
            {icon}
          </div>
        </div>
        <div className="w-16 h-8 opacity-40 group-hover:opacity-60 transition-opacity">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <path 
              d={isPositive ? "M0,35 Q10,32 20,25 T40,28 T60,15 T80,20 T100,5" : "M0,5 Q10,8 20,15 T40,12 T60,25 T80,20 T100,35"} 
              fill="none" 
              stroke={isPositive ? "#22C55E" : "#EF4444"} 
              strokeWidth="3" 
            />
          </svg>
        </div>
      </div>
      <div>
        <div className={cn(
          "text-2xl font-black tracking-tight",
          isDarkMode ? "text-white" : "text-slate-800"
        )}>{value}</div>
        <div className={cn(
          "text-[11px] font-bold mt-1 uppercase tracking-wider",
          isDarkMode ? "text-white/40" : "text-slate-400"
        )}>{label}</div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <div className={`flex items-center text-[10px] font-black ${isPositive ? 'text-green-500' : 'text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {Math.abs(change)}%
        </div>
        <span className={cn(
          "text-[10px] font-medium whitespace-nowrap",
          isDarkMode ? "text-white/30" : "text-slate-400"
        )}>vs last 30 days</span>
      </div>
    </motion.div>
  );
}
