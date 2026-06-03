import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useAnimationFrame } from 'motion/react';
import { ShieldCheck, Zap, Activity, Globe, RefreshCcw, Maximize2, MoveHorizontal } from 'lucide-react';

const layers = [
  { 
    id: 'core', 
    label: 'CORE UPTIME', 
    value: '99.99%', 
    color: '#06B6D4', 
    icon: <Globe size={20} />,
    gradient: ['#22D3EE', '#0891B2'],
    radius: 180,
    zExpanded: 120
  },
  { 
    id: 'latency', 
    label: 'LATENCY P99', 
    value: '42ms', 
    color: '#3B82F6', 
    icon: <Zap size={20} />,
    gradient: ['#60A5FA', '#2563EB'],
    radius: 150,
    zExpanded: 60
  },
  { 
    id: 'health', 
    label: 'SYSTEM HEALTH', 
    value: 'OPTIMAL', 
    color: '#10B981', 
    icon: <ShieldCheck size={20} />,
    gradient: ['#34D399', '#059669'],
    radius: 120,
    zExpanded: 0
  },
  { 
    id: 'traffic', 
    label: 'TRAFFIC DENSITY', 
    value: '1.2M/s', 
    color: '#8B5CF6', 
    icon: <Activity size={20} />,
    gradient: ['#A78BFA', '#7C3AED'],
    radius: 90,
    zExpanded: -60
  }
];

import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

