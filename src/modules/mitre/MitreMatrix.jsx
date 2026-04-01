import React, { useState, useMemo } from 'react';
import { StorageService } from '../../services/storage';
import { MITRE_TECHNIQUES } from '../../data/mockData';
import { Target, Info, Shield, ExternalLink, X, AlertCircle } from 'lucide-react';

const TACTICS = [
  'Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 
  'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement', 
  'Collection', 'Command and Control', 'Exfiltration', 'Impact'
];

// Mapping techniques to tactics for the matrix
const MATRIX_DATA = TACTICS.map(tactic => ({
  name: tactic,
  techniques: Object.keys(MITRE_TECHNIQUES)
    .filter(id => MITRE_TECHNIQUES[id].tactic === tactic)
    .map(id => ({ id, ...MITRE_TECHNIQUES[id] }))
}));

// Fallback for missing techniques in mock mapping
MATRIX_DATA.forEach(t => {
   if (t.techniques.length === 0) {
      t.techniques = [{ id: 'T0000', name: 'Generic Technique', tactic: t.name }];
   }
});

const MitreMatrix = () => {
  const alerts = StorageService.getAlerts();
  const [selectedTech, setSelectedTech] = useState(null);

  const detectedIds = useMemo(() => {
    return new Set(alerts.map(a => a.techniqueId));
  }, [alerts]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white uppercase tracking-tight">MITRE ATT&CK® Matrix</h2>
          <p className="text-slate-400 mt-1">Enterprise techniques detected in the environment</p>
        </div>
        <div className="flex gap-4">
           <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-rose-500 rounded-sm"></div>
              <span className="text-slate-400">Detected (Active)</span>
           </div>
           <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 bg-slate-800 border border-slate-700 rounded-sm"></div>
              <span className="text-slate-400">Monitored</span>
           </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar pb-8">
        <div className="flex gap-4 min-w-max h-full">
           {MATRIX_DATA.map((tactic, idx) => (
             <div key={idx} className="w-48 flex flex-col gap-3">
                <div className="bg-slate-900 border-b-2 border-indigo-500 p-3 rounded-t-lg sticky top-0 z-10 shadow-lg">
                   <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center h-8 flex items-center justify-center">
                     {tactic.name}
                   </h3>
                   <p className="text-[10px] text-center text-slate-600 font-mono">{tactic.techniques.length} Techs</p>
                </div>
                
                <div className="space-y-2">
                   {tactic.techniques.map(tech => {
                     const isDetected = detectedIds.has(tech.id);
                     return (
                       <div 
                        key={tech.id}
                        onClick={() => setSelectedTech(tech)}
                        className={`p-3 rounded-lg border text-[10px] font-medium transition-all cursor-pointer hover:scale-[1.03] active:scale-95 ${
                          isDetected 
                            ? 'bg-rose-500/10 border-rose-500/50 text-rose-100 shadow-[0_0_15px_-5px_rgba(244,63,94,0.4)]' 
                            : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
                        }`}
                       >
                          <div className="flex items-center justify-between gap-2">
                             <span className="truncate">{tech.name}</span>
                             {isDetected && <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />}
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                             <span className="text-[8px] opacity-40 font-bold">{tech.id}</span>
                             {isDetected && <span className="text-[8px] text-rose-400 font-bold">DETECTION</span>}
                          </div>
                       </div>
                     );
                   })}
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* Technique Modal */}
      {selectedTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in zoom-in-95">
           <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-rose-500/10 rounded-2xl">
                       <Target className="w-8 h-8 text-rose-500" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold text-white">{selectedTech.name}</h3>
                       <p className="text-sm text-indigo-400 font-mono">{selectedTech.id} • {selectedTech.tactic}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedTech(null)} className="p-2 hover:bg-slate-800 rounded-full text-slate-500">
                    <X className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="p-8 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                       <Info className="w-4 h-4" /> Description from MITRE
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed leading-7">
                       {selectedTech.description || 'Adversaries may use this technique to gain access to unauthorized data or execute malicious commands. It is widely used in enterprise breaches across multiple industries.'}
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-800">
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <Shield className="w-4 h-4 text-emerald-500" /> Mitigation
                       </h4>
                       <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                          <li>Implement least privilege policies</li>
                          <li>Monitor process arguments for anomalies</li>
                          <li>Enable behavioral analysis on EDR agents</li>
                       </ul>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-rose-500" /> Detections
                       </h4>
                       <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <p className="text-[10px] text-slate-500 mb-1 font-bold">SIGMA RULE STATUS</p>
                          <p className="text-xs text-emerald-500 font-bold">ACTIVE & OPTIMIZED</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center px-8">
                 <button className="text-indigo-400 text-xs font-bold flex items-center gap-2 hover:text-indigo-300 px-4 py-2 rounded-lg hover:bg-indigo-500/5 transition-all">
                    VIEW MITRE PAGE <ExternalLink className="w-3.5 h-3.5" />
                 </button>
                 <button 
                  onClick={() => setSelectedTech(null)}
                  className="px-6 py-2 bg-slate-100 text-slate-950 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
                 >
                    GOT IT
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MitreMatrix;
