import React, { useState, useEffect } from 'react';
import { StorageService } from '../../services/storage';
import { Shield, ShieldAlert, Cpu, Terminal, Play, CircleCheck, CircleAlert, Clock, Trash2, Database, Network, UserX, Ghost, Loader2, ChevronRight, History, RefreshCcw, ListFilter } from 'lucide-react';

const PlaybookStep = ({ step, status }) => (
  <div className="flex items-center gap-3 py-2 border-l-2 ml-2 pl-4 border-slate-800 relative">
    <div className={`absolute -left-[9px] top-3 w-4 h-4 rounded-full border-2 border-slate-950 flex items-center justify-center ${
      status === 'completed' ? 'bg-emerald-500 border-emerald-500' : 
      status === 'running' ? 'bg-indigo-500 animate-pulse border-indigo-500' : 'bg-slate-800 border-slate-700'
    }`}>
      {status === 'completed' && <CircleCheck className="w-3 h-3 text-white" />}
    </div>
    <div className="flex-1">
      <p className={`text-xs font-bold ${status === 'completed' ? 'text-emerald-500' : status === 'running' ? 'text-indigo-400' : 'text-slate-500'}`}>
        {step}
      </p>
    </div>
  </div>
);

const Incidents = () => {
  const [incidents, setIncidents] = useState(StorageService.getIncidents());
  const [activeIncident, setActiveIncident] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [logs, setLogs] = useState([]);

  const playbooks = {
    containment: [
      'Isolate Endpoint from Network',
      'Disable Compromised User Account',
      'Revoke Active Sessions',
      'Block Malicious C2 IP in Firewall'
    ],
    eradication: [
      'Terminate Malicious Process Trees',
      'Delete Persistence Registry Keys',
      'Quarantine Malicious Binaries',
      'Remove Scheduled Tasks'
    ],
    recovery: [
      'Verify System File Integrity',
      'Rotate User Credentials',
      'Update EDR Signatures',
      'Re-join Network with Monitor Mode'
    ]
  };

  const startPlaybook = (type) => {
    setIsRunning(true);
    setCurrentStep(0);
    setLogs([`[${new Date().toLocaleTimeString()}] Starting ${type.toUpperCase()} playbook...`]);
    
    let step = 0;
    const interval = setInterval(() => {
      if (step < playbooks[type].length) {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Success: ${playbooks[type][step]}`]);
        setCurrentStep(step + 1);
        step++;
      } else {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Playbook execution finished successfully.`]);
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1500);
  };

  return (
    <div className="p-8 h-full flex flex-col space-y-8 animate-in slide-in-from-top-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Incident Response Console</h2>
          <p className="text-slate-400 mt-1">Orchestrate containment and eradication playbooks</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-800">
              <History className="w-4 h-4" /> IR History
           </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Active Incidents List */}
        <div className="card-premium flex flex-col overflow-hidden">
           <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Incidents</h3>
              <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 text-[10px] font-bold">2 ACTIVE</span>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {[
                { id: 'IR-2024-001', title: 'Ransomware Attack on DB-SQL', severity: 'critical', status: 'investigating' },
                { id: 'IR-2024-002', title: 'Lateral Movement - Ubuntu-Web', severity: 'high', status: 'contained' }
              ].map(inc => (
                <div 
                  key={inc.id}
                  onClick={() => setActiveIncident(inc)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeIncident?.id === inc.id ? 'bg-indigo-600/10 border-indigo-500/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                   <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${inc.severity === 'critical' ? 'bg-rose-500/20 text-rose-500' : 'bg-orange-500/10 text-orange-500'}`}>
                        {inc.id}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">15m ago</span>
                   </div>
                   <h4 className="text-sm font-bold text-slate-200 mb-2">{inc.title}</h4>
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${inc.status === 'contained' ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                      <span className="text-[10px] lowercase text-slate-400">{inc.status}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Playbook Execution */}
        <div className="lg:col-span-2 flex flex-col gap-8 overflow-hidden">
           {activeIncident ? (
             <>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div 
                    onClick={() => !isRunning && startPlaybook('containment')}
                    className="card-premium p-6 cursor-pointer group hover:bg-rose-500/5 transition-all border-rose-500/10"
                  >
                     <div className="bg-rose-500/10 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform mb-4">
                        <UserX className="w-6 h-6 text-rose-500" />
                     </div>
                     <h4 className="font-bold text-slate-200">Containment</h4>
                     <p className="text-xs text-slate-500 mt-1">Block access and isolate the affected host</p>
                  </div>
                  <div 
                    onClick={() => !isRunning && startPlaybook('eradication')}
                    className="card-premium p-6 cursor-pointer group hover:bg-amber-500/5 transition-all border-amber-500/10"
                  >
                     <div className="bg-amber-500/10 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform mb-4">
                        <Trash2 className="w-6 h-6 text-amber-500" />
                     </div>
                     <h4 className="font-bold text-slate-200">Eradication</h4>
                     <p className="text-xs text-slate-500 mt-1">Remove persistence and malware traces</p>
                  </div>
                  <div 
                    onClick={() => !isRunning && startPlaybook('recovery')}
                    className="card-premium p-6 cursor-pointer group hover:bg-emerald-500/5 transition-all border-emerald-500/10"
                  >
                     <div className="bg-emerald-500/10 p-3 rounded-lg w-fit group-hover:scale-110 transition-transform mb-4">
                        <RefreshCcw className="w-6 h-6 text-emerald-500" />
                     </div>
                     <h4 className="font-bold text-slate-200">Recovery</h4>
                     <p className="text-xs text-slate-500 mt-1">Restore systems to normal operation</p>
                  </div>
               </div>

               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
                  {/* Steps Progress */}
                  <div className="card-premium bg-slate-900/30 p-6">
                     <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <ListFilter className="w-4 h-4" /> Current Playbook Steps
                     </h3>
                     <div className="space-y-1">
                        {playbooks.containment.map((step, idx) => (
                           <PlaybookStep 
                            key={idx} 
                            step={step} 
                            status={currentStep > idx ? 'completed' : currentStep === idx ? 'running' : 'pending'} 
                           />
                        ))}
                     </div>
                  </div>

                  {/* Terminal Log */}
                  <div className="card-premium bg-black/40 p-0 overflow-hidden flex flex-col font-mono">
                     <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                           <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                        </div>
                        <span className="text-[10px] text-slate-500">ir-playbook-executor.bin</span>
                     </div>
                     <div className="flex-1 p-4 overflow-y-auto text-[11px] text-indigo-400/80 custom-scrollbar">
                        {logs.map((log, idx) => (
                          <div key={idx} className="mb-1.5 flex gap-2">
                             <span className="text-slate-600">$</span>
                             <span>{log}</span>
                          </div>
                        ))}
                        {isRunning && (
                          <div className="flex items-center gap-2 mt-2 text-indigo-300">
                             <Loader2 className="w-3.5 h-3.5 animate-spin" />
                             <span>Executing secure API call...</span>
                          </div>
                        )}
                        {!isRunning && logs.length > 0 && (
                          <div className="mt-4 p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded flex items-center gap-2">
                             <CircleCheck className="w-4 h-4" /> ALL STEPS COMPLETED
                          </div>
                        )}
                     </div>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 card-premium flex flex-col items-center justify-center space-y-4">
                <div className="p-6 bg-slate-800/30 rounded-full">
                   <ShieldAlert className="w-12 h-12 text-slate-600" />
                </div>
                <p className="text-slate-500 font-medium">Select an incident from the list to start response orchestration</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Incidents;
