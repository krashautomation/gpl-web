import type { Metadata } from 'next'
import { getOgImage } from '@/lib/og-utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Terms of Service | Gold Price Live',
  description: 'Read our Terms of Service to understand the rules and regulations for using the Gold Price Live website and services.',
  keywords: [
    'terms of service',
    'terms and conditions',
    'gold price live terms',
    'user agreement',
    'service terms',
  ],
  openGraph: {
    title: 'Terms of Service | Gold Price Live',
    description: 'Read our Terms of Service to understand the rules and regulations for using the Gold Price Live website and services.',
    type: 'website',
    url: '/terms-of-service',
    images: [
      {
        url: getOgImage('/images/og-terms-of-service.jpg'),
        width: 1200,
        height: 630,
        alt: 'Gold Price Live - Real-time Gold & Silver Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Gold Price Live',
    description: 'Read our Terms of Service to understand the rules and regulations for using the Gold Price Live website and services.',
    images: [getOgImage('/images/og-terms-of-service.jpg')],
  },
  alternates: {
    canonical: '/terms-of-service',
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

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
