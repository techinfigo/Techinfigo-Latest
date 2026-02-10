
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

          {/* HQ Terminal Card - Updated to match screenshot exactly */}
          <div className="lg:col-span-5">
            <div className="bg-[#002a2f] border border-white/5 rounded-[3rem] p-8 lg:p-10 space-y-10 shadow-3xl h-full transition-colors hover:border-white/10">
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 font-mono">HQ TERMINAL</span>
                <span className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE DESK
                </span>
              </div>

              {/* Main Info */}
              <div className="space-y-8">
                {/* Location */}
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[15px] font-medium text-white/80 leading-snug tracking-tight">
                      Office no. 03, Second Floor, Block no.25,<br />
                      Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002
                    </p>
                    <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest block">AGRA REGIONAL OFFICE</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-6 items-center">
                  <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a 
                    href="mailto:contact@techinfigo.com" 
                    className="text-lg font-medium text-white/80 tracking-tight hover:text-brandYellow transition-colors"
                  >
                    contact@techinfigo.com
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-white/10"></div>

              {/* Partnership Status Section */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">PARTNERSHIP STATUS</span>
                  <div className="px-3 py-1 bg-brandYellow rounded-md shadow-[0_0_15px_rgba(252,182,50,0.4)]">
                    <span className="text-[9px] font-black text-brandDark uppercase tracking-widest whitespace-nowrap">1 SPOT LEFT</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/[0.08] transition-colors group">
                    <svg className="w-6 h-6 text-white/40 group-hover:text-brandYellow transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    <span className="text-[9px] font-bold text-white/40 text-center uppercase tracking-widest leading-tight">META BUSINESS<br />PARTNER</span>
                  </div>
                  <div className="border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-white/[0.08] transition-colors group">
                    <svg className="w-6 h-6 text-white/40 group-hover:text-brandYellow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-[9px] font-bold text-white/40 text-center uppercase tracking-widest leading-tight">SHOPIFY PLUS<br />CERTIFIED</span>
                  </div>
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
