import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface QualificationProtocolProps {
  onBookAudit: () => void;
}

export const QualificationProtocol: React.FC<QualificationProtocolProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-[#f9f6f2] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#a5a5a5] block">QUALIFICATION STEP</span>
          <h2 className="text-4xl lg:text-6xl font-black text-[#001d1a] tracking-tight leading-tight">
            Which Stage Is Your Brand <br className="hidden lg:block" /> In Right Now?
          </h2>
          <p className="text-[#001d1a]/60 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Most D2C brands don’t fail because of ads — they fail because they scale without fixing fundamentals.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[680px] bg-white ring-1 ring-black/5">
          
          {/* Left Card: Ideal Client */}
          <div className="flex-1 bg-gradient-to-br from-[#001d1a] to-[#002a25] p-10 lg:p-14 relative overflow-hidden flex flex-col group/scaler">
            {/* Background Subtle Glow */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#fbb632]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-10 flex-grow">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">Brands Ready to Scale Profitably</h3>
                <p className="text-[#fbb632] text-[10px] font-black uppercase tracking-[0.25em] opacity-90">This is where real growth begins</p>
              </div>

              <div className="space-y-6">
                {[
                  "Spending ₹2L+/month on ads",
                  "Looking beyond ROAS (focus on profit)",
                  "Want predictable, repeatable growth",
                  "Already getting orders but profit unstable",
                  "Ready to fix backend before scaling"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className="w-6 h-6 rounded-full bg-[#fbb632]/10 flex items-center justify-center shrink-0 border border-[#fbb632]/20">
                      <CheckCircle2 className="w-4 h-4 text-[#fbb632]" />
                    </div>
                    <span className="text-white/80 text-base lg:text-lg font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 mt-auto">
                <p className="text-white/90 text-lg font-bold italic leading-relaxed">
                  “If this sounds like you, we can help you scale faster.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Card: Awareness */}
          <div className="flex-1 bg-[#fcfcfc] p-10 lg:p-14 flex flex-col relative overflow-hidden group/gambler">
            <div className="relative z-10 space-y-10 flex-grow">
              <div className="space-y-4">
                <h3 className="text-3xl lg:text-4xl font-black text-[#001d1a] tracking-tight uppercase leading-none">Brands Still Figuring It Out</h3>
                <p className="text-[#001d1a]/40 text-[10px] font-black uppercase tracking-[0.25em] opacity-80">This is completely normal at early stages</p>
              </div>

              <div className="space-y-6">
                {[
                  "Testing ads with small budgets",
                  "Focusing only on ROAS or quick wins",
                  "No clear funnel or backend system",
                  "Scaling based on guesswork",
                  "Inconsistent sales & performance"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-[#001d1a]/20 shrink-0"></div>
                    <span className="text-[#001d1a]/60 text-base lg:text-lg font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-black/5 mt-auto">
                <p className="text-[#001d1a]/50 text-lg font-bold italic leading-relaxed">
                  “If you’re here, focus on building basics first — scaling comes next.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center space-y-6">
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
            <button 
              onClick={onBookAudit}
              className="relative px-10 py-5 bg-[#001d1a] text-white font-black text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Get Free Profit Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#001d1a]/40 text-sm font-bold uppercase tracking-widest">
            Find out exactly where your brand stands
          </p>
        </div>
      </div>
    </section>
  );
};