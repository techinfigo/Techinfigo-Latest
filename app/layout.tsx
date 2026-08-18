import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site, SITE } from "../config/site";
import { Analytics } from "../components/Analytics";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const description = `We build compounding growth systems for D2C brands doing ${site.icpBand}/mo who value profit over vanity.`;

/**
 * LocalBusiness-family schema for the Agra local pack. `telephone` is omitted
 * entirely while site.phone is empty — a blank field is worse than none.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE.url}/#organization`,
  "name": SITE.name,
  "url": SITE.url,
  "email": "contact@techinfigo.com",
  "image": `${SITE.url}${SITE.ogImage}`,
  "description": description,
  "priceRange": "$$",
  ...(site.phone ? { "telephone": site.phone } : {}),
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'Techinfigo | Profit-First D2C Growth Agency',
    template: '%s | Techinfigo',
  },
  alternates: {
    canonical: '/',
  },
  description,
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export const viewport = {
  themeColor: '#001d21',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
