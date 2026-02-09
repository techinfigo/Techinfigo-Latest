
import React from 'react';

export const ProofSection: React.FC = () => {
  const ledgers = [
    {
      code: "REV-INF-01",
      value: "₹65 Cr+",
      label: "Portfolio Influence",
      desc: "Measured across active D2C mandates. We optimize for contribution margins, ensuring growth translates to actual enterprise value."
    },
    {
      code: "AUDIT-SYS-42",
      value: "42+",
      label: "System Restructures",
      desc: "Comprehensive rebuilds for brands plateaued by inefficient ops. Re-engineering unit economics and cross-platform attribution."
    },
    {
      code: "CAT-MULT-08",
      value: "08+",
      label: "Niche Categories",
      desc: "Execution experience across FMCG, Lifestyle, and Premium Beauty. Tested frameworks adapted to unique CAC & LTV profiles."
    }
  ];

  return (
    <section className="w-full bg-white py-48 px-6 border-t border-brandDark/5 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.02] select-none pointer-events-none">
        <span className="text-[20vw] font-bold text-brandDark leading-none tracking-tighter">LEDGER</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="max-w-4xl mb-40">
          <div className="flex items-center gap-6 mb-8">
            <div className="w-12 h-[2px] bg-brandYellow"></div>
            <span className="text-[11px] font-bold tracking-[0.6em] uppercase text-brandDark/40">
              Execution Evidence
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold text-brandDark tracking-tighter leading-[0.85] mb-12">
            Built and tested for <br /> elite D2C scaling.
          </h2>
          <p className="text-brandDark/50 text-2xl font-medium max-w-2xl leading-relaxed">
            We don't speculate. We deploy growth infrastructure that has survived the volatility of hundreds of scaling cycles.
          </p>
        </div>

        {/* The Growth Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-brandDark/10">
          {ledgers.map((item, index) => (
            <div 
              key={index} 
              className={`pt-16 pb-24 md:px-12 flex flex-col justify-between group hover:bg-brandDark/[0.02] transition-all duration-700
                ${index === 0 ? 'md:pl-0' : ''}
                ${index !== 2 ? 'md:border-r border-brandDark/10' : ''}
              `}
            >
              <div>
                {/* Technical Ref Code */}
                <div className="flex items-center justify-between mb-20">
                  <span className="text-[11px] font-mono font-bold text-brandDark/20 tracking-[0.4em]">
                    ID: {item.code}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-brandDark/10 group-hover:bg-brandYellow transition-all duration-500 group-hover:scale-150"></div>
                </div>

                {/* The Big Number */}
                <div className="mb-12">
                  <span className="text-7xl lg:text-8xl font-bold text-brandDark tracking-tighter block mb-4 group-hover:translate-x-2 transition-transform duration-700">
                    {item.value}
                  </span>
                  <h3 className="text-xs font-bold text-brandDark uppercase tracking-[0.4em]">
                    {item.label}
                  </h3>
                </div>
              </div>

              {/* Qualitative Context */}
              <div className="mt-auto">
                <p className="text-brandDark/50 text-lg leading-relaxed max-w-[320px]">
                  {item.desc}
                </p>
                
                {/* Visual Separator for mobile */}
                <div className="w-12 h-[1px] bg-brandDark/10 mt-16 md:hidden"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <div className="mt-32 flex flex-col lg:flex-row items-center justify-between gap-12 py-12 border-t border-brandDark/5">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-16">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em] mb-2">Operational Scope</span>
              <span className="text-sm font-bold text-brandDark">Seed Traction &mdash; Series B Scale</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em] mb-2">Transparency</span>
              <span className="text-sm font-bold text-brandDark">Real-time Attribution Audits</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em] mb-2">Focus</span>
              <span className="text-sm font-bold text-brandDark">Net-Profit Optimization</span>
            </div>
          </div>

          <div className="flex items-center gap-6 py-4 px-10 bg-brandDark text-white rounded-full shadow-xl shadow-brandDark/10">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em]">Growth Verification:</span>
            <span className="text-[11px] font-bold text-brandYellow uppercase tracking-[0.4em] flex items-center gap-2">
              Verified
              <span className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse"></span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
