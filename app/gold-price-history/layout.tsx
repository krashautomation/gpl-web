import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gold Price History | 100 Year Historical Chart & Performance',
  description: 'Explore gold price history with our 100 year historical chart. View gold price performance over 30 days, 6 months, 1 year, 5 years, and 20 years. Track historical gold prices.',
  keywords: [
    'gold price history',
    'historical gold prices',
    'gold price chart',
    'gold price 100 years',
    'gold performance',
    'gold price historical data',
    'gold price trends',
    'gold investment history',
    'gold price over time'
  ],
  openGraph: {
    title: 'Gold Price History | 100 Year Historical Chart & Performance',
    description: 'Explore gold price history with our 100 year historical chart and performance metrics.',
    type: 'website',
    url: 'https://goldpricelive.com/gold-price-history',
    images: [
      {
        url: '/og-gold-price-history.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Price History - 100 Year Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price History | 100 Year Historical Chart',
    description: 'Explore gold price history with our 100 year historical chart and performance metrics.',
    images: ['/og-gold-price-history.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/gold-price-history',
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

export default function GoldPriceHistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
