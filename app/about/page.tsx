import type { Metadata } from 'next';
import PageClient from './PageClient';
import { getGoogleReviews } from '../../lib/google-reviews';
import { GoogleReviewsSection } from '../../components/GoogleReviewsSection';

const TITLE = 'About Techinfigo | Digital Marketing Agency in Agra';
const DESCRIPTION =
  'Founded by Sachin Bauddh in Sanjay Place, Agra. 10 years in digital marketing, helping local businesses and online brands get more enquiries, with a free CRM for every client.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/about' },
  openGraph: {
    images: ['/og-image.jpg?v=2'], title: TITLE, description: DESCRIPTION, url: '/about' },
};

export default async function Page() {
  const reviews = await getGoogleReviews();
  return (
    <PageClient
      rating={reviews?.rating ?? null}
      reviewCount={reviews?.count ?? null}
      reviews={<GoogleReviewsSection />}
    />
  );
}
