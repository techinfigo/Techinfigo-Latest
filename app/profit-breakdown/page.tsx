import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'D2C Profit Breakdown | Where Your Margin Actually Leaks',
  description: 'A line-by-line breakdown of where D2C margin actually leaks, from CAC and COGS to shipping, discounts and returns.',
  alternates: {
    canonical: '/profit-breakdown',
  },
  openGraph: {
    title: 'D2C Profit Breakdown | Where Your Margin Actually Leaks',
    description: 'A line-by-line breakdown of where D2C margin actually leaks, from CAC and COGS to shipping, discounts and returns.',
    url: '/profit-breakdown',
  },
};

export default function Page() {
  return <PageClient />;
}
