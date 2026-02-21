import React from 'react';
import { Footer } from './Footer';

interface AutomationPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const AutomationPage: React.FC<AutomationPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Marketing Automation Architects</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Scale Your Revenue. <br />
            <span className="text-brandYellow">Not Your Headcount.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We build <span className="text-brandDark font-bold">self-driving growth systems</span> that automate repetitive tasks, personalize customer journeys, and sync your data in real-time.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              The Stack
            </button>
          </div>
        </div>
      </section>

      {/* Manual Chaos vs Automated Order */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Manual Trap.</h2>
              <div className="space-y-6">
                {[
                  "Wasting hours manually exporting CSVs and updating spreadsheets.",
                  "Generic customer experiences because personalization is 'too hard'.",
                  "Inventory stock-outs because sales data isn't syncing with ops.",
                  "Flying blind without a real-time view of your unit economics."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Automated Enterprise.</h2>
              <div className="space-y-6">
                {[
                  "Data flows seamlessly between Shopify, Ads, and CRM instantly.",
                  "1:1 personalization at scale based on browsing and buying behavior.",
                  "Automated alerts for low stock, high returns, or ad fatigue.",
                  "Live dashboards that show you exactly where your profit is."
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

      {/* The Automation Stack */}
      <section id="stack" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center lg:text-left">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Infrastructure</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The Growth Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Data Pipeline */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">01. Data Pipeline</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We unify your fragmented data. Connecting Shopify, Meta, Google, and Klaviyo into a single source of truth for accurate attribution.
              </p>
            </div>

            {/* Customer Journey Logic */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">02. Journey Logic</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                We map and automate complex customer journeys. Triggers based on VIP status, churn risk, or product affinity that fire without you lifting a finger.
              </p>
            </div>

            {/* Reporting Dashboards */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">03. Live Command Center</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                Stop guessing. We build custom Looker Studio or Triple Whale dashboards that show you real-time P&L, MER, and LTV metrics.
              </p>
            </div>

            {/* Operational Alerts */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-6 group hover:border-brandYellow/30 transition-colors">
              <div className="flex justify-between items-start">
                <h3 className="text-3xl font-black tracking-tight text-brandYellow">04. Slack Ops</h3>
                <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                Get notified where you work. We set up Slack alerts for big wins (high-value orders) and critical issues (ad spend spikes, site downtime).
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
                title: "Tech Stack Audit",
                desc: "We review every tool in your subscription list. We cut the bloat, consolidate redundant apps, and ensure everything talks to each other."
              },
              {
                step: "02",
                title: "Integration & Sync",
                desc: "We build the pipes. Connecting your ad platforms, email tool, SMS, and reviews to your central customer data platform."
              },
              {
                step: "03",
                title: "Logic Implementation",
                desc: "We program the 'if this, then that' rules. Automated tagging, segmentation, and flow triggers that run your marketing backend."
              },
              {
                step: "04",
                title: "Dashboard Handoff",
                desc: "We build and hand over your 'Mission Control' dashboard. You get a single link to see the health of your entire business."
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
            Ready to automate your growth?
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Stop doing busy work. Get a free automation audit and see how much time we can save you.
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
