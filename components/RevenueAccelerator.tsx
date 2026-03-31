'use client';

import React from 'react';
import { Check, ArrowRight, ShieldCheck, Search, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface RevenueAcceleratorProps {
  onBookAudit?: () => void;
}

export const RevenueAccelerator: React.FC<RevenueAcceleratorProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-16 lg:py-32 px-6 bg-brandDark font-sans relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#facc15 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
      
      {/* Subtle Glow Behind CTA Area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brandYellow/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10 w-full space-y-12 lg:space-y-16">
        
        {/* 1. MAIN HEADLINE */}
        <div className="space-y-4 lg:space-y-6 animate-slide-up">
          <h2 className="text-3xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] uppercase">
            Still Spending on Ads <br className="hidden md:block" />
            Without Knowing Your Real Profit?
          </h2>
          <h3 className="text-xl lg:text-3xl font-black text-brandYellow tracking-tight uppercase">
            Let’s Fix That — Before You Spend Another ₹1
          </h3>
        </div>

        {/* 2. SUBTEXT */}
        <div className="max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <p className="text-white/60 text-base lg:text-xl font-medium leading-relaxed">
            In the next 15–20 minutes, we’ll break down exactly where your money is leaking — 
            and what’s stopping your brand from scaling profitably.
          </p>
        </div>

        {/* 3. VALUE BULLETS */}
        <div className="space-y-4 lg:space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {[
            { text: "Identify hidden profit leaks in your funnel", highlight: ["profit"] },
            { text: "Understand what’s actually making you money", highlight: [] },
            { text: "Get clarity on CAC, MER & real margins", highlight: ["CAC", "MER"] },
            { text: "Walk away with actionable insights", highlight: [] }
          ].map((bullet, idx) => (
            <div key={idx} className="flex items-center justify-center gap-3 lg:gap-4 group">
              <Check className="w-5 h-5 text-brandYellow shrink-0" />
              <span className="text-white/80 text-base lg:text-xl font-bold group-hover:text-white transition-colors">
                {bullet.text.split(' ').map((word, i) => (
                  <span key={i} className={bullet.highlight.some(h => word.includes(h)) ? 'text-brandYellow' : ''}>
                    {word}{' '}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </div>

        {/* 4. RISK REVERSAL */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="inline-block bg-brandYellow/10 border border-brandYellow/20 px-6 py-3 rounded-full">
            <p className="text-brandYellow font-black text-xs lg:text-sm uppercase tracking-widest flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" />
              “If we can’t find improvement opportunities, we won’t pitch you anything.”
            </p>
          </div>
        </div>

        {/* 5. URGENCY & CTA */}
        <div className="space-y-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="space-y-2">
            <p className="text-white font-black text-xl lg:text-2xl tracking-tight uppercase">
              We work with a limited number of brands at a time
            </p>
            <p className="text-white/40 text-[10px] lg:text-[12px] font-bold uppercase tracking-[0.3em]">
              Due to hands-on involvement
            </p>
          </div>

          <div className="relative inline-block">
            {/* Pulsing Glow Effect */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-brandYellow blur-3xl rounded-full"
            />
            
            <button 
              onClick={onBookAudit}
              className="group relative px-16 py-8 bg-brandYellow text-brandDark font-black text-sm lg:text-base uppercase tracking-[0.5em] rounded-2xl hover:bg-white transition-all duration-500 shadow-[0_0_50px_rgba(252,182,50,0.3)] overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-4">
                Show Me My Profit Gaps
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-white/40 text-[11px] lg:text-[12px] font-bold uppercase tracking-[0.4em]">
                No spam. No pressure. Just clarity.
              </p>
              <p className="text-brandYellow text-[10px] lg:text-[11px] font-black uppercase tracking-[0.5em]">
                Takes 15 minutes. Could save you lakhs.
              </p>
            </div>

            {/* WHAT HAPPENS NEXT */}
            <div className="pt-12 border-t border-white/5 max-w-md mx-auto space-y-6">
              <p className="text-white/60 text-[11px] font-black uppercase tracking-[0.3em]">What happens next:</p>
              <div className="flex flex-col items-center gap-4">
                {[
                  "Fill a quick form",
                  "Get your audit breakdown",
                  "Decide if you want to go deeper"
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandYellow"></div>
                    <span className="text-white/40 text-[11px] font-bold uppercase tracking-[0.2em]">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-8">
              <p className="text-white/20 text-[10px] lg:text-[11px] font-black uppercase tracking-[0.6em]">
                Trusted by growing D2C brands across India
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
