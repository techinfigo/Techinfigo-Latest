'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { CaseStudiesPage } from '../../components/CaseStudiesPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';
import type { CaseStudy } from '../../lib/content-schema';

export default function PageClient({ studies }: { studies: CaseStudy[] }) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="case-studies" />
      <div className="animate-slide-up">
        <CaseStudiesPage studies={studies} onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
