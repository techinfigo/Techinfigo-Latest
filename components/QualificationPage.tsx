import React from 'react';

interface QualificationPageProps {
  onNavigate: (page: string) => void;
}

export const QualificationPage: React.FC<QualificationPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              PARTNER SELECTION
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Who We <br />
              Scale.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              We are not a generalist agency. We are a specialized growth bureau for brands <br className="hidden lg:block" /> ready for professional engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
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
      </section>
    </div>
  );
};