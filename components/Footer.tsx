import React from 'react';
import { Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, serviceId?: string) => void;
  onBookAudit: () => void;
}

const CAPABILITIES = ['Performance Ads', 'CRO & Funnels', 'eCommerce SEO', 'Retention Flows'];

const LEGAL_LINKS = [
  { name: 'Privacy', id: 'privacy' },
  { name: 'Terms', id: 'terms' },
  { name: 'Sitemap', id: 'sitemap' }
];

export const Footer = ({ onNavigate, onBookAudit }: FooterProps) => {
  return (
    <footer className="bg-brandDark text-white pt-10 lg:pt-12 pb-8 px-6 lg:px-12 overflow-hidden border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 lg:mb-16">
          
          {/* Brand Intro */}
          <div className="lg:col-span-3 space-y-6">
            <div className="w-10 h-10 bg-brandYellow flex items-center justify-center rounded-lg shadow-lg">
              <span className="text-brandDark font-black text-xl">TF</span>
            </div>
            <p className="text-white/80 text-sm lg:text-base leading-relaxed font-normal tracking-tight max-w-sm">
              We build <span className="text-white font-medium">compounding growth systems</span> for D2C brands doing ₹20L–₹2Cr/mo who value profit over vanity.
            </p>
            <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full">
              <span className="w-1 h-1 rounded-full bg-brandYellow"></span>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Partner-Led Execution</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow/50 transition-all duration-300 group">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow/50 transition-all duration-300 group">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow/50 transition-all duration-300 group">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brandYellow hover:border-brandYellow/50 transition-all duration-300 group">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Foundation */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">Foundation</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <button onClick={() => onNavigate('about')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">About Us</button>
              </li>
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Our Approach</button>
              </li>
              <li>
                <button onClick={() => onNavigate('qualification')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Who We Fit</button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Growth Engine</button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">Company</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <button onClick={() => onNavigate('home')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Home</button>
              </li>
              <li>
                <button onClick={() => onNavigate('profit-breakdown')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Profit Breakdown</button>
              </li>
              <li>
                <button onClick={() => onNavigate('system')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">The System</button>
              </li>
              <li>
                <button onClick={() => onNavigate('agra-landing')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Agra Agency</button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Careers</button>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[9px] font-bold text-white/20 uppercase tracking-[0.5em]">Capabilities</h4>
            <ul className="space-y-3 lg:space-y-4">
              <li>
                <button onClick={() => onNavigate('service-detail', 'performance-ads')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Performance Ads</button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-detail', 'cro')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">CRO & Funnels</button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-detail', 'seo')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">eCommerce SEO</button>
              </li>
              <li>
                <button onClick={() => onNavigate('service-detail', 'retention')} className="text-[13px] font-normal text-white/60 hover:text-brandYellow transition-colors tracking-tight text-left border-l border-brandYellow/30 pl-4">Retention Flows</button>
              </li>
            </ul>
          </div>

          {/* HQ Terminal Card */}
          <div className="lg:col-span-3">
            <div className="bg-[#002a2f] border border-white/5 rounded-[2rem] p-6 lg:p-7 space-y-5 shadow-3xl h-full transition-colors hover:border-white/10">
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 font-mono">HQ TERMINAL</span>
                <span className="flex items-center gap-2 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse"></span>
                  LIVE DESK
                </span>
              </div>

              {/* Main Info */}
              <div className="space-y-5">
                {/* Location */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[12px] font-normal text-white/90 leading-snug tracking-tight">
                      Office no. 03, Second Floor, Block no.25,<br />
                      Sanjay Place, Civil Lines, Agra, UP 282002
                    </p>
                    <span className="text-[7px] font-bold text-brandYellow uppercase tracking-widest block">AGRA REGIONAL OFFICE</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <a 
                    href="mailto:contact@techinfigo.com" 
                    className="text-[14px] font-normal text-white/90 tracking-tight hover:text-brandYellow transition-colors"
                  >
                    contact@techinfigo.com
                  </a>
                </div>
              </div>

              {/* Divider */}
              <div className="h-[1px] w-full bg-white/10"></div>

              {/* Partnership Status Section */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[8px] font-bold text-white/20 uppercase tracking-[0.4em]">PARTNERSHIP STATUS</span>
                  <div className="px-1.5 py-0.5 bg-brandYellow rounded shadow-[0_0_10px_rgba(252,182,50,0.3)]">
                    <span className="text-[7px] font-black text-brandDark uppercase tracking-widest whitespace-nowrap">1 SPOT LEFT</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 bg-white/5 hover:bg-white/[0.08] transition-colors group">
                    <svg className="w-4 h-4 text-white/40 group-hover:text-brandYellow transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    <span className="text-[7px] font-bold text-white/30 text-center uppercase tracking-widest leading-tight">META BUSINESS<br />PARTNER</span>
                  </div>
                  <div className="border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1.5 bg-white/5 hover:bg-white/[0.08] transition-colors group">
                    <svg className="w-4 h-4 text-white/40 group-hover:text-brandYellow transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-[7px] font-bold text-white/30 text-center uppercase tracking-widest leading-tight">SHOPIFY PLUS<br />CERTIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 font-mono">
            <span>&copy; 2026 Techinfigo</span>
            <span className="hidden md:block">/</span>
            <span className="text-white/40 font-normal">Profit-Driven Agency</span>
            <span className="hidden md:block">/</span>
            <span className="flex items-center gap-2">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-2.5 h-2.5 text-brandYellow"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              Made in India
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-6 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
            {LEGAL_LINKS.map((link) => (
              <button 
                key={link.id} 
                onClick={() => onNavigate(link.id)}
                className="hover:text-brandYellow transition-colors uppercase tracking-[0.4em] font-normal"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};