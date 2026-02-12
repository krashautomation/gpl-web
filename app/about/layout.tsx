import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Gold Price Live | GoldPriceLive.co',
  description: 'About Gold Price Live a site for realtime gold prices.',
  keywords: [
    'about gold price live',

  ],
  openGraph: {
    title: 'About Gold Price Live',
    description: 'About Gold Price Live a site for realtime gold prices.',
    type: 'website',
    url: 'https://goldpricelive.co/about',
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
    title: 'About Gold Price Live',
    description: 'About Gold Price Live a site for realtime gold prices.',
    images: ['/og-silver-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/about',
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

export default function AboutGoldPriceLive({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
