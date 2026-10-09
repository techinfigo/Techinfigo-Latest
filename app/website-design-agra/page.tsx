import type { Metadata } from 'next';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { WebsiteOfferPage } from '../../components/WebsiteOfferPage';
import { GoogleReviewsSection } from '../../components/GoogleReviewsSection';
import { getPageContent } from '../../lib/content';
import { getSiteSettings } from '../../lib/settings';
import { WEBSITE_OFFER_FAQS } from '../../lib/website-offer';

const TITLE = 'Website Design in Agra from ₹9,999 | Techinfigo';
const DESCRIPTION =
  'Business website in Agra for ₹9,999: mobile-friendly, WhatsApp and call buttons, domain and hosting for 1 year, live in 7 days. See your homepage design free in 48 hours.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/website-design-agra' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/website-design-agra' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: WEBSITE_OFFER_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

// Cached, tagged reads — the route stays prerendered and refreshes on admin save.
export default async function Page() {
  const [content, settings] = await Promise.all([getPageContent('websiteOffer'), getSiteSettings()]);
  return (
    <main className="min-h-screen bg-brandBg text-brandDark selection:bg-brandYellow selection:text-brandDark scroll-smooth">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar activePage="website-design-agra" />
      <WebsiteOfferPage content={content} videos={settings.videos ?? []} reviews={<GoogleReviewsSection />} />
      <Footer />
    </main>
  );
}
