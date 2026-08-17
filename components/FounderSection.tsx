'use client';

import React from 'react';
import Image from 'next/image';
import { Quote, Linkedin } from 'lucide-react';
import { site } from '../config/site';

export const FounderSection: React.FC = () => {
  return (
    <section className="w-full py-16 lg:py-24 px-6 bg-white font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001d21 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Founder Visual Column (Video/Photo) */}
          <div className="lg:col-span-5 relative">
            <div className="aspect-[4/5] bg-brandDark rounded-[3rem] overflow-hidden border border-white/10 relative group shadow-2xl">
              {/* Asset Placeholder (Video or High-Res Photo) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-brandDark p-12 text-center space-y-6">
                <div className="w-24 h-24 rounded-full border-2 border-brandYellow/30 flex items-center justify-center bg-brandYellow/5">
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-brandYellow border-b-[12px] border-b-transparent ml-2"></div>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">30s Founder Briefing</p>
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Click to Play</p>
                </div>
              </div>
              
              {/* Overlay Identity Label */}
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    {site.founder.name && (
                      <h3 className="text-2xl font-black text-white tracking-tighter uppercase whitespace-nowrap">{site.founder.name}</h3>
                    )}
                    <p className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">{site.founder.role}</p>
                  </div>
                  {site.founder.linkedin && (
                    <a href={site.founder.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${site.founder.name || 'Founder'} on LinkedIn`} className="w-12 h-12 rounded-full bg-brandYellow text-brandDark flex items-center justify-center hover:bg-white transition-all shadow-lg">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Accent Glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-brandYellow/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>

          {/* Founder Mission Column */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-[2px] bg-brandYellow"></div>
                <span className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.4em]">The Founder's Protocol</span>
              </div>
              <h2 className="text-5xl lg:text-8xl font-black text-brandDark tracking-tighter leading-[0.85] uppercase">
                Why I Built <br />
                <span className="text-brandYellow italic">Techinfigo.</span>
              </h2>
            </div>

            <div className="space-y-8 relative">
              <Quote className="absolute -top-12 -left-12 w-24 h-24 text-brandDark/[0.04] -z-10" />
              
              <div className="space-y-6 text-lg lg:text-xl font-medium text-brandDark/80 leading-relaxed max-w-2xl">
                <p>
                  "I watched too many D2C founders celebrate record revenue months while their bank accounts stayed flat. They were renting customers from Meta, not building assets."
                </p>
                <p>
                  "Techinfigo was built to be the anti-agency. We don't focus on ROAS; we focus on <span className="text-brandDark font-black border-b-2 border-brandYellow">Contribution Margin</span>. We are here to build your wealth, not just your top-line."
                </p>
              </div>

              <div className="pt-10 border-t-2 border-brandDark/5 flex flex-wrap gap-12 lg:gap-20">
                <div className="space-y-2">
                  <p className="text-3xl font-black text-brandDark tracking-tighter">100%</p>
                  <p className="text-[10px] font-black text-brandDark/40 uppercase tracking-widest">Skin in the Game</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-black text-brandDark tracking-tighter">Proprietary</p>
                  <p className="text-[10px] font-black text-brandDark/40 uppercase tracking-widest">Profit Infrastructure</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

