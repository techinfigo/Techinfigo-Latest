'use client';

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
                    <p>Techinfigo (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is a founder-led digital marketing and website development agency based in Agra, India, run by Sachin Bauddh. This policy explains what personal data we collect through www.techinfigo.com and while providing our services, why we collect it, and the choices you have.</p>
                    <p>We follow the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000 of India. By using our website or sending us an enquiry, you agree to this policy.</p>
                  </div>
                </section>
                <section id="collect" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">2. Information We Collect</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p><strong className="text-brandDark">Information you give us.</strong> When you fill in a form, send an enquiry or message us, we collect:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Your name, WhatsApp or phone number and, if you choose to give it, your email address</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Your business name, website or Instagram link, and the services you are interested in</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Anything else you write in a message, and, for job applications, the details you share with us</span></li>
                    </ul>
                    <p><strong className="text-brandDark">Information collected automatically.</strong> When you visit the website we record the pages you view, your browser and device type, an approximate location based on your IP address, the website that sent you to us, and campaign tags in the link you clicked (for example, which advertisement you came from).</p>
                    <p><strong className="text-brandDark">Information from our clients.</strong> When we work for a business, we may receive access to its ad accounts, Google Business Profile, website and the enquiries its own customers send. We handle that data only to deliver the agreed service, on the client&apos;s instructions.</p>
                  </div>
                </section>
                <section id="use" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">3. How We Use Information</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We use your information to:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Reply to your enquiry and prepare your free website health check</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Contact you by WhatsApp, phone or email about your enquiry or our services</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Deliver, manage and report on the services you buy from us</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Understand how visitors use the website and measure our own advertising, so we can improve both</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Keep records we are required to keep by law, and protect against fraud or misuse</span></li>
                    </ul>
                    <p><strong className="text-brandDark">We never sell your personal data</strong>, and we do not share it with anyone for their own marketing.</p>
                  </div>
                </section>
                <section id="protection" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">4. Security</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We protect your data with reasonable security practices: the website runs over encrypted HTTPS, enquiries are stored in a secured database with access limited to people who need it, and admin areas are password-protected.</p>
                    <p>No method of storing or sending data online is completely secure, so we cannot guarantee absolute security. If a breach affects your personal data, we will inform you and the authorities as the law requires.</p>
                  </div>
                </section>
                <section id="rights" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">5. Your Rights</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Under Indian data protection law, you have the right to:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Ask what personal data we hold about you and how we use it</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Ask us to correct or complete inaccurate data</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Ask us to delete your data, where we are not required by law to keep it</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Withdraw your consent at any time; this does not affect anything done before you withdrew it</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Nominate another person to exercise these rights on your behalf</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Raise a complaint with our Grievance Officer (see Contact), and then with the Data Protection Board of India if you are not satisfied</span></li>
                    </ul>
                    <p>To use any of these rights, email or WhatsApp us. We will reply within 30 days.</p>
                    <p>If you are the customer of one of our clients, please contact that business first; we will help them respond to you.</p>
                  </div>
                </section>
                <section id="cookies" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">6. Cookies & Tracking</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We use a small number of tools that place cookies or similar technology in your browser:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">Google Analytics</strong> to count visits and see which pages are useful</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">Meta Pixel</strong> to measure and improve our Facebook and Instagram advertising</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Temporary browser storage that remembers which link or advertisement brought you to the site, so your enquiry is credited correctly. It is cleared when you close the browser tab.</span></li>
                    </ul>
                    <p>You can block or delete cookies in your browser settings, and opt out of Google Analytics with the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">Google Analytics opt-out add-on</a>. The website still works if you do.</p>
                  </div>
                </section>
                <section id="retention" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">7. How Long We Keep Data</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We keep enquiry details for up to 24 months after our last conversation, unless you become a client or ask us to delete them sooner.</p>
                    <p>Client records, invoices and contracts are kept for as long as Indian tax and accounting laws require. Data we handle on a client&apos;s behalf is returned or deleted when our work for that client ends, as agreed with them.</p>
                  </div>
                </section>
                <section id="thirdparty" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">8. Service Providers</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We use trusted service providers to run the website and our business. They process data only for us and not for their own purposes:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">Vercel</strong> hosts the website</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">Google Cloud (Firebase)</strong> stores enquiries in our CRM</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">FormSubmit</strong> sends us an email alert for each new enquiry</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">Google Analytics</strong> and <strong className="text-brandDark">Meta</strong> measure visits and advertising</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span><strong className="text-brandDark">WhatsApp</strong> carries the conversations you start with us</span></li>
                    </ul>
                    <p>Some of these providers store data on servers outside India. Where this happens, we rely on their security and data protection commitments.</p>
                  </div>
                </section>
                <section id="legal" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">9. Legal & Children</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We may disclose information if the law, a court or a government authority requires it, or to protect our rights and the safety of others.</p>
                    <p>Our website and services are meant for businesses and adults. We do not knowingly collect data from anyone under 18. If you believe a child has sent us their details, contact us and we will delete them.</p>
                  </div>
                </section>
                <section id="updates" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">10. Changes to This Policy</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We may update this policy when our services or the law change. The latest version will always be on this page, with the date it was last updated. This policy was last updated on 30 September 2026.</p>
                  </div>
                </section>
                <section id="contact" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">11. Contact & Grievance Officer</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>For any question, request or complaint about your personal data, contact our Grievance Officer, <strong className="text-brandDark">Sachin Bauddh</strong> (Founder):</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Techinfigo, Office no. 03, Second Floor, Block no. 25, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002, India</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Email: <a href="mailto:contact@techinfigo.com" target="_blank" rel="noopener noreferrer" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">contact@techinfigo.com</a></span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Phone and WhatsApp: <a href="https://wa.me/919557338487" target="_blank" rel="noopener noreferrer" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">+91 95573 38487</a></span></li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};