import React, { useState, useEffect } from 'react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('ownership');

  const sections = [
    { id: 'ownership', label: 'Ownership' },
    { id: 'permitted', label: 'Use' },
    { id: 'accuracy', label: 'Liability' },
    { id: 'privacy', label: 'Data' },
    { id: 'intellectual', label: 'Property' },
    { id: 'termination', label: 'Access' },
    { id: 'law', label: 'Law' },
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
      { threshold: 0.3 }
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
              OPERATIONAL TERMS PROTOCOL
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter max-w-5xl">
              Terms of <br />
              Service.
            </h1>
            <p className="text-base lg:text-xl text-white/60 font-medium leading-relaxed max-w-3xl">
              By accessing our growth infrastructure and calculators, you <br className="hidden lg:block" /> agree to follow the operational protocols defined below.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <aside className="lg:col-span-3 sticky top-40 hidden lg:block">
            <div className="bg-[#001d21] rounded-[2rem] p-8 shadow-2xl border border-white/5 space-y-10">
              <h3 className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.4em]">Navigation</h3>
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

          <main className="lg:col-span-9">
            <div className="bg-[#fff9f0] rounded-[3rem] p-8 lg:p-16 shadow-4xl border border-brandDark/5 space-y-24">
              <section id="ownership" className="space-y-8 scroll-mt-24">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">1. Ownership</h2>
                <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                  <p>All downloadable materials and templates are owned by Techinfigo.</p>
                </div>
              </section>
              {/* Other sections omitted for brevity */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};