import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'A complete index of every page on the Techinfigo website, organised by section.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: '/sitemap',
  },
  openGraph: {
    title: 'Sitemap',
    description: 'A complete index of every page on the Techinfigo website, organised by section.',
    url: '/sitemap',
  },
};

export default function Page() {
  return <PageClient />;
}
