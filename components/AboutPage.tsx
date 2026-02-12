import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      
      {/* 1. Header Section - Compact Height */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              ABOUT US
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              The Growth Partner <br />
              Behind Ambitious D2C <br />
              Brands
            </h1>
            
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We're a team of strategists, creatives, and data nerds obsessed <br className="hidden lg:block" />
              with building profitable, compounding growth systems.
            </p>
          </div>
        </div>
      </section>

      {/* 2. OUR PHILOSOPHY Section - COMPACTED */}
      <section className="py-16 lg:py-20 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 space-y-3 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-black text-brandYellow uppercase tracking-[0.4em] block">
              OUR PHILOSOPHY
            </span>
            <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">
              How We Drive Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left Image - Grayscale City */}
            <div className="relative rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl animate-slide-up aspect-[4/3] lg:aspect-auto max-h-[500px]">
              <img 
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1200" 
                alt="Growth Perspective" 
                className="w-full h-full object-cover grayscale brightness-95"
              />
            </div>

            {/* Right List - Values */}
            <div className="space-y-8 lg:space-y-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              
              {/* Point 01 */}
              <div className="flex gap-5 lg:gap-6 group">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1rem] bg-brandDark flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brandYellow transition-colors duration-500">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight leading-none uppercase">Clear Promises</h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                    We commit to outcomes, not just activities. You'll always know what we're doing and why it matters.
                  </p>
                </div>
              </div>

              {/* Point 02 */}
              <div className="flex gap-5 lg:gap-6 group">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1rem] bg-brandDark flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brandYellow transition-colors duration-500">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight leading-none uppercase">Data + Judgement</h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                    Data tells us what happened, but experience tells us what to do next. We blend both for smarter decisions.
                  </p>
                </div>
              </div>

              {/* Point 03 */}
              <div className="flex gap-5 lg:gap-6 group">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1rem] bg-brandDark flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brandYellow transition-colors duration-500">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight leading-none uppercase">Speed Over Perfect</h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                    Good enough today is better than perfect next month. We prioritize momentum and rapid learning cycles.
                  </p>
                </div>
              </div>

              {/* Point 04 */}
              <div className="flex gap-5 lg:gap-6 group">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-[1rem] bg-brandDark flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brandYellow transition-colors duration-500">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white group-hover:text-brandDark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl lg:text-2xl font-black text-brandDark tracking-tight leading-none uppercase">Partners, Not Vendors</h3>
                  <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed max-w-md">
                    We integrate with your team, share your goals, and are transparent about results—good or bad.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. The Logic vs. Guesswork Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white border-t border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none mb-8">
              Why we exist: <br />
              The Agency <span className="text-brandDark/20">Problem.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-brandDark/60 font-medium leading-relaxed">
              Standard agencies are factories built on volume. They hire juniors, automate mediocrity, and hide behind vanity ROAS. We built Techinfigo as a <span className="text-brandDark">Systems-First Bureau</span> to solve for the only metric that matters: <span className="text-brandYellow italic underline decoration-brandYellow/30">Net Contribution Margin.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-brandDark/5 border border-brandDark/5 rounded-[3rem] overflow-hidden shadow-4xl">
             {/* The Guesswork (Dark) */}
             <div className="bg-brandDark p-12 lg:p-20 space-y-12">
                <div className="space-y-4">
                  <span className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/40 rounded-full text-[9px] font-bold uppercase tracking-widest">Industry Friction</span>
                  <h3 className="text-4xl font-black text-white tracking-tight">The Guesswork Model</h3>
                </div>
                <div className="space-y-8 opacity-40">
                  {["Creative based on 'vibes' not hooks", "Scaling on high-ROAS 'glitches'", "Isolated channel execution", "Junior-managed account burnout"].map((point, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                      </div>
                      <p className="text-xl font-bold text-white tracking-tight leading-none pt-1">{point}</p>
                    </div>
                  ))}
                </div>
             </div>

             {/* The Logic (Light) */}
             <div className="bg-[#fffcf5] p-12 lg:p-20 space-y-12">
                <div className="space-y-4">
                  <span className="px-4 py-1.5 bg-brandYellow/10 text-brandYellow rounded-full text-[9px] font-bold uppercase tracking-widest">Our Protocol</span>
                  <h3 className="text-4xl font-black text-brandDark tracking-tight">The Engineering Model</h3>
                </div>
                <div className="space-y-8">
                  {["Variable isolation & creative labs", "Unit-economic guardrail scaling", "Full-stack growth architecture", "Direct partner-led execution"].map((point, i) => (
                    <div key={i} className="flex gap-6 items-start">
                      <div className="w-6 h-6 rounded-full bg-brandYellow flex items-center justify-center shrink-0 mt-1">
                        <svg className="w-3 h-3 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-xl font-bold text-brandDark tracking-tight leading-none pt-1">{point}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. The Scale Protocol - 4 Constants */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-brandDark/30">First Principles</span>
            <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter">The 4 Constants of Scale.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                id: "MOD_01", 
                title: "Variable Isolation", 
                desc: "Scaling is about removing variables. We isolate creatives, offers, and landers in sandbox environments before we deploy serious capital." 
              },
              { 
                id: "MOD_02", 
                title: "Contribution First", 
                desc: "ROAS is a platform vanity metric. We optimize for Contribution Margin 2—ensuring every order covers its own customer acquisition and logistics costs." 
              },
              { 
                id: "MOD_03", 
                title: "System Resiliency", 
                desc: "Algorithms change. We build 1st-party data pipelines and retention stacks so your growth isn't held hostage by a single platform's whim." 
              },
              { 
                id: "MOD_04", 
                title: "Partner Transparency", 
                desc: "No hiding. You get direct WhatsApp access to the strategists making the decisions, with zero account-manager layers in between." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-12 lg:p-16 rounded-[2.5rem] border border-brandDark/5 shadow-sm group hover:border-brandYellow transition-all duration-500">
                <span className="text-[11px] font-mono font-bold text-brandDark/20 tracking-widest group-hover:text-brandYellow transition-colors">{item.id}</span>
                <h3 className="text-3xl lg:text-4xl font-black text-brandDark tracking-tight mt-6 mb-6">{item.title}</h3>
                <p className="text-lg lg:text-xl text-brandDark/50 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Founder's Pledge */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-[#fdfaf5]">
        <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="w-20 h-[1px] bg-brandYellow mx-auto"></div>
          <h2 className="text-3xl lg:text-5xl font-bold text-brandDark italic tracking-tight leading-relaxed">
            "We don't want 100 clients. We want 10 partners who value precision, system-thinking, and compounding growth over vanity flashes. If we don't think we can scale you profitably, we will tell you."
          </h2>
          <div className="space-y-2">
             <p className="text-[11px] font-black text-brandDark uppercase tracking-[0.4em]">The Techinfigo Partners</p>
             <p className="text-[9px] font-bold text-brandDark/40 uppercase tracking-widest">Growth Engineers & D2C Strategists</p>
          </div>
        </div>
      </section>

      {/* 6. Terminal CTA */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandDark relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brandYellow via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl lg:text-[100px] font-black text-white tracking-tighter leading-none">
              Initialize Your <br />
              <span className="text-brandYellow">Growth Engine.</span>
            </h2>
            <p className="text-white/40 text-xl lg:text-2xl max-w-2xl mx-auto font-medium">
              Move from manual friction to engineered scale. We are currently accepting 2 new partners for this quarter.
            </p>
          </div>
          
          <button 
            onClick={() => onNavigate('contact')}
            className="px-16 py-8 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-xl hover:bg-white transition-all duration-500 shadow-[0_20px_60px_rgba(252,182,50,0.3)]"
          >
            Apply for Free Growth Audit
          </button>
          
          <div className="flex justify-center gap-12 pt-12 border-t border-white/5 opacity-30 grayscale contrast-125">
             <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">META CERTIFIED</span>
             <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">GOOGLE PARTNER</span>
             <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">SHOPIFY EXPERTS</span>
          </div>
        </div>
      </section>
    </div>
  );
};