import React, { useState, useEffect } from 'react';

interface PrivacyPageProps {
  onNavigate: (page: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'collect', label: 'Information We Collect' },
    { id: 'use', label: 'How We Use Your Information' },
    { id: 'protection', label: 'Data Protection & Security' },
    { id: 'rights', label: 'Your Rights' },
    { id: 'cookies', label: 'Cookies & Tracking Technologies' },
    { id: 'retention', label: 'Data Retention' },
    { id: 'thirdparty', label: 'Third-Party Integrations' },
    { id: 'legal', label: 'Legal Disclaimer' },
    { id: 'updates', label: 'Policy Updates' },
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
            <div className="bg-[#fff9f0] rounded-[3rem] p-8 lg:p-16 shadow-4xl border border-brandDark/5 space-y-12">
              
              {/* Badge Header */}
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-brandYellow/10 rounded-full border border-brandYellow/10">
                <svg className="w-3 h-3 text-brandYellow" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[10px] font-bold text-brandYellow uppercase tracking-[0.3em]">Data Privacy Standard</span>
              </div>

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
                
                {/* 1. Overview */}
                <section id="overview" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">1. Overview</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      Techinfigo ("we," "our," "us") operates as a digital marketing, branding, and AI-driven web development agency helping businesses scale through advertising, analytics, automation, and technology.
                    </p>
                    <p>
                      This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, interact with our tools (like audit reports), or engage with our services. By using our website, you agree to this Privacy Policy and our Terms & Conditions.
                    </p>
                  </div>
                </section>

                {/* 2. Information We Collect */}
                <section id="collect" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">2. Information We Collect</h2>
                  </div>
                  <div className="space-y-10 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We collect information in the following ways:</p>
                    
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-brandDark">a) Information you provide voluntarily</h3>
                      <p>When you fill out forms, contact us, download resources, or use interactive tools, you may provide:</p>
                      <ul className="space-y-3 list-disc pl-6 marker:text-brandYellow">
                        <li><span className="text-brandDark font-bold">Identity:</span> Full name, email address, phone number, and company details.</li>
                        <li><span className="text-brandDark font-bold">Context:</span> Project requirements or marketing data.</li>
                        <li><span className="text-brandDark font-bold">Assets:</span> Uploaded files or images related to your business.</li>
                        <li><span className="text-brandDark font-bold">Finance:</span> Payment or billing details (where applicable).</li>
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-brandDark">b) Information collected automatically</h3>
                      <p>When you visit our site, we may automatically collect:</p>
                      <ul className="space-y-3 list-disc pl-6 marker:text-brandYellow">
                        <li><span className="text-brandDark font-bold">Device:</span> IP address, device details, and browser information.</li>
                        <li><span className="text-brandDark font-bold">Behavior:</span> Pages viewed, actions taken, and time spent.</li>
                        <li><span className="text-brandDark font-bold">Tracking:</span> Analytics and cookie data via Google Analytics, GTM, and Meta Pixel.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* 3. How We Use Your Information */}
                <section id="use" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">3. How We Use Your Information</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Your data is used only for legitimate business purposes, including:</p>
                    <ul className="space-y-4 list-disc pl-6 marker:text-brandYellow">
                      <li>Providing services you requested (audits, strategy calls).</li>
                      <li>Communicating updates, offers, or educational content.</li>
                      <li>Generating personalized growth/audit reports.</li>
                      <li>Improving our website performance and security.</li>
                    </ul>
                    <p className="bg-brandDark/5 p-6 rounded-2xl border border-brandDark/5 font-medium italic">
                      We never sell your information to third parties. We only share with trusted service providers (like Google or Meta) necessary to operate our services.
                    </p>
                  </div>
                </section>

                {/* 4. Data Protection & Security */}
                <section id="protection" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">4. Data Protection & Security</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <ul className="space-y-4 list-disc pl-6 marker:text-brandYellow">
                      <li>Data is securely stored and encrypted in transit and at rest.</li>
                      <li>Access is restricted to authorized Techinfigo personnel only.</li>
                      <li>We employ internal monitoring and regular security reviews.</li>
                    </ul>
                    <p className="text-sm font-bold opacity-50 uppercase tracking-widest pt-4">
                      However, no online system is 100% secure, and by using our services, you accept reasonable security limitations inherent to the internet.
                    </p>
                  </div>
                </section>

                {/* 5. Your Rights */}
                <section id="rights" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">5. Your Rights</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>You can:</p>
                    <ul className="space-y-4 list-disc pl-6 marker:text-brandYellow">
                      <li>Request a copy of your data.</li>
                      <li>Ask for correction or deletion (where legally possible).</li>
                      <li>Withdraw consent for marketing communications.</li>
                    </ul>
                    <p className="pt-4 font-bold text-brandDark">
                      Requests can be made by emailing: <span className="border-b-2 border-brandYellow">contact@techinfigo.com</span>
                    </p>
                  </div>
                </section>

                {/* 6. Cookies & Tracking */}
                <section id="cookies" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 16v2m3-6v6m3-3v3M9 11V9a2 2 0 012-2h6a2 2 0 012 2v2M7 11V9a2 2 0 012-2h10a2 2 0 012 2v2" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">6. Cookies & Tracking Technologies</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      We use cookies and pixels to analyze traffic, improve content, and deliver ads. You can manage cookie preferences through your browser.
                    </p>
                  </div>
                </section>

                {/* 7. Data Retention */}
                <section id="retention" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">7. Data Retention</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      We retain personal data only as long as required for business, legal, or security reasons. Data from inactive users may be archived or deleted periodically.
                    </p>
                  </div>
                </section>

                {/* 8. Third-Party Integrations */}
                <section id="thirdparty" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">8. Third-Party Integrations</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Our tools and website may use or link to third-party services such as:</p>
                    <ul className="space-y-4 list-disc pl-6 marker:text-brandYellow">
                      <li>Google Analytics / Tag Manager</li>
                      <li>Meta Ads / LinkedIn Ads</li>
                    </ul>
                    <p>Each provider maintains its own privacy standards. Techinfigo is not responsible for their independent policies.</p>
                  </div>
                </section>

                {/* 9. Legal Disclaimer */}
                <section id="legal" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">9. Legal Disclaimer</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>While we take every precaution to protect user data, Techinfigo shall not be held liable for:</p>
                    <ul className="space-y-4 list-disc pl-6 marker:text-brandYellow">
                      <li>Unauthorized access resulting from user negligence.</li>
                      <li>Data leaks from third-party platforms beyond our control.</li>
                    </ul>
                  </div>
                </section>

                {/* 10. Policy Updates */}
                <section id="updates" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">10. Policy Updates</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      We may update this policy periodically to reflect legal, technical, or operational changes. The updated version will always be available on this page.
                    </p>
                  </div>
                </section>

                {/* 11. Contact */}
                <section id="contact" className="space-y-8 scroll-mt-24">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-brandDark flex items-center justify-center text-brandYellow flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">11. Contact</h2>
                  </div>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>
                      If you have privacy-related questions, please contact us by email: <br />
                      <span className="text-brandDark font-bold text-xl border-b-2 border-brandYellow pt-2 inline-block">contact@techinfigo.com</span>
                    </p>
                  </div>
                </section>

                <div className="pt-20 text-center">
                  <p className="text-brandDark/30 text-[10px] font-bold uppercase tracking-widest">End of Core Privacy Statement</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};