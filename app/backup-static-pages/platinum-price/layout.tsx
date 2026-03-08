import type { Metadata } from 'next';
import { getOgImage } from '@/lib/og-utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Platinum Price Today | Live platinum Spot Price & Charts',
  description:
    'Track live platinum prices with real-time charts and historical data. View platinum spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'platinum price',
    'platinum spot price',
    'live platinum price',
    'platinum price today',
    'platinum chart',
    'platinum price per ounce',
    'platinum performance',
    'precious metals',
    'platinum investment',
  ],
  openGraph: {
    title: 'Silver Price Today | Live Silver Spot Price & Charts',
    description: 'Track live silver prices with real-time charts and historical performance data.',
    type: 'website',
    url: '/platinum-price',
    images: [
      {
        url: getOgImage('/images/og-platinum-price.jpg'),
        width: 1200,
        height: 630,
        alt: 'Live Silver Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'platinum Price Today | Live platinum Spot Price',
    description: 'Track live platinum prices with real-time charts and market analysis.',
    images: [getOgImage('/images/og-platinum-price.jpg')],
  },
  alternates: {
    canonical: '/platinum-price',
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

export default function PlatinumPriceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
