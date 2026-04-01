import React, { useState } from 'react';
import { StorageService } from '../../services/storage';
import { FileText, Download, PieChart, Presentation, ChevronRight, BarChart, ClipboardCheck, Users, ExternalLink, Printer, Mail, Send, X, Shield } from 'lucide-react';

const ReportCard = ({ title, type, date, description, icon: Icon }) => (
  <div className="card-premium p-6 flex flex-col justify-between hover:border-indigo-500/50 transition-all cursor-pointer group">
    <div className="space-y-4">
       <div className="flex items-center justify-between">
          <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-colors">
             <Icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{type}</span>
       </div>
       <div>
          <h4 className="text-lg font-bold text-white">{title}</h4>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
       </div>
    </div>
    <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
       <span className="text-[10px] text-slate-600 font-mono">{date}</span>
       <div className="flex gap-2">
          <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Printer className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"><Download className="w-4 h-4" /></button>
       </div>
    </div>
  </div>
);

const Reports = () => {
  const [showPresentation, setShowPresentation] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { title: 'Security Posture Overview', content: 'Our environment health score has increased by 15% this month due to aggressive tuning and agent updates.', kpi: '82/100 Health Score' },
    { title: 'Incident Response Efficacy', content: 'MTTR (Mean Time To Respond) has decreased to 14 minutes for critical alerts.', kpi: '14 min Average MTTR' },
    { title: 'Detection Quality Improvement', content: 'False positive reduction in PowerShell detections has saved over 40 analyst-hours per week.', kpi: '78% FP Reduction' }
  ];

  return (
    <div className="p-8 space-y-8 animate-in zoom-in-95 duration-500 h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Advanced Reporting</h2>
          <p className="text-slate-400 mt-1">Generate technical audits and executive summaries</p>
        </div>
        <div className="flex gap-3">
           <button 
            onClick={() => setShowPresentation(true)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
           >
              <Presentation className="w-5 h-5" /> CLIENT PRESENTATION
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReportCard 
          title="Security Posture Audit" 
          type="Monthly Technical" 
          date="Mar 31, 2024" 
          description="Comprehensive audit of all endpoints, vulnerabilities, and agent coverage."
          icon={ClipboardCheck}
        />
        <ReportCard 
          title="Incident Summary Report" 
          type="Weekly Ops" 
          date="Mar 30, 2024" 
          description="Detailed log of all high and critical incidents handled by the SOC."
          icon={PieChart}
        />
        <ReportCard 
          title="Tuning & Detection Quality" 
          type="Monthly Tuning" 
          date="Mar 28, 2024" 
          description="Analysis of rule efficacy, FP rates, and detection strategy improvements."
          icon={BarChart}
        />
      </div>

      <div className="flex-1 card-premium p-8 bg-slate-900/30 flex flex-col items-center justify-center space-y-6 text-center">
         <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
            <Users className="w-10 h-10 text-indigo-400" />
         </div>
         <div className="max-w-md">
            <h3 className="text-xl font-bold text-white mb-2">Stakeholder Sync</h3>
            <p className="text-sm text-slate-400">Schedule an automated briefing with clients to review the monthly posture and discuss roadmap improvements.</p>
         </div>
         <div className="flex gap-4">
            <button className="px-6 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors">
               SCHEDULE MEETING
            </button>
            <button className="px-6 py-2 bg-slate-100 text-slate-950 rounded-xl text-sm font-bold hover:scale-105 transition-transform">
               SEND NOW <Send className="w-4 h-4 inline ml-2" />
            </button>
         </div>
      </div>

      {/* Presentation Mode Modal */}
      {showPresentation && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col animate-in fade-in duration-300">
           <header className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Shield className="w-6 h-6 text-indigo-500" />
                 <span className="font-bold text-slate-400 tracking-widest text-xs uppercase">EDR-SIM Executive Briefing</span>
              </div>
              <button onClick={() => setShowPresentation(false)} className="p-2 hover:bg-white/5 rounded-full">
                 <X className="w-6 h-6 text-slate-500" />
              </button>
           </header>
           
           <main className="flex-1 flex items-center justify-center p-20">
              <div className="max-w-4xl w-full flex gap-12 items-center animate-in slide-in-from-bottom-8 duration-700">
                 <div className="flex-1 space-y-8">
                    <span className="text-indigo-400 font-mono text-sm">Slide {currentSlide + 1} of {slides.length}</span>
                    <h1 className="text-6xl font-bold text-white leading-tight">{slides[currentSlide].title}</h1>
                    <p className="text-2xl text-slate-400 leading-relaxed">{slides[currentSlide].content}</p>
                 </div>
                 <div className="w-64 h-64 rounded-full border-[12px] border-indigo-500/20 flex flex-col items-center justify-center text-center p-8 bg-indigo-500/5 shadow-[0_0_50px_-10px_rgba(99,102,241,0.3)]">
                    <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">KPI METRIC</p>
                    <p className="text-lg font-bold text-white uppercase">{slides[currentSlide].kpi}</p>
                 </div>
              </div>
           </main>

           <footer className="p-8 flex items-center justify-between border-t border-white/5">
              <div className="flex gap-2">
                 {slides.map((_, idx) => (
                    <div key={idx} className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-12 bg-indigo-500' : 'w-4 bg-slate-800'}`}></div>
                 ))}
              </div>
              <div className="flex gap-4">
                 <button 
                  disabled={currentSlide === 0}
                  onClick={() => setCurrentSlide(prev => prev - 1)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 font-bold hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed"
                 >
                    PREVIOUS
                 </button>
                 <button 
                  onClick={() => {
                    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
                    else setShowPresentation(false);
                  }}
                  className="px-8 py-3 rounded-xl bg-slate-100 text-slate-950 font-bold hover:scale-105 transition-all shadow-xl"
                 >
                    {currentSlide === slides.length - 1 ? 'FINISH' : 'NEXT'}
                 </button>
              </div>
           </footer>
        </div>
      )}
    </div>
  );
};


export default Reports;
