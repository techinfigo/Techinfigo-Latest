
import React, { memo } from 'react';

interface FooterProps {
  onNavigate: (page: string) => void;
  onBookAudit: () => void;
}

// Static data extracted to prevent re-allocation on every render
const CAPABILITIES = ['Performance Ads', 'CRO & Funnels', 'eCommerce SEO', 'Retention Flows'];

const FOUNDATION_LINKS = [
  { name: 'Home', id: 'home' },
  { name: 'Our Story', id: 'about' },
  { name: 'Contact', id: 'contact' },
  { name: 'Growth Audit', id: 'contact' }
];

const LEGAL_LINKS = ['Privacy', 'Terms', 'Sitemap'];

export const Footer: React.FC<FooterProps> = memo(({ onNavigate, onBookAudit }) => {
  return (
    <footer className="bg-brandDark text-white pt-24 pb-12 px-6 lg:px-12 overflow-hidden border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-24">
          <div className="max-w-xl">
            <h2 className="text-5xl lg:text-7xl font-semibold tracking-tighter leading-[0.9] mb-6">
              Engineer Your <span className="text-brandYellow italic">Scale.</span>
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-normal">
              We only partner with 2 new brands per quarter to ensure 100% focus on unit economics.
            </p>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-3">
            <button 
              onClick={onBookAudit}
              className="bg-brandYellow text-brandDark font-semibold px-10 py-6 rounded-lg text-sm uppercase tracking-[0.2em] flex items-center gap-4 hover:bg-white transition-all shadow-2xl group"
            >
              Book Free Growth Audit
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
            <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.4em]">Response in {"<"} 24 Hours</span>
          </div>
        </div>

        <div className="h-[1px] w-full bg-white/5 mb-24"></div>

        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Intro */}
          <div className="lg:col-span-3 space-y-8">
            <div className="w-12 h-12 bg-brandYellow flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-brandDark font-bold text-2xl">TF</span>
            </div>
            <p className="text-white/80 text-base leading-relaxed font-normal tracking-tight">
              We build <span className="text-white font-medium">compounding growth systems</span> for D2C brands doing ₹20L–₹2Cr/mo who value profit over vanity.
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brandYellow"></span>
              <span className="text-[9px] font-medium text-white/40 uppercase tracking-widest">Partner-Led Execution</span>
            </div>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.5em]">Capabilities</h4>
            <ul className="space-y-5">
              {CAPABILITIES.map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => onNavigate('services')} 
                    className="text-sm font-medium text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="text-sm font-medium text-brandYellow hover:underline underline-offset-4 tracking-tight flex items-center gap-2"
                >
                  All Levers <span className="text-lg">→</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Foundation */}
          <div className="lg:col-span-2 space-y-8">
            <h4 className="text-[10px] font-semibold text-white/20 uppercase tracking-[0.5em]">Foundation</h4>
            <ul className="space-y-5">
              <li>
                <button onClick={() => onNavigate('home')} className="text-sm font-medium text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-sm font-medium text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left">Our Story</button>
              </li>
              
              <li className="py-2">
                <button 
                  onClick={() => onNavigate('careers')}
                  className="w-full border-2 border-dashed border-brandYellow/40 rounded-xl px-4 py-4 text-[10px] font-medium text-brandYellow uppercase tracking-[0.3em] hover:bg-brandYellow/5 transition-all flex items-center justify-center group"
                >
                  <span className="whitespace-nowrap">Join the Team</span>
                </button>
              </li>

              <li>
                <button onClick={() => onNavigate('contact')} className="text-sm font-medium text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left">Contact</button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-sm font-medium text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left">Growth Audit</button>
              </li>
            </ul>
          </div>

          {/* HQ Terminal Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#002a2f] border border-white/5 rounded-[2rem] p-8 lg:p-10 space-y-10 shadow-3xl h-full transition-colors hover:border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-medium uppercase tracking-[0.4em] text-white/20 font-mono">HQ TERMINAL</span>
                <span className="flex items-center gap-2 text-[9px] font-medium text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE DESK
                </span>
              </div>

              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-normal text-white leading-tight tracking-tight">
                      Office no. 03, Cloth Market, Sanjay Place, Civil Lines, Agra, UP 282002
                    </p>
                    <span className="text-[9px] font-medium text-brandYellow uppercase tracking-widest">Agra Regional Office</span>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a 
                    href="mailto:contact@techinfigo.com" 
                    className="text-xl font-medium text-white tracking-tight self-center hover:text-brandYellow transition-colors"
                  >
                    contact@techinfigo.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-8 text-[10px] font-medium uppercase tracking-[0.3em] text-white/20 font-mono">
            <span>&copy; 2026 Techinfigo</span>
            <span className="hidden md:block">/</span>
            <span className="text-white/40 font-medium">Profit-Driven Agency</span>
            <span className="hidden md:block">/</span>
            <span className="flex items-center gap-2">
              <span className="text-orange-500">❤️</span> Made in India
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-8 text-[10px] font-medium uppercase tracking-[0.4em] text-white/40">
            {LEGAL_LINKS.map((link) => (
              <button key={link} className="hover:text-brandYellow transition-colors uppercase tracking-[0.4em] font-medium">
                {link}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}));
