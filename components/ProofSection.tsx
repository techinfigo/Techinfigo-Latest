
import React from 'react';

export const ProofSection: React.FC = () => {
  const ledgers = [
    {
      code: "REV-INF-01",
      value: "₹65 Cr+",
      label: "Portfolio Capital Influence",
      desc: "Measured across active D2C scaling mandates. We optimize for net-profit contribution, ensuring growth doesn't come at the cost of equity value."
    },
    {
      code: "AUDIT-SYS-42",
      value: "42+",
      label: "Infrastructure Restructures",
      desc: "Deep-dive audits into established brands where growth has plateaued. Re-engineering unit economics and attribution for predictable scale."
    },
    {
      code: "CAT-MULT-08",
      value: "08+",
      label: "Market Categories Handled",
      desc: "Execution experience across high-velocity FMCG, lifestyle apparel, and premium high-ticket beauty. Tested frameworks, adapted to unique CAC profiles."
    }
  ];

  return (
    <section className="w-full bg-white py-32 px-6 border-t border-brandDark/5 relative overflow-hidden">
      {/* Subtle Background Markings */}
      <div className="absolute top-0 right-0 p-10 opacity-[0.03] select-none pointer-events-none">
        <span className="text-[14vw] font-bold text-brandDark leading-none tracking-tighter">PROOF</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="max-w-4xl mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-brandYellow"></div>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/40">
              Proven in real businesses
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-brandDark tracking-tighter leading-[0.95] mb-8">
            Built and tested across multiple <br className="hidden lg:block" /> D2C growth stages.
          </h2>
          <p className="text-brandDark/50 text-xl font-medium max-w-xl leading-relaxed">
            Different brands. Different challenges. Same disciplined approach. We don't guess; we deploy systems that have already survived the market.
          </p>
        </div>

        {/* The Growth Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-brandDark/10">
          {ledgers.map((item, index) => (
            <div 
              key={index} 
              className={`pt-12 pb-16 md:px-10 flex flex-col justify-between group hover:bg-[#fafaf8] transition-colors duration-500
                ${index === 0 ? 'md:pl-0' : ''}
                ${index !== 2 ? 'md:border-r border-brandDark/10' : ''}
              `}
            >
              <div>
                {/* Technical Ref Code */}
                <div className="flex items-center justify-between mb-16">
                  <span className="text-[10px] font-mono font-bold text-brandDark/20 tracking-widest">
                    REF-CODE: {item.code}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-brandDark/10 group-hover:bg-brandYellow transition-colors"></div>
                </div>

                {/* The Big Number */}
                <div className="mb-8">
                  <span className="text-6xl lg:text-7xl font-bold text-brandDark tracking-tighter block mb-2">
                    {item.value}
                  </span>
                  <h3 className="text-xs font-bold text-brandDark uppercase tracking-[0.2em]">
                    {item.label}
                  </h3>
                </div>
              </div>

              {/* Qualitative Context */}
              <div className="mt-auto">
                <p className="text-brandDark/50 text-sm leading-relaxed max-w-[280px]">
                  {item.desc}
                </p>
                
                {/* Visual Separator for mobile */}
                <div className="w-8 h-[1px] bg-brandDark/10 mt-12 md:hidden"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-8 py-10 border-t border-brandDark/5">
          <div className="flex items-center gap-12">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-brandDark/30 uppercase tracking-[0.2em] mb-1">Execution Range</span>
              <span className="text-xs font-bold text-brandDark">Seed Traction — Series B Scale</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-brandDark/30 uppercase tracking-[0.2em] mb-1">Profit Guard</span>
              <span className="text-xs font-bold text-brandDark">100% Attribution Transparency</span>
            </div>
          </div>

          <div className="flex items-center gap-4 py-3 px-6 bg-brandDark text-white rounded-full">
            <span className="text-[10px] font-bold uppercase tracking-widest">Growth Architecture Status:</span>
            <span className="text-[10px] font-bold text-brandYellow uppercase tracking-widest">Verified & Active</span>
          </div>
        </div>

      </div>
    </section>
  );
};
