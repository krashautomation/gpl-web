import type { Metadata } from 'next';
import { getOgImage } from '@/lib/og-utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Crude Oil Price Today | Live Crude Oil Spot Price & Charts',
  description:
    'Track live crude oil prices with real-time charts and historical data. View crude oil spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'crude oil price',
    'crude oil spot price',
    'live crude oil price',
    'crude oil price today',
    'crude oil chart',
    'crude oil price per barrel',
    'crude oil performance',
    'oil market',
    'oil investment',
  ],
  openGraph: {
    title: 'Crude Oil Price Today | Live Crude Oil Spot Price & Charts',
    description:
      'Track live crude oil prices with real-time charts and historical performance data.',
    type: 'website',
    url: '/oil-price',
    images: [
      {
        url: getOgImage('/images/og-crude-oil.jpg'),
        width: 1200,
        height: 630,
        alt: 'Live Crude Oil Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crude Oil Price Today | Live Crude Oil Spot Price',
    description: 'Track live crude oil prices with real-time charts and market analysis.',
    images: [getOgImage('/images/og-crude-oil.jpg')],
  },
  alternates: {
    canonical: '/oil-price',
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

export default function SilverPriceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
