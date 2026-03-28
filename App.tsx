import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QualificationProtocol } from './components/QualificationProtocol';
import { DiagnosticSection } from './components/DiagnosticSection';
import { TechinfigoEdge } from './components/TechinfigoEdge';
import { FullStackEngine } from './components/FullStackEngine';
import { CaseStudySection } from './components/CaseStudySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { RevenueAccelerator } from './components/RevenueAccelerator';
import { GrowthLifecycle } from './components/GrowthLifecycle';
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
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { ProfitBreakdownPage } from './components/ProfitBreakdownPage';
import { InteractiveLeadForm } from './components/InteractiveLeadForm';
import { AgraLandingPage } from './components/AgraLandingPage';
import { Footer } from './components/Footer';
import { PerformanceAdsPage } from './components/PerformanceAdsPage';
import { CROPage } from './components/CROPage';
import { SEOPage } from './components/SEOPage';
import { RetentionPage } from './components/RetentionPage';
import { AutomationPage } from './components/AutomationPage';
import { CreativePage } from './components/CreativePage';
import { InfluencerPage } from './components/InfluencerPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);

 const navigate = useNavigate();

const navigateTo = (page: string, serviceId?: string) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  const routeMap: any = {
    home: "/",
    about: "/about",
    services: "/services",
    contact: "/contact",
    "case-studies": "/case-studies",
    "profit-breakdown": "/profit-breakdown",
    system: "/system",
    "how-it-works": "/how-it-works",
    qualification: "/qualification",
    careers: "/careers",
    privacy: "/privacy",
    terms: "/terms",
    sitemap: "/sitemap",
    "agra-landing": "/agra",
    "lead-capture": "/lead"
  };

  const path = routeMap[page] || "/";
  navigate(path);

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
          <Hero onBookAudit={() => navigateTo('lead-capture')} />
          <QualificationProtocol onBookAudit={() => navigateTo('lead-capture')} />
          <DiagnosticSection onBookAudit={() => navigateTo('lead-capture')} />

          {/* INTEGRATED: Growth Lifecycle */}
          <GrowthLifecycle onBookAudit={() => navigateTo('lead-capture')} />

          <CaseStudySection onBookAudit={() => navigateTo('lead-capture')} onNavigate={navigateTo} />
          <TestimonialsSection onBookAudit={() => navigateTo('lead-capture')} />
          <RevenueAccelerator onBookAudit={() => navigateTo('lead-capture')} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {/* Page Routing */}
      {currentPage === 'case-studies' && (
        <div className="animate-slide-up">
          <CaseStudiesPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'profit-breakdown' && (
        <div className="animate-slide-up">
          <ProfitBreakdownPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'about' && (
        <div className="animate-slide-up">
          <AboutPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'system' && (
        <div className="animate-slide-up">
          <SystemPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'services' && (
        <div className="animate-slide-up">
          <ServicesPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'performance-ads' && (
        <div className="animate-slide-up">
          <PerformanceAdsPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'cro' && (
        <div className="animate-slide-up">
          <CROPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'seo' && (
        <div className="animate-slide-up">
          <SEOPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'retention' && (
        <div className="animate-slide-up">
          <RetentionPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'automation' && (
        <div className="animate-slide-up">
          <AutomationPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'creative' && (
        <div className="animate-slide-up">
          <CreativePage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService === 'influencer' && (
        <div className="animate-slide-up">
          <InfluencerPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'service-detail' && selectedService && selectedService !== 'performance-ads' && selectedService !== 'cro' && selectedService !== 'seo' && selectedService !== 'retention' && selectedService !== 'automation' && selectedService !== 'creative' && selectedService !== 'influencer' && (
        <div className="animate-slide-up">
          <ServiceDetailPage serviceId={selectedService} onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'how-it-works' && (
        <div className="animate-slide-up">
          <HowItWorksPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'qualification' && (
        <div className="animate-slide-up">
          <QualificationPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'careers' && (
        <div className="animate-slide-up">
          <CareersPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'privacy' && (
        <div className="animate-slide-up">
          <PrivacyPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'terms' && (
        <div className="animate-slide-up">
          <TermsPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'sitemap' && (
        <div className="animate-slide-up">
          <SitemapPage onNavigate={navigateTo} />
          <Footer onNavigate={navigateTo} onBookAudit={() => navigateTo('lead-capture')} />
        </div>
      )}

      {currentPage === 'agra-landing' && (
        <div className="animate-slide-up">
          <AgraLandingPage 
            onNavigate={navigateTo}
            onBookAudit={() => navigateTo('lead-capture')}
          />
        </div>
      )}

      {currentPage === 'contact' && (
        <div className="animate-slide-up">
          <ContactPage 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo}
            onBookAudit={() => navigateTo('lead-capture')}
          />
        </div>
      )}

      {currentPage === 'lead-capture' && (
        <div className="animate-slide-up">
          <InteractiveLeadForm 
            onBack={() => navigateTo('home')} 
            onNavigate={navigateTo}
            onBookAudit={() => navigateTo('lead-capture')}
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
