import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Palladium Price Today | Live Palladium Spot Price & Charts',
  description: 'Track live palladium prices with real-time charts and historical data. View palladium spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'palladium price',
    'palladium spot price',
    'live palladium price',
    'palladium price today',
    'palladium chart',
    'palladium price per ounce',
    'palladium performance',
    'precious metals',
    'palladium investment'
  ],
  openGraph: {
    title: 'Palladium Price Today | Live Palladium Spot Price & Charts',
    description: 'Track live palladium prices with real-time charts and historical performance data.',
    type: 'website',
    url: 'https://goldpricelive.com/palladium-price',
    images: [
      {
        url: '/og-palladium-price.jpg',
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
    images: ['/og-palladium-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/palladium-price',
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

export default function PalladiumPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
