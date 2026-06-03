/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useAnimationFrame, useTransform } from 'motion/react';
import { 
  Cpu, 
  ShieldCheck, 
  Zap,
  Layout,
  Maximize2,
  RefreshCcw,
  Orbit,
  MoveHorizontal,
  ChevronRight
} from 'lucide-react';

const layers = [
  { 
    id: 'gov', 
    label: 'GOVERNANCE', 
    value: '84%', 
    color: '#34D399', 
    icon: <Zap size={20} />,
    gradient: ['#6EE7B7', '#059669'],
    size: 420,
    zExpanded: 0
  },
  { 
    id: 'rel', 
    label: 'RELIABILITY', 
    value: '81%', 
    color: '#06B6D4', 
    icon: <ShieldCheck size={20} />,
    gradient: ['#22D3EE', '#0891B2'],
    size: 360,
    zExpanded: 80
  },
  { 
    id: 'ai', 
    label: 'AI & AUTOMATION', 
    value: '68%', 
    color: '#A855F7', 
    icon: <Cpu size={20} />,
    gradient: ['#C084FC', '#9333EA'],
    size: 300,
    zExpanded: 160
  },
  { 
    id: 'ops', 
    label: 'OPERATIONS', 
    value: '87%', 
    color: '#3B82F6', 
    icon: <Layout size={20} />,
    gradient: ['#60A5FA', '#2563EB'],
    size: 240,
    zExpanded: 240
  }
];

import { cn } from '../lib/utils';
import { useTheme } from '../contexts/ThemeContext';

