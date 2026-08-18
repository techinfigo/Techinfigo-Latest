'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { CareersPage } from '../../components/CareersPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function PageClient() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="careers" />
      <div className="animate-slide-up">
        <CareersPage onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
