import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Bitcoin Price Today | Live Bitcoin Spot Price & Charts',
  description: 'Track live Bitcoin prices with real-time charts and historical data. View Bitcoin spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'Bitcoin price',
    'Bitcoin spot price',
    'live Bitcoin price',
    'Bitcoin price today',
    'Bitcoin chart',
    'Bitcoin price per ounce',
    'Bitcoin performance',
    'cryptocurrency',
    'Bitcoin investment'
  ],
  openGraph: {
    title: 'Bitcoin Price Today | Live Bitcoin Spot Price & Charts',
    description: 'Track live Bitcoin prices with real-time charts and historical performance data.',
    type: 'website',
    url: '/bitcoin-price',
    images: [
      {
        url: '/og-bitcoin-price.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Bitcoin Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bitcoin Price Today | Live Bitcoin Spot Price',
    description: 'Track live Bitcoin prices with real-time charts and market analysis.',
    images: ['/og-bitcoin-price.jpg'],
  },
  alternates: {
    canonical: '/bitcoin-price',
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
}

export default function BitcoinPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
