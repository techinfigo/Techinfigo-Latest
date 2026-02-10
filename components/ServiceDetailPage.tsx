import React from 'react';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: string) => void;
}

const SERVICE_DATA: Record<string, any> = {
  "performance-ads": {
    title: "D2C Performance Ads (Meta + Google)",
    desc: "Scale profitably with offer-led creative and full-funnel strategy.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    details: [
      "Aggressive scaling via Meta & Google algorithms.",
      "Creative-led testing frameworks to find winning angles.",
      "Full-funnel attribution and unit-economic guardrails.",
      "Dedicated strategist for daily bid and budget management."
    ]
  },
  "cro": {
    title: "Conversion Rate Optimization (CRO) for D2C",
    desc: "Convert more traffic into revenue with data-driven A/B testing.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    details: [
      "Deep-dive user behavior analysis and heatmaps.",
      "Scientific A/B testing of landing pages and product detail pages.",
      "Cart and checkout optimization to reduce friction.",
      "Personalization engines for dynamic user journeys."
    ]
  }
  // Add other services as needed...
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigate }) => {
  const service = SERVICE_DATA[serviceId] || SERVICE_DATA["performance-ads"];

  return (
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* THE REQUESTED CARD STYLE */}
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-4xl border border-brandDark/5 animate-slide-up flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-brandYellow rounded-[1.5rem] flex items-center justify-center text-brandDark shadow-glow shrink-0">
              {service.icon}
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-extrabold text-brandYellow tracking-tighter leading-tight">
                {service.title}
              </h1>
              <p className="text-brandDark/40 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl">
                {service.desc}
              </p>
            </div>
          </div>

          {/* Expanded Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-brandDark tracking-tight">The Protocol</h2>
                <div className="space-y-6">
                  {service.details.map((detail: string, i: number) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-white border border-brandDark/5 rounded-2xl shadow-sm group hover:border-brandYellow transition-colors">
                      <div className="w-8 h-8 rounded-full bg-brandDark text-brandYellow flex items-center justify-center shrink-0 font-bold text-xs">
                        0{i+1}
                      </div>
                      <p className="text-lg text-brandDark/70 font-medium leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-10 bg-brandDark rounded-3xl text-white space-y-8">
                <h3 className="text-2xl font-bold tracking-tight text-brandYellow">Operational Yield</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">AVG EFFICIENCY</p>
                    <p className="text-4xl font-extrabold">+24%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">SYNC LATENCY</p>
                    <p className="text-4xl font-extrabold">{"<"} 24H</p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4 space-y-8">
              <div className="bg-[#fff9f0] border border-brandYellow/20 p-8 rounded-3xl space-y-6">
                <h4 className="text-xs font-bold text-brandDark uppercase tracking-widest">Mandate Status</h4>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-sm font-bold text-brandDark">ACCEPTING MANDATES</span>
                </div>
                <p className="text-brandDark/50 text-xs leading-relaxed">
                  We only deploy this engine for brands doing ₹50L+ monthly run-rate with verified supply chains.
                </p>
                <button 
                  onClick={() => onNavigate('contact')}
                  className="w-full bg-brandDark text-white py-4 font-bold text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-brandYellow hover:text-brandDark transition-all"
                >
                  Apply for Audit
                </button>
              </div>

              <div className="bg-white border border-brandDark/5 p-8 rounded-3xl shadow-sm space-y-4">
                <p className="text-brandDark/30 text-[10px] font-bold uppercase tracking-widest">Related Mandates</p>
                <div className="space-y-2">
                  <button onClick={() => onNavigate('service-detail', 'cro')} className="w-full text-left p-3 hover:bg-brandBg rounded-lg text-xs font-bold text-brandDark transition-colors">
                    • CONVERSION OPS
                  </button>
                  <button onClick={() => onNavigate('service-detail', 'retention')} className="w-full text-left p-3 hover:bg-brandBg rounded-lg text-xs font-bold text-brandDark transition-colors">
                    • RETENTION FLOWS
                  </button>
                </div>
              </div>
            </aside>
          </div>

          <div className="text-center pt-20">
            <button 
              onClick={() => onNavigate('services')}
              className="text-brandDark/30 hover:text-brandYellow transition-colors text-xs font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-3 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
              View All Levers
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};