import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold ETFs | Top Gold Exchange Traded Funds',
  description: 'Explore popular Gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and more. Track GLD price charts and compare gold ETF options.',
  keywords: [
    'gold etf',
    'gold etfs',
    'SPDR Gold Shares',
    'GLD',
    'iShares Gold Trust',
    'IAU',
    'gold exchange traded funds',
    'gold investment',
    'gold etf list',
    'best gold etfs'
  ],
  openGraph: {
    title: 'Gold ETFs | Top Gold Exchange Traded Funds',
    description: 'Explore popular Gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and more.',
    type: 'website',
    url: '/gold-etfs',
    images: [
      {
        url: '/og-gold-etfs.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold ETFs Chart and List',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold ETFs | Top Gold Exchange Traded Funds',
    description: 'Explore popular Gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and more.',
    images: ['/og-gold-etfs.jpg'],
  },
  alternates: {
    canonical: '/gold-etfs',
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

export default function GoldETFsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
