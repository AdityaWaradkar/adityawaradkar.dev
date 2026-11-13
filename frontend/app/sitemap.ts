import { MetadataRoute } from 'next'

// This function dynamically generates the /sitemap.xml file for your site.
// Search engines use this file to discover and index all your pages.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://adityawaradkar.dev'
  
  // Define all the routes on your site
  const routes = [
    '', // Homepage (root)
    '/about',
    '/work/experience',
    '/work/projects',
    '/art',
    '/music',
    '/books',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0], // Returns YYYY-MM-DD format
    changeFrequency: 'monthly' as const, // Tells bots how often the page typically changes
    priority: route === '' ? 1 : 0.8, // Homepage gets max priority (1.0), others get 0.8
  }))

  return routes
}