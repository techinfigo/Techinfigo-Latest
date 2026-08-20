import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SITE } from "../config/site";
import { getSiteSettings } from "../lib/settings";
import { brandRouteUrl, type SiteSettings } from "../lib/settings-schema";
import { Analytics } from "../components/Analytics";
import { SiteSettingsProvider } from "../components/SiteSettingsProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

function describe(settings: SiteSettings): string {
  return `We build compounding growth systems for D2C brands doing ${settings.icpBand}/mo who value profit over vanity.`;
}

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
    "description": describe(settings),
    "priceRange": "$$",
    ...(settings.contact.phone ? { "telephone": settings.contact.phone } : {}),
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Office no. 03, Second Floor, Block no. 25, Sanjay Place, Civil Lines",
      "addressLocality": "Agra",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "282002",
      "addressCountry": "IN",
    },
    "areaServed": {
      "@type": "Country",
      "name": "India",
    },
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

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: 'Techinfigo | Profit-First D2C Growth Agency',
      template: '%s | Techinfigo',
    },
    alternates: {
      canonical: '/',
    },
    description: describe(settings),
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

  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href={favicon} />
        <link rel="shortcut icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
        />
        {/* The one place the settings cross into the client bundle — as a
            prop. Nothing under components/ imports lib/settings.ts. */}
        <SiteSettingsProvider value={settings}>{children}</SiteSettingsProvider>
        <Analytics />
      </body>
    </html>
  );
}
