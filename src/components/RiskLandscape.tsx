/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Info, ArrowRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const data = [
  { name: 'Jan', high: 4000, medium: 2400, low: 2400 },
  { name: 'Feb', high: 3000, medium: 1398, low: 2210 },
  { name: 'Mar', high: 2000, medium: 9800, low: 2290 },
  { name: 'Apr', high: 2780, medium: 3908, low: 2000 },
  { name: 'May', high: 1890, medium: 4800, low: 2181 },
  { name: 'Jun', high: 2390, medium: 3800, low: 2500 },
  { name: 'Jul', high: 3490, medium: 4300, low: 2100 },
];

export function RiskLandscape() {
  return (
    <div className="bg-white/55 backdrop-blur-3xl rounded-[2rem] p-7 shadow-sm border border-white/60 flex flex-col h-[380px] hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
           <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Risk Propagation</h3>
           <Info size={12} className="text-slate-300 cursor-help" />
        </div>
        <button className="text-[9px] font-black text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2 uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-full transition-all">
          Mitigation Lab <ArrowRight size={12} />
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
             <defs>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                 <feGaussianBlur stdDeviation="3" result="blur" />
                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
               <linearGradient id="colorHigh" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#EC4899" stopOpacity={0.4}/>
                 <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
               </linearGradient>
               <linearGradient id="colorMedium" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                 <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
               </linearGradient>
               <linearGradient id="colorLow" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                 <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
               </linearGradient>
             </defs>
             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.2)" />
             <XAxis 
               dataKey="name" 
               axisLine={false} 
               tickLine={false} 
               tick={{ fill: '#94A3B8', fontSize: 9, fontWeight: 800 }}
             />
             <Tooltip 
               contentStyle={{ 
                 backgroundColor: 'rgba(255, 255, 255, 0.7)',
                 backdropFilter: 'blur(12px)',
                 borderRadius: '24px', 
                 border: '1px solid rgba(255, 255, 255, 0.5)', 
                 boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)',
                 fontSize: '11px',
                 fontWeight: '900',
                 padding: '12px'
               }} 
             />
             <Area 
               type="monotone" 
               dataKey="high" 
               stroke="#EC4899" 
               strokeWidth={3}
               fillOpacity={1} 
               fill="url(#colorHigh)" 
               stackId="1"
               filter="url(#glow)"
             />
             <Area 
               type="monotone" 
               dataKey="medium" 
               stroke="#F59E0B" 
               strokeWidth={2}
               fillOpacity={1} 
               fill="url(#colorMedium)" 
               stackId="1"
             />
             <Area 
               type="monotone" 
               dataKey="low" 
               stroke="#3B82F6" 
               strokeWidth={2}
               fillOpacity={1} 
               fill="url(#colorLow)" 
               stackId="1"
             />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 flex items-center justify-center gap-8">
        {[
          { label: 'Critical', color: 'bg-pink-500' },
          { label: 'Medium', color: 'bg-amber-500' },
          { label: 'Low', color: 'bg-blue-500' }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
             <div className={cn("w-1.5 h-1.5 rounded-full", item.color)} />
             <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