export function HeroVisual({ onLayerHover, onLayerSelect, lockedId }: { onLayerHover?: (id: string | null) => void, onLayerSelect?: (id: string) => void, lockedId?: string | null }) {
  const { isDarkMode } = useTheme();

  const layersList = [
    { 
      id: 'gov', 
      label: 'GOVERNANCE', 
      value: '84%', 
      color: isDarkMode ? '#10B981' : '#34D399', 
      icon: <Zap size={20} />,
      gradient: isDarkMode ? ['#34D399', '#064E3B'] : ['#6EE7B7', '#059669'],
      size: 420,
      zExpanded: 0
    },
    { 
      id: 'rel', 
      label: 'RELIABILITY', 
      value: '81%', 
      color: isDarkMode ? '#0891B2' : '#06B6D4', 
      icon: <ShieldCheck size={20} />,
      gradient: isDarkMode ? ['#06B6D4', '#164E63'] : ['#22D3EE', '#0891B2'],
      size: 360,
      zExpanded: 80
    },
    { 
      id: 'ai', 
      label: 'AI & AUTOMATION', 
      value: '68%', 
      color: isDarkMode ? '#9333EA' : '#A855F7', 
      icon: <Cpu size={20} />,
      gradient: isDarkMode ? ['#A855F7', '#581C87'] : ['#C084FC', '#9333EA'],
      size: 300,
      zExpanded: 160
    },
    { 
      id: 'ops', 
      label: 'OPERATIONS', 
      value: '87%', 
      color: isDarkMode ? '#2563EB' : '#3B82F6', 
      icon: <Layout size={20} />,
      gradient: isDarkMode ? ['#3B82F6', '#1E3A8A'] : ['#60A5FA', '#2563EB'],
      size: 240,
      zExpanded: 240
    }
  ];

  const [autoRotate, setAutoRotate] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [freezeX, setFreezeX] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(true);
      setIsSwayActive(true);
      setAutoRotate(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);
  const [freezeY, setFreezeY] = useState(false);
  const [freezeZ, setFreezeZ] = useState(false);
  const [isSwayActive, setIsSwayActive] = useState(false);

  const rotateX = useMotionValue(55);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springRotateZ = useSpring(rotateZ, { stiffness: 100, damping: 30 });

  // Use animation frame for smooth rotation
  useAnimationFrame((time) => {
    if (isSwayActive) {
      // Super slow sway: 120 second period
      rotateZ.set(Math.sin(time * (2 * Math.PI / 120000)) * 25);
      
      // Also maintain a very slow, graceful auto-rotation and wobble when active
      if (autoRotate) {
        rotateY.set(rotateY.get() + 0.015); 
        rotateX.set(55 + Math.sin(time / 20000) * 2);
      }
    }
  });

  // Handle drag for rotation
  const onDrag = (event: any, info: any) => {
    setAutoRotate(false); 
    if (!freezeY) {
      rotateY.set(rotateY.get() + info.delta.x * 0.6);
    }
    if (!freezeX) {
      rotateX.set(Math.min(Math.max(rotateX.get() - info.delta.y * 0.5, 30), 80));
    }
  };

  return (
    <div className="relative w-full max-w-2xl aspect-square flex items-center justify-center -mt-12 select-none overflow-visible">
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,_#3B82F6_0%,_transparent_60%)] blur-3xl" />
      </div>

      {/* Interactive Axis Rails (Highly Translucent) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        {/* Y-Axis Line */}
        <div className={`absolute w-[1px] h-full transition-opacity duration-500 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent ${freezeY ? 'opacity-100 scale-x-[2]' : 'opacity-40'}`} />
        {/* X-Axis Line */}
        <div className={`absolute h-[1px] w-full transition-opacity duration-500 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent ${freezeX ? 'opacity-100 scale-y-[2]' : 'opacity-40'}`} />
        {/* Z-Axis Circular Rail */}
        <div className={`absolute w-[500px] h-[500px] rounded-full border transition-all duration-500 border-purple-500/10 ${freezeZ ? 'opacity-100 border-purple-500/30 scale-105' : 'opacity-40'}`} />
      </div>

      {/* 3D Scene Container */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0}
        onDrag={onDrag}
        className="relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing perspective-[1500px]"
      >
        <motion.div 
          style={{ 
            transformStyle: 'preserve-3d',
            rotateX: springRotateX,
            rotateY: springRotateY,
            rotateZ: springRotateZ
          }}
          className="relative flex flex-col items-center justify-center"
        >
          {layersList.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={false}
              animate={{ 
                z: isExpanded ? layer.zExpanded : idx * 15,
              }}
              transition={{ 
                type: 'spring',
                stiffness: 20,
                damping: 40,
                delay: idx * 0.3
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                width: layer.size,
                height: layer.size,
                position: 'absolute'
              }}
              className="group cursor-pointer"
              onMouseEnter={() => onLayerHover?.(layer.id)}
              onClick={() => onLayerSelect?.(layer.id)}
            >
              {/* Glass Slab Depth Rim (Improved Bevel) */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{ 
                  transform: 'translateZ(-13.5px)',
                  background: isDarkMode 
                    ? `linear-gradient(135deg, ${layer.color}10 0%, ${layer.color}05 100%)`
                    : `linear-gradient(135deg, ${layer.color}15 0%, ${layer.color}05 100%)`,
                  boxShadow: isDarkMode
                    ? `0 1px 0 rgba(255,255,255,0.1), 0 -1px 0 rgba(0,0,0,0.5), inset 0 0 15px rgba(0,0,0,0.5), 14px 14px 40px rgba(0,0,0,0.6)`
                    : `0 1.5px 0 rgba(255,255,255,0.9), 0 -1px 0 rgba(0,0,0,0.05), inset 0 0 15px rgba(255,255,255,0.1), 14px 14px 28px rgba(0,0,0,0.2)`,
                  borderRight: isDarkMode ? `1px solid rgba(255,255,255,0.05)` : `1.5px solid rgba(255,255,255,0.15)`,
                  borderBottom: `5px solid ${layer.color}${isDarkMode ? '20' : '35'}`
                }}
              />

              {/* Main Glass Surface */}
              <div 
                className={cn(
                  "absolute inset-0 rounded-2xl border backdrop-blur-3xl flex items-end justify-center pb-[7%] transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden",
                  lockedId === layer.id 
                    ? (isDarkMode ? "scale-[1.02] border-white/30" : "scale-[1.02] border-white/90") 
                    : (isDarkMode ? "border-white/10" : "border-white/40")
                )}
                style={{ 
                  background: isDarkMode 
                    ? (lockedId === layer.id 
                        ? `linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)` 
                        : `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)`)
                    : (lockedId === layer.id 
                        ? `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 100%)` 
                        : `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.01) 100%)`),
                  boxShadow: lockedId === layer.id 
                    ? `0 0 60px ${layer.color}15, inset 0 0 100px rgba(0,0,0,${isDarkMode ? '0.4' : '0.2'})` 
                    : `inset 0 0 60px rgba(0,0,0,${isDarkMode ? '0.3' : '0.1'}), 0 45px 90px -25px rgba(0,0,0,${isDarkMode ? '0.8' : '0.35'})`
                }}
              >
                {/* Specular Glossy Highlights */}
                <div className={cn(
                  "absolute top-[5%] left-[5%] w-[40%] h-[20%] bg-gradient-to-br from-white/60 via-white/10 to-transparent blur-[1px] rounded-full rotate-[-15deg] pointer-events-none",
                  isDarkMode && "opacity-30"
                )} />
                <div className={cn(
                  "absolute bottom-[10%] right-[10%] w-[10%] h-[10%] bg-white/20 blur-[8px] rounded-full pointer-events-none",
                  isDarkMode && "opacity-10"
                )} />

                {/* Surface Fresnel Highlight (Top Left Shine) */}
                <div className={cn(
                  "absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 via-transparent to-transparent pointer-events-none",
                  isDarkMode ? "opacity-20" : "opacity-40"
                )} />
                
                {/* Crystal Edge Highlight */}
                <div className={cn(
                  "absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent shadow-[0_0_10px_rgba(255,255,255,0.8)]",
                  isDarkMode && "opacity-40 shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                )} />
                <div className={cn(
                  "absolute left-0 inset-y-0 w-[1px] bg-gradient-to-b from-white/80 via-transparent to-transparent",
                  isDarkMode && "opacity-20"
                )} />
                
                {/* Selected Indicator Shine */}
                {lockedId === layer.id && (
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className={cn(
                      "absolute inset-0 w-1/2 bg-gradient-to-r from-transparent to-transparent -skew-x-12",
                      isDarkMode ? "via-white/10" : "via-white/20"
                    )}
                  />
                )}
                <div className={cn("absolute top-2 left-6 right-6 h-[1px] blur-[1px] rounded-full mx-auto", isDarkMode ? "bg-white/10" : "bg-white/40")} />
                
                {/* Content Counter-Rotation (Grounded in lower section) */}
                <div 
                  className="flex items-center gap-4 px-6 w-full"
                  style={{ transform: 'rotateX(-55deg) translateZ(5px)' }}
                >
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-2xl relative overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${layer.gradient[0]}, ${layer.gradient[1]})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-50" />
                    {React.cloneElement(layer.icon as React.ReactElement<any>, { size: 18 })}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-2">
                       <div className="flex flex-col min-w-0">
                         <span className="text-[9px] font-black tracking-[0.2em] text-white/90 uppercase leading-none mb-1 shadow-black/20 drop-shadow-sm truncate">{layer.label}</span>
                         <span className="text-[7px] font-bold text-white/40 uppercase">Metrics</span>
                       </div>
                       <span className="text-2xl font-black text-white tracking-tighter drop-shadow-2xl leading-none tabular-nums ml-2">{layer.value}</span>
                    </div>
                    <div className="h-1 w-full bg-black/20 rounded-full overflow-hidden backdrop-blur-md border border-white/5">
                       <motion.div 
                         initial={{ width: 0 }}
                         animate={{ width: layer.value }}
                         transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 + idx * 0.1 }}
                         className="h-full shadow-[0_0_15px_rgba(255,255,255,0.8)]" 
                         style={{ backgroundColor: '#fff' }}
                       />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floor Shadow Reflection */}
              <div 
                 className="absolute inset-x-12 -bottom-2 h-12 opacity-30 blur-3xl rounded-[100%] pointer-events-none"
                 style={{ backgroundColor: layer.color }}
              />

              {/* Interaction Glow */}
              <div 
                className="absolute inset-[-40px] opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full -z-10 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${layer.color}30 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modern Control Bar */}
      <div className={cn(
        "absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-3 backdrop-blur-md border p-0.5 px-5 rounded-full shadow-lg z-50 transition-all",
        isDarkMode ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white/20 border-white/30 hover:bg-white/40"
      )}>
         <div className={cn("flex items-center gap-3 pr-3 border-r", isDarkMode ? "border-white/10" : "border-white/20")}>
           {/* Side Tilt (Z) Slider */}
           <div className="flex flex-col items-center gap-0">
             <span className={cn("text-[5px] font-black uppercase tracking-[0.2em] text-center opacity-70", isDarkMode ? "text-white/40" : "text-slate-600")}>Tilt</span>
             <input 
               type="range" min="-45" max="45" step="1"
               defaultValue={0}
               onChange={(e) => {
                 setIsSwayActive(false);
                 rotateZ.set(Number(e.target.value));
               }}
               className="w-10 h-0.5 bg-slate-400/20 rounded-lg appearance-none cursor-pointer accent-indigo-500"
             />
           </div>
         </div>

         <div className="flex items-center gap-2">
           <button 
             onClick={() => {
               setIsSwayActive(!isSwayActive);
             }}
             className={cn(
               "flex items-center gap-1.5 px-3 py-1 rounded-full transition-all group",
               isSwayActive 
                 ? "bg-indigo-500/60 text-white shadow-sm" 
                 : (isDarkMode ? "bg-white/10 text-white/60 hover:bg-white/20" : "bg-white/30 text-slate-600 hover:bg-white/50")
             )}
           >
             <MoveHorizontal size={10} className={isSwayActive ? 'animate-pulse' : ''} />
             <span className="text-[7px] font-black uppercase tracking-widest">{isSwayActive ? 'Swaying' : 'Animate'}</span>
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
               <Maximize2 size={11} className={isExpanded ? (isDarkMode ? 'rotate-180 text-indigo-400' : 'rotate-180 text-indigo-500') : ''} />
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

      <style>{`
        .perspective-1500 { perspective: 1500px; }
      `}</style>
    </div>
  );
}
