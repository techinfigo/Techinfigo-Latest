import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../../components/Navbar';
import { AgraLandingPageWrapper } from '../../components/AgraLandingPageWrapper';
import { Footer } from '../../components/Footer';
import { getSiteSettings } from '../../lib/settings';
import { GoogleReviewsSection } from '../../components/GoogleReviewsSection';
import { ClientVideos } from '../../components/ClientVideos';

const TITLE = 'Digital Marketing & Website Development in Agra | Techinfigo';
const DESCRIPTION =
  'Websites, Google profile, social media and ads for Agra businesses, with a free CRM to track every enquiry. Get a free website health check today.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.techinfigo.com/digital-marketing-agency-agra',
    siteName: 'Techinfigo',
    images: ['https://www.techinfigo.com/og-image.jpg'],
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
    // Same name, address, pin and hours as the Google Business Profile, so
    // Google can match this page to the listing.
    "name": "Techinfigo - Digital Marketing Agency",
    "image": "https://www.techinfigo.com/og-image.jpg",
    "@id": "https://www.techinfigo.com/digital-marketing-agency-agra",
    "url": "https://www.techinfigo.com/digital-marketing-agency-agra",
    // Omitted entirely while unset — an invalid telephone is worse than none.
    ...(settings.contact.phone ? { "telephone": settings.contact.phone } : {}),
    "priceRange": "$$",
    "description": "Founder-led digital marketing and website development agency in Sanjay Place, Agra. Websites, Google Business Profile, SEO, social media and Meta/Google ads, with a free CRM to track every enquiry.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office no. 03, Second Floor, Block no. 25, Cloth Market, Sanjay Place, Civil Lines",
      "addressLocality": "Agra",
      "postalCode": "282002",
      "addressRegion": "Uttar Pradesh",
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
      "latitude": 27.1994194,
      "longitude": 78.0081121
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
      "opens": "10:30",
      "closes": "18:30"
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=TECHINFIGO&query_place_id=ChIJd-bZWwl3dDkRj4H5YdWtwPM",
    "sameAs": [
      "https://www.facebook.com/techinfigo/",
      "https://www.instagram.com/techinfigo/",
      "https://in.linkedin.com/company/techinfigo",
      "https://www.youtube.com/@techinfigo"
    ]
  };

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar activePage="digital-marketing-agency-agra" />
      <AgraLandingPageWrapper
        proofSection={
          <>
            <GoogleReviewsSection />
            <ClientVideos videos={settings.videos} />
          </>
        }
      />
      <Footer />
    </main>
  );
}
