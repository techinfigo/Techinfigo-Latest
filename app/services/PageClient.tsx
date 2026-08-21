'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { ServicesPage } from '../../components/ServicesPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';
import type { SiteContent } from '../../lib/content-schema';

export default function PageClient({ pillars }: { pillars: SiteContent['services']['pillars'] }) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="services" />
      <div className="animate-slide-up">
        <ServicesPage pillars={pillars} onNavigate={(page, id) => router.push(id ? `/services/${id}` : `/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
