import React from 'react';

export const BottleneckExpertise: React.FC = () => {
  const bottlenecks = [
    {
      ref: "CASE REF: 01",
      problem: "High CAC",
      solution: "Creative testing engine",
      desc: "Isolating winning hooks and angles to lower your cost-per-acquisition.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
        </svg>
      )
    },
    {
      ref: "CASE REF: 02",
      problem: "Low ROAS",
      solution: "Offer & funnel diagnosis",
      desc: "Fixing the disconnect between your ad promise and landing page checkout.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      ref: "CASE REF: 03",
      problem: "Inconsistent Sales",
      solution: "Scaling rules",
      desc: "Removing emotion from budget adjustments with strict data-driven guardrails.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      ref: "CASE REF: 04",
      problem: "Messy Data",
      solution: "Blended tracking system",
      desc: "Implementing server-side tracking to see the real impact on your bank balance.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3m0 18a10.003 10.003 0 01-8.213-4.282m12.135-1.964l.054.09A10.003 10.003 0 0021 11M12 3v18" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-white font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 space-y-6">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brandYellow block">DIAGNOSTIC FOCUS</span>
          <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none">
            Deep Expertise in <br />
            Your <span className="text-brandYellow">Biggest Bottlenecks.</span>
          </h2>
          <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
            We don't do 'general' marketing. We solve specific D2C growth problems with proven frameworks.
          </p>
        </div>

        {/* Bottlenecks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bottlenecks.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-[#fdf8f0] rounded-[2.5rem] p-10 lg:p-14 border border-brandDark/5 flex flex-col justify-between relative group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
            >
              <div className="absolute top-10 right-10">
                <span className="text-[9px] font-bold text-brandDark/20 uppercase tracking-[0.2em]">{item.ref}</span>
              </div>
              
              <div className="space-y-12">
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight flex flex-wrap items-center gap-x-4">
                    <span className="text-brandYellow underline decoration-brandYellow/30 underline-offset-4">{item.problem}</span>
                    <span className="text-brandDark/20 font-light">→</span>
                    <span>{item.solution}</span>
                  </h3>
                  <p className="text-brandDark/50 text-base lg:text-lg font-medium leading-relaxed max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};