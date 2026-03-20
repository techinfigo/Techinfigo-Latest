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
      highlight: "No scaling until this is fixed.",
      icon: <Search className="w-6 h-6 text-brandYellow" />
    },
    {
      num: "2",
      title: "Test (Find What Actually Works)",
      desc: "We run structured creative and offer tests to identify winning combinations — not random experiments.",
      highlight: "Data-backed decisions only.",
      icon: <FlaskConical className="w-6 h-6 text-brandYellow" />
    },
    {
      num: "3",
      title: "Stabilize (Build a Profit Baseline)",
      desc: "We fix your unit economics and bring consistency before increasing spend.",
      highlight: "Consistent profit > random spikes",
      icon: <ShieldCheck className="w-6 h-6 text-brandYellow" />
    },
    {
      num: "4",
      title: "Scale (Increase Profit, Not Just Spend)",
      desc: "Once your system is stable, we scale budgets using proven winners — without breaking margins.",
      highlight: "Scale without killing profitability",
      icon: <TrendingUp className="w-6 h-6 text-brandYellow" />
    },
    {
      num: "5",
      title: "Retain (Maximize LTV & Repeat Revenue)",
      desc: "We optimize backend flows like retention, upsells, and repeat purchases to increase lifetime value.",
      highlight: "More profit from same customers",
      icon: <Users className="w-6 h-6 text-brandYellow" />
    }
  ];

  return (
    <section className="py-24 lg:py-40 px-6 bg-[#f9f7f2] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-32 space-y-6">
          <h2 className="text-4xl lg:text-7xl font-black text-[#001d21] tracking-tighter leading-tight">
            How We Turn Ad Spend Into <span className="text-brandYellow italic">Predictable Profit</span>
          </h2>
          <p className="text-[#001d21]/60 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            A step-by-step system designed to eliminate guesswork and build scalable, repeatable growth.
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative lg:min-h-[500px] mb-20">
          
          {/* Desktop Road Line */}
          <div className="hidden lg:block absolute top-[120px] left-0 w-full z-0">
             <div className="w-full h-[2px] bg-[#001d21]/10 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_50%,#fbb632_50%)] bg-[length:40px_100%] opacity-30 animate-road-flow"></div>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between relative z-10 gap-12 lg:gap-4">
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center lg:w-1/5 relative">
                
                {/* Step Marker */}
                <div className="w-16 h-16 bg-[#001d21] rounded-2xl shadow-xl flex items-center justify-center text-xl font-black text-white relative z-20 ring-8 ring-[#f9f7f2] group-hover:scale-110 group-hover:bg-[#fbb632] group-hover:text-[#001d21] transition-all duration-500 mb-8">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-brandYellow text-[#001d21] text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#f9f7f2]">
                    {step.num}
                  </div>
                </div>

                {/* Content Card */}
                <div className="bg-white rounded-[2.5rem] p-8 w-full text-center shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#fbb632]/20 flex flex-col items-center space-y-4 group-hover:-translate-y-2">
                  <h3 className="text-xl font-black text-[#001d21] tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#001d21]/50 text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="pt-4 border-t border-[#001d21]/5 w-full">
                    <span className="text-[10px] font-black text-brandYellow uppercase tracking-widest">
                      {step.highlight}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Differentiation Strip */}
        <div className="w-full bg-brandDark rounded-[2rem] p-8 lg:p-12 mb-20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brandYellow/5 blur-[100px] rounded-full"></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12 text-center lg:text-left">
            <div className="w-12 h-12 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brandYellow" />
            </div>
            <p className="text-xl lg:text-3xl font-black text-white tracking-tight leading-tight">
              Most agencies jump to scaling. <br className="lg:hidden" />
              <span className="text-brandYellow italic">We don’t scale until your numbers make sense.</span>
            </p>
          </div>
        </div>

        {/* Bottom Section: Proof + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Micro-Proof */}
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 border border-[#001d21]/5 shadow-xl space-y-8">
            <h4 className="text-2xl font-black text-[#001d21] tracking-tight">
              Brands that follow this system typically see:
            </h4>
            <ul className="space-y-6">
              {[
                "30–60% improvement in profitability",
                "Lower CAC within 45–60 days",
                "Stable scaling without sudden drops"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-brandYellow/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow transition-colors">
                    <ArrowRight className="w-3 h-3 text-brandYellow group-hover:text-brandDark transition-colors" />
                  </div>
                  <span className="text-lg font-bold text-[#001d21]/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center lg:items-start space-y-8">
            <div className="space-y-2 text-center lg:text-left">
              <h4 className="text-3xl lg:text-4xl font-black text-[#001d21] tracking-tighter">
                Ready to fix your <span className="text-brandYellow italic">profit leaks?</span>
              </h4>
              <p className="text-[#001d21]/50 text-lg font-medium">
                We’ll show you exactly where your profit is leaking.
              </p>
            </div>
            
            <div className="relative group w-full max-w-md">
              <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
              <button 
                onClick={onBookAudit}
                className="relative w-full py-6 bg-brandYellow text-brandDark font-black text-[16px] uppercase tracking-[0.2em] rounded-xl hover:bg-brandDark hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3"
              >
                Start With a Free Audit
                <ArrowRight className="w-5 h-5" />
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
