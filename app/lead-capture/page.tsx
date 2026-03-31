'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { InteractiveLeadForm } from '../../components/InteractiveLeadForm';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function LeadCapture() {
  const router = useRouter();

  const handleBookAudit = () => {
    router.push('/lead-capture');
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="lead-capture" />
      <div className="animate-slide-up">
        <InteractiveLeadForm 
          onBack={() => router.push('/')} 
          onNavigate={(page) => router.push(`/${page}`)}
          onBookAudit={handleBookAudit}
        />
      </div>
    </main>
  );
}
