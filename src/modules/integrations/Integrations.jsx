import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { CloudLightning, Server, Terminal, Shield, Workflow, Webhook, CircleCheck, CircleX, Loader2, Link, Zap, Globe, Lock, HardDrive, RefreshCcw } from 'lucide-react';

const IntegrationItem = ({ name, type, status, icon: Icon, description }) => (
  <div className="card-premium p-6 flex flex-col gap-4 group">
    <div className="flex items-center justify-between">
       <div className={`p-3 rounded-2xl ${status === 'connected' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'}`}>
          <Icon className="w-6 h-6" />
       </div>
       <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
         status === 'connected' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
       }`}>
         {status}
       </div>
    </div>
    <div>
       <h4 className="text-sm font-bold text-white uppercase tracking-tight">{name}</h4>
       <p className="text-[10px] text-slate-500 font-bold uppercase">{type}</p>
       <p className="text-xs text-slate-400 mt-2">{description}</p>
    </div>
    <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between">
       <button className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 hover:text-indigo-300 transition-colors">
          CONFIGURE <Link className="w-3 h-3" />
       </button>
       <button className="text-[10px] font-bold text-slate-500 hover:text-slate-300 transition-colors">
          TEST LOGS
       </button>
    </div>
  </div>
);

const Integrations = () => {
  const [logs, setLogs] = useState([
    `[${new Date().toLocaleTimeString()}] ALERT forwarded to Splunk HEC: al-01 (Severity: CRITICAL)`,
    `[${new Date().toLocaleTimeString()}] SOAR Playbook TRIGGERED: IsolateHost_v2 (Target: ep-01)`,
    `[${new Date().toLocaleTimeString()}] Webhook response 200 OK from TheHive API`,
    `[${new Date().toLocaleTimeString()}] Edge Security SYNC: WAF policies updated (DDoS Protection Active)`,
  ]);

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/15">
              <CloudLightning className="w-8 h-8 text-indigo-400" />
           </div>
           <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Security Fabric Integrations</h2>
              <p className="text-slate-400 mt-1">Connect your EDR with SIEM, SOAR, and Edge Security</p>
           </div>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-slate-100 text-slate-950 rounded-xl text-sm font-bold hover:scale-105 transition-all">
              ADD NEW INTEGRATION
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <IntegrationItem name="Splunk" type="SIEM" status="connected" icon={Server} description="Real-time alert and event indexing for SOC analysis." />
         <IntegrationItem name="Microsoft Sentinel" type="SIEM" status="disconnected" icon={Lock} description="Cloud-native SIEM with automated threat response." />
         <IntegrationItem name="TheHive" type="SOAR" status="connected" icon={Shield} description="Incident management and case tracking orchestration." />
         <IntegrationItem name="Cortex XSOAR" type="SOAR" status="disconnected" icon={Workflow} description="Palo Alto Networks security orchestration and response." />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden">
        {/* Edge Security Integration */}
        <div className="card-premium p-6 flex flex-col space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Globe className="w-4 h-4 text-indigo-400" /> Edge Security (WAF/DDoS)
              </h3>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
           </div>
           
           <div className="space-y-4">
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                 <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tighter">WAF Rate Limiting</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Status: Active & Synchronized</p>
                 </div>
                 <Zap className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                 <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tighter">Zero Trust Gateway</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Policy: Deny by default</p>
                 </div>
                 <Lock className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
                 <div>
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-tighter">DDoS Protection</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Load: 12.4 Gbps capacity</p>
                 </div>
                 <Shield className="w-5 h-5 text-rose-500" />
              </div>
           </div>
           
           <button className="w-full py-2 bg-slate-800 border border-slate-700 rounded-xl text-[10px] font-bold text-slate-400 hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
              <RefreshCcw className="w-3 h-3" /> FULL SYNC NOW
           </button>
        </div>

        {/* Integration Logs */}
        <div className="lg:col-span-2 card-premium p-0 flex flex-col overflow-hidden font-mono bg-black/30">
           <div className="p-4 bg-slate-900 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Terminal className="w-4 h-4" /> Forwarding Logs
              </h3>
              <div className="flex gap-2">
                 <div className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded text-[10px] font-bold border border-indigo-500/20">LIVE</div>
              </div>
           </div>
           <div className="flex-1 p-6 overflow-y-auto space-y-3 custom-scrollbar text-[11px]">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-3 text-slate-400">
                   <span className="text-slate-700">[{idx+1042}]</span>
                   <span className="text-indigo-400/80">{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 text-slate-600 italic">
                 <span>[{logs.length+1042}]</span>
                 <span className="flex items-center gap-2">
                    <Loader2 className="w-3 h-3 animate-spin" /> Waiting for next event...
                 </span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
