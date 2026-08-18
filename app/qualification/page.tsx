import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Who We Work With | Partner Criteria',
  description: 'The partner criteria we use to decide which D2C brands we take on, and why we turn most of them down.',
  alternates: {
    canonical: '/qualification',
  },
  openGraph: {
    title: 'Who We Work With | Partner Criteria',
    description: 'The partner criteria we use to decide which D2C brands we take on, and why we turn most of them down.',
    url: '/qualification',
  },
};

export default function Page() {
  return <PageClient />;
}
