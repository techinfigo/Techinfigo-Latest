import React from 'react';

export const GrowthLifecycle: React.FC = () => {
  const steps = [
    {
      num: "1",
      title: "AUDIT",
      desc: "Identifying leakage in current funnel & unit economics."
    },
    {
      num: "2",
      title: "TEST",
      desc: "Weekly creative sprints to find winning hooks."
    },
    {
      num: "3",
      title: "STABILIZE",
      desc: "Killing the waste and finding a baseline CAC."
    },
    {
      num: "4",
      title: "SCALE",
      desc: "Deploying budget into proven creative/offer combos."
    },
    {
      num: "5",
      title: "RETAIN",
      desc: "Maximizing LTV via automated backend flows."
    }
  ];

  return (
    <section className="py-24 lg:py-40 px-6 bg-[#f9f7f2] font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20 lg:mb-32 space-y-6">
          <h2 className="text-4xl lg:text-6xl font-black text-[#001d21] tracking-tighter">
            Growth Roadmap
          </h2>
          <p className="text-[#001d21]/60 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The exact trajectory we use to take brands from stagnation to scale.
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative lg:min-h-[500px]">
          
          {/* Desktop Road Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
             <div className="w-full h-2 bg-[#e5e5e5] rounded-full overflow-hidden relative">
                <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_50%,#fbb632_50%)] bg-[length:40px_100%] opacity-30 animate-road-flow"></div>
             </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:justify-between relative z-10 gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <div key={i} className="group flex flex-col items-center lg:w-1/5 relative">
                
                {/* Desktop: Alternating Layout */}
                <div className={`
                    hidden lg:flex flex-col items-center absolute left-0 right-0 w-full px-4 transition-all duration-500
                    ${i % 2 === 0 ? 'bottom-[50%] pb-10 group-hover:-translate-y-2' : 'top-[50%] pt-10 group-hover:translate-y-2'}
                `}>
                   {/* Card */}
                   <div className="bg-white rounded-[2rem] p-8 w-full text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#fbb632]/20 relative">
                      <h3 className="text-lg font-black text-[#001d21] uppercase tracking-tight mb-3">
                        {step.title}
                      </h3>
                      <p className="text-[#001d21]/50 text-xs font-medium leading-relaxed">
                        {step.desc}
                      </p>
                      
                      {/* Connector Line */}
                      <div className={`absolute left-1/2 -translate-x-1/2 w-[2px] h-10 bg-[#e5e5e5]
                          ${i % 2 === 0 ? '-bottom-10' : '-top-10'}
                      `}></div>
                   </div>
                </div>

                {/* Marker (On the Road) */}
                <div className="w-16 h-16 bg-[#001d21] rounded-full shadow-lg flex items-center justify-center text-xl font-black text-white relative z-20 ring-8 ring-[#f9f7f2] group-hover:scale-110 group-hover:bg-[#fbb632] group-hover:text-[#001d21] transition-all duration-300">
                  {step.num}
                </div>

                {/* Mobile Content (Vertical) */}
                <div className="lg:hidden mt-6 text-center bg-white rounded-[2rem] p-8 w-full shadow-sm">
                   <h3 className="text-xl font-black text-[#001d21] uppercase tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#001d21]/50 text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile Connector */}
                {i !== steps.length - 1 && (
                  <div className="lg:hidden w-[2px] h-12 bg-[#e5e5e5] my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
      
      <style>{`
        @keyframes roadFlow {
          from { background-position: 0 0; }
          to { background-position: 40px 0; }
        }
        .animate-road-flow {
          animation: roadFlow 1s linear infinite;
        }
      `}</style>
    </section>
  );
};
