import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../../components/Navbar';
import { AgraLandingPageWrapper } from '../../components/AgraLandingPageWrapper';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
  title: 'Digital Marketing Agency in Agra | Scale Your Brand Profitably - Techinfigo',
  description: 'Techinfigo is Agra\'s leading digital marketing agency specializing in Facebook Ads, Google Ads, SEO, and Ecommerce growth. We fix your unit economics to drive real profit.',
  keywords: 'digital marketing agency agra, seo services agra, facebook ads agra, google ads agency agra, web development agra, ecommerce growth agra',
  openGraph: {
    title: 'Digital Marketing Agency in Agra | Techinfigo',
    description: 'Stop burning cash on ads. We build performance-focused strategies that drive real leads and profit for brands in Agra.',
    url: 'https://techinfigo.com/agra-landing',
    siteName: 'Techinfigo',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        width: 1200,
        height: 630,
        alt: 'Techinfigo Agra Digital Marketing',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://techinfigo.com/agra-landing',
  },
};

export default function AgraLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Techinfigo Digital Marketing Agency Agra",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    "@id": "https://techinfigo.com/agra-landing",
    "url": "https://techinfigo.com/agra-landing",
    "telephone": "+91-YOUR-NUMBER",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sanjay Place",
      "addressLocality": "Agra",
      "postalCode": "282002",
      "addressRegion": "UP",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.1767,
      "longitude": 78.0081
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/techinfigo",
      "https://www.instagram.com/techinfigo"
    ]
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar activePage="agra-landing" />
      <AgraLandingPageWrapper />
      <Footer />
    </main>
  );
}
