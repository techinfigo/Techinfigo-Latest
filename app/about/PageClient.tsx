'use client';

import React from 'react';
import { Navbar } from '../../components/Navbar';
import { AboutPage } from '../../components/AboutPage';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/navigation';

export default function PageClient({
  rating,
  reviewCount,
  reviews,
}: {
  rating: number | null;
  reviewCount: number | null;
  reviews: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="about" />
      <div className="animate-slide-up">
        <AboutPage
          rating={rating}
          reviewCount={reviewCount}
          reviews={reviews}
          onNavigate={(page) => router.push(`/${page}`)}
        />
        <Footer />
      </div>
    </main>
  );
}
