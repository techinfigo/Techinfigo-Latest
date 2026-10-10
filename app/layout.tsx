import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE } from "../config/site";
import { getSiteSettings } from "../lib/settings";
import { brandAssetUrl, brandRouteUrl, type SiteSettings } from "../lib/settings-schema";
import { Analytics } from "../components/Analytics";
import { SiteSettingsProvider } from "../components/SiteSettingsProvider";
import { ContactBar } from "../components/ContactBar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

/** What Techinfigo is, for Google and link previews. */
const DESCRIPTION =
  'Founder-led digital marketing agency in Sanjay Place, Agra: websites, Google Business Profile, SEO, social media and Facebook/Google ads, with a free CRM to track every enquiry.';

/**
 * LocalBusiness-family schema for the Agra local pack. `telephone` is omitted
 * entirely while no phone number is set — a blank field is worse than none.
 */
function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#organization`,
    "name": SITE.name,
    "url": SITE.url,
    "email": settings.contact.email,
    "image": `${SITE.url}${SITE.ogImage}`,
    "logo": `${SITE.url}${brandAssetUrl("logo", settings.brand.logo)}`,
    "description": DESCRIPTION,
    "priceRange": "₹₹",
    ...(settings.contact.phone ? { "telephone": settings.contact.phone } : {}),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office no. 03, Second Floor, Block no. 25, Cloth Market, Sanjay Place, Civil Lines",
      "addressLocality": "Agra",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "282002",
      "addressCountry": "IN",
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 27.1994194, "longitude": 78.0081121 },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:30",
      "closes": "18:30",
    },
    "hasMap": "https://www.google.com/maps/search/?api=1&query=TECHINFIGO&query_place_id=ChIJd-bZWwl3dDkRj4H5YdWtwPM",
    "areaServed": [
      { "@type": "City", "name": "Agra" },
      { "@type": "City", "name": "Mathura" },
      { "@type": "City", "name": "Firozabad" },
      { "@type": "Country", "name": "India" },
    ],
    "founder": { "@type": "Person", "name": "Sachin Bauddh" },
    "sameAs": [
      "https://www.facebook.com/techinfigo/",
      "https://www.instagram.com/techinfigo/",
      "https://in.linkedin.com/company/techinfigo",
      "https://www.youtube.com/@techinfigo",
    ],
  };
}

/**
 * Async so the description and the favicon can come from the settings document.
 *
 * getSiteSettings() is a cached read, not a per-request one, so this does not
 * make any page dynamic: the pages are still prerendered, against the cached
 * value, and saving in the admin panel invalidates the tag that makes them
 * regenerate.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  // Always the route, never public/favicon.png directly: browsers cache
  // favicons hard, so it needs one durable address. The route redirects to the
  // bundled file until something is uploaded, and the ?v= content hash means a
  // replacement is a different URL that no cache can answer with the old icon.
  const favicon = brandRouteUrl('favicon', settings.brand.favicon);
  const logo = brandAssetUrl('logo', settings.brand.logo);

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: 'Techinfigo | Digital Marketing Agency in Agra',
      template: '%s | Techinfigo',
    },
    alternates: {
      canonical: '/',
    },
    description: DESCRIPTION,
    openGraph: {
      images: [SITE.ogImage],
      siteName: SITE.name,
      locale: SITE.locale,
      type: 'website',
    },
    icons: {
      icon: [{ url: favicon }],
      shortcut: favicon,
      apple: favicon,
    },
  };
}

export const viewport = {
  themeColor: '#001d21',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const favicon = brandRouteUrl('favicon', settings.brand.favicon);
  const logo = brandAssetUrl('logo', settings.brand.logo);

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
        {/* The header logo is the first thing people see: fetch it straight away. */}
        <link rel="preload" as="image" href={logo} fetchPriority="high" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
        />
        {/* The one place the settings cross into the client bundle — as a
            prop. Nothing under components/ imports lib/settings.ts. */}
        <SiteSettingsProvider value={settings}>
          {children}
          <ContactBar />
        </SiteSettingsProvider>
        <Analytics />
      </body>
    </html>
  );
}
