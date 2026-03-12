import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/favicon.ico'],
    },
    sitemap: 'https://goldpricelive.co/sitemap.xml',
    host: 'https://goldpricelive.co',
  };
}
