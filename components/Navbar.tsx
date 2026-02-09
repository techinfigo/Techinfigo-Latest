
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => void;
  activePage: 'home' | 'contact' | 'about' | 'services' | 'how-it-works';
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'How it works', id: 'how-it-works' },
  ];

  const handleLinkClick = (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 lg:px-12 ${
          isScrolled 
            ? 'py-4 bg-white/70 backdrop-blur-2xl border-b border-brandDark/5 shadow-sm' 
            : 'py-10 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer z-[110]" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-brandDark flex items-center justify-center rounded-sm transition-transform duration-500 group-hover:rotate-12">
              <span className="text-brandYellow font-bold text-2xl leading-none">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tighter text-brandDark uppercase leading-none">Techinfigo</span>
              <span className="text-[8px] font-bold text-brandDark/40 uppercase tracking-[0.3em] mt-1">Growth Ops</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id as any)}
                className={`text-[10px] font-bold uppercase tracking-[0.3em] transition-all relative group ${
                  activePage === link.id ? 'text-brandDark' : 'text-brandDark/50 hover:text-brandDark'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] bg-brandYellow transition-all duration-300 ${
                  activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Status & CTA */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('contact')}
              className={`hidden sm:block px-8 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 shadow-lg ${
                activePage === 'contact' 
                ? 'bg-brandYellow text-brandDark shadow-brandYellow/20' 
                : 'bg-brandDark text-white hover:bg-brandYellow hover:text-brandDark shadow-brandDark/10'
              }`}
            >
              Book Audit
            </button>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`w-6 h-[2px] bg-brandDark transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></div>
              <div className={`w-6 h-[2px] bg-brandDark transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`w-6 h-[2px] bg-brandDark transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-brandBg transition-all duration-700 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-12 space-y-12">
          {navLinks.map((link, i) => (
            <button 
              key={link.id}
              onClick={() => handleLinkClick(link.id as any)}
              className="text-4xl font-bold text-brandDark tracking-tighter hover:text-brandYellow transition-colors flex items-center gap-6 text-left"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-sm font-mono text-brandDark/20">0{i+1}</span>
              {link.name}
            </button>
          ))}
          <div className="pt-12 border-t border-brandDark/10">
            <button 
              onClick={() => handleLinkClick('contact')}
              className="w-full bg-brandDark text-white py-6 rounded-sm text-sm font-bold uppercase tracking-widest"
            >
              Book Growth Audit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
