import React, { useState, useMemo } from 'react';
import { StorageService } from '../../services/storage';
import { MITRE_TECHNIQUES } from '../../data/mockData';
import { Search, Filter, CircleAlert, Clock, Shield, Target, FileCode, HardDrive, Network, User, ChevronRight, X, Terminal, Trash2, Sliders, CircleCheck } from 'lucide-react';
import { format } from 'date-fns';

const SeverityBadge = ({ severity }) => {
  const configs = {
    critical: 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.3)]',
    high: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    low: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border ${configs[severity]}`}>
      {severity}
    </span>
  );
};

const Alerts = () => {
  const [alerts, setAlerts] = useState(StorageService.getAlerts());
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredAlerts = useMemo(() => {
    return alerts
      .filter(a => filterSeverity === 'all' || a.severity === filterSeverity)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [alerts, filterSeverity]);

  const handleUpdateStatus = (alertId, status) => {
    const updated = alerts.map(a => a.id === alertId ? { ...a, status } : a);
    setAlerts(updated);
    StorageService.setAlerts(updated);
  };

  return (
    <div className="p-8 h-full flex flex-col space-y-6 overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Alert Queue</h2>
          <p className="text-slate-400 text-sm">Investigate and respond to security events</p>
        </div>
        <div className="flex gap-2">
           {['all', 'critical', 'high', 'medium', 'low'].map(sev => (
             <button 
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                filterSeverity === sev 
                  ? 'bg-slate-100 text-slate-900 border-slate-100 shadow-lg' 
                  : 'bg-slate-900 text-slate-500 border-slate-800 hover:border-slate-700'
              }`}
             >
               {sev.toUpperCase()}
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        {/* Alerts Table */}
        <div className={`card-premium overflow-hidden flex flex-col ${selectedAlert ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-sm z-10">
                <tr className="border-b border-slate-800">
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Severity</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Alert details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Technique</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Time</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredAlerts.map(alert => (
                  <tr 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`hover:bg-slate-800/30 cursor-pointer transition-colors ${selectedAlert?.id === alert.id ? 'bg-indigo-600/5' : ''}`}
                  >
                    <td className="px-6 py-4 text-center">
                      <SeverityBadge severity={alert.severity} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-slate-200 truncate max-w-[200px]">{alert.description}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{alert.endpointId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3 text-indigo-400" />
                        <span className="text-[10px] font-mono text-indigo-300 font-bold">{alert.techniqueId}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-slate-400">{format(new Date(alert.timestamp), 'HH:mm:ss')}</div>
                      <div className="text-[10px] text-slate-600">{format(new Date(alert.timestamp), 'MMM dd')}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`w-2 h-2 rounded-full ${alert.status === 'new' ? 'bg-rose-500 animate-pulse' : alert.status === 'closed' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Investigation Panel */}
        {selectedAlert && (
          <div className="lg:col-span-5 card-premium flex flex-col overflow-hidden animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedAlert.severity === 'critical' ? 'bg-rose-500/20 text-rose-500' : 'bg-indigo-500/20 text-indigo-500'
                  }`}>
                    <CircleAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedAlert.severity.toUpperCase()} ALERT</h3>
                    <p className="text-xs text-slate-500">{selectedAlert.id} - {selectedAlert.endpointId}</p>
                  </div>
               </div>
               <button onClick={() => setSelectedAlert(null)} className="p-1 hover:bg-slate-800 rounded-full transition-colors">
                 <X className="w-5 h-5 text-slate-500" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
               {/* Description */}
               <section>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Event Description</h4>
                 <p className="text-sm text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                   {selectedAlert.description}
                 </p>
               </section>

               {/* MITRE Info */}
               <section className="glass-panel p-4 border-indigo-500/10">
                 <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-indigo-500" />
                    <h4 className="text-sm font-bold text-white">MITRE ATT&CK Mapping</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Technique</p>
                      <p className="text-sm font-bold text-indigo-400">{MITRE_TECHNIQUES[selectedAlert.techniqueId]?.name || selectedAlert.techniqueId}</p>
                      <p className="text-[10px] text-slate-600 mt-0.5">{selectedAlert.techniqueId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase">Tactic</p>
                      <p className="text-sm font-bold text-slate-200">{MITRE_TECHNIQUES[selectedAlert.techniqueId]?.tactic || 'Discovery'}</p>
                    </div>
                 </div>
               </section>

               {/* Timeline */}
               <section>
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Incident Timeline</h4>
                 <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-800">
                   {[
                     { time: '12:04:12', event: 'Initial execution detected', type: 'system' },
                     { time: '12:04:15', event: 'C2 communication attempt blocked', type: 'network' },
                     { time: '12:05:01', event: 'EDR-SIM Agent triggered alert', type: 'alert' },
                   ].map((item, idx) => (
                     <div key={idx} className="flex gap-4 relative">
                        <div className="w-[24px] h-[24px] rounded-full bg-slate-900 border-2 border-slate-800 z-10 flex items-center justify-center">
                          <div className={`w-2 h-2 rounded-full ${idx === 2 ? 'bg-indigo-500 animate-pulse' : 'bg-slate-600'}`}></div>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-500 font-mono">{item.time}</p>
                          <p className="text-xs font-medium text-slate-300">{item.event}</p>
                        </div>
                     </div>
                   ))}
                 </div>
               </section>

               {/* Forensics */}
               <section className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                     <div className="flex items-center gap-2 mb-2">
                        <FileCode className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Process Path</span>
                     </div>
                     <p className="text-[10px] text-slate-400 font-mono break-all bg-black/30 p-2 rounded">C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe</p>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                     <div className="flex items-center gap-2 mb-2">
                        <Network className="w-4 h-4 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Network Connection</span>
                     </div>
                     <p className="text-[10px] text-slate-400 font-mono bg-black/30 p-2 rounded text-center">45.2.144.10:443 (HTTPS)</p>
                  </div>
               </section>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex gap-2">
               <button 
                onClick={() => handleUpdateStatus(selectedAlert.id, 'closed')}
                className="flex-1 px-4 py-2 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-lg text-xs font-bold hover:bg-emerald-600/20 transition-all flex items-center justify-center gap-2"
               >
                 <CircleCheck className="w-4 h-4" /> CLOSE ALERT
               </button>
               <button className="flex-1 px-4 py-2 bg-rose-600/10 border border-rose-500/20 text-rose-500 rounded-lg text-xs font-bold hover:bg-rose-600/20 transition-all flex items-center justify-center gap-2">
                 <Shield className="w-4 h-4" /> ISOLATE
               </button>
               <button className="p-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-400">
                 <Sliders className="w-4 h-4" />
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
