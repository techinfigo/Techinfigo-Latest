
import React from 'react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative min-h-[100vh] lg:min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-brandBg selection:bg-brandYellow selection:text-brandDark">
      {/* Precision Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #001d21 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
           style={{ backgroundImage: `linear-gradient(#001d21 1px, transparent 1px), linear-gradient(90deg, #001d21 1px, transparent 1px)`, backgroundSize: '200px 200px' }} />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center z-10 pt-48 pb-24">
        
        {/* Left: Strategic Content (Col 1-7) */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-12 animate-slide-up">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono font-bold text-brandDark/30 tracking-[0.4em] uppercase">SYSTEM_INIT_V2.5</span>
              <div className="flex-grow h-[1px] bg-brandDark/10 min-w-[60px]"></div>
            </div>
            <h1 className="text-6xl md:text-[5.5rem] xl:text-[6.5rem] font-bold text-brandDark leading-[0.85] tracking-tighter">
              We Architect <br />
              <span className="text-brandDark/20 font-light">High-Yield</span> <br />
              <span className="relative inline-block">
                Scale Infrastructure.
                <div className="absolute -bottom-2 left-0 w-1/3 h-2 bg-brandYellow/30 -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-brandDark/60 max-w-xl leading-snug font-medium border-l-4 border-brandYellow pl-8">
            Eliminating the volatility of "marketing" through performance engineering. 
            Scaling D2C brands from <span className="text-brandDark font-bold">₹50L to ₹50Cr</span> through unit-economic precision.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 w-full sm:w-auto">
            <button 
              className="group relative bg-brandDark text-white px-14 py-7 overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,29,33,0.25)]"
              onClick={onBookAudit}
            >
              <div className="absolute inset-0 w-0 bg-brandYellow transition-all duration-500 group-hover:w-full"></div>
              <span className="relative z-10 font-bold text-[11px] uppercase tracking-[0.4em] group-hover:text-brandDark transition-colors">
                Apply for Growth Audit
              </span>
            </button>
            <div className="flex flex-col justify-center border-l sm:border-l-0 sm:border-t lg:border-t-0 lg:border-l border-brandDark/10 pl-8 sm:pt-4 sm:pl-0 lg:pt-0 lg:pl-8">
              <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.2em]">Mandate Protocol</span>
              <span className="text-[10px] text-brandDark/40 uppercase tracking-widest">Exclusive to established D2C entities</span>
            </div>
          </div>

          {/* Metric Ledger */}
          <div className="grid grid-cols-3 gap-12 pt-16 border-t border-brandDark/10 w-full">
            {[
              { label: 'Avg ROAS', val: '6.42x' },
              { label: 'Scale Cap', val: '₹65Cr+' },
              { label: 'Net Yield', val: '+24%' },
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-3xl font-bold text-brandDark tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: The Visual Composition (Col 8-12) */}
        <div className="lg:col-span-5 relative lg:h-[750px] flex items-center justify-center">
          
          {/* Main Hero Visual */}
          <div className="relative w-full aspect-[4/5] lg:h-full overflow-hidden shadow-2xl rounded-sm group bg-brandDark/5">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
              alt="Analytical Growth" 
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:brightness-100"
            />
            {/* Visual Overlays */}
            <div className="absolute inset-0 bg-brandDark/20 mix-blend-multiply group-hover:opacity-0 transition-opacity"></div>
            <div className="absolute top-0 left-0 p-10">
              <span className="text-[10px] font-mono text-white/50 tracking-[0.5em] uppercase">VIEW_PORT_MAIN</span>
            </div>
          </div>

          {/* Data Modules (Floating Glassmorphism) */}
          <div className="absolute -top-6 -right-4 lg:-right-16 bg-white/95 backdrop-blur-xl border border-white p-8 shadow-2xl animate-float max-w-[220px]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-[10px] font-bold text-brandDark/40 uppercase tracking-[0.2em]">Efficiency</span>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <p className="text-4xl font-bold text-brandDark tracking-tighter mb-2">94.8%</p>
            <p className="text-[11px] text-brandDark/60 leading-tight">Attribution integrity across all nodes.</p>
          </div>

          <div className="absolute bottom-16 -left-4 lg:-left-24 bg-brandDark p-8 shadow-2xl animate-float-delayed min-w-[260px]">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-brandYellow"></div>
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Scale Velocity</span>
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-grow h-16 flex items-end gap-1.5">
                  {[25, 50, 35, 70, 45, 95, 60].map((h, i) => (
                    <div key={i} className="flex-grow bg-brandYellow/10 group-hover:bg-brandYellow/50 transition-all duration-500" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <p className="text-4xl font-bold text-white tracking-tighter">1.8<span className="text-brandYellow text-xl">x</span></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(60px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(1deg); }
        }
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(25px) rotate(-1deg); }
        }
        .animate-slide-up {
          animation: slideUp 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
