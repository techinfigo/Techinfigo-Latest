'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { TermsPage } from '../../components/TermsPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function Terms() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="terms" />
      <div className="animate-slide-up">
        <TermsPage onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
