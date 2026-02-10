import React from 'react';

export const GrowthBlueprint: React.FC = () => {
  const stages = [
    {
      id: "STAGE 01",
      title: "Acquire",
      subtitle: "STRUCTURED PAID MEDIA",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11 5.882V19.297A1.705 1.705 0 019.295 21a1.705 1.705 0 01-1.492-2.585l.002-.001.1-.194.01-.023.007-.015a6.75 6.75 0 0112.156-5.432l.007.015.01.023.1.194.002.001A1.705 1.705 0 0118.705 16a1.705 1.705 0 01-1.705-1.705V5.882A3.382 3.382 0 0013.618 2.5a3.382 3.382 0 00-3.382 3.382z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: "STAGE 02",
      title: "Convert",
      subtitle: "FUNNEL & CRO FIXES",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      )
    },
    {
      id: "STAGE 03",
      title: "Retain",
      subtitle: "EMAIL/SMS PROFIT LAYER",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      )
    },
    {
      id: "STAGE 04",
      title: "Scale",
      subtitle: "CONTROLLED, PROFITABLE GROWTH",
      icon: (
        <svg className="w-6 h-6 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <section className="w-full py-32 lg:py-48 px-6 bg-[#001315] relative overflow-hidden font-sans">
      {/* Subtle Grid Background */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none" 
        style={{ 
          backgroundImage: `linear-gradient(#fcb632 1px, transparent 1px), linear-gradient(90deg, #fcb632 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-4">
          <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-brandYellow block">THE BLUEPRINT</span>
          <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Our D2C Growth System
          </h2>
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative group">
              {/* Card Container */}
              <div className="bg-[#002124]/40 border border-white/5 rounded-[2.5rem] p-10 lg:p-12 h-full flex flex-col items-center justify-center text-center backdrop-blur-sm transition-all duration-500 hover:bg-[#002124]/60 hover:border-brandYellow/20 hover:shadow-4xl">
                
                {/* Stage Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 bg-[#002a2f] border border-white/10 rounded-full">
                  <span className="text-[9px] font-black text-white/40 tracking-[0.2em]">{stage.id}</span>
                </div>

                {/* Icon Container */}
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-brandYellow/10 transition-all">
                  {stage.icon}
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                  <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-none">
                    {stage.title}
                  </h3>
                  <p className="text-[10px] lg:text-[11px] font-black text-white/30 tracking-[0.2em] uppercase max-w-[160px] mx-auto leading-relaxed">
                    {stage.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Statement */}
        <div className="mt-24 text-center">
          <p className="text-lg lg:text-xl font-bold text-white tracking-tight">
            This isn't theory. <span className="text-brandYellow">This is how stable D2C brands actually scale.</span>
          </p>
        </div>
      </div>
    </section>
  );
};