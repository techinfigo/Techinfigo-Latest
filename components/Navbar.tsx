
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
      setIsScrolled(window.scrollY > 20);
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
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 lg:px-12 ${
          isScrolled 
            ? 'py-3 bg-white/95 backdrop-blur-xl border-b border-brandDark/5 shadow-sm' 
            : 'py-6 bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Brand Logo Section */}
          <div 
            className="flex items-center gap-3 group cursor-pointer z-[110]" 
            onClick={() => onNavigate('home')}
          >
            {/* Logo Image Placeholder / Icon */}
            <div className="w-10 h-10 bg-brandDark flex items-center justify-center rounded-sm flex-shrink-0">
              <span className="text-brandYellow font-extrabold text-2xl leading-none select-none">T</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-[18px] lg:text-[20px] tracking-tight text-brandDark uppercase leading-[1.1]">
                Techinfigo
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold text-brandDark/40 uppercase tracking-[0.35em] leading-none mt-0.5">
                Growth Bureau
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id as any)}
                className={`text-[11px] font-bold uppercase tracking-[0.25em] transition-all relative py-2 ${
                  activePage === link.id ? 'text-brandDark' : 'text-brandDark/40 hover:text-brandDark'
                }`}
              >
                {link.name}
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brandYellow"></span>
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('contact')}
              className={`hidden md:block px-8 py-3.5 bg-brandDark text-white text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-brandYellow hover:text-brandDark shadow-[0_10px_20px_-5px_rgba(0,29,33,0.15)] ${
                activePage === 'contact' ? 'bg-brandYellow text-brandDark' : ''
              }`}
            >
              Book Audit
            </button>

            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`w-6 h-[2px] bg-brandDark transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></div>
              <div className={`w-6 h-[2px] bg-brandDark transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
              <div className={`w-6 h-[2px] bg-brandDark transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-8 space-y-8">
          {navLinks.map((link, i) => (
            <button 
              key={link.id}
              onClick={() => handleLinkClick(link.id as any)}
              className="text-4xl font-extrabold text-brandDark tracking-tighter hover:text-brandYellow transition-colors flex items-center gap-6 text-left"
            >
              <span className="text-sm font-mono text-brandDark/20">0{i+1}</span>
              {link.name}
            </button>
          ))}
          <div className="pt-8 border-t border-brandDark/5">
            <button 
              onClick={() => handleLinkClick('contact')}
              className="w-full bg-brandDark text-white py-6 text-sm font-bold uppercase tracking-[0.3em]"
            >
              Start Your Audit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
