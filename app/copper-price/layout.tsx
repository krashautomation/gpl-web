import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Copper Price Today | Live Copper Spot Price & Charts',
  description: 'Track live copper prices with real-time charts and historical data. View copper spot price, performance metrics, and market analysis. Updated every 5 minutes.',
  keywords: [
    'copper price',
    'copper spot price',
    'live copper price',
    'copper price today',
    'copper chart',
    'copper price per ounce',
    'copper performance',
    'base metals',
    'copper investment'
  ],
  openGraph: {
    title: 'Copper Price Today | Live Copper Spot Price & Charts',
    description: 'Track live copper prices with real-time charts and historical performance data.',
    type: 'website',
    url: 'https://goldpricelive.com/copper-price',
    images: [
      {
        url: '/og-copper-price.jpg',
        width: 1200,
        height: 630,
        alt: 'Live Copper Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copper Price Today | Live Copper Spot Price',
    description: 'Track live copper prices with real-time charts and market analysis.',
    images: ['/og-copper-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/copper-price',
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

export default function CopperPriceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
