import React from 'react';

interface SystemPageProps {
  onNavigate: (page: string) => void;
}

export const SystemPage: React.FC<SystemPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. Header Section */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              THE SYSTEM
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl uppercase">
              One System. <br />
              No Custom Chaos.
            </h1>
            
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              You aren't paying for hours, freelancers, or random tasks. <br className="hidden lg:block" />
              You are deploying a fixed growth framework that removes <br className="hidden lg:block" />
              guesswork from scaling.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Month 1: The Foundation */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-white border-b border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24 space-y-6 animate-slide-up">
            <h2 className="text-4xl lg:text-[64px] font-black text-brandDark tracking-tighter leading-[1.1]">
              Month 1: The Foundation
            </h2>
            <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-3xl mx-auto">
              We don't 'test' in Month 1. We diagnose and build the infrastructure required for profit.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                title: "Audit & Diagnosis",
                desc: "Deep dive into Unit Economics, past ad data, and pixel health to find the 'leaky' parts of your funnel.",
                icon: (
                  <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )
              },
              {
                title: "Paid Ads Structure",
                desc: "Complete account rebuild using our Broad-Scaling framework. Simplified, stable, and ready for spend.",
                icon: (
                  <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                )
              },
              {
                title: "Creative Testing Lab",
                desc: "Setting up the testing environment to isolate winning hooks, angles, and formats without wasting budget.",
                icon: (
                  <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.183.244l-.28.19a2 2 0 00-.587 2.783l.19.28a2 2 0 002.783.587l.28-.19a2 2 0 002.244-1.183l-.317-1.583a6 6 0 01.517-3.86l.158-.318a6 6 0 00.517-3.86l-.477-2.387a2 2 0 00-.547-1.022" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 3v2m6-2v2M4 11h2m12 0h2" />
                  </svg>
                )
              },
              {
                title: "Funnel Review",
                desc: "Technical and psychological review of your landing pages to ensure message-match with our new ads.",
                icon: (
                  <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              }
            ].map((item, i) => (
              <div key={i} className="bg-[#f8f8f8] border border-brandDark/5 rounded-[2.5rem] p-10 flex flex-col items-center text-center space-y-8 group hover:bg-white hover:shadow-4xl transition-all duration-700 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-brandDark flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Month 2+: Execution Rhythm */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-[#fdfaf5] border-b border-brandDark/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-24 lg:mb-32 space-y-6 animate-slide-up">
            <h2 className="text-4xl lg:text-[64px] font-black text-brandDark tracking-tighter leading-[1.1]">
              Month 2+: Execution Rhythm
            </h2>
            <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-3xl mx-auto">
              Once the foundation is set, we move into a high-velocity feedback loop.
            </p>
          </div>

          {/* Timeline Structure */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brandDark/10 -translate-x-1/2 hidden lg:block"></div>

            <div className="space-y-12 lg:space-y-24">
              {[
                { 
                  num: "1", 
                  title: "Testing", 
                  desc: "Deploying weekly creative sprints to find new winners.", 
                  align: "left" 
                },
                { 
                  num: "2", 
                  title: "Optimization", 
                  desc: "Killing losers and trimming waste across Meta & Google.", 
                  align: "right" 
                },
                { 
                  num: "3", 
                  title: "Scaling", 
                  desc: "Systematically increasing budget on proven creative/offer combos.", 
                  align: "left" 
                },
                { 
                  num: "4", 
                  title: "Strategy", 
                  desc: "Weekly Loom walkthroughs + Monthly Scale Sessions.", 
                  align: "right" 
                }
              ].map((step, i) => (
                <div key={i} className={`flex flex-col lg:flex-row items-center relative ${step.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content Card */}
                  <div className={`w-full lg:w-[42%] bg-white p-10 lg:p-12 rounded-[2.5rem] shadow-sm border border-brandDark/5 animate-slide-up ${step.align === 'left' ? 'lg:text-right' : 'lg:text-left'}`} style={{ animationDelay: `${i * 0.15}s` }}>
                    <h3 className="text-2xl lg:text-3xl font-black text-brandDark mb-4 tracking-tight uppercase">
                      {step.title}
                    </h3>
                    <p className="text-brandDark/50 text-base lg:text-lg font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Spacer for Desktop Line */}
                  <div className="hidden lg:block w-[16%]"></div>

                  {/* Timeline Number Node */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex w-12 h-12 rounded-full bg-brandYellow items-center justify-center text-brandDark font-black text-base shadow-glow border-4 border-[#fdfaf5] z-10 transition-transform hover:scale-110 duration-300">
                    {step.num}
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden lg:block w-[42%]"></div>

                  {/* Mobile Number Indicator (Only visible on small screens) */}
                  <div className="lg:hidden mt-6 w-10 h-10 rounded-full bg-brandYellow flex items-center justify-center text-brandDark font-black text-sm shadow-md">
                    {step.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Filter: Engagement Rules (NEW SECTION) */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.02] blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 lg:mb-24 space-y-6 animate-slide-up">
            <span className="text-brandYellow font-mono text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.4em] block">
              THE FILTER
            </span>
            <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
              Engagement Rules
            </h2>
            <p className="text-white/40 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              We only work with founders who respect the process. Read these before booking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 animate-slide-up">
            {[
              { 
                label: "COMMITMENT", 
                title: "3-Month Minimum", 
                desc: "Growth takes time to compound. We don't do 'one-month trials'." 
              },
              { 
                label: "RETAINER", 
                title: "₹40k – ₹75k / Mo", 
                desc: "Fixed monthly fee based on complexity, not % of spend." 
              },
              { 
                label: "BILLING", 
                title: "100% Advance", 
                desc: "Monthly billing starts on the day of signup. No exceptions." 
              },
              { 
                label: "GUARANTEES", 
                title: "No ROI Guarantees", 
                desc: "We guarantee the process and input. We don't control the market." 
              },
              { 
                label: "DISCOUNTS", 
                title: "No Discounts", 
                desc: "Our system is productized for a reason. The price is the price." 
              },
              { 
                label: "AVAILABILITY", 
                title: "2 Brands / Quarter", 
                desc: "We maintain a low client-to-strategist ratio for deep focus." 
              }
            ].map((rule, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-white/5 rounded-[2rem] p-10 lg:p-14 space-y-4 hover:bg-white/[0.05] transition-all duration-500 group">
                <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.3em] block opacity-60">
                  {rule.label}
                </span>
                <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                  {rule.title}
                </h3>
                <p className="text-white/40 text-base lg:text-lg font-medium leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. The Modular Growth Stack */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle, #001d21 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
             
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 space-y-6">
            <span className="text-[11px] font-black text-brandDark/20 uppercase tracking-[0.5em] font-mono">Modular Architecture</span>
            <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter">The Scaling Stack.</h2>
          </div>

          <div className="space-y-8 lg:space-y-4">
            {[
              { 
                layer: "Layer 03", 
                title: "Retention & LTV Compound", 
                focus: "Klaviyo + SMS + Loyalty",
                desc: "Where the real profit is made. We orchestrate automated loops that turn one-time buyers into lifetime advocates through behavioral segmentation.",
                metrics: ["LTV: 2.4x Lift", "Repeat Rate: +18%"]
              },
              { 
                layer: "Layer 02", 
                title: "Acquisition Media Engine", 
                focus: "Meta + Google + TikTok",
                desc: "Performance-first media buying governed by contribution margin guardrails. No scaling happens without variable isolation and hook testing.",
                metrics: ["CAC: -22%", "Spend Velocity: 3x"]
              },
              { 
                layer: "Layer 01", 
                title: "Infrastructure & Data", 
                focus: "Tracking + Funnels + P&L",
                desc: "The foundation. We implement server-side tracking and unit-economic dashboards to ensure we aren't flying blind on platform data.",
                metrics: ["Data Integrity: 98%", "Latency: 0ms"]
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-brandDark/5 rounded-[3rem] p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 group hover:border-brandYellow transition-all duration-500 shadow-sm hover:shadow-4xl">
                <div className="lg:col-span-3 space-y-2">
                  <span className="text-[11px] font-mono font-black text-brandYellow tracking-widest">{item.layer}</span>
                  <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-widest">{item.focus}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-xl lg:text-2xl text-brandDark/60 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-center gap-4 border-l border-brandDark/5 pl-8 lg:pl-12">
                   {item.metrics.map((m, idx) => (
                     <div key={idx}>
                        <p className="text-[9px] font-bold text-brandDark/20 uppercase tracking-widest">Benchmark</p>
                        <p className="text-2xl font-black text-brandDark">{m}</p>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Variable Isolation Protocol */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-brandYellow font-mono text-[11px] font-bold tracking-[0.4em] uppercase">R&D Laboratory</span>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none">
                Variable <br />
                <span className="text-brandYellow italic">Isolation.</span>
              </h2>
            </div>
            <p className="text-white/50 text-xl lg:text-2xl font-medium leading-relaxed">
              Scaling is the process of removing uncertainty. We don't "test" everything at once. We isolate one variable—a hook, a price point, or a landing page—in a sandbox environment before we commit your scale budget.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
               <div className="space-y-2">
                 <p className="text-4xl font-black text-brandYellow">25+</p>
                 <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Weekly Creative Hooks Isolated</p>
               </div>
               <div className="space-y-2">
                 <p className="text-4xl font-black text-white">100%</p>
                 <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Statistical Significance Buffer</p>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="bg-[#002a2f] border border-white/5 p-10 lg:p-16 rounded-[4rem] shadow-glow space-y-10 relative z-10">
                <div className="space-y-6">
                  {["Creative Hook backtesting", "Offer elasticity mapping", "Landing page delta tests", "Bidding protocol iterations"].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brandYellow group-hover:bg-brandYellow group-hover:text-brandDark transition-all">
                        <span className="font-mono font-bold text-xs">0{i+1}</span>
                      </div>
                      <span className="text-xl font-bold text-white/80 group-hover:text-white transition-colors">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <p className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em] text-center">Protocol: Scientific Method V2</p>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-brandYellow/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brandYellow/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* 7. The MER Engine Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-10">
              <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-[0.9]">
                The Profit <br />
                Guardrails.
              </h2>
              <p className="text-xl lg:text-2xl text-brandDark/50 font-medium leading-relaxed">
                Platform ROAS is a vanity metric. We ignore it. Our system optimizes for <span className="text-brandDark">Marketing Efficiency Ratio (MER)</span>—the direct correlation between total spend and net revenue—ensuring your scale doesn't cannibalize your profit.
              </p>
              <div className="p-8 bg-brandBg border-2 border-dotted border-brandYellow/30 rounded-3xl">
                 <p className="text-sm font-bold text-brandDark italic">
                   "If the blended MER drops below your contribution threshold, our system triggers a cooling protocol. Automatically."
                 </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-brandDark/5 border border-brandDark/5 rounded-[3rem] overflow-hidden">
               <div className="bg-white p-12 space-y-8">
                  <span className="text-[11px] font-black text-brandDark/20 uppercase tracking-widest font-mono">Traditional Model</span>
                  <div className="space-y-4 opacity-40">
                    <p className="text-2xl font-black text-brandDark">Spend until <br /> the dashboard <br /> looks green.</p>
                    <div className="w-full h-1 bg-brandDark/10 rounded-full"></div>
                    <p className="text-xs font-bold text-brandDark/40">RESULT: THE PROFIT SQUEEZE</p>
                  </div>
               </div>
               <div className="bg-[#fffcf5] p-12 space-y-8">
                  <span className="text-[11px] font-black text-brandYellow uppercase tracking-widest font-mono">Techinfigo Model</span>
                  <div className="space-y-4">
                    <p className="text-2xl font-black text-brandDark">Spend only if <br /> contribution <br /> margin allows.</p>
                    <div className="w-full h-1 bg-brandYellow rounded-full"></div>
                    <p className="text-xs font-bold text-brandYellow">RESULT: ENGINEERED WEALTH</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Integration CTA */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-5xl mx-auto bg-brandDark rounded-[4rem] p-12 lg:p-24 text-center space-y-16 shadow-4xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fcb63210_0%,_transparent_70%)]"></div>
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl lg:text-8xl font-black text-white tracking-tighter leading-none">
              Sync Your <br />
              <span className="text-brandYellow">Ledger.</span>
            </h2>
            <p className="text-white/40 text-xl lg:text-2xl max-w-2xl mx-auto font-medium">
              Ready to install a growth engine that actually cares about your bank balance?
            </p>
          </div>

          <button 
            onClick={() => onNavigate('contact')}
            className="relative z-10 px-16 py-8 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-glow"
          >
            Request System Audit
          </button>
          
          <div className="relative z-10 pt-12 border-t border-white/5 opacity-20">
             <p className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.5em]">SYSTEM_STANDBY_MODE // READY_FOR_DEPLOYMENT</p>
          </div>
        </div>
      </section>
    </div>
  );
};