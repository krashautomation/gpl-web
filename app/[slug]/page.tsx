import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/pages';
import { DynamicPageClient } from './DynamicPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.description || undefined,
    keywords: page.meta_keywords || undefined,
    robots: page.robots,
    openGraph: page.og_image
      ? {
          title: page.meta_title || page.title,
          description: page.meta_description || page.description || undefined,
          images: [{ url: page.og_image }],
        }
      : undefined,
    twitter: page.twitter_card
      ? {
          card: page.twitter_card as 'summary' | 'summary_large_image' | 'player' | 'app',
          title: page.meta_title || page.title,
          description: page.meta_description || page.description || undefined,
          images: page.og_image ? [page.og_image] : undefined,
        }
      : undefined,
  };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return <DynamicPageClient page={page} />;
}
