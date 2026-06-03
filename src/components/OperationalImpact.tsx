/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Info, ArrowRight } from 'lucide-react';

const data = [
  { name: 'Cost Avoidance', value: 2600, color: '#3B82F6', percentage: 62 },
  { name: 'Efficiency Gain', value: 1200, color: '#34D399', percentage: 29 },
  { name: 'Risk Mitigation', value: 400, color: '#F59E0B', percentage: 9 },
];

export function OperationalImpact() {
  return (
    <div className="bg-white/50 backdrop-blur-3xl rounded-[2rem] p-7 shadow-sm border border-white/60 h-[380px] flex flex-col relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
           <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Financial Engineering</h3>
           <Info size={12} className="text-slate-300 cursor-help" />
        </div>
      </div>

      <div className="flex-1 flex flex-col sm:flex-row items-center gap-8">
        <div className="w-full aspect-square max-w-[200px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                <filter id="pie-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={85}
                paddingAngle={8}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    fillOpacity={0.8}
                  />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '20px', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  fontSize: '11px',
                  fontWeight: '900'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-slate-800 tracking-tighter leading-none">$4.2M</span>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Net Impact</span>
          </div>
        </div>

        <div className="flex-1 space-y-5 w-full">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between group cursor-default p-3 bg-white/20 rounded-2xl border border-white/20 hover:bg-white/40 hover:border-white/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-slate-800 tracking-tight">${(item.value / 1000).toFixed(1)}M</div>
                <div className="text-[9px] text-slate-400 font-bold">({item.percentage}%)</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-white/40 pt-5 flex justify-end">
         <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 flex items-center gap-2 uppercase tracking-[0.2em] bg-white/50 px-4 py-2 rounded-full border border-white/50 shadow-sm transition-all hover:bg-white">
            Audit Trail <ArrowRight size={14} />
         </button>
      </div>
    </div>
  );
}
