
import React from 'react';

interface FooterProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
  onBookAudit: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onBookAudit }) => {
  return (
    <footer className="bg-brandDark py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start mb-32">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-12">
              Scale without <br /> the volatility.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={onBookAudit}
                className="bg-brandYellow text-brandDark font-bold px-10 py-5 rounded-sm uppercase text-xs tracking-widest hover:bg-white transition-all duration-300"
              >
                Book Execution Audit
              </button>
              <div className="flex flex-col justify-center border-l border-white/10 pl-6">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Typical Lead Time</span>
                <span className="text-sm text-white font-medium">14 Business Days</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 text-white">
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Navigation</p>
              <ul className="space-y-4">
                <li><button onClick={() => onNavigate('home')} className="text-sm hover:text-brandYellow transition-colors text-left">Home</button></li>
                <li><button onClick={() => onNavigate('about')} className="text-sm hover:text-brandYellow transition-colors text-left">About Bureau</button></li>
                <li><button onClick={() => onNavigate('services')} className="text-sm hover:text-brandYellow transition-colors text-left">Services</button></li>
                <li><button onClick={() => onNavigate('how-it-works')} className="text-sm hover:text-brandYellow transition-colors text-left">How it works</button></li>
                <li><button onClick={() => onNavigate('contact')} className="text-sm hover:text-brandYellow transition-colors text-left">Book Audit</button></li>
              </ul>
            </div>
            <div className="space-y-6">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Legal</p>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm hover:text-brandYellow transition-colors opacity-50">Confidentiality</a></li>
                <li><a href="#" className="text-sm hover:text-brandYellow transition-colors opacity-50">Terms of Ops</a></li>
                <li><a href="#" className="text-sm hover:text-brandYellow transition-colors opacity-50">Growth Ethics</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 gap-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-brandYellow flex items-center justify-center rounded-sm">
              <span className="text-brandDark font-bold">T</span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
              Techinfigo &copy; 2024 &mdash; Growth Ops Bureau
            </span>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Precision Engineered in India</span>
            <div className="w-1.5 h-1.5 rounded-full bg-brandYellow"></div>
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Global Scale Readiness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
