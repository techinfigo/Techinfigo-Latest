'use client';

import React from 'react';
import { Navbar } from '../../../components/Navbar';
import { ServiceDetailPage } from '../../../components/ServiceDetailPage';
import { Footer } from '../../../components/Footer';
import { useRouter } from 'next/navigation';

export default function PageClient({ id }: { id: string }) {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="service-detail" />
      <div className="animate-slide-up">
        <ServiceDetailPage serviceId={id} onNavigate={(page, sid) => router.push(sid ? `/services/${sid}` : `/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
