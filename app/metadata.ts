import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gold Price Live - Real-Time Gold & Silver Prices',
  description: 'Track live gold and silver prices with real-time charts, performance statistics, and calculators. Get current precious metal prices in all major currencies including USD, EUR, GBP, CAD, and AUD.',
  keywords: ['gold price', 'silver price', 'live gold price', 'gold charts', 'precious metals', 'gold calculator', 'gold spot price'],
  authors: [{ name: 'Gold Price Live' }],
  creator: 'Gold Price Live',
  publisher: 'Gold Price Live',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://goldpricelive.com',
    siteName: 'Gold Price Live',
    title: 'Gold Price Live - Real-Time Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts, performance statistics, and calculators.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Price Live - Real-Time Precious Metals Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Live - Real-Time Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
    images: ['/twitter-image.jpg'],
    creator: '@goldpricelive',
  },
  alternates: {
    canonical: 'https://goldpricelive.com',
    languages: {
      'en-US': 'https://goldpricelive.com',
      'en-GB': 'https://goldpricelive.com/uk',
      'de': 'https://goldpricelive.com/de',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'finance',
}
