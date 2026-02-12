import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact | GoldPriceLive.co',
  description: 'Contact Dave at Gold Price Live (a site for realtime gold prices.) For business inquiries, advertising and more.',
  keywords: [
    'about gold price live',

  ],
  openGraph: {
    title: 'Contact Dave at Gold Price Live',
    description: 'Contact Dave at Gold Price Live for business and advertising inquiries.',
    type: 'website',
    url: 'https://goldpricelive.co/contact',
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
    title: 'Contact Dave at Gold Price Live',
    description: 'Contact Dave at Gold Price Live for business and advertising inquiries.',
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

export default function ContactGoldPriceLive({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
