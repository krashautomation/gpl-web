import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Disclaimer | Gold Price Live',
  description: 'Read our Disclaimer for information about data accuracy, third-party sources, liability limitations, and the informational nature of our gold price data.',
  keywords: [
    'disclaimer',
    'gold price disclaimer',
    'data accuracy',
    'liability disclaimer',
    'informational purposes',
    'third party data',
  ],
  openGraph: {
    title: 'Disclaimer | Gold Price Live',
    description: 'Read our Disclaimer for information about data accuracy, third-party sources, liability limitations, and the informational nature of our gold price data.',
    type: 'website',
    url: '/disclaimer',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Disclaimer | Gold Price Live',
    description: 'Read our Disclaimer for information about data accuracy, third-party sources, liability limitations, and the informational nature of our gold price data.',
  },
  alternates: {
    canonical: '/disclaimer',
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

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
