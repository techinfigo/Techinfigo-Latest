import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { QualificationProtocol } from '../components/QualificationProtocol';
import { DiagnosticSection } from '../components/DiagnosticSection';
import { GrowthLifecycle } from '../components/GrowthLifecycle';
import { CaseStudySection } from '../components/CaseStudySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RevenueAccelerator } from '../components/RevenueAccelerator';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: "Ecommerce Marketing Agency for D2C Brands | Techinfigo",
  description: "Techinfigo is a D2C-focused growth agency helping ecommerce brands scale profitably using performance marketing, CRO, and growth systems.",
  openGraph: {
    title: "Ecommerce Marketing Agency for D2C Brands | Techinfigo",
    description: "Techinfigo is a D2C-focused growth agency helping ecommerce brands scale profitably using performance marketing, CRO, and growth systems.",
    url: "https://techinfigo.com",
    siteName: "Techinfigo",
    images: ["https://techinfigo.com/og-image.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ecommerce Marketing Agency for D2C Brands | Techinfigo",
    description: "Techinfigo is a D2C-focused growth agency helping ecommerce brands scale profitably using performance marketing, CRO, and growth systems.",
    images: ["https://techinfigo.com/og-image.jpg"],
  },
};

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
