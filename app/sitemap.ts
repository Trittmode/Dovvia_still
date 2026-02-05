import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.dovvia.com'

  const routes = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/faq',
    '/partners',
    '/products',
    '/quality',
    '/scholarships',
    '/sdg-impact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
