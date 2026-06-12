'use client';

import React from 'react';
import { Quote, Star, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

interface TestimonialsSectionProps {
  onBookAudit?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-20 lg:py-32 px-6 bg-brandDark font-sans relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.05] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandYellow rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brandYellow rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">The Clarity Protocol</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase">
              What Founders Say About Our <br />
              <span className="text-brandYellow italic">Performance Strategy.</span>
            </h2>
            <p className="text-white/50 text-lg font-medium max-w-xl">
              We don’t use fake testimonials. We share the brutal realizations D2C founders have after we audit their Performance Marketing numbers.
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-4">
            <button 
              onClick={onBookAudit}
              className="group relative px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(252,182,50,0.15)] flex items-center gap-3"
            >
              Get The Clarity Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">No Fluff. Just Profit.</p>
          </div>
        </div>

        {/* BENTO GRID OF INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* CARD 1: REVENUE VS PROFIT (Large) */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-8 lg:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-brandYellow/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-12">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-brandYellow/10 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-brandYellow" />
                </div>
                <span className="text-[10px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">Insight 01</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  Revenue is a <span className="text-brandYellow">Vanity Metric.</span>
                </h3>
                <p className="text-white/80 text-lg font-medium leading-relaxed max-w-2xl">
                  Most founders think they’re growing because revenue is increasing — until they actually look at net profit. We've seen ₹10Cr brands making less profit than ₹2Cr brands because of hidden leaks.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: ROAS (Small) */}
          <div className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500">
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-brandYellow/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-brandYellow" />
                </div>
                <span className="text-[10px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">Insight 02</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">The ROAS Trap</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  A 4x ROAS on a low-margin product is a loss. A 2.5x ROAS on a high-margin product is a goldmine. Stop chasing platform numbers.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: SCALING RISK (Small) */}
          <div className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500">
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-brandYellow/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-brandYellow" />
                </div>
                <span className="text-[10px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">Insight 03</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Scaling = Bleeding?</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  Increasing ad spend without stable unit economics doesn't scale growth—it scales losses. We fix the foundation before we push the pedal.
                </p>
              </div>
            </div>
          </div>

          {/* CARD 4: BACKEND (Large) */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-8 lg:p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brandYellow/5 blur-3xl rounded-full -ml-32 -mb-32 group-hover:bg-brandYellow/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/3 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-brandYellow/10 flex items-center justify-center">
                  <Quote className="w-7 h-7 text-brandYellow" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">The Retention <br /> Advantage</h3>
              </div>
              <div className="w-full lg:w-2/3">
                <p className="text-white/80 text-lg font-medium leading-relaxed">
                  "The profit isn't in the first purchase. It's in the 3rd, 4th, and 5th. If your backend retention isn't hitting 30%+, you're just renting customers from Meta, not owning a brand."
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-brandYellow/30"></div>
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">Common Realization</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER STRIP */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">Systems Built on Industry Data & Economics</p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Founding Partner Slots</span>
              <span className="text-brandYellow text-[10px] font-black uppercase tracking-widest">Currently Open (Q3)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

