import React from 'react';

export const DiagnosticSection: React.FC = () => {
  const points = [
    {
      title: "ROAS looks okay, bank balance doesn't",
      desc: "Platform data is inflating your ego while hidden costs kill your margins.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      title: "Scaling breaks your efficiency",
      desc: "Whenever you push budgets, the unit economics crumble instantly.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18" />
        </svg>
      )
    },
    {
      title: "Creatives die faster than before",
      desc: "Ad fatigue hits within days because you lack a structured testing lab.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "No clarity on what's actually working",
      desc: "Attribution mess means you're guessing where to put your next rupee.",
      icon: (
        <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Infrastructure */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block px-4 py-1.5 border border-brandYellow/30 rounded-full">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brandYellow block">The Hard Truth</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none">
            Traffic is coming in. <br />
            Profit is <span className="text-brandYellow italic">stuck.</span>
          </h2>
          <p className="text-brandDark/50 text-lg lg:text-xl font-bold max-w-xl mx-auto leading-relaxed">
            You're spending more than ever on ads. Orders are happening. But at the end of the month, the bank balance doesn't move.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Diagnostic Profile (Left) */}
          <div className="lg:col-span-7 bg-[#001d21] rounded-[2.5rem] p-10 lg:p-14 shadow-4xl flex flex-col justify-between">
            <div className="space-y-10">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em]">Diagnostic Profile</span>
              </div>

              <div className="space-y-10">
                {points.map((point, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:bg-brandYellow/10 transition-all">
                      {point.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight">{point.title}</h3>
                      <p className="text-white/40 text-sm lg:text-base font-medium leading-relaxed">
                        {point.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left italic">
                <p className="text-white/40 text-sm font-bold">"We don't blame the ads.</p>
                <p className="text-white text-sm font-bold">We fix the profit gap."</p>
              </div>
              <button className="px-10 py-4 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-widest rounded-xl hover:bg-white transition-all shadow-glow">
                Start Diagnosis
              </button>
            </div>
          </div>

          {/* Perspective & Focus (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Perspective Card */}
            <div className="flex-1 bg-[#fdf8f0] rounded-[2.5rem] p-10 lg:p-12 border border-brandDark/5 flex flex-col justify-center space-y-8 relative">
              <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.4em]">Founder Perspective</span>
              <div className="space-y-6">
                <h3 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tighter leading-none relative">
                  <span className="relative z-10">"Scaling a brand shouldn't feel like gambling with your own savings."</span>
                  <div className="absolute -bottom-1 left-0 w-2/3 h-2 bg-brandYellow/30 -z-0"></div>
                </h3>
                <p className="text-brandDark/50 text-base font-bold leading-relaxed">
                  Most agencies focus on spending your budget. We focus on building <span className="text-brandDark">growth systems</span> that protect your bottom line from rising platform costs.
                </p>
              </div>
            </div>

            {/* Focus Card */}
            <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 border border-brandDark/5 shadow-3xl space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-brandYellow rounded-md flex items-center justify-center">
                  <svg className="w-3 h-3 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.4em]">Our Focus Area</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {["Unit Economics", "Creative Velocity", "Retention Stacks", "Profit Integrity"].map((tag) => (
                  <div key={tag} className="px-4 py-3 bg-[#f8f9fa] rounded-xl border border-brandDark/5 text-center">
                    <span className="text-[9px] font-black text-brandDark/40 uppercase tracking-widest">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};