'use client';

import React from 'react';
import { Search, FlaskConical, ShieldCheck, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface GrowthLifecycleProps {
  onBookAudit?: () => void;
}

export const GrowthLifecycle: React.FC<GrowthLifecycleProps> = ({ onBookAudit }) => {
  const steps = [
    {
      num: "1",
      title: "Audit (Find Profit Leaks)",
      desc: "We break down your funnel, CAC, MER, and hidden costs to identify exactly where you’re losing money.",
      meaning: "What this means for you: You’ll know exactly where your money is leaking — and why profit isn’t growing.",
      highlight: "No scaling until this is fixed.",
      icon: <Search className="w-5 h-5 lg:w-6 lg:h-6 text-brandYellow" />
    },
    {
      num: "2",
      title: "Test (Find What Actually Works)",
      desc: "We run structured creative and offer tests to identify winning combinations — not random experiments.",
      meaning: "What this means for you: You’ll know which creatives, offers, and products actually drive profitable results.",
      highlight: "Data-backed decisions only.",
      icon: <FlaskConical className="w-5 h-5 lg:w-6 lg:h-6 text-brandYellow" />
    },
    {
      num: "3",
      title: "Stabilize (Build a Profit Baseline)",
      desc: "We fix your unit economics and bring consistency before increasing spend.",
      meaning: "What this means for you: You’ll have consistent performance instead of unpredictable spikes and drops.",
      highlight: "Consistent profit > random spikes",
      icon: <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-brandYellow" />
    },
    {
      num: "4",
      title: "Scale (Increase Profit, Not Just Spend)",
      desc: "Once your system is stable, we scale budgets using proven winners — without breaking margins.",
      meaning: "What this means for you: You’ll be able to increase ad spend without breaking your margins.",
      highlight: "Scale without killing profitability",
      icon: <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-brandYellow" />
    },
    {
      num: "5",
      title: "Retain (Maximize LTV & Repeat Revenue)",
      desc: "We optimize backend flows like retention, upsells, and repeat purchases to increase lifetime value.",
      meaning: "What this means for you: You’ll make more profit from the same customers through repeat purchases and higher AOV.",
      highlight: "More profit from same customers",
      icon: <Users className="w-5 h-5 lg:w-6 lg:h-6 text-brandYellow" />
    }
  ];

  return (
    <section className="w-full lg:min-h-screen flex flex-col justify-center py-12 lg:py-20 px-6 bg-brandBg font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12 space-y-3 lg:space-y-4">
          <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter leading-tight">
            A Proven Growth System for Scaling <span className="text-brandYellow italic">Ecommerce Brands Profitably</span>
          </h2>
          <p className="text-brandDark/60 text-base lg:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            A proven Performance Marketing system designed to eliminate guesswork and build scalable, repeatable growth for D2C brands.
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative lg:min-h-[400px] mb-8 lg:mb-12">
          
          {/* Desktop Road Line */}
          <div className="hidden lg:block absolute top-[100px] left-0 w-full z-0">
             <div className="w-full h-[2px] bg-brandDark/10 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full bg-brandYellow/30 animate-road-flow"></div>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between relative z-10 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center lg:w-1/5 relative">
                
                {/* Step Marker */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-brandDark rounded-2xl shadow-xl flex items-center justify-center text-lg font-black text-white relative z-20 ring-4 lg:ring-8 ring-brandBg group-hover:scale-110 group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-500 mb-4 lg:mb-6">
                  {step.icon}
                  <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brandYellow text-brandDark text-[9px] font-black rounded-full flex items-center justify-center border-2 border-brandBg">
                    {step.num}
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[2rem] p-5 lg:p-6 w-full text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-brandYellow/20 flex flex-col items-center space-y-3 group-hover:-translate-y-2">
                  <h3 className="text-base lg:text-lg font-black text-brandDark tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-brandDark/50 text-[11px] lg:text-xs font-medium leading-relaxed">
                      {step.desc}
                    </p>
                    <p className="text-brandDark/30 text-[10px] lg:text-[11px] font-medium leading-tight italic">
                      {step.meaning}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brandDark/5 w-full">
                    <span className="text-[9px] font-black text-brandYellow uppercase tracking-widest">
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiation Strip */}
        <div className="w-full bg-brandDark rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-8 mb-8 lg:mb-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8 text-center lg:text-left">
            <div className="w-10 h-10 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-brandYellow" />
            </div>
            <p className="text-lg lg:text-2xl font-black text-white tracking-tight leading-tight">
              Most agencies jump to scaling. <br className="lg:hidden" />
              <span className="text-brandYellow italic">We don’t scale until your numbers make sense.</span>
            </p>
          </div>
        </div>

        {/* Bottom Section: Proof + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Micro-Proof */}
          <div className="bg-white rounded-[2rem] p-6 lg:p-10 border border-brandDark/5 shadow-xl space-y-4 lg:space-y-6">
            <h4 className="text-lg lg:text-xl font-black text-brandDark tracking-tight">
              Brands that follow this system typically see:
            </h4>
            <ul className="space-y-3 lg:space-y-4">
              {[
                "30–60% improvement in profitability",
                "Lower CAC within 45–60 days",
                "Stable scaling without sudden drops"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow transition-colors">
                    <ArrowRight className="w-2.5 h-2.5 text-brandYellow group-hover:text-brandDark transition-colors" />
                  </div>
                  <span className="text-base lg:text-lg font-bold text-brandDark/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:space-y-6">
            <div className="space-y-1 lg:space-y-2 text-center lg:text-left">
              <h4 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tighter">
                Ready to fix your <span className="text-brandYellow italic">profit leaks?</span>
              </h4>
              <p className="text-brandDark/50 text-base lg:text-lg font-medium">
                We’ll show you exactly where your profit is leaking.
              </p>
            </div>
            
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
              <button 
                onClick={onBookAudit}
                className="relative w-full py-4 lg:py-5 bg-brandYellow text-brandDark font-black text-[13px] lg:text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-brandDark hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
              >
                Start With a Free Audit
                <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes roadFlow {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        .animate-road-flow {
          animation: roadFlow 1s linear infinite;
        }
      `}</style>
    </section>
  );
};
