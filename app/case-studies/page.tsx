import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPublishedCaseStudies } from '../../lib/content';

export const metadata: Metadata = {
  title: 'D2C Growth Benchmarks & Unit-Economic Targets',
  description: 'Example D2C growth scenarios: where profit leaks and the targets we work towards. Industry benchmarks, not client results.',
  alternates: {
    canonical: '/case-studies',
  },
  // Kept out of Google until it holds real Agra client work: these are D2C
  // industry benchmarks, which send Google the wrong signal about what we do.
  robots: { index: false, follow: true },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'D2C Growth Benchmarks & Unit-Economic Targets',
    description: 'Example D2C growth scenarios: where profit leaks and the targets we work towards. Industry benchmarks, not client results.',
    url: '/case-studies',
  },
};

// Published only. Drafts are filtered inside getPublishedCaseStudies(), not
// here, so a caller cannot forget and leak one onto the public site.
export default async function Page() {
  const studies = await getPublishedCaseStudies();
  return <PageClient studies={studies} />;
}
