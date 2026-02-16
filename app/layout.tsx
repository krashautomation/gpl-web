import './globals.css';
import 'flag-icons/css/flag-icons.min.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { getOgImage } from '@/lib/og-utils';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold Price Live - Where the World Checks the Gold Price',
  description:
    'Track live gold and silver prices with real-time charts, performance statistics, and calculators. Get current precious metal prices in all major currencies.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  openGraph: {
    title: 'Gold Price Live - Live Gold & Silver Prices',
    description:
      'Track live gold and silver prices with real-time charts and performance statistics.',
    images: [
      {
        url: getOgImage('/images/og-gold-price-live.jpg'),
        width: 1200,
        height: 630,
        alt: 'Gold Price Live - Real-time Gold & Silver Prices',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Live - Gold Price, Silver Price and Precious Metals Prices.',
    description:
      'Track live gold and silver prices with real-time charts and performance statistics.',
    images: [getOgImage('/images/og-gold-price-live.jpg')],
  },
  other: {
    'google-site-verification': 'H4GmbzGjib2O-9zx7ETrZkSxyVsXdd0ja4mQWeSSNpk',
    'google-adsense-account': 'ca-pub-5013867288772497',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://substackcdn.com" />
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        {children}
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId="G-8V1L5GB59Y" />}
      </body>
    </html>
  );
}
