'use client';

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
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleBookAudit = () => {
    router.push('/lead-capture');
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="home" />
      <Hero onBookAudit={handleBookAudit} />
      <QualificationProtocol onBookAudit={handleBookAudit} />
      <DiagnosticSection onBookAudit={handleBookAudit} />
      <GrowthLifecycle />
      <CaseStudySection />
      <TestimonialsSection />
      <RevenueAccelerator onBookAudit={handleBookAudit} />
      <Footer />
    </main>
  );
}
