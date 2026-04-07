'use client';

import React from 'react';
import { Footer } from './Footer';

interface InfluencerPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const InfluencerPage: React.FC<InfluencerPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Influencer & UGC Architects</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Trust is the <br />
            <span className="text-brandYellow">New Currency.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            People don't buy from brands; they buy from people. We build <span className="text-brandDark font-bold">armies of advocates</span> that create authentic content and drive measurable revenue.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('engine')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              The Trust Engine
            </button>
          </div>
        </div>
      </section>

      {/* Vanity vs Performance */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Vanity Trap.</h2>
              <div className="space-y-6">
                {[
                  "Paying for 'exposure' from influencers with fake followers.",
                  "One-off posts that get buried in the feed within hours.",
                  "Zero usage rights, meaning you can't run ads with the content.",
                  "Measuring success by 'likes' instead of actual sales."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-brandYellow/5 rounded-2xl border border-brandYellow/10">
                    <svg className="w-6 h-6 text-brandYellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">Performance Influencer.</h2>
              <div className="space-y-6">
                {[
                  "Whitelisting access to run ads directly from creator handles.",
                  "Perpetual usage rights to use UGC across your entire funnel.",
                  "Affiliate-based models that align incentives with revenue.",
                  "Long-term partnerships that build genuine brand ambassadorship."
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

      {/* The Trust Engine */}
      <section id="engine" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center lg:text-left">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Framework</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The Trust Engine</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Identification */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">01. Identification</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We don't just look at follower counts. We analyze engagement rates, audience demographics, and brand affinity to find your perfect match.
              </p>
            </div>

            {/* Outreach & Negotiation */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">02. Outreach</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We handle the DMs and emails. We negotiate usage rights, deliverables, and whitelisting access so you own the assets.
              </p>
            </div>

            {/* Briefing & Management */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">03. Management</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We provide creative briefs that balance brand guidelines with creator freedom. We manage timelines, shipping, and approvals.
              </p>
            </div>

            {/* Scaling & Whitelisting */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">04. Scaling</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We take the best performing organic content and put ad spend behind it via the creator's handle (whitelisting) to scale reach.
              </p>
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
                title: "Audience Audit",
                desc: "We analyze your current customer base to understand who they follow, what content they consume, and where they hang out."
              },
              {
                step: "02",
                title: "Recruitment Drive",
                desc: "We build a list of 100+ potential creators and begin the outreach process to secure 10-20 partners for the pilot."
              },
              {
                step: "03",
                title: "Content Sprint",
                desc: "Products are shipped, briefs are sent, and content starts rolling in. We review everything for quality and brand fit."
              },
              {
                step: "04",
                title: "Whitelisting Launch",
                desc: "We connect the creator's ad accounts to your Business Manager and launch high-converting UGC ads."
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

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-brandYellow relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter leading-tight">
            Scale your social proof.
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Get a free influencer strategy audit and see how we can turn your customers into your best sales team.
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
