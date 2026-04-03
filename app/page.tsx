import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QualificationProtocol } from '../components/QualificationProtocol';
import { DiagnosticSection } from '../components/DiagnosticSection';
import { GrowthLifecycle } from '../components/GrowthLifecycle';
import { CaseStudySection } from '../components/CaseStudySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RevenueAccelerator } from '../components/RevenueAccelerator';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="home" />
      <Hero {...({} as any)} />
      <QualificationProtocol {...({} as any)} />
      <DiagnosticSection />
      <GrowthLifecycle />
      <CaseStudySection />
      <TestimonialsSection />
      <RevenueAccelerator />
      <Footer />
    </main>
  );
}
