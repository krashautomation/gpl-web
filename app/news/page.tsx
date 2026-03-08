import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';
import { getOgImage } from '@/lib/og-utils';
import { getAllArticles, type Article } from '@/lib/articles';
import { BreadcrumbStructuredData } from '@/components/StructuredData';

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold Price News | Market Analysis & Investment Guides',
  description:
    'Read the latest gold price news, market analysis, investment guides, and expert insights. Stay informed about precious metals markets.',
  keywords: ['gold price news', 'gold market analysis', 'gold investment', 'precious metals news'],
  openGraph: {
    title: 'Gold Price News | Market Analysis & Investment Guides',
    description: 'Latest gold price news, market analysis, and investment guides.',
    type: 'website',
    url: '/news',
    images: [
      {
        url: getOgImage('/images/og-news.jpg'),
        width: 1200,
        height: 630,
        alt: 'Gold Price News - Market Analysis & Investment Guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price News | Market Analysis & Investment Guides',
    description: 'Latest gold price news, market analysis, and investment guides.',
    images: [getOgImage('/images/og-news.jpg')],
  },
  alternates: {
    canonical: '/news',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function getCategories(articles: Article[]) {
  const categories = new Set(articles.map(article => article.category).filter(Boolean));
  return ['All', ...Array.from(categories).sort()];
}

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const categoryParam = params.category as string | undefined;

  const allArticles = await getAllArticles();

  const activeCategory = categoryParam
    ? categoryParam
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'All';

  let articles = allArticles.sort(
    (a: Article, b: Article) =>
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  if (activeCategory !== 'All') {
    articles = articles.filter(article => article.category === activeCategory);
  }

  const categories = getCategories(allArticles);

  return (
    <MainLayout>
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://goldpricelive.co' },
          { name: 'News', url: 'https://goldpricelive.co/news' },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4">Gold Price News</h1>
          <p className="text-black text-lg max-w-2xl mx-auto">
            Stay informed with the latest gold price news, market analysis, investment guides, and
            expert insights.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => {
            const isActive = category === activeCategory;
            const href =
              category === 'All'
                ? '/news'
                : `/news?category=${category.toLowerCase().replace(/ /g, '-')}`;

            return (
              <Link key={category} href={href}>
                <Badge
                  variant={isActive ? 'default' : 'outline'}
                  className={`cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-amber-500 text-black hover:bg-amber-500 hover:text-black'
                      : 'border-black text-black hover:bg-amber-500 hover:text-black'
                  }`}
                >
                  {category}
                </Badge>
              </Link>
            );
          })}
        </div>

        {activeCategory !== 'All' && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold ">{activeCategory}</h2>
            <p className="text-black mt-2">
              Showing {articles.length} article{articles.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map(article => (
            <Link key={article.slug} href={`/news/${article.slug}`}>
              <Card className=" border-neutral-800 h-full transition-colors group">
                {article.featured_image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={article.featured_image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader>
                  <Badge
                    variant="secondary"
                    className="bg-neutral-800 text-white w-fit mb-2 hover:bg-neutral-800 hover:"
                  >
                    {article.category}
                  </Badge>
                  <CardTitle className="text-black group-hover:underline line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black text-sm line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-black">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(article.published_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.reading_time} min read
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300">
              {activeCategory !== 'All'
                ? `No articles found in "${activeCategory}" category.`
                : 'No articles found.'}
            </p>
            {activeCategory !== 'All' && (
              <Link href="/news" className=" hover:underline mt-4 inline-block">
                View all articles
              </Link>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
