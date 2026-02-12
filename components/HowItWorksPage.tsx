import React from 'react';

interface HowItWorksPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate }) => {
  const phases = [
    {
      id: "PHASE_01",
      title: "Technical Audit",
      duration: "Week 01",
      desc: "We perform a forensic audit of your current P&L, tracking infrastructure, and creative performance backtests.",
      tasks: ["P&L Stress Testing", "Tracking Integrity Sync", "Creative Delta Audit"]
    },
    {
      id: "PHASE_02",
      title: "Engine Buildout",
      duration: "Week 02",
      desc: "Our engineers rebuild your growth stack. Custom attribution and standardized reporting loops are deployed.",
      tasks: ["Dashboard Architecture", "Protocol Synchronization", "Variable Isolation"]
    },
    {
      id: "PHASE_03",
      title: "Execution Scale",
      duration: "Ongoing",
      desc: "We activate the media engine with high-velocity creative testing and unit-economic guardrails.",
      tasks: ["Scaling Protocol 1.0", "LTV Compound Loops", "Profit-First Optimization"]
    }
  ];

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              OPERATIONAL BLUEPRINT
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              The Scale <br />
              Protocol.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Growth is a science of variable reduction. Here is how we <br className="hidden lg:block" /> systematically de-risk your business.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-40">
          {phases.map((phase) => (
            <div key={phase.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-brandDark/5 pt-20">
              <div className="lg:col-span-4">
                <span className="text-lg font-mono font-bold text-brandYellow block mb-4">{phase.id}</span>
                <p className="text-4xl font-extrabold text-brandDark tracking-tighter mb-2">{phase.duration}</p>
              </div>
              <div className="lg:col-span-8 space-y-12">
                <h3 className="text-5xl lg:text-7xl font-bold text-brandDark tracking-tighter leading-none">
                  {phase.title}
                </h3>
                <p className="text-2xl lg:text-3xl text-brandDark/50 leading-relaxed max-w-2xl">
                  {phase.desc}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10">
                  {phase.tasks.map((task, i) => (
                    <div key={i} className="flex flex-col gap-3">
                      <span className="text-[11px] font-bold text-brandDark/30 uppercase tracking-widest">Action_Item_0{i+1}</span>
                      <p className="text-xl font-bold text-brandDark">{task}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};