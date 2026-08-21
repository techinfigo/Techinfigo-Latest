'use client';

import React from 'react';
import { Quote, Star, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import { CAPACITY } from '../config/site';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';

interface TestimonialsSectionProps {
  /** Editable copy. Defaults to what shipped. */
  intro?: string;
  insights?: SiteContent['home']['insights'];
  onBookAudit?: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookAudit,
  intro = DEFAULT_CONTENT.home.insightsIntro,
  insights = DEFAULT_CONTENT.home.insights,
}) => {
  return (
    <section className="w-full py-12 lg:py-16 px-6 bg-brandDark font-sans relative overflow-hidden">
      {/* Subtle Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase tracking-tighter select-none pointer-events-none whitespace-nowrap">
        Insights
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brandYellow/20 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brandYellow/10 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
              <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em]">The Clarity Protocol</span>
            </div>
            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
              What Founders Say About Our <br />
              <span className="text-brandYellow italic">Performance Strategy.</span>
            </h2>
            <p className="text-white/70 text-base lg:text-lg font-medium max-w-xl">
              {intro}
            </p>
          </div>
          
          <div className="flex flex-col items-start lg:items-end gap-4 pb-2">
            <button 
              onClick={onBookAudit}
              className="group relative px-8 py-4 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-2xl flex items-center gap-3"
            >
              Get The Clarity Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <p className="text-white/30 text-[8px] font-black uppercase tracking-[0.4em]">No Fluff. Just Profit.</p>
          </div>
        </div>

        {/* BENTO GRID OF INSIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          
          {/* CARD 1: REVENUE VS PROFIT (Large) */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-8 lg:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-3xl rounded-full -mr-32 -mt-32 group-hover:bg-brandYellow/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-10">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-xl bg-brandYellow/10 flex items-center justify-center border border-white/5">
                  <TrendingUp className="w-6 h-6 text-brandYellow" />
                </div>
                <span className="text-[9px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">{insights[1]?.label}</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl lg:text-4xl font-black text-white uppercase tracking-tight leading-none">
                  Revenue is a <span className="text-brandYellow italic">Vanity Metric.</span>
                </h3>
                <p className="text-white/90 text-lg font-medium leading-relaxed max-w-2xl">
                  {insights[0]?.text}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 2: ROAS (Small) */}
          <div className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 shadow-xl">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-brandYellow/10 flex items-center justify-center border border-white/5">
                  <Star className="w-5 h-5 text-brandYellow" />
                </div>
                <span className="text-[9px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">{insights[2]?.label}</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">The ROAS Trap</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  {insights[1]?.text}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 3: SCALING RISK (Small) */}
          <div className="group relative p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 shadow-xl">
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-brandYellow/10 flex items-center justify-center border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-brandYellow" />
                </div>
                <span className="text-[9px] font-black text-brandYellow/40 uppercase tracking-[0.4em]">Insight 03</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Scaling = Bleeding?</h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  {insights[2]?.text}
                </p>
              </div>
            </div>
          </div>

          {/* CARD 4: BACKEND (Large) */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-8 lg:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-brandYellow/30 transition-all duration-500 shadow-xl">
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brandYellow/5 blur-3xl rounded-full -ml-32 -mb-32 group-hover:bg-brandYellow/10 transition-colors"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/3 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-brandYellow/10 flex items-center justify-center border border-white/5">
                  <Quote className="w-6 h-6 text-brandYellow" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight">{insights[3]?.label}</h3>
              </div>
              <div className="w-full lg:w-2/3">
                <p className="text-white/90 text-lg font-medium leading-relaxed">
                  {insights[3]?.text}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-6 h-[1px] bg-brandYellow/30"></div>
                  <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.2em]">{insights[0]?.label}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER STRIP */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">Systems Built on Industrial Economics</p>
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center md:items-end">
              <span className="text-white/40 text-[8px] font-bold uppercase tracking-widest">Founding Partner Slots</span>
              <span className="text-brandYellow text-[9px] font-black uppercase tracking-widest">Currently Open ({CAPACITY.currentBatch})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

