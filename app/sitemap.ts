import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/articles';
import { getAllPages } from '@/lib/pages';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://goldpricelive.co';

  const mainPages: { url: string; priority: number; lastModified?: Date }[] = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/gold-price`, priority: 0.9 },
    { url: `${baseUrl}/silver-price`, priority: 0.9 },
    { url: `${baseUrl}/platinum-price`, priority: 0.8 },
    { url: `${baseUrl}/palladium-price`, priority: 0.8 },
    { url: `${baseUrl}/copper-price`, priority: 0.8 },
    { url: `${baseUrl}/aluminum-price`, priority: 0.8 },
    { url: `${baseUrl}/oil-price`, priority: 0.8 },
    { url: `${baseUrl}/natural-gas-price`, priority: 0.8 },
    { url: `${baseUrl}/gold-etfs`, priority: 0.7 },
    { url: `${baseUrl}/silver-etfs`, priority: 0.7 },
    { url: `${baseUrl}/gold-price-history`, priority: 0.7 },
    { url: `${baseUrl}/gold-silver-ratio`, priority: 0.7 },
    { url: `${baseUrl}/charts`, priority: 0.8 },
    { url: `${baseUrl}/news`, priority: 0.8 },
    { url: `${baseUrl}/about`, priority: 0.6 },
    { url: `${baseUrl}/contact`, priority: 0.6 },
    { url: `${baseUrl}/advertise`, priority: 0.5 },
    { url: `${baseUrl}/roadmap`, priority: 0.5 },
    { url: `${baseUrl}/gold-price-live-app`, priority: 0.6 },
    { url: `${baseUrl}/bitcoin-price`, priority: 0.7 },
    { url: `${baseUrl}/ethereum-price`, priority: 0.7 },
    { url: `${baseUrl}/terms-of-service`, priority: 0.4 },
    { url: `${baseUrl}/disclaimer`, priority: 0.4 },
    { url: `${baseUrl}/risk-warning`, priority: 0.4 },
    { url: `${baseUrl}/privacy`, priority: 0.4 },
  ];

  const [articles, dbPages] = await Promise.all([getArticles(), getAllPages()]);

  const dbPageMap = new Map(dbPages.map(p => [`${baseUrl}/${p.slug}`, p]));

  const seen = new Set<string>();

  const staticEntries = mainPages.map(page => {
    seen.add(page.url);
    const dbMatch = dbPageMap.get(page.url);
    return {
      url: page.url,
      lastModified: dbMatch ? new Date(dbMatch.updated_at) : new Date('2026-01-01'),
      changeFrequency: 'daily' as const,
      priority: page.priority,
    };
  });

  const dynamicEntries = dbPages
    .filter(p => !seen.has(`${baseUrl}/${p.slug}`))
    .map(p => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));

  const articleEntries = articles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.published_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...dynamicEntries, ...articleEntries];
}
