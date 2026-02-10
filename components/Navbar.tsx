
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
    { name: 'Process', id: 'how-it-works' },
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
            ? 'py-6 bg-white/90 backdrop-blur-2xl border-b border-brandDark/5 shadow-md' 
            : 'py-12 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer z-[110]" onClick={() => onNavigate('home')}>
            <div className="w-12 h-12 bg-brandDark flex items-center justify-center rounded-sm">
              <span className="text-brandYellow font-bold text-3xl leading-none">T</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl tracking-tighter text-brandDark uppercase leading-none">Techinfigo</span>
              <span className="text-[10px] font-bold text-brandDark/40 uppercase tracking-[0.4em] mt-1">Growth Bureau</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-14">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id as any)}
                className={`text-[13px] font-bold uppercase tracking-[0.3em] transition-all relative group ${
                  activePage === link.id ? 'text-brandDark' : 'text-brandDark/50 hover:text-brandDark'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-brandYellow transition-all duration-300 ${
                  activePage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('contact')}
              className={`hidden sm:block px-10 py-5 rounded-sm text-[12px] font-bold uppercase tracking-[0.3em] transition-all duration-300 shadow-xl ${
                activePage === 'contact' 
                ? 'bg-brandYellow text-brandDark' 
                : 'bg-brandDark text-white hover:bg-brandYellow hover:text-brandDark'
              }`}
            >
              Book Audit
            </button>

            <button 
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-2 z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`w-8 h-[2.5px] bg-brandDark transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></div>
              <div className={`w-8 h-[2.5px] bg-brandDark transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`w-8 h-[2.5px] bg-brandDark transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 z-[90] bg-brandBg transition-all duration-700 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-10 space-y-10">
          {navLinks.map((link, i) => (
            <button 
              key={link.id}
              onClick={() => handleLinkClick(link.id as any)}
              className="text-5xl font-bold text-brandDark tracking-tighter hover:text-brandYellow transition-colors flex items-center gap-8 text-left"
            >
              <span className="text-lg font-mono text-brandDark/20">0{i+1}</span>
              {link.name}
            </button>
          ))}
          <div className="pt-10 border-t border-brandDark/10">
            <button 
              onClick={() => handleLinkClick('contact')}
              className="w-full bg-brandDark text-white py-8 rounded-sm text-lg font-bold uppercase tracking-widest"
            >
              Start Your Audit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
