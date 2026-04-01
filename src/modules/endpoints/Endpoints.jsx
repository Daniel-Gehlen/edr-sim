import React, { useState, useMemo } from 'react';
import { StorageService } from '../../services/storage';
import { Search, Filter, Monitor, MoreVertical, Shield, Power, Wifi, WifiOff, AlertTriangle, CheckCircle, RefreshCcw, FileSearch, HardDrive, ShieldOff } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const configs = {
    online: { label: 'Online', icon: Wifi, className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
    offline: { label: 'Offline', icon: WifiOff, className: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
    problem: { label: 'Trouble', icon: AlertTriangle, className: 'bg-rose-500/10 text-rose-500 border-rose-500/20 shadow-[0_0_8px_rgba(244,63,94,0.3)]' },
    isolated: { label: 'Isolated', icon: ShieldOff, className: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' },
  };
  const config = configs[status] || configs.offline;
  const Icon = config.icon;

  return (
    <span className={`status-badge flex items-center gap-1.5 ${config.className}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const Endpoints = () => {
  const [endpoints, setEndpoints] = useState(StorageService.getEndpoints());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const filteredEndpoints = useMemo(() => {
    return endpoints.filter(e => 
      e.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.ip.includes(searchTerm)
    );
  }, [endpoints, searchTerm]);

  const handleAction = (endpointId, action) => {
    const updated = endpoints.map(e => {
      if (e.id === endpointId) {
        if (action === 'isolate') return { ...e, status: e.status === 'isolated' ? 'online' : 'isolated' };
        if (action === 'scan') return { ...e, lastCheckIn: new Date().toISOString() };
      }
      return e;
    });
    setEndpoints(updated);
    StorageService.setEndpoints(updated);
    // Add logic for notifications here later
  };

  return (
    <div className="p-8 space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Endpoint Inventory</h2>
          <p className="text-slate-400">Manage and monitor protected assets</p>
        </div>
        <div className="flex gap-3">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
             <input 
               type="text" 
               placeholder="Search by IP or hostname..." 
               className="bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-400 hover:text-white">
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 card-premium overflow-hidden">
          <div className="overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 border-b border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hostname</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">OS / Agent</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Health</th>
                  <th className="px-6 py-4 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {filteredEndpoints.map(ep => (
                  <tr 
                    key={ep.id} 
                    className={`hover:bg-slate-800/30 cursor-pointer transition-colors ${selectedEndpoint?.id === ep.id ? 'bg-indigo-600/5' : ''}`}
                    onClick={() => setSelectedEndpoint(ep)}
                  >
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{ep.hostname}</div>
                      <div className="text-xs text-slate-500">{ep.ip}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-300">{ep.os}</div>
                      <div className="text-[10px] text-slate-500 font-mono">v{ep.agentVersion}</div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={ep.status} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${ep.health === 'Healthy' ? 'bg-emerald-500' : ep.health === 'Warning' ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                        <span className="text-sm">{ep.health}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button className="p-1 hover:bg-slate-700 rounded transition-colors">
                         <MoreVertical className="w-5 h-5 text-slate-500" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Panel */}
        <div className="card-premium p-6 h-[fit-content] space-y-6">
          {selectedEndpoint ? (
            <>
              <div className="flex items-center gap-4 border-b border-slate-800 pb-6">
                <div className="p-3 bg-indigo-500/10 rounded-xl">
                  <Monitor className="w-8 h-8 text-indigo-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold truncate">{selectedEndpoint.hostname}</h3>
                  <p className="text-xs text-slate-500">{selectedEndpoint.id}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Response Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleAction(selectedEndpoint.id, 'isolate')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${selectedEndpoint.status === 'isolated' ? 'bg-emerald-600/10 border-emerald-500/50 text-emerald-500' : 'bg-rose-600/5 border-rose-500/20 text-rose-400 hover:bg-rose-500/10'}`}
                  >
                    <Shield className="w-5 h-5" />
                    <span className="text-[10px] font-bold">{selectedEndpoint.status === 'isolated' ? 'REJOIN NETWORK' : 'ISOLATE HOST'}</span>
                  </button>
                  <button 
                    onClick={() => handleAction(selectedEndpoint.id, 'scan')}
                    className="flex flex-col items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-all"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">On-demand Scan</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-all">
                    <FileSearch className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Collect Artefacts</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 bg-slate-800 border border-slate-700 rounded-xl text-slate-300 hover:bg-slate-700 transition-all">
                    <HardDrive className="w-5 h-5" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Live Shell</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Agent Health</span>
                  <span className="text-emerald-500 font-bold">OPTIMAL</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Last Seen</span>
                  <span className="text-slate-300">Just now</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Uptime</span>
                  <span className="text-slate-300">12d 4h 22m</span>
                </div>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
               <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
                  <Monitor className="w-8 h-8 text-slate-600" />
               </div>
               <p className="text-sm text-slate-500 px-8">Select an endpoint to view details and execute response actions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Endpoints;
