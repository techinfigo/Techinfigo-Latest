import React from 'react';
import { TrendingDown, Zap, BarChart3, AlertCircle, ShieldAlert, ArrowRight } from 'lucide-react';

interface DiagnosticSectionProps {
  onBookAudit?: () => void;
}

export const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({ onBookAudit }) => {
  const painPoints = [
    {
      title: "ROAS looks good, but margins are shrinking",
      desc: "Platform data is inflating your ego while hidden costs kill your actual take-home pay.",
      icon: <TrendingDown className="w-5 h-5 text-brandYellow" />
    },
    {
      title: "Scaling increases revenue but kills profitability",
      desc: "Whenever you push budgets, the unit economics crumble instantly, leaving you with less.",
      icon: <Zap className="w-5 h-5 text-brandYellow" />
    },
    {
      title: "Creatives burn out faster than you can replace them",
      desc: "Ad fatigue hits within days because you lack a structured, high-velocity testing lab.",
      icon: <ShieldAlert className="w-5 h-5 text-brandYellow" />
    },
    {
      title: "You don’t know which product/ad is actually making money",
      desc: "Attribution mess means you're guessing where to put your next rupee of capital.",
      icon: <BarChart3 className="w-5 h-5 text-brandYellow" />
    },
    {
      title: "Hidden costs (discounts, shipping, COD, returns) eating profit",
      desc: "The silent killers that don't show up on your Meta dashboard but drain your bank account.",
      icon: <AlertCircle className="w-5 h-5 text-brandYellow" />
    }
  ];

  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-10 lg:py-16 px-6 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-10 lg:mb-14 space-y-4 lg:space-y-6">
          <div className="inline-block px-4 py-1 border border-brandDark/10 rounded-full">
            <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.4em] uppercase text-brandDark/40 block">THE REAL PROBLEM</span>
          </div>
          
          <h2 className="text-3xl lg:text-6xl font-black text-brandDark tracking-tighter leading-[1.1]">
            Sales Are Coming In. <br />
            But <span className="text-brandYellow italic">Profit Isn’t Growing.</span>
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-3 lg:space-y-4">
            <p className="text-brandDark/70 text-base lg:text-lg font-medium leading-relaxed">
              You’re spending more on ads than ever. Orders are increasing.
              But when you check your bank account — it doesn’t feel like growth.
            </p>
            <p className="text-brandDark font-black text-lg lg:text-xl uppercase tracking-tight">
              That’s because <span className="text-brandYellow">revenue ≠ profit.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Left Side: Pain Breakdown (Dark Card) */}
          <div className="lg:col-span-7 bg-[#001d21] rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 shadow-4xl flex flex-col justify-between relative overflow-hidden group">
            {/* Subtle Leakage Animation Effect */}
            <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 20 Q 25 10 50 20 T 100 20" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse" />
                <path d="M0 50 Q 25 40 50 50 T 100 50" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse delay-75" />
                <path d="M0 80 Q 25 70 50 80 T 100 80" fill="none" stroke="white" strokeWidth="0.5" className="animate-pulse delay-150" />
              </svg>
            </div>

            <div className="relative z-10 space-y-8 lg:space-y-10">
              <div className="space-y-1">
                <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight uppercase">Where Most Brands Lose <span className="text-brandYellow">Profit</span></h3>
              </div>

              <div className="space-y-5 lg:space-y-6">
                {painPoints.map((point, idx) => (
                  <div key={idx} className="flex gap-4 lg:gap-6 group/item">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover/item:bg-brandYellow/10 transition-all duration-500">
                      {point.icon}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-base lg:text-lg font-black text-white tracking-tight">{point.title}</h4>
                      <p className="text-white/40 text-xs lg:text-sm font-medium leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative z-10 mt-10 lg:mt-12 pt-6 border-t border-white/5">
              <p className="text-brandYellow/60 text-[10px] lg:text-xs font-black uppercase tracking-[0.3em]">
                “We don’t fix ads. We fix what’s leaking your profit.”
              </p>
            </div>
          </div>

          {/* Right Side: Shift in Belief (Light Card) */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <div className="flex-1 bg-[#fdf8f0] rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-12 border border-brandDark/5 flex flex-col justify-center space-y-8 relative overflow-hidden">
              <div className="space-y-4 lg:space-y-6 relative z-10">
                <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tighter leading-none">
                  Scaling Shouldn’t Feel Like Gambling
                </h3>
                <div className="space-y-3">
                  <p className="text-brandDark/60 text-base lg:text-lg font-medium leading-relaxed">
                    Most agencies focus on spending your budget.
                  </p>
                  <p className="text-brandDark text-base lg:text-lg font-bold leading-relaxed">
                    We focus on building a system where every ₹1 you spend is tracked, optimized, and scaled <span className="text-brandDark font-black border-b-2 border-brandYellow">profitably.</span>
                  </p>
                </div>
              </div>

              {/* Proof Block */}
              <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 border border-brandYellow/20 shadow-xl relative z-10">
                <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em] block mb-3 lg:mb-4">REAL RESULT</span>
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-brandDark/40 text-[10px] font-bold uppercase tracking-wider">Before</span>
                    <span className="text-brandDark text-sm font-bold">₹12L spend → ₹1.2L profit</span>
                  </div>
                  <div className="h-[1px] w-full bg-brandDark/5"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-brandYellow text-[10px] font-black uppercase tracking-wider">After</span>
                    <span className="text-brandDark font-black text-base lg:text-lg">₹5.6L profit in 60 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-brandDark rounded-[2.5rem] lg:rounded-[3rem] p-8 lg:p-10 shadow-4xl flex flex-col items-center text-center space-y-4 lg:space-y-6">
              <div className="relative group w-full">
                <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
                <button 
                  onClick={onBookAudit}
                  className="relative w-full py-4 lg:py-5 bg-brandYellow text-brandDark font-black text-[12px] lg:text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Find Your Profit Leaks
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                Free audit. No fluff. Just numbers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};