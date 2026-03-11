import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { marked } from 'marked';
import { getArticleBySlug, getAllArticles, type Article } from '@/lib/articles';
import { BannerAd } from '@/components/BannerAd';
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/StructuredData';

export const revalidate = 3600;

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const seoTitle = article.seo_title || article.title;
  const seoDescription = article.seo_description || article.excerpt;
  const seoKeywords = article.seo_keywords || article.tags;

  const ogImage = article.og_image || article.featured_image || '/images/og-gold-price-live.png';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.og_title || seoTitle,
      description: article.og_description || seoDescription,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      tags: article.tags,
      url: `/news/${article.slug}`,
      images:
        article.og_image || article.featured_image
          ? [
              {
                url: ogImage,
                width: 1200,
                height: 630,
                alt: article.title,
              },
            ]
          : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.og_title || seoTitle,
      description: article.og_description || seoDescription,
      images: article.og_image || article.featured_image ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `/news/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a: Article) => a.slug !== slug && a.category === article.category)
    .slice(0, 2);

  return (
    <MainLayout breadcrumbs={[{ label: 'News', href: '/news' }, { label: article.title }]}>
      <ArticleStructuredData
        headline={article.title}
        image={article.featured_image ? [article.featured_image] : []}
        datePublished={article.published_at}
        dateModified={article.updated_at || article.published_at}
        author={[{ name: article.author }]}
        description={article.excerpt}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://goldpricelive.co' },
          { name: 'News', url: 'https://goldpricelive.co/news' },
          { name: article.title, url: `https://goldpricelive.co/news/${article.slug}` },
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-black hover:text-black mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to News
        </Link>

        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            {article.featured_image && (
              <div className="relative w-full h-64 md:h-96 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={article.featured_image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <Badge className="bg-yellow-500 text-black mb-4">{article.category}</Badge>
            <h1 className="page-title font-bold text-black mb-6">{article.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-black">
              <span className="flex items-center gap-2">
                <User size={16} />
                {article.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(article.published_at).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {article.reading_time} min read
              </span>
            </div>
          </header>

          <div
            style={{ '--tw-prose-links': '#2563eb' } as React.CSSProperties}
            className="cms-content prose prose-lg max-w-none mb-12
              prose-headings:text-black 
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-black prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-black prose-ul:mb-4
              prose-li:mb-2
              prose-strong:text-black
              prose-table:border-neutral-700
              prose-th:bg-neutral-800 prose-th:text-white prose-th:p-3
              prose-td:border-neutral-700 prose-td:p-3 prose-td:text-black"
            dangerouslySetInnerHTML={{ __html: marked.parse(article.content) as string }}
          />

          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-12">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="border-black text-black">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </article>

        <BannerAd
          affiliateName="Money Metals Exchange"
          adName="Money Metals Exchange"
          href="https://www.awin1.com/cread.php?s=3928251&v=88985&q=519076&r=2775708"
          src="https://www.awin1.com/cshow.php?s=3928251&v=88985&q=519076&r=2775708"
          className="my-0 py-0"
        />

        {relatedArticles.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-black mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((relatedArticle: Article) => (
                <Link key={relatedArticle.slug} href={`/news/${relatedArticle.slug}`}>
                  <Card className=" border-neutral-800 h-full">
                    <CardContent className="p-6">
                      <Badge
                        variant="secondary"
                        className="bg-neutral-800 text-white mb-3 hover:bg-neutral-800 hover:text-white"
                      >
                        {relatedArticle.category}
                      </Badge>
                      <h3 className="text-black font-semibold mb-2 line-clamp-2 hover:underline">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-black text-sm line-clamp-2">{relatedArticle.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
