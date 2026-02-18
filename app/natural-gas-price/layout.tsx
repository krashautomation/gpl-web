import type { Metadata } from 'next';
import { getOgImage } from '@/lib/og-utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Natural Gas Price Today | Live Natural Gas Spot Price & Charts',
  description:
    'Track live natural gas prices with real-time charts and historical data. View natural gas spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'natural gas price',
    'natural gas spot price',
    'live natural gas price',
    'natural gas price today',
    'natural gas chart',
    'natural gas price per mmbtu',
    'natural gas performance',
    'energy market',
    'natural gas investment',
  ],
  openGraph: {
    title: 'Natural Gas Price Today | Live Natural Gas Spot Price & Charts',
    description:
      'Track live natural gas prices with real-time charts and historical performance data.',
    type: 'website',
    url: '/natural-gas-price',
    images: [
      {
        url: getOgImage('/images/og-natural-gas.jpg'),
        width: 1200,
        height: 630,
        alt: 'Live Natural Gas Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Natural Gas Price Today | Live Natural Gas Spot Price',
    description: 'Track live natural gas prices with real-time charts and market analysis.',
    images: [getOgImage('/images/og-natural-gas.jpg')],
  },
  alternates: {
    canonical: '/natural-gas-price',
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
