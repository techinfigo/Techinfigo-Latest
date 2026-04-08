'use client';

import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBookAudit: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAudit }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 lg:pt-32 px-6 lg:px-12 overflow-hidden bg-brandDark border-b border-white/5">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Solid Background */}
        <div className="absolute inset-0 bg-brandDark"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        {/* Glow Effects */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-brandYellow/5 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 py-4 lg:py-6">
        
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-4 lg:space-y-6 animate-slide-up">
          
          {/* Trust Line */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-brandYellow/10 border border-brandYellow/30 rounded-full shadow-[0_0_20px_rgba(252,182,50,0.1)]">
            <div className="w-1.5 h-1.5 rounded-full bg-brandYellow animate-pulse shadow-[0_0_10px_#fcb632"></div>
            <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.2em]">
              Used by D2C brands scaling from ₹20L to ₹2Cr/month
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4 w-full max-w-4xl">
            <h1 className="text-[clamp(1.5rem,3.5vw,3.2rem)] font-black text-white leading-[1.1] tracking-tighter font-sans uppercase">
              Ecommerce Marketing Agency for D2C Brands Focused on Profitable Growth
            </h1>
            <h2 className="text-[clamp(0.9rem,1.5vw,1.5rem)] font-bold text-white leading-tight font-sans">
              We Fix Your <span className="text-brandYellow">Unit Economics</span> — Not Just Your Performance Marketing.
            </h2>
          </div>

          {/* Subheading */}
          <div className="max-w-lg space-y-3 lg:space-y-4">
            <div className="border-l-2 border-brandYellow pl-4 py-0.5">
              <p className="text-[clamp(0.9rem,1.1vw,1.15rem)] text-white/80 leading-relaxed font-medium">
                You’re getting orders. Revenue looks good. <br />
                But at the end of the month — profit doesn’t move. <br />
                <span className="text-white/40 text-[0.85em] uppercase tracking-wider mt-2 block font-bold">
                  As a specialized Ecommerce Marketing Agency, we help you stop scaling revenue and start achieving Profitable Growth.
                </span>
              </p>
            </div>
          </div>

          {/* Bullet Points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 lg:gap-3.5 w-full max-w-xl">
            {[
              "Fix CAC & MER before scaling",
              "Identify hidden profit leaks",
              "Build predictable profit systems"
            ].map((bullet, i) => (
              <div key={i} className="flex items-center gap-2.5 group">
                <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 text-brandYellow group-hover:scale-110 transition-transform" />
                <span className="text-xs lg:text-sm text-white/70 font-medium">{bullet}</span>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-start space-y-4 pt-1 lg:pt-2">
            <div className="flex flex-col sm:flex-row items-center gap-5 lg:gap-8 w-full sm:w-auto">
              <div className="flex flex-col items-center sm:items-start gap-3">
                <div className="relative group w-full sm:w-auto">
                  {/* Glow behind button */}
                  <div className="absolute -inset-1 bg-brandYellow/20 rounded-xl blur-xl group-hover:bg-brandYellow/30 transition-all"></div>
                  
                  <button 
                    onClick={onBookAudit}
                    className="relative w-full sm:w-auto px-8 py-3.5 lg:px-10 lg:py-4 bg-brandYellow text-brandDark font-black text-[11px] lg:text-[12px] uppercase tracking-[0.2em] rounded-xl hover:bg-white transition-all duration-500 shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2.5"
                  >
                    Find My Profit Leaks
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest">
                  Takes 15 minutes. Could save you lakhs.
                </p>
              </div>

              <button 
                onClick={() => {}} 
                className="text-white/50 hover:text-brandYellow text-[11px] lg:text-[12px] font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group whitespace-nowrap"
              >
                View Case Study 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Visual Column */}
        <div className="lg:col-span-5 relative flex items-center justify-center pt-6 lg:pt-0">
          
          {/* Main Rounded Image Container */}
          <div className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-[4/5] rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-4xl group">
             <img 
               src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
               alt="Strategic Growth and Data Infrastructure" 
               className="w-full h-full object-cover grayscale brightness-[0.4] transition-transform duration-1000 group-hover:scale-105"
             />
             
             {/* Subtle Inner Overlay */}
             <div className="absolute inset-0 bg-brandDark/40 pointer-events-none"></div>
             
             {/* Overlay Grid Pattern on Image */}
             <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          </div>

          {/* Floating Result Card 01 - Top Left */}
          <div className="absolute top-[10%] -left-[5%] lg:-left-12 w-[160px] lg:w-[200px] bg-brandDark/90 backdrop-blur-xl border border-white/10 p-4 lg:p-6 rounded-[1.5rem] shadow-glow animate-float scale-90 lg:scale-100 origin-top-left z-20">
             <div className="space-y-3">
                <div className="flex flex-col">
                   <span className="text-[8px] lg:text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">BLENDED MER</span>
                   <span className="text-3xl lg:text-4xl font-black text-brandYellow tracking-tighter">4.8x</span>
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <p className="text-[9px] lg:text-[10px] font-bold text-white/50 uppercase tracking-wider leading-relaxed">
                  After fixing <br /> unit economics
                </p>
             </div>
          </div>

          {/* Floating Result Card 02 - Bottom Right */}
          <div className="absolute bottom-[15%] -right-[5%] lg:-right-8 w-[150px] lg:w-[180px] bg-brandYellow p-4 lg:p-6 rounded-[1.5rem] shadow-4xl animate-float-delayed scale-90 lg:scale-100 origin-bottom-right z-20">
             <div className="space-y-2">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-brandDark animate-pulse"></div>
                   <span className="text-[8px] lg:text-[9px] font-black text-brandDark/40 uppercase tracking-[0.3em]">90 DAY GROWTH</span>
                </div>
                <h4 className="text-lg lg:text-xl font-black text-brandDark tracking-tighter leading-tight">
                  Profit <span className="text-xl lg:text-2xl">↑</span> 3.2x
                </h4>
                <div className="w-full h-1 bg-brandDark/10 rounded-full mt-3 overflow-hidden">
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
