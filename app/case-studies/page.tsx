import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'D2C Growth Benchmarks & Unit-Economic Targets',
  description: 'Real unit-economic benchmarks and margin targets from the D2C brands we have scaled profitably.',
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'D2C Growth Benchmarks & Unit-Economic Targets',
    description: 'Real unit-economic benchmarks and margin targets from the D2C brands we have scaled profitably.',
    url: '/case-studies',
  },
};

export default function Page() {
  return <PageClient />;
}
