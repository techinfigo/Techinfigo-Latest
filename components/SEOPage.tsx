'use client';

import React from 'react';
import { Footer } from './Footer';

interface SEOPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const SEOPage: React.FC<SEOPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">eCommerce SEO Specialists</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Own the Real Estate. <br />
            <span className="text-brandYellow">Stop Renting Traffic.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We build <span className="text-brandDark font-bold">compounding organic moats</span> for D2C brands. Dominate high-intent keywords and reduce your reliance on paid ads.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              Our Strategy
            </button>
          </div>
        </div>
      </section>

      {/* The SEO Myths vs The Reality */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The "SEO is Dead" Myth.</h2>
              <div className="space-y-6">
                {[
                  "Spamming low-quality AI content that gets penalized.",
                  "Buying toxic backlinks that harm your domain authority.",
                  "Ignoring technical debt that blocks Google's crawlers.",
                  "Optimizing for vanity keywords with zero purchase intent."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-brandYellow/5 rounded-2xl border border-brandYellow/10">
                    <svg className="w-6 h-6 text-brandYellow shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Revenue Reality.</h2>
              <div className="space-y-6">
                {[
                  "High-quality content clusters that establish topical authority.",
                  "Digital PR and outreach to earn links from industry giants.",
                  "Technical excellence: Core Web Vitals and schema markup.",
                  "Targeting 'bottom-of-funnel' keywords that drive sales."
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

      {/* The 3 Pillars of SEO */}
      <section id="pillars" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.02] blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Framework</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The SEO Moat</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Technical Foundation */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Technical Foundation</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We fix the plumbing first. Site speed, mobile usability, crawlability, and structured data (Schema) to ensure Google understands your store.
                </p>
              </div>
            </div>

            {/* Content Authority */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Content Authority</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We create "Topic Clusters" that answer every question your customer has. From educational blog posts to high-intent product pages.
                </p>
              </div>
            </div>

            {/* Digital PR & Links */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Authority & PR</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We earn trust through high-quality backlinks from reputable industry publications, news sites, and niche blogs. No shady PBNs.
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
                title: "The Deep Audit",
                desc: "A comprehensive 50-point inspection of your site's technical health, content gaps, and backlink profile."
              },
              {
                step: "02",
                title: "Keyword Strategy",
                desc: "Mapping high-value, low-difficulty keywords to specific product and category pages to capture immediate wins."
              },
              {
                step: "03",
                title: "On-Page Optimization",
                desc: "Rewriting meta tags, optimizing headers, improving internal linking, and fixing broken pages."
              },
              {
                step: "04",
                title: "Authority Building",
                desc: "Launching monthly content sprints and outreach campaigns to build domain authority and climb the rankings."
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
            Build an asset, not just a campaign.
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Get a free SEO audit and see exactly how much organic revenue you're missing out on.
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
