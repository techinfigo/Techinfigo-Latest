import type { Metadata } from 'next';
import PageClient from './PageClient';

export const metadata: Metadata = {
  title: 'About Us | Profit-First D2C Growth Agency',
  description: 'Meet the profit-first growth team that treats your bottom line, not your ad spend, as the only scoreboard that matters.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | Profit-First D2C Growth Agency',
    description: 'Meet the profit-first growth team that treats your bottom line, not your ad spend, as the only scoreboard that matters.',
    url: '/about',
  },
};

export default function Page() {
  return <PageClient />;
}
