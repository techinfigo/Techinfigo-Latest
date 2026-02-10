
import React from 'react';

interface QualificationPageProps {
  onNavigate: (page: string) => void;
}

export const QualificationPage: React.FC<QualificationPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40 space-y-12 text-center max-w-4xl mx-auto">
          <span className="text-[12px] font-mono font-bold text-brandDark/30 tracking-[0.6em] uppercase flex items-center justify-center gap-4">
            <span className="w-3 h-3 rounded-full bg-brandYellow"></span>
            Partner Selection
          </span>
          <h1 className="text-6xl lg:text-9xl font-extrabold text-brandDark tracking-tighter leading-[0.85]">
            Who We <br />
            <span className="text-brandDark/20">Scale.</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-brandDark/60 leading-relaxed font-medium">
            We are not a generalist agency. We are a specialized growth bureau for D2C brands that have graduated from the survival phase and are ready for professional engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-56">
          <div className="bg-white p-12 lg:p-20 rounded-[3rem] border border-brandDark/5 space-y-16">
            <div className="space-y-4">
              <span className="px-4 py-2 bg-brandYellow/10 text-brandYellow rounded-full text-[10px] font-bold uppercase tracking-widest">Ideal Sync</span>
              <h3 className="text-5xl font-black text-brandDark tracking-tighter">The Mandate</h3>
            </div>
            <div className="space-y-10">
              {[
                "Revenue: ₹50L - ₹2Cr monthly run-rate",
                "Product: Strong market fit with 15%+ organic repurchase",
                "Mindset: Data-driven founders who value unit economics",
                "Infrastructure: Professional logistics & supply chain"
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-brandDark text-brandYellow flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <p className="text-2xl font-bold text-brandDark tracking-tight leading-none pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brandDark p-12 lg:p-20 rounded-[3rem] space-y-16">
            <div className="space-y-4">
              <span className="px-4 py-2 bg-white/5 text-white/40 rounded-full text-[10px] font-bold uppercase tracking-widest">Strategic Friction</span>
              <h3 className="text-5xl font-black text-white tracking-tighter">The Rejection</h3>
            </div>
            <div className="space-y-10 opacity-60">
              {[
                "Seeking quick 'hacks' instead of systems",
                "Resistance to re-engineering P&L architecture",
                "Isolated channel focus without attribution",
                "Under ₹20L monthly revenue (Seed phase)"
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </div>
                  <p className="text-2xl font-bold text-white tracking-tight leading-none pt-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-brandDark/30 text-xs font-bold uppercase tracking-[0.5em] mb-8">Ready to confirm your alignment?</p>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-brandDark text-white px-12 py-6 rounded-xl font-bold text-[11px] uppercase tracking-[0.5em] hover:bg-brandYellow hover:text-brandDark transition-all duration-500 shadow-2xl"
          >
            Apply for Growth Audit
          </button>
        </div>
      </div>
    </div>
  );
};
