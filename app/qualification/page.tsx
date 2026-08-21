import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';

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

// Cached, tagged read — not per request — so this route stays prerendered.
export default async function Page() {
  const { greenLights, redFlags } = await getPageContent('qualification');
  return <PageClient greenLights={greenLights} redFlags={redFlags} />;
}
