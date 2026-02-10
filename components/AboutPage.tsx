import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. Technical DNA Header */}
      <section className="pt-44 lg:pt-56 pb-24 px-6 lg:px-12 border-b border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8 space-y-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark text-white rounded-full">
                <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Operational DNA / V4.0</span>
              </div>
              <h1 className="text-6xl lg:text-[120px] font-black text-brandDark tracking-tighter leading-[0.85]">
                Built for the <br />
                <span className="text-brandYellow italic">Profit-Obsessed.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 pb-4">
              <div className="bg-white border-2 border-dotted border-brandYellow/30 p-8 rounded-3xl space-y-6 shadow-sm">
                <p className="text-[11px] font-black text-brandDark/20 uppercase tracking-[0.4em] border-b border-brandDark/5 pb-4">Internal Metric Focus</p>
                <div className="space-y-4">
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-brandDark/60">Success Rate</span>
                     <span className="text-xl font-black text-brandDark">100% Alignment</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-brandDark/60">Execution Latency</span>
                     <span className="text-xl font-black text-brandDark">&lt; 24 Hours</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-sm font-bold text-brandDark/60">Partner Seniority</span>
                     <span className="text-xl font-black text-brandDark">Founders Only</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Logic vs. Guesswork Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white">
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

      {/* 3. The Scale Protocol - 4 Constants */}
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

      {/* 4. Founder's Pledge */}
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

      {/* 5. Terminal CTA */}
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