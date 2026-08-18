import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'Careers | Growth Roles in Agra',
  description: 'Open growth roles at our Agra studio for marketers and operators who care about profit over vanity metrics.',
  alternates: {
    canonical: '/careers',
  },
  openGraph: {
    title: 'Careers | Growth Roles in Agra',
    description: 'Open growth roles at our Agra studio for marketers and operators who care about profit over vanity metrics.',
    url: '/careers',
  },
};

export default function Page() {
  return <PageClient />;
}
