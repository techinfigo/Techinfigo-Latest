
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
    <section className="w-full bg-[#faf6ed] py-48 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row items-baseline justify-between gap-12 mb-24">
          <div className="max-w-2xl">
            <span className="inline-block text-[10px] font-bold tracking-[0.4em] uppercase text-brandDark/40 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
              Strategic Diagnosis
            </span>
            <h2 className="text-5xl md:text-6xl font-bold text-brandDark leading-tight tracking-tight">
              Scaling breaks where <br /> systems are missing.
            </h2>
          </div>
          <div className="lg:text-right border-l-2 lg:border-l-0 lg:border-r-2 border-brandYellow pl-8 lg:pl-0 lg:pr-8">
            <p className="text-brandDark/60 text-lg max-w-[320px] leading-relaxed italic">
              "We don't solve symptoms; we rebuild the underlying growth architecture."
            </p>
          </div>
        </div>

        {/* Bento Grid Layout - Dark Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[340px] md:auto-rows-[300px]">
          
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
                  relative rounded-2xl p-10 transition-all duration-700 cursor-default overflow-hidden
                  ${isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''}
                  ${isMedium ? 'md:col-span-2 lg:col-span-2' : ''}
                  ${!isLarge && !isMedium ? 'md:col-span-1 lg:col-span-1' : ''}
                  ${isHovered 
                    ? 'bg-[#002a2f] shadow-[0_40px_80px_rgba(0,0,0,0.15)] scale-[1.01] border-brandYellow/20' 
                    : 'bg-brandDark border border-white/5 shadow-sm'}
                  border-2
                `}
              >
                {/* Content Wrapper */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center mb-8 transition-all duration-500
                      ${isHovered ? 'bg-brandYellow text-brandDark rotate-12' : 'bg-white/5 text-brandYellow/50'}
                    `}>
                      <span className="font-bold text-sm tracking-tighter">0{item.id}</span>
                    </div>

                    <h3 className={`
                      font-bold leading-none transition-colors duration-500 text-white
                      ${isLarge ? 'text-4xl lg:text-5xl mb-6' : 'text-3xl mb-4'}
                    `}>
                      {isHovered ? item.fix : item.title}
                    </h3>

                    <p className={`
                      transition-all duration-700 leading-relaxed text-white/50
                      ${isLarge ? 'text-xl' : 'text-base'}
                      ${isHovered ? 'text-white/80' : ''}
                    `}>
                      {isHovered ? item.fixDesc : item.problem}
                    </p>
                  </div>

                  <div className={`
                    pt-8 border-t transition-colors duration-700 mt-auto border-white/10
                  `}>
                    <span className={`
                      text-[10px] font-bold uppercase tracking-[0.3em] block mb-2
                      ${isHovered ? 'text-brandYellow' : 'text-white/20'}
                    `}>
                      {isHovered ? 'Resolution Protocol' : 'Current Status'}
                    </span>
                    <p className="text-white font-bold text-sm tracking-tight">
                      {isHovered ? 'Efficiency Lift: High' : 'System Leakage Detected'}
                    </p>
                  </div>
                </div>

                {/* Decorative Background Elements on Hover */}
                <div className={`
                  absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] transition-all duration-1000 pointer-events-none
                  ${isHovered ? 'bg-brandYellow/20 opacity-100' : 'bg-transparent opacity-0'}
                `}></div>
              </div>
            );
          })}

        </div>

        {/* Section Footer */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between py-10 border-t border-brandDark/5 gap-8">
          <div className="flex items-center gap-8">
             <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-[#faf6ed] bg-brandDark/5 transition-transform hover:scale-110"></div>
                ))}
              </div>
              <p className="text-brandDark/40 text-[11px] font-bold uppercase tracking-widest">
                Benchmarked against ₹50Cr+ D2C Leaders
              </p>
          </div>
          <div className="px-8 py-3 bg-brandDark/[0.03] border border-brandDark/5 rounded-full">
            <span className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em]">82+ Critical System Audit Points Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
};
