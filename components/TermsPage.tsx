import React, { useState, useEffect } from 'react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('ownership');

  const sections = [
    { id: 'ownership', label: 'Ownership of Content' },
    { id: 'permitted', label: 'Permitted Use' },
    { id: 'accuracy', label: 'Accuracy & Liability' },
    { id: 'privacy', label: 'Data & Privacy' },
    { id: 'intellectual', label: 'Intellectual Property' },
    { id: 'termination', label: 'Termination of Access' },
    { id: 'law', label: 'Governing Law' },
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
    <div className="min-h-screen bg-brandBg font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-40 pb-32">
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
            <div className="bg-[#fff9f0] rounded-[3rem] p-8 lg:p-16 shadow-4xl border border-brandDark/5 space-y-24">
              
              {/* Intro / Banner Section */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandYellow/10 rounded-full border border-brandYellow/10">
                  <svg className="w-3 h-3 text-brandYellow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.3em]">Last Updated: June 2026</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-brandDark tracking-tighter leading-none">
                  Terms of <span className="text-brandDark/20">Service.</span>
                </h1>
                <p className="text-brandDark/60 text-lg lg:text-xl font-medium leading-relaxed max-w-2xl border-l-4 border-brandYellow pl-8">
                  By accessing our growth infrastructure and calculators, you agree to follow the operational protocols defined below.
                </p>
              </div>

              <div className="space-y-24">
                
                {/* 1. Ownership of Content */}
                <section id="ownership" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">1. Ownership of Content</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      All downloadable materials, templates, calculators, and reports on this site are owned by <span className="text-brandDark font-bold">Techinfigo.</span>
                    </p>
                    <p>
                      They are provided solely for personal or business reference of our clients and visitors.
                    </p>
                  </div>
                </section>

                {/* 2. Permitted Use */}
                <section id="permitted" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">2. Permitted Use</h2>
                  </div>
                  <div className="space-y-10 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-brandDark flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        You may:
                      </h3>
                      <ul className="space-y-3 list-disc pl-6 marker:text-brandYellow">
                        <li>View, download, and print reports generated through our website for personal/business use.</li>
                        <li>Share downloads internally within your organization.</li>
                      </ul>
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-brandDark flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        You may not:
                      </h3>
                      <ul className="space-y-3 list-disc pl-6 marker:text-brandYellow">
                        <li>Redistribute, resell, or republish our downloadable assets.</li>
                        <li>Modify and rebrand materials as your own.</li>
                        <li>Use our ROI or audit calculators for commercial resale without written consent.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3. Accuracy & Liability */}
                <section id="accuracy" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">3. Accuracy & Liability</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      Our ROI calculators, audit tools, and downloadable reports provide approximate insights based on user inputs and assumptions.
                    </p>
                    <p className="bg-white p-6 rounded-2xl border border-brandDark/5 italic">
                      While we strive for accuracy, results are for educational and advisory purposes only — not guaranteed financial or legal outcomes. Techinfigo is not responsible for losses resulting from reliance on these calculations or insights.
                    </p>
                  </div>
                </section>

                {/* 4. Data & Privacy */}
                <section id="privacy" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">4. Data & Privacy</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>When you generate or download a report:</p>
                    <ul className="space-y-3 list-disc pl-6 marker:text-brandYellow">
                      <li>Your form data may be saved for future reference and improvements.</li>
                      <li>Files may include your entered details to personalize the report.</li>
                    </ul>
                    <p className="font-bold text-brandDark">
                      All personal data is handled according to our <span className="border-b-2 border-brandYellow">Privacy Policy.</span>
                    </p>
                  </div>
                </section>

                {/* 5. Intellectual Property */}
                <section id="intellectual" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">5. Intellectual Property</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      All text, visuals, logos, calculators, AI tools, and downloadable reports are protected under Indian copyright and intellectual property laws.
                    </p>
                    <p className="text-red-600 font-bold uppercase tracking-widest text-xs">
                      Unauthorized use will be subject to legal action.
                    </p>
                  </div>
                </section>

                {/* 6. Termination of Access */}
                <section id="termination" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">6. Termination of Access</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      We reserve the right to revoke download access or restrict users found violating these terms or misusing our tools.
                    </p>
                  </div>
                </section>

                {/* 7. Governing Law */}
                <section id="law" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">7. Governing Law</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      These Terms are governed by the laws of <span className="text-brandDark font-bold">India</span>, and disputes shall fall under the jurisdiction of Agra, Uttar Pradesh courts.
                    </p>
                  </div>
                </section>

                {/* 8. Contact */}
                <section id="contact" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">8. Contact</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>For download-related or usage concerns, contact:</p>
                    <div className="inline-flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border border-brandDark/5">
                      <svg className="w-5 h-5 text-brandYellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:support@techinfigo.com" className="text-brandDark font-bold text-xl hover:text-brandYellow transition-colors">
                        support@techinfigo.com
                      </a>
                    </div>
                  </div>
                </section>

                <div className="pt-20 text-center">
                  <p className="text-brandDark/30 text-[10px] font-bold uppercase tracking-widest">End of Core Terms Protocol</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};