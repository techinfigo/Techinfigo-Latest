
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
    <section className="w-full bg-[#faf6ed] py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-40">
          <div className="flex items-center gap-6 mb-10">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/30">Growth Engine Architecture</span>
            <div className="h-[1.5px] w-16 bg-brandYellow"></div>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold text-brandDark tracking-tighter leading-[0.85] mb-12">
            Built to scale profit, <br /> not just traffic.
          </h2>
          <p className="text-brandDark/50 text-2xl font-medium max-w-2xl leading-relaxed">
            Every layer of our execution stack is designed to compound returns through structured, repeatable systems.
          </p>
        </div>

        {/* The Linear Engine Visual */}
        <div className="relative pt-32 pb-24">
          
          {/* Main Horizontal Axis Line */}
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-brandDark/10 hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group">
                
                {/* Visual Node (Intersection Point) */}
                <div className="hidden lg:flex absolute top-[50%] left-0 -translate-y-[50%] z-20 items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-brandBg border-2 border-brandDark/20 transition-all duration-700 group-hover:border-brandYellow group-hover:scale-150 group-hover:bg-brandYellow">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandDark m-auto mt-[4px] group-hover:bg-brandDark transition-colors"></div>
                  </div>
                </div>

                {/* Content - Alternating layout for rhythm */}
                <div className={`
                  flex flex-col transition-all duration-700
                  ${index % 2 === 0 ? 'lg:-translate-y-40 lg:pb-16' : 'lg:translate-y-16 lg:pt-16'}
                `}>
                  
                  {/* Step Meta */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-6xl font-light text-brandDark/5 tracking-tighter group-hover:text-brandYellow/20 transition-all duration-500">
                      {step.id}
                    </span>
                    <div className="w-10 h-[1px] bg-brandDark/10"></div>
                  </div>

                  {/* Stage Heading */}
                  <h3 className="text-4xl font-bold text-brandDark mb-6 tracking-tighter leading-none">
                    {step.title}
                  </h3>
                  
                  {/* Stage Description */}
                  <p className="text-brandDark/60 text-lg leading-relaxed mb-8 max-w-[300px]">
                    {step.desc}
                  </p>

                  {/* System Variable Label */}
                  <div className="inline-flex items-center gap-3 px-4 py-2 border border-brandDark/5 rounded-full w-fit bg-white/50">
                    <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
                    <span className="text-[11px] font-bold text-brandDark uppercase tracking-[0.2em]">
                      {step.variable}
                    </span>
                  </div>
                </div>

                {/* Vertical Connector Line (Desktop Only) */}
                <div className={`
                  hidden lg:block absolute left-[10px] w-[1px] bg-brandDark/10 -z-10 transition-all duration-700 group-hover:bg-brandYellow
                  ${index % 2 === 0 ? 'bottom-[50%] h-40' : 'top-[50%] h-16'}
                `}></div>

              </div>
            ))}
          </div>

          {/* Terminal Arrow/Dot on Line */}
          <div className="hidden lg:block absolute top-[50%] right-0 -translate-y-[50%]">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-brandYellow shadow-[0_0_15px_rgba(252,182,50,0.5)]"></div>
              <div className="w-32 h-[1px] bg-gradient-to-r from-brandYellow to-transparent"></div>
              <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.4em] ml-6">
                Terminal Velocity reached
              </span>
            </div>
          </div>
        </div>

        {/* Section Footer: System Metrics */}
        <div className="mt-48 pt-12 border-t border-brandDark/5 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
             <div className="flex items-center gap-5">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-brandDark/10 border border-[#faf6ed]"></div>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-brandDark/40 uppercase tracking-[0.3em]">Full Stack Integrity Active</span>
             </div>
             <p className="text-brandDark/30 text-[11px] font-mono leading-loose tracking-widest">
               CORE_PROTOCOL: LINEAR_COMPOUND_V3<br />
               DEPLOY_STATUS: FULL_SYNC
             </p>
          </div>
          
          <div className="bg-brandDark text-white p-10 rounded-sm flex flex-col sm:flex-row items-center gap-16 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <span className="text-6xl font-bold tracking-tighter">ROI</span>
            </div>
            <div className="flex flex-col relative z-10">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-3">Avg System Yield</span>
              <span className="text-5xl font-bold text-brandYellow tracking-tighter">412%</span>
            </div>
            <div className="hidden sm:block w-[1px] h-16 bg-white/10"></div>
            <div className="flex flex-col relative z-10">
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-3">Scale Velocity</span>
              <span className="text-5xl font-bold tracking-tighter">1.8x <span className="text-xl opacity-30">/ MO</span></span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
