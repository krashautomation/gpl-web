import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gold Bug - Where the World Checks the Gold Price',
  description: 'Track live gold and silver prices with real-time charts, performance statistics, and calculators. Get current precious metal prices in all major currencies.',
  openGraph: {
    title: 'Gold Bug - Live Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Bug - Live Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
