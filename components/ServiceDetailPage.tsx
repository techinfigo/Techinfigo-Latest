import React from 'react';

interface ServiceDetailPageProps {
  serviceId: string;
  onNavigate: (page: string, serviceId?: string) => void;
}

const SERVICE_DATA: Record<string, any> = {
  "performance-ads": {
    title: "D2C Performance Ads (Meta + Google)",
    desc: "Scale profitably with offer-led creative and full-funnel strategy.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    protocol: [
      { id: "NODE_01", name: "Algorithmic Analysis", detail: "Deep-layer auditing of account history to isolate high-yield variables." },
      { id: "NODE_02", name: "Creative Engineering", detail: "Systematic production of direct-response assets based on successful archetypes." },
      { id: "NODE_03", name: "Liquidity Management", detail: "Real-time bid adjustments ensuring budget flows only into profit-positive nodes." },
      { id: "NODE_04", name: "Attribution Sync", detail: "Connecting platform metrics to your bank ledger with custom tracking infrastructure." }
    ],
    metrics: [
      { label: "Avg Efficiency Lift", val: "+28%" },
      { label: "CAC Reduction", val: "-14%" }
    ]
  },
  "cro": {
    title: "Conversion Rate Optimization (CRO)",
    desc: "Convert more traffic into revenue with data-driven A/B testing.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    protocol: [
      { id: "NODE_01", name: "Funnel Diagnostics", detail: "Identifying high-friction nodes using heatmaps and user-session forensics." },
      { id: "NODE_02", name: "Hypothesis Lab", detail: "Scientific A/B testing framework to validate site improvements." },
      { id: "NODE_03", name: "Technical Speed Ops", detail: "Refining LCP and TBT metrics for near-instant mobile load times." },
      { id: "NODE_04", name: "Psychological Triggers", detail: "Deploying micro-copy and social proof nodes to reduce checkout dropoff." }
    ],
    metrics: [
      { label: "Conversion Lift", val: "+1.4x" },
      { label: "Session Value", val: "+22%" }
    ]
  }
};

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, onNavigate }) => {
  const service = SERVICE_DATA[serviceId] || SERVICE_DATA["performance-ads"];

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Background Dot Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #001d21 1.5px, transparent 1.5px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32 relative z-10">
        
        {/* REDESIGNED HEADER CARD - EXACT MATCH TO USER IMAGE */}
        <div className="bg-white rounded-[3rem] p-10 lg:p-14 shadow-4xl border-2 border-dotted border-brandYellow/20 animate-slide-up flex flex-col md:flex-row items-center gap-12 mb-20 group">
          <div className="w-24 h-24 lg:w-32 lg:h-32 bg-brandYellow rounded-[2rem] flex items-center justify-center text-brandDark shadow-glow shrink-0 transition-all duration-700 group-hover:rotate-6">
            {service.icon}
          </div>
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-4xl lg:text-7xl font-black text-brandYellow tracking-tighter leading-tight">
              {service.title}
            </h1>
            <p className="text-[#9eaeb0] text-xl lg:text-3xl font-medium tracking-tight max-w-3xl leading-relaxed">
              {service.desc}
            </p>
          </div>
        </div>

        {/* Content Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-24">
            
            {/* Operational Nodes with Folder Tab Aesthetic */}
            <div className="space-y-12">
              <div className="flex items-center justify-between border-b border-dotted border-brandYellow/30 pb-6">
                <h2 className="text-3xl font-black text-brandDark tracking-tighter uppercase">Deployment Protocol</h2>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
                   <div className="w-2 h-2 rounded-full bg-brandDark/10"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {service.protocol.map((node: any, i: number) => (
                  <div key={i} className="group relative pt-6 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                    {/* Folder Tab Effect */}
                    <div className="absolute top-0 left-0 w-28 h-8 bg-[#f8f8f8] border-x-2 border-t-2 border-dotted border-brandYellow/40 rounded-t-2xl z-0 group-hover:bg-brandDark group-hover:border-brandDark transition-all duration-500"></div>
                    
                    <div className="relative z-10 p-8 bg-white border-2 border-dotted border-brandYellow/40 rounded-tr-[2rem] rounded-b-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col gap-6 group-hover:border-brandYellow h-full">
                       <span className="text-[10px] font-mono font-bold text-brandDark/30 group-hover:text-brandYellow transition-colors">{node.id}</span>
                       <div className="space-y-3">
                         <h3 className="text-2xl font-bold text-brandDark tracking-tight group-hover:text-brandYellow transition-colors">{node.name}</h3>
                         <p className="text-brandDark/50 text-sm leading-relaxed font-medium">
                           {node.detail}
                         </p>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Readout Dashboard */}
            <div className="bg-brandDark rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden shadow-4xl group border border-white/5">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-16">
                <div className="space-y-6">
                  <span className="text-[11px] font-bold text-brandYellow uppercase tracking-[0.5em] flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-brandYellow animate-pulse"></span>
                    System Benchmark
                  </span>
                  <h3 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">Yield <br /><span className="text-white/20">Optimization.</span></h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 w-full md:w-auto">
                  {service.metrics.map((metric: any, i: number) => (
                    <div key={i} className="space-y-3 border-l-2 border-white/10 pl-10">
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{metric.label}</p>
                      <p className="text-5xl lg:text-6xl font-black text-brandYellow tracking-tighter">{metric.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] font-mono font-bold text-white/20 tracking-widest uppercase">
                <div className="flex gap-10">
                   <span>CORE_ENGINE_V5.2</span>
                   <span>LATENCY: 0ms</span>
                </div>
                <span className="text-emerald-500">SYNC_STATUS: OPTIMAL</span>
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-12">
            {/* Deployment Action Badge */}
            <div className="bg-[#fff9f0] border-2 border-dotted border-brandYellow/40 p-12 rounded-[3rem] shadow-sm space-y-12 animate-slide-up">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandDark text-white rounded-full">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Ready for Deploy</span>
                </div>
                <h4 className="text-3xl font-black text-brandDark tracking-tighter leading-none">Activate this Node?</h4>
                <p className="text-brandDark/50 text-base leading-relaxed font-medium">
                  We deploy this infrastructure for brands with <span className="text-brandDark font-bold">₹50L+ run-rate</span> and verified unit economics.
                </p>
              </div>

              <button 
                onClick={() => onNavigate('contact')}
                className="w-full bg-brandDark text-white py-8 font-bold text-xs uppercase tracking-[0.4em] rounded-2xl hover:bg-brandYellow hover:text-brandDark transition-all shadow-xl group flex items-center justify-center gap-4"
              >
                Initiate Audit
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
              
              <p className="text-[10px] font-bold text-brandDark/30 text-center uppercase tracking-widest">Mandatory Verification Sequence</p>
            </div>

            {/* Adjacent Nodes */}
            <div className="bg-white border-2 border-dotted border-brandDark/5 p-10 rounded-[3rem] shadow-sm space-y-10">
              <h4 className="text-[10px] font-bold text-brandDark/40 uppercase tracking-[0.4em]">Integrated Nodes</h4>
              <div className="space-y-4">
                {['cro', 'retention', 'seo'].filter(id => id !== serviceId).map((id) => (
                  <button 
                    key={id}
                    onClick={() => onNavigate('service-detail', id)}
                    className="w-full group flex items-center justify-between p-5 bg-brandBg rounded-2xl border border-transparent hover:border-brandYellow transition-all"
                  >
                    <span className="text-sm font-bold text-brandDark uppercase tracking-widest group-hover:text-brandYellow transition-colors">{id === 'cro' ? 'Conversion Ops' : id.toUpperCase()}</span>
                    <div className="w-8 h-8 rounded-full border-2 border-dotted border-brandYellow/20 flex items-center justify-center group-hover:bg-brandYellow group-hover:border-brandYellow transition-all">
                      <svg className="w-4 h-4 text-brandDark/20 group-hover:text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Global Exit Navigation */}
        <div className="mt-40 pt-20 border-t border-dotted border-brandYellow/20 flex flex-col items-center gap-12 animate-slide-up">
          <button 
            onClick={() => onNavigate('services')}
            className="text-brandDark/30 hover:text-brandYellow transition-colors text-xs font-bold uppercase tracking-[0.5em] flex items-center gap-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7"></path></svg>
            Return to Core Directory
          </button>
          <div className="flex gap-4">
             <div className="w-2 h-2 rounded-full bg-brandYellow"></div>
             <div className="w-2 h-2 rounded-full bg-brandYellow/20"></div>
             <div className="w-2 h-2 rounded-full bg-brandYellow/20"></div>
          </div>
        </div>

      </div>
    </div>
  );
};