import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Our Process | From Profit Audit to Scaled Margin',
  description: 'See our step-by-step process, from the opening profit audit through to a scaled, margin-positive growth system.',
  alternates: {
    canonical: '/how-it-works',
  },
  openGraph: {
    title: 'Our Process | From Profit Audit to Scaled Margin',
    description: 'See our step-by-step process, from the opening profit audit through to a scaled, margin-positive growth system.',
    url: '/how-it-works',
  },
};

export default function Page() {
  return <PageClient />;
}
