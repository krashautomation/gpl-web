import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ethereum Price Today | Live Ethereum Spot Price & Charts',
  description: 'Track live Ethereum prices with real-time charts and historical data. View Ethereum spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'Ethereum price',
    'Ethereum spot price',
    'live Ethereum price',
    'Ethereum price today',
    'Ethereum chart',
    'Ethereum price per ounce',
    'Ethereum performance',
    'cryptocurrency',
    'Ethereum investment'
  ],
  openGraph: {
    title: 'Ethereum Price Today | Live Ethereum Spot Price & Charts',
    description: 'Track live Ethereum prices with real-time charts and historical performance data.',
    type: 'website',
    url: 'https://goldpricelive.com/ethereum-price',
    images: [
      {
        url: '/og-ethereum-price.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Ethereum Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethereum Price Today | Live Ethereum Spot Price',
    description: 'Track live Ethereum prices with real-time charts and market analysis.',
    images: ['/og-ethereum-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/ethereum-price',
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

export default function EthereumPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
