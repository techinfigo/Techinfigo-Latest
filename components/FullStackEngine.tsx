import React, { useState } from 'react';

interface ModuleData {
  id: string;
  label: string;
  layer: string;
  layerSub: string;
  title: string;
  mission: string;
  inputs: string[];
  impact: string[];
  metricLabel: string;
  metricValue: string;
  image: string;
  icon: React.ReactNode;
}

const MODULES: ModuleData[] = [
  {
    id: 'performance',
    label: 'PERFORMANCE',
    layer: 'LAYER 1',
    layerSub: '01: REACH',
    title: 'Performance Ads',
    mission: 'Offer-led Meta & Google strategies to lower acquisition costs.',
    inputs: ['Creative Testing', 'Broad Scaling'],
    impact: ['Lower CAC', 'New Sales'],
    metricLabel: 'BLENDED MER',
    metricValue: '4.8x',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'cro',
    label: 'CRO',
    layer: 'LAYER 2',
    layerSub: '02: CONVERT',
    title: 'Conversion Ops',
    mission: 'Transforming window shoppers into high-LTV customers.',
    inputs: ['A/B Testing', 'Funnel Design'],
    impact: ['CVR Lift', 'ROAS Boost'],
    metricLabel: 'CONV. LIFT',
    metricValue: '+32%',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'seo',
    label: 'SEO',
    layer: 'LAYER 3',
    layerSub: '03: AUTHORITY',
    title: 'Organic Scale',
    mission: 'Building organic value through search visibility.',
    inputs: ['Keyword Ops', 'Technical SEO'],
    impact: ['Free Traffic', 'Brand Moat'],
    metricLabel: 'ORGANIC REV',
    metricValue: '₹1.2Cr+',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 'email',
    label: 'EMAIL',
    layer: 'LAYER 4',
    layerSub: '04: RETAIN',
    title: 'Retention Flows',
    mission: 'Maximizing the LTV of every customer through loops.',
    inputs: ['Klaviyo Flows', 'List Hygiene'],
    impact: ['LTV Compound', 'Direct Rev'],
    metricLabel: 'LTV MULTI',
    metricValue: '2.4x',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    layer: 'LAYER 5',
    layerSub: '05: SYNC',
    title: 'Growth Systems',
    mission: 'Integrate stacks to save hours and personalize journeys.',
    inputs: ['Stack Sync', 'Task Automation'],
    impact: ['Efficiency', 'Data Integrity'],
    metricLabel: 'TIME SAVED',
    metricValue: '10h/wk',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )
  },
  {
    id: 'creative',
    label: 'CREATIVE',
    layer: 'LAYER 6',
    layerSub: '06: CONTENT',
    title: 'Performance Creative',
    mission: 'Fuel the engine with assets that stop the scroll.',
    inputs: ['UGC Lab', 'Motion Design'],
    impact: ['CTR Lift', 'Brand Recall'],
    metricLabel: 'HOOK RATE',
    metricValue: '42%',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'influencer',
    label: 'INFLUENCER',
    layer: 'LAYER 7',
    layerSub: '07: TRUST',
    title: 'Influencer Ops',
    mission: 'Leveraging trust to scale beyond algorithmic limits.',
    inputs: ['Seeding Lab', 'Whitelisting'],
    impact: ['Social Proof', 'Viral Loops'],
    metricLabel: 'PROFIT SCALE',
    metricValue: '5.4x',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

export const FullStackEngine: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0); 
  const activeModule = MODULES[activeIndex];

  const handlePrev = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : MODULES.length - 1));
  const handleNext = () => setActiveIndex((prev) => (prev < MODULES.length - 1 ? prev + 1 : 0));

  return (
    <section className="w-full py-16 lg:py-28 px-6 bg-brandDark font-sans overflow-hidden relative">
      {/* Dynamic Background Glow to highlight the active section */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_#fcb63208_0%,_transparent_60%)] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter leading-none">
            Your Full-Stack Growth Engine
          </h2>
          <p className="text-white/40 text-lg lg:text-xl font-medium max-w-2xl mx-auto">
            One integrated team to manage strategy, creative, media, and retention.
          </p>
        </div>

        {/* Tab Navigation Pill */}
        <div className="bg-white/5 border border-white/5 rounded-full p-2 flex flex-wrap lg:flex-nowrap items-center justify-between backdrop-blur-md max-w-6xl mx-auto">
          {MODULES.map((module, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={module.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 min-w-[120px] py-4 flex flex-col items-center gap-2 transition-all duration-500 relative rounded-full ${
                  isActive ? 'bg-brandDark text-white shadow-2xl z-10' : 'bg-transparent text-white/40 hover:bg-white/5'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-brandYellow text-brandDark' : 'bg-white/5'}`}>
                  {React.cloneElement(module.icon as React.ReactElement<any>)}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.15em]">{module.label}</span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-brandYellow rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Card - High Contrast Split Design */}
        <div className="bg-white rounded-[4rem] shadow-4xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 lg:min-h-[620px] h-auto animate-fade-in transition-all duration-500">
          
          {/* Left Content Column (White Area) */}
          <div className="lg:col-span-6 p-8 lg:p-12 flex flex-col justify-between h-full">
            <div className="space-y-8">
              
              {/* Meta Headings */}
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-brandDark rounded-xl flex items-center justify-center text-brandYellow shadow-lg">
                  {React.cloneElement(activeModule.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.3em]">
                    INTEGRATED SYSTEM {activeModule.layer}
                  </span>
                  <p className="text-[9px] lg:text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.25em] leading-none">
                    {activeModule.layerSub}
                  </p>
                </div>
              </div>

              {/* Main Title */}
              <h3 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none uppercase">
                {activeModule.title}
              </h3>

              {/* Strategic Mission Block */}
              <div className="border-l-[6px] lg:border-l-[8px] border-brandYellow pl-6 lg:pl-8 space-y-1.5">
                <span className="text-[9px] lg:text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">STRATEGIC MISSION</span>
                <p className="text-xl lg:text-2xl font-bold text-brandDark/70 italic leading-tight max-w-sm">
                  "{activeModule.mission}"
                </p>
              </div>

              {/* Functional Details Grid */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brandDark/5">
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-brandDark/20 uppercase tracking-widest block mb-1">INPUTS</span>
                  <ul className="space-y-2">
                    {activeModule.inputs.map((input, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-brandYellow"></div>
                        <span className="text-sm lg:text-lg font-black text-brandDark tracking-tight">{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-3">
                  <span className="text-[9px] font-bold text-brandDark/20 uppercase tracking-widest block mb-1">IMPACT</span>
                  <ul className="space-y-2">
                    {activeModule.impact.map((impact, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <svg className="w-4 h-4 text-brandYellow" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm lg:text-lg font-black text-brandDark tracking-tight">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Actions Area */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8">
              <button className="w-full sm:w-auto px-10 py-6 bg-brandYellow text-brandDark font-black text-[12px] uppercase tracking-[0.25em] rounded-xl hover:bg-brandDark hover:text-white transition-all shadow-glow hover:scale-105">
                See Full Playbook →
              </button>

              <div className="flex items-center gap-6">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-brandDark/10 flex items-center justify-center hover:bg-brandDark hover:text-white transition-all group"
                >
                  <svg className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] font-bold text-brandDark/20 uppercase tracking-widest mb-1 leading-none">MODULE</p>
                  <p className="text-xl lg:text-2xl font-black text-brandDark tracking-widest">{activeIndex + 1}/{MODULES.length}</p>
                </div>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-brandDark/10 flex items-center justify-center hover:bg-brandDark hover:text-white transition-all group"
                >
                  <svg className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Column (Dark Area) */}
          <div className="lg:col-span-6 relative overflow-hidden group min-h-[450px] lg:min-h-0 bg-brandDark">
            <img 
              key={activeModule.id}
              src={activeModule.image} 
              alt={activeModule.title} 
              className="w-full h-full object-cover grayscale brightness-[0.25] transition-transform duration-[5000ms] group-hover:scale-110 opacity-70"
            />
            
            {/* Visual Overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brandDark/5 to-brandDark/40"></div>
            <div className="absolute inset-0 bg-[#001d21]/20 mix-blend-multiply"></div>
            
            {/* Large Floating Metric Card - CRITICAL VISIBILITY FIX */}
            <div className="absolute bottom-10 right-10 z-[30] bg-[#002a2f] border border-white/10 p-10 lg:p-14 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-float-high">
               <span className="text-[11px] lg:text-[12px] font-black text-brandYellow uppercase tracking-[0.5em] block mb-4">
                 {activeModule.metricLabel}
               </span>
               <h4 className="text-6xl lg:text-[100px] font-black text-white tracking-tighter leading-none">
                 {activeModule.metricValue}
               </h4>
               
               {/* Decorative corner accent */}
               <div className="absolute top-6 right-6 w-3 h-3 bg-brandYellow/20 rounded-full"></div>
            </div>
          </div>

        </div>

      </div>
      
      <style>{`
        @keyframes floatHigh {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-25px) scale(1.02); }
        }
        .animate-float-high { 
          animation: floatHigh 8s ease-in-out infinite; 
          will-change: transform;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};