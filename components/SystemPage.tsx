import React from 'react';

interface SystemPageProps {
  onNavigate: (page: string) => void;
}

export const SystemPage: React.FC<SystemPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* 1. Terminal Header */}
      <section className="pt-44 lg:pt-56 pb-24 px-6 lg:px-12 border-b border-brandDark/5 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="space-y-10 lg:max-w-4xl">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark text-white rounded-full">
                <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] font-mono">System Protocol / v4.2.0</span>
              </div>
              <h1 className="text-6xl lg:text-[110px] font-black text-brandDark tracking-tighter leading-[0.85]">
                Infrastructure <br />
                <span className="text-brandDark/20 italic">Over Luck.</span>
              </h1>
              <p className="text-2xl lg:text-3xl text-brandDark/50 leading-tight font-bold max-w-2xl">
                We replace agency "voodoo" with <span className="text-brandDark">deterministic systems</span> built on unit-economic certainty.
              </p>
            </div>
            <div className="hidden lg:block pb-4">
               <div className="bg-brandDark p-8 rounded-3xl space-y-4 shadow-3xl w-64 border border-white/5">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                     <span className="text-[9px] font-black text-white/30 uppercase tracking-widest">Load Status</span>
                     <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Optimal</span>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-brandYellow"></div>
                    </div>
                    <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Data Synchronization Active</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Modular Growth Stack */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandBg relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(circle, #001d21 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
             
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 space-y-6">
            <span className="text-[11px] font-black text-brandDark/20 uppercase tracking-[0.5em] font-mono">Modular Architecture</span>
            <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter">The Scaling Stack.</h2>
          </div>

          <div className="space-y-8 lg:space-y-4">
            {[
              { 
                layer: "Layer 03", 
                title: "Retention & LTV Compound", 
                focus: "Klaviyo + SMS + Loyalty",
                desc: "Where the real profit is made. We orchestrate automated loops that turn one-time buyers into lifetime advocates through behavioral segmentation.",
                metrics: ["LTV: 2.4x Lift", "Repeat Rate: +18%"]
              },
              { 
                layer: "Layer 02", 
                title: "Acquisition Media Engine", 
                focus: "Meta + Google + TikTok",
                desc: "Performance-first media buying governed by contribution margin guardrails. No scaling happens without variable isolation and hook testing.",
                metrics: ["CAC: -22%", "Spend Velocity: 3x"]
              },
              { 
                layer: "Layer 01", 
                title: "Infrastructure & Data", 
                focus: "Tracking + Funnels + P&L",
                desc: "The foundation. We implement server-side tracking and unit-economic dashboards to ensure we aren't flying blind on platform data.",
                metrics: ["Data Integrity: 98%", "Latency: 0ms"]
              }
            ].map((item, i) => (
              <div key={i} className="bg-white border-2 border-brandDark/5 rounded-[3rem] p-10 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 group hover:border-brandYellow transition-all duration-500 shadow-sm hover:shadow-4xl">
                <div className="lg:col-span-3 space-y-2">
                  <span className="text-[11px] font-mono font-black text-brandYellow tracking-widest">{item.layer}</span>
                  <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-widest">{item.focus}</p>
                </div>
                <div className="lg:col-span-6">
                  <p className="text-xl lg:text-2xl text-brandDark/60 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="lg:col-span-3 flex flex-col justify-center gap-4 border-l border-brandDark/5 pl-8 lg:pl-12">
                   {item.metrics.map((m, idx) => (
                     <div key={idx}>
                        <p className="text-[9px] font-bold text-brandDark/20 uppercase tracking-widest">Benchmark</p>
                        <p className="text-2xl font-black text-brandDark">{m}</p>
                     </div>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Variable Isolation Protocol */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-brandDark text-white relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <span className="text-brandYellow font-mono text-[11px] font-bold tracking-[0.4em] uppercase">R&D Laboratory</span>
              <h2 className="text-5xl lg:text-8xl font-black tracking-tighter leading-none">
                Variable <br />
                <span className="text-brandYellow italic">Isolation.</span>
              </h2>
            </div>
            <p className="text-white/50 text-xl lg:text-2xl font-medium leading-relaxed">
              Scaling is the process of removing uncertainty. We don't "test" everything at once. We isolate one variable—a hook, a price point, or a landing page—in a sandbox environment before we commit your scale budget.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10">
               <div className="space-y-2">
                 <p className="text-4xl font-black text-brandYellow">25+</p>
                 <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Weekly Creative Hooks Isolated</p>
               </div>
               <div className="space-y-2">
                 <p className="text-4xl font-black text-white">100%</p>
                 <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest leading-tight">Statistical Significance Buffer</p>
               </div>
            </div>
          </div>
          <div className="relative">
             <div className="bg-[#002a2f] border border-white/5 p-10 lg:p-16 rounded-[4rem] shadow-glow space-y-10 relative z-10">
                <div className="space-y-6">
                  {["Creative Hook backtesting", "Offer elasticity mapping", "Landing page delta tests", "Bidding protocol iterations"].map((step, i) => (
                    <div key={i} className="flex items-center gap-6 group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-brandYellow group-hover:bg-brandYellow group-hover:text-brandDark transition-all">
                        <span className="font-mono font-bold text-xs">0{i+1}</span>
                      </div>
                      <span className="text-xl font-bold text-white/80 group-hover:text-white transition-colors">{step}</span>
                    </div>
                  ))}
                </div>
                <div className="h-[1px] w-full bg-white/10"></div>
                <p className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em] text-center">Protocol: Scientific Method V2</p>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-12 -right-12 w-32 h-32 bg-brandYellow/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-brandYellow/5 rounded-full blur-[100px]"></div>
          </div>
        </div>
      </section>

      {/* 4. The MER Engine Section */}
      <section className="py-24 lg:py-48 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-10">
              <h2 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-[0.9]">
                The Profit <br />
                Guardrails.
              </h2>
              <p className="text-xl lg:text-2xl text-brandDark/50 font-medium leading-relaxed">
                Platform ROAS is a vanity metric. We ignore it. Our system optimizes for <span className="text-brandDark">Marketing Efficiency Ratio (MER)</span>—the direct correlation between total spend and net revenue—ensuring your scale doesn't cannibalize your profit.
              </p>
              <div className="p-8 bg-brandBg border-2 border-dotted border-brandYellow/30 rounded-3xl">
                 <p className="text-sm font-bold text-brandDark italic">
                   "If the blended MER drops below your contribution threshold, our system triggers a cooling protocol. Automatically."
                 </p>
              </div>
            </div>
            
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-px bg-brandDark/5 border border-brandDark/5 rounded-[3rem] overflow-hidden">
               <div className="bg-white p-12 space-y-8">
                  <span className="text-[11px] font-black text-brandDark/20 uppercase tracking-widest font-mono">Traditional Model</span>
                  <div className="space-y-4 opacity-40">
                    <p className="text-2xl font-black text-brandDark">Spend until <br /> the dashboard <br /> looks green.</p>
                    <div className="w-full h-1 bg-brandDark/10 rounded-full"></div>
                    <p className="text-xs font-bold text-brandDark/40">RESULT: THE PROFIT SQUEEZE</p>
                  </div>
               </div>
               <div className="bg-[#fffcf5] p-12 space-y-8">
                  <span className="text-[11px] font-black text-brandYellow uppercase tracking-widest font-mono">Techinfigo Model</span>
                  <div className="space-y-4">
                    <p className="text-2xl font-black text-brandDark">Spend only if <br /> contribution <br /> margin allows.</p>
                    <div className="w-full h-1 bg-brandYellow rounded-full"></div>
                    <p className="text-xs font-bold text-brandYellow">RESULT: ENGINEERED WEALTH</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Integration CTA */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandBg">
        <div className="max-w-5xl mx-auto bg-brandDark rounded-[4rem] p-12 lg:p-24 text-center space-y-16 shadow-4xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fcb63210_0%,_transparent_70%)]"></div>
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl lg:text-8xl font-black text-white tracking-tighter leading-none">
              Sync Your <br />
              <span className="text-brandYellow">Ledger.</span>
            </h2>
            <p className="text-white/40 text-xl lg:text-2xl max-w-2xl mx-auto font-medium">
              Ready to install a growth engine that actually cares about your bank balance?
            </p>
          </div>

          <button 
            onClick={() => onNavigate('contact')}
            className="relative z-10 px-16 py-8 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-white transition-all duration-500 shadow-glow"
          >
            Request System Audit
          </button>
          
          <div className="relative z-10 pt-12 border-t border-white/5 opacity-20">
             <p className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.5em]">SYSTEM_STANDBY_MODE // READY_FOR_DEPLOYMENT</p>
          </div>
        </div>
      </section>
    </div>
  );
};