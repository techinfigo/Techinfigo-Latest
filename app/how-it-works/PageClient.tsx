'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { HowItWorksPage } from '../../components/HowItWorksPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '../../lib/content-schema';

export default function PageClient({ steps }: { steps: SiteContent['howItWorks']['steps'] }) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="how-it-works" />
      <div className="animate-slide-up">
        <HowItWorksPage steps={steps} onNavigate={(page) => router.push(`/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
