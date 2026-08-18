import { MetadataRoute } from 'next';
import { SITE } from '../config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
