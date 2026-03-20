import React from 'react';
import { X, Check, ArrowRight, TrendingUp } from 'lucide-react';

export const TechinfigoEdge: React.FC<{ onBookAudit: () => void }> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-24 lg:py-48 px-6 bg-brandDark overflow-hidden font-sans relative">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandYellow/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brandYellow/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Infrastructure */}
        <div className="text-center mb-24 space-y-8">
          <div className="inline-block px-4 py-1.5 border border-white/10 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 block">WHY MOST BRANDS FAIL</span>
          </div>
          
          <h2 className="text-4xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            We Don’t Scale Ad Spend. <br />
            <span className="text-brandYellow italic">We Scale What Actually Makes You Money.</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/60 text-lg lg:text-2xl font-medium leading-relaxed">
              Most agencies focus on increasing your ad budget.
            </p>
            <p className="text-white text-lg lg:text-2xl font-bold leading-relaxed">
              We focus on fixing your unit economics first — <br className="hidden lg:block" />
              so when you scale, you actually <span className="text-brandYellow">keep more profit.</span>
            </p>
          </div>
        </div>

        {/* Split Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-center mb-24">
          
          {/* Left Card: Typical Agencies */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 lg:p-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="space-y-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white/80 tracking-tight uppercase">What Most Agencies Do</h3>
              
              <ul className="space-y-6">
                {[
                  "Increase ad spend to show growth",
                  "Optimize for ROAS, not profit",
                  "Ignore backend (AOV, LTV, retention)",
                  "Scale before fixing fundamentals",
                  "Short-term spikes, long-term instability"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-1">
                      <X className="w-3 h-3 text-red-500" />
                    </div>
                    <span className="text-white/60 font-medium text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* VS Visual */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-16 h-16 rounded-full bg-brandYellow/10 border border-brandYellow/20 flex items-center justify-center">
              <span className="text-brandYellow font-black italic text-xl">VS</span>
            </div>
          </div>

          {/* Right Card: Your Approach (Highlighted) */}
          <div className="lg:col-span-5 bg-white/[0.05] border-2 border-brandYellow/30 rounded-[3rem] p-10 lg:p-14 shadow-[0_0_50px_rgba(251,182,50,0.1)] relative group">
            <div className="absolute top-0 right-0 p-8">
              <TrendingUp className="w-8 h-8 text-brandYellow/20 group-hover:text-brandYellow/40 transition-colors" />
            </div>
            
            <div className="space-y-10 relative z-10">
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight uppercase">What We Do <span className="text-brandYellow">Differently</span></h3>
              
              <ul className="space-y-6">
                {[
                  "Fix profit leaks before scaling",
                  "Track real metrics (MER, CAC, Net Profit)",
                  "Optimize full funnel (ads + landing + backend)",
                  "Scale only when system is stable",
                  "Build predictable, repeatable growth"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-brandYellow/20 flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-3 h-3 text-brandYellow" />
                    </div>
                    <span className="text-white font-bold text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Real Proof Block */}
        <div className="flex justify-center mb-24">
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-brandYellow/20 shadow-2xl relative overflow-hidden group max-w-2xl w-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-2xl"></div>
            <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em] block mb-6">REAL IMPACT</span>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-brandDark/40 text-sm font-bold uppercase tracking-wider mb-1">Ad spend stayed the same</p>
                <p className="text-brandDark font-black text-2xl lg:text-3xl tracking-tight">
                  Profit increased from <br className="hidden md:block" />
                  <span className="text-brandDark/40 line-through">₹2.1L</span> → <span className="text-brandDark">₹6.4L</span>
                </p>
              </div>
              <div className="px-6 py-3 bg-brandYellow/10 rounded-xl border border-brandYellow/20">
                <span className="text-brandYellow font-black text-xl tracking-tighter">IN 75 DAYS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Authority Line & CTA */}
        <div className="text-center space-y-12">
          <p className="text-2xl lg:text-4xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto">
            “We don’t increase budget until <br className="hidden lg:block" />
            <span className="text-brandYellow italic">your numbers make sense.</span>”
          </p>

          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
              <button 
                onClick={onBookAudit}
                className="relative px-12 py-6 bg-brandYellow text-brandDark font-black text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl flex items-center gap-3"
              >
                See Where You’re Losing Profit
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.2em]">
              Get your free audit breakdown
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};