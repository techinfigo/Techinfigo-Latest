'use client';

import React from 'react';
import { Footer } from './Footer';

interface RetentionPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const RetentionPage: React.FC<RetentionPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Retention & LTV Specialists</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Acquisition is Silver. <br />
            <span className="text-brandYellow">Retention is Gold.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We turn one-time buyers into <span className="text-brandDark font-bold">lifetime loyalists</span> using hyper-personalized Email & SMS flows that print money while you sleep.
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
              The Engine
            </button>
          </div>
        </div>
      </section>

      {/* Batch & Blast vs Lifecycle Marketing */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The "Spam" Approach.</h2>
              <div className="space-y-6">
                {[
                  "Sending the same generic newsletter to your entire list.",
                  "Annoying customers with daily SMS blasts that cause opt-outs.",
                  "Ignoring the post-purchase experience completely.",
                  "Relying on discounts to drive every single sale."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Retention Engine.</h2>
              <div className="space-y-6">
                {[
                  "Behavior-triggered flows that send the right message at the right time.",
                  "Segmentation that treats VIPs differently than window shoppers.",
                  "Educational content that builds brand affinity and trust.",
                  "Predictive cross-selling based on purchase history."
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

      {/* The Core Flows */}
      <section id="engine" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center lg:text-left">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Infrastructure</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The Core 4 Flows</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Welcome Series */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">01. Welcome Series</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                The first impression. We educate new subscribers on your brand story, values, and best-sellers to drive that critical first purchase.
              </p>
            </div>

            {/* Abandoned Cart */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">02. Abandoned Cart</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                The revenue rescuer. We use dynamic product blocks, social proof, and urgency (not just discounts) to recover lost sales.
              </p>
            </div>

            {/* Post-Purchase */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">03. Post-Purchase</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                The LTV booster. We turn buyers into raving fans with unboxing guides, review requests, and timely cross-sell offers.
              </p>
            </div>

            {/* Win-Back */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">04. Win-Back</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                The churn killer. We identify at-risk customers before they leave and re-engage them with irresistible incentives.
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
                title: "Klaviyo Audit",
                desc: "We dive deep into your account to fix deliverability issues, clean your list, and identify gaps in your current flows."
              },
              {
                step: "02",
                title: "Flow Implementation",
                desc: "We design, write, and build out the core automated flows that will generate revenue on autopilot 24/7."
              },
              {
                step: "03",
                title: "Campaign Calendar",
                desc: "We plan and execute a monthly campaign calendar that aligns with your product drops, holidays, and sales goals."
              },
              {
                step: "04",
                title: "A/B Testing & Scale",
                desc: "We continuously test subject lines, send times, and content to optimize open rates, click rates, and revenue per recipient."
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
            Ready to increase your LTV?
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Get a free retention audit and we'll show you how much revenue you're leaving on the table.
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
