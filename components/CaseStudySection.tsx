import React from 'react';

export const CaseStudySection: React.FC = () => {
  return (
    <section className="w-full py-24 lg:py-40 px-6 bg-[#f9f6f2] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Side: Copy & Stats */}
        <div className="lg:col-span-6 space-y-12 animate-slide-up">
          <div className="space-y-6">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brandYellow block">FEATURED CASE STUDY</span>
            <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-[0.9]">
              From Unstable ROAS to <br />
              Predictable Scale
            </h2>
            <p className="text-[10px] font-black text-brandDark/30 uppercase tracking-[0.2em]">BRAND: GLOWVEDA</p>
          </div>

          <div className="space-y-8">
            {/* The Problem */}
            <div className="flex gap-6">
              <div className="w-1.5 bg-rose-500 rounded-full shrink-0"></div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">THE PROBLEM</span>
                <p className="text-brandDark/60 text-lg lg:text-xl font-medium leading-relaxed">
                  Scaling efforts were trapped by a high first-purchase CAC and ad fatigue that killed margins whenever spend increased.
                </p>
              </div>
            </div>

            {/* The Fix */}
            <div className="flex gap-6">
              <div className="w-1.5 bg-brandYellow rounded-full shrink-0"></div>
              <div className="space-y-2">
                <span className="text-[9px] font-black text-brandYellow uppercase tracking-widest">THE FIX</span>
                <p className="text-brandDark/60 text-lg lg:text-xl font-medium leading-relaxed">
                  Deployed an offer-led creative framework paired with high-velocity testing to isolate winning hooks before scaling spend.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-8 rounded-2xl border border-brandDark/5 shadow-sm space-y-2">
              <p className="text-3xl font-black text-brandDark tracking-tighter">180%</p>
              <p className="text-[9px] font-bold text-brandDark/30 uppercase tracking-widest">REVENUE GROWTH</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-brandDark/5 shadow-sm space-y-2">
              <p className="text-3xl font-black text-brandDark tracking-tighter">28%</p>
              <p className="text-[9px] font-bold text-brandDark/30 uppercase tracking-widest">EFFICIENCY LIFT</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-brandDark/5 shadow-sm space-y-2">
              <p className="text-3xl font-black text-brandDark tracking-tighter">90 Days</p>
              <p className="text-[9px] font-bold text-brandDark/30 uppercase tracking-widest">TIMEFRAME</p>
            </div>
          </div>

          <button className="px-10 py-5 bg-brandDark text-white font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl">
            Read Playbook →
          </button>
        </div>

        {/* Right Side: Visual & Badge */}
        <div className="lg:col-span-6 relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-4xl">
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200" 
              alt="Glowveda Scaling result" 
              className="w-full h-full object-cover grayscale transition-transform duration-1000 hover:scale-105"
            />
          </div>

          {/* Floating Result Badge */}
          <div className="absolute bottom-12 -right-8 lg:-right-12 bg-[#001d21] p-8 lg:p-10 rounded-[2rem] shadow-glow border border-white/5 animate-float">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em]">SCALE RESULT</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-brandYellow tracking-tighter">5.2x ROAS</h3>
          </div>
        </div>

      </div>
    </section>
  );
};