export function ReliabilityVisual({ onLayerHover, onLayerSelect, lockedId }: { onLayerHover?: (id: string | null) => void, onLayerSelect?: (id: string) => void, lockedId?: string | null }) {
  const { isDarkMode } = useTheme();

  const layersList = [
    { 
      id: 'core', 
      label: 'CORE UPTIME', 
      value: '99.99%', 
      color: isDarkMode ? '#0891B2' : '#06B6D4', 
      icon: <Globe size={20} />,
      gradient: isDarkMode ? ['#06B6D4', '#164E63'] : ['#22D3EE', '#0891B2'],
      radius: 180,
      zExpanded: 120
    },
    { 
      id: 'latency', 
      label: 'LATENCY P99', 
      value: '42ms', 
      color: isDarkMode ? '#2563EB' : '#3B82F6', 
      icon: <Zap size={20} />,
      gradient: isDarkMode ? ['#3B82F6', '#1E3A8A'] : ['#60A5FA', '#2563EB'],
      radius: 150,
      zExpanded: 60
    },
    { 
      id: 'health', 
      label: 'SYSTEM HEALTH', 
      value: 'OPTIMAL', 
      color: isDarkMode ? '#059669' : '#10B981', 
      icon: <ShieldCheck size={20} />,
      gradient: isDarkMode ? ['#10B981', '#064E3B'] : ['#34D399', '#059669'],
      radius: 120,
      zExpanded: 0
    },
    { 
      id: 'traffic', 
      label: 'TRAFFIC DENSITY', 
      value: '1.2M/s', 
      color: isDarkMode ? '#7C3AED' : '#8B5CF6', 
      icon: <Activity size={20} />,
      gradient: isDarkMode ? ['#8B5CF6', '#4C1D95'] : ['#A78BFA', '#7C3AED'],
      radius: 90,
      zExpanded: -60
    }
  ];

  const [autoRotate, setAutoRotate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
      setIsSwayActive(true);
      setAutoRotate(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const [isSwayActive, setIsSwayActive] = useState(false);

  const rotateX = useMotionValue(55);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springRotateZ = useSpring(rotateZ, { stiffness: 100, damping: 30 });

  useAnimationFrame((time) => {
    if (isSwayActive) {
      // Extremely slow orbital sway: 180 second period
      rotateZ.set(Math.sin(time * (2 * Math.PI / 180000)) * 20);
      
      if (autoRotate) {
        rotateY.set(rotateY.get() + 0.008); 
        rotateX.set(55 + Math.sin(time / 30000) * 1.5);
      }
    }
  });

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[2000px]">
      {/* Background Orbital Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/20 animate-[spin_20s_linear_infinite]" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite_reverse]" />
      </div>

      <motion.div 
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          rotateZ: springRotateZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[400px] h-[400px] flex items-center justify-center"
      >
        {layersList.map((layer, index) => {
          const zPos = isExpanded ? layer.zExpanded : index * 5;
          
          return (
            <motion.div
              key={layer.id}
              initial={false}
              animate={{ z: zPos }}
              transition={{ 
                type: 'spring', 
                stiffness: 15, 
                damping: 45,
                delay: index * 0.25
              }}
              style={{
                width: layer.radius * 2,
                height: layer.radius * 2,
                position: 'absolute'
              }}
              className="group cursor-pointer"
              onMouseEnter={() => onLayerHover?.(layer.id)}
              onMouseLeave={() => onLayerHover?.(null)}
            >
              {/* Circular Glass Disc */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-full border backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]",
                  lockedId === layer.id 
                    ? (isDarkMode ? "scale-[1.05] border-white/50 bg-white/10" : "scale-[1.05] border-white/90") 
                    : (isDarkMode ? "border-white/10 bg-white/5" : "border-white/30")
                )}
                style={{
                  background: isDarkMode 
                    ? (lockedId === layer.id 
                        ? `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)` 
                        : `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)`)
                    : (lockedId === layer.id 
                        ? `linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)`
                        : `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)`),
                  boxShadow: lockedId === layer.id 
                    ? `0 0 60px ${layer.color}15, inset 0 0 60px rgba(0,0,0,${isDarkMode ? '0.4' : '0.15'})` 
                    : `inset 0 0 45px rgba(0,0,0,${isDarkMode ? '0.3' : '0.1'})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerSelect?.(layer.id);
                }}
              >
                {/* Surface Shine (Orbital) */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,_rgba(255,255,255,0.6)_0%,_transparent_50%)] pointer-events-none z-10",
                  isDarkMode && "opacity-20"
                )} />
                <div className={cn(
                  "absolute top-[15%] left-[15%] w-[20%] h-[10%] bg-white/40 blur-[2px] rounded-full rotate-[-45deg] pointer-events-none z-10",
                  isDarkMode && "opacity-10"
                )} />
                
                {/* Rim Highlight (Thicker Glass Rim) */}
                <div className={cn(
                  "absolute inset-0 rounded-full border-[2px] pointer-events-none z-20",
                  isDarkMode ? "border-white/10 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]" : "border-white/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]"
                )} />
                
                {/* Orbital Accent Light */}
                <div 
                  className="absolute inset-[-50%] opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${layer.color}44 0%, transparent 70%)`
                  }}
                />

                <div className="relative flex flex-col items-center text-center p-2">
                   <div 
                    className="p-2.5 rounded-full mb-3 text-white shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${layer.gradient[0]}, ${layer.gradient[1]})` }}
                   >
                     {layer.icon}
                   </div>
                   <span className={cn(
                     "text-[10px] font-black tracking-[0.2em] uppercase mb-1",
                     isDarkMode ? "text-white/40" : "text-slate-500"
                   )}>
                     {layer.label}
                   </span>
                   <span className={cn(
                     "text-2xl font-black tracking-tighter",
                     isDarkMode ? "text-white" : "text-slate-800"
                   )}>
                     {layer.value}
                   </span>
                </div>

                {/* Progress Ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none opacity-30">
                  <circle 
                    cx="50%" cy="50%" r={layer.radius - 10}
                    fill="none" stroke="white" strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                </svg>
              </div>

              {/* Stack Depth Effect */}
              <div className="absolute inset-0 rounded-full bg-black/5 translate-z-[-2px] blur-md" />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Glass Ribbon Controls */}
      <div className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 backdrop-blur-md border p-0.5 px-5 rounded-full shadow-lg z-50 transition-all",
        isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/20 border-white/30 hover:bg-white/40"
      )}>
         <div className={cn("flex items-center gap-3 pr-3 border-r", isDarkMode ? "border-white/10" : "border-white/20")}>
           <div className="flex flex-col items-center gap-0">
             <span className={cn("text-[5px] font-black uppercase tracking-[0.2em] text-center opacity-70", isDarkMode ? "text-white/40" : "text-slate-600")}>Tilt</span>
             <input 
               type="range" min="-45" max="45" step="1"
               defaultValue={0}
               onChange={(e) => {
                 setIsSwayActive(false);
                 rotateZ.set(Number(e.target.value));
               }}
               className="w-10 h-0.5 bg-slate-400/20 rounded-lg appearance-none cursor-pointer accent-cyan-500"
             />
           </div>
         </div>

         <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsSwayActive(!isSwayActive)}
             className={cn(
               "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all group",
               isSwayActive 
                 ? "bg-cyan-500/60 text-white shadow-sm" 
                 : (isDarkMode ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-white/30 text-slate-600 hover:bg-white/50")
             )}
           >
             <MoveHorizontal size={10} className={isSwayActive ? 'animate-pulse' : ''} />
             <span className="text-[7px] font-black uppercase tracking-widest">{isSwayActive ? 'Orbiting' : 'Animate'}</span>
           </button>
           
           <div className={cn("w-px h-2 mx-0.5", isDarkMode ? "bg-white/10" : "bg-white/20")} />

           <div className="flex items-center gap-0.5">
             <button 
               onClick={() => setIsExpanded(!isExpanded)}
               className={cn(
                 "p-1 rounded-full transition-all",
                 isDarkMode ? "text-white/40 hover:text-white hover:bg-white/10" : "text-slate-500 hover:text-black hover:bg-white/40"
               )}
               title={isExpanded ? 'Collapse' : 'Expand'}
             >
               <Maximize2 size={11} className={isExpanded ? (isDarkMode ? 'rotate-180 text-cyan-400' : 'rotate-180 text-cyan-500') : ''} />
             </button>

             <button 
               className={cn(
                  "p-1 rounded-full transition-all",
                  isDarkMode ? "text-white/20 hover:text-white hover:bg-white/10" : "text-slate-400 hover:text-black hover:bg-white/40"
               )}
               title="Reset Camera"
               onClick={() => {
                  rotateX.set(55);
                  rotateY.set(0);
                  rotateZ.set(0);
                  setIsSwayActive(false);
                  onLayerHover?.(null);
               }}
             >
               <RefreshCcw size={11} />
             </button>
           </div>
         </div>
      </div>
    </div>
  );
}
