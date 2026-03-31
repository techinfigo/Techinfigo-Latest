'use client';

import React from 'react';
import { Navbar } from '../../../components/Navbar';
import { ServiceDetailPage } from '../../../components/ServiceDetailPage';
import { Footer } from '../../../components/Footer';
import { useRouter, useParams } from 'next/navigation';

export default function ServiceDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

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
