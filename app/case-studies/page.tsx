import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPublishedCaseStudies } from '../../lib/content';

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

// Published only. Drafts are filtered inside getPublishedCaseStudies(), not
// here, so a caller cannot forget and leak one onto the public site.
export default async function Page() {
  const studies = await getPublishedCaseStudies();
  return <PageClient studies={studies} />;
}
