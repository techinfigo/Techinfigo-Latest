import React from 'react';
import { Footer } from './Footer';

interface CROPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const CROPage: React.FC<CROPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Conversion Rate Optimization</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Traffic is Vanity. <br />
            <span className="text-brandYellow">Conversion is Sanity.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We turn your website into a <span className="text-brandDark font-bold">frictionless revenue machine</span> using data-driven A/B testing, user psychology, and technical speed optimization.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              Our Process
            </button>
          </div>
        </div>
      </section>

      {/* The Leaky Bucket vs The Optimized Funnel */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Leaky Bucket.</h2>
              <div className="space-y-6">
                {[
                  "Paying for traffic that bounces immediately (High Bounce Rate).",
                  "Confusing navigation that frustrates potential buyers.",
                  "Slow load times killing mobile conversions instantly.",
                  "Generic product pages that fail to build trust or desire."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Optimized Funnel.</h2>
              <div className="space-y-6">
                {[
                  "Seamless user journeys that guide visitors to checkout.",
                  "Hypothesis-driven testing to validate every change.",
                  "Lightning-fast page speeds for maximum retention.",
                  "Persuasive copy and design that overcomes objections."
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

      {/* Methodology Deep Dive */}
      <section id="methodology" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6 text-center lg:text-left">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Methodology</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The CRO Trinity</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Data & Analytics */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Data Forensics</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We don't guess. We use heatmaps, session recordings, and analytics to pinpoint exactly where users are dropping off.
                </p>
              </div>
            </div>

            {/* User Psychology */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.85.577-4.147l.156-.479" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">User Psychology</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  We optimize for the human brain. Using cognitive biases like scarcity, social proof, and authority to influence decisions.
                </p>
              </div>
            </div>

            {/* Technical Performance */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 space-y-8 group hover:border-brandYellow/30 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brandYellow shadow-lg">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black tracking-tight">Technical Speed</h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Speed is a feature. We optimize code, compress assets, and improve Core Web Vitals to ensure instant loading.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Testing Protocol */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter">The Testing Protocol</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Heuristic Analysis",
                desc: "Our experts manually review your site against 100+ proven usability checkpoints to find obvious friction points."
              },
              {
                step: "02",
                title: "Hypothesis Generation",
                desc: "We formulate data-backed hypotheses. E.g., 'Moving the social proof above the fold will increase add-to-carts by 15%.'"
              },
              {
                step: "03",
                title: "A/B Test Deployment",
                desc: "We design and code the variations, then launch them using tools like VWO or Google Optimize to a segment of your traffic."
              },
              {
                step: "04",
                title: "Analysis & Iteration",
                desc: "We analyze the results for statistical significance. Winners get implemented permanently; losers teach us what to avoid."
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
            Stop leaving money on the table.
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            Get a free CRO audit and discover the hidden revenue opportunities on your site today.
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
