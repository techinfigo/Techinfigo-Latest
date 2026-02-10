
import React, { useState } from 'react';

export const ProblemSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bottlenecks = [
    {
      id: 1,
      title: "The Profit Paradox",
      problem: "Your dashboard shows growth, but rising CAC is quietly eroding margins. You're scaling a workload, not a bank balance.",
      fix: "Economic Guardrails",
      fixDesc: "Real-time contribution margin tracking to ensure every ₹1 spent generates net profit, not just GMV.",
      size: "large"
    },
    {
      id: 2,
      title: "Algorithm Fragility",
      problem: "One policy update or CPM spike can wipe out months of progress. Your business hinges on a single platform's whim.",
      fix: "Resilient Attribution",
      fixDesc: "Diversifying attribution and building 1P data to reduce platform dependency by 40%.",
      size: "medium"
    },
    {
      id: 3,
      title: "Manual Grind",
      problem: "Team solving the same fires every month. No repeatable engines, just human effort.",
      fix: "Automated Ops",
      fixDesc: "Standardizing pipelines so growth is independent of individual heroics.",
      size: "small"
    },
    {
      id: 4,
      title: "Blind Scaling",
      problem: "Decisions made on vanity metrics and gut. Scaling inefficiency, not success.",
      fix: "Data Mastery",
      fixDesc: "Custom attribution matching sales to spend with 95%+ accuracy.",
      size: "small"
    }
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-32 lg:py-56 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-24">
          <div className="max-w-3xl">
            <span className="text-[12px] font-bold tracking-[0.6em] uppercase text-brandDark/30 mb-6 block">Strategic Audit</span>
            <h2 className="text-5xl lg:text-7xl font-bold text-brandDark leading-[1] tracking-tighter">
              Scaling breaks where <br /> systems are absent.
            </h2>
          </div>
          <div className="border-l-[6px] border-brandYellow pl-10 max-w-sm">
            <p className="text-brandDark/60 text-xl lg:text-2xl leading-relaxed italic font-medium">
              "We don't fix ads. We re-engineer growth architecture."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {bottlenecks.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isLarge = item.size === 'large';
            const isMedium = item.size === 'medium';

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative rounded-sm p-10 lg:p-14 transition-all duration-500 cursor-default border-2
                  ${isLarge ? 'md:col-span-2 lg:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-2' : ''}
                  ${isHovered 
                    ? 'bg-brandDark border-brandYellow/30 scale-[1.02] shadow-2xl' 
                    : 'bg-white border-brandDark/5 shadow-sm'}
                `}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-sm flex items-center justify-center mb-12 transition-colors ${isHovered ? 'bg-brandYellow text-brandDark' : 'bg-brandDark/5 text-brandDark/30'}`}>
                    <span className="font-bold text-lg">0{item.id}</span>
                  </div>

                  <h3 className={`font-bold text-3xl lg:text-5xl tracking-tighter mb-8 transition-colors ${isHovered ? 'text-white' : 'text-brandDark'}`}>
                    {isHovered ? item.fix : item.title}
                  </h3>

                  <p className={`text-xl lg:text-2xl leading-relaxed mb-12 transition-colors ${isHovered ? 'text-white/70' : 'text-brandDark/50'}`}>
                    {isHovered ? item.fixDesc : item.problem}
                  </p>

                  <div className={`pt-10 border-t mt-auto ${isHovered ? 'border-white/10' : 'border-brandDark/5'}`}>
                    <span className={`text-[12px] font-bold uppercase tracking-[0.4em] block mb-2 ${isHovered ? 'text-brandYellow' : 'text-brandDark/20'}`}>
                      {isHovered ? 'Protocol' : 'Diagnosis'}
                    </span>
                    <p className={`font-bold text-sm tracking-widest uppercase ${isHovered ? 'text-white' : 'text-brandDark'}`}>
                      {isHovered ? 'Maximum Yield Sync' : 'Critical Failure Node'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
