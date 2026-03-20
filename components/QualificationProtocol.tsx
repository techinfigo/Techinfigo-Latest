import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface QualificationProtocolProps {
  onBookAudit: () => void;
}

export const QualificationProtocol: React.FC<QualificationProtocolProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-10 lg:py-16 px-6 bg-[#f9f6f2] font-sans relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between h-full">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-10 space-y-2 lg:space-y-4 animate-slide-up">
          <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.5em] uppercase text-[#a5a5a5] block">QUALIFICATION STEP</span>
          <h2 className="text-3xl lg:text-5xl font-black text-[#001d1a] tracking-tight leading-tight">
            Which Stage Is Your Brand <br className="hidden lg:block" /> In Right Now?
          </h2>
          <p className="text-[#001d1a]/60 text-sm lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Most D2C brands don’t fail because of ads — they fail because they scale without fixing fundamentals.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:h-[48vh] min-h-[450px] lg:min-h-[460px] bg-white ring-1 ring-black/5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Left Card: Ideal Client */}
          <div className="flex-1 bg-gradient-to-br from-[#001d1a] to-[#002a25] p-6 lg:p-10 relative overflow-hidden flex flex-col group/scaler">
            {/* Background Subtle Glow */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#fbb632]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight uppercase leading-none">Brands Ready to Scale Profitably</h3>
                <p className="text-[#fbb632] text-[8px] lg:text-[9px] font-black uppercase tracking-[0.25em] opacity-90">This is where real growth begins</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                {[
                  "Spending ₹2L+/month on ads",
                  "Looking beyond ROAS (focus on profit)",
                  "Want predictable, repeatable growth",
                  "Already getting orders but profit unstable",
                  "Ready to fix backend before scaling"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3 group/item">
                    <div className="w-5 h-5 rounded-full bg-[#fbb632]/10 flex items-center justify-center shrink-0 border border-[#fbb632]/20">
                      <CheckCircle2 className="w-3 h-3 text-[#fbb632]" />
                    </div>
                    <span className="text-white/80 text-xs lg:text-base font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-white/90 text-sm lg:text-base font-bold italic leading-relaxed">
                  “If this sounds like you, we can help you scale faster.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Card: Awareness */}
          <div className="flex-1 bg-[#fcfcfc] p-6 lg:p-10 flex flex-col relative overflow-hidden group/gambler">
            <div className="relative z-10 space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-black text-[#001d1a] tracking-tight uppercase leading-none">Brands Still Figuring It Out</h3>
                <p className="text-[#001d1a]/40 text-[8px] lg:text-[9px] font-black uppercase tracking-[0.25em] opacity-80">This is completely normal at early stages</p>
              </div>

              <div className="space-y-3 lg:space-y-4">
                {[
                  "Testing ads with small budgets",
                  "Focusing only on ROAS or quick wins",
                  "No clear funnel or backend system",
                  "Scaling based on guesswork",
                  "Inconsistent sales & performance"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#001d1a]/20 shrink-0"></div>
                    <span className="text-[#001d1a]/60 text-xs lg:text-base font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-black/5">
                <p className="text-[#001d1a]/50 text-sm lg:text-base font-bold italic leading-relaxed">
                  “If you’re here, focus on building basics first — scaling comes next.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 lg:mt-10 text-center space-y-3 lg:space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
            <button 
              onClick={onBookAudit}
              className="relative px-8 lg:px-10 py-3 lg:py-4 bg-[#001d1a] text-white font-black text-[11px] lg:text-[13px] uppercase tracking-[0.2em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
            >
              Get Free Profit Audit
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#001d1a]/40 text-[9px] lg:text-xs font-bold uppercase tracking-widest">
            Find out exactly where your brand stands
          </p>
        </div>
      </div>
    </section>
  );
};