import React from 'react';

export const RevenueAccelerator: React.FC = () => {
  const auditPoints = [
    { label: "Ad structure architecture", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Creative velocity & hook gaps", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { label: "Funnel friction & leak analysis", icon: "M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" },
    { label: "Scaling bottleneck identification", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { label: "Net profit & COGS alignment", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }
  ];

  return (
    <section className="w-full py-24 lg:py-40 px-6 bg-[#001d21] font-sans relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.03] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Side: Headline & Copy */}
        <div className="lg:col-span-7 space-y-12 animate-slide-up">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[2px] bg-brandYellow"></div>
              <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-brandYellow block">REVENUE ACCELERATOR</span>
            </div>
            
            <h2 className="text-6xl lg:text-[100px] font-black text-white tracking-tighter leading-[0.85]">
              Scale without <br />
              the <span className="relative inline-block text-brandYellow italic">
                "Squeeze."
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-brandYellow/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h2>

            <p className="text-white/60 text-lg lg:text-2xl font-medium leading-relaxed max-w-xl">
              We review your unit economics first, then your ad accounts. <span className="text-white border-b-2 border-brandYellow/30 pb-0.5">If the math doesn't work, we don't sign.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button className="w-full sm:w-auto px-10 py-6 bg-brandYellow text-brandDark font-black text-[11px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-glow">
              Apply Free Growth Audit
            </button>
            
            <button className="w-full sm:w-auto flex items-center justify-center gap-4 px-10 py-6 border border-white/10 rounded-xl text-white font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/5 transition-all">
              <svg className="w-5 h-5 text-brandYellow" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.533 1.946 1.99-.522c.937.51 1.961.92 3.292.922 3.181 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.23 7.913c-.14.397-.703.763-1.011.812-.27.042-.622.065-1.02-.063-.243-.078-.567-.208-1.432-.581-1.125-.483-1.848-1.631-1.905-1.706-.057-.075-.461-.611-.461-1.165 0-.554.29-.824.394-.937.104-.113.226-.141.3-.141h.216c.075 0 .175.003.254.19.08.189.273.666.297.715.024.049.037.105.006.168-.031.063-.047.104-.093.159-.046.055-.098.123-.139.165-.046.046-.095.097-.04.189.055.092.245.404.525.654.362.321.666.421.761.466.095.045.15.037.205-.025.055-.062.235-.274.297-.367.062-.093.125-.078.21-.047.085.031.542.256.635.303.093.047.155.07.178.109.023.04.023.23-.117.627z" />
              </svg>
              WhatsApp Strategist
            </button>
          </div>

          {/* Availability Bar */}
          <div className="flex flex-wrap items-center gap-10 pt-10 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">SLA: 24H RESPONSE</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
              <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">STATUS: LIMITED SPOTS</span>
            </div>
          </div>
        </div>

        {/* Right Side: Audit Card */}
        <div className="lg:col-span-5 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-[#002a2f] border border-white/5 rounded-[3rem] p-10 lg:p-14 shadow-4xl space-y-12">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-3xl font-black text-white tracking-tight leading-none">10-Point Audit</h3>
                <p className="text-brandYellow text-[9px] font-black uppercase tracking-[0.3em]">DIAGNOSTIC PROTOCOL V4.2</p>
              </div>
              <div className="w-12 h-12 bg-brandYellow rounded-2xl flex items-center justify-center shadow-glow">
                <svg className="w-6 h-6 text-brandDark" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            <div className="space-y-6">
              {auditPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-brandYellow/10 transition-colors">
                    <svg className="w-4 h-4 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={point.icon} />
                    </svg>
                  </div>
                  <span className="text-base lg:text-lg font-bold text-white/80 group-hover:text-white transition-colors">{point.label}</span>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-white/5 space-y-4">
              <div className="flex flex-col items-center">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mb-1">ESTIMATED DELIVERY</p>
                <p className="text-3xl font-black text-white tracking-tighter border-b-2 border-brandYellow pb-1">24 HOURS</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};