import React from 'react';
import { Check, ArrowRight, TrendingUp, Quote } from 'lucide-react';

interface CaseStudySectionProps {
  onBookAudit?: () => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onBookAudit }) => {
  return (
    <section id="case-studies" className="w-full py-12 lg:py-20 px-6 bg-[#f9f6f2] font-sans overflow-hidden lg:min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center space-y-2 lg:space-y-3 max-w-3xl mx-auto animate-slide-up">
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-brandYellow block">REAL RESULTS</span>
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-black text-brandDark tracking-tighter leading-[0.95]">
            From Revenue Growth <br />
            to Real Profit
          </h2>
          <p className="text-brandDark/60 text-sm lg:text-base font-medium">
            Here’s what happens when you fix unit economics before scaling
          </p>
        </div>

        {/* 2. CASE STUDY CARD (MAIN BLOCK) */}
        <div className="bg-brandDark rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Top Brand Name */}
          <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">CASE STUDY</span>
            <span className="text-[10px] lg:text-xs font-bold text-white tracking-tight">D2C Skincare Brand (India)</span>
          </div>

          <div className="p-5 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
            {/* 3. BEFORE vs AFTER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 relative">
              {/* Visual Flow Arrow (Desktop) */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brandYellow rounded-full items-center justify-center shadow-glow animate-pulse">
                <ArrowRight className="w-5 h-5 text-brandDark" />
              </div>

              {/* LEFT (BEFORE) */}
              <div className="lg:pr-10 xl:pr-16 space-y-4 opacity-50 grayscale transition-all hover:opacity-70 hover:grayscale-0">
                <h3 className="text-lg lg:text-xl font-black text-white/80 tracking-tight">Before Working With Us</h3>
                <ul className="space-y-2 lg:space-y-3">
                  {[
                    "₹12L/month ad spend",
                    "4.8x ROAS (looked good)",
                    "Only ₹1.2L net profit",
                    "High returns & discount dependency",
                    "No clarity on real profitability"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 font-medium text-xs lg:text-sm">
                      <div className="w-1 h-1 rounded-full bg-white/20"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT (AFTER - HIGHLIGHTED) */}
              <div className="lg:pl-10 xl:pl-16 space-y-4 bg-white/5 p-5 lg:p-6 xl:p-8 rounded-[1.5rem] border border-white/10 shadow-glow relative overflow-hidden group">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brandYellow/10 blur-[80px] rounded-full group-hover:bg-brandYellow/20 transition-all duration-700"></div>
                
                <h3 className="text-lg lg:text-xl font-black text-brandYellow tracking-tight">After 60 Days</h3>
                <ul className="space-y-2 lg:space-y-3 relative z-10">
                  {[
                    { text: "Same ad spend: ₹12L", highlight: false },
                    { text: "Net profit: ₹5.6L/month", highlight: true },
                    { text: "Reduced CAC by 32%", highlight: false },
                    { text: "Improved AOV & backend conversions", highlight: false },
                    { text: "Stable scaling without margin drop", highlight: false }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white font-medium text-xs lg:text-sm">
                      <Check className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brandYellow shrink-0" />
                      <span className={item.highlight ? "text-brandYellow font-black" : ""}>
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 4. KEY TRANSFORMATION (BIG NUMBER) */}
            <div className="text-center py-4 lg:py-6 border-y border-white/10">
              <p className="text-2xl lg:text-3xl xl:text-4xl font-black text-white tracking-tighter leading-tight">
                Profit Increased by <span className="text-brandYellow">4.6x</span> <br className="hidden lg:block" />
                Without Increasing Ad Spend
              </p>
            </div>

            {/* 5. WHAT WE DID & 6. TESTIMONIAL */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* WHAT WE DID */}
              <div className="space-y-4 lg:space-y-6">
                <h4 className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em]">WHAT CHANGED?</h4>
                <ul className="grid grid-cols-1 gap-2 lg:gap-3">
                  {[
                    "Identified hidden profit leaks",
                    "Fixed funnel conversion gaps",
                    "Optimized product-level performance",
                    "Improved backend (AOV, retention)",
                    "Scaled only after stabilizing profit"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80 font-medium text-xs lg:text-sm">
                      <div className="w-1 h-1 rounded-full bg-brandYellow"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* TESTIMONIAL */}
              <div className="bg-white/5 p-5 lg:p-6 xl:p-8 rounded-[1.5rem] border border-white/5 flex flex-col justify-between relative">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-white/5" />
                <p className="text-base lg:text-lg font-medium text-white/90 italic leading-relaxed relative z-10">
                  "We were scaling revenue but not profit. After working with them, we finally understood where our money was going — and fixed it."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-brandYellow/20 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-brandYellow" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-[10px] lg:text-xs">Founder, D2C Brand</p>
                    <p className="text-white/40 text-[8px] uppercase tracking-widest">Skincare Industry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 7. TRUST ELEMENTS */}
            <div className="pt-4 lg:pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 text-center">
              <div>
                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">INDUSTRY</p>
                <p className="text-white font-bold text-[10px] lg:text-xs">D2C Skincare</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">TIMELINE</p>
                <p className="text-white font-bold text-[10px] lg:text-xs">60 Days</p>
              </div>
              <div>
                <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">AD BUDGET</p>
                <p className="text-white font-bold text-[10px] lg:text-xs">₹12L/month</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. CTA BUTTON */}
        <div className="text-center space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={onBookAudit}
            className="group relative px-8 py-4 bg-brandYellow text-brandDark font-black text-[9px] lg:text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow overflow-hidden"
          >
            <span className="relative z-10">Get My Profit Breakdown</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          <p className="text-brandDark/40 text-[8px] font-bold uppercase tracking-[0.2em]">
            We’ll show you what’s holding your brand back
          </p>
        </div>

      </div>
    </section>
  );
};
