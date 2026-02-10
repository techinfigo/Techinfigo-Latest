
import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-6 mb-20">
          
          {/* Column 1: Identity (Span 3) */}
          <div className="lg:col-span-3 space-y-10">
            <div className="w-14 h-14 bg-brandYellow flex items-center justify-center rounded-xl shadow-lg">
              <span className="text-brandDark font-extrabold text-2xl">TF</span>
            </div>
            <p className="text-white/60 text-base leading-relaxed font-medium">
              We build <span className="text-white font-bold">compounding growth systems</span> for D2C brands doing ₹20L–₹2Cr/mo who value profit over vanity.
            </p>
            <div className="inline-block px-4 py-2 border border-brandYellow/20 rounded-full">
              <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest">• Partner-Led Execution</span>
            </div>
            
            {/* Social Icons Section - Refined Size */}
            <div className="space-y-5 pt-4">
              <p className="text-[10px] font-bold text-[#4a6d71] uppercase tracking-[0.35em]">Digital Ecosystem</p>
              <div className="flex gap-3">
                {[
                  { 
                    icon: 'linkedin', 
                    path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /> 
                  },
                  { 
                    icon: 'instagram', 
                    path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z M12 7a5 5 0 100 10 5 5 0 000-10z M17.5 6.5a.5.5 0 11-1 0 .5.5 0 011 0z" />
                  },
                  { 
                    icon: 'facebook', 
                    path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  },
                  { 
                    icon: 'youtube', 
                    path: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48L15.45 11.75z" />
                  }
                ].map((social) => (
                  <a 
                    key={social.icon} 
                    href="#" 
                    className="w-11 h-11 rounded-xl bg-[#002a2f] border border-white/5 flex items-center justify-center hover:bg-brandYellow hover:border-brandYellow group transition-all duration-300 shadow-lg"
                  >
                    <svg className="w-5 h-5 text-white/30 group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {social.path}
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Capabilities (Span 2) */}
          <div className="lg:col-span-2 space-y-8 lg:pl-6">
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">Capabilities</p>
            <ul className="space-y-4">
              {['Performance Ads', 'CRO & Funnels', 'eCommerce SEO', 'Retention Flows'].map((item) => (
                <li key={item}>
                  <button onClick={() => onNavigate('services')} className="text-base text-white/60 hover:text-brandYellow transition-colors font-medium">
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onNavigate('services')} className="text-base text-brandYellow font-bold flex items-center gap-2 group text-left">
                  All Levers 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Foundation (Span 2) */}
          <div className="lg:col-span-2 space-y-8 lg:pl-6">
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
                    className="text-base text-white/60 hover:text-brandYellow transition-colors font-medium text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button className="px-4 py-3 border-2 border-dashed border-white/10 rounded-lg text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 hover:border-brandYellow hover:text-brandYellow transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
                  Join the Team
                </button>
              </li>
            </ul>
          </div>

          {/* Gap for balance (Span 1) */}
          <div className="hidden lg:block lg:col-span-1"></div>

          {/* Column 4: HQ Terminal Card (Span 4) */}
          <div className="lg:col-span-4 relative">
            <div className="bg-[#002a2f] border border-white/10 rounded-2xl p-7 lg:p-8 space-y-6 shadow-2xl h-full">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30">HQ Terminal</span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Desk
                </span>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-white/90 leading-relaxed">
                      Office no. 03, Second Floor, Block no.25, Sanjay Place, Civil Lines, Agra, UP 282002
                    </p>
                    <span className="text-[9px] font-bold text-brandYellow uppercase tracking-widest block">Agra Regional Office</span>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <p className="text-base font-bold text-white tracking-tight break-all">contact@techinfigo.com</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase text-white/30 tracking-widest">Partnership Status</span>
                   <span className="bg-brandYellow text-brandDark text-[9px] font-bold px-2 py-0.5 rounded tracking-widest">1 SPOT LEFT</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all group/badge">
                    <svg className="w-6 h-6 text-white/30 group-hover/badge:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/></svg>
                    <span className="text-[8px] font-bold uppercase text-center text-white/30 tracking-widest leading-tight group-hover/badge:text-white transition-colors">Meta Partner</span>
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center gap-2 hover:bg-white/10 transition-all group/badge">
                    <svg className="w-6 h-6 text-white/30 group-hover/badge:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M14.803 5.317l-1.42 2.378-.016.027c-.012.02-.02.044-.02.072 0 .076.06.136.134.136.03 0 .053-.01.076-.027l1.173-.787 1.343-2.137c.102-.162.274-.263.461-.263h2.396c.205 0 .385.114.475.293l2.123 4.246c.033.065.05.138.05.21V20c0 .552-.448 1-1 1H5c-.552 0-1-.448-1-1V9.47c0-.072.016-.145.05-.21l2.123-4.246c.09-.179.27-.293.475-.293H9.044c.187 0 .359.101.46.263l1.345 2.137 1.173.787c.023.017.046.027.076.027.075 0 .134-.06.134-.136 0-.028-.008-.052-.02-.072l-.017-.027-1.42-2.378c-.09-.179-.27-.293-.475-.293H3.045c-.553 0-1 .448-1 1v12c0 .552.448 1 1 1h18c.552 0 1-.448 1-1v-8.47c0-.205-.114-.385-.293-.475l-2.123-4.246c-.09-.179-.27-.293-.475-.293H15.278c-.205 0-.385.114-.475.293z"/></svg>
                    <span className="text-[8px] font-bold uppercase text-center text-white/30 tracking-widest leading-tight group-hover/badge:text-white transition-colors">Shopify Plus</span>
                  </div>
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
