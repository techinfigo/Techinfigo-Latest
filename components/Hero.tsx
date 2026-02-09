
import React from 'react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative min-h-[100vh] flex flex-col justify-center px-4 sm:px-6 overflow-hidden bg-brandBg selection:bg-brandYellow selection:text-brandDark">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #001d21 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10 pt-32 pb-12 lg:pt-48 lg:pb-24">
        
        {/* Left: Strategic Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-8 lg:space-y-12 animate-slide-up">
          <div className="space-y-4 lg:space-y-6 w-full">
            <div className="flex items-center gap-4">
              <span className="text-[9px] lg:text-[10px] font-mono font-bold text-brandDark/30 tracking-[0.4em] uppercase">SYSTEM_INIT_V2.5</span>
              <div className="flex-grow h-[1px] bg-brandDark/10 min-w-[40px]"></div>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-[5.5rem] xl:text-[6.5rem] font-bold text-brandDark leading-[1.1] lg:leading-[0.85] tracking-tighter">
              We Architect <br />
              <span className="text-brandDark/20 font-light">High-Yield</span> <br />
              <span className="relative inline-block">
                Scale Infrastructure.
                <div className="absolute -bottom-1 lg:-bottom-2 left-0 w-1/3 h-1 lg:h-2 bg-brandYellow/30 -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-lg lg:text-2xl text-brandDark/60 max-w-xl leading-snug font-medium border-l-4 border-brandYellow pl-6 lg:pl-8">
            Eliminating volatility through performance engineering. 
            Scaling D2C brands from <span className="text-brandDark font-bold">₹50L to ₹50Cr</span> with unit-economic precision.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 lg:gap-8 w-full sm:w-auto">
            <button 
              className="group relative bg-brandDark text-white px-8 lg:px-14 py-5 lg:py-7 overflow-hidden transition-all duration-500 hover:shadow-xl active:scale-95"
              onClick={onBookAudit}
            >
              <div className="absolute inset-0 w-0 bg-brandYellow transition-all duration-500 group-hover:w-full"></div>
              <span className="relative z-10 font-bold text-[10px] lg:text-[11px] uppercase tracking-[0.3em] lg:tracking-[0.4em] group-hover:text-brandDark transition-colors">
                Apply for Growth Audit
              </span>
            </button>
            <div className="flex flex-col justify-center border-l border-brandDark/10 pl-6">
              <span className="text-[9px] lg:text-[10px] font-bold text-brandDark uppercase tracking-[0.2em]">Mandate Protocol</span>
              <span className="text-[9px] lg:text-[10px] text-brandDark/40 uppercase tracking-widest">Established D2C Entities Only</span>
            </div>
          </div>

          {/* Metric Ledger */}
          <div className="grid grid-cols-3 gap-4 lg:gap-12 pt-8 lg:pt-16 border-t border-brandDark/10 w-full">
            {[
              { label: 'Avg ROAS', val: '6.42x' },
              { label: 'Portfolio', val: '₹65Cr+' },
              { label: 'Yield', val: '+24%' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[8px] lg:text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-xl lg:text-3xl font-bold text-brandDark tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Visual Composition */}
        <div className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-center justify-center">
          <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden shadow-2xl rounded-sm group bg-brandDark/5">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
              alt="Analytical Growth" 
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-brandDark/20 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
          </div>

          {/* Data Modules (Optimized for Mobile Visibility) */}
          <div className="absolute -top-4 -right-2 lg:-right-16 bg-white/95 backdrop-blur-xl border border-white p-4 lg:p-8 shadow-2xl animate-float max-w-[140px] lg:max-w-[220px]">
            <p className="text-2xl lg:text-4xl font-bold text-brandDark tracking-tighter mb-1">94.8%</p>
            <p className="text-[9px] lg:text-[11px] text-brandDark/60 leading-tight">Attribution integrity node validation.</p>
          </div>

          <div className="absolute bottom-4 -left-2 lg:-left-24 bg-brandDark p-4 lg:p-8 shadow-2xl animate-float-delayed min-w-[180px] lg:min-w-[260px]">
            <div className="flex items-end gap-2 lg:gap-3">
              <div className="flex-grow h-8 lg:h-16 flex items-end gap-1">
                {[25, 50, 35, 70, 45, 95].map((h, i) => (
                  <div key={i} className="flex-grow bg-brandYellow/30" style={{ height: `${h}%` }} />
                ))}
              </div>
              <p className="text-2xl lg:text-4xl font-bold text-white tracking-tighter">1.8<span className="text-brandYellow text-sm">x</span></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
