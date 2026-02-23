import React from 'react';

export const QualificationProtocol: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-[#f9f6f2] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#a5a5a5] block">Qualification Protocol</span>
          <h2 className="text-4xl lg:text-6xl font-black text-[#001d1a] tracking-tight">
            ARE YOU A SCALER OR <span className="text-[#fbb632]">A GAMBLER?</span>
          </h2>
          <p className="text-[#001d1a]/60 text-lg font-bold max-w-2xl mx-auto leading-relaxed">
            Alignment is the secret ingredient to a 100% success rate. We only <br className="hidden lg:block" /> partner with one of these characters.
          </p>
        </div>

        {/* Comparison Card */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:row-span-2 lg:flex-row min-h-[720px] bg-white">
          
          {/* Left Side: The Scaler */}
          <div className="flex-1 bg-[#001d1a] p-10 lg:p-14 relative overflow-hidden flex flex-col">
            {/* Background Subtle Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#fbb632]/10 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {/* Concentric Circle Icon */}
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center p-3">
                     <div className="w-full h-full rounded-full border border-[#fbb632]/40 flex items-center justify-center">
                        <div className="w-4 h-4 bg-[#fbb632] rounded-full shadow-[0_0_20px_rgba(251,182,50,0.8)]"></div>
                     </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#34d399] w-7 h-7 rounded-lg flex items-center justify-center border-[3px] border-[#001d1a] shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">The Scaler</h3>
                  <p className="text-[#fbb632] text-[9px] font-black uppercase tracking-[0.2em] mt-2">Our Ideal Partner Profile</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.4em]">Mindset Architecture</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Revenue Base', val: '₹20L+ Monthly', icon: 'M12 20V10M6 20V16M18 20V4' },
                    { label: 'North Star', val: 'MER & Contribution', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    { label: 'Time Horizon', val: 'Compounding Weeks', icon: 'M7 12l3-3 3 3 4-4' },
                    { label: 'Infrastructure', val: 'Shopify Ecosystem', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/[0.03] border border-white/[0.05] rounded-3xl p-6 transition-all hover:bg-white/[0.06]">
                      <div className="flex items-center gap-3 mb-3">
                         <svg className="w-6 h-6 text-[#fbb632]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                         </svg>
                         <span className="text-[11px] font-bold text-[#fbb632] uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-sm lg:text-base font-black text-white uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-transparent border border-white/10 rounded-[2.5rem] p-8 lg:p-10 relative mt-4">
                <p className="text-white/80 text-base font-bold leading-relaxed text-center italic">
                  "I want a system that makes scaling predictable so I can focus on my product roadmap."
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Gambler */}
          <div className="flex-1 bg-[#f5f5f5] p-10 lg:p-14 flex flex-col relative overflow-hidden">
            <div className="relative z-10 space-y-12">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {/* Skull Icon Placeholder */}
                  <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-sm">
                     <svg className="w-10 h-10 text-red-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-red-500 w-7 h-7 rounded-lg flex items-center justify-center border-[3px] border-[#f5f5f5] shadow-lg">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-[#001d1a] tracking-tight uppercase leading-none">The Gambler</h3>
                  <p className="text-red-500 text-[9px] font-black uppercase tracking-[0.2em] mt-2">Old-School Agency Mindset</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-black/20 text-[9px] font-black uppercase tracking-[0.4em]">High Risk Architecture</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Budget Base', val: '₹10K–20K Total', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                    { label: 'North Star', val: 'Instant ROAS Hacks', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Time Horizon', val: 'Daily Volatility', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                    { label: 'Infrastructure', val: 'Dropship / Arbitrage', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-black/[0.03] rounded-3xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                         <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                         </svg>
                         <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">{item.label}</span>
                      </div>
                      <p className="text-sm lg:text-base font-black text-[#001d1a] uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ececec] rounded-[2.5rem] p-8 lg:p-10 relative mt-4">
                <p className="text-[#001d1a]/50 text-base font-bold leading-relaxed text-center italic">
                  "I just want to run some ads and see if I can get some quick sales before my budget runs out."
                </p>
              </div>
            </div>

            <div className="mt-auto pt-10 text-center">
              <p className="text-red-500/50 text-[10px] font-black uppercase tracking-[0.3em]">We decline 80% of inquiries to ensure scaler success.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};