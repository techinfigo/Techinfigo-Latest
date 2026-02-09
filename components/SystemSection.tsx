
import React from 'react';

export const SystemSection: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Acquire",
      desc: "Architecting high-intent traffic streams with unit-economic guardrails.",
      variable: "Traffic Quality: 92%"
    },
    {
      id: "02",
      title: "Convert",
      desc: "Engineering seamless user paths that transform interest into predictable revenue.",
      variable: "CVR Optimization: +24%"
    },
    {
      id: "03",
      title: "Retain",
      desc: "Orchestrating automated loops that turn buyers into high-LTV advocates.",
      variable: "Retention Rate: 2.4x"
    },
    {
      id: "04",
      title: "Scale",
      desc: "Expanding proven growth variables while maintaining net-profit integrity.",
      variable: "Net Profit Yield: MAX"
    }
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/30">Our Approach</span>
            <div className="h-[1px] w-12 bg-brandDark/10"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-brandDark tracking-tighter leading-[0.9] mb-10">
            A growth system built to <br /> scale profit, not just traffic.
          </h2>
          <p className="text-brandDark/50 text-xl font-medium max-w-xl leading-relaxed">
            Every decision is designed to compound revenue over time through a structured execution stack.
          </p>
        </div>

        {/* The Linear Engine Visual */}
        <div className="relative pt-20 pb-12">
          
          {/* Main Horizontal Axis Line */}
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-brandDark/10 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-4 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                
                {/* Visual Node (Intersection Point) */}
                <div className="hidden lg:flex absolute top-[50%] left-0 -translate-y-[50%] z-20 items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-brandBg border-2 border-brandDark/20 transition-all duration-500 group-hover:border-brandYellow group-hover:scale-125">
                    <div className="w-1 h-1 rounded-full bg-brandDark m-auto mt-[3px] group-hover:bg-brandYellow transition-colors"></div>
                  </div>
                </div>

                {/* Content - Alternating top/bottom layout on desktop for 'compounding' feel */}
                <div className={`
                  flex flex-col transition-all duration-500
                  ${index % 2 === 0 ? 'lg:-translate-y-32 lg:pb-12' : 'lg:translate-y-12 lg:pt-12'}
                `}>
                  
                  {/* Step Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-light text-brandDark/10 tracking-tighter group-hover:text-brandYellow/40 transition-colors">
                      {step.id}
                    </span>
                    <div className="w-8 h-[1px] bg-brandDark/5"></div>
                  </div>

                  {/* Stage Heading */}
                  <h3 className="text-3xl font-bold text-brandDark mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  {/* Stage Description */}
                  <p className="text-brandDark/60 text-base leading-relaxed mb-6 max-w-[260px]">
                    {step.desc}
                  </p>

                  {/* System Variable Label */}
                  <div className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brandYellow"></span>
                    <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.2em]">
                      {step.variable}
                    </span>
                  </div>
                </div>

                {/* Vertical Connector Line (Desktop Only) */}
                <div className={`
                  hidden lg:block absolute left-2 w-[1px] bg-brandDark/5 -z-10
                  ${index % 2 === 0 ? 'bottom-[50%] h-32' : 'top-[50%] h-32'}
                `}></div>

              </div>
            ))}
          </div>

          {/* Terminal Arrow/Dot on Line */}
          <div className="hidden lg:block absolute top-[50%] right-0 -translate-y-[50%]">
            <div className="flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-brandDark/20"></div>
              <div className="w-24 h-[1px] bg-gradient-to-r from-brandDark/20 to-transparent"></div>
              <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em] ml-4">
                Scalability Threshold
              </span>
            </div>
          </div>

        </div>

        {/* Section Footer: System Metrics */}
        <div className="mt-40 pt-10 border-t border-brandDark/5 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-4">
                <div className="flex -space-x-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-4 h-4 rounded-full bg-brandDark/10 border border-[#faf6ed]"></div>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-brandDark/40 uppercase tracking-widest">Growth Engines Synced</span>
             </div>
             <p className="text-brandDark/30 text-[10px] tracking-widest leading-loose">
               Architecture: Proprietary Linear Compound Stack<br />
               Audit Status: Real-time unit economic validation
             </p>
          </div>
          
          <div className="bg-brandDark text-white px-8 py-6 rounded-2xl flex items-center gap-10">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Average System ROI</span>
              <span className="text-2xl font-bold text-brandYellow">412%</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-1">Scaling Velocity</span>
              <span className="text-2xl font-bold">1.8x / Mo</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes flow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
};
