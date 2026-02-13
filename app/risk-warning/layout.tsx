import type { Metadata } from 'next'

export const metadata: Metadata = {
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
    url: 'https://goldpricelive.co/risk-warning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk Warning | Gold Price Live',
    description: 'Important risk warning regarding gold and precious metals investments. Understand volatility, market risks, and limitations before investing.',
  },
  alternates: {
    canonical: 'https://goldpricelive.co/risk-warning',
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
