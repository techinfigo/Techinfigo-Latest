
import React from 'react';

export const QualificationSection: React.FC = () => {
  const idealClients = [
    "Consistent monthly revenue infrastructure (₹50L+ monthly run-rate preferred)",
    "Priority placed on sustainable, profit-focused growth over vanity GMV",
    "Openness to re-engineering systems rather than chasing temporary platform hacks",
    "High value placed on transparency, structured reporting, and long-term thinking"
  ];

  const nonIdealClients = [
    "Seeking silver bullets, shortcuts, or 'get rich quick' scaling tactics",
    "Requesting isolated execution (e.g., only ads) without systemic integration",
    "Expectation of overnight transformations without foundational stability",
    "Resistance to investing in the required infrastructure for high-scale operations"
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-40 px-6 border-t border-brandDark/5">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block: Minimalist Alignment */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/30 mb-6">
              Is this right for you?
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-brandDark tracking-tighter leading-[0.95]">
              We work best with brands ready to scale responsibly.
            </h2>
          </div>
          <div className="md:text-right pb-2">
            <p className="text-brandDark/40 text-sm font-medium leading-relaxed max-w-[240px] md:ml-auto">
              This isn’t a fit for everyone — and that’s intentional.
            </p>
          </div>
        </div>

        {/* The Split-State Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-brandDark/10">
          
          {/* Vertical Divider (Desktop) */}
          <div className="hidden lg:block absolute inset-y-0 left-1/2 w-[1px] bg-brandDark/10 -translate-x-1/2"></div>

          {/* Left Column: High Alignment */}
          <div className="lg:pr-20 py-16">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-2 h-2 rounded-full bg-brandDark"></div>
              <h3 className="text-[11px] font-bold text-brandDark uppercase tracking-[0.4em]">
                The Ideal Mandate
              </h3>
            </div>
            
            <div className="space-y-16">
              {idealClients.map((item, index) => (
                <div key={index} className="flex gap-8 group">
                  <span className="text-[10px] font-mono font-bold text-brandDark/20 pt-1.5">
                    FIT-0{index + 1}
                  </span>
                  <p className="text-xl md:text-2xl font-bold text-brandDark leading-[1.2] tracking-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Strategic Friction */}
          <div className="lg:pl-20 py-16 border-t lg:border-t-0 border-brandDark/10">
            <div className="flex items-center gap-3 mb-16">
              <div className="w-2 h-2 rounded-full bg-brandDark/10"></div>
              <h3 className="text-[11px] font-bold text-brandDark/30 uppercase tracking-[0.4em]">
                Conflict of Interest
              </h3>
            </div>
            
            <div className="space-y-16">
              {nonIdealClients.map((item, index) => (
                <div key={index} className="flex gap-8 opacity-40">
                  <span className="text-[10px] font-mono font-bold text-brandDark/20 pt-1.5">
                    ERR-0{index + 1}
                  </span>
                  <p className="text-xl md:text-2xl font-medium text-brandDark leading-[1.2] tracking-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Section Closure: The Integrity Note */}
        <div className="mt-32 pt-12 border-t border-brandDark/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-1">
              {[1, 2].map(i => (
                <div key={i} className="w-3 h-3 rounded-full border border-[#faf6ed] bg-brandDark/20"></div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em]">
              Selectivity Protocol Active
            </span>
          </div>
          
          <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.5em] text-center">
            Integrity in selection ensures excellence in execution
          </p>

          <div className="hidden md:block w-32 h-[1px] bg-brandDark/5"></div>
        </div>

      </div>
    </section>
  );
};
