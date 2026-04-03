'use client';

import React from 'react';
import { Check, ArrowRight, TrendingUp, Quote } from 'lucide-react';

interface CaseStudySectionProps {
  onBookAudit?: () => void;
  onNavigate?: (page: string) => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onBookAudit, onNavigate }) => {
  return (
    <section id="case-studies" className="w-full py-24 lg:py-40 px-6 bg-brandBg font-sans relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #001d21 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. SECTION HEADER (EDITORIAL) */}
        <div className="max-w-4xl mb-20 lg:mb-32">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-brandYellow"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Profit Audit</span>
            </div>
            <h2 className="text-5xl lg:text-8xl font-black text-brandDark tracking-tighter leading-[0.85] uppercase">
              The Typical <br />
              <span className="text-brandYellow italic">Profit Leak.</span>
            </h2>
            <p className="text-brandDark/60 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              We don't show fake case studies. We show real patterns we consistently see across D2C brands scaling from ₹20L to ₹2Cr/month.
            </p>
          </div>
        </div>

        {/* 2. CLEAN TRANSFORMATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mb-32">
          
          {/* LEFT: THE INEFFICIENCY (CLEAN LIST) */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black text-brandDark/30 uppercase tracking-[0.4em]">The Status Quo</span>
              <h3 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight leading-none uppercase">
                Scaling Revenue, <br />
                <span className="text-brandDark/40">Bleeding Profit.</span>
              </h3>
            </div>
            
            <div className="space-y-0">
              {[
                { label: "Ad Spend", value: "₹10–12L/month", desc: "High volume, low efficiency" },
                { label: "ROAS", value: "4.5x", desc: "Looks good on dashboard" },
                { label: "Net Profit", value: "₹1.2L", desc: "The brutal reality" },
                { label: "CAC", value: "Unstable", desc: "Scaling kills margins" }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-6 border-b border-brandDark/10 group hover:bg-brandDark/5 transition-colors px-4 -mx-4 rounded-xl">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-brandDark/40 uppercase tracking-widest">{item.label}</p>
                    <p className="text-brandDark/60 text-sm font-medium">{item.desc}</p>
                  </div>
                  <span className="text-2xl font-black text-brandDark/80 tracking-tighter">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE OPTIMIZATION (ELEVATED) */}
          <div className="relative">
            {/* Visual Connector (Desktop) */}
            <div className="hidden lg:flex absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-brandYellow rounded-full items-center justify-center shadow-2xl">
              <ArrowRight className="w-6 h-6 text-brandDark" />
            </div>

            <div className="bg-brandDark p-10 lg:p-16 rounded-[3rem] shadow-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brandYellow/10 blur-[120px] rounded-full -mr-40 -mt-40"></div>
              
              <div className="relative z-10 space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">The Techinfigo Way</span>
                  <h3 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-none uppercase">
                    Predictable <br />
                    <span className="text-brandYellow italic">Profitability.</span>
                  </h3>
                </div>

                <div className="space-y-8">
                  {[
                    "Same ad spend, 4x more profit",
                    "Fixed unit economics & margins",
                    "Optimized AOV & retention",
                    "Stable, data-backed scaling"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group/item">
                      <div className="w-8 h-8 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0 border border-brandYellow/20 group-hover/item:bg-brandYellow/30 transition-all">
                        <Check className="w-4 h-4 text-brandYellow" />
                      </div>
                      <span className="text-white/90 text-xl font-bold tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-12 border-t border-white/10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-6xl lg:text-8xl font-black text-brandYellow tracking-tighter">3.2x</span>
                    <div className="flex flex-col">
                      <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Average</span>
                      <span className="text-white/80 text-sm font-black uppercase tracking-widest">Profit Increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CTA BLOCK (CLEAN) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 p-10 lg:p-16 bg-white border border-brandDark/5 rounded-[3rem] shadow-xl">
          <div className="space-y-4 text-center lg:text-left">
            <h4 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter uppercase leading-none">
              Stop Scaling <br />
              <span className="text-brandDark/30">Inefficiency.</span>
            </h4>
            <p className="text-brandDark/40 text-sm font-bold uppercase tracking-[0.3em]">Start scaling profit instead.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <button 
              onClick={onBookAudit}
              className="group relative px-12 py-6 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-brandDark hover:text-white transition-all duration-500 shadow-2xl"
            >
              See My Profit Potential
            </button>
            
            {onNavigate && (
              <button 
                onClick={() => onNavigate('profit-breakdown')}
                className="text-brandDark/40 hover:text-brandDark text-xs font-black uppercase tracking-[0.4em] transition-colors flex items-center gap-2"
              >
                Full Breakdown <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
