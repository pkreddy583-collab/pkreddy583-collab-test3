import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  Zap, 
  Info,
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

interface KPI {
  label: string;
  value: string;
  trend?: 'up' | 'down';
  change?: number;
}

interface TableRow {
  [key: string]: any;
}

interface PageData {
  title: string;
  purpose: string;
  kpis: KPI[];
  trendData?: any[];
  tableData?: TableRow[];
  recommendations: { t: string; p: string; color: string }[];
}

export function OperationsDrillPage({ endpoint, title, purpose }: { endpoint: string, title: string, purpose: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const kpis = data?.kpis || [];
  const trendData = data?.trend || [
    { name: '01:00', val: 400 }, { name: '02:00', val: 300 }, { name: '03:00', val: 500 },
    { name: '04:00', val: 200 }, { name: '05:00', val: 450 }, { name: '06:00', val: 600 }
  ];
  const tableData = data?.table || [];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 max-w-[1600px] mx-auto w-full space-y-8"
    >
      {/* 1. Page Header */}
      <div className="flex items-end justify-between border-b border-slate-200 pb-8">
        <div>
           <div className="flex items-center gap-3 text-slate-400 mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operations Command</span>
              <ChevronRight size={12} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">{title}</span>
           </div>
           <h1 className="text-5xl font-black text-slate-800 tracking-tighter">{title}</h1>
           <p className="text-slate-500 mt-4 font-medium max-w-2xl">{purpose}</p>
        </div>
        <div className="flex gap-3">
           <button className="px-6 py-3 bg-white/40 border border-white/60 backdrop-blur-md rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-sm">Export Report</button>
           <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">Live Bridge</button>
        </div>
      </div>

      {/* 2. KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {kpis.map((kpi: any, idx: number) => (
          <div key={idx} className="bg-white/30 backdrop-blur-3xl p-6 rounded-[2rem] border border-white/50 shadow-sm group hover:shadow-xl hover:-translate-y-1 transition-all">
             <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">{kpi.label}</div>
             <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-800 tracking-tighter">{kpi.value}</span>
                {kpi.change && (
                  <span className={kpi.trend === 'up' ? 'text-green-500 text-[10px] font-black' : 'text-red-500 text-[10px] font-black'}>
                    {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}%
                  </span>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* 3 & 4. Main Insight & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white/20 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/40 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Propagation Dynamics</h3>
               <div className="flex items-center gap-2 px-3 py-1 bg-white/40 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-500 overflow-hidden">
                  <Activity size={10} className="animate-pulse" /> Live Telemetry
               </div>
            </div>
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="name" axisLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
                    <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="sla" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                    <Area type="monotone" dataKey="val" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
         
         <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
               <h3 className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mb-6">AI Strategic Insight</h3>
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Zap className="text-yellow-400" size={24} />
               </div>
               <p className="text-lg font-bold leading-snug tracking-tight mb-8">
                 Critical performance variance detected in core middleware. Recommend immediate reallocation of SRE focus to high-risk zones.
               </p>
               <div className="space-y-4">
                  {[
                    { label: 'Risk Probability', val: 'Low' },
                    { label: 'Confidence Score', val: '94%' },
                    { label: 'Estimated Impact', val: '$1.2M' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between border-b border-white/10 pb-2">
                       <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest">{stat.val}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Shield size={160} />
            </div>
         </div>
      </div>

      {/* 5. Detailed Table */}
      <div className="bg-white/20 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/40 shadow-sm overflow-hidden">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">Operational Ledger</h3>
            <div className="flex gap-2">
               <input 
                 type="text" 
                 placeholder="Filter Command" 
                 className="bg-white/40 border border-white/60 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest w-48 focus:ring-0"
               />
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-slate-900/5">
                     {tableData.length > 0 && Object.keys(tableData[0]).map(key => (
                       <th key={key} className="pb-4 text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">{key}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b border-slate-900/5 hover:bg-white/10 transition-colors">
                       {Object.values(row).map((val: any, j) => (
                         <td key={j} className="py-4 px-4 text-xs font-bold text-slate-700">
                           {typeof val === 'string' && val.includes('Breach') ? (
                             <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-600 text-[9px] font-black uppercase tracking-widest border border-red-200">
                                {val}
                             </span>
                           ) : val}
                         </td>
                       ))}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* 6. Recommended Actions */}
      <div className="pb-12">
         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <Zap size={12} className="text-yellow-500" /> Strategic Directive Queue
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { t: 'Optimize Bridge Latency', p: 'High Impact', color: 'red' },
              { t: 'Refactor Ack-Loop', p: 'Medium Impact', color: 'blue' },
              { t: 'Consolidate Telemetry', p: 'Low Impact', color: 'green' }
            ].map((action, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-xl p-6 rounded-3xl border border-white/60 flex items-center justify-between group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                <span className="text-[11px] font-black text-slate-700 tracking-tight uppercase tracking-widest">{action.t}</span>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}
