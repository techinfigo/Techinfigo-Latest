import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Free D2C Profit Audit | Find Your Margin Leaks',
  description: 'Book a free D2C profit audit and get a clear map of the margin leaks costing you money right now.',
  alternates: {
    canonical: '/lead-capture',
  },
  openGraph: {
    title: 'Free D2C Profit Audit | Find Your Margin Leaks',
    description: 'Book a free D2C profit audit and get a clear map of the margin leaks costing you money right now.',
    url: '/lead-capture',
  },
};

export default function Page() {
  return <PageClient />;
}
