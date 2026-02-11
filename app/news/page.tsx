import type { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import MainLayout from '@/components/layout/MainLayout'
import { TrendingUp, TrendingDown, Clock, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gold Price News | Latest Market Updates & Analysis',
  description: 'Latest gold price news, market updates, and expert analysis. Stay informed about precious metals market movements and trends.',
  keywords: ['gold price news', 'gold market updates', 'precious metals news', 'gold analysis'],
  openGraph: {
    title: 'Gold Price News | Latest Market Updates',
    description: 'Latest gold price news and market analysis.',
  },
}

const newsItems = [
  {
    title: 'Gold Prices Reach New Highs Amid Market Uncertainty',
    excerpt: 'Gold continues its upward trajectory as investors seek safe-haven assets during times of economic uncertainty.',
    date: '2025-02-10',
    category: 'Market News',
    trend: 'up',
    link: '/blog/central-banks-buying-gold-2025'
  },
  {
    title: 'Central Banks Increase Gold Reserves at Record Pace',
    excerpt: 'Global central banks are purchasing gold at unprecedented levels, signaling strong institutional demand.',
    date: '2025-02-08',
    category: 'Market News',
    trend: 'up',
    link: '/blog/central-banks-buying-gold-2025'
  },
  {
    title: 'Silver Outperforms Gold in Q1 2025',
    excerpt: 'Silver prices surge as industrial demand increases, outperforming gold in percentage terms.',
    date: '2025-02-05',
    category: 'Market Analysis',
    trend: 'up',
    link: '/blog/silver-vs-gold-investment'
  },
  {
    title: 'Federal Reserve Policy Impact on Gold Prices',
    excerpt: 'Analysis of how recent Federal Reserve decisions are affecting precious metals markets.',
    date: '2025-02-03',
    category: 'Market Analysis',
    trend: 'neutral',
    link: '/blog'
  },
  {
    title: 'Best Practices for Gold Investment in 2025',
    excerpt: 'Expert recommendations for investing in gold during the current market conditions.',
    date: '2025-02-01',
    category: 'Investment Guide',
    trend: 'neutral',
    link: '/blog/how-to-invest-in-gold-beginners-guide'
  },
]

export default function NewsPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
            Gold Price News
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Latest updates, market analysis, and expert insights on gold and precious metals
          </p>
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-yellow-500 mb-6">Latest News</h2>
          <div className="grid grid-cols-1 gap-6">
            {newsItems.map((news, index) => (
              <Link key={index} href={news.link}>
                <Card className="bg-neutral-900 border-neutral-800 hover:border-yellow-500 transition-colors group">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge className="bg-yellow-500 text-black">
                            {news.category}
                          </Badge>
                          <span className="flex items-center gap-1 text-sm text-neutral-500">
                            <Clock size={14} />
                            {new Date(news.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                          {news.trend === 'up' && (
                            <TrendingUp size={16} className="text-green-500" />
                          )}
                          {news.trend === 'down' && (
                            <TrendingDown size={16} className="text-red-500" />
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-500 transition-colors mb-2">
                          {news.title}
                        </h3>
                        <p className="text-neutral-400">
                          {news.excerpt}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-neutral-800 rounded-lg group-hover:bg-neutral-700 transition-colors">
                          <Newspaper className="h-6 w-6 text-yellow-500" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Blog */}
        <div className="text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </MainLayout>
  )
}
