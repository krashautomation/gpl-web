import type { Metadata } from 'next';
import { getOgImage } from '@/lib/og-utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Palladium Price Today | Live Palladium Spot Price & Charts',
  description:
    'Track live palladium prices with real-time charts and historical data. View palladium spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'palladium price',
    'palladium spot price',
    'live palladium price',
    'palladium price today',
    'palladium chart',
    'palladium price per ounce',
    'palladium performance',
    'precious metals',
    'palladium investment',
  ],
  openGraph: {
    title: 'Palladium Price Today | Live Palladium Spot Price & Charts',
    description:
      'Track live palladium prices with real-time charts and historical performance data.',
    type: 'website',
    url: '/palladium-price',
    images: [
      {
        url: getOgImage('/images/og-palladium-price.jpg'),
        width: 1200,
        height: 630,
        alt: 'Live Palladium Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palladium Price Today | Live Palladium Spot Price',
    description: 'Track live palladium prices with real-time charts and market analysis.',
    images: [getOgImage('/images/og-palladium-price.jpg')],
  },
  alternates: {
    canonical: '/palladium-price',
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

export default function PalladiumPriceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
