import { MetadataRoute } from 'next';
import { SITE } from '../config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // The admin panel and form/API endpoints have nothing for search engines.
      // /api/brand stays open: the logo and favicon are served from there.
      allow: ['/', '/api/brand/'],
      disallow: ['/admin', '/api/'],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
