import React from 'react';
import { Metadata } from 'next';
import { Navbar } from '../components/Navbar';
import { HomePage } from '../components/HomePage';
import { GoogleReviewsSection } from '../components/GoogleReviewsSection';
import { Footer } from '../components/Footer';
import { getSiteSettings } from '../lib/settings';
import { getPageContent } from '../lib/content';
import { getGoogleReviews } from '../lib/google-reviews';

const TITLE = 'Techinfigo | Digital Marketing Agency in Agra';
const DESCRIPTION =
  'Websites, Google Business Profile, social media and ads for Agra businesses and online brands, with a free CRM to track every enquiry. Get a free health check.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.techinfigo.com',
    siteName: 'Techinfigo',
    images: ['https://www.techinfigo.com/og-image.jpg?v=2'],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['https://www.techinfigo.com/og-image.jpg?v=2'],
  },
};

export default async function Home() {
  // Cached, tagged reads: the page stays prerendered and regenerates when the
  // admin panel saves, not on every visit. Reviews refresh daily.
  const [settings, home, howItWorks, services, reviews] = await Promise.all([
    getSiteSettings(),
    getPageContent('home'),
    getPageContent('howItWorks'),
    getPageContent('services'),
    getGoogleReviews(),
  ]);

  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <Navbar activePage="home" />
      <HomePage
        home={home}
        steps={howItWorks.steps}
        pillars={services.pillars}
        rating={reviews?.rating ?? null}
        reviewCount={reviews?.count ?? null}
        videos={settings.videos ?? []}
        reviews={<GoogleReviewsSection />}
      />
      <Footer />
    </main>
  );
}
