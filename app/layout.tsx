import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gold Price Live - Where the World Checks the Gold Price',
  description: 'Track live gold and silver prices with real-time charts, performance statistics, and calculators. Get current precious metal prices in all major currencies.',
  openGraph: {
    title: 'Gold Bug - Live Gold & Silver Prices',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Live - Gold Price, Silver Price and Precious Metals Prices.',
    description: 'Track live gold and silver prices with real-time charts and performance statistics.',
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
