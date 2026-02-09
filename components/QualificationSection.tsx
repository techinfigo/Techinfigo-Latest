
import React from 'react';

export const QualificationSection: React.FC = () => {
  const idealClients = [
    "Revenue infrastructure (₹50L+ monthly run-rate)",
    "Priority on profit-focused growth over vanity GMV",
    "Openness to re-engineering core systems",
    "Long-term strategic execution thinking"
  ];

  const nonIdealClients = [
    "Seeking silver bullets or platform hacks",
    "Requesting isolated execution without systems",
    "Expectation of overnight transformations",
    "Resistance to investing in infrastructure"
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-24 lg:py-40 px-4 sm:px-6 border-t border-brandDark/5">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 lg:mb-32 gap-8">
          <div className="max-w-2xl">
            <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.5em] uppercase text-brandDark/30 mb-4 block">Selectivity</span>
            <h2 className="text-3xl lg:text-6xl font-bold text-brandDark tracking-tighter leading-tight">
              We work best with brands ready to scale responsibly.
            </h2>
          </div>
          <p className="text-brandDark/40 text-sm italic lg:max-w-[200px] border-l-2 border-brandDark/10 pl-4">
            "Integrity in selection ensures excellence in execution."
          </p>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 border-t border-brandDark/10">
          <div className="hidden lg:block absolute inset-y-0 left-1/2 w-[1px] bg-brandDark/10 -translate-x-1/2"></div>

          <div className="lg:pr-20 py-12 lg:py-16">
            <h3 className="text-[10px] font-bold text-brandDark uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brandDark"></span>
              The Ideal Mandate
            </h3>
            <div className="space-y-10 lg:space-y-16">
              {idealClients.map((item, index) => (
                <div key={index} className="flex gap-6 group">
                  <span className="text-[9px] font-mono text-brandDark/20 pt-1">FIT_0{index + 1}</span>
                  <p className="text-lg lg:text-2xl font-bold text-brandDark tracking-tight leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-20 py-12 lg:py-16 border-t lg:border-t-0 border-brandDark/10">
            <h3 className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.4em] mb-12 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brandDark/10"></span>
              Strategic Friction
            </h3>
            <div className="space-y-10 lg:space-y-16 opacity-40">
              {nonIdealClients.map((item, index) => (
                <div key={index} className="flex gap-6">
                  <span className="text-[9px] font-mono text-brandDark/20 pt-1">ERR_0{index + 1}</span>
                  <p className="text-lg lg:text-2xl font-medium text-brandDark tracking-tight leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
