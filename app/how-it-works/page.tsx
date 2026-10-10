import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';
import { getGoogleReviews } from '../../lib/google-reviews';

export const metadata: Metadata = {
  title: 'How We Work | Simple Steps, Every Enquiry Tracked',
  description: 'How Techinfigo works with Agra businesses and online brands: free health check, fix the basics, bring enquiries, and track every lead in a free CRM.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'How We Work | Simple Steps, Every Enquiry Tracked',
    description: 'How Techinfigo works with Agra businesses and online brands: free health check, fix the basics, bring enquiries, and track every lead in a free CRM.',
    url: '/how-it-works',
  },
};

// Cached, tagged read — not per request — so this route stays prerendered.
export default async function Page() {
  const [{ steps }, reviews] = await Promise.all([getPageContent('howItWorks'), getGoogleReviews()]);
  return <PageClient steps={steps} rating={reviews?.rating ?? null} reviewCount={reviews?.count ?? null} />;
}
