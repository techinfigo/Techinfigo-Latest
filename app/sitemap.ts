import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.techinfigo.com'

  const routes = [
    '',
    '/about',
    '/careers',
    '/case-studies',
    '/contact',
    '/digital-marketing-agency-agra',
    '/how-it-works',
    '/lead-capture',
    '/privacy',
    '/profit-breakdown',
    '/qualification',
    '/services',
    '/system',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }))
}
