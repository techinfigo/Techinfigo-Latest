'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { ProfitBreakdownPage } from '../../components/ProfitBreakdownPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function ProfitBreakdown() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="profit-breakdown" />
      <div className="animate-slide-up">
        <ProfitBreakdownPage onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
