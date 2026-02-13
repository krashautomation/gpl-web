import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
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
    title: 'Gold Price Live 24/7 App',
    description: 'Track live gold prices on your mobile phone.',
    type: 'website',
    url: '/gold-price-live-app',
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
    canonical: '/gold-price-live-app',
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
