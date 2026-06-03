import { 
  Home, 
  Activity, 
  ShieldCheck, 
  FileText, 
  Eye, 
  Users, 
  LayoutDashboard,
  Search,
  Bell,
  ChevronDown,
  RefreshCcw,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Info,
  Clock,
  MoreHorizontal,
  Cpu,
  Zap,
  Layout,
  Orbit
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroVisual } from '../components/HeroVisual';
import { StatCard } from '../components/StatCard';
import { ExecutiveInsights } from '../components/ExecutiveInsights';
import { cn } from '../lib/utils';

import { useTheme } from '../contexts/ThemeContext';

const themeColors: Record<string, string> = {
  ops: '#F0F9FF', ai: '#FAF5FF', rel: '#F0FDFA', gov: '#F0FDF4'
};

const moduleInfo: Record<string, { title: string, desc: string, detail: string, stats?: Record<string, string> }> = {
  ops: { 
    title: "Operations Intelligence", 
    desc: "Real-time visibility into SLA compliance and incident management.",
    detail: "SLA Health remains above 98.4% with autonomous response protocols.",
    stats: { primary: '98.4%', label: 'SLA Health' }
  },
  ai: { 
    title: "AI & Automation", 
    desc: "Self-healing systems driven by autonomous agents and neural networks.",
    detail: "31% of L1 incidents are now resolved fully autonomously without human intervention.",
    stats: { primary: '31%', label: 'AI Coverage' }
  },
  rel: { 
    title: "Reliability Engineering", 
    desc: "Robust error budgets and automated safety nets for distributed systems.",
    detail: "Predictive scaling reduced tail latency by 45ms during peak holiday traffic.",
    stats: { primary: '45ms', label: 'Tail Latency' }
  },
  gov: { 
    title: "Governance & Compliance", 
    desc: "Continuous audit and policy enforcement across the entire enterprise stack.",
    detail: "Automated drift detection ensures 100% adherence to SOC2 and GDPR standards.",
    stats: { primary: '100%', label: 'Compliance' }
  },
};

