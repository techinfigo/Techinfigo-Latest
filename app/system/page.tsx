'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { SystemPage } from '../../components/SystemPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function System() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="system" />
      <div className="animate-slide-up">
        <SystemPage onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
