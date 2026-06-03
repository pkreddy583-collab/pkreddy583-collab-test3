/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Users, 
  BrainCircuit, 
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  LineChart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

type TeamType = 'sre' | 'ops' | 'reliability' | 'ai';

interface ActionItem {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  owner: string;
}

interface TeamData {
  name: string;
  icon: React.ReactNode;
  summary: string;
  trends: {
    label: string;
    value: string;
    change: number;
    description: string;
  }[];
  actions: ActionItem[];
}

const teamData: Record<TeamType, TeamData> = {
  sre: {
    name: 'SRE & SRE Leaders',
    icon: <Activity className="text-blue-500" />,
    summary: 'Focusing on platform resilience, error budget management, and automation of repetitive toil.',
    trends: [
      { label: 'Error Budget Burn', value: '14%', change: -12, description: 'Reduction in critical service burn rate' },
      { label: 'Toil Reduction', value: '32%', change: 15, description: 'Hours saved through automated remediation' },
      { label: 'On-Call Burnout', value: 'Low', change: -5, description: 'Based on incident frequency and duration' }
    ],
    actions: [
      { id: '1', title: 'Implement automated rollback for latency spikes in Checkout service', priority: 'high', status: 'in-progress', owner: 'SRE Core' },
      { id: '2', title: 'Review error budget policies for Tier 1 applications', priority: 'medium', status: 'pending', owner: 'SRE Leaders' },
      { id: '3', title: 'Onboard 5 new high-traffic apps to global observability', priority: 'high', status: 'completed', owner: 'SRE Team' }
    ]
  },
  ops: {
    name: 'Operations Team',
    icon: <Users className="text-emerald-500" />,
    summary: 'Optimizing incident response lifecycle, backlog health, and service delivery performance.',
    trends: [
      { label: 'MTTR (Major)', value: '42m', change: -18, description: 'Mean Time to Resolution for P1/P2 incidents' },
      { label: 'Backlog Health', value: '88%', change: 8, description: 'Percentage of tickets within aging thresholds' },
      { label: 'First Touch Res.', value: '64%', change: 12, description: 'Issues resolved by first line without escalation' }
    ],
    actions: [
      { id: '4', title: 'Standardize bridge communication protocols for unified response', priority: 'high', status: 'in-progress', owner: 'Ops Leads' },
      { id: '5', title: 'Automate weekly capacity reports for Executive review', priority: 'low', status: 'pending', owner: 'Reporting Ops' },
      { id: '6', title: 'Drill-down optimization for high-transfer application groups', priority: 'medium', status: 'in-progress', owner: 'Delivery Team' }
    ]
  },
  reliability: {
    name: 'Reliability Team',
    icon: <ShieldCheck className="text-amber-500" />,
    summary: 'Designing for failure, implementing guardrails, and managing the risk landscape.',
    trends: [
      { label: 'Risk Score (Avg)', value: '2.4', change: -22, description: 'Aggregated risk score across infrastructure' },
      { label: 'Guardrail Coverage', value: '94%', change: 5, description: 'Compliance with architectural reliability standards' },
      { label: 'Drift Detection', value: '12ms', change: -40, description: 'Time to identify configuration drift' }
    ],
    actions: [
      { id: '7', title: 'Upgrade chaos engineering drills to include regional failover', priority: 'high', status: 'pending', owner: 'Reliability Eng' },
      { id: '8', title: 'Audit third-party API dependencies for redundancy', priority: 'medium', status: 'in-progress', owner: 'Risk Team' },
      { id: '9', title: 'Deploy automated security patching for production clusters', priority: 'high', status: 'completed', owner: 'Infrastructure' }
    ]
  },
  ai: {
    name: 'AI & ML Teams',
    icon: <BrainCircuit className="text-purple-500" />,
    summary: 'Leveraging intelligence for prediction, automation, and operational efficiency.',
    trends: [
      { label: 'Prediction Accuracy', value: '91%', change: 4, description: 'Accuracy of automated incident impact prediction' },
      { label: 'Autofix Success', value: '45%', change: 28, description: 'Rate of successful AI-remediated incidents' },
      { label: 'Token Efficiency', value: '82%', change: 12, description: 'Optimized LLM usage for operational insights' }
    ],
    actions: [
      { id: '10', title: 'Fine-tune failure prediction model for database deadlocks', priority: 'high', status: 'in-progress', owner: 'AIOps Team' },
      { id: '11', title: 'Implement smart-summarization for bridge post-mortems', priority: 'medium', status: 'pending', owner: 'GenAI Tools' },
      { id: '12', title: 'Scale autonomous request throttling for traffic spikes', priority: 'high', status: 'in-progress', owner: 'AI Engine' }
    ]
  }
};

