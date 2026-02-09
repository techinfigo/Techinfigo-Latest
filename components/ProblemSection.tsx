
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
      fix: "Channel Resilience",
      fixDesc: "Diversifying attribution and building 1P data to reduce Meta/Google dependency by 40%.",
      size: "medium"
    },
    {
      id: 3,
      title: "The Manual Grind",
      problem: "Team solving the same fires every month. No repeatable engines, just human effort.",
      fix: "Automated Ops",
      fixDesc: "Standardizing pipelines so growth is independent of individual heroics.",
      size: "small"
    },
    {
      id: 4,
      title: "Blind Scaling",
      problem: "Decisions made on vanity metrics and gut. Scaling inefficiency, not success.",
      fix: "Data Infrastructure",
      fixDesc: "Custom attribution matching sales to spend with 95%+ accuracy.",
      size: "small"
    }
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-24 lg:py-48 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-8 lg:gap-12 mb-16 lg:mb-24">
          <div className="max-w-2xl">
            <span className="text-[9px] lg:text-[10px] font-bold tracking-[0.4em] uppercase text-brandDark/40 mb-4 block">Strategic Diagnosis</span>
            <h2 className="text-4xl lg:text-6xl font-bold text-brandDark leading-tight tracking-tight">
              Scaling breaks where <br className="hidden lg:block" /> systems are missing.
            </h2>
          </div>
          <div className="border-l-4 border-brandYellow pl-6">
            <p className="text-brandDark/60 text-base lg:text-lg max-w-[320px] leading-relaxed italic">
              "We don't solve symptoms; we rebuild growth architecture."
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-auto">
          {bottlenecks.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isLarge = item.size === 'large';
            const isMedium = item.size === 'medium';

            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setHoveredIndex(isHovered ? null : index)}
                className={`
                  relative rounded-xl p-6 lg:p-10 transition-all duration-500 cursor-pointer lg:cursor-default overflow-hidden border-2
                  ${isLarge ? 'md:col-span-2 lg:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-2' : ''}
                  ${isHovered 
                    ? 'bg-[#002a2f] border-brandYellow/20 scale-[1.01]' 
                    : 'bg-brandDark border-white/5 shadow-sm'}
                `}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center mb-6 lg:mb-8 transition-colors ${isHovered ? 'bg-brandYellow text-brandDark' : 'bg-white/5 text-brandYellow/50'}`}>
                    <span className="font-bold text-xs tracking-tighter">0{item.id}</span>
                  </div>

                  <h3 className={`font-bold text-2xl lg:text-4xl text-white mb-4 ${isLarge ? 'lg:text-5xl' : ''}`}>
                    {isHovered ? item.fix : item.title}
                  </h3>

                  <p className={`text-sm lg:text-base leading-relaxed text-white/50 mb-8 transition-colors ${isHovered ? 'text-white/80' : ''}`}>
                    {isHovered ? item.fixDesc : item.problem}
                  </p>

                  <div className="pt-6 border-t border-white/10 mt-auto">
                    <span className={`text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.3em] block mb-1 ${isHovered ? 'text-brandYellow' : 'text-white/20'}`}>
                      {isHovered ? 'Resolution' : 'Status'}
                    </span>
                    <p className="text-white font-bold text-xs tracking-tight">
                      {isHovered ? 'Efficiency: High' : 'Leakage Detected'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 lg:mt-24 flex flex-col md:flex-row items-center justify-between py-8 border-t border-brandDark/5 gap-6">
          <p className="text-brandDark/40 text-[9px] lg:text-[11px] font-bold uppercase tracking-widest text-center">
            Benchmarked against ₹50Cr+ D2C Leaders
          </p>
          <div className="px-6 py-2 bg-brandDark/[0.03] border border-brandDark/5 rounded-full">
            <span className="text-[8px] lg:text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.2em]">82+ Audit Points Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
};
