import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../../components/Navbar';
import { AgraLandingPageWrapper } from '../../components/AgraLandingPageWrapper';
import { Footer } from '../../components/Footer';
import { getSiteSettings } from '../../lib/settings';

export const metadata: Metadata = {
  title: { absolute: 'Digital Marketing Agency in Agra | #1 ROI-Focused Agency - Techinfigo' },
  description: 'Techinfigo is the leading digital marketing agency in Agra. We help brands in Sanjay Place, Fatehabad Road & beyond scale with Facebook Ads, Google Ads, and SEO. Get a free audit today.',
  keywords: 'digital marketing agency agra, seo services agra, facebook ads agra, google ads agency agra, web development agra, ecommerce growth agra, marketing agency in agra uttar pradesh',
  openGraph: {
    title: 'Digital Marketing Agency in Agra | Techinfigo',
    description: 'Stop burning cash on ads. We build performance-focused strategies that drive real leads and profit for brands in Agra.',
    url: 'https://www.techinfigo.com/digital-marketing-agency-agra',
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
    canonical: 'https://www.techinfigo.com/digital-marketing-agency-agra',
  },
};

export default async function AgraLanding() {
  const settings = await getSiteSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Techinfigo Digital Marketing Agency Agra",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    "@id": "https://www.techinfigo.com/digital-marketing-agency-agra",
    "url": "https://www.techinfigo.com/digital-marketing-agency-agra",
    // Omitted entirely while unset — an invalid telephone is worse than none.
    ...(settings.contact.phone ? { "telephone": settings.contact.phone } : {}),
    "priceRange": "$$",
    "description": "Agra's leading ROI-focused digital marketing agency. Specializing in SEO, Facebook Ads, and Google Ads for local businesses in Sanjay Place, Fatehabad Road, and Civil Lines.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sanjay Place",
      "addressLocality": "Agra",
      "postalCode": "282002",
      "addressRegion": "UP",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Agra"
      },
      {
        "@type": "City",
        "name": "Mathura"
      },
      {
        "@type": "City",
        "name": "Firozabad"
      }
    ],
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
      <Navbar activePage="digital-marketing-agency-agra" />
      <AgraLandingPageWrapper />
      <Footer />
    </main>
  );
}
