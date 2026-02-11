import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Silver Price Today | Live Silver Spot Price & Charts',
  description: 'Track live silver prices with real-time charts and historical data. View silver spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'silver price',
    'silver spot price',
    'live silver price',
    'silver price today',
    'silver chart',
    'silver price per ounce',
    'silver performance',
    'precious metals',
    'silver investment'
  ],
  openGraph: {
    title: 'Silver Price Today | Live Silver Spot Price & Charts',
    description: 'Track live silver prices with real-time charts and historical performance data.',
    type: 'website',
    url: 'https://goldpricelive.com/silver-price',
    images: [
      {
        url: '/og-silver-price.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Silver Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Silver Price Today | Live Silver Spot Price',
    description: 'Track live silver prices with real-time charts and market analysis.',
    images: ['/og-silver-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/silver-price',
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

export default function SilverPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
