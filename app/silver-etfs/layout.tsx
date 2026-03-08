import type { Metadata } from 'next';
import { getOgImage } from '@/lib/og-utils';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Silver ETFs | Top Silver Exchange Traded Funds',
  description:
    'Explore popular Silver ETFs including iShares Silver Trust (SLV), abrdn Physical Silver Shares (SIVR), and more. Track SLV price charts and compare silver ETF options.',
  keywords: [
    'silver etf',
    'silver etfs',
    'iShares Silver Trust',
    'SLV',
    'abrdn Physical Silver Shares',
    'SIVR',
    'Global X Silver Miners',
    'SIL',
    'Amplify Junior Silver Miners',
    'SILJ',
    'silver exchange traded funds',
    'silver investment',
    'silver etf list',
    'best silver etfs',
  ],
  openGraph: {
    title: 'Silver ETFs | Top Silver Exchange Traded Funds',
    description:
      'Explore popular Silver ETFs including iShares Silver Trust (SLV), abrdn Physical Silver Shares (SIVR), and more.',
    type: 'website',
    url: '/silver-etfs',
    images: [
      {
        url: getOgImage('/images/og-silver-etfs.jpg'),
        width: 1200,
        height: 630,
        alt: 'Silver ETFs Chart and List',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver ETFs | Top Silver Exchange Traded Funds',
    description:
      'Explore popular Silver ETFs including iShares Silver Trust (SLV), abrdn Physical Silver Shares (SIVR), and more.',
    images: [getOgImage('/images/og-silver-etfs.jpg')],
  },
  alternates: {
    canonical: '/silver-etfs',
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

export default function SilverETFsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
