import React from 'react';
import { Check, ArrowRight, TrendingUp, Quote } from 'lucide-react';

interface CaseStudySectionProps {
  onBookAudit?: () => void;
  onNavigate?: (page: string) => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onBookAudit, onNavigate }) => {
  return (
    <section id="case-studies" className="w-full py-12 lg:py-20 px-6 bg-[#f9f6f2] font-sans overflow-hidden lg:min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto space-y-4 lg:space-y-6">
        
        {/* 1. SECTION HEADER */}
        <div className="text-center space-y-2 lg:space-y-3 max-w-3xl mx-auto animate-slide-up">
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-brandYellow block">WHERE YOUR PROFIT IS ACTUALLY GOING</span>
          <h2 className="text-2xl lg:text-4xl xl:text-5xl font-black text-brandDark tracking-tighter leading-[0.95]">
            The Typical D2C Profit Leak <br />
            (And How We Fix It)
          </h2>
          <p className="text-brandDark/60 text-sm lg:text-base font-medium">
            We don't show fake case studies. We show real patterns we consistently see across D2C brands.
          </p>
        </div>

        {/* 2. CASE STUDY CARD (MAIN BLOCK) */}
        <div className="bg-brandDark rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {/* Top Label */}
          <div className="px-5 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
            <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em]">TYPICAL TRANSFORMATION</span>
            <span className="text-[10px] lg:text-xs font-bold text-white tracking-tight">Pattern-Based Growth Model</span>
          </div>

          <div className="p-5 lg:p-6 xl:p-8 space-y-6 lg:space-y-8">
            {/* 3. BEFORE vs AFTER */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 relative">
              {/* Visual Flow Arrow (Desktop) */}
              <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brandYellow rounded-full items-center justify-center shadow-glow animate-pulse">
                <ArrowRight className="w-5 h-5 text-brandDark" />
              </div>

              {/* LEFT (BEFORE) */}
              <div className="lg:pr-10 xl:pr-16 space-y-4 opacity-40 grayscale transition-all">
                <h3 className="text-lg lg:text-xl font-black text-white/80 tracking-tight">Before Fixing the System</h3>
                <ul className="space-y-2 lg:space-y-3">
                  {[
                    "₹10–12L/month ad spend",
                    "4–5x ROAS (looks good)",
                    "₹1–1.5L actual profit",
                    "High CAC & unstable scaling",
                    "No clarity on real margins"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/60 font-medium text-xs lg:text-sm">
                      <div className="w-1 h-1 rounded-full bg-white/20"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT (AFTER - HIGHLIGHTED) */}
              <div className="lg:pl-10 xl:pl-16 space-y-4 bg-white/5 p-5 lg:p-6 xl:p-8 rounded-[1.5rem] border border-brandYellow/30 shadow-glow relative overflow-hidden group">
                {/* Subtle Glow Effect */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-brandYellow/10 blur-[80px] rounded-full group-hover:bg-brandYellow/20 transition-all duration-700"></div>
                
                <h3 className="text-lg lg:text-xl font-black text-brandYellow tracking-tight">After Fixing Unit Economics</h3>
                <ul className="space-y-2 lg:space-y-3 relative z-10">
                  {[
                    { text: "Same ad spend maintained", highlight: false },
                    { text: "₹4–6L monthly profit", highlight: true },
                    { text: "Lower CAC & better margins", highlight: false },
                    { text: "Improved AOV & backend revenue", highlight: false },
                    { text: "Stable, predictable growth", highlight: false }
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
                Profit Improves <span className="text-brandYellow">2–4x</span> — <br className="hidden lg:block" />
                Without Increasing Ad Spend
              </p>
            </div>

            {/* 5. WHAT ACTUALLY CHANGES? */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 lg:space-y-6">
                <h4 className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em] text-center">WHAT ACTUALLY CHANGES?</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                  {[
                    "Hidden profit leaks are identified",
                    "Funnel conversion gaps are fixed",
                    "Product-level performance is optimized",
                    "Backend (AOV, retention) is improved",
                    "Scaling happens only after stability"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-medium text-xs lg:text-sm bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brandYellow shrink-0"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. CTA BUTTON */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button 
            onClick={onBookAudit}
            className="group relative px-8 py-4 bg-brandYellow text-brandDark font-black text-[9px] lg:text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow overflow-hidden w-full sm:w-auto"
          >
            <span className="relative z-10">See My Profit Potential</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
          
          {onNavigate && (
            <button 
              onClick={() => onNavigate('profit-breakdown')}
              className="group px-8 py-4 border border-brandDark/10 text-brandDark font-black text-[9px] lg:text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-brandDark hover:text-white transition-all w-full sm:w-auto"
            >
              See Full Breakdown
            </button>
          )}
        </div>
        <div className="text-center">
          <p className="text-brandDark/40 text-[8px] font-bold uppercase tracking-[0.2em]">
            We’ll show you what this could look like for your brand
          </p>
        </div>

      </div>
    </section>
  );
};
