import type { Metadata } from 'next'
import { getOgImage } from '@/lib/og-utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Privacy Policy | GoldPriceLive.co',
  description: 'Read our Privacy Policy to learn how Gold Price Live collects, uses, and protects your information.',
  keywords: [
    'privacy policy',
    'gold price live privacy',
    'data protection',
    'privacy',
  ],
  openGraph: {
    title: 'Privacy Policy | Gold Price Live',
    description: 'Learn how we collect, use, and protect your information at Gold Price Live.',
    type: 'website',
    url: '/privacy',
    images: [
      {
        url: getOgImage('/images/og-privacy.jpg'),
        width: 1200,
        height: 630,
        alt: 'Live Silver Price Chart and Spot Price',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Gold Price Live',
    description: 'Learn how we collect, use, and protect your information at Gold Price Live.',
    images: [getOgImage('/images/og-privacy.jpg')],
  },
  alternates: {
    canonical: '/privacy',
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

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
