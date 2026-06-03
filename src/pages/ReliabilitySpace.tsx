import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Orbit } from 'lucide-react';
import { ReliabilityVisual } from '../components/ReliabilityVisual';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

const themeColors: Record<string, string> = {
  core: '#ECFEFF', latency: '#EFF6FF', health: '#F0FDF4', traffic: '#FAF5FF'
};

const moduleInfo: Record<string, { title: string, desc: string, detail: string }> = {
  core: { 
    title: "Core Stability", 
    desc: "Baseline health monitoring for all mission-critical infrastructure.",
    detail: "Latency profiles remain within 10ms of historical norms across all global regions."
  },
  latency: { 
    title: "Latency Optimization", 
    desc: "Active optimization of tail latency for high-throughput applications.",
    detail: "Edge pruning successfully reduced P99 latency by 22% during last peak period."
  },
  health: { 
    title: "System Health", 
    desc: "Comprehensive health check metrics across distributed node clusters.",
    detail: "Auto-remediation resolved 42 nodes health failures without manual intervention."
  },
  traffic: { 
    title: "Traffic Resilience", 
    desc: "Intelligent load balancing and traffic shaping to prevent cascading failures.",
    detail: "Throttling algorithms successfully mitigated a volumetric spike at 14:00 UTC."
  }
};

export default function ReliabilitySpace() {
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
        setThemeColor('#F0FDFA'); 
      }
    }
  }, [currentActive, setThemeColor, isDarkMode]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <div className="flex items-center justify-between">
         <div className="flex flex-col">
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Reliability Space</h2>
            <div className="text-xs text-slate-500 font-medium mt-1 uppercase italic">Orbital Stability System • Live Telemetry</div>
         </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-center min-h-[500px]">
        <div className="flex-1 space-y-8">
          <AnimatePresence mode="wait">
            {!activeLayer ? (
              <motion.div key="rel-default" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <h1 className={cn(
                  "text-6xl font-black tracking-tighter leading-none",
                  isDarkMode ? "text-white" : "text-slate-800"
                )}>
                  Core <br/><span className="text-cyan-500">Stability</span>
                </h1>
                <p className={cn(
                  "text-xl font-medium max-w-md leading-relaxed",
                  isDarkMode ? "text-white/50" : "text-slate-500"
                )}>
                  Autonomous reliability management using orbital glass discs to visualize system health and parity.
                </p>
                <div className="flex gap-4">
                   <div className={cn(
                     "p-6 border rounded-3xl shadow-sm backdrop-blur-xl flex-1 transition-all duration-700",
                     isDarkMode ? "bg-white/5 border-white/10" : "bg-white/40 border-white"
                   )}>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Global Parity</div>
                      <div className={cn("text-3xl font-black tracking-tighter", isDarkMode ? "text-white" : "text-slate-800")}>100%</div>
                   </div>
                   <div className={cn(
                     "p-6 border rounded-3xl shadow-sm backdrop-blur-xl flex-1 transition-all duration-700",
                     isDarkMode ? "bg-white/5 border-white/10" : "bg-white/40 border-white"
                   )}>
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mean Repair</div>
                      <div className={cn("text-3xl font-black tracking-tighter", isDarkMode ? "text-white" : "text-slate-800")}>12m</div>
                   </div>
                </div>
              </motion.div>
            ) : (
              <motion.div key={activeLayer} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                 <div className="inline-block px-3 py-1 bg-cyan-500 text-white text-[10px] font-black rounded-lg uppercase tracking-widest mb-2">Active Node</div>
                 <h2 className={cn(
                   "text-5xl font-black tracking-tighter leading-none uppercase",
                   isDarkMode ? "text-white" : "text-slate-900"
                 )}>
                   {moduleInfo[activeLayer]?.title || "Circular Logic"}
                 </h2>
                 <p className={cn(
                   "text-lg font-medium italic",
                   isDarkMode ? "text-white/60" : "text-slate-600"
                 )}>"{moduleInfo[activeLayer]?.desc}"</p>
                 <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><Orbit size={120} /></div>
                    <div className="relative z-10 space-y-4">
                       <span className="text-[10px] font-black text-cyan-400 uppercase tracking-[0.3em]">Deep Diagnostic</span>
                       <p className="text-lg leading-snug">{moduleInfo[activeLayer]?.detail || "No additional data for this node."}</p>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex-1 w-full flex justify-center py-6 min-h-[500px]">
          <ReliabilityVisual 
            onLayerHover={setActiveLayer} 
            onLayerSelect={(id) => setLockedLayer(lockedLayer === id ? null : id)}
            lockedId={lockedLayer}
          />
        </div>
      </div>
    </motion.div>
  );
}
