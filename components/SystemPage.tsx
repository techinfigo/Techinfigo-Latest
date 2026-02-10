
import React from 'react';

interface SystemPageProps {
  onNavigate: (page: string) => void;
}

export const SystemPage: React.FC<SystemPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40 space-y-12">
          <span className="text-[12px] font-mono font-bold text-brandDark/30 tracking-[0.6em] uppercase flex items-center gap-4">
            <span className="w-3 h-3 rounded-full bg-brandYellow"></span>
            Technical Foundation
          </span>
          <h1 className="text-6xl lg:text-9xl font-extrabold text-brandDark tracking-tighter leading-[0.85]">
            The Growth <br />
            <span className="text-brandDark/20">Architecture.</span>
          </h1>
          <p className="text-2xl lg:text-3xl text-brandDark/60 leading-relaxed max-w-3xl font-medium border-l-[8px] border-brandYellow pl-12">
            We don't just "run ads." We build proprietary infrastructure that turns traffic into predictable net-profit through unit-economic certainty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-40">
          <div className="space-y-12">
            <div className="p-10 bg-brandDark text-white rounded-3xl shadow-2xl">
              <h3 className="text-3xl font-bold mb-6 tracking-tight text-brandYellow">Mathematical Attribution</h3>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Standard platform reporting is broken. Our system bypasses iOS restrictions by matching 1st-party click data directly to your sales ledger with 95% accuracy.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Precision</p>
                  <p className="text-2xl font-bold">95.4%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Drift Reduction</p>
                  <p className="text-2xl font-bold">-42%</p>
                </div>
              </div>
            </div>
            
            <div className="p-10 bg-white border border-brandDark/5 rounded-3xl shadow-sm">
              <h3 className="text-3xl font-bold text-brandDark mb-6 tracking-tight">Economic Guardrails</h3>
              <p className="text-brandDark/50 text-lg leading-relaxed">
                Every rupee spent is benchmarked against your actual Contribution Margin. If the math doesn't result in net profit, the system throttles automatically.
              </p>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden bg-brandDark">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brandYellow via-transparent to-transparent"></div>
            <div className="relative z-10 p-12 lg:p-16 flex flex-col h-full justify-center">
              <span className="text-[11px] font-mono text-brandYellow tracking-widest mb-4">CORE_ENGINE_V3</span>
              <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-none mb-10">Predictable <br /> Scalability.</h2>
              <div className="space-y-8">
                {['Data Pipelines', 'Creative Backtesting', 'Inventory Sync', 'Profit-First Bidding'].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-white/40 group">
                    <span className="text-brandYellow font-mono text-xs">0{i+1}</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors uppercase tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brandYellow p-16 lg:p-24 rounded-[3rem] text-center">
          <h2 className="text-4xl lg:text-7xl font-black text-brandDark tracking-tighter leading-none mb-12">Ready to Install?</h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-brandDark text-white px-16 py-8 font-bold text-sm uppercase tracking-[0.5em] hover:bg-white hover:text-brandDark transition-all shadow-2xl rounded-xl"
          >
            Request System Audit
          </button>
        </div>
      </div>
    </div>
  );
};
