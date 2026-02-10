import React, { useState, useEffect, useRef } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

const services = [
  { 
    title: "D2C Performance Ads (Meta + Google)", 
    desc: "Scale profitably with offer-led creative and full-funnel strategy.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ) 
  },
  { 
    title: "Conversion Rate Optimization (CRO) for D2C", 
    desc: "Convert more traffic into revenue with data-driven A/B testing.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ) 
  },
  { 
    title: "SEO for eCommerce & D2C Brands", 
    desc: "Drive high-intent organic traffic by ranking for valuable keywords.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ) 
  },
  { 
    title: "Email & SMS Flows for LTV", 
    desc: "Boost LTV with automated flows that drive repeat purchases.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    title: "Marketing Automation for D2C", 
    desc: "Automate tasks and personalize journeys to scale efficiently.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ) 
  },
  { 
    title: "Creative & Content Strategy", 
    desc: "Make creatives that stop thumbs and keep learning fresh.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ) 
  },
  { 
    title: "Influencer & UGC Marketing", 
    desc: "Source authentic content and amplify what performs to build trust.", 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ) 
  },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'The System', id: 'system' },
    { name: 'Our Process', id: 'how-it-works' },
    { name: 'Who We Fit', id: 'qualification' },
    { name: 'Services', id: 'services', hasDropdown: true },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 lg:px-12 ${
          isScrolled 
            ? 'py-3 bg-white/90 backdrop-blur-xl border-b border-brandDark/5 shadow-3xl' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-3 group cursor-pointer z-[110]" 
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-brandDark flex items-center justify-center rounded-sm flex-shrink-0 shadow-lg group-hover:bg-brandYellow transition-colors duration-500">
              <span className="text-white group-hover:text-brandDark font-extrabold text-2xl leading-none select-none transition-colors">T</span>
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-black text-[18px] lg:text-[20px] tracking-tight text-brandDark uppercase leading-[1.1]">
                Techinfigo
              </span>
              <span className="text-[8px] lg:text-[9px] font-bold text-brandDark/30 uppercase tracking-[0.35em] leading-none mt-0.5">
                Growth Bureau
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <div 
                key={link.id}
                className="relative"
                onMouseEnter={link.hasDropdown ? handleMouseEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleMouseLeave : undefined}
              >
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all relative py-2 flex items-center gap-1.5 ${
                    activePage === link.id ? 'text-brandYellow' : 'text-brandDark/40 hover:text-brandDark'
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <svg className={`w-3 h-3 transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                  )}
                  {activePage === link.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brandYellow"></span>
                  )}
                </button>

                {link.hasDropdown && (
                  <div 
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                      servicesDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white w-[480px] rounded-[1.5rem] p-6 shadow-4xl border border-brandDark/5">
                      <div className="mb-6 px-4">
                        <span className="text-[10px] font-bold text-brandDark/20 uppercase tracking-[0.4em]">Our Services</span>
                      </div>
                      <div className="space-y-1">
                        {services.map((service, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleLinkClick('services')}
                            className="w-full text-left group flex items-start gap-4 p-4 rounded-xl hover:bg-brandDark/[0.02] transition-all duration-300"
                          >
                            <div className="w-10 h-10 rounded-lg bg-brandDark/[0.05] flex items-center justify-center text-brandDark group-hover:bg-brandYellow group-hover:text-brandDark transition-all duration-300 flex-shrink-0">
                              {service.icon}
                            </div>
                            <div className="space-y-0.5">
                              <h4 className="text-sm font-bold text-brandDark group-hover:text-brandYellow transition-colors">{service.title}</h4>
                              <p className="text-[11px] text-brandDark/40 leading-relaxed font-medium transition-colors">
                                {service.desc}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => onNavigate('contact')}
              className={`hidden md:block px-8 py-3.5 bg-brandDark text-white text-[11px] font-bold uppercase tracking-[0.25em] transition-all duration-300 hover:bg-brandYellow hover:text-brandDark shadow-lg ${
                activePage === 'contact' ? 'bg-brandYellow text-brandDark' : ''
              }`}
            >
              Free Audit
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

      <div className={`fixed inset-0 z-[90] bg-[#fcfcfc] transition-all duration-500 lg:hidden overflow-y-auto ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-start pt-32 pb-10 px-8 space-y-6">
          {navLinks.map((link, i) => (
            <div key={link.id} className="space-y-4">
              <button 
                onClick={() => link.hasDropdown ? setServicesDropdownOpen(!servicesDropdownOpen) : handleLinkClick(link.id)}
                className="text-3xl font-extrabold text-brandDark tracking-tighter hover:text-brandYellow transition-colors flex items-center justify-between w-full"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-brandDark/20">0{i+1}</span>
                  {link.name}
                </div>
                {link.hasDropdown && (
                  <svg className={`w-6 h-6 transition-transform ${servicesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
                )}
              </button>
              
              {link.hasDropdown && servicesDropdownOpen && (
                <div className="pl-10 space-y-4 animate-in slide-in-from-top-2 duration-300">
                  {services.map((s, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleLinkClick('services')}
                      className="text-sm font-bold text-brandDark/40 block text-left uppercase tracking-widest hover:text-brandYellow"
                    >
                      • {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-8 border-t border-brandDark/5">
            <button 
              onClick={() => handleLinkClick('contact')}
              className="w-full bg-brandDark text-white py-6 text-sm font-bold uppercase tracking-[0.3em] shadow-xl"
            >
              Start Your Audit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};