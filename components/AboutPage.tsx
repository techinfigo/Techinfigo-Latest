
import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg pt-48 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-56">
          <div className="space-y-12">
            <span className="text-[12px] font-mono font-bold text-brandDark/40 tracking-[0.6em] uppercase flex items-center gap-4">
              <span className="w-3 h-3 rounded-full bg-brandYellow"></span>
              Origin Story
            </span>
            <h1 className="text-6xl lg:text-9xl font-extrabold text-brandDark tracking-tighter leading-[0.85]">
              Pure <br />
              <span className="text-brandDark/20">Execution.</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-brandDark/60 leading-relaxed max-w-2xl font-medium border-l-[8px] border-brandYellow pl-10">
              Techinfigo was built for founders who are tired of agency guesswork. We treat growth as an engineering mandate, not a creative experiment.
            </p>
          </div>
          <div className="relative aspect-square bg-brandDark shadow-3xl">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
              alt="Workspace" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-56">
          {[
            {
              title: "No Luck, Just Math",
              desc: "We prioritize predictable compounding over 'viral' flashes. Every campaign is a controlled experiment.",
              code: "PROTOCOL_01"
            },
            {
              title: "Bank-Balance Focus",
              desc: "ROAS is a platform metric. Net-Profit is a business metric. We optimize for the latter, exclusively.",
              code: "PROTOCOL_02"
            },
            {
              title: "Systems First",
              desc: "Marketing doesn't scale. Systems do. We build the architecture that makes growth inevitable.",
              code: "PROTOCOL_03"
            }
          ].map((item, i) => (
            <div key={i} className="p-16 bg-white border border-brandDark/5 shadow-xl space-y-10">
              <span className="text-[12px] font-mono text-brandYellow font-bold tracking-[0.3em]">{item.code}</span>
              <h3 className="text-4xl font-bold text-brandDark tracking-tighter">{item.title}</h3>
              <p className="text-brandDark/60 leading-relaxed text-xl lg:text-2xl">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brandDark text-white p-24 lg:p-40 rounded-sm text-center relative overflow-hidden">
          <div className="relative z-10 space-y-14">
            <h2 className="text-6xl lg:text-8xl font-bold tracking-tighter leading-none">Upgrade Your System.</h2>
            <p className="text-white/60 text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed font-medium">
              Move from manual effort to automated growth infrastructure.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brandYellow text-brandDark px-16 py-8 font-bold text-sm uppercase tracking-[0.5em] hover:bg-white transition-all shadow-2xl"
            >
              Start System Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
