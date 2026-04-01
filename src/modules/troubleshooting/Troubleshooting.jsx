import React, { useMemo } from 'react';
import { StorageService } from '../../services/storage';
import { CircleAlert, CircleCheck, CircleHelp, Activity, ShieldAlert, Cpu, HardDrive, Network, RefreshCw, Zap, Bug, Download, MessageCircleCode } from 'lucide-react';

const HealthIndicator = ({ label, status, detail }) => (
  <div className="card-premium p-5 flex items-start gap-4">
    <div className={`p-2.5 rounded-xl border ${
      status === 'healthy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
      status === 'warning' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
      'bg-rose-500/10 text-rose-500 border-rose-500/20'
    }`}>
      {status === 'healthy' ? <CircleCheck className="w-5 h-5" /> : <CircleAlert className="w-5 h-5" />}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-200">{label}</h4>
        <span className={`text-[10px] font-bold uppercase ${
          status === 'healthy' ? 'text-emerald-500' : status === 'warning' ? 'text-amber-500' : 'text-rose-500'
        }`}>{status}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{detail}</p>
    </div>
  </div>
);

const Troubleshooting = () => {
  const endpoints = StorageService.getEndpoints();
  const alerts = StorageService.getAlerts();

  const issues = useMemo(() => {
    return [
      { id: 1, title: 'Agent Offline', count: endpoints.filter(e => e.status === 'offline').length, priority: 'medium', impact: 'Blind spot in endpoint visibility' },
      { id: 2, title: 'Outdated Agent Version', count: endpoints.filter(e => e.agentVersion !== '8.2.1').length, priority: 'low', impact: 'Missing latest detection signatures' },
      { id: 3, title: 'High CPU Consumption', count: 3, priority: 'high', impact: 'Degraded business performance on hosts' },
      { id: 4, title: 'Critical Alerts > 1h', count: alerts.filter(a => a.severity === 'critical' && a.status === 'new').length, priority: 'critical', impact: 'Elevated risk of breach expansion' }
    ];
  }, [endpoints, alerts]);

  return (
    <div className="p-8 space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-indigo-600/20 rounded-2xl shadow-lg border border-indigo-500/20">
              <Zap className="w-8 h-8 text-indigo-400" />
           </div>
           <div>
              <h2 className="text-3xl font-bold text-white">Platform Health</h2>
              <p className="text-slate-400 mt-1">Diagnostic tools and proactive recommendations</p>
           </div>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-bold text-slate-300 hover:bg-slate-800 transition-colors">
           <RefreshCw className="w-4 h-4" /> RUN DEEP DIAGNOSTICS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthIndicator label="Cloud Connectivity" status="healthy" detail="All gateways reporting OK" />
        <HealthIndicator label="Scanner Database" status="healthy" detail="Updated 24 minutes ago" />
        <HealthIndicator label="SOAR Webhooks" status="warning" detail="3 timeouts in last hour" />
        <HealthIndicator label="License Status" status="healthy" detail="Valid until Jan 2026" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="card-premium p-6">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-indigo-500" /> Detected Performance Issues
                 </h3>
                 <span className="text-xs text-indigo-400 font-bold px-2 py-1 bg-indigo-500/10 rounded-lg">Auto-remediation active</span>
              </div>
              
              <div className="space-y-4">
                 {issues.map(issue => (
                   <div key={issue.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between group hover:border-slate-700 transition-all">
                      <div className="flex items-center gap-5">
                         <div className={`w-2 h-10 rounded-full ${
                           issue.priority === 'critical' ? 'bg-rose-500' : issue.priority === 'high' ? 'bg-orange-500' : 'bg-indigo-500'
                         }`}></div>
                         <div>
                            <div className="flex items-center gap-2">
                               <h4 className="font-bold text-slate-200">{issue.title}</h4>
                               <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-lg text-slate-400">{issue.count} affected</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-tight font-bold">Impact: <span className="text-slate-400 font-normal normal-case">{issue.impact}</span></p>
                         </div>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-lg hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-bold">FIX AUTOMATICALLY</button>
                         <button className="p-2 bg-slate-800 text-slate-400 border border-slate-700 rounded-lg text-[10px] font-bold">VIEW HOSTS</button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="card-premium p-6 bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/20">
              <div className="flex items-center gap-3 mb-6">
                 <ShieldAlert className="w-6 h-6 text-indigo-400" />
                 <h3 className="text-lg font-bold text-white">Technician's Toolkit</h3>
              </div>
              <div className="space-y-3">
                 <button className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-left hover:border-indigo-500 transition-all group">
                    <p className="text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                       Agent Installer Generator <Download className="w-4 h-4 text-slate-600 group-hover:text-indigo-500" />
                    </p>
                    <p className="text-[10px] text-slate-500">Deploy agents to new Windows/Linux endpoints</p>
                 </button>
                 <button className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-left hover:border-indigo-500 transition-all group">
                    <p className="text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                       Log Collector Script <Cpu className="w-4 h-4 text-slate-600 group-hover:text-indigo-500" />
                    </p>
                    <p className="text-[10px] text-slate-500">Manual log gathering for support escalation</p>
                 </button>
                 <button className="w-full p-4 bg-slate-950/80 border border-slate-800 rounded-xl text-left hover:border-indigo-500 transition-all group">
                    <p className="text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                       Connectivity Debugger <Network className="w-4 h-4 text-slate-600 group-hover:text-indigo-500" />
                    </p>
                    <p className="text-[10px] text-slate-500">Test network paths to EDR cloud services</p>
                 </button>
              </div>
           </div>

           <div className="card-premium p-6 border-emerald-500/10">
              <div className="flex items-center gap-3 mb-6">
                 <MessageCircleCode className="w-6 h-6 text-emerald-500" />
                 <h3 className="text-lg font-bold text-white">Expert Recommendations</h3>
              </div>
              <div className="space-y-4">
                 <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-emerald-500 rounded-r-lg">
                    <p className="text-xs font-bold text-slate-200">Rule Optimization</p>
                    <p className="text-[10px] text-slate-500 mt-1">Regra X gerando 40% de falsos positivos – revisar exceções e ajustar limites de sensibilidade.</p>
                 </div>
                 <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-indigo-500 rounded-r-lg">
                    <p className="text-xs font-bold text-slate-200">Patching Hygiene</p>
                    <p className="text-[10px] text-slate-500 mt-1">3 endpoints com agente desatualizado – atualizar urgente para evitar bypass por técnicas conhecidas.</p>
                 </div>
                 <div className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-orange-500 rounded-r-lg">
                    <p className="text-xs font-bold text-slate-200">Policy Conflict</p>
                    <p className="text-[10px] text-slate-500 mt-1">Conflict detected between Local Firewall and EDR Rule T1040 on SERVER-WEB-01.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Troubleshooting;
