import type { Metadata } from 'next'
import { getOgImage } from '@/lib/og-utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Risk Warning | Gold Price Live',
  description: 'Important risk warning regarding gold and precious metals investments. Understand volatility, market risks, and limitations before investing.',
  keywords: [
    'risk warning',
    'investment risk',
    'gold investment risk',
    'precious metals risk',
    'market volatility',
    'investment disclaimer',
  ],
  openGraph: {
    title: 'Risk Warning | Gold Price Live',
    description: 'Important risk warning regarding gold and precious metals investments. Understand volatility, market risks, and limitations before investing.',
    type: 'website',
    url: '/risk-warning',
    images: [
      {
        url: getOgImage('/images/og-risk-warning.jpg'),
        width: 1200,
        height: 630,
        alt: 'Gold Price Live - Real-time Gold & Silver Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk Warning | Gold Price Live',
    description: 'Important risk warning regarding gold and precious metals investments. Understand volatility, market risks, and limitations before investing.',
    images: [getOgImage('/images/og-risk-warning.jpg')],
  },
  alternates: {
    canonical: '/risk-warning',
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

export default function RiskWarningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
