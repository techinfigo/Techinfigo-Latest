import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageClient from './PageClient';
import { SERVICES, getService } from '../../../lib/services';

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
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: `/services/${id}` },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!getService(id)) notFound();
  return <PageClient id={id} />;
}
