import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aluminum Price Today | Live Aluminum Spot Price & Charts',
  description: 'Track live aluminum prices with real-time charts and historical data. View aluminum spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'aluminum price',
    'aluminum spot price',
    'live aluminum price',
    'aluminum price today',
    'aluminum chart',
    'aluminum price per ounce',
    'aluminum performance',
    'base metals',
    'aluminum investment'
  ],
  openGraph: {
    title: 'Aluminum Price Today | Live Aluminum Spot Price & Charts',
    description: 'Track live aluminum prices with real-time charts and historical performance data.',
    type: 'website',
    url: 'https://goldpricelive.com/aluminum-price',
    images: [
      {
        url: '/og-aluminum-price.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Aluminum Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aluminum Price Today | Live Aluminum Spot Price',
    description: 'Track live aluminum prices with real-time charts and market analysis.',
    images: ['/og-aluminum-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/aluminum-price',
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

export default function AluminumPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
