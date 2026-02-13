// app/advertise/layout.tsx  (or page.tsx if this is the page file)

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Base URL – resolves relative paths like /og-...png to full https:// URLs
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'
  ),

  // Page title (inherits from root if you have title.template there)
  title: 'Advertise on Gold Price Live',

  description:
    'Reach thousands of daily visitors interested in real-time gold & silver prices. Contact Dave at Gold Price Live for advertising opportunities, sponsorships, and partnerships.',

  keywords: [
    'advertise on gold price live',
    'gold price advertising',
    'sponsor gold price site',
    'financial website ads',
    'gold market sponsorship',
    'precious metals advertising',
  ],

  // Open Graph (Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    title: 'Advertise on Gold Price Live',
    description:
      'Contact Dave for advertising and sponsorship opportunities on a leading real-time gold & silver price tracking site.',
    type: 'website',
    url: '/advertise', // relative OK – metadataBase makes it absolute
    siteName: 'Gold Price Live',
    locale: 'en_US',
    images: [
      {
        url: '/og-gold-price-live-advertise.png', // relative – resolved automatically
        width: 1200,
        height: 630,
        alt: 'Advertise on Gold Price Live – Reach gold & silver market enthusiasts',
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: 'summary_large_image',
    title: 'Advertise on Gold Price Live',
    description:
      'Contact Dave for advertising opportunities on real-time gold & silver prices.',
    images: ['/og-gold-price-live-advertise.png'], // relative OK
    // Optional: your X handle
    // site: '@starter_vibes',
    // creator: '@starter_vibes',
  },

  // Canonical URL (prevents duplicate content issues)
  alternates: {
    canonical: '/advertise', // relative OK – becomes full URL via metadataBase
  },

  // Robots & crawling instructions
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
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}