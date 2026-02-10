
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SystemSection } from './components/SystemSection';
import { ProofSection } from './components/ProofSection';
import { QualificationSection } from './components/QualificationSection';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { HowItWorksPage } from './components/HowItWorksPage';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'contact' | 'about' | 'services' | 'how-it-works'>('home');

  const navigateTo = (page: 'home' | 'contact' | 'about' | 'services' | 'how-it-works') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  return (
    <main className="min-h-screen bg-brandBg selection:bg-brandYellow selection:text-brandDark scroll-smooth transition-all duration-700">
      <Navbar onNavigate={navigateTo} activePage={currentPage} />
      
      {currentPage === 'home' && (
        <div className="animate-fade-in">
          <Hero onBookAudit={() => navigateTo('contact')} />
          <section id="bottlenecks" className="scroll-mt-24">
            <ProblemSection />
          </section>
          <section id="infrastructure" className="scroll-mt-24">
            <SystemSection />
          </section>
          <section id="track-record" className="scroll-mt-24">
            <ProofSection />
          </section>
          <section id="qualification" className="scroll-mt-24">
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

      {currentPage === 'services' && (
        <div className="animate-slide-up">
          <ServicesPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('contact')} />
        </div>
      )}

      {currentPage === 'how-it-works' && (
        <div className="animate-slide-up">
          <HowItWorksPage onNavigate={navigateTo} />
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
