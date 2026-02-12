import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QualificationProtocol } from './components/QualificationProtocol';
import { DiagnosticSection } from './components/DiagnosticSection';
import { TechinfigoEdge } from './components/TechinfigoEdge';
import { FullStackEngine } from './components/FullStackEngine';
import { CaseStudySection } from './components/CaseStudySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RevenueAccelerator } from './components/RevenueAccelerator';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { CareersPage } from './components/CareersPage';
import { SystemPage } from './components/SystemPage';
import { QualificationPage } from './components/QualificationPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { SitemapPage } from './components/SitemapPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const navigateTo = (page: string, serviceId?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
    if (serviceId) {
      setSelectedService(serviceId);
    } else {
      setSelectedService(null);
    }
  };

  const lifecycleSteps = [
    { num: "1", title: "Audit", desc: "Identifying leakage in current funnel & unit economics." },
    { num: "2", title: "Test", desc: "Weekly creative sprints to find winning hooks." },
    { num: "3", title: "Stabilize", desc: "Killing the waste and finding a baseline CAC." },
    { num: "4", title: "Scale", desc: "Deploying budget into proven creative/offer combos." },
    { num: "5", title: "Retain", desc: "Maximizing LTV via automated backend flows." }
  ];

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth transition-all duration-700">
      <Navbar onNavigate={navigateTo} activePage={currentPage} />
      
      {currentPage === 'home' && (
        <div className="animate-fade-in">
          <Hero onBookAudit={() => navigateTo('contact')} />
          <QualificationProtocol />
          <DiagnosticSection />

          {/* INTEGRATED: Our Growth Lifecycle */}
          <section className="py-24 lg:py-40 px-6 lg:px-12 bg-[#f9f7f2] border-y border-brandDark/5 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16 lg:mb-24 space-y-6">
                <h2 className="text-4xl lg:text-[64px] font-black text-brandDark tracking-tighter leading-tight">
                  Our Growth Lifecycle
                </h2>
                <p className="text-brandDark/50 text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                  From first audit to stable scale, here is exactly how your brand moves through our system.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
                {lifecycleSteps.map((step, i) => (
                  <div key={i} className="bg-white border border-brandDark/5 rounded-[2rem] p-8 lg:p-10 shadow-sm relative overflow-hidden group hover:shadow-4xl hover:-translate-y-1 transition-all duration-700">
                    <span className="absolute top-4 right-6 text-[80px] lg:text-[110px] font-black text-brandDark/[0.04] leading-none select-none pointer-events-none group-hover:text-brandYellow/[0.1] transition-colors duration-700">
                      {step.num}
                    </span>
                    <div className="relative z-10 space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-black text-brandDark tracking-tight uppercase">{step.title}</h3>
                      <p className="text-brandDark/50 text-sm lg:text-base font-medium leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* INTEGRATED: How we track performance */}
          <section className="py-24 lg:py-40 px-6 lg:px-12 bg-brandDark text-white relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brandYellow/[0.02] blur-[150px] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
              <div className="lg:col-span-6 space-y-16">
                <div className="space-y-6">
                  <h2 className="text-4xl lg:text-[64px] font-black tracking-tighter leading-[0.9]">
                    How we track <br /> performance.
                  </h2>
                  <p className="text-white/50 text-lg lg:text-xl font-medium max-w-lg leading-relaxed">
                    We ignore platform attribution and focus on the metrics that actually build wealth.
                  </p>
                </div>
                <div className="space-y-10">
                  {[
                    { title: "MER (Marketing Efficiency Ratio)", desc: "Total Revenue / Total Ad Spend. This is our North Star.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                    { title: "Blended CAC", desc: "Total Marketing Cost / New Customers. We track this daily.", icon: "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" },
                    { title: "New-to-Brand Ratio", desc: "Ensuring we are scaling through new reach, not just retargeting.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
                  ].map((m, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brandYellow rounded-xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-5 h-5 text-brandDark" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={m.icon} /></svg>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl lg:text-2xl font-black tracking-tight">{m.title}</h3>
                        <p className="text-white/40 text-sm lg:text-base font-medium">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6">
                <div className="bg-[#002a2f] border border-white/5 rounded-[3rem] p-10 lg:p-14 shadow-4xl space-y-10 relative overflow-hidden group">
                  <h3 className="text-xl lg:text-2xl font-black text-brandYellow tracking-tight uppercase">Decision Checkpoints</h3>
                  <div className="space-y-6">
                    {[
                      { bold: "When to Scale:", text: "Blended MER is 20% above target for 3 consecutive days." },
                      { bold: "When to Pause:", text: "Ad-level CPA is 2x the 7-day average on new tests." },
                      { bold: "When to Pivot:", text: "Hook rate on new creative batch is below 15%." }
                    ].map((item, idx) => (
                      <div key={idx} className="p-6 lg:p-8 bg-brandDark/40 border border-white/5 rounded-2xl hover:bg-brandDark/60 transition-colors">
                        <p className="text-sm lg:text-base font-medium text-white/80 leading-relaxed">
                          <span className="font-black text-white">{item.bold}</span> {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <TechinfigoEdge onBookAudit={() => navigateTo('contact')} />
          <FullStackEngine />
          <CaseStudySection />
          <TestimonialsSection />
          <RevenueAccelerator />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {/* Page Routing */}
      {currentPage === 'about' && (
        <div className="animate-slide-up">
          <AboutPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'system' && (
        <div className="animate-slide-up">
          <SystemPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'services' && (
        <div className="animate-slide-up">
          <ServicesPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService && (
        <div className="animate-slide-up">
          <ServiceDetailPage serviceId={selectedService} onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'how-it-works' && (
        <div className="animate-slide-up">
          <HowItWorksPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'qualification' && (
        <div className="animate-slide-up">
          <QualificationPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'careers' && (
        <div className="animate-slide-up">
          <CareersPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'privacy' && (
        <div className="animate-slide-up">
          <PrivacyPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'terms' && (
        <div className="animate-slide-up">
          <TermsPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'sitemap' && (
        <div className="animate-slide-up">
          <SitemapPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'contact' && (
        <div className="animate-slide-up">
          <ContactPage 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo}
            onBookAudit={() => navigateTo('contact')}
          />
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </main>
  );
};

export default App;