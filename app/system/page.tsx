import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'The System | Profit Infrastructure for D2C',
  description: 'The profit infrastructure we install so D2C brands can scale ad spend without scaling their losses.',
  alternates: {
    canonical: '/system',
  },
  openGraph: {
    title: 'The System | Profit Infrastructure for D2C',
    description: 'The profit infrastructure we install so D2C brands can scale ad spend without scaling their losses.',
    url: '/system',
  },
};

export default function Page() {
  return <PageClient />;
}
