import { MetadataRoute } from 'next'

// This function automatically generates the /robots.txt file for your site.
// It tells search engine crawlers (like Googlebot) which pages they are allowed to index.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Apply these rules to all search engine bots
      allow: '/',     // Allow crawling of all pages on the site
    },
    // Point crawlers directly to your sitemap so they can index your pages faster
    sitemap: 'https://adityawaradkar.dev/sitemap.xml',
  }
}