import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Free Website & Marketing Health Check',
  description: 'Get a free check of your website, Google profile and social pages. See the 3 things costing you enquiries, sent to you on WhatsApp within 24 hours.',
  alternates: {
    canonical: '/lead-capture',
  },
  openGraph: {
    title: 'Free Website & Marketing Health Check',
    description: 'Get a free check of your website, Google profile and social pages. See the 3 things costing you enquiries, sent to you on WhatsApp within 24 hours.',
    url: '/lead-capture',
  },
};

export default function Page() {
  return <PageClient />;
}