export default function OperationsHome() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [lockedLayer, setLockedLayer] = useState<string | null>(null);
  const { setThemeColor, isDarkMode } = useTheme();

  const currentActive = activeLayer || lockedLayer;

  // React to layer changes
  useEffect(() => {
    if (!isDarkMode) {
      if (currentActive && themeColors[currentActive]) {
        setThemeColor(themeColors[currentActive]);
      } else {
        setThemeColor('#F0F9FF'); // Default Ops Blue
      }
    }
  }, [currentActive, setThemeColor, isDarkMode]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Main Operations Center</h2>
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Production • Last Sync 2m Ago</div>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn(
            "p-2 backdrop-blur-md border rounded-full shadow-sm transition-all",
            isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-white" : "bg-white/50 border-white/50 text-slate-500 hover:text-blue-600 hover:bg-white"
          )}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-4">
          <div className="flex flex-col lg:flex-row gap-6 items-start min-h-[400px]">
            <div className="flex-1 pt-0">
              <AnimatePresence mode="wait">
                {!currentActive ? (
                  <motion.div key="default-hero" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="space-y-6">
                    <div className="space-y-2">
                       <span className="px-3 py-1 bg-blue-100/50 text-blue-600 text-[9px] font-black rounded-full uppercase tracking-[0.2em]">Operational Excellence</span>
                       <h1 className={cn(
                         "text-7xl font-black tracking-tighter leading-[0.9]",
                         isDarkMode ? "text-white" : "text-slate-900"
                       )}>
                        Operations <br />
                        <span className="text-blue-600/30">Command</span> <br /> Center
                      </h1>
                    </div>
                    <p className={cn(
                      "text-lg font-medium max-w-lg leading-relaxed",
                      isDarkMode ? "text-white/50" : "text-slate-500"
                    )}>
                      Real-time visibility into SLA compliance, incident management, transfer reduction, and SRE operational maturity.
                    </p>
                    <div className="flex gap-6 pt-6">
                       <div className={cn(
                         "flex-1 backdrop-blur-3xl rounded-[2.5rem] p-9 border shadow-2xl transition-all duration-700",
                         isDarkMode ? "bg-white/5 border-white/10" : "bg-white/25 border-white/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]"
                       )}>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5">SLA Objective</div>
                          <div className="flex items-baseline gap-3">
                             <span className={cn(
                               "text-6xl font-black tracking-tighter",
                               isDarkMode ? "text-white" : "text-slate-800"
                             )}>98.4%</span>
                             <span className="text-green-500 text-[11px] font-black uppercase">↑ 2.3%</span>
                          </div>
                       </div>
                       <div className={cn(
                         "flex-1 backdrop-blur-3xl rounded-[2.5rem] p-9 border shadow-2xl transition-all duration-700",
                         isDarkMode ? "bg-white/5 border-white/10" : "bg-white/25 border-white/50 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)]"
                       )}>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-5">Queue Depth</div>
                          <div className="flex items-baseline gap-3">
                             <span className={cn(
                               "text-6xl font-black tracking-tighter",
                               isDarkMode ? "text-white" : "text-slate-800"
                             )}>12</span>
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key={currentActive} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} className="space-y-6">
                    <h2 className={cn(
                      "text-6xl font-black tracking-tighter leading-none",
                      isDarkMode ? "text-white" : "text-slate-900"
                    )}>
                      {moduleInfo[currentActive]?.title}
                    </h2>
                    <p className={cn(
                      "text-xl font-medium",
                      isDarkMode ? "text-white/60" : "text-slate-600"
                    )}>{moduleInfo[currentActive]?.desc}</p>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                       <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                          <span className="text-xl font-black tracking-tight uppercase">Status: Optimal</span>
                          <div className="absolute right-0 bottom-0 p-6 opacity-10">
                             {currentActive === 'ops' ? <Layout size={100} /> : <Cpu size={100} />}
                          </div>
                       </div>
                       {currentActive === 'ai' && (
                         <Link 
                           to="/ai-automation"
                           className="bg-purple-600 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between hover:bg-purple-500 transition-colors group"
                         >
                            <span className="text-xl font-black tracking-tight uppercase">Explore Center</span>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Full Intelligence Dashboard</span>
                               <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                         </Link>
                       )}
                       {currentActive === 'rel' && (
                         <Link 
                           to="/reliability"
                           className="bg-cyan-600 text-white p-8 rounded-[2.5rem] shadow-2xl flex flex-col justify-between hover:bg-cyan-500 transition-colors group"
                         >
                            <span className="text-xl font-black tracking-tight uppercase">Explore Center</span>
                            <div className="flex justify-between items-center">
                               <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Full Reliability Space</span>
                               <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                         </Link>
                       )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex-1 w-full flex justify-center py-2 min-h-[400px]">
              <HeroVisual onLayerHover={setActiveLayer} onLayerSelect={(id) => setLockedLayer(lockedLayer === id ? null : id)} lockedId={lockedLayer} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="SLA Health" value="98.4%" change={2.3} color="blue" icon={<Layout className="text-blue-500" size={18} />} delay={0.1} />
            <StatCard label="Backlog" value="1,482" change={-18} color="purple" icon={<Cpu className="text-purple-500" size={18} />} delay={0.2} />
            <StatCard label="Major Incidents" value="12" change={-32} color="cyan" icon={<ShieldCheck className="text-cyan-500" size={18} />} delay={0.3} />
            <StatCard label="One Shot Tickets" value="4,233" change={-21} color="emerald" icon={<Zap className="text-emerald-500" size={18} />} delay={0.4} />
            <StatCard label="Transfer Rate" value="11%" change={-27} color="slate" icon={<TrendingUp className="text-slate-500" size={18} />} delay={0.5} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <ExecutiveInsights />
        </div>
      </div>
    </motion.div>
  );
}
