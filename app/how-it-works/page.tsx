import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';

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

// Cached, tagged read — not per request — so this route stays prerendered.
export default async function Page() {
  const { steps } = await getPageContent('howItWorks');
  return <PageClient steps={steps} />;
}
