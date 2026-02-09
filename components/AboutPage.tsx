
import React from 'react';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'contact' | 'about') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-brandBg pt-40 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <div className="space-y-8">
            <span className="text-[10px] font-mono font-bold text-brandDark/30 tracking-[0.5em] uppercase flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-brandYellow"></span>
              Origin & Ethos
            </span>
            <h1 className="text-6xl lg:text-8xl font-bold text-brandDark tracking-tighter leading-[0.85]">
              Engineering <br />
              <span className="text-brandDark/20">The Alpha.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-brandDark/60 leading-relaxed max-w-xl font-medium border-l-4 border-brandYellow pl-8">
              Techinfigo was founded on a single premise: Marketing is too volatile to be left to "creative intuition" alone. We treat growth as an engineering discipline.
            </p>
          </div>
          <div className="relative aspect-square bg-brandDark group overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" 
              alt="Bureau Architecture" 
              className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-brandDark/20 mix-blend-multiply"></div>
            <div className="absolute bottom-10 left-10 text-white space-y-2">
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/50">Location</p>
              <p className="text-xl font-bold tracking-tight">HQ: Mumbai &mdash; Remote Global Ops</p>
            </div>
          </div>
        </div>

        {/* Our "Why" - Technical focus */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 mb-40">
          {[
            {
              title: "Determinism over Luck",
              desc: "We build systems where success is the mathematical outcome of structured variables. No 'viral' bets. Just compound performance.",
              code: "SYS-01"
            },
            {
              title: "Net Profit Integrity",
              desc: "GMV is a vanity metric. We audit every mandate against net-profit yield. If it doesn't hit the bank account, it doesn't count.",
              code: "SYS-02"
            },
            {
              title: "Founder-led Focus",
              desc: "Our architects have scaled brands from ₹50L to ₹50Cr. We speak the language of inventory, supply chain, and cash flow.",
              code: "SYS-03"
            }
          ].map((item, i) => (
            <div key={i} className="p-12 bg-white border border-brandDark/5 shadow-sm space-y-8 hover:shadow-xl transition-all duration-500">
              <span className="text-[10px] font-mono text-brandYellow font-bold tracking-widest">{item.code}</span>
              <h3 className="text-3xl font-bold text-brandDark tracking-tight">{item.title}</h3>
              <p className="text-brandDark/50 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* The Architects Section */}
        <div className="border-t border-brandDark/10 pt-40 mb-40">
          <div className="flex flex-col lg:flex-row justify-between items-baseline gap-12 mb-24">
            <h2 className="text-5xl lg:text-7xl font-bold text-brandDark tracking-tighter">The Growth Architects.</h2>
            <p className="text-brandDark/40 text-lg max-w-sm italic">
              "We don't have account managers. We have engineers, strategists, and analysts who live in your P&L."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="group cursor-default">
                <div className="aspect-[3/4] bg-brandDark/5 mb-8 overflow-hidden relative">
                   <div className="absolute inset-0 bg-brandDark opacity-0 group-hover:opacity-10 transition-opacity"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-mono text-brandDark/20 tracking-[0.5em] uppercase">DECRYPT_DATA_NODE_{num}</span>
                   </div>
                </div>
                <h4 className="text-xl font-bold text-brandDark mb-2">Growth Architect 0{num}</h4>
                <p className="text-[10px] font-bold text-brandDark/30 uppercase tracking-[0.3em] mb-4">Core Specialist</p>
                <div className="h-[1px] w-8 bg-brandYellow mb-4 group-hover:w-full transition-all duration-700"></div>
                <p className="text-sm text-brandDark/60 leading-relaxed">
                  Expertise in high-scale customer acquisition and retention infrastructure.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-brandDark text-white p-20 lg:p-32 rounded-sm text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%, transparent 50%, white 50%, white 75%, transparent 75%, transparent 100%)`, backgroundSize: '100px 100px' }} />
          
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl lg:text-8xl font-bold tracking-tighter leading-none">Ready for an Upgrade?</h2>
            <p className="text-white/50 text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed font-medium">
              If your current agency is guessing, we should talk. Let's move from marketing to growth engineering.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-brandYellow text-brandDark px-16 py-8 font-bold text-xs uppercase tracking-[0.5em] hover:bg-white transition-all duration-300 shadow-2xl"
            >
              Request System Audit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
