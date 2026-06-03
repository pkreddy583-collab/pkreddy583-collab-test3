/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert, 
  Target,
  DollarSign,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

const insights = [
  {
    title: 'Incident Volume',
    desc: 'Major incidents reduced by 22% vs last 30 days',
    icon: <BarChart3 size={20} className="text-blue-500" />,
    trend: 'down',
    impact: 'positive'
  },
  {
    title: 'Operational Cost',
    desc: '$4.2M estimated cost optimization identified',
    icon: <DollarSign size={20} className="text-emerald-500" />,
    trend: 'up',
    impact: 'positive'
  },
  {
    title: 'AI Impact',
    desc: '11,200 engineering hours saved this month',
    icon: <Target size={20} className="text-purple-500" />,
    trend: 'up',
    impact: 'positive'
  },
  {
    title: 'Risk Exposure',
    desc: 'High risks reduced from 12 to 7',
    icon: <ShieldAlert size={20} className="text-red-500" />,
    trend: 'down',
    impact: 'positive'
  }
];

export function ExecutiveInsights() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={cn(
      "backdrop-blur-2xl rounded-[2.5rem] p-7 shadow-sm border flex flex-col h-full transition-all duration-700",
      isDarkMode ? "bg-white/5 border-white/10" : "bg-white/45 border-white/50"
    )}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            isDarkMode ? "bg-blue-500/20" : "bg-blue-500/10"
          )}>
            <Target size={16} className="text-blue-500" />
          </div>
          <h3 className={cn(
            "text-[11px] font-black tracking-[0.2em] uppercase",
            isDarkMode ? "text-white/60" : "text-slate-500"
          )}>Executive Insights</h3>
        </div>
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 border rounded-full shadow-sm",
          isDarkMode ? "bg-white/5 border-white/10 text-white/40" : "bg-white/40 border-white/40 text-slate-500"
        )}>
           <Calendar size={12} />
           <span className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Last 30 Days</span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        {insights.map((insight, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1.5,
              delay: 1.2 + idx * 0.4,
              ease: "easeOut"
            }}
            className={cn(
              "flex gap-4 p-4 rounded-3xl transition-all border group cursor-pointer",
              isDarkMode 
                ? "bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20" 
                : "bg-white/20 hover:bg-white/40 border-white/30 hover:border-white/50"
            )}
            onClick={() => navigate('/executive-report')}
          >
            <div className={cn(
              "w-12 h-12 shrink-0 rounded-2xl shadow-sm border flex items-center justify-center group-hover:scale-110 transition-transform",
              isDarkMode ? "bg-slate-800 border-white/10" : "bg-white/80 border-white/50"
            )}>
              {insight.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className={cn(
                  "text-sm font-black tracking-tight",
                  isDarkMode ? "text-white" : "text-slate-800"
                )}>{insight.title}</span>
                <div className={insight.impact === 'positive' ? 'text-green-500' : 'text-red-500'}>
                   {insight.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                </div>
              </div>
              <p className={cn(
                "text-[11px] font-medium mt-0.5 leading-snug",
                isDarkMode ? "text-white/40" : "text-slate-500"
              )}>
                {insight.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={cn(
        "mt-8 border-t pt-8",
        isDarkMode ? "border-white/5" : "border-white/30"
      )}>
        <button 
          onClick={() => navigate('/executive-report')}
          className={cn(
            "w-full py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-[0.98]",
            isDarkMode 
              ? "bg-white text-slate-900 hover:bg-blue-50 shadow-white/5" 
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10"
          )}
        >
           View Summary Report <ArrowRight size={14} />
        </button>
      </div>

      {/* Recommended Actions Mini List */}
      <div className="mt-10">
         <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5">Strategic Directives</h4>
         <div className="space-y-3">
            {[
              { t: 'Accelerate AI automation', p: 'High Impact', color: 'red' },
              { t: 'Expand observability', p: 'Medium Impact', color: 'blue' }
            ].map((action, i) => (
              <div key={i} className={cn(
                "p-4 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all",
                isDarkMode 
                  ? "bg-white/5 border-white/10 hover:bg-white/10" 
                  : "bg-white/40 border-white/60 hover:bg-white"
              )}>
                <span className={cn(
                  "text-[11px] font-bold tracking-tight",
                  isDarkMode ? "text-white/80" : "text-slate-700"
                )}>{action.t}</span>
                <span className={cn(
                  "text-[8px] font-black uppercase px-2.5 py-1 rounded-full",
                  action.color === 'red' 
                    ? (isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600")
                    : (isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600")
                )}>
                  {action.p}
                </span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
