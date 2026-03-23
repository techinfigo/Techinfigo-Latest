import React from 'react';
import { X, Check, ArrowRight, TrendingUp } from 'lucide-react';

export const TechinfigoEdge: React.FC<{ onBookAudit: () => void }> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-12 lg:py-20 px-6 bg-brandDark overflow-hidden font-sans relative lg:min-h-screen flex flex-col justify-center">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brandYellow/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brandYellow/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Header Infrastructure */}
        <div className="text-center mb-12 lg:mb-16 space-y-4 lg:space-y-6">
          <div className="inline-block px-4 py-1 border border-white/10 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 block">THE REAL DIFFERENCE</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95]">
            We Don’t Scale Ad Spend. <br />
            <span className="text-brandYellow italic">We Scale What Actually Makes You Money.</span>
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-2 lg:space-y-4">
            <p className="text-white/60 text-base lg:text-xl font-medium leading-relaxed">
              Most agencies focus on increasing your ad budget.
            </p>
            <p className="text-white text-base lg:text-xl font-bold leading-relaxed">
              We focus on fixing your unit economics first — <br className="hidden lg:block" />
              so when you scale, you actually <span className="text-brandYellow">keep more profit.</span>
            </p>
          </div>
        </div>

        {/* Split Comparison Section */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6 lg:gap-8 items-center mb-12">
          
          {/* Left Card: Typical Agencies */}
          <div className="lg:col-span-5 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 lg:p-10 opacity-30 grayscale transition-all duration-700">
            <div className="space-y-6 lg:space-y-8">
              <h3 className="text-xl lg:text-2xl font-black text-white/40 tracking-tight uppercase">What Most Agencies Do</h3>
              
              <ul className="space-y-4 lg:space-y-5">
                {[
                  "Increase ad spend to show growth",
                  "Optimize for ROAS, not profit",
                  "Ignore backend (AOV, LTV, retention)",
                  "Scale before fixing fundamentals",
                  "Short-term spikes, long-term instability"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-white/20 text-sm lg:text-base mt-0.5">❌</span>
                    <span className="text-white/40 font-medium text-sm lg:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* VS Visual */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <span className="text-white/10 font-black italic text-sm lg:text-base tracking-widest">VS</span>
            </div>
          </div>

          {/* Right Card: Your Approach (Highlighted) */}
          <div className="lg:col-span-5 bg-white/[0.05] border-2 border-[#fcb632]/40 rounded-[2.5rem] p-8 lg:p-10 shadow-[0_0_60px_rgba(252,182,50,0.1)] relative group">
            <div className="absolute top-0 right-0 p-6">
              <TrendingUp className="w-6 h-6 text-brandYellow/30 group-hover:text-brandYellow transition-colors" />
            </div>
            
            <div className="space-y-6 lg:space-y-8 relative z-10">
              <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight uppercase">What We Do <span className="text-brandYellow">Differently</span></h3>
              
              <ul className="space-y-4 lg:space-y-5">
                {[
                  "Fix profit leaks before scaling",
                  "Track real metrics (MER, CAC, net profit)",
                  "Optimize full funnel (ads + backend)",
                  "Scale only when system is stable",
                  "Build predictable, repeatable growth"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="text-brandYellow text-sm lg:text-base mt-0.5">✔</span>
                    <span className="text-white font-bold text-sm lg:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Authority Line */}
        <div className="text-center mb-16">
          <p className="text-xl lg:text-3xl font-black text-white tracking-tight uppercase">
            “We don’t increase budget until <span className="text-brandYellow">your numbers make sense.</span>”
          </p>
        </div>

        {/* Bottom Section: Proof + CTA Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Real Proof Block */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-brandYellow/20 shadow-2xl relative overflow-hidden group w-full max-w-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-2xl"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em] block mb-4">TYPICAL IMPACT</span>
              <div className="space-y-2">
                <p className="text-brandDark font-black text-lg lg:text-xl tracking-tight leading-snug">
                  Same ad spend. <br />
                  Profit increases <span className="text-brandYellow">2–4x</span> after fixing the system.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center lg:items-start space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
              <button 
                onClick={onBookAudit}
                className="relative px-10 py-5 bg-brandYellow text-brandDark font-black text-[13px] lg:text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl flex items-center gap-3"
              >
                Show Me My Growth Gaps
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              Get a clear breakdown of what’s holding you back
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};