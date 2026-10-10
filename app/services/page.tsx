import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Services | Websites, Google Profile, Social Media, Ads & SEO',
  description: 'Websites, Google Business Profile, social media, Facebook/Instagram/Google ads, SEO and D2C growth for Agra businesses. Free CRM with every package.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Services | Websites, Google Profile, Social Media, Ads & SEO',
    description: 'Websites, Google Business Profile, social media, Facebook/Instagram/Google ads, SEO and D2C growth for Agra businesses. Free CRM with every package.',
    url: '/services',
  },
};

// Cached, tagged read — not per request — so this route stays prerendered and
// regenerates when the copy is saved, never on traffic.
export default async function Page() {
  const { pillars } = await getPageContent('services');
  return <PageClient pillars={pillars} />;
}
