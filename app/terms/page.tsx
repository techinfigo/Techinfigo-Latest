import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions that govern your use of the Techinfigo website and our services.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: '/terms',
  },
  openGraph: {
    title: 'Terms of Service',
    description: 'The terms and conditions that govern your use of the Techinfigo website and our services.',
    url: '/terms',
  },
};

export default function Page() {
  return <PageClient />;
}
