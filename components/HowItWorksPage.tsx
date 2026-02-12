import React from 'react';

interface HowItWorksPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const lifecycleSteps = [
    {
      num: "1",
      title: "Audit",
      desc: "Identifying leakage in current funnel & unit economics."
    },
    {
      num: "2",
      title: "Test",
      desc: "Weekly creative sprints to find winning hooks."
    },
    {
      num: "3",
      title: "Stabilize",
      desc: "Killing the waste and finding a baseline CAC."
    },
    {
      num: "4",
      title: "Scale",
      desc: "Deploying budget into proven creative/offer combos."
    },
    {
      num: "5",
      title: "Retain",
      desc: "Maximizing LTV via automated backend flows."
    }
  ];

  const communicationPillars = [
    {
      title: "The Weekly Pulse",
      desc: "Monday morning Loom walkthroughs of the previous week + the plan for the next 7 days."
    },
    {
      title: "Decision Ownership",
      desc: "We handle the day-to-day. You approve the creative directions and major budget shifts."
    },
    {
      title: "Asynchronous First",
      desc: "We value deep work. We use Slack for quick wins and Loom for deep dives. No useless 1-hour status calls."
    },
    {
      title: "Live Reporting",
      desc: "You get a custom Google Looker Studio dashboard. 24/7 access to real profit data."
    }
  ];

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Header Section */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              OUR PROCESS
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Trust the Process, <br />
              Not the Screenshot.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Most agencies lead with cherry-picked case studies from 2021. <br className="hidden lg:block" />
              We lead with the repeatable systems we use to drive growth today.
            </p>
          </div>
        </div>
      </section>

      {/* Why we don't lead with Case Studies */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white border-b border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-tight">
              Why we don't lead with Case Studies.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight">Context Matters</h3>
              <p className="text-brandDark/50 text-base lg:text-lg leading-relaxed font-medium">
                A 10x ROAS for a brand with a viral product doesn't mean the agency can repeat it for you. We focus on the inputs.
              </p>
            </div>
            
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight">Screenshots Lie</h3>
              <p className="text-brandDark/50 text-base lg:text-lg leading-relaxed font-medium">
                Ad manager screenshots ignore returns, COGS, and overheads. We care about your actual bank balance.
              </p>
            </div>

            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight">Systems are Static</h3>
              <p className="text-brandDark/50 text-base lg:text-lg leading-relaxed font-medium">
                Tactics change monthly. A repeatable growth system is the only way to ensure long-term stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Growth Lifecycle */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-[#f9f7f2] border-b border-brandDark/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 lg:mb-24 space-y-6">
            <h2 className="text-4xl lg:text-[64px] font-black text-brandDark tracking-tighter leading-tight">
              Our Growth Lifecycle
            </h2>
            <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              From first audit to stable scale, here is exactly how your brand moves through our system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {lifecycleSteps.map((step, i) => (
              <div 
                key={i} 
                className="bg-white border border-brandDark/5 rounded-[2rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group hover:shadow-4xl hover:-translate-y-1 transition-all duration-700 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="absolute top-4 right-6 text-[80px] lg:text-[110px] font-black text-brandDark/[0.04] leading-none select-none pointer-events-none group-hover:text-brandYellow/[0.1] transition-colors duration-700">
                  {step.num}
                </span>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight uppercase">
                    {step.title}
                  </h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we track performance */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.02] blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          <div className="lg:col-span-6 space-y-16 animate-slide-up">
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-[64px] font-black tracking-tighter leading-[0.9]">
                How we track <br /> performance.
              </h2>
              <p className="text-white/50 text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
                We ignore platform attribution and focus on the metrics that actually build wealth.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex gap-6 items-start group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brandYellow rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-5 h-5 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black tracking-tight">MER (Marketing Efficiency Ratio)</h3>
                  <p className="text-white/40 text-sm lg:text-base font-medium">Total Revenue / Total Ad Spend. This is our North Star.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brandYellow rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-5 h-5 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black tracking-tight">Blended CAC</h3>
                  <p className="text-white/40 text-sm lg:text-base font-medium">Total Marketing Cost / New Customers. We track this daily.</p>
                </div>
              </div>

              <div className="flex gap-6 items-start group">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brandYellow rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-5 h-5 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black tracking-tight">New-to-Brand Ratio</h3>
                  <p className="text-white/40 text-sm lg:text-base font-medium">Ensuring we are scaling through new reach, not just retargeting.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-[#002a2f] border border-white/5 rounded-[3rem] p-10 lg:p-14 shadow-4xl space-y-10 relative overflow-hidden group">
              <div className="space-y-2">
                <h3 className="text-xl lg:text-2xl font-black text-brandYellow tracking-tight uppercase">Decision Checkpoints</h3>
              </div>

              <div className="space-y-6">
                {[
                  { bold: "When to Scale:", text: "Blended MER is 20% above target for 3 consecutive days." },
                  { bold: "When to Pause:", text: "Ad-level CPA is 2x the 7-day average on new tests." },
                  { bold: "When to Pivot:", text: "Hook rate on new creative batch is below 15%." }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 lg:p-8 bg-brandDark/40 border border-white/5 rounded-2xl hover:bg-brandDark/60 transition-colors">
                    <p className="text-sm lg:text-base font-medium text-white/80 leading-relaxed">
                      <span className="font-black text-white">{item.bold}</span> {item.text}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandYellow/10 transition-all duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Quality Control & Communication */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-4xl lg:text-[56px] font-black text-brandDark tracking-tighter leading-tight">
              Quality Control & Communication
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {communicationPillars.map((pillar, i) => (
              <div 
                key={i} 
                className="bg-[#f8f8f8] rounded-[2rem] p-8 lg:p-12 space-y-4 hover:shadow-xl transition-all duration-500 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <h3 className="text-2xl lg:text-[28px] font-black text-brandDark tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-brandDark/60 text-base lg:text-lg font-medium leading-relaxed italic">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};