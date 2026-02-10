import React from 'react';

export const SystemSection: React.FC = () => {
  const steps = [
    {
      id: "01",
      title: "Acquire",
      desc: "Architecting high-intent traffic streams with unit-economic guardrails.",
      variable: "Traffic: 92%"
    },
    {
      id: "02",
      title: "Convert",
      desc: "Engineering paths that transform predictable predictable revenue.",
      variable: "CVR: +24%"
    },
    {
      id: "03",
      title: "Retain",
      desc: "Orchestrating automated loops that turn buyers into advocates.",
      variable: "LTV: 2.4x"
    },
    {
      id: "04",
      title: "Scale",
      desc: "Expanding proven variables while maintaining net-profit integrity.",
      variable: "Yield: MAX"
    }
  ];

  return (
    <section className="w-full py-24 lg:py-48 px-4 sm:px-6 overflow-hidden bg-brandDark relative">
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-brandYellow/5 blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-20 lg:mb-40">
          <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.5em] uppercase text-brandYellow/40 mb-6 block">Engine Architecture</span>
          <h2 className="text-4xl lg:text-8xl font-bold text-white tracking-tighter leading-[1.1] lg:leading-[0.85] mb-8 lg:mb-12">
            Built to scale profit, <br className="hidden lg:block" /> not just traffic.
          </h2>
          <p className="text-white/50 text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed">
            Every layer of our execution stack is designed to compound returns through repeatable systems.
          </p>
        </div>

        <div className="relative py-12 lg:pt-32 lg:pb-24">
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brandYellow/30 to-transparent hidden lg:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative group border-l lg:border-l-0 border-white/10 pl-8 lg:pl-0">
                
                <div className="hidden lg:flex absolute top-[50%] left-0 -translate-y-[50%] z-20 items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-brandDark border-2 border-brandYellow/40 group-hover:bg-brandYellow group-hover:shadow-glow transition-all duration-500"></div>
                </div>

                <div className={`
                  flex flex-col transition-all duration-700
                  ${index % 2 === 0 ? 'lg:-translate-y-40 lg:pb-16' : 'lg:translate-y-16 lg:pt-16'}
                `}>
                  <span className="text-4xl lg:text-6xl font-light text-white/5 tracking-tighter mb-4">
                    {step.id}
                  </span>
                  <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 tracking-tighter leading-none group-hover:text-brandYellow transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-base lg:text-lg leading-relaxed mb-6">
                    {step.desc}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-white/10 rounded-full w-fit bg-white/5">
                    <span className="text-[9px] lg:text-[11px] font-bold text-brandYellow uppercase tracking-[0.2em]">
                      {step.variable}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24 lg:mt-48 pt-12 border-t border-white/5 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <p className="text-white/20 text-[9px] lg:text-[11px] font-mono leading-loose tracking-widest uppercase">
            CORE_PROTOCOL: LINEAR_COMPOUND_V3<br />
            DEPLOY_STATUS: FULL_SYNC
          </p>
          
          <div className="w-full lg:w-auto bg-white/5 text-white p-8 lg:p-10 rounded-3xl flex flex-col sm:flex-row items-center gap-8 lg:gap-16 shadow-4xl border border-white/10 relative overflow-hidden group backdrop-blur-xl">
            <div className="absolute inset-0 bg-brandYellow/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex flex-col text-center sm:text-left relative z-10">
              <span className="text-[8px] lg:text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-2">System Yield</span>
              <span className="text-4xl lg:text-5xl font-bold text-brandYellow tracking-tighter">412%</span>
            </div>
            <div className="hidden sm:block w-[1px] h-12 bg-white/10 relative z-10"></div>
            <div className="flex flex-col text-center sm:text-left relative z-10">
              <span className="text-[8px] lg:text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] mb-2">Scale Velocity</span>
              <span className="text-4xl lg:text-5xl font-bold tracking-tighter text-white">1.8x <span className="text-lg opacity-30">/ MO</span></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};