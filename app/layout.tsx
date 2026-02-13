import './globals.css';
import 'flag-icons/css/flag-icons.min.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getOgImage } from '@/lib/og-utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold Price Live - Where the World Checks the Gold Price',
  description: 'Track live gold and silver prices with real-time charts, performance statistics, and calculators. Get current precious metal prices in all major currencies.',
  openGraph: {
    title: 'Gold Bug - Live Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
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
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
    images: [getOgImage('/images/og-gold-price-live.jpg')],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground`}>{children}</body>
    </html>
  );
}
