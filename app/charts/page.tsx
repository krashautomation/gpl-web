import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { TrendingUp, LineChart, BarChart3, Clock } from 'lucide-react'
import { getOgImage } from '@/lib/og-utils'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://goldpricelive.co'),
  title: 'Gold Price Charts | Live Charts & Historical Data',
  description: 'View interactive gold price charts with historical data. Track gold price trends over time with daily, weekly, monthly, and yearly charts.',
  keywords: ['gold price charts', 'gold charts', 'gold price history', 'gold trends', 'gold technical analysis'],
  openGraph: {
    title: 'Gold Price Charts | Live Charts & Historical Data',
    description: 'Interactive gold price charts with historical data and trends.',
    type: 'website',
    url: '/charts',
    images: [
      {
        url: getOgImage('/images/og-charts.jpg'),
        width: 1200,
        height: 630,
        alt: 'Gold Price Charts - Live & Historical Data',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Price Charts | Live Charts & Historical Data',
    description: 'Interactive gold price charts with historical data and trends.',
    images: [getOgImage('/images/og-charts.jpg')],
  },
  alternates: {
    canonical: '/charts',
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

const chartTypes = [

  {
    title: 'Historical Gold Prices',
    description: 'Long-term gold price trends and analysis',
    icon: LineChart,
    href: '/gold-price-history',
    timeframes: ['20 Years', '10 Years', '5 Years', '1 Year']
  },
  {
    title: 'Gold Silver Ratio',
    description: 'Compare gold and silver price movements',
    icon: BarChart3,
    href: '/gold-silver-ratio',
    timeframes: ['1Y', '5Y', '20Y']
  },
]

export default function ChartsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold  mb-4">
            Gold Price Charts
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Interactive charts showing gold price trends, historical data, and live market movements
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {chartTypes.map((chart) => (
            <Link key={chart.title} href={chart.href}>
              <Card className=" border-neutral-800 h-full hover:border-yellow-500 transition-colors group">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
                      <chart.icon className="h-6 w-6 " />
                    </div>
                    <div>
                      <CardTitle className=" group-hover:text-yellow-400">
                        {chart.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 mb-4">
                    {chart.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {chart.timeframes.map((timeframe) => (
                      <span 
                        key={timeframe}
                        className="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded"
                      >
                        {timeframe}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold  mb-4">
            Understanding Gold Charts
          </h2>
          <p className="text-neutral-400 mb-6">
            Our charts display real-time data from global markets. Use different timeframes to analyze short-term 
            volatility or long-term trends. The charts update automatically to reflect the latest market prices.
          </p>
          <Link 
            href="/news/understanding-gold-price-charts"
            className=" hover:underline"
          >
            Learn how to read gold price charts →
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
