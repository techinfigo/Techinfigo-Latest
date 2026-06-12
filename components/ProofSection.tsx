import React from 'react';

export const ProofSection: React.FC = () => {
  const ledgers = [
    {
      code: "TARGET-01",
      value: "₹2 Cr+",
      label: "Scaling Target",
      desc: "Our systems are built to stabilize margins while scaling revenue to ₹2Cr/month."
    },
    {
      code: "LEAK-AUDIT",
      value: "40%",
      label: "Avg. Profit Leak",
      desc: "The percentage of profit typically found leaking through inefficient unit economics in D2C."
    },
    {
      code: "BENCHMARK",
      value: "4.5x",
      label: "System MER",
      desc: "The Marketing Efficiency Ratio we target for high-growth, high-margin D2C categories."
    }
  ];

  return (
    <section className="w-full bg-[#fcfcfc] py-24 lg:py-48 px-4 sm:px-6 border-t border-brandDark/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 lg:p-20 opacity-[0.02] select-none pointer-events-none">
        <span className="text-[30vw] lg:text-[20vw] font-bold text-brandDark leading-none tracking-tighter">DATA</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-4xl mb-20 lg:mb-40">
          <span className="text-[9px] lg:text-[11px] font-bold tracking-[0.6em] uppercase text-brandDark/40 mb-6 block">Execution Evidence</span>
          <h2 className="text-4xl lg:text-8xl font-bold text-brandDark tracking-tighter leading-[1.1] lg:leading-[0.85] mb-8 lg:mb-12">
            Built and tested for <br className="hidden lg:block" /> elite D2C scaling.
          </h2>
          <p className="text-brandDark/50 text-lg lg:text-2xl font-medium max-w-2xl leading-relaxed">
            We don't speculate. We deploy growth infrastructure that has survived hundreds of scaling cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-brandDark/10">
          {ledgers.map((item, index) => (
            <div 
              key={index} 
              className={`pt-12 pb-16 lg:pt-16 lg:pb-24 lg:px-12 flex flex-col justify-between group border-b lg:border-b-0 lg:border-r border-brandDark/10 last:border-0 hover:bg-brandDark/[0.01] transition-colors`}
            >
              <div className="mb-12">
                <span className="text-[9px] lg:text-[11px] font-mono font-bold text-brandDark/30 tracking-[0.4em] mb-8 block uppercase">
                  ID: {item.code}
                </span>
                <span className="text-5xl lg:text-8xl font-bold text-brandDark tracking-tighter block mb-3 group-hover:text-brandYellow transition-colors">
                  {item.value}
                </span>
                <h3 className="text-[10px] lg:text-xs font-bold text-brandYellow uppercase tracking-[0.3em] lg:tracking-[0.4em]">
                  {item.label}
                </h3>
              </div>
              <p className="text-brandDark/60 text-base lg:text-lg leading-relaxed max-w-[320px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 lg:mt-32 flex flex-col lg:flex-row items-center justify-between gap-10 py-10 border-t border-brandDark/5">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-16">
            <div className="text-center lg:text-left">
              <span className="text-[8px] lg:text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em] block mb-1">Operational Scope</span>
              <span className="text-xs lg:text-sm font-bold text-brandDark uppercase tracking-widest">Seed to Series B</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="text-[8px] lg:text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em] block mb-1">Integrity</span>
              <span className="text-xs lg:text-sm font-bold text-brandDark uppercase tracking-widest">Verified Attribution</span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 px-8 bg-brandDark text-white border border-brandDark/10 rounded-full shadow-4xl group cursor-default">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Status:</span>
            <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.3em] flex items-center gap-2">
              Verified
              <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};