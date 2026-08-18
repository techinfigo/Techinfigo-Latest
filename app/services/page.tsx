import type { Metadata } from 'next';
import PageClient from './PageClient';

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

export default function Page() {
  return <PageClient />;
}
