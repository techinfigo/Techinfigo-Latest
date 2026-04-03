'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  onNavigate?: (page: string, serviceId?: string) => void;
  activePage?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage: propActivePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverLightSection, setIsOverLightSection] = useState(false);
  const pathname = usePathname();

  const activePage = propActivePage || (pathname === '/' ? 'home' : pathname.substring(1));

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      
      if (activePage === 'home') {
        setIsOverLightSection(scrollY > (window.innerHeight * 0.8) && scrollY < (window.innerHeight * 5.5));
      } else {
        setIsOverLightSection(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage]);

  const navLinks = [
    { name: 'Home', id: '/', pageId: 'home' },
    { name: 'Profit Breakdown', id: '/profit-breakdown', pageId: 'profit-breakdown' },
    { name: 'The System', id: '/system', pageId: 'system' },
  ];

  // isLightNav means "Use Dark Text"
  const isLightNav = isOverLightSection || (isScrolled && ['lead-capture', 'qualification', 'careers', 'privacy', 'terms'].includes(activePage));

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 lg:px-12 ${
          isScrolled 
            ? isLightNav
              ? 'py-3 bg-white/80 backdrop-blur-lg border-b border-brandDark/5 shadow-sm' 
              : 'py-3 bg-brandDark/80 backdrop-blur-lg border-b border-white/5 shadow-xl'
            : isLightNav
              ? 'py-5 bg-brandBg/50 backdrop-blur-sm'
              : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2 cursor-pointer z-[110]" 
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-colors duration-300 ${isLightNav ? 'bg-brandDark' : 'bg-brandYellow'}`}>
              <span className={`font-black text-xl select-none ${isLightNav ? 'text-white' : 'text-brandDark'}`}>T</span>
            </div>
            <span className={`font-black text-lg lg:text-xl tracking-tighter uppercase transition-colors duration-300 ${isLightNav ? 'text-brandDark' : 'text-white'}`}>
              Techinfigo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.id}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 ${
                  activePage === link.pageId 
                    ? 'text-brandYellow' 
                    : isLightNav 
                      ? 'text-brandDark/60 hover:text-brandDark'
                      : 'text-white/60 hover:text-white'
                }`}
              >
                {link.name}
                {activePage === link.pageId && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brandYellow"></span>
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/lead-capture"
              className="hidden md:block px-6 py-2.5 bg-brandYellow text-brandDark text-[11px] font-bold uppercase tracking-[0.15em] rounded-full shadow-[0_0_15px_rgba(252,182,50,0.3)] hover:shadow-[0_0_25px_rgba(252,182,50,0.5)] hover:scale-105 transition-all duration-300"
            >
              Free Audit
            </Link>

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
            <Link 
              key={link.id}
              href={link.id}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-black tracking-tighter uppercase ${activePage === link.pageId ? 'text-brandYellow' : 'text-brandDark'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/lead-capture"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full max-w-[280px] bg-brandYellow text-brandDark py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] shadow-lg text-center"
          >
            Free Audit
          </Link>
        </div>
      </div>
    </>
  );
};
