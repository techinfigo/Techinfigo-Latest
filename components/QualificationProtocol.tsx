import React from 'react';

export const QualificationProtocol: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-[#f9f6f2] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 space-y-6">
          <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-[#a5a5a5] block">Qualification Protocol</span>
          <h2 className="text-4xl lg:text-7xl font-black text-[#001d1a] tracking-tight leading-none">
            ARE YOU A SCALER OR <br className="hidden lg:block" /> <span className="text-[#fbb632]">A GAMBLER?</span>
          </h2>
          <p className="text-[#001d1a]/60 text-lg lg:text-xl font-bold max-w-3xl mx-auto leading-relaxed">
            Alignment is the secret ingredient to a 100% success rate. We only partner with one of these characters.
          </p>
        </div>

        {/* Comparison Card */}
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row min-h-[720px] bg-white ring-1 ring-black/5">
          
          {/* Left Side: The Scaler */}
          <div className="flex-1 bg-gradient-to-br from-[#001d1a] to-[#002a25] p-10 lg:p-14 relative overflow-hidden flex flex-col group/scaler">
            {/* Background Subtle Glow */}
            <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-[#fbb632]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#34d399]/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative z-10 space-y-12 flex-grow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {/* Concentric Circle Icon */}
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center p-3 bg-white/[0.02] backdrop-blur-sm">
                     <div className="w-full h-full rounded-full border border-[#fbb632]/40 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-[#fbb632]/20 animate-ping opacity-20"></div>
                        <div className="w-4 h-4 bg-[#fbb632] rounded-full shadow-[0_0_20px_rgba(251,182,50,0.8)]"></div>
                     </div>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-[#34d399] w-7 h-7 rounded-lg flex items-center justify-center border-[3px] border-[#001d1a] shadow-lg transform group-hover/scaler:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-[#001d1a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">The Scaler</h3>
                  <p className="text-[#fbb632] text-[10px] font-black uppercase tracking-[0.25em] mt-2 opacity-90">Our Ideal Partner Profile</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] border-b border-white/5 pb-4">Mindset Architecture</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Revenue Base', val: '₹20L+ Monthly', icon: 'M12 20V10M6 20V16M18 20V4' },
                    { label: 'North Star', val: 'MER & Contribution', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                    { label: 'Time Horizon', val: 'Compounding Weeks', icon: 'M7 12l3-3 3 3 4-4' },
                    { label: 'Infrastructure', val: 'Shopify Ecosystem', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                  ].map((item, idx) => (
                    <div key={idx} className="group/card bg-white/[0.03] border border-white/[0.05] rounded-3xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-[#fbb632]/30 hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-3">
                         <svg className="w-5 h-5 text-[#fbb632]/80 group-hover/card:text-[#fbb632] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                         </svg>
                         <span className="text-[10px] font-bold text-[#fbb632]/80 uppercase tracking-widest group-hover/card:text-[#fbb632] transition-colors">{item.label}</span>
                      </div>
                      <p className="text-sm lg:text-lg font-black text-white uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 lg:p-10 relative mt-auto backdrop-blur-sm">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#001d1a] px-3 text-[#fbb632]">
                    <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H8.0166V21H5.0166Z" /></svg>
                </div>
                <p className="text-white/90 text-base lg:text-lg font-medium leading-relaxed italic">
                  "I want a system that makes scaling predictable so I can focus on my product roadmap."
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: The Gambler */}
          <div className="flex-1 bg-[#f5f5f5] p-10 lg:p-14 flex flex-col relative overflow-hidden group/gambler">
            <div className="relative z-10 space-y-12 flex-grow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {/* Warning Icon */}
                  <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-sm group-hover/gambler:shadow-md transition-all duration-300">
                     <svg className="w-10 h-10 text-red-500/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                     </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-red-500 w-7 h-7 rounded-lg flex items-center justify-center border-[3px] border-[#f5f5f5] shadow-lg transform group-hover/gambler:rotate-12 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-black text-[#001d1a] tracking-tight uppercase leading-none">The Gambler</h3>
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-[0.25em] mt-2 opacity-80">Old-School Agency Mindset</p>
                </div>
              </div>

              <div className="space-y-8">
                <p className="text-black/20 text-[10px] font-black uppercase tracking-[0.4em] border-b border-black/5 pb-4">High Risk Architecture</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Budget Base', val: '₹10K–20K Total', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                    { label: 'North Star', val: 'Instant ROAS Hacks', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                    { label: 'Time Horizon', val: 'Daily Volatility', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
                    { label: 'Infrastructure', val: 'Dropship / Arbitrage', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
                  ].map((item, idx) => (
                    <div key={idx} className="group/card bg-white border border-black/[0.03] rounded-3xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-red-100 hover:-translate-y-1">
                      <div className="flex items-center gap-3 mb-3">
                         <svg className="w-5 h-5 text-red-400 group-hover/card:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={item.icon} />
                         </svg>
                         <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest group-hover/card:text-red-500/60 transition-colors">{item.label}</span>
                      </div>
                      <p className="text-sm lg:text-lg font-black text-[#001d1a] uppercase tracking-tight">{item.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#ececec] rounded-[2.5rem] p-8 lg:p-10 relative mt-auto">
                <div className="absolute top-0 left-8 -translate-y-1/2 bg-[#f5f5f5] px-3 text-red-500">
                    <svg className="w-8 h-8 opacity-30" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H17.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H8.0166V21H5.0166Z" /></svg>
                </div>
                <p className="text-[#001d1a]/60 text-base lg:text-lg font-medium leading-relaxed italic">
                  "I just want to run some ads and see if I can get some quick sales before my budget runs out."
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 text-center border-t border-black/5">
              <p className="text-red-500/50 text-[10px] font-black uppercase tracking-[0.3em] hover:text-red-500 transition-colors cursor-default">
                We decline 80% of inquiries to ensure scaler success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};