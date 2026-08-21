'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { QualificationPage } from '../../components/QualificationPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '../../lib/content-schema';

export default function PageClient({
  greenLights,
  redFlags,
}: {
  greenLights: SiteContent['qualification']['greenLights'];
  redFlags: SiteContent['qualification']['redFlags'];
}) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandDark text-white selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="qualification" />
      <QualificationPage greenLights={greenLights} redFlags={redFlags} onNavigate={(page) => router.push(`/${page}`)} />
      <Footer />
    </main>
  );
}
