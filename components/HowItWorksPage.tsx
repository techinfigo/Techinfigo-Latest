'use client';

import React from 'react';
import { DEFAULT_CONTENT } from '../config/content';
import type { SiteContent } from '../lib/content-schema';

interface HowItWorksPageProps {
  /** Editable copy. Defaults to what shipped, so the section never renders empty. */
  steps?: SiteContent['howItWorks']['steps'];
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({
  onNavigate,
  steps = DEFAULT_CONTENT.howItWorks.steps,
}) => {
  const lifecycleSteps = steps;
  
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. Impact Header Section */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              OPERATIONAL BLUEPRINT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Trust the Process, <br />
              <span className="text-brandYellow italic">Not the Screenshot.</span>
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Most agencies lead with cherry-picked case studies from the 2021 golden era. We lead with the <span className="text-white">repeatable systems</span> we use to drive growth today.
            </p>
          </div>
        </div>
      </section>

      {/* 2. The Screenshot Paradox (The Redesign) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-center">
            
            {/* Left side: The Critique */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-4">
                <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">THE PARADOX</span>
                <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none">
                  Vanity vs. <br />
                  <span className="text-brandDark/20">Velocity.</span>
                </h2>
              </div>
              
              <div className="space-y-10">
                <p className="text-xl lg:text-2xl text-brandDark/60 font-medium leading-relaxed">
                  A 10x ROAS screenshot is a <span className="text-brandDark font-bold italic underline decoration-brandYellow decoration-4 underline-offset-4">fluke</span> if it can't be replicated. We trade "miracle months" for predictable quarter-over-quarter yield.
                </p>
                
                <div className="space-y-8 pt-6">
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full border border-brandDark/10 flex items-center justify-center shrink-0">
                      <span className="text-brandDark/20 font-black text-xs">✕</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-brandDark">Tactical Fragility</h4>
                      <p className="text-brandDark/40 text-sm">Relying on platform "hacks" that break when algorithms update.</p>
                    </div>
                  </div>
                  <div className="flex gap-6 items-start">
                    <div className="w-10 h-10 rounded-full border border-brandDark/10 flex items-center justify-center shrink-0">
                      <span className="text-brandDark/20 font-black text-xs">✕</span>
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-brandDark">Siloed Execution</h4>
                      <p className="text-brandDark/40 text-sm">Media buyers who don't understand P&L or retention LTV.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: The Solution (Visual Architecture) */}
            <div className="lg:col-span-7">
              <div className="bg-brandDark rounded-[4rem] p-10 lg:p-20 shadow-4xl relative overflow-hidden group">
                {/* Abstract Line Art */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                   <svg width="100%" height="100%" viewBox="0 0 400 400">
                     <path d="M0 400 L400 0" stroke="white" strokeWidth="0.5" fill="none" />
                     <path d="M0 300 L300 0" stroke="white" strokeWidth="0.5" fill="none" />
                     <path d="M0 200 L200 0" stroke="white" strokeWidth="0.5" fill="none" />
                   </svg>
                </div>

                <div className="relative z-10 space-y-16">
                  <div className="space-y-4">
                    <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.5em] block">THE CORE ENGINE</span>
                    <h3 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">Architecture of Certainty.</h3>
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                     {[
                       { title: "Variable Isolation", desc: "Isolating one growth lever (hook, price, landing page) at a time to prove what actually moves the needle." },
                       { title: "MER Guardrails", desc: "Strict spend protocols triggered by blended efficiency ratios, protecting your contribution margin." },
                       { title: "Creative Velocity", desc: "A structured lab producing high-intent assets to outpace algorithmic fatigue." }
                     ].map((item, i) => (
                       <div key={i} className="flex gap-8 group/item">
                          <div className="text-2xl font-black text-brandYellow/20 group-hover/item:text-brandYellow transition-colors duration-500 font-mono">
                            {i+1}.
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">{item.title}</h4>
                            <p className="text-white/40 text-base leading-relaxed">{item.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Growth Lifecycle - Horizontal Steps */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-[#fcfcfc] border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 lg:mb-32">
            <div className="space-y-4">
              <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">THE PHASES</span>
              <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter">Growth Lifecycle.</h2>
            </div>
            <p className="text-brandDark/40 text-lg lg:text-xl font-medium max-w-sm italic">
              "Predictability is engineered, not stumbled upon."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-brandDark/5 border border-brandDark/5 overflow-hidden rounded-[3rem]">
            {lifecycleSteps.map((step, i) => (
              <div 
                key={i} 
                className="bg-white p-12 lg:p-14 space-y-12 hover:bg-[#fffcf5] transition-colors duration-500 group"
              >
                <span className="text-5xl lg:text-6xl font-black text-brandDark/5 group-hover:text-brandYellow/20 transition-colors font-mono block">
                  {step.num}
                </span>

                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-brandDark tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="text-brandDark/40 text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Measurement Protocol */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-6 space-y-12">
            <div className="space-y-6">
              <span className="text-brandYellow font-mono text-[11px] font-black tracking-[0.4em] uppercase">SYSTEM OUTPUTS</span>
              <h2 className="text-5xl lg:text-8xl font-black text-white tracking-tighter leading-none">
                How we <br /> track profit.
              </h2>
              <p className="text-white/40 text-xl lg:text-2xl font-medium leading-relaxed">
                We ignore platform attribution and focus on the <span className="text-white">Source of Truth</span>: Your bank balance and unit economics.
              </p>
            </div>

            <div className="space-y-8">
               {[
                 { title: "MER (Efficiency Ratio)", sub: "Total Revenue / Total Ad Spend" },
                 { title: "Contribution Margin", sub: "Net profit after COGS & variable marketing" },
                 { title: "New-to-Brand Ratio", sub: "Percentage of revenue from cold prospects" }
               ].map((m, i) => (
                 <div key={i} className="flex items-center gap-6 group">
                   <div className="w-1.5 h-1.5 rounded-full bg-brandYellow group-hover:scale-[3] transition-transform duration-500"></div>
                   <div className="space-y-0.5">
                     <h4 className="text-2xl font-black text-white uppercase tracking-tight">{m.title}</h4>
                     <p className="text-white/20 text-sm font-bold tracking-widest uppercase">{m.sub}</p>
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="lg:col-span-6">
             <div className="bg-brandSurface rounded-[4rem] p-10 lg:p-16 border border-white/5 space-y-12 relative shadow-glow">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">Decision Protocol</span>
                  <div className="px-3 py-1 bg-[#4ade80]/10 rounded-lg">
                    <span className="text-[9px] font-black text-[#4ade80] uppercase tracking-widest">Live Desk</span>
                  </div>
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <p className="text-3xl font-black text-white tracking-tighter leading-none uppercase">Condition: Scale</p>
                    <p className="text-white/40 text-base">If Blended MER &gt; 20% of Target for 72h, initiate 20% budget expansion across primary clusters.</p>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div className="space-y-4">
                    <p className="text-3xl font-black text-white tracking-tighter leading-none uppercase text-brandYellow">Condition: Pivot</p>
                    <p className="text-white/40 text-base">If Creative Hook Rate &lt; 15%, bypass scaling and re-initiate Stage 02 (Variable Testing).</p>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 5. Communication Integrity */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24 space-y-4">
            <span className="text-[11px] font-black text-brandYellow uppercase tracking-[0.5em] block">PARTNERSHIP TERMS</span>
            <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-tight">
              Radical Transparency.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[
              { title: "The Weekly Pulse", desc: "Monday morning Loom deep-dives. We explain the 'why' behind the numbers, not just the 'what'." },
              { title: "Asynchronous Flow", desc: "We prioritize deep work. Slack for wins, Loom for dives, and zero useless 1-hour status calls." },
              { title: "Owner Approval", desc: "We manage the day-to-day chaos. You own the creative direction and the high-level budget moves." },
              { title: "Real-Time Profit", desc: "A custom Google Looker Studio dashboard connected to your P&L. 24/7 access to reality." }
            ].map((pillar, i) => (
              <div key={i} className="border-l-4 border-brandYellow pl-8 py-4 space-y-4 hover:border-brandDark transition-all duration-500">
                <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-brandDark/50 text-lg leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 6. Final Call */}
      <section className="py-24 lg:py-40 bg-brandDark text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.03] blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-12">
          <h2 className="text-4xl lg:text-8xl font-black text-white tracking-tighter leading-none">
            Ready to <br />
            <span className="text-brandYellow">Operationalize?</span>
          </h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-14 py-8 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-xl hover:bg-white transition-all shadow-glow"
          >
            Request System Audit
          </button>
        </div>
      </section>
    </div>
  );
};