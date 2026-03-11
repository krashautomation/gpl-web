import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/pages';
import { DynamicPageClient } from '@/app/[slug]/DynamicPageClient';

interface Props {
  params: Promise<{ symbol: string }>;
}

const STOCK_CATEGORIES: Record<string, { name: string; href: string }> = {
  // Gold Mining Stocks (US + Canada)
  NEM: { name: 'Gold Stocks', href: '/gold-stocks' },
  GOLD: { name: 'Gold Stocks', href: '/gold-stocks' },
  KGC: { name: 'Gold Stocks', href: '/gold-stocks' },
  AEM: { name: 'Gold Stocks', href: '/gold-stocks' },
  AU: { name: 'Gold Stocks', href: '/gold-stocks' },
  WPM: { name: 'Gold Stocks', href: '/gold-stocks' },
  KLR: { name: 'Gold Stocks', href: '/gold-stocks' },
  EGO: { name: 'Gold Stocks', href: '/gold-stocks' },
  MUX: { name: 'Gold Stocks', href: '/gold-stocks' },
  HL: { name: 'Gold Stocks', href: '/gold-stocks' },
  GFI: { name: 'Gold Stocks', href: '/gold-stocks' },
  // Canadian variants
  'NEM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'GOLD.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'KGC.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'AEM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'AU.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'WPM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'K.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'ABX.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'FNV.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  // Silver Mining Stocks (US + Canada)
  PAAS: { name: 'Silver Stocks', href: '/silver-stocks' },
  AG: { name: 'Silver Stocks', href: '/silver-stocks' },
  FN: { name: 'Silver Stocks', href: '/silver-stocks' },
  CDE: { name: 'Silver Stocks', href: '/silver-stocks' },
  EXK: { name: 'Silver Stocks', href: '/silver-stocks' },
  AUU: { name: 'Silver Stocks', href: '/silver-stocks' },
  SVM: { name: 'Silver Stocks', href: '/silver-stocks' },
  SAND: { name: 'Silver Stocks', href: '/silver-stocks' },
  MAG: { name: 'Silver Stocks', href: '/silver-stocks' },
  BVN: { name: 'Silver Stocks', href: '/silver-stocks' },
  // Canadian variants
  'PAAS.TO': { name: 'Silver Stocks', href: '/silver-stocks' },
  'OR.TO': { name: 'Silver Stocks', href: '/silver-stocks' },
  // Oil & Energy Stocks (US)
  XOM: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  CVX: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  COP: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  EOG: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  SLB: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  MPC: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  VLO: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  PSX: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  OXY: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  HAL: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  WMB: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  KMI: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  BKR: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  DVN: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  PXD: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const slug = `stock/${symbol}`;
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

export default async function StockPage({ params }: Props) {
  const { symbol } = await params;
  const slug = `stock/${symbol}`;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const category = STOCK_CATEGORIES[symbol];
  const breadcrumbs = category
    ? [{ label: category.name, href: category.href }, { label: page.title }]
    : [{ label: 'Gold Stocks', href: '/gold-stocks' }, { label: page.title }];

  return <DynamicPageClient page={page} breadcrumbs={breadcrumbs} />;
}
