import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface QualificationProtocolProps {
  onBookAudit: () => void;
}

export const QualificationProtocol: React.FC<QualificationProtocolProps> = ({ onBookAudit }) => {
  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 px-6 bg-[#f9f6f2] font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full flex flex-col justify-center h-full">
        {/* Header Section */}
        <div className="text-center mb-4 lg:mb-6 space-y-1 lg:space-y-3 animate-slide-up">
          <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.5em] uppercase text-[#a5a5a5] block">KNOW WHERE YOU STAND</span>
          <h2 className="text-2xl lg:text-4xl font-black text-[#001d1a] tracking-tight leading-tight">
            Which Stage Is Your Brand <br className="hidden lg:block" /> In Right Now?
          </h2>
          <p className="text-[#001d1a]/60 text-xs lg:text-base font-medium max-w-xl mx-auto leading-relaxed">
            Most D2C brands don’t fail because of ads — <br className="hidden lg:block" />
            they fail because they scale without fixing fundamentals.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="relative rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:h-[40vh] min-h-[350px] lg:min-h-[380px] bg-white ring-1 ring-black/5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          
          {/* Left Card: Ideal Client */}
          <div className="flex-1 bg-gradient-to-br from-[#001d1a] to-[#002a25] p-5 lg:p-8 relative overflow-hidden flex flex-col group/scaler">
            {/* Background Subtle Glow */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#fbb632]/5 rounded-full blur-[120px] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-4 lg:space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-lg lg:text-xl font-black text-white tracking-tight uppercase leading-none">Brands Ready to Scale Profitably</h3>
                <p className="text-[#fbb632] text-[7px] lg:text-[8px] font-black uppercase tracking-[0.25em] opacity-90">This is where real growth begins</p>
              </div>

              <div className="space-y-2 lg:space-y-3">
                {[
                  "Spending ₹2L+/month on ads",
                  "Looking beyond ROAS (focused on profit)",
                  "Already getting orders but margins unstable",
                  "Want predictable, repeatable growth",
                  "Ready to fix backend before scaling"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 lg:gap-3 group/item">
                    <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-[#fbb632]/10 flex items-center justify-center shrink-0 border border-[#fbb632]/20">
                      <CheckCircle2 className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-[#fbb632]" />
                    </div>
                    <span className="text-white/80 text-[10px] lg:text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/5">
                <p className="text-white/90 text-xs lg:text-sm font-bold italic leading-relaxed">
                  “If this sounds like you, we can help you scale faster.”
                </p>
              </div>
            </div>
          </div>

          {/* Right Card: Awareness */}
          <div className="flex-1 bg-[#fcfcfc] p-5 lg:p-8 flex flex-col relative overflow-hidden group/gambler">
            <div className="relative z-10 space-y-4 lg:space-y-6 flex-grow flex flex-col justify-between">
              <div className="space-y-1">
                <h3 className="text-lg lg:text-xl font-black text-[#001d1a] tracking-tight uppercase leading-none">Brands Still Building the Foundation</h3>
                <p className="text-[#001d1a]/40 text-[7px] lg:text-[8px] font-black uppercase tracking-[0.25em] opacity-80">This is completely normal in early stages</p>
              </div>

              <div className="space-y-2 lg:space-y-3">
                {[
                  "Testing ads with smaller budgets",
                  "Focusing on quick wins (ROAS)",
                  "No clear funnel or backend system yet",
                  "Scaling based on trial and error",
                  "Inconsistent sales performance"
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-2 lg:gap-3">
                    <div className="w-1 h-1 lg:w-1.5 lg:h-1.5 rounded-full bg-[#001d1a]/20 shrink-0"></div>
                    <span className="text-[#001d1a]/60 text-[10px] lg:text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-black/5">
                <p className="text-[#001d1a]/50 text-xs lg:text-sm font-bold italic leading-relaxed">
                  “If you’re here, focus on building your basics first — scaling comes next.”
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Micro Guidance Line */}
        <div className="mt-4 text-center animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <p className="text-[#001d1a]/30 text-[9px] lg:text-[11px] font-bold uppercase tracking-[0.2em]">
            Clarity on your stage = better decisions = better growth
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 lg:mt-8 text-center space-y-2 lg:space-y-3 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block group">
            <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
            <button 
              onClick={onBookAudit}
              className="relative px-6 lg:px-8 py-2.5 lg:py-3.5 bg-[#001d1a] text-white font-black text-[10px] lg:text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Check My Growth Stage
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[#001d1a]/40 text-[8px] lg:text-[10px] font-bold uppercase tracking-widest">
            Find out exactly where your brand stands
          </p>
        </div>
      </div>
    </section>
  );
};