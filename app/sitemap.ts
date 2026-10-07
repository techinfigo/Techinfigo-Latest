import { MetadataRoute } from 'next';
import { SITE } from '../config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  
  const routes = [
    '',
    '/about',
    '/services',
    '/how-it-works',
    '/case-studies',
    '/qualification',
    '/contact',
    '/digital-marketing-agency-agra',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));
}
