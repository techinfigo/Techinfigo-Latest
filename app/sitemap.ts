import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.techinfigo.com',
      lastModified: new Date(),
    },
    {
      url: 'https://www.techinfigo.com/about',
      lastModified: new Date(),
    },
    {
      url: 'https://www.techinfigo.com/services',
      lastModified: new Date(),
    },
    {
      url: 'https://www.techinfigo.com/contact',
      lastModified: new Date(),
    },
  ]
}
