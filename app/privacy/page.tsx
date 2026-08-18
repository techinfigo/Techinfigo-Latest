import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Techinfigo collects, uses, stores and protects the personal data you share with us.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy',
    description: 'How Techinfigo collects, uses, stores and protects the personal data you share with us.',
    url: '/privacy',
  },
};

export default function Page() {
  return <PageClient />;
}
