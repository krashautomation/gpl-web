import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold Silver Ratio | Historical Chart & Performance Comparison',
  description: 'Track the Gold-Silver Ratio with historical charts and performance comparison. Compare gold and silver returns over 1, 2, 5, and 20 year periods.',
  keywords: [
    'gold silver ratio',
    'gold to silver ratio',
    'gold silver chart',
    'gold silver comparison',
    'gold vs silver',
    'precious metals ratio',
    'gold silver performance',
    'gold silver historical data'
  ],
  openGraph: {
    title: 'Gold Silver Ratio | Historical Chart & Performance Comparison',
    description: 'Track the Gold-Silver Ratio with historical charts and performance comparison.',
    type: 'website',
    url: '/gold-silver-ratio',
    images: [
      {
        url: '/og-gold-silver-ratio.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Silver Ratio Chart',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Silver Ratio | Historical Chart & Performance',
    description: 'Track the Gold-Silver Ratio with historical charts and performance comparison.',
    images: ['/og-gold-silver-ratio.jpg'],
  },
  alternates: {
    canonical: '/gold-silver-ratio',
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

export default function GoldSilverRatioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
