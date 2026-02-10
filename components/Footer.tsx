
import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works' | 'careers') => void;
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

        {/* Main Footer Grid - Optimized Spans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-x-10 lg:gap-y-6 mb-20">
          
          {/* Column 1: Identity (Span 3) */}
          <div className="lg:col-span-3 space-y-10">
            <div className="w-14 h-14 bg-brandYellow flex items-center justify-center rounded-xl shadow-lg">
              <span className="text-brandDark font-extrabold text-2xl">TF</span>
            </div>
            <p className="text-white/60 text-sm lg:text-base leading-relaxed font-medium">
              We build <span className="text-white font-bold">compounding growth systems</span> for D2C brands doing ₹20L–₹2Cr/mo who value profit over vanity.
            </p>
            <div className="inline-block px-4 py-2 border border-brandYellow/20 rounded-full">
              <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest">• Partner-Led Execution</span>
            </div>
          </div>

          {/* Column 2: Capabilities (Span 2) */}
          <div className="lg:col-span-2 space-y-8 lg:pl-4">
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Capabilities</p>
            <ul className="space-y-4">
              {['Performance Ads', 'CRO & Funnels', 'eCommerce SEO', 'Retention Flows'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate('services')} className="text-sm text-white/60 hover:text-brandYellow transition-colors font-medium">
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onNavigate('services')} className="text-sm text-brandYellow font-bold flex items-center gap-2 group text-left">
                  All Levers 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Foundation (Increased to Span 3 for Space) */}
          <div className="lg:col-span-3 space-y-8 lg:pl-6">
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Foundation</p>
            <ul className="space-y-4">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Our Story', id: 'about' },
                { name: 'Contact', id: 'contact' },
                { name: 'Growth Audit', id: 'how-it-works' }
              ].map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => onNavigate(item.id as any)} 
                    className="text-sm text-white/60 hover:text-brandYellow transition-colors font-medium text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="pt-6">
                <button 
                  onClick={() => onNavigate('careers')}
                  className="inline-flex items-center gap-3 px-5 py-3.5 border-2 border-dashed border-brandYellow/40 rounded-xl text-[10px] font-extrabold text-brandYellow uppercase tracking-[0.25em] hover:bg-brandYellow/5 hover:border-brandYellow transition-all group/join whitespace-nowrap"
                >
                  <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
                  JOIN THE TEAM
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: HQ Terminal Card (Span 4) */}
          <div className="lg:col-span-4 relative">
            <div className="bg-[#002a2f] border border-white/10 rounded-3xl p-7 lg:p-8 space-y-8 shadow-2xl h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">HQ Terminal</span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Desk
                </span>
              </div>

              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-inner">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-white/90 leading-relaxed tracking-tight">
                      Office no. 03, Cloth Market, Sanjay Place, Civil Lines, Agra, UP 282002
                    </p>
                    <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.2em]">Agra Regional Office</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 shadow-inner">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <p className="text-base font-bold text-white tracking-tight break-all border-b border-white/10 pb-0.5">contact@techinfigo.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 text-[11px] font-bold uppercase tracking-[0.3em] text-white/20">
            <span>&copy; 2026 Techinfigo</span>
            <span className="hidden sm:block">/</span>
            <span className="text-white/40">Profit-Driven Agency</span>
            <span className="hidden sm:block">/</span>
            <span className="flex items-center gap-2">
              <span className="text-brandYellow">🧡</span> Made in India
            </span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">
            <a href="#" className="hover:text-brandYellow transition-colors">Privacy</a>
            <a href="#" className="hover:text-brandYellow transition-colors">Terms</a>
            <a href="#" className="hover:text-brandYellow transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
