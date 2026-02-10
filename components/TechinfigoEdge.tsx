import React from 'react';

export const TechinfigoEdge: React.FC<{ onBookAudit: () => void }> = ({ onBookAudit }) => {
  const pillars = [
    {
      label: "WE DON'T CHASE ROAS",
      title: "We track MER",
      desc: "Platform attribution is broken. We optimize for the only number that matters: Net Sales / Ad Spend.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 12l3-3 3 3 4-4" />
        </svg>
      )
    },
    {
      label: "WE DON'T SCALE EMOTIONALLY",
      title: "We scale on data",
      desc: "No 'gut feelings.' We use a rigorous 7-day statistically significant framework for every budget bump.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      label: "WE DON'T SELL SERVICES",
      title: "We build systems",
      desc: "You aren't buying 'graphic design' or 'media buying.' You're deploying a repeatable creative lab.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      label: "WE DON'T PROMISE NUMBERS",
      title: "We promise process",
      desc: "Outcomes are the result of excellence. Our daily inputs are what guarantee long-term stable scale.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-24 lg:py-40 px-6 bg-brandDark overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          
          {/* Left Side: Manifesto */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-40 h-fit">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brandYellow/40 block">THE TECHINFIGO EDGE</span>
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.9]">
                We don't "run ads." <br />
                <span className="text-brandYellow italic underline decoration-white/10 underline-offset-8">We engineer systems.</span>
              </h2>
            </div>
            <p className="text-white/50 text-lg lg:text-xl font-medium leading-relaxed max-w-lg">
              Comparison with standard agencies ends here. Most sell you labor; we deploy a <span className="text-white border-b border-brandYellow pb-0.5">profit-first engine</span> that compounds learnings every week.
            </p>

            <div className="inline-flex items-center gap-5 p-6 bg-white/[0.03] border border-white/5 rounded-3xl backdrop-blur-sm">
              <div className="w-10 h-10 rounded-xl bg-brandYellow flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs font-bold text-white uppercase tracking-wider leading-relaxed">
                Eliminating the agency-founder <br /> attribution disconnect.
              </p>
            </div>
          </div>

          {/* Right Side: Differentiation Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((item, idx) => (
              <div key={idx} className="bg-white/[0.04] border border-white/5 p-10 rounded-[2.5rem] space-y-8 hover:bg-white/[0.06] transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-brandYellow/10 transition-all">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <span className="text-[9px] font-black text-brandYellow uppercase tracking-[0.3em] block opacity-80">{item.label}</span>
                  <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-brandYellow rounded-[3rem] p-10 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-4xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="space-y-4 text-center md:text-left relative z-10">
            <span className="text-[10px] font-black text-brandDark/40 uppercase tracking-[0.5em]">ENGAGEMENT MODEL</span>
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">
              Productized <br className="hidden lg:block" /> Scaling. No <br className="hidden lg:block" /> Custom Chaos.
            </h2>
          </div>

          <button 
            onClick={onBookAudit}
            className="px-10 py-6 bg-brandDark text-white font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-white hover:text-brandDark transition-all duration-500 shadow-2xl shrink-0 z-10"
          >
            Apply Free Growth Audit
          </button>
        </div>
      </div>
    </section>
  );
};