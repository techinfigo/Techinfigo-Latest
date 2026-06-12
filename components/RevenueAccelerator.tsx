'use client';

import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, BarChart3, Clock, Search, TrendingUp } from 'lucide-react';

interface RevenueAcceleratorProps {
  onBookAudit?: () => void;
}

export const RevenueAccelerator: React.FC<RevenueAcceleratorProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-12 lg:py-24 px-6 bg-brandDark font-sans relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#003a42,transparent)] opacity-40"></div>
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }}>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: THE VALUE PROPOSITION */}
          <div className="lg:col-span-7 space-y-8 lg:space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brandYellow/10 border border-brandYellow/20 rounded-full">
                <Zap className="w-3 h-3 text-brandYellow fill-brandYellow" />
                <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">Revenue Accelerator</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05] uppercase">
                A Profit-First <br />
                <span className="text-brandYellow">D2C Growth Agency</span>
              </h2>
              <p className="text-white/90 text-lg lg:text-xl font-medium max-w-xl leading-relaxed">
                We identify the hidden profit leaks in your D2C funnel that are killing your MER. 
                Get a clear roadmap to Profitable Growth with our proprietary data infrastructure.
              </p>
            </div>

            {/* Value Grid - More compact than a list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: BarChart3, title: "Unit Economics", desc: "Fix CAC & MER before you spend more." },
                { icon: Search, title: "Leak Detection", desc: "Identify exactly where money is lost." },
                { icon: TrendingUp, title: "Profit Roadmap", desc: "A 90-day plan for sustainable scale." },
                { icon: ShieldCheck, title: "Zero Risk", desc: "No pitch if we can't find value." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-brandYellow/50 transition-colors">
                    <item.icon className="w-5 h-5 text-brandYellow" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-white font-bold text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-white/70 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="w-8 h-[1px] bg-white/10"></span>
                Built for ambitious D2C founders
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: THE CONVERSION CARD */}
          <div className="lg:col-span-5">
            <div className="relative p-8 lg:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
              {/* Card Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brandYellow">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Founding Partner Offer</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                    Get Your Free <br /> Profit Audit
                  </h3>
                  <p className="text-white/80 text-xs font-medium">
                    "If we can't find real profit leaks, we won't pitch. No obligation."
                  </p>
                </div>

                <div className="space-y-4">
                  <button 
                    onClick={onBookAudit}
                    className="group relative w-full py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(252,182,50,0.2)] flex items-center justify-center gap-3"
                  >
                    Get My Free Profit Audit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                  
                  <div className="flex flex-col gap-3 pt-2">
                    {[
                      "Fill a 2-minute form",
                      "Get your audit breakdown",
                      "Actionable scale roadmap"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-brandYellow"></div>
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-brandYellow/80 text-[9px] font-black text-center uppercase tracking-[0.4em]">
                    D2C Brands Only
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </section>
  );
};

