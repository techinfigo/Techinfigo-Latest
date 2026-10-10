import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageClient from './PageClient';
import { SERVICES, getService } from '../../../lib/services';
import { SITE } from '../../../config/site';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.slug }));
}

// Only the six real services exist; anything else is a 404, not a copy of
// another page. Old slugs are redirected in next.config.ts.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const service = getService(id);
  if (!service) return {};
  return {
    title: { absolute: service.metaTitle },
    description: service.metaDescription,
    alternates: { canonical: `/services/${id}` },
    openGraph: { images: ['/og-image.jpg?v=2'], title: service.metaTitle, description: service.metaDescription, url: `/services/${id}` },
  };
}

/** Service + breadcrumb structured data, so Google knows what this page sells and where it sits. */
function serviceJsonLd(id: string) {
  const service = getService(id)!;
  const url = `${SITE.url}/services/${id}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.metaDescription,
      url,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: [{ '@type': 'City', name: 'Agra' }, { '@type': 'Country', name: 'India' }],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
        { '@type': 'ListItem', position: 3, name: service.title, item: url },
      ],
    },
  ];
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getService(id)) notFound();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd(id)) }} />
      <PageClient id={id} />
    </>
  );
}
