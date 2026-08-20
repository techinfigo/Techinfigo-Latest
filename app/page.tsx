import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { FounderSection } from '../components/FounderSection';
import { EmotionalSection } from '../components/EmotionalSection';
import { DiagnosticSection } from '../components/DiagnosticSection';
import { QualificationProtocol } from '../components/QualificationProtocol';
import { GrowthLifecycle } from '../components/GrowthLifecycle';
import { CaseStudySection } from '../components/CaseStudySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { RevenueAccelerator } from '../components/RevenueAccelerator';
import { Footer } from '../components/Footer';
// CAPACITY is imported for the batch label only — it is derived from today's
// date rather than editable, which is what stopped it going stale. The
// scarcity toggle and slot count come from the settings document.
import { CAPACITY } from '../config/site';
import { getSiteSettings } from '../lib/settings';

export const metadata: Metadata = {
  title: { absolute: "Techinfigo | Profit-First D2C Growth Partner" },
  description: "Techinfigo helps D2C founders identify profit leaks and build compounding growth systems. No vanity metrics, just bottom-line results.",
  openGraph: {
    title: "Techinfigo | Profit-First D2C Growth Partner",
    description: "Techinfigo helps D2C founders identify profit leaks and build compounding growth systems. No vanity metrics, just bottom-line results.",
    url: "https://www.techinfigo.com",
    siteName: "Techinfigo",
    images: ["https://www.techinfigo.com/og-image.jpg"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Techinfigo | Profit-First D2C Growth Partner",
    description: "Techinfigo helps D2C founders identify profit leaks and build compounding growth systems. No vanity metrics, just bottom-line results.",
    images: ["https://www.techinfigo.com/og-image.jpg"],
  },
};

export default async function Home() {
  // Read on the server. getSiteSettings() is a cached, tagged read rather than
  // a per-request one, so this page stays statically prerendered — it
  // regenerates when the admin panel saves, not on every visit.
  const { capacity } = await getSiteSettings();

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="home" />
      <Hero {...({} as any)} />
      
      {/* Founding Partner Offer Strip */}
      <div className="bg-brandYellow py-4 overflow-hidden relative border-y border-brandDark/5">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4">
              <span className="text-[10px] font-black text-brandDark uppercase tracking-[0.4em]">Now onboarding our first founding D2C partners</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brandDark"></span>
              <span className="text-[10px] font-black text-brandDark uppercase tracking-[0.4em]">{capacity.showScarcity ? `Limited to ${capacity.slotsOpen} brands for ${CAPACITY.currentBatch}` : 'Senior strategists only — no junior account managers'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brandDark"></span>
              <span className="text-[10px] font-black text-brandDark uppercase tracking-[0.4em]">Founding-partner offer active</span>
              <span className="w-1.5 h-1.5 rounded-full bg-brandDark"></span>
            </div>
          ))}
        </div>
      </div>

      <FounderSection />
      <EmotionalSection />
      <DiagnosticSection />
      <QualificationProtocol {...({} as any)} />
      
      <GrowthLifecycle />
      <CaseStudySection />
      <TestimonialsSection />
      <RevenueAccelerator />
      <Footer />
    </main>
  );
}
