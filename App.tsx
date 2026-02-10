import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SystemSection } from './components/SystemSection';
import { ProofSection } from './components/ProofSection';
import { QualificationSection } from './components/QualificationSection';
import { QualificationProtocol } from './components/QualificationProtocol';
import { DiagnosticSection } from './components/DiagnosticSection';
import { TechinfigoEdge } from './components/TechinfigoEdge';
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

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth transition-all duration-700">
      <Navbar onNavigate={navigateTo} activePage={currentPage} />
      
      {currentPage === 'home' && (
        <div className="animate-fade-in">
          <Hero onBookAudit={() => navigateTo('contact')} />
          <QualificationProtocol />
          <DiagnosticSection />
          <TechinfigoEdge onBookAudit={() => navigateTo('contact')} />
          <section id="bottlenecks" className="scroll-mt-24">
            <ProblemSection />
          </section>
          <section id="infrastructure" className="scroll-mt-24">
            <SystemSection />
          </section>
          <section id="track-record" className="scroll-mt-24">
            <ProofSection />
          </section>
          <section id="qualification-section" className="scroll-mt-24">
            <QualificationSection />
          </section>
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

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
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </main>
  );
};

export default App;