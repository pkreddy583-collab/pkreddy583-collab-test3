import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Zap, 
  Brain, 
  Bot, 
  Network, 
  Sparkles,
  ArrowRight,
  Activity,
  ShieldCheck,
  Search,
  MoreHorizontal
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import AIAgentNetwork from '../components/AIAgentNetwork';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

const aiModules = [
  { id: 'agents', title: 'Autonomous Agents', icon: <Bot size={24} />, desc: 'Self-governing virtual entities handling ticket triage and resolution.', status: 'Active' },
  { id: 'neural', title: 'Neural Diagnostics', icon: <Brain size={24} />, desc: 'Predictive root cause analysis across distributed stack traces.', status: 'Learning' },
  { id: 'healing', title: 'Self-Healing Nets', icon: <Network size={24} />, desc: 'Automated remediation workflows for 85% of common infrastructure faults.', status: 'Online' },
];

export default function AIAutomation() {
  const { setThemeColor, isDarkMode } = useTheme();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  useEffect(() => {
    if (!isDarkMode) {
      setThemeColor('#FAF5FF'); // Default AI theme for light mode
    }
  }, [setThemeColor, isDarkMode]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      {/* Header Section */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Intelligence Core v4.0</h2>
          </div>
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Neural Engine • Sync Stable</div>
        </div>
        <div className="flex items-center gap-3">
          <button className={cn(
            "p-2 backdrop-blur-md border rounded-full shadow-sm transition-all",
            isDarkMode ? "bg-white/5 border-white/10 text-white/40 hover:text-purple-400" : "bg-white/50 border-white/50 text-slate-500 hover:text-purple-600 hover:bg-white"
          )}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12 items-center">
        {/* Left Content */}
        <div className="col-span-12 lg:col-span-6 space-y-8">
          <div className="space-y-4">
            <div className={cn(
              "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
              isDarkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"
            )}>
               <Sparkles size={12} />
               Cognitive Orchestration
            </div>
            <h1 className={cn(
              "text-7xl font-black tracking-tighter leading-[0.9]",
              isDarkMode ? "text-white" : "text-slate-900"
            )}>
              AI & <br />
              <span className="text-purple-600/30">Automation</span> <br />
              Frontier
            </h1>
            <p className={cn(
              "text-xl font-medium max-w-lg leading-relaxed",
              isDarkMode ? "text-white/50" : "text-slate-500"
            )}>
              Synthesizing autonomous decision-making across the enterprise. 
              Reducing human intervention while increasing operational precision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className={cn(
               "backdrop-blur-3xl border p-8 rounded-[3rem] shadow-xl transition-all duration-700",
               isDarkMode ? "bg-white/5 border-white/10" : "bg-white/40 border-white"
             )}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Autonomous Rate</div>
                <div className="flex items-baseline gap-2">
                   <span className={cn("text-5xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>31%</span>
                   <span className="text-green-500 text-[10px] font-black">↑ 4.2%</span>
                </div>
             </div>
             <div className={cn(
               "backdrop-blur-3xl border p-8 rounded-[3rem] shadow-xl transition-all duration-700",
               isDarkMode ? "bg-white/5 border-white/10" : "bg-white/40 border-white"
             )}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Tokens Processed</div>
                <div className="flex items-baseline gap-2">
                   <span className={cn("text-5xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>8.4B</span>
                   <span className="text-slate-400 text-[10px] font-black">24H</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Glass Visual - 3D AGENT NETWORK */}
        <div className="col-span-12 lg:col-span-6 flex justify-center relative min-h-[500px]">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
             <AIAgentNetwork />
          </motion.div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {aiModules.map((mod) => (
          <motion.div
            key={mod.id}
            onMouseEnter={() => setHoveredModule(mod.id)}
            onMouseLeave={() => setHoveredModule(null)}
            className={cn(
              "backdrop-blur-xl border p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-white/40 border-white"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all",
              mod.status === 'Active' 
                ? (isDarkMode ? "bg-purple-900/40 text-purple-400" : "bg-purple-100 text-purple-600") 
                : (isDarkMode ? "bg-slate-800 text-slate-500" : "bg-slate-100 text-slate-400")
            )}>
              {mod.icon}
            </div>
            <h3 className={cn("text-xl font-black tracking-tight mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{mod.title}</h3>
            <p className={cn("text-sm font-medium leading-relaxed mb-6", isDarkMode ? "text-white/40" : "text-slate-500")}>
              {mod.desc}
            </p>
            <div className="flex items-center justify-between">
               <span className={cn(
                 "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                 mod.status === 'Active' ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"
               )}>
                 {mod.status}
               </span>
               <button className="text-slate-400 group-hover:text-purple-600 transition-colors">
                  <ArrowRight size={18} />
               </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard label="Model Health" value="99.9%" change={0.1} color="purple" icon={<Activity className="text-purple-500" size={18} />} delay={0.1} />
        <StatCard label="Response Time" value="142ms" change={-12} color="blue" icon={<Zap className="text-blue-500" size={18} />} delay={0.2} />
        <StatCard label="Governance" value="100%" change={0} color="emerald" icon={<ShieldCheck className="text-emerald-500" size={18} />} delay={0.3} />
        <StatCard label="Token Efficiency" value="94%" change={5} color="cyan" icon={<Cpu className="text-cyan-500" size={18} />} delay={0.4} />
        <StatCard label="Safety Score" value="A+" change={0} color="slate" icon={<Search className="text-slate-500" size={18} />} delay={0.5} />
      </div>
    </motion.div>
  );
}
