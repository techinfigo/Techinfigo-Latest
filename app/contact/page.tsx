'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { ContactPage } from '../../components/ContactPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function Contact() {
  const router = useRouter();

  const handleBookAudit = () => {
    router.push('/lead-capture');
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="contact" />
      <div className="animate-slide-up">
        <ContactPage 
          onNavigate={(page) => router.push(`/${page}`)} 
          onBack={() => router.back()}
          onBookAudit={handleBookAudit}
        />
      </div>
    </main>
  );
}
