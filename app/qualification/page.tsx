'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { QualificationPage } from '../../components/QualificationPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function Qualification() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="qualification" />
      <div className="animate-slide-up">
        <QualificationPage onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
