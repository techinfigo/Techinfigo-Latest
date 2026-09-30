'use client';

import React, { useState, useEffect } from 'react';

interface TermsPageProps {
  onNavigate: (page: string) => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate }) => {
  const [activeSection, setActiveSection] = useState('about');

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'website', label: 'Website Use' },
    { id: 'services', label: 'Services' },
    { id: 'payments', label: 'Payments' },
    { id: 'commitment', label: 'Commitment' },
    { id: 'results', label: 'Results' },
    { id: 'client', label: 'Your Role' },
    { id: 'ip', label: 'Ownership' },
    { id: 'crm', label: 'CRM & Data' },
    { id: 'platforms', label: 'Platforms' },
    { id: 'liability', label: 'Liability' },
    { id: 'termination', label: 'Termination' },
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
                <section id="about" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">1. About These Terms</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>These terms apply when you use www.techinfigo.com or buy services from Techinfigo, a digital marketing and website development business based in Agra, India, run by Sachin Bauddh. By using the website or our services, you agree to them.</p>
                    <p>Each project also has a written proposal or quotation. If the proposal and these terms differ, the proposal applies for that project.</p>
                  </div>
                </section>
                <section id="website" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">2. Using the Website</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>You may use this website to learn about our services and contact us. You agree not to misuse it, including by trying to break its security, sending spam or false enquiries, copying large parts of it, or using it for anything unlawful.</p>
                    <p>Information on the website, including prices, is general and may change. Starting prices show the lowest price of each package; your exact quote is confirmed in your proposal.</p>
                  </div>
                </section>
                <section id="services" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">3. Our Services</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We provide website development, social media marketing, paid advertising, SEO, Google Business Profile management and related services, as described in your proposal. Anything not listed in your proposal is outside the agreed work and may be quoted separately.</p>
                    <p>Website projects include two rounds of revisions. New pages or features requested after sign-off are quoted separately.</p>
                  </div>
                </section>
                <section id="payments" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">4. Payments</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Website projects: 50% advance to start and 50% before the website goes live, unless your proposal says otherwise</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Monthly services: fees are paid in advance at the start of each month</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Advertising budget is always separate and is paid by you directly to Meta, Google or the relevant platform</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Taxes are added where applicable</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>If a payment is late, we may pause work until it is received</span></li>
                    </ul>
                  </div>
                </section>
                <section id="commitment" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">5. Minimum Term & Cancellation</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Social media and advertising packages have a minimum term of 3 months; SEO packages and bundles have a minimum term of 6 months, unless your proposal says otherwise. Marketing results take time, and these terms give the work a fair chance to show them.</p>
                    <p>After the minimum term, either side can end a monthly service with 30 days&apos; written notice (email or WhatsApp is fine). Fees for work already done or for the current paid month are not refundable, except where your proposal says otherwise.</p>
                  </div>
                </section>
                <section id="results" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">6. Results</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>We work hard to bring you enquiries and sales, and we track every enquiry so you can see what your marketing brings. However, results depend on many things outside our control, including your offer, prices, competition, how quickly enquiries are followed up, and the rules of platforms like Google and Meta.</p>
                    <p><strong className="text-brandDark">We do not guarantee specific rankings, followers, leads or sales.</strong> We promise the agreed work, honest reporting and full transparency.</p>
                  </div>
                </section>
                <section id="client" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">7. Your Responsibilities</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>To deliver on time, we need you to:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Share content, photos, logins or partner access, and approvals within reasonable time; delays on your side extend our timelines</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Make sure the information and material you give us is accurate and that you have the right to use it</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Follow up on the enquiries your marketing brings</span></li>
                    </ul>
                    <p>Please give us partner or team access to your accounts rather than your passwords.</p>
                  </div>
                </section>
                <section id="ip" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">8. Ownership of Work</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Once you have paid in full, you own the final website design, content and creatives we made specifically for you.</p>
                    <p>We keep ownership of our own tools, code libraries, templates, know-how and the Techinfigo CRM software. We may show your project in our portfolio unless you ask us not to.</p>
                  </div>
                </section>
                <section id="crm" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">9. Free CRM & Your Data</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Our packages include access to the Techinfigo CRM to track your enquiries. The enquiry data in it belongs to you, and you can ask for an export at any time.</p>
                    <p>CRM access continues while you have an active package or care plan. If it ends, we will give you reasonable notice and time to export your data before access is closed. We handle your data as described in our <a href="/privacy" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">Privacy Policy</a>.</p>
                  </div>
                </section>
                <section id="platforms" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">10. Third-Party Platforms</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Our work relies on platforms such as Google, Meta, WhatsApp, domain registrars and hosting providers. Their rules, outages, price changes or account decisions, such as an ad account being restricted, are outside our control. We will always help you resolve such issues where we can.</p>
                  </div>
                </section>
                <section id="liability" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">11. Limitation of Liability</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>To the extent the law allows, our total liability for any claim relating to our services is limited to the fees you paid us in the 3 months before the claim. We are not liable for indirect losses such as lost profits or lost business opportunities.</p>
                    <p>Nothing in these terms limits liability that cannot be limited under Indian law.</p>
                  </div>
                </section>
                <section id="termination" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">12. Suspension & Termination</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Either side may end the work immediately if the other seriously breaches these terms and does not fix it within 15 days of written notice. We may also refuse or stop work that is unlawful, misleading or against platform rules.</p>
                  </div>
                </section>
                <section id="law" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">13. Governing Law</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>These terms are governed by the laws of India. Any dispute will first be discussed in good faith; if it cannot be resolved, the courts at Agra, Uttar Pradesh will have jurisdiction.</p>
                    <p>We may update these terms from time to time. The latest version will always be on this page. These terms were last updated on 30 September 2026.</p>
                  </div>
                </section>
                <section id="contact" className="space-y-8 scroll-mt-24">
                  <h2 className="text-3xl lg:text-4xl font-extrabold text-brandDark tracking-tighter">14. Contact</h2>
                  <div className="space-y-6 text-brandDark/70 text-lg leading-relaxed max-w-3xl pl-1">
                    <p>Questions about these terms? Contact us:</p>
                    <ul className="space-y-3">
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Techinfigo, Office no. 03, Second Floor, Block no. 25, Sanjay Place, Civil Lines, Agra, Uttar Pradesh 282002, India</span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Email: <a href="mailto:contact@techinfigo.com" target="_blank" rel="noopener noreferrer" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">contact@techinfigo.com</a></span></li>
                      <li className="flex gap-4 items-start"><span className="w-1.5 h-1.5 rounded-full bg-brandYellow mt-3 flex-shrink-0"></span><span>Phone and WhatsApp: <a href="https://wa.me/919557338487" target="_blank" rel="noopener noreferrer" className="text-brandDark font-bold border-b border-brandYellow hover:text-brandYellow transition-colors">+91 95573 38487</a></span></li>
                    </ul>
                  </div>
                </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};