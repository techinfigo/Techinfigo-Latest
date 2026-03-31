'use client';

import React from 'react';

interface QualificationPageProps {
  onNavigate: (page: string) => void;
}

export const QualificationPage: React.FC<QualificationPageProps> = ({ onNavigate }) => {
  const greenLights = [
    {
      ref: "REF 01",
      title: "Scaling D2C Brands",
      subtitle: "REVENUE: ₹20L - ₹2CR / MO",
      desc: "You have found product-market fit and your unit economics are healthy. You aren't looking for a 'magic fix' — you want a reliable growth engine to scale what already works.",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      ref: "REF 02",
      title: "Founder-Led Vision",
      subtitle: "DECISION-MAKERS INVOLVED",
      desc: "We work best with founders closely connected to their brand. You value transparency and want a partner who acts as an extension of your team, not a hidden vendor.",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      ref: "REF 03",
      title: "Data-Driven Mindsets",
      subtitle: "LOGIC OVER EMOTION",
      desc: "You understand that growth is a scientific process of testing. You value long-term compounding systems over 'quick hacks' or vanity metrics like impressions.",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const redFlags = [
    {
      title: "Pure Dropshippers",
      subtitle: "NO BRAND CONTROL",
      desc: "We focus on brands with unique products. High-turnover arbitrage models don't benefit from our compounding creative and retention frameworks.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    {
      title: "Short-Term Thinkers",
      subtitle: "NEED INSTANT ROAS",
      desc: "Our system requires a minimum 3-month commitment. Real growth takes time to stabilize; we don't do 'one-month trials' for desperate brands.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Low Budget Experiments",
      subtitle: "LACK OF DATA VELOCITY",
      desc: "To gather enough data for our systems to work, we require a minimum monthly ad spend of ₹1.5L+. Anything less prevents statistical significance.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              WHO WE FIT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              The Filter: Who We Work <br /> With.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Our Growth System is a high-performance engine. It requires the <br className="hidden lg:block" /> right brand fuel and the right environment to deliver outsized, <br className="hidden lg:block" /> profitable results.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION: The "Ideal Partner" Green Lights */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#f9f7f2]">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="space-y-10 animate-slide-up">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brandDark rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse"></div>
              <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">
                HIGH CONVICTION ALIGNMENT
              </span>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9]">
                The <span className="text-brandYellow italic underline decoration-brandDark/10 underline-offset-8">"Ideal Partner"</span> <br />
                Green Lights.
              </h2>
              <p className="text-brandDark/60 text-lg lg:text-xl font-bold max-w-2xl leading-relaxed">
                We prioritize brands where our specific systems can have the <br className="hidden lg:block" />
                highest impact on <span className="text-brandDark">Net Profit</span>, not just platform ROAS.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {greenLights.map((light, i) => (
              <div 
                key={i} 
                className="bg-white rounded-[3rem] p-10 lg:p-12 shadow-3xl border border-brandDark/5 flex flex-col items-start space-y-8 relative group hover:shadow-4xl transition-all duration-700 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="absolute top-8 right-10">
                  <span className="bg-brandYellow/10 text-brandYellow text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">{light.ref}</span>
                </div>
                
                <div className="w-16 h-16 rounded-[1.25rem] bg-brandDark flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500">
                  {light.icon}
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight leading-none uppercase">
                      {light.title}
                    </h3>
                    <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em]">
                      {light.subtitle}
                    </p>
                  </div>
                  <p className="text-brandDark/60 text-sm lg:text-base font-medium leading-relaxed">
                    {light.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: We are NOT a fit if... */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="space-y-6 animate-slide-up">
            <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em] block">PROTECTIVE FILTER</span>
            <h2 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9]">
              We are <span className="text-brandYellow">NOT</span> a fit if...
            </h2>
            <p className="text-brandDark/60 text-lg lg:text-xl font-medium max-w-2xl leading-relaxed">
              This isn't about being exclusive—it's about protecting your budget and our <br className="hidden lg:block" /> 
              reputation from failed alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {redFlags.map((flag, i) => (
              <div 
                key={i} 
                className="bg-[#fdfaf5] rounded-[3rem] p-10 lg:p-14 space-y-8 flex flex-col items-start transition-all duration-500 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-brandDark/5 rounded-xl flex items-center justify-center text-brandDark/40">
                  {flag.icon}
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight">
                      {flag.title}
                    </h3>
                    <p className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.3em]">
                      {flag.subtitle}
                    </p>
                  </div>
                  <p className="text-brandDark/60 text-sm lg:text-base font-medium leading-relaxed">
                    {flag.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: We aren't a "Yes Agency." (Culture of No) */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brandYellow/[0.03] rounded-full blur-[120px] pointer-events-none -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brandYellow/[0.02] rounded-full blur-[120px] pointer-events-none -ml-48 -mb-48"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-12 animate-slide-up">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-8 h-[2px] bg-brandYellow"></div>
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandYellow/60 block font-mono">CULTURE OF NO</span>
              </div>
              
              <h2 className="text-5xl lg:text-[100px] font-black text-white tracking-tighter leading-[0.85]">
                We aren't a <br />
                <span className="relative inline-block text-brandYellow italic">
                  "Yes Agency."
                  <svg className="absolute -bottom-4 left-0 w-full h-4 text-brandYellow/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h2>

              <p className="text-white/50 text-xl lg:text-2xl font-medium leading-relaxed max-w-xl">
                Most agencies say yes to any brand with a budget. We decline <span className="text-white font-bold">80% of inquiries</span> so we can maintain an obsessive focus on our existing partners.
              </p>
            </div>

            <div className="space-y-8 pt-6">
              {[
                { title: "Direct Access", desc: "Senior strategists only. No junior Account Managers." },
                { title: "Capped Partnerships", desc: "Max 2 new brands per quarter to protect quality." },
                { title: "Profit First", desc: "Obsession over contribution margin and net profit." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                   <div className="w-6 h-6 rounded-full bg-brandYellow flex items-center justify-center shrink-0 mt-1 shadow-[0_0_15px_rgba(252,182,50,0.4)]">
                      <svg className="w-3.5 h-3.5 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                      </svg>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight group-hover:text-brandYellow transition-colors">{item.title}</h3>
                      <p className="text-white/40 text-sm lg:text-base font-medium">{item.desc}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Graphic */}
          <div className="lg:col-span-5 relative flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
             {/* Concentric Rings Visual */}
             <div className="relative w-full aspect-square max-w-[450px] flex items-center justify-center">
                {/* Outer Ring 1 */}
                <div className="absolute inset-0 border border-white/5 rounded-full scale-[1.15]"></div>
                {/* Outer Ring 2 */}
                <div className="absolute inset-0 border border-brandYellow/5 rounded-full scale-[1]"></div>
                {/* Outer Ring 3 (Dashed) */}
                <div className="absolute inset-0 border border-dotted border-white/10 rounded-full scale-[0.85]"></div>
                
                {/* Center Shield Box */}
                <div className="relative w-40 h-40 lg:w-48 lg:h-48 bg-brandYellow/[0.08] backdrop-blur-3xl rounded-[2.5rem] border border-brandYellow/20 flex flex-col items-center justify-center gap-4 group hover:bg-brandYellow/[0.12] transition-colors duration-700 shadow-glow">
                   <div className="w-16 h-16 lg:w-20 lg:h-20 bg-brandYellow rounded-3xl flex items-center justify-center text-brandDark shadow-2xl transition-transform duration-700 group-hover:scale-110">
                      <svg className="w-8 h-8 lg:w-10 lg:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                   </div>
                   <div className="text-center space-y-1">
                      <p className="text-[10px] font-black text-brandYellow uppercase tracking-[0.5em] leading-none">GUARDED</p>
                      <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">QUALITY OVER VOLUME</p>
                   </div>
                </div>

                {/* Floating Status Indicator */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 bg-brandDark border border-white/10 rounded-full shadow-2xl">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <span className="text-[9px] font-black text-white/60 uppercase tracking-widest whitespace-nowrap">STATUS: SECURE HANDOFF</span>
                </div>
             </div>
          </div>

        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#fcfcfc] border-t border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-56">
            <div className="bg-white p-12 lg:p-20 rounded-[3rem] border border-brandDark/5 space-y-16 animate-slide-up">
              <div className="space-y-4">
                <span className="px-4 py-2 bg-brandYellow/10 text-brandYellow rounded-full text-[10px] font-bold uppercase tracking-widest">Ideal Sync</span>
                <h3 className="text-5xl font-black text-brandDark tracking-tighter">The Mandate</h3>
              </div>
              <div className="space-y-10">
                {[
                  "Revenue: ₹50L - ₹2Cr monthly run-rate",
                  "Product: Strong market fit with 15%+ organic repurchase",
                  "Mindset: Data-driven founders who value unit economics",
                  "Infrastructure: Professional logistics & supply chain"
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-8 h-8 rounded-full bg-brandDark text-brandYellow flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <p className="text-2xl font-bold text-brandDark tracking-tight leading-none pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-brandDark p-12 lg:p-20 rounded-[3rem] space-y-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-4">
                <span className="px-4 py-2 bg-white/5 text-white/40 rounded-full text-[10px] font-bold uppercase tracking-widest">Strategic Friction</span>
                <h3 className="text-5xl font-black text-white tracking-tighter">The Rejection</h3>
              </div>
              <div className="space-y-10 opacity-60">
                {[
                  "Seeking quick 'hacks' instead of systems",
                  "Resistance to re-engineering P&L architecture",
                  "Isolated channel focus without attribution",
                  "Under ₹20L monthly revenue (Seed phase)"
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </div>
                    <p className="text-2xl font-bold text-white tracking-tight leading-none pt-1">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center animate-slide-up">
            <p className="text-brandDark/30 text-xs font-bold uppercase tracking-[0.5em] mb-8">Ready to confirm your alignment?</p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brandDark text-white px-12 py-6 rounded-xl font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl"
            >
              Apply for Growth Audit
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};