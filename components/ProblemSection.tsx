
import React, { useState } from 'react';

export const ProblemSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const bottlenecks = [
    {
      id: 1,
      title: "The Revenue-Profit Paradox",
      problem: "Your dashboard shows growth, but rising CAC and hidden overheads are quietly eroding your margins. You're scaling a workload, not a bank balance.",
      fix: "Unit Economic Guardrails",
      fixDesc: "We implement real-time contribution margin tracking to ensure every ₹1 spent on ads generates net profit, not just GMV.",
      size: "large"
    },
    {
      id: 2,
      title: "Algorithm Fragility",
      problem: "Your entire business hinges on a single platform's whim. One policy update or CPM spike can wipe out months of progress.",
      fix: "Omni-Channel Resilience",
      fixDesc: "Diversifying attribution and building first-party data assets to reduce Meta/Google dependency by 40%.",
      size: "medium"
    },
    {
      id: 3,
      title: "The Manual Grind",
      problem: "Your team is solving the same fires every month. No repeatable engines, just human effort.",
      fix: "Automated Ops",
      fixDesc: "Standardizing SOPs and creative pipelines so your growth is independent of individual heroics.",
      size: "small"
    },
    {
      id: 4,
      title: "Blind Scaling",
      problem: "Decisions are made on vanity metrics and gut feeling. You are scaling inefficiency, not success.",
      fix: "Data Infrastructure",
      fixDesc: "A custom attribution model that matches Shopify sales to ad spend with 95%+ accuracy.",
      size: "small"
    }
  ];

  return (
    <section className="w-full bg-[#faf6ed] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase text-brandDark/40 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
              Interactive System Audit
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brandDark leading-tight tracking-tight">
              Scaling breaks where <br /> systems are missing.
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-brandDark/50 text-sm max-w-[280px] leading-relaxed">
              Hover over a bottleneck to reveal the <span className="text-brandDark font-semibold">Strategic Infrastructure Fix</span>.
            </p>
          </div>
        </div>

        {/* Bento Grid Layout - Dark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[300px] md:auto-rows-[280px]">
          
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
                  relative rounded-3xl p-8 transition-all duration-500 cursor-default overflow-hidden
                  ${isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-1 lg:col-span-2' : ''}
                  ${!isLarge && !isMedium ? 'md:col-span-1 lg:col-span-1' : ''}
                  ${isHovered 
                    ? 'bg-[#002a2f] shadow-2xl scale-[1.02] border-brandYellow/20' 
                    : 'bg-brandDark border border-white/5 shadow-sm'}
                  border-2
                `}
              >
                {/* Content Wrapper */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-colors duration-500
                      ${isHovered ? 'bg-brandYellow text-brandDark' : 'bg-white/10 text-brandYellow'}
                    `}>
                      <span className="font-bold text-sm">0{item.id}</span>
                    </div>

                    <h3 className={`
                      font-bold leading-tight transition-colors duration-500 text-white
                      ${isLarge ? 'text-3xl md:text-4xl mb-4' : 'text-2xl mb-3'}
                    `}>
                      {isHovered ? item.fix : item.title}
                    </h3>

                    <p className={`
                      transition-all duration-500 leading-relaxed text-white/60
                      ${isLarge ? 'text-lg' : 'text-sm'}
                      ${isHovered ? 'text-white/80' : ''}
                    `}>
                      {isHovered ? item.fixDesc : item.problem}
                    </p>
                  </div>

                  <div className={`
                    pt-6 border-t transition-colors duration-500 mt-auto border-white/10
                  `}>
                    <span className={`
                      text-[10px] font-bold uppercase tracking-widest block mb-1
                      ${isHovered ? 'text-brandYellow' : 'text-white/30'}
                    `}>
                      {isHovered ? 'The Infrastructure Solution' : 'Critical Bottleneck'}
                    </span>
                    <p className={`
                      font-semibold transition-colors duration-500 text-white
                    `}>
                      {isHovered ? 'Systemic Efficiency +24%' : 'Profit Leakage Detected'}
                    </p>
                  </div>
                </div>

                {/* Decorative Background Elements on Hover */}
                {isHovered && (
                  <div className="absolute top-0 right-0 p-4">
                    <div className="w-12 h-12 border border-white/5 rounded-full flex items-center justify-center animate-spin-slow">
                      <div className="w-1 h-1 bg-brandYellow rounded-full"></div>
                    </div>
                  </div>
                )}
                <div className={`
                  absolute -bottom-10 -right-10 w-48 h-48 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none
                  ${isHovered ? 'bg-brandYellow/10 opacity-100' : 'bg-transparent opacity-0'}
                `}></div>
              </div>
            );
          })}

        </div>

        {/* Section Footer */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between py-6 border-t border-brandDark/5 gap-4">
          <p className="text-brandDark/40 text-xs italic">
            "Interconnected systems outperform isolated strategies every single time."
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-[#faf6ed] bg-brandDark/10"></div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.2em]">82+ Audit Parameters Checked</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};
