import type { Metadata } from 'next';
import PageClient from './PageClient';

type ServiceMeta = { title: string; description: string };

/** Keyed by the ids ServiceDetailPage knows about. */
const SERVICE_META: Record<string, ServiceMeta> = {
  'performance-ads': {
    title: 'D2C Performance Ads | Meta & Google Built for Margin',
    description: 'Offer-led creative and full-funnel Meta and Google campaigns tuned to contribution margin rather than ROAS screenshots.',
  },
  cro: {
    title: 'Conversion Rate Optimization | Turn Traffic into Margin',
    description: 'Funnel diagnostics, speed work and structured A/B testing that lift conversion rate and session value on the traffic you already pay for.',
  },
  seo: {
    title: 'eCommerce SEO | High-Intent Organic Traffic for D2C',
    description: 'Technical fixes, topical content and authority building that win high-intent organic rankings and cut your blended CAC.',
  },
  retention: {
    title: 'Email & SMS Retention Flows | Compound Your LTV',
    description: 'Automated email and SMS flows that drive repeat purchase, raise LTV and make your paid acquisition affordable again.',
  },
};

const FALLBACK: ServiceMeta = {
  title: 'D2C Growth Services',
  description: 'Profit-first growth services for D2C brands: performance ads, CRO, SEO and retention.',
};

export function generateStaticParams() {
  return [
    { id: 'performance-ads' },
    { id: 'cro' },
    { id: 'seo' },
    { id: 'retention' },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = SERVICE_META[id] ?? FALLBACK;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/services/${id}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/services/${id}`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PageClient id={id} />;
}
