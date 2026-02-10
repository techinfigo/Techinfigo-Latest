
import React from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookAudit }) => {
  return (
    <footer className="bg-brandDark text-white pt-20 pb-10 px-6 lg:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Top CTA Banner */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20 pb-16 border-b border-white/5">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-6xl font-extrabold tracking-tighter leading-none">
              Engineer Your <span className="text-brandYellow italic">Scale.</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-medium max-w-lg">
              We only partner with 2 new brands per quarter to ensure 100% focus on unit economics.
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-4">
            <button 
              onClick={onBookAudit}
              className="bg-brandYellow text-brandDark font-bold px-8 py-5 rounded-lg text-sm uppercase tracking-widest flex items-center gap-4 hover:bg-white transition-all shadow-xl group"
            >
              Book Free Growth Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
            <span className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">Response in {"<"} 24 Hours</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-x-10 lg:gap-y-6 mb-20">
          
          {/* Identity Column */}
          <div className="lg:col-span-3 space-y-10">
            <div className="w-10 h-10 bg-brandYellow flex items-center justify-center rounded-sm shadow-lg">
              <span className="text-brandDark font-extrabold text-xl">T</span>
            </div>
            <p className="text-white/60 text-sm lg:text-base leading-relaxed font-medium">
              A premium D2C Growth Agency engineering compounding systems for brands doing ₹20L–₹2Cr/mo.
            </p>
            <div className="inline-block px-4 py-2 border border-brandYellow/20 rounded-full">
              <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest">• Engineering Growth</span>
            </div>
          </div>

          {/* Foundation Column - Mirrors Navigation */}
          <div className="lg:col-span-3 space-y-8 lg:pl-6">
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Foundation</p>
            <ul className="grid grid-cols-1 gap-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'About Us', id: 'about' },
                { name: 'The System', id: 'system' },
                { name: 'Our Process', id: 'how-it-works' },
                { name: 'Who We Fit', id: 'qualification' },
                { name: 'Services', id: 'services' },
                { name: 'Careers', id: 'careers' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => onNavigate(item.id)} 
                    className="text-sm text-white/60 hover:text-brandYellow transition-colors font-medium text-left uppercase tracking-widest"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialized Levers */}
          <div className="lg:col-span-2 space-y-8 lg:pl-4">
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Levers</p>
            <ul className="space-y-4">
              {['Performance Ads', 'CRO Optimization', 'SEO Infrastructure', 'Retention Flows'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate('services')} className="text-sm text-white/60 hover:text-brandYellow transition-colors font-medium">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* HQ Terminal Column */}
          <div className="lg:col-span-4 relative">
            <div className="bg-[#002a2f] border border-white/10 rounded-3xl p-7 lg:p-8 space-y-8 shadow-2xl h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">HQ Terminal</span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-brandYellow uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
                  Live Support
                </span>
              </div>

              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white/90 leading-relaxed tracking-tight">
                    Office no. 03, Cloth Market, Sanjay Place, Civil Lines, Agra, UP 282002
                  </p>
                  <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.2em]">Agra Regional Office</span>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-white tracking-tight break-all">+91 9557338487</p>
                  <p className="text-xs font-medium text-white/40 break-all">contact@techinfigo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">
            <span>&copy; 2026 Techinfigo</span>
            <span className="text-white/40">Pure Execution</span>
            <span className="flex items-center gap-2">
              Made in India
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
            <button onClick={() => onNavigate('contact')} className="hover:text-brandYellow transition-colors">Support</button>
            <button className="hover:text-brandYellow transition-colors">Privacy</button>
            <button className="hover:text-brandYellow transition-colors">Terms</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
