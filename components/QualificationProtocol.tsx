import React from 'react';

export const QualificationProtocol: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-brandDark/30 block">Qualification Protocol</span>
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter">
            ARE YOU A SCALER OR <span className="text-brandYellow italic">A GAMBLER?</span>
          </h2>
          <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Alignment is the secret ingredient to a 100% success rate. <br className="hidden lg:block" />
            We only partner with one of these characters.
          </p>
        </div>

        {/* Comparison Card */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-4xl border border-brandDark/5 flex flex-col lg:flex-row min-h-[700px]">
          
          {/* Left Side: The Scaler */}
          <div className="flex-1 bg-brandDark p-8 lg:p-16 relative overflow-hidden flex flex-col">
            {/* Background Glow */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-brandYellow/10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 space-y-12 flex-grow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-brandYellow/20 flex items-center justify-center p-4">
                     <div className="w-full h-full rounded-full border-2 border-brandYellow/40 flex items-center justify-center">
                        <div className="w-4 h-4 bg-brandYellow rounded-full shadow-glow"></div>
                     </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-6 h-6 rounded-lg flex items-center justify-center border-4 border-brandDark">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase leading-none">The Scaler</h3>
                  <p className="text-brandYellow text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Our Ideal Partner Profile</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/5 pb-4">Mindset Architecture</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Revenue Base', val: '₹20L+ Monthly', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2z M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v10 M17 19v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2' },
                    { label: 'North Star', val: 'MER & Contribution', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    { label: 'Time Horizon', val: 'Compounding Weeks', icon: 'M7 12l3-3 3 3 4-4' },
                    { label: 'Infrastructure', val: 'Shopify Ecosystem', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/[0.08] transition-all">
                      <div className="flex items-center gap-3 mb-2">
                         <svg className="w-4 h-4 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                         </svg>
                         <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-xs lg:text-sm font-black text-white uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-brandYellow/10 rounded-3xl p-8 italic relative">
                <span className="absolute -top-3 left-6 text-4xl text-brandYellow/20">"</span>
                <p className="text-white/70 text-base lg:text-lg font-medium leading-relaxed text-center">
                  I want a system that makes scaling predictable so I can focus on my product roadmap.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Gambler */}
          <div className="flex-1 bg-[#f8f9fa] p-8 lg:p-16 flex flex-col relative overflow-hidden">
            <div className="relative z-10 space-y-12 flex-grow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-red-500/10 flex items-center justify-center bg-white shadow-sm">
                     <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-red-500 w-6 h-6 rounded-lg flex items-center justify-center border-4 border-[#f8f9fa]">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tighter uppercase leading-none">The Gambler</h3>
                  <p className="text-red-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Old-School Agency Mindset</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-brandDark/20 text-[10px] font-black uppercase tracking-[0.4em] border-b border-brandDark/5 pb-4">High Risk Architecture</p>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Budget Base', val: '₹10K–20K Total', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                    { label: 'North Star', val: 'Instant ROAS Hacks', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Time Horizon', val: 'Daily Volatility', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                    { label: 'Infrastructure', val: 'Dropship / Arbitrage', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-brandDark/5 rounded-2xl p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                         <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                         </svg>
                         <span className="text-[8px] font-bold text-brandDark/30 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-xs lg:text-sm font-black text-brandDark uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-brandDark/[0.03] border border-brandDark/5 rounded-3xl p-8 italic relative">
                <span className="absolute -top-3 left-6 text-4xl text-brandDark/10">"</span>
                <p className="text-brandDark/50 text-base lg:text-lg font-medium leading-relaxed text-center">
                  I just want to run some ads and see if I can get some quick sales before my budget runs out.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-red-500/40 text-[9px] font-black uppercase tracking-[0.4em]">We decline 80% of inquiries to ensure scaler success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};