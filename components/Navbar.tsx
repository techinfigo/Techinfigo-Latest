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
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollY > 10);
      
      if (activePage === 'home') {
        setIsOverLightSection(scrollY > 600);
      } else if (activePage === 'profit-breakdown') {
        setIsOverLightSection(scrollY > 600 && scrollY < 1600);
      } else if (activePage === 'qualification') {
        setIsOverLightSection(scrollY > 600);
      } else if (activePage === 'digital-marketing-agency-agra') {
        // Simple & Robust: If scrolled past Hero (~100px), use solid white nav with dark text.
        // This ensures the navbar is ALWAYS visible on all sections of the Agra page.
        setIsOverLightSection(scrollY > 100);
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
    { name: 'System', id: '/system', pageId: 'system' },
    { name: 'Case Studies', id: '/case-studies', pageId: 'case-studies' },
    { name: 'Profit Breakdown', id: '/profit-breakdown', pageId: 'profit-breakdown' },
    { name: 'Qualification', id: '/qualification', pageId: 'qualification' },
    { name: 'Contact', id: '/contact', pageId: 'contact' },
  ];

  // Pages that start with a dark background (Hero)
  const darkStartPages = [
    'home', 
    'profit-breakdown', 
    'system', 
    'services', 
    'case-studies', 
    'about', 
    'how-it-works', 
    'digital-marketing-agency-agra',
    'careers',
    'privacy',
    'terms',
    'qualification'
  ];
  
  const isDarkStart = darkStartPages.includes(activePage);
  
  // isLightNav means "The background is light, so use DARK text"
  const isLightNav = isOverLightSection || !isDarkStart || mobileMenuOpen;
  
  // Final text color logic
  const useDarkText = isLightNav;

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 px-4 lg:px-8 ${
          mobileMenuOpen
            ? 'py-3 bg-white'
            : isScrolled 
              ? isLightNav
                ? 'py-3 bg-white/95 backdrop-blur-md border-b border-brandDark/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)]' 
                : 'py-3 bg-brandDark/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
              : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Logo */}
          <Link 
            href="/"
            className="flex items-center gap-2 cursor-pointer z-[110] shrink-0" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className={`w-7 h-7 lg:w-8 lg:h-8 flex items-center justify-center rounded-sm transition-colors duration-300 ${useDarkText ? 'bg-brandDark' : 'bg-brandYellow'}`}>
              <span className={`font-black text-lg lg:text-xl select-none ${useDarkText ? 'text-white' : 'text-brandDark'}`}>T</span>
            </div>
            <span className={`font-black text-base lg:text-lg tracking-tighter uppercase transition-colors duration-300 ${useDarkText ? 'text-brandDark' : 'text-white'}`}>
              Techinfigo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex items-center justify-center gap-4 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                href={link.id}
                className={`text-[9px] font-black uppercase tracking-[0.15em] transition-all relative py-2 px-1 whitespace-nowrap ${
                  activePage === link.pageId 
                    ? 'text-brandYellow' 
                    : isLightNav 
                      ? 'text-brandDark/80 hover:text-brandDark'
                      : 'text-white/80 hover:text-white'
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
          <div className="flex items-center gap-3 shrink-0">
            <Link 
              href="/lead-capture"
              className={`hidden sm:block px-5 py-2 text-[10px] font-black uppercase tracking-[0.1em] rounded-lg transition-all duration-300 ${
                mobileMenuOpen 
                  ? 'bg-brandDark text-white' 
                  : 'bg-brandYellow text-brandDark shadow-glow hover:scale-105'
              }`}
            >
              Free Audit
            </Link>

            {/* Hamburger Menu */}
            <button 
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
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
