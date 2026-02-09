
import React from 'react';

interface ServicesPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const servicePillars = [
    {
      id: "01",
      title: "Growth Infrastructure",
      subtitle: "The Foundation",
      desc: "We don't just run ads. We rebuild your attribution, tracking, and P&L modeling to ensure data integrity at scale.",
      features: ["Attribution Modeling", "Unit Economic Audits", "Custom Data Dashboards", "Tech Stack Optimization"]
    },
    {
      id: "02",
      title: "Paid Acquisition",
      subtitle: "Precision Scaling",
      desc: "Omni-channel execution across Meta, Google, and Amazon with a primary focus on net-contribution margin, not just ROAS.",
      features: ["Meta Ads Dominance", "Google Search & Shopping", "Media Buying Automation", "Market Expansion Strategies"]
    },
    {
      id: "03",
      title: "Creative Strategy",
      subtitle: "The Variable",
      desc: "Systematic creative production driven by data. We identify winners through iterative testing cycles and scale them aggressively.",
      features: ["UGC Strategy", "Direct Response Design", "Creative Performance Audits", "Rapid Prototyping"]
    },
    {
      id: "04",
      title: "Retention & LTV",
      subtitle: "The Compounder",
      desc: "Maximizing the value of every acquired customer through automated lifecycle loops and high-frequency engagement.",
      features: ["Email & SMS Automation", "WhatsApp Marketing", "Loyalty Infrastructure", "Churn Mitigation"]
    }
  ];

  return (
    <div className="min-h-screen bg-brandBg pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-32 space-y-8">
          <span className="text-[10px] font-mono font-bold text-brandDark/30 tracking-[0.5em] uppercase flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-brandYellow"></span>
            Execution Mandates
          </span>
          <h1 className="text-6xl lg:text-8xl font-bold text-brandDark tracking-tighter leading-[0.85]">
            Full-Stack <br />
            <span className="text-brandDark/20">Growth Ops.</span>
          </h1>
          <p className="text-xl lg:text-2xl text-brandDark/60 leading-relaxed max-w-2xl font-medium border-l-4 border-brandYellow pl-8">
            We operate as your outsourced growth department. Our services are integrated, systematic, and purely performance-driven.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-40">
          {servicePillars.map((service) => (
            <div key={service.id} className="group bg-white p-12 border border-brandDark/5 shadow-sm transition-all duration-700 hover:shadow-2xl hover:scale-[1.01] relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-baseline mb-12">
                  <span className="text-sm font-mono font-bold text-brandYellow">{service.id}</span>
                  <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.3em]">{service.subtitle}</span>
                </div>
                
                <h3 className="text-4xl font-bold text-brandDark mb-6 tracking-tight group-hover:text-brandYellow transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-brandDark/60 text-lg leading-relaxed mb-10 min-h-[80px]">
                  {service.desc}
                </p>

                <div className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-brandDark/10 group-hover:bg-brandYellow transition-colors"></div>
                      <span className="text-xs font-bold text-brandDark/40 uppercase tracking-widest">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brandYellow/20 transition-all duration-700"></div>
            </div>
          ))}
        </div>

        {/* Process/How we work banner */}
        <div className="bg-brandDark text-white p-12 lg:p-20 rounded-sm mb-40 relative overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="h-full w-full fill-current text-white">
              <path d="M0 0h100v100H0zM10 10v80h80V10H10z" />
            </svg>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
            <div className="lg:col-span-1 border-r border-white/10 pr-8">
               <h4 className="text-[10px] font-bold uppercase tracking-[0.5em] text-brandYellow mb-6">Our Protocol</h4>
               <p className="text-2xl font-bold tracking-tight text-white leading-tight mb-4">Integrated Execution</p>
               <p className="text-white/40 text-sm leading-relaxed">We don't sell hours. We sell outcomes. All services are bundled into a single scaling mandate.</p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
               <div>
                  <p className="text-brandYellow font-mono text-sm mb-4">/ Efficiency</p>
                  <p className="text-white/60 text-sm leading-relaxed">Every service is audited weekly against your actual bank balance, not just ad platforms.</p>
               </div>
               <div>
                  <p className="text-brandYellow font-mono text-sm mb-4">/ Speed</p>
                  <p className="text-white/60 text-sm leading-relaxed">Rapid deployment cycles. We go from audit to active infrastructure in under 14 business days.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Section Closure */}
        <div className="text-center py-20 border-t border-brandDark/5">
          <h2 className="text-4xl font-bold text-brandDark tracking-tighter mb-8">Ready to deploy the engine?</h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-brandDark text-white px-12 py-6 rounded-sm font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-brandYellow hover:text-brandDark transition-all duration-300 shadow-xl"
          >
            Request System Audit
          </button>
        </div>
      </div>
    </div>
  );
};
