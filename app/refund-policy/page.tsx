import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'When you can get a refund from Techinfigo for websites, monthly marketing plans and other services, and how to ask for one.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/refund-policy' },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Refund Policy',
    description: 'When you can get a refund from Techinfigo, and how to ask for one.',
    url: '/refund-policy',
  },
};

export default function Page() {
  return <PageClient />;
}
