
import React from 'react';

interface HowItWorksPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const phases = [
    {
      id: "PHASE_01",
      title: "Technical Audit & Baseline",
      duration: "Week 01",
      desc: "We perform a forensic audit of your current P&L, tracking nodes, and creative performance. This isn't a generic report; it's the discovery of your true unit-economic ceiling.",
      tasks: ["Pixel & Server-side Validation", "P&L Stress Testing", "Creative Performance Backtesting"]
    },
    {
      id: "PHASE_02",
      title: "Infrastructure Synchronization",
      duration: "Week 02",
      desc: "Our engineers rebuild your growth infrastructure. We deploy custom attribution models and standardized reporting loops to ensure every decision is based on verified profit data.",
      tasks: ["Custom Dashboard Deployment", "Attribution Protocol Setup", "Mandate Alignment Sync"]
    },
    {
      id: "PHASE_03",
      title: "Mandate Activation",
      duration: "Week 03-04",
      desc: "We initialize the execution engine. Rapid creative testing combined with precision media buying protocols to identify and exploit your highest-leverage growth variables.",
      tasks: ["Rapid Creative Testing Cycle", "Campaign Architecture Build", "ROAS-to-Profit Correlation"]
    },
    {
      id: "PHASE_04",
      title: "Velocity & Profit Maximization",
      duration: "Ongoing",
      desc: "With a stable foundation, we scale aggressively. We focus on maximizing net-contribution margin by optimizing both acquisition efficiency and customer LTV infrastructure.",
      tasks: ["Scaling Expenditure Scaling", "Retention Loop Optimization", "Weekly Profit Integrity Audits"]
    }
  ];

  return (
    <div className="min-h-screen bg-brandBg pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-32 space-y-8">
          <span className="text-[10px] font-mono font-bold text-brandDark/30 tracking-[0.5em] uppercase flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brandYellow"></span>
            Operational Protocol
          </span>
          <h1 className="text-6xl lg:text-8xl font-bold text-brandDark tracking-tighter leading-[0.85]">
            The Execution <br />
            <span className="text-brandDark/20">Roadmap.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-brandDark/60 leading-relaxed max-w-2xl font-medium border-l-4 border-brandYellow pl-8">
            Scaling is a science of reducing variables. Here is how we systematically de-risk your growth and build a profit-first engine.
          </p>
        </div>

        {/* Phase Timeline */}
        <div className="space-y-32 mb-40">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 group">
              {/* Timeline Indicator */}
              <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-brandDark/5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-brandYellow rounded-full shadow-[0_0_20px_rgba(252,182,50,0.5)] group-hover:scale-150 transition-transform"></div>
              </div>

              {/* Phase Meta */}
              <div className="lg:col-span-3 lg:pl-12">
                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold text-brandYellow">{phase.id}</span>
                  <p className="text-2xl font-bold text-brandDark tracking-tighter">{phase.duration}</p>
                </div>
              </div>

              {/* Phase Content */}
              <div className="lg:col-span-9 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-4xl lg:text-5xl font-bold text-brandDark tracking-tight group-hover:text-brandYellow transition-colors duration-500">
                    {phase.title}
                  </h3>
                  <p className="text-brandDark/60 text-xl leading-relaxed max-w-3xl">
                    {phase.desc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-brandDark/5">
                  {phase.tasks.map((task, i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="text-[9px] font-bold text-brandDark/30 uppercase tracking-widest">Action_Item_{i+1}</span>
                      <p className="text-sm font-bold text-brandDark uppercase tracking-tight">{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA Banner */}
        <div className="bg-brandDark text-white p-20 lg:p-32 rounded-sm relative overflow-hidden text-center">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tighter">Your Engine is Waiting.</h2>
            <p className="text-white/50 text-xl max-w-xl mx-auto leading-relaxed">
              We only take on 3 new mandates per quarter to ensure zero dilution of execution quality.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brandYellow text-brandDark px-14 py-7 font-bold text-xs uppercase tracking-[0.5em] hover:bg-white transition-all duration-300"
            >
              Start Audit Protocol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
