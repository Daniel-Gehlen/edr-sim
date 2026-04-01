import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { Search, Plus, Filter, Settings2, ShieldCheck, ShieldAlert, Cpu, Eye, EyeOff, BarChart3, ListFilter, Trash2, Edit3, X, Check } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Rules = () => {
  const [rules, setRules] = useState(StorageService.getRules());
  const [searchTerm, setSearchTerm] = useState('');
  const [showTuningModal, setShowTuningModal] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);

  const handleToggleRule = (ruleId) => {
    const updated = rules.map(r => r.id === ruleId ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' } : r);
    setRules(updated);
    StorageService.setRules(updated);
  };

  const handleTuneRule = (ruleId) => {
    const rule = rules.find(r => r.id === ruleId);
    setSelectedRule(rule);
    setShowTuningModal(true);
  };

  const fpReductionData = [
    { day: 'Mon', fp: 45 }, { day: 'Tue', fp: 42 }, 
    { day: 'Wed', fp: 30 }, { day: 'Thu', fp: 25 }, 
    { day: 'Fri', fp: 18 }, { day: 'Sat', fp: 12 },
    { day: 'Sun', fp: 8 }
  ];

  return (
    <div className="p-8 space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white">Detection Tuning</h2>
          <p className="text-slate-400 mt-1">Optimize detection quality and reduce false positives</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all">
            <Plus className="w-4 h-4" /> CREATE RULE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rules List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Global Policy Rules</h3>
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
               <input 
                 type="text" 
                 placeholder="Search rules..." 
                 className="bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-1.5 text-xs outline-none focus:border-indigo-500 transition-colors"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
            </div>
          </div>
          
          <div className="space-y-3">
            {rules.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map(rule => (
              <div key={rule.id} className={`card-premium p-4 flex items-center justify-between group ${rule.status === 'inactive' ? 'opacity-50' : ''}`}>
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-lg ${rule.status === 'active' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-800 text-slate-600'}`}>
                     {rule.status === 'active' ? <ShieldCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-slate-200">{rule.name}</h4>
                     <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] font-mono text-slate-500">Sigma: {rule.technique}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border border-transparent ${
                          rule.severity === 'critical' ? 'text-rose-500' : rule.severity === 'high' ? 'text-orange-500' : 'text-slate-400'
                        }`}>{rule.severity.toUpperCase()}</span>
                     </div>
                   </div>
                </div>
                
                <div className="flex items-center gap-6">
                   <div className="text-right hidden md:block">
                      <p className="text-[10px] text-slate-500 font-bold uppercase">FP Rate</p>
                      <p className={`text-sm font-bold ${rule.fpRate > 0.15 ? 'text-amber-500' : 'text-emerald-500'}`}>{(rule.fpRate * 100).toFixed(0)}%</p>
                   </div>
                   <div className="flex items-center gap-2">
                     <button onClick={() => handleTuneRule(rule.id)} className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        <Settings2 className="w-4 h-4" />
                     </button>
                     <button onClick={() => handleToggleRule(rule.id)} className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                        {rule.status === 'active' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                     </button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats & Insights */}
        <div className="space-y-6">
           <div className="card-premium p-6 overflow-hidden relative">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tuning Impact</h3>
                 <BarChart3 className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="space-y-4">
                 <div>
                    <h4 className="text-2xl font-bold text-emerald-500">-78%</h4>
                    <p className="text-xs text-slate-400">False Positive Reduction (Last 30D)</p>
                 </div>
                 <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={fpReductionData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none' }} />
                          <Area type="monotone" dataKey="fp" stroke="#10b981" fill="#10b98133" strokeWidth={2} />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           <div className="card-premium p-6">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Quality Recommendations</h3>
              <div className="space-y-4">
                 <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-lg">
                    <p className="text-xs text-rose-500 font-bold mb-1">High FP Rule Detected</p>
                    <p className="text-[10px] text-slate-400">"Network Sniffing Behavior" is generating 25% FPs. Review whitelist.</p>
                 </div>
                 <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                    <p className="text-xs text-emerald-500 font-bold mb-1">Baseline Completed</p>
                    <p className="text-[10px] text-slate-400">Process behavior baseline has been updated. Review 3 suggested exclusions.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Tuning Modal (Simulated) */}
      {showTuningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                 <h3 className="text-xl font-bold flex items-center gap-3">
                    <Sliders className="w-6 h-6 text-indigo-500" />
                    Tune Rule: {selectedRule?.name}
                 </h3>
                 <button onClick={() => setShowTuningModal(false)} className="p-1 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              <div className="p-6 space-y-6">
                 <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Confidence Level</label>
                    <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                       <span>Low False Alarm Rate</span>
                       <span>High Sensitivity</span>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Exclusion List (Whitelist)</label>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                       <div className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded border border-slate-800">
                          <span className="font-mono text-slate-400">path: C:\\Windows\\System32\\svchost.exe</span>
                          <Trash2 className="w-3.5 h-3.5 text-slate-600 hover:text-rose-500 cursor-pointer" />
                       </div>
                       <div className="flex items-center justify-between text-xs p-2 bg-slate-900 rounded border border-slate-800">
                          <span className="font-mono text-slate-400">process: backup_agent.exe</span>
                          <Trash2 className="w-3.5 h-3.5 text-slate-600 hover:text-rose-500 cursor-pointer" />
                       </div>
                       <div className="flex items-center gap-2 mt-2">
                          <input type="text" placeholder="Add path, process or hash..." className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs outline-none focus:border-indigo-500" />
                          <button className="p-1.5 bg-indigo-600 text-white rounded"><Plus className="w-4 h-4" /></button>
                       </div>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex gap-3">
                 <button onClick={() => setShowTuningModal(false)} className="flex-1 py-2 rounded-lg bg-slate-800 border border-slate-700 font-bold text-sm text-slate-300">CANCEL</button>
                 <button onClick={() => setShowTuningModal(false)} className="flex-1 py-2 rounded-lg bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> APPLY CHANGES
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Rules;
