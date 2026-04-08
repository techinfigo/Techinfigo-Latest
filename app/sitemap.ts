import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://techinfigo.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/system',
    '/how-it-works',
    '/case-studies',
    '/profit-breakdown',
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