export default function ExecutiveReport() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [activeTeam, setActiveTeam] = useState<TeamType>('sre');

  const currentData = teamData[activeTeam];

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-10">
        <div className="space-y-4">
          <button 
            onClick={() => navigate(-1)}
            className={cn(
              "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors mb-2",
              isDarkMode ? "text-white/40 hover:text-white" : "text-slate-500 hover:text-slate-900"
            )}
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl",
              isDarkMode ? "bg-blue-500/20" : "bg-blue-500/10"
            )}>
              <LineChart size={24} className="text-blue-500" />
            </div>
            <div>
              <h1 className={cn(
                "text-4xl font-black tracking-tight uppercase",
                isDarkMode ? "text-white" : "text-slate-900"
              )}>Executive Intelligence Report</h1>
              <p className={cn(
                "text-sm font-medium mt-1",
                isDarkMode ? "text-white/40" : "text-slate-500"
              )}>Detailed trends and strategic roadmap for mission-critical teams</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-full shadow-sm backdrop-blur-2xl",
              isDarkMode ? "bg-white/5 border-white/10 text-white/60" : "bg-white/40 border-white/40 text-slate-500"
            )}>
               <Clock size={14} />
               <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap text-blue-500">Global Sync: 2m ago</span>
            </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-[2rem] border bg-white/5 backdrop-blur-3xl w-fit">
        {(Object.keys(teamData) as TeamType[]).map((team) => (
          <button
            key={team}
            onClick={() => setActiveTeam(team)}
            className={cn(
              "px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3",
              activeTeam === team 
                ? (isDarkMode ? "bg-white text-slate-950 shadow-xl" : "bg-slate-900 text-white shadow-xl")
                : (isDarkMode ? "text-white/40 hover:text-white hover:bg-white/5" : "text-slate-400 hover:text-slate-900 hover:bg-white/50")
            )}
          >
            {React.cloneElement(teamData[team].icon as React.ReactElement<any>, { size: 14 })}
            {teamData[team].name}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Team Summary & Trends */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <motion.div 
            key={`${activeTeam}-summary`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "p-10 rounded-[3rem] border backdrop-blur-3xl relative overflow-hidden",
              isDarkMode ? "bg-white/5 border-white/5" : "bg-white border-white/50 shadow-sm"
            )}
          >
            <div className="flex items-center gap-4 mb-6">
               <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center",
                  isDarkMode ? "bg-slate-800" : "bg-slate-100"
               )}>
                  {currentData.icon}
               </div>
               <h3 className={cn(
                  "text-xl font-black uppercase tracking-tight",
                  isDarkMode ? "text-white" : "text-slate-900"
               )}>{currentData.name} Overview</h3>
            </div>
            <p className={cn(
              "text-lg font-medium leading-relaxed max-w-2xl",
              isDarkMode ? "text-white/60" : "text-slate-600"
            )}>
              {currentData.summary}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {currentData.trends.map((trend, idx) => (
                <motion.div
                  key={`${activeTeam}-trend-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "p-8 rounded-[2.5rem] border backdrop-blur-3xl group",
                    isDarkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-white border-white shadow-sm hover:border-blue-200"
                  )}
                >
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-widest mb-4",
                    isDarkMode ? "text-white/40" : "text-slate-400"
                  )}>{trend.label}</p>
                  <div className="flex items-end justify-between mb-4">
                    <span className={cn(
                      "text-4xl font-black tracking-tighter",
                      isDarkMode ? "text-white" : "text-slate-900"
                    )}>{trend.value}</span>
                    <div className={cn(
                      "flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full",
                      trend.change > 0 
                        ? "bg-emerald-500/10 text-emerald-500" 
                        : "bg-red-500/10 text-red-500"
                    )}>
                      {trend.change > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {Math.abs(trend.change)}%
                    </div>
                  </div>
                  <p className={cn(
                    "text-[10px] font-medium leading-normal",
                    isDarkMode ? "text-white/30" : "text-slate-500"
                  )}>{trend.description}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Detailed Chart Visualization Placeholder */}
          <div className={cn(
             "p-10 rounded-[3rem] border border-dashed flex flex-col items-center justify-center min-h-[300px]",
             isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
          )}>
             <LineChart size={40} className="text-blue-500/30 mb-4" />
             <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.3em]",
                isDarkMode ? "text-white/20" : "text-slate-300"
             )}>Team Trend Intelligence Visual Active</span>
          </div>
        </div>

        {/* Right Column: Actionable Roadmaps */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className={cn(
            "p-8 rounded-[3rem] border sticky top-24",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-white/50 shadow-sm"
          )}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center",
                  isDarkMode ? "bg-red-500/20" : "bg-red-500/10"
                )}>
                  <Zap size={18} className="text-red-500" />
                </div>
                <h3 className={cn(
                  "text-[12px] font-black uppercase tracking-widest",
                  isDarkMode ? "text-white" : "text-slate-900"
                )}>Actionable Roadmap</h3>
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                isDarkMode ? "bg-white/10 text-white/60" : "bg-slate-100 text-slate-500"
              )}>{currentData.actions.length} Tasks</span>
            </div>

            <div className="space-y-3">
               <AnimatePresence mode="popLayout">
                 {currentData.actions.map((action) => (
                   <motion.div
                     key={action.id}
                     layout
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className={cn(
                       "p-5 rounded-2xl border transition-all hover:translate-x-2 group cursor-pointer",
                       isDarkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-white border-white shadow-sm hover:border-slate-200"
                     )}
                   >
                     <div className="flex justify-between items-start mb-3">
                       <span className={cn(
                         "text-[9px] font-black uppercase px-2 py-0.5 rounded-full",
                         action.priority === 'high' 
                           ? (isDarkMode ? "bg-red-500/20 text-red-400" : "bg-red-100 text-red-600")
                           : (isDarkMode ? "bg-slate-800 text-slate-400" : "bg-slate-100 text-slate-500")
                       )}>{action.priority}</span>
                       
                       {action.status === 'completed' ? (
                         <CheckCircle2 size={14} className="text-emerald-500" />
                       ) : action.status === 'in-progress' ? (
                         <Activity size={14} className="text-blue-500 animate-pulse" />
                       ) : (
                         <AlertCircle size={14} className="text-amber-500" />
                       )}
                     </div>
                     
                     <p className={cn(
                       "text-[11px] font-bold leading-relaxed mb-4",
                       isDarkMode ? "text-white/80" : "text-slate-700"
                     )}>{action.title}</p>
                     
                     <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex items-center gap-2">
                           <Users size={12} className="text-slate-500" />
                           <span className="text-[9px] font-bold text-slate-500 italic">{action.owner}</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                     </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </div>

            <button className={cn(
              "w-full mt-10 py-4 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all",
              isDarkMode 
                ? "bg-white text-slate-950 hover:bg-slate-100 shadow-xl" 
                : "bg-slate-950 text-white hover:bg-slate-800 shadow-xl"
            )}>
              Download PDF Ops Review <Activity size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
