
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
    <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40 space-y-12">
          <span className="text-[12px] font-mono font-bold text-brandDark/30 tracking-[0.6em] uppercase flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-brandYellow"></span>
            Operational Blueprint
          </span>
          <h1 className="text-6xl lg:text-9xl font-extrabold text-brandDark tracking-tighter leading-[0.85]">
            The Scale <br />
            <span className="text-brandDark/20">Protocol.</span>
          </h1>
          <p className="text-2xl lg:text-4xl text-brandDark/60 leading-relaxed max-w-3xl font-medium border-l-[8px] border-brandYellow pl-12">
            Growth is a science of variable reduction. Here is how we systematically de-risk your business.
          </p>
        </div>

        <div className="space-y-40">
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
      </div>
    </div>
  );
};
