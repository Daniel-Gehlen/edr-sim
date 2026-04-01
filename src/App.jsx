import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Shield, Activity, Bell, Settings, BarChart2, Monitor, AlertTriangle, ShieldCheck, HelpCircle, FileText, ChevronRight, Menu, X, CloudLightning } from 'lucide-react';
import { StorageService } from './services/storage';

import Dashboard from './modules/dashboard/Dashboard';
const Endpoints = () => <div className="p-8"><h1>Endpoints WIP</h1></div>;
const Alerts = () => <div className="p-8"><h1>Alerts WIP</h1></div>;
const Tuning = () => <div className="p-8"><h1>Tuning WIP</h1></div>;
const IncidentResponse = () => <div className="p-8"><h1>IR WIP</h1></div>;
const MITREATTACK = () => <div className="p-8"><h1>MITRE Matrix WIP</h1></div>;
const Integrations = () => <div className="p-8"><h1>Integrations WIP</h1></div>;
const Reports = () => <div className="p-8"><h1>Reports WIP</h1></div>;
const Troubleshooting = () => <div className="p-8"><h1>Troubleshooting WIP</h1></div>;

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_-5px_rgba(99,102,241,0.5)]' 
        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </Link>
);

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navLinks = [
    { to: '/', icon: BarChart2, label: 'Dashboard' },
    { to: '/alerts', icon: Bell, label: 'Alerts' },
    { to: '/endpoints', icon: Monitor, label: 'Endpoints' },
    { to: '/incidents', icon: Shield, label: 'Incidents' },
    { to: '/mitre', icon: Activity, label: 'MITRE ATT&CK' },
    { to: '/tuning', icon: Settings, label: 'Tuning' },
    { to: '/troubleshooting', icon: HelpCircle, label: 'Health Check' },
    { to: '/reports', icon: FileText, label: 'Reports' },
    { to: '/integrations', icon: CloudLightning, label: 'Integrations' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20 ring-1 ring-indigo-400">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">EDR-SIM</h1>
          </div>
          
          <nav className="flex-1 px-4 space-y-1 py-4 overflow-y-auto custom-scrollbar">
            {navLinks.map((link) => (
              <NavItem 
                key={link.to} 
                {...link} 
                active={location.pathname === link.to} 
              />
            ))}
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200">System Healthy</p>
                <p className="text-[10px] text-slate-500 truncate">SIEM/SOAR: CONNECTED</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-slate-400 hover:text-white">
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-sm font-medium text-slate-400">
              <span className="hover:text-slate-200 cursor-pointer">Security Operations</span>
              <ChevronRight className="w-4 h-4 inline mx-2 opacity-30" />
              <span className="text-slate-100">{navLinks.find(l => l.to === location.pathname)?.label || 'Overview'}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-4 text-xs font-semibold bg-slate-950 px-4 py-2 rounded-full border border-slate-800">
                <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span> 12 CRITICAL</div>
                <div className="w-[1px] h-3 bg-slate-800"></div>
                <div className="flex items-center gap-1.5 text-slate-400">92% COVERAGE</div>
             </div>
             <button className="p-2.5 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 transition-colors relative">
               <Bell className="w-5 h-5 text-slate-300" />
               <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-slate-900"></span>
             </button>
             <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 ring-2 ring-slate-800 shadow-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                {/* User Initials or Avatar */}
                <div className="w-full h-full flex items-center justify-center font-bold text-xs">AG</div>
             </div>
          </div>
        </header>

        {/* Content View */}
        <section className="flex-1 overflow-y-auto bg-slate-950/50 scroll-smooth custom-scrollbar">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/endpoints" element={<Endpoints />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/tuning" element={<Tuning />} />
            <Route path="/incidents" element={<IncidentResponse />} />
            <Route path="/mitre" element={<MITREATTACK />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/troubleshooting" element={<Troubleshooting />} />
          </Routes>
        </section>
      </main>
    </div>
  );
};

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
