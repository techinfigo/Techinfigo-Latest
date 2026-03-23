import React from 'react';
import { Footer } from './Footer';

interface CreativePageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const CreativePage: React.FC<CreativePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #001d21 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandYellow/10 border border-brandYellow/20 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Creative Strategy & Production</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Creative is the <br />
            <span className="text-brandYellow">New Targeting.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Algorithms have automated media buying. Your <span className="text-brandDark font-bold">creative assets</span> are now the single biggest lever for scaling ad performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('flywheel')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              The Flywheel
            </button>
          </div>
        </div>
      </section>

      {/* Pretty Pictures vs Performance Creative */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The "Branding" Trap.</h2>
              <div className="space-y-6">
                {[
                  "Focusing on aesthetics over conversion metrics.",
                  "Producing one 'hero' video and hoping it goes viral.",
                  "Guessing what works based on subjective opinions.",
                  "Ignoring format-specific nuances (Reels vs. Stories vs. Feed)."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">Performance Creative.</h2>
              <div className="space-y-6">
                {[
                  "Data-driven concepts built on customer research and reviews.",
                  "High-volume testing of hooks, angles, and CTAs.",
                  "Iterative design that doubles down on winning elements.",
                  "Native-first content that feels like it belongs on the platform."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-brandYellow/5 rounded-2xl border border-brandYellow/20">
                    <svg className="w-6 h-6 text-brandDark shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Creative Flywheel */}
      <section id="flywheel" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.02] blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Process</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The Creative Flywheel</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Research & Strategy */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Research & Strategy</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We mine your reviews, competitor ads, and customer support tickets to find the "voice of customer" angles that resonate.
                </p>
              </div>
            </div>

            {/* Production & Design */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Production</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  From UGC-style videos to high-fidelity motion graphics. We produce assets specifically designed to stop the scroll.
                </p>
              </div>
            </div>

            {/* Analysis & Iteration */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Iteration</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We analyze hold rates, click-throughs, and conversion rates to identify winners, then iterate to extend their lifespan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Execution Roadmap */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter">The Execution Roadmap</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Creative Audit",
                desc: "We review your past ad performance to understand what worked, what failed, and identify your visual identity gaps."
              },
              {
                step: "02",
                title: "Concept Development",
                desc: "We develop 3-5 core 'angles' or hooks to test. Scripts and storyboards are created for approval."
              },
              {
                step: "03",
                title: "Asset Production",
                desc: "Our team of editors and designers brings the concepts to life, creating multiple variations for testing."
              },
              {
                step: "04",
                title: "Launch & Learn",
                desc: "Assets go live. We monitor performance daily and provide a feedback loop to the production team for the next sprint."
              }
            ].map((phase, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-16 items-start p-10 bg-white border border-brandDark/5 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 group">
                <span className="text-6xl font-black text-brandDark/10 group-hover:text-brandYellow transition-colors">{phase.step}</span>
                <div className="space-y-4 pt-2">
                  <h3 className="text-2xl font-black text-brandDark uppercase tracking-tight">{phase.title}</h3>
                  <p className="text-brandDark/60 text-lg leading-relaxed font-medium max-w-2xl">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In-House Production Capabilities */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-[#f9f6f2] border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark/5 border border-brandDark/10 rounded-full">
                <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Studio Capabilities</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-none">
                In-House <br />
                Production <br />
                Standard.
              </h2>
              <p className="text-xl text-brandDark/60 font-medium leading-relaxed max-w-xl">
                We don't just outsource to random freelancers. We own the production cycle. Our in-house studio is built for high-velocity, high-fidelity D2C content.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl border border-brandDark/5 shadow-sm">
                  <h4 className="text-brandDark font-black uppercase tracking-tight mb-2">Pro Lighting</h4>
                  <p className="text-brandDark/60 text-sm font-medium">Equipped with HIFFIN SL50 3-Point LED systems for cinematic, high-contrast product shots.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-brandDark/5 shadow-sm">
                  <h4 className="text-brandDark font-black uppercase tracking-tight mb-2">High-Fidelity</h4>
                  <p className="text-brandDark/60 text-sm font-medium">4K RAW capture and professional audio setups for premium brand perception.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-brandDark rounded-[3rem] overflow-hidden shadow-2xl relative group">
                <img 
                  src="https://picsum.photos/seed/studio/800/1000" 
                  alt="In-House Studio" 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brandDark via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="p-6 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl">
                    <p className="text-white font-bold text-sm tracking-tight italic">"The difference between a ₹500 CAC and a ₹200 CAC is often just the lighting and hook."</p>
                  </div>
                </div>
              </div>
              {/* Decorative nodes */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brandYellow/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-brandYellow relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-tight">
            Stop running ad fatigue.
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Get a free creative audit and we'll show you exactly why your ads aren't converting.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-12 py-6 bg-brandDark text-white text-base font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-white hover:text-brandDark transition-all shadow-2xl"
          >
            Claim Your Free Audit
          </button>
        </div>
      </section>
    </div>
  );
};
