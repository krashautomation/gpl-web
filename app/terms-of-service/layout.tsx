import type { Metadata } from 'next'

export const metadata: Metadata = {
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
    url: 'https://goldpricelive.co/terms-of-service',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | Gold Price Live',
    description: 'Read our Terms of Service to understand the rules and regulations for using the Gold Price Live website and services.',
  },
  alternates: {
    canonical: 'https://goldpricelive.co/terms-of-service',
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
