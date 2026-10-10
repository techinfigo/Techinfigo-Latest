import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Careers | Work With Techinfigo in Agra',
  description: 'Join a small, founder-led digital marketing team in Sanjay Place, Agra: social media, reels, ads, websites, SEO and sales.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Careers | Work With Techinfigo in Agra',
    description: 'Join a small, founder-led digital marketing team in Sanjay Place, Agra: social media, reels, ads, websites, SEO and sales.',
    url: '/careers',
  },
};

export default function Page() {
  return <PageClient />;
}
