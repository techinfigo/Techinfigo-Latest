import React, { useState } from 'react';

interface ModuleData {
  id: string;
  label: string;
  layer: string;
  title: string;
  mission: string;
  inputs: string[];
  impact: string[];
  timeSaved: string;
  image: string;
  icon: React.ReactNode;
}

const MODULES: ModuleData[] = [
  {
    id: 'performance',
    label: 'PERFORMANCE',
    layer: 'LAYER 1',
    title: 'Media Buying',
    mission: 'Buy high-intent traffic at profitable unit economics.',
    inputs: ['Meta Ads', 'Google Ads'],
    impact: ['Scale Velocity', 'CAC Control'],
    timeSaved: '15h/wk',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 'cro',
    label: 'CRO',
    layer: 'LAYER 2',
    title: 'Conversion Ops',
    mission: 'Transform clicks into customers through scientific testing.',
    inputs: ['A/B Testing', 'Funnel Design'],
    impact: ['CVR Lift', 'ROAS Boost'],
    timeSaved: '12h/wk',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  {
    id: 'seo',
    label: 'SEO',
    layer: 'LAYER 3',
    title: 'Organic Scale',
    mission: 'Build organic compounding value through search visibility.',
    inputs: ['Keyword Ops', 'Technical SEO'],
    impact: ['Free Traffic', 'Authority'],
    timeSaved: '8h/wk',
    image: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  },
  {
    id: 'email',
    label: 'EMAIL',
    layer: 'LAYER 4',
    title: 'Retention',
    mission: 'Extract maximum LTV from every customer in the ecosystem.',
    inputs: ['Klaviyo Flows', 'List Hygiene'],
    impact: ['LTV Compound', 'Direct Rev'],
    timeSaved: '20h/wk',
    image: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'automation',
    label: 'AUTOMATION',
    layer: 'LAYER 5',
    title: 'Automation',
    mission: 'Integrate stacks to save hours and personalize journeys.',
    inputs: ['Stack Sync', 'Task Automation'],
    impact: ['Efficiency', 'Data Integrity'],
    timeSaved: '10h/wk',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    )
  },
  {
    id: 'creative',
    label: 'CREATIVE',
    layer: 'LAYER 6',
    title: 'Performance Creative',
    mission: 'Fuel the engine with assets that stop the scroll.',
    inputs: ['UGC Lab', 'Motion Design'],
    impact: ['CTR Lift', 'Brand Recall'],
    timeSaved: '18h/wk',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'influencer',
    label: 'INFLUENCER',
    layer: 'LAYER 7',
    title: 'Influencer Ops',
    mission: 'Leverage third-party trust to bypass skepticism.',
    inputs: ['Seeding Lab', 'Creator Whitelisting'],
    impact: ['Social Proof', 'Viral Loops'],
    timeSaved: '25h/wk',
    image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&q=80&w=800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];

export const FullStackEngine: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(4); // Start on Automation (Index 4)
  const activeModule = MODULES[activeIndex];

  const handlePrev = () => setActiveIndex((prev) => (prev > 0 ? prev - 1 : MODULES.length - 1));
  const handleNext = () => setActiveIndex((prev) => (prev < MODULES.length - 1 ? prev + 1 : 0));

  return (
    <section className="w-full py-24 lg:py-32 px-6 bg-[#fcfcfc] font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <div className="text-center space-y-6">
          <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter">
            Your Full-Stack Growth Engine
          </h2>
          <p className="text-brandDark/40 text-lg lg:text-xl font-medium">
            One integrated team to manage strategy, creative, media, and retention.
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white border border-brandDark/5 rounded-3xl p-1 shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-between overflow-hidden">
          {MODULES.map((module, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={module.id}
                onClick={() => setActiveIndex(idx)}
                className={`flex-1 min-w-[120px] py-6 flex flex-col items-center gap-4 transition-all duration-500 relative ${
                  isActive ? 'bg-brandDark text-white shadow-2xl z-10' : 'bg-transparent text-brandDark/40 hover:bg-brandDark/5'
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-brandYellow text-brandDark' : 'bg-brandDark/5'}`}>
                  {module.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{module.label}</span>
                {isActive && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brandYellow rounded-full translate-y-2"></div>}
              </button>
            );
          })}
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-[3rem] shadow-4xl border border-brandDark/5 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px] animate-fade-in">
          
          {/* Left Content Side */}
          <div className="lg:col-span-6 p-10 lg:p-20 flex flex-col justify-between">
            <div className="space-y-12">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-brandDark rounded-xl flex items-center justify-center text-brandYellow">
                  {activeModule.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-brandYellow uppercase tracking-[0.4em]">INTEGRATED SYSTEM {activeModule.layer}</span>
                  <p className="text-[10px] font-bold text-brandDark/20 uppercase tracking-widest">0{activeIndex + 1}: {activeModule.id.toUpperCase()}</p>
                </div>
              </div>

              <h3 className="text-5xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none uppercase">
                {activeModule.title}
              </h3>

              <div className="border-l-[6px] border-brandYellow pl-10 space-y-2">
                <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.5em]">STRATEGIC MISSION</span>
                <p className="text-xl lg:text-2xl font-bold text-brandDark/60 italic leading-relaxed">
                  "{activeModule.mission}"
                </p>
              </div>

              <div className="grid grid-cols-2 gap-10 pt-10 border-t border-brandDark/5">
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.5em]">INPUTS</span>
                  <ul className="space-y-3">
                    {activeModule.inputs.map((input, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
                        <span className="text-sm font-black text-brandDark tracking-tight">{input}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.5em]">IMPACT</span>
                  <ul className="space-y-3">
                    {activeModule.impact.map((impact, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <svg className="w-4 h-4 text-brandYellow" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path></svg>
                        <span className="text-sm font-black text-brandDark tracking-tight">{impact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-16 mt-16 border-t border-brandDark/5">
              <button className="px-10 py-5 bg-brandYellow text-brandDark font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandDark hover:text-white transition-all shadow-glow">
                See Full Playbook →
              </button>

              <div className="flex items-center gap-6">
                <button 
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full border border-brandDark/10 flex items-center justify-center hover:bg-brandDark hover:text-white transition-all group"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <div className="text-center min-w-[80px]">
                  <p className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em] mb-1">MODULE</p>
                  <p className="text-xs font-black text-brandDark tracking-widest">{activeIndex + 1}/{MODULES.length}</p>
                </div>
                <button 
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full border border-brandDark/10 flex items-center justify-center hover:bg-brandDark hover:text-white transition-all group"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Side */}
          <div className="lg:col-span-6 relative overflow-hidden group">
            <img 
              key={activeModule.id}
              src={activeModule.image} 
              alt={activeModule.title} 
              className="w-full h-full object-cover grayscale brightness-50 transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-brandDark/20 to-brandDark/60 lg:hidden"></div>
            
            {/* Floating Stats Badge */}
            <div className="absolute bottom-12 right-12 bg-brandDark/90 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-4xl animate-float">
               <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em] block mb-2">TIME SAVED</span>
               <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter">{activeModule.timeSaved}</h4>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};