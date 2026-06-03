/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Info, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const steps = [
  { year: '2024', title: 'Visibility', status: 'completed' },
  { year: '2025', title: 'Standardization', status: 'in-progress' },
  { year: '2026', title: 'Intelligence', status: 'planned' },
  { year: '2027', title: 'Predictive Operations', status: 'planned' },
  { year: '2028+', title: 'Autonomous Operations', status: 'future' },
];

export function Roadmap() {
  return (
    <div className="bg-white/50 backdrop-blur-3xl rounded-[2rem] p-8 shadow-sm border border-white/60 h-[380px] flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all group relative overflow-hidden">
       {/* Ambient accent */}
       <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />

       <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center">
              <TrendingUp className="text-white" size={18} />
           </div>
           <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">SRE Evolution</h3>
        </div>
        <button className="text-[9px] font-black text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full transition-all">
          Trajectory Map <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex-1 flex items-center px-4 relative z-10">
        <div className="absolute h-[2px] left-10 right-10 bg-slate-200/50 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }} 
             animate={{ width: '35%' }} 
             className="h-full bg-gradient-to-r from-green-400 to-blue-500" 
           />
        </div>
        
        <div className="flex-1 flex justify-between items-center relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center gap-5 group/step">
               <div className="text-[10px] font-black text-slate-400 group-hover/step:text-slate-800 transition-colors uppercase tracking-[0.2em]">{step.year}</div>
               
               {/* Node */}
               <div className="relative">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-[3px] border-white shadow-xl flex items-center justify-center transition-all duration-500 scale-100 group-hover/step:scale-125 z-10 relative",
                    step.status === 'completed' ? 'bg-green-500' : 
                    step.status === 'in-progress' ? 'bg-blue-500 ring-4 ring-blue-500/20' : 
                    step.status === 'planned' ? 'bg-purple-500' : 'bg-slate-300'
                  )} />
                  {step.status === 'in-progress' && (
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-25" />
                  )}
               </div>

               <div className="text-center">
                  <div className="text-[10px] font-black text-slate-700 tracking-tight group-hover/step:text-blue-600 transition-colors max-w-[90px] leading-snug">
                    {step.title}
                  </div>
                  <div className={cn(
                    "text-[8px] font-black mt-2 inline-block px-2 py-0.5 rounded-full uppercase tracking-widest",
                    step.status === 'completed' ? 'bg-green-100 text-green-600' : 
                    step.status === 'in-progress' ? 'bg-blue-100 text-blue-600' : 
                    step.status === 'planned' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'
                  )}>
                    {step.status.replace('-', ' ')}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto border-t border-white/40 pt-6 flex justify-center relative z-10">
         <div className="flex items-center gap-6 text-[9px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500" /> Completed
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500" /> Active
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-500" /> Horizon
            </div>
         </div>
      </div>
    </div>
  );
}
