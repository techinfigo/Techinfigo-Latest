import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';

export const metadata: Metadata = {
  title: 'D2C Growth Services | Performance Ads, CRO, SEO & Retention',
  description: 'Performance ads, CRO, SEO and retention, built as one profit-first growth system instead of four disconnected services.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'D2C Growth Services | Performance Ads, CRO, SEO & Retention',
    description: 'Performance ads, CRO, SEO and retention, built as one profit-first growth system instead of four disconnected services.',
    url: '/services',
  },
};

// Cached, tagged read — not per request — so this route stays prerendered and
// regenerates when the copy is saved, never on traffic.
export default async function Page() {
  const { pillars } = await getPageContent('services');
  return <PageClient pillars={pillars} />;
}
