'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { RefundPage } from '../../components/RefundPage';
import { Footer } from '../../components/Footer';

export default function PageClient() {
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="refund-policy" />
      <div className="animate-slide-up">
        <RefundPage />
        <Footer />
      </div>
    </main>
  );
}
