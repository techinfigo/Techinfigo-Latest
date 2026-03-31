'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { AgraLandingPage } from '../../components/AgraLandingPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function AgraLanding() {
  const router = useRouter();

  const handleBookAudit = () => {
    router.push('/lead-capture');
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="agra-landing" />
      <div className="animate-slide-up">
        <AgraLandingPage 
          onNavigate={(page) => router.push(`/${page}`)} 
          onBookAudit={handleBookAudit}
        />
        <Footer />
      </div>
    </main>
  );
}
