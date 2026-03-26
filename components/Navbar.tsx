import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: string, serviceId?: string) => void;
  activePage: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Profit Breakdown', id: 'profit-breakdown' },
    { name: 'The System', id: 'system' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const isLightNav = isScrolled || ['contact', 'lead-capture', 'how-it-works', 'qualification', 'careers', 'privacy', 'terms', 'sitemap'].includes(activePage);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 px-6 lg:px-12 ${
          isScrolled 
            ? 'py-3 bg-white border-b border-brandDark/5 shadow-sm' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer z-[110]" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-sm bg-brandDark">
              <span className="font-black text-xl text-white select-none">T</span>
            </div>
            <span className={`font-black text-lg lg:text-xl tracking-tighter uppercase transition-colors duration-300 ${isLightNav ? 'text-brandDark' : 'text-white'}`}>
              Techinfigo
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                  activePage === link.id 
                    ? 'text-brandYellow' 
                    : isLightNav 
                      ? 'text-brandDark/60 hover:text-brandDark'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                {activePage === link.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brandYellow"></span>
                )}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('lead-capture')}
              className="hidden md:block px-6 py-2.5 bg-[#fcb632] text-brandDark text-[11px] font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_0_15px_rgba(252,182,50,0.3)] hover:shadow-[0_0_25px_rgba(252,182,50,0.5)] hover:scale-105 transition-all duration-300"
            >
              Free Audit
            </button>

            {/* Hamburger Menu */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className={`w-6 h-[2px] transition-all duration-300 ${mobileMenuOpen ? 'bg-brandDark rotate-45 translate-y-[4px]' : isLightNav ? 'bg-brandDark' : 'bg-white'}`}></div>
              <div className={`w-6 h-[2px] transition-all duration-300 ${mobileMenuOpen ? 'bg-brandDark opacity-0' : isLightNav ? 'bg-brandDark' : 'bg-white'}`}></div>
              <div className={`w-6 h-[2px] transition-all duration-300 ${mobileMenuOpen ? 'bg-brandDark -rotate-45 -translate-y-[4px]' : isLightNav ? 'bg-brandDark' : 'bg-white'}`}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[90] bg-white transition-all duration-500 lg:hidden ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center items-center space-y-8 px-8">
          {navLinks.map((link) => (
            <button 
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-2xl font-black tracking-tighter uppercase ${activePage === link.id ? 'text-brandYellow' : 'text-brandDark'}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => handleLinkClick('lead-capture')}
            className="w-full max-w-[280px] bg-[#fcb632] text-brandDark py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-lg text-center"
          >
            Free Audit
          </button>
        </div>
      </div>
    </>
  );
};