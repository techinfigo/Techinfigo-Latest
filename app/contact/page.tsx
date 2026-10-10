import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Contact Us | Digital Marketing Agency in Agra',
  description: 'Call, WhatsApp or visit Techinfigo in Sanjay Place, Agra. Tell us about your business and get a free health check of your website, Google profile and ads.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    images: ['/og-image.jpg?v=2'],
    title: 'Contact Techinfigo | Digital Marketing Agency in Agra',
    description: 'Call, WhatsApp or visit Techinfigo in Sanjay Place, Agra. Tell us about your business and get a free health check of your website, Google profile and ads.',
    url: '/contact',
  },
};

export default function Page() {
  return <PageClient />;
}
