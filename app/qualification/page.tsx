import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getPageContent } from '../../lib/content';

export const metadata: Metadata = {
  title: 'Who We Fit | Is Techinfigo Right for Your Business?',
  description: 'An honest list of when we are a good fit for local Agra businesses and online brands, and when we are not.',
  alternates: {
    canonical: '/qualification',
  },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Who We Fit | Is Techinfigo Right for Your Business?',
    description: 'An honest list of when we are a good fit for local Agra businesses and online brands, and when we are not.',
    url: '/qualification',
  },
};

// Cached, tagged read — not per request — so this route stays prerendered.
export default async function Page() {
  const { greenLights, redFlags } = await getPageContent('qualification');
  return <PageClient greenLights={greenLights} redFlags={redFlags} />;
}
