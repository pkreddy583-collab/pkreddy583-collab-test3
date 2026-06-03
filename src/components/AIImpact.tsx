/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LineChart, 
  Line, 
  ResponsiveContainer,
  XAxis,
  Tooltip
} from 'recharts';
import { Info, ArrowRight, BrainCircuit, Activity, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

const metrics = [
  { 
    label: 'Engineering Hours Saved', 
    value: '11,200', 
    change: 18, 
    color: '#22C55E', 
    icon: <BrainCircuit className="text-green-500" size={16} />,
    data: [20, 35, 45, 30, 55, 70, 65, 80]
  },
  { 
    label: 'Incidents Auto-Triaged', 
    value: '68%', 
    change: 12, 
    color: '#3B82F6', 
    icon: <Activity className="text-blue-500" size={16} />,
    data: [40, 45, 50, 48, 60, 65, 68, 70]
  },
  { 
    label: 'RCA Confidence Score', 
    value: '82%', 
    change: 8, 
    color: '#A855F7', 
    icon: <Zap className="text-purple-500" size={16} />,
    data: [60, 65, 75, 70, 78, 80, 82, 85]
  },
  { 
    label: 'Runbook Suggestions Accepted', 
    value: '71%', 
    change: 15, 
    color: '#06B6D4', 
    icon: <CheckCircle2 className="text-cyan-500" size={16} />,
    data: [30, 40, 35, 50, 55, 60, 71, 75]
  }
];

export function AIImpact() {
  return (
    <div className="bg-white/45 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-sm border border-white/60 h-[380px] flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all relative group overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
       
       <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center">
              <BrainCircuit className="text-white" size={20} />
           </div>
           <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Autonomous Impact</h3>
        </div>
        <button className="text-[9px] font-black text-blue-600 hover:bg-blue-600 hover:text-white flex items-center gap-2 uppercase tracking-widest bg-blue-500/10 px-4 py-2 rounded-full transition-all">
          Neuro Center <ArrowRight size={14} />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-1 relative z-10">
        {metrics.map((metric) => (
          <div key={metric.label} className="flex flex-col p-4 rounded-3xl bg-white/20 border border-white/20 hover:bg-white/40 hover:border-white/40 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 bg-white/80 rounded-xl shadow-sm border border-white">
                {metric.icon}
              </div>
              <div className="flex flex-col items-end">
                <div className="text-3xl font-black text-slate-800 tracking-tighter leading-none">{metric.value}</div>
                <div className={`text-[10px] font-black mt-1 flex items-center gap-1 ${metric.change > 0 ? 'text-green-600' : 'text-red-500'}`}>
                   {metric.change}% <TrendingUp size={10} />
                </div>
              </div>
            </div>
            
            <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-4">
              {metric.label}
            </div>
            
            <div className="h-12 w-full mt-auto">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.data.map((v, i) => ({ val: v, i }))}>
                    <defs>
                      <filter id={`glow-${metric.label}`} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke={metric.color} 
                      strokeWidth={3} 
                      dot={false} 
                      isAnimationActive={true}
                      filter={`url(#glow-${metric.label})`}
                    />
                  </LineChart>
               </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
