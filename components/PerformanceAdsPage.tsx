import React from 'react';
import { Footer } from './Footer';

interface PerformanceAdsPageProps {
  onNavigate: (page: string, serviceId?: string) => void;
}

export const PerformanceAdsPage: React.FC<PerformanceAdsPageProps> = ({ onNavigate }) => {
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
            <span className="text-[10px] font-bold text-brandDark uppercase tracking-[0.25em]">Meta & Google Specialists</span>
          </div>
          
          <h1 className="text-5xl lg:text-[80px] font-black text-brandDark tracking-tighter leading-[0.9] mb-8 animate-slide-up">
            Stop Burning Cash. <br />
            <span className="text-brandYellow">Start Buying Revenue.</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-brandDark/60 font-medium max-w-3xl leading-relaxed mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We don't just "run ads." We engineer <span className="text-brandDark font-bold">profit-printing ecosystems</span> across Meta and Google using offer-led creative and algorithmic media buying.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-brandDark text-white text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Get Your Audit
            </button>
            <button 
              onClick={() => document.getElementById('strategy')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white border-2 border-brandDark/10 text-brandDark text-sm font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-brandBg hover:border-brandDark/30 transition-all"
            >
              How We Do It
            </button>
          </div>
        </div>
      </section>

      {/* The Problem / Solution Grid */}
      <section className="py-24 bg-white border-y border-brandDark/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The "Agency" Problem.</h2>
              <div className="space-y-6">
                {[
                  "Obsessed with vanity metrics (ROAS) while you bleed cash.",
                  "Testing random creatives with no hypothesis or structure.",
                  "Generic targeting that relies on outdated interest stacks.",
                  "Zero accountability for the post-click experience."
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start p-6 bg-red-50/50 rounded-2xl border border-red-100">
                    <svg className="w-6 h-6 text-red-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    <p className="text-brandDark/80 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl lg:text-5xl font-black text-brandDark tracking-tighter">The Techinfigo Way.</h2>
              <div className="space-y-6">
                {[
                  "Focus on MER (Marketing Efficiency Ratio) and nCPA.",
                  "Scientific creative testing loops (The 3:1 Ratio).",
                  "Broad targeting that lets the algorithm find the buyers.",
                  "Full-funnel optimization from ad click to checkout."
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

      {/* Strategy Deep Dive */}
      <section id="strategy" className="py-24 lg:py-32 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandYellow/5 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 space-y-6">
            <span className="text-brandYellow font-bold tracking-[0.3em] uppercase text-xs">Our Methodology</span>
            <h2 className="text-4xl lg:text-6xl font-black tracking-tighter">The Dual-Engine Approach</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Meta Engine */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 space-y-10 group hover:border-brandYellow/30 transition-colors">
              <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight">Meta (Facebook & Instagram)</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  The demand generation engine. We use Meta to interrupt patterns and create desire where none existed.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Creative-First Targeting (Broad)",
                  "DCT (Dynamic Creative Testing) Structures",
                  "High-AOV Bundle Offers",
                  "Retargeting via DPA & Video Views"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/80">
                    <span className="w-1.5 h-1.5 bg-brandYellow rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Google Engine */}
            <div className="bg-[#002a2f] border border-white/5 rounded-[2.5rem] p-10 lg:p-14 space-y-10 group hover:border-brandYellow/30 transition-colors">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-brandDark shadow-lg">
                <svg className="w-8 h-8" viewBox="0 0 24 24"><path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.087 0 12 0 7.31 0 3.256 2.74 1.307 6.704l3.959 3.06z"/><path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078-3.158 0-5.828-2.154-6.773-5.07L1.266 17.09c2.02 4.012 6.185 6.91 10.734 6.91 2.73 0 5.16-.94 7.01-2.537l-2.97-3.45z"/><path fill="#4A90E2" d="M19.834 21.463c2.02-1.87 3.166-4.617 3.166-7.663 0-.675-.058-1.325-.166-1.95H12v4.083h6.583c-.285 1.51-1.14 2.79-2.41 3.638l3.661 3.892z"/><path fill="#FBBC05" d="M5.266 14.235A7.105 7.105 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.307 6.704A11.97 11.97 0 0 0 0 12c0 1.92.445 3.719 1.266 5.316l4-3.081z"/></svg>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-black tracking-tight">Google Ads</h3>
                <p className="text-white/60 text-lg leading-relaxed">
                  The demand capture engine. We ensure that when someone looks for you (or your solution), you own the real estate.
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  "Performance Max (PMax) Scaling",
                  "Brand Search Protection",
                  "YouTube Shorts Direct Response",
                  "Shopping Feed Optimization"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white/80">
                    <span className="w-1.5 h-1.5 bg-brandYellow rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Process Steps */}
      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-black text-brandDark tracking-tighter">The Execution Roadmap</h2>
          </div>
          
          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "The Audit & Foundation",
                desc: "We tear down your ad account, fix pixel tracking, set up CAPI (Conversion API), and audit your creative library to find historical winners."
              },
              {
                step: "02",
                title: "The Testing Sprint",
                desc: "We launch our '3:1 Testing Framework'—3 creative angles for every 1 offer. We use low-budget ad sets to validate hooks before scaling."
              },
              {
                step: "03",
                title: "The Scale Phase",
                desc: "Once a creative hits our target CPA and Hook Rate (>30%), we move it to the scaling campaign and increase spend by 20% daily."
              },
              {
                step: "04",
                title: "The Retention Loop",
                desc: "We deploy specific retargeting ads to handle objections for cart abandoners and cross-sell campaigns for existing buyers."
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
            Ready to scale your ad spend profitably?
          </h2>
          <p className="text-brandDark/80 text-xl font-medium max-w-2xl mx-auto">
            We'll audit your current ad account for free and show you exactly where you're wasting money.
          </p>
          <button 
            onClick={() => onNavigate('contact')}
            className="px-12 py-6 bg-brandDark text-white text-base font-bold uppercase tracking-[0.25em] rounded-xl hover:bg-white hover:text-brandDark transition-all shadow-2xl"
          >
            Book Your Free Audit
          </button>
        </div>
      </section>
    </div>
  );
};
