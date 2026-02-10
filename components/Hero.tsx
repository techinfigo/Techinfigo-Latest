
import React from 'react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden bg-brandBg">
      <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #001d21 1.5px, transparent 1.5px)`, backgroundSize: '30px 30px' }} />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center z-10 pt-40 pb-20">
        
        <div className="lg:col-span-8 flex flex-col items-start space-y-10 animate-slide-up">
          <div className="space-y-6 w-full">
            <div className="flex items-center gap-6">
              <span className="text-[13px] font-mono font-bold text-brandDark/40 tracking-[0.5em] uppercase">SYSTEM_READY_V2</span>
              <div className="flex-grow h-[1px] bg-brandDark/10"></div>
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-brandDark leading-[0.95] tracking-tighter">
              We Build <br />
              <span className="text-brandDark/20 font-light">Performance</span> <br />
              <span className="relative inline-block">
                Engines.
                <div className="absolute bottom-2 left-0 w-1/2 h-2 bg-brandYellow/40 -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-xl lg:text-2xl text-brandDark/60 max-w-xl leading-relaxed font-medium border-l-[4px] border-brandYellow pl-8">
            Eliminating guesswork from scaling. We engineer D2C brands from <span className="text-brandDark font-bold">₹50L to ₹50Cr</span> with total unit-economic certainty.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-8 w-full">
            <button 
              className="group relative bg-brandDark text-white px-12 py-6 overflow-hidden transition-all duration-500 hover:shadow-2xl"
              onClick={onBookAudit}
            >
              <div className="absolute inset-0 w-0 bg-brandYellow transition-all duration-500 group-hover:w-full"></div>
              <span className="relative z-10 font-bold text-[13px] uppercase tracking-[0.4em] group-hover:text-brandDark">
                Request Growth Audit
              </span>
            </button>
            <div className="flex flex-col justify-center border-l-2 border-brandDark/10 pl-8">
              <span className="text-[11px] font-bold text-brandDark uppercase tracking-[0.3em] mb-1">Status: Accepting Mandates</span>
              <span className="text-[10px] text-brandDark/30 uppercase tracking-widest font-bold">Qualified D2C Entities Only</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-16 border-t border-brandDark/5 w-full max-w-2xl">
            {[
              { label: 'Avg ROAS', val: '6.4x' },
              { label: 'Managed Rev', val: '₹65Cr' },
              { label: 'Net Yield', val: '+24%' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] font-bold text-brandDark/40 uppercase tracking-[0.3em]">{stat.label}</p>
                <p className="text-2xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 relative flex items-center justify-center">
          <div className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl rounded-xl bg-brandDark/5">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda536339a?auto=format&fit=crop&q=80&w=1200" 
              alt="Data Ops" 
              className="w-full h-full object-cover grayscale brightness-75 transition-all duration-1000"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
