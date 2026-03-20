import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-center pt-20 lg:pt-24 px-6 lg:px-12 overflow-hidden bg-brandDark border-b border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-brandDark via-[#002a2f]/20 to-brandDark"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center z-10 py-6 lg:py-10">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-[clamp(1.5rem,3vh,2.5rem)] animate-slide-up">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-brandYellow/10 border border-brandYellow/30 rounded-full shadow-[0_0_20px_rgba(252,182,50,0.1)]">
            <div className="w-2 h-2 rounded-full bg-brandYellow animate-pulse shadow-[0_0_10px_#fcb632]"></div>
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.2em]">
              FOR D2C BRANDS SPENDING ₹2L+ ON ADS
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-6 w-full max-w-5xl">
            <h1 className="text-[clamp(1.8rem,4vw,3.8rem)] font-black text-white leading-[1.1] tracking-tighter font-sans uppercase">
              Spending Lakhs <br />
              on Ads… <br />
              But Profit Still Stuck?
            </h1>
            <h2 className="text-[clamp(1rem,1.8vw,1.8rem)] font-bold text-brandYellow leading-tight font-sans">
              We Fix Your Unit Economics — Not Just Your Ads.
            </h2>
          </div>

          {/* Subheading */}
          <div className="max-w-xl space-y-4 lg:space-y-6">
            <div className="border-l-2 border-brandYellow pl-5 py-1">
              <p className="text-[clamp(1rem,1.2vw,1.25rem)] text-white/80 leading-relaxed font-medium">
                You’re getting orders. Revenue looks good. <br />
                But at the end of the month — <span className="relative inline-block px-2 py-0.5">
                  <span className="absolute inset-0 bg-brandYellow/20 -skew-x-6 rounded-sm"></span>
                  <span className="relative z-10 text-white font-bold border-b-2 border-brandYellow">profit doesn’t move.</span>
                </span>
              </p>
            </div>
          </div>

          {/* Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 w-full max-w-2xl">
            {[
              "Fix CAC & MER before scaling",
              "Identify funnel leaks & wasted spend",
              "Build predictable profit systems"
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <CheckCircle2 className="w-5 h-5 text-brandYellow group-hover:scale-110 transition-transform" />
                <span className="text-sm lg:text-base text-white/70 font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-start space-y-6 pt-2 lg:pt-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 w-full sm:w-auto">
              <div className="relative group w-full sm:w-auto">
                {/* Glow behind button */}
                <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
                
                <button 
                  onClick={onBookAudit}
                  className="relative w-full sm:w-auto px-10 py-4 lg:px-12 lg:py-5 bg-brandYellow text-brandDark font-black text-[13px] lg:text-[14px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
                >
                  Get Free Profit Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <button 
                onClick={() => {}} 
                className="text-white/50 hover:text-brandYellow text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group whitespace-nowrap"
              >
                View Case Study 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-8 lg:pt-0">
          
          {/* Main Rounded Image Container */}
          <div className="relative w-full max-w-[400px] lg:max-w-[480px] aspect-[4/5] rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden border border-white/10 shadow-4xl group">
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
               alt="Strategic Growth and Data Infrastructure" 
               className="w-full h-full object-cover grayscale brightness-[0.4] transition-transform duration-1000 group-hover:scale-105"
             />
             
             {/* Subtle Inner Glow */}
             <div className="absolute inset-0 bg-gradient-to-tr from-brandDark/40 via-transparent to-white/5 pointer-events-none"></div>
             
             {/* Overlay Grid Pattern on Image */}
             <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>

          {/* Floating Result Card 01 - Top Left */}
          <div className="absolute top-[10%] -left-[5%] lg:-left-16 w-[200px] lg:w-[240px] bg-brandDark/90 backdrop-blur-xl border border-white/10 p-6 lg:p-8 rounded-[2rem] shadow-glow animate-float scale-90 lg:scale-100 origin-top-left z-20">
             <div className="space-y-4">
                <div className="flex flex-col">
                   <span className="text-[9px] lg:text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">BLENDED MER</span>
                   <span className="text-4xl lg:text-5xl font-black text-brandYellow tracking-tighter">4.8x</span>
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <p className="text-[10px] lg:text-[11px] font-bold text-white/50 uppercase tracking-wider leading-relaxed">
                  After fixing <br /> unit economics
                </p>
             </div>
          </div>

          {/* Floating Result Card 02 - Bottom Right */}
          <div className="absolute bottom-[15%] -right-[5%] lg:-right-12 w-[180px] lg:w-[220px] bg-brandYellow p-6 lg:p-8 rounded-[2rem] shadow-4xl animate-float-delayed scale-90 lg:scale-100 origin-bottom-right z-20">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brandDark animate-pulse"></div>
                   <span className="text-[9px] lg:text-[10px] font-black text-brandDark/40 uppercase tracking-[0.3em]">90 DAY GROWTH</span>
                </div>
                <h4 className="text-xl lg:text-2xl font-black text-brandDark tracking-tighter leading-tight">
                  Profit <span className="text-2xl lg:text-3xl">↑</span> 3.2x
                </h4>
                <div className="w-full h-1 bg-brandDark/10 rounded-full mt-4 overflow-hidden">
                   <div className="w-3/4 h-full bg-brandDark animate-grow-width"></div>
                </div>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
        @keyframes growWidth {
          from { width: 0; }
          to { width: 75%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; }
        .animate-grow-width { animation: growWidth 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </section>
  );
};
