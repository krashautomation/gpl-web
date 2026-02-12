import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advertise | GoldPriceLive.co',
  description: 'Contact Dave at Gold Price Live (a site for realtime gold prices.) For advertising opportunities and more.',
  keywords: [
    'advertise on gold price live',

  ],
  openGraph: {
    title: 'Advertise on Gold Price Live',
    description: 'Contact Dave at Gold Price Live for advertising inquiries.',
    type: 'website',
    url: 'https://goldpricelive.co/advertise',
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
    title: 'Advertise at Gold Price Live',
    description: 'Contact Dave at Gold Price Live for advertising inquiries.',
    images: ['/og-silver-price.jpg'],
  },
  alternates: {
    canonical: 'https://goldpricelive.com/advertise',
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

export default function AdvertiseGoldPriceLive({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
