import React from 'react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col justify-center pt-28 lg:pt-32 px-6 lg:px-12 overflow-hidden bg-brandDark border-b border-white/5">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center z-10 py-12 lg:py-16">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-8 animate-slide-up">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></div>
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">
              Active Strategists — Limited Brands Per Quarter
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 w-full max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              We Help D2C <br /> Brands <span className="text-brandYellow">Scale <br /> Profitably</span> Without <br /> Burning Cash on <br /> Ads.
            </h1>
          </div>

          {/* Subheading */}
          <div className="max-w-xl">
            <p className="text-base lg:text-lg text-white/60 leading-relaxed font-medium">
              A <span className="text-white">system-driven growth partner</span> for brands stuck between rising ad spend and <span className="text-brandYellow">shrinking margins.</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="w-full sm:w-auto pt-2">
            <button 
              onClick={onBookAudit}
              className="w-full sm:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-brandYellow text-brandDark font-extrabold text-[12px] lg:text-[13px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-[0_20px_40px_rgba(252,182,50,0.2)] hover:shadow-[0_25px_50px_rgba(252,182,50,0.3)] hover:-translate-y-1"
            >
              Apply Free Growth Audit
            </button>
          </div>

          {/* Bottom Trust Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full pt-10 lg:pt-14 border-t border-white/5 gap-6">
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-[8px] lg:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mb-1">
                Trusted by D2C Brands Across
              </span>
              <span className="text-[10px] lg:text-[11px] font-bold text-white/50 uppercase tracking-widest">
                Fashion, Lifestyle & Wellness
              </span>
            </div>
            <div className="flex flex-col items-center sm:items-end">
              <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-widest leading-none">
                100+ Audits
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold text-white/30 uppercase tracking-[0.3em] mt-1">
                Delivered
              </span>
            </div>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          
          {/* Main Rounded Image Container */}
          <div className="relative w-full max-w-[400px] lg:max-w-[460px] aspect-[4/5] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-4xl group">
             <img 
               src="https://images.unsplash.com/photo-1542744094-3a31f272c491?auto=format&fit=crop&q=80&w=1200" 
               alt="Strategic Growth" 
               className="w-full h-full object-cover grayscale brightness-[0.4] transition-transform duration-1000 group-hover:scale-105"
             />
             
             {/* Subtle Inner Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brandDark/40 via-transparent to-white/5 pointer-events-none"></div>
          </div>

          {/* Floating Result Card 01 - Top Left */}
          <div className="absolute top-[8%] -left-[5%] lg:-left-12 w-[180px] lg:w-[220px] bg-brandDark/90 backdrop-blur-xl border border-white/10 p-5 lg:p-6 rounded-3xl shadow-glow animate-float">
             <div className="flex items-center gap-3 lg:gap-4 mb-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-brandYellow/10 rounded-xl flex items-center justify-center">
                   <svg className="w-4 h-4 lg:w-5 lg:h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 12l3-3 3 3 4-4" />
                   </svg>
                </div>
                <div>
                   <p className="text-[7px] lg:text-[8px] font-black text-white/30 uppercase tracking-[0.3em] leading-none mb-1">Scaling Result</p>
                   <p className="text-[10px] lg:text-xs font-bold text-white uppercase tracking-wider">Profitability Lift</p>
                </div>
             </div>
             <p className="text-3xl lg:text-4xl font-black text-brandYellow tracking-tighter">4.82x</p>
             <p className="text-[8px] lg:text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] mt-2">Blended MER Optimized</p>
          </div>

          {/* Floating Result Card 02 - Bottom Right */}
          <div className="absolute bottom-[12%] -right-[5%] lg:-right-8 w-[160px] lg:w-[200px] bg-brandYellow p-5 lg:p-6 rounded-3xl shadow-4xl animate-float-delayed">
             <div className="flex items-center gap-2 lg:gap-3 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brandDark animate-pulse"></div>
                <span className="text-[8px] lg:text-[9px] font-black text-brandDark/40 uppercase tracking-[0.3em]">Systems-Led Growth</span>
             </div>
             <h4 className="text-base lg:text-lg font-black text-brandDark tracking-tighter leading-none mb-2">Eliminating <br /> Freelancer Chaos.</h4>
             <div className="w-full h-1 bg-brandDark/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-brandDark"></div>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
      `}</style>
    </section>
  );
};