'use client';


import React from 'react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';

/**
 * Icons stay in code, keyed by the pillar slug.
 *
 * A Firestore document cannot hold JSX, and an editor has no business pasting
 * SVG path data. The content model carries words; this map carries glyphs, and
 * a slug with no entry simply renders no icon rather than breaking the card.
 */
const PILLAR_ICONS: Record<string, React.ReactNode> = {
  "performance-ads": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
  ),
  "cro": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
  ),
  "seo": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
  ),
  "retention": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
  ),
  "automation": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        </svg>
  ),
  "creative": (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
  ),
};

interface ServicesPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
  /** Editable copy. Defaults to what shipped, so the section never renders empty. */
  pillars?: SiteContent['services']['pillars'];
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  pillars = DEFAULT_CONTENT.services.pillars,
}) => {
  const servicePillars = pillars;

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              OPERATIONAL LEVERS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Growth <br />
              Instruments.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Precision tools engineered for D2C dominance. Select a node to <br className="hidden lg:block" /> view full technical specifications and protocol.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
            {servicePillars.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => onNavigate('service-detail', service.slug)}
                className="group relative text-left pt-6 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Folder Tab Motif */}
                <div className="absolute top-0 left-0 w-32 h-8 bg-white border-x-2 border-t-2 border-dotted border-brandYellow/40 rounded-t-3xl z-0 group-hover:bg-brandDark group-hover:border-brandDark transition-all duration-500"></div>
                
                <div className="relative z-10 bg-white rounded-tr-[3rem] rounded-b-[3rem] p-8 lg:p-10 shadow-3xl border-2 border-dotted border-brandYellow/40 transition-all duration-500 group-hover:border-brandYellow group-hover:-translate-y-2 group-hover:shadow-4xl flex items-center gap-8">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brandYellow rounded-[1.25rem] flex items-center justify-center text-brandDark shadow-glow shrink-0 transition-transform group-hover:scale-105 duration-500">
                    {PILLAR_ICONS[service.slug]}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl lg:text-2xl font-extrabold text-brandYellow transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-[#9eaeb0] text-sm lg:text-base font-medium leading-tight">
                      {service.desc}
                    </p>
                  </div>

                  <div className="absolute top-[-1.5rem] left-8 z-20">
                    <span className="text-[9px] font-mono font-bold text-brandDark/20 uppercase tracking-widest group-hover:text-brandYellow/50 transition-colors">MOD_{service.slug.toUpperCase().slice(0, 3)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-40 text-center py-20 border-t border-dotted border-brandYellow/20 animate-slide-up">
            <h2 className="text-4xl font-black text-brandDark tracking-tighter mb-12">System synchronization required.</h2>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brandDark text-white px-12 py-6 rounded-xl font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl group flex items-center gap-4 mx-auto"
            >
              Initiate Growth Audit
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};