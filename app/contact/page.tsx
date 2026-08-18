import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Contact | Talk to a D2C Profit Strategist',
  description: 'Talk to a D2C profit strategist about where your margin is leaking and what it would take to fix it.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact | Talk to a D2C Profit Strategist',
    description: 'Talk to a D2C profit strategist about where your margin is leaking and what it would take to fix it.',
    url: '/contact',
  },
};

export default function Page() {
  return <PageClient />;
}
