import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import { StorageService } from '../../services/storage';
import { Shield, CircleAlert, Monitor, CircleCheck, Clock, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
  <div className="card-premium p-6 flex flex-col gap-4 relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 group-hover:opacity-10 transition-opacity ${color}`}></div>
    <div className="flex items-center justify-between">
      <div className={`p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${trend > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
          {trend > 0 ? '+' : ''}{trend}%
        </span>
      )}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const alerts = StorageService.getAlerts();
  const endpoints = StorageService.getEndpoints();

  const stats = useMemo(() => ({
    totalEndpoints: endpoints.length,
    criticalAlerts: alerts.filter(a => a.severity === 'critical' && a.status !== 'closed').length,
    highAlerts: alerts.filter(a => a.severity === 'high' && a.status !== 'closed').length,
    mediumAlerts: alerts.filter(a => a.severity === 'medium' && a.status !== 'closed').length,
    offlineEndpoints: endpoints.filter(e => e.status === 'offline').length,
  }), [alerts, endpoints]);

  // Mock data for charts - in a real app this would come from processing the alerts
  const alertTrends = [
    { time: '00:00', count: 12 }, { time: '04:00', count: 8 }, 
    { time: '08:00', count: 25 }, { time: '12:00', count: 45 }, 
    { time: '16:00', count: 32 }, { time: '20:00', count: 18 },
    { time: '23:59', count: 15 }
  ];

  const mitreData = [
    { name: 'PowerShell', value: 15, color: '#6366f1' },
    { name: 'Phishing', value: 12, color: '#f43f5e' },
    { name: 'Credential Dumping', value: 8, color: '#f97316' },
    { name: 'RDP Brute Force', value: 22, color: '#f59e0b' },
    { name: 'File Deletion', value: 5, color: '#0ea5e9' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Security Command Center</h2>
          <p className="text-slate-400 mt-1">Real-time endpoint protection overview</p>
        </div>
        <div className="flex gap-3">
           <button className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
              Last 24 Hours
           </button>
           <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all">
              Export PDF
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard title="Endpoints" value={stats.totalEndpoints} icon={Monitor} color="bg-slate-500" />
        <StatCard title="Critical Alerts" value={stats.criticalAlerts} icon={CircleAlert} color="bg-rose-500" trend={12} />
        <StatCard title="High Risk" value={stats.highAlerts} icon={CircleAlert} color="bg-orange-500" trend={-5} />
        <StatCard title="Medium Risk" value={stats.mediumAlerts} icon={CircleAlert} color="bg-amber-500" />
        <StatCard title="Offline Agents" value={stats.offlineEndpoints} icon={Clock} color="bg-slate-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 card-premium p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold">Alert Activity (24h)</h3>
            <div className="flex items-center gap-2 text-xs text-slate-500">
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Detectados</span>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertTrends}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MITRE Top Techniques */}
        <div className="card-premium p-6">
          <h3 className="text-lg font-bold mb-6">Top MITRE ATT&CK Techniques</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mitreData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} vertex={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={100} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#ffffff0a' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {mitreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Platform Health Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card-premium p-5 flex items-center gap-5">
           <div className="p-4 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
              <Shield className="w-8 h-8 text-indigo-500" />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Platform Status</p>
              <p className="text-lg font-bold text-white">UP AND RUNNING</p>
           </div>
        </div>
        <div className="card-premium p-5 flex items-center gap-5">
           <div className="p-4 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
              <CircleCheck className="w-8 h-8 text-emerald-500" />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">SIEM Integration</p>
              <p className="text-lg font-bold text-white">ACTIVE (SPLUNK)</p>
           </div>
        </div>
        <div className="card-premium p-5 flex items-center gap-5">
           <div className="p-4 bg-slate-500/10 rounded-2xl flex items-center justify-center">
              <Activity className="w-8 h-8 text-slate-400" />
           </div>
           <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Daily Scan</p>
              <p className="text-lg font-bold text-white">COMPLETED (6 AM)</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
