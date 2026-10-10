/**
 * The six services, in plain language. One source for the /services list
 * defaults, every /services/<slug> page and its metadata.
 *
 * Prices are NOT written here: each service points at plans in the package
 * table (components/PricingTabs.tsx), so a price is changed in one place.
 * No invented results: only what the packages actually include.
 */

export type ServiceSlug = 'website' | 'google-business-profile' | 'social-media' | 'ads' | 'seo' | 'd2c';

export type Service = {
  slug: ServiceSlug;
  /** Card and page title. */
  title: string;
  /** One line for the card and the page intro. */
  short: string;
  /** Two or three sentences for the page. */
  intro: string;
  /** Who it suits, in their own words. */
  forWho: string[];
  /** What we actually do. */
  includes: string[];
  /** Which package tab and plans to show (names as in PricingTabs). */
  pricing: { tab: string; plans?: string[] };
  /** An extra pricing note, e.g. where else the service is included. */
  pricingNote?: string;
  /** SEO title/description. */
  metaTitle: string;
  metaDescription: string;
  /** Pre-filled WhatsApp message. */
  whatsapp: string;
};

export const SERVICES: Service[] = [
  {
    slug: 'website',
    title: 'Websites That Bring Enquiries',
    short: 'A fast, mobile-friendly website with WhatsApp and call buttons, connected to your free CRM.',
    intro:
      'Most small business websites look fine but bring no calls. We build (or fix) yours so visitors can reach you in one tap, and every enquiry is saved in your free CRM.',
    forWho: [
      'You need your first website',
      'Your website gets visits but no calls',
      'You want a landing page for ads',
    ],
    includes: [
      'Mobile-friendly pages that load fast',
      'WhatsApp and call buttons on every page',
      'Enquiry forms connected to your free CRM',
      'Google Business Profile setup',
      'Meta Pixel and Google Analytics tracking',
    ],
    pricing: { tab: 'website' },
    // "Website design in Agra" is targeted by /website-design-agra; this page
    // targets packages and pricing so the two do not compete in Google.
    metaTitle: 'Website Development Packages & Pricing | Techinfigo',
    metaDescription:
      'Website packages from ₹4,999 to ₹49,999: new sites, redesigns and ads landing pages with WhatsApp and call buttons and a free CRM for every enquiry.',
    whatsapp: 'Hi Techinfigo, I would like to know about a website for my business.',
  },
  {
    slug: 'google-business-profile',
    title: 'Google Business Profile & Maps',
    short: 'Show up on Google Maps and Search when people in Agra look for what you sell.',
    intro:
      'When someone searches "near me", your Google profile is often the first thing they see. We complete it, keep it active every week and help you collect genuine reviews.',
    forWho: [
      'Shops, clinics, showrooms and restaurants',
      'Competitors show up on Maps and you don’t',
      'You have few reviews or an incomplete profile',
    ],
    includes: [
      'Complete profile: categories, services, photos and hours',
      'Weekly Google posts',
      'A simple system to ask customers for reviews',
      'JustDial, IndiaMART and Sulekha listings',
      'Monthly Search Console report',
    ],
    pricing: { tab: 'seo', plans: ['Local SEO'] },
    pricingNote: 'Basic profile setup is also included in the Starter website, and full optimisation in the Business website.',
    metaTitle: 'Google Business Profile Optimisation in Agra | Rank on Maps',
    metaDescription:
      'Get found on Google Maps in Agra: complete profile, weekly posts, review system and local listings. From ₹7,999 a month.',
    whatsapp: 'Hi Techinfigo, I would like help with my Google Business Profile.',
  },
  {
    slug: 'social-media',
    title: 'Social Media Management',
    short: 'Regular posts and reels on Instagram and Facebook, so your business looks active and trusted.',
    intro:
      'Customers check your Instagram before they call. We plan, design and post for you every month, so your pages look alive and match your business.',
    forWho: [
      'Your pages haven’t been updated in months',
      'You have no time to post regularly',
      'You want reels but don’t know where to start',
    ],
    includes: [
      'Instagram and Facebook management',
      'Designs and reels made for your business',
      'Profile optimisation',
      'Google Business posts',
      'Monthly report',
    ],
    pricing: { tab: 'social', plans: ['Presence', 'Growth'] },
    metaTitle: 'Social Media Management in Agra | Instagram & Facebook',
    metaDescription:
      'Instagram and Facebook management with designs, reels and a monthly report. From ₹7,999 a month.',
    whatsapp: 'Hi Techinfigo, I would like to know about social media management.',
  },
  {
    slug: 'ads',
    title: 'Facebook, Instagram & Google Ads',
    short: 'Ads that bring enquiries on WhatsApp and calls, with every lead tracked in your CRM.',
    intro:
      'Boosting posts gets likes. We run lead ads, click-to-WhatsApp ads and Google search ads aimed at enquiries, and show you what each enquiry cost.',
    forWho: [
      'You boost posts but get no customers',
      'You want enquiries this month, not someday',
      'Customers already search for your service on Google',
    ],
    includes: [
      'Lead ads or click-to-WhatsApp ads on Facebook and Instagram',
      'Google search ads with keywords for Agra customers',
      'Lead form or landing page',
      'Call and form tracking, every lead in your CRM',
      'Weekly WhatsApp update and monthly report',
    ],
    pricing: { tab: 'social', plans: ['Leads', 'Google Ads', 'Growth'] },
    pricingNote: 'Ad budget is paid directly to Meta or Google, separately from our fee.',
    metaTitle: 'Facebook, Instagram & Google Ads in Agra | Real Enquiries',
    metaDescription:
      'Lead ads, click-to-WhatsApp ads and Google search ads with every enquiry tracked in a free CRM. From ₹14,999 a month.',
    whatsapp: 'Hi Techinfigo, I would like to run ads for my business.',
  },
  {
    slug: 'seo',
    title: 'SEO: Rank Higher on Google',
    short: 'More people find your website on Google, month after month, without paying for every click.',
    intro:
      'SEO is slow but it compounds. We fix the technical basics, add useful pages and content, and build genuine local links, and we never promise rankings we can’t control.',
    forWho: [
      'You want enquiries without paying per click',
      'Your website doesn’t show up for your services',
      'You run an online store that needs product pages found',
    ],
    includes: [
      'Google Business Profile and local listings',
      'New service pages and helpful content',
      'Technical fixes and schema',
      'Genuine local backlinks',
      'Monthly Search Console report',
    ],
    pricing: { tab: 'seo' },
    pricingNote: 'SEO takes time, so we never guarantee rankings.',
    metaTitle: 'SEO Services in Agra | Local & Ecommerce SEO',
    metaDescription:
      'Local SEO, SEO growth and ecommerce SEO with honest monthly reports and no ranking guarantees. From ₹7,999 a month.',
    whatsapp: 'Hi Techinfigo, I would like to know about SEO for my website.',
  },
  {
    slug: 'd2c',
    title: 'Growth for Online Brands (D2C)',
    short: 'For brands selling online: Meta ads, better product pages and repeat sales, tracked against profit.',
    intro:
      'Selling online is easy to start and hard to make profitable. We run your Meta sales campaigns, keep creatives fresh and fix the store and repeat-purchase leaks before spending more.',
    forWho: [
      'You sell on your own website or Shopify',
      'Ad spend is growing but profit isn’t',
      'Customers buy once and never come back',
    ],
    includes: [
      'Pixel and Conversions API setup',
      'Meta sales campaigns, managed weekly',
      'New ad creatives every month',
      'Product page and checkout improvements',
      'WhatsApp repeat-purchase flows',
    ],
    pricing: { tab: 'd2c' },
    pricingNote: 'Ad budget is paid directly to Meta, separately from our fee.',
    metaTitle: 'D2C Brand Growth | Meta Ads, Store Fixes & Repeat Sales',
    metaDescription:
      'Meta sales campaigns, fresh creatives, product page fixes and repeat-purchase flows for online brands, tracked against profit. From ₹24,999 a month.',
    whatsapp: 'Hi Techinfigo, I run an online brand and would like to grow sales.',
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

/** Old service URLs and where they now live (see next.config.ts redirects). */
export const OLD_SERVICE_REDIRECTS: Record<string, ServiceSlug> = {
  'performance-ads': 'ads',
  cro: 'website',
  retention: 'd2c',
  automation: 'd2c',
  creative: 'social-media',
  influencer: 'social-media',
};
