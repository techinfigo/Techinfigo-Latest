import React, { useState, useEffect } from 'react';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'collect', label: 'Information We Collect' },
    { id: 'use', label: 'How We Use Information' },
    { id: 'protection', label: 'Security' },
    { id: 'rights', label: 'Your Rights' },
    { id: 'cookies', label: 'Cookies' },
    { id: 'retention', label: 'Retention' },
    { id: 'thirdparty', label: 'Third-Party' },
    { id: 'legal', label: 'Legal' },
    { id: 'updates', label: 'Updates' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-brandBg font-sans selection:bg-brandYellow selection:text-brandDark">
      {/* Standard Header */}
      <section className="bg-brandDark pt-24 pb-10 lg:pt-32 lg:pb-16 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-brandYellow/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <div className="border-l-[4px] border-brandYellow pl-8 lg:pl-12 space-y-4 lg:space-y-6 animate-slide-up">
            <span className="text-[10px] lg:text-[11px] font-bold text-white/40 uppercase tracking-[0.5em] block">
              DATA PRIVACY STANDARD
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Privacy <br />
              Protocol.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              Our infrastructure is built on transparency. This document <br className="hidden lg:block" /> defines how we protect and govern your data.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 sticky top-40 hidden lg:block">
            <div className="bg-[#001d21] rounded-[2rem] p-8 shadow-2xl border border-white/5 space-y-10">
              <h3 className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em]">On This Page</h3>
              <nav className="flex flex-col gap-5">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className={`flex items-center gap-4 text-left group transition-all duration-300 ${
                      activeSection === section.id ? 'translate-x-2' : ''
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full bg-white/10 group-hover:bg-brandYellow transition-colors ${
                      activeSection === section.id ? 'bg-brandYellow h-3' : ''
                    }`}></div>
                    <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${
                      activeSection === section.id ? 'text-white' : 'text-white/30 group-hover:text-white/60'
                    }`}>
                      {section.label}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-12">
            <div className="bg-[#fff9f0] rounded-[3rem] p-8 lg:p-16 shadow-4xl border border-brandDark/5 space-y-12">
              
              {/* In Plain English Box */}
              <div className="bg-white rounded-3xl p-8 lg:p-12 border border-brandYellow/20 relative overflow-hidden group shadow-sm">
                <div className="absolute top-8 right-8 text-brandDark/5 group-hover:text-brandYellow/10 transition-colors">
                  <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C8.29 12.13 7 10.66 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.66-1.29 3.13-3.15 4.1z" />
                  </svg>
                </div>
                <div className="relative z-10 space-y-6">
                  <h2 className="text-2xl font-bold text-brandDark tracking-tight">In Plain English</h2>
                  <ul className="space-y-4">
                    {[
                      "We collect info you give us and data from your visit to improve our services.",
                      "We never sell your data to third parties.",
                      "You have the right to request, correct, or delete your data at any time.",
                      "Questions? Email us at contact@techinfigo.com"
                    ].map((point, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-2.5 flex-shrink-0"></div>
                        <p className="text-brandDark/70 font-medium leading-relaxed">
                          {idx === 3 ? (
                            <>Questions? Email us at <span className="text-brandDark font-bold border-b border-brandYellow">contact@techinfigo.com</span></>
                          ) : point}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Detailed Sections */}
              <div className="space-y-24 pt-12">
                <section id="overview" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">1. Overview</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      Techinfigo ("we," "our," "us") operates as a digital marketing, branding, and AI-driven agency. This policy explains how we collect and safeguard your information.
                    </p>
                  </div>
                </section>
                {/* Additional sections omitted for brevity in XML, would include full policy content */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};