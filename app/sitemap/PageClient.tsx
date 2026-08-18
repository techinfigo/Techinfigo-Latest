'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { SitemapPage } from '../../components/SitemapPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function PageClient() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="sitemap" />
      <div className="animate-slide-up">
        <SitemapPage onNavigate={(page, id) => router.push(id ? `/services/${id}` : `/${page}`)} />
        <Footer />
      </div>
    </main>
  );
}
