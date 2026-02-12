import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'
import Image from 'next/image'

import { getArticles, type Article } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Gold Price News | Market Analysis & Investment Guides',
  description: 'Read the latest gold price news, market analysis, investment guides, and expert insights. Stay informed about precious metals markets.',
  keywords: ['gold price news', 'gold market analysis', 'gold investment', 'precious metals news'],
  openGraph: {
    title: 'Gold Price News | Market Analysis & Investment Guides',
    description: 'Latest gold price news, market analysis, and investment guides.',
    type: 'website',
  },
}

// Get unique categories from articles
function getCategories(articles: Article[]) {
  const categories = new Set(articles.map((article) => article.category))
  return ['All', ...Array.from(categories).sort()]
}

interface NewsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams
  const categoryParam = params.category as string | undefined
  
  const allArticles = await getArticles()
  
  // Convert URL param (e.g., "market-analysis") back to category name (e.g., "Market Analysis")
  const activeCategory = categoryParam 
    ? categoryParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : 'All'
  
  // Filter articles by category if one is selected
  let articles = allArticles.sort(
    (a: Article, b: Article) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  if (activeCategory !== 'All') {
    articles = articles.filter(article => article.category === activeCategory)
  }
  
  const categories = getCategories(allArticles)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
            Gold Price News
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Stay informed with the latest gold price news, market analysis, investment guides, and expert insights.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => {
            const isActive = category === activeCategory
            const href = category === 'All' 
              ? '/news' 
              : `/news?category=${category.toLowerCase().replace(/ /g, '-')}`
            
            return (
              <Link key={category} href={href}>
                <Badge 
                  variant={isActive ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    isActive 
                      ? "bg-yellow-500 text-black hover:bg-yellow-400" 
                      : "border-neutral-700 text-white hover:bg-yellow-500 hover:text-black"
                  }`}
                >
                  {category}
                </Badge>
              </Link>
            )
          })}
        </div>

        {/* Active Category Header */}
        {activeCategory !== 'All' && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-yellow-500">
              {activeCategory}
            </h2>
            <p className="text-neutral-400 mt-2">
              Showing {articles.length} article{articles.length !== 1 ? 's' : ''} in this category
            </p>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/news/${article.slug}`}>
              <Card className="bg-neutral-900 border-neutral-800 h-full hover:border-yellow-500 transition-colors group">
                <CardHeader>
                  <Badge variant="secondary" className="bg-neutral-800 text-white-500 w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-white-500 group-hover:text-yellow-400 line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(article.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readingTime} min read
                      </span>
                    </div>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-400">
              {activeCategory !== 'All' 
                ? `No articles found in "${activeCategory}" category.` 
                : 'No articles found.'}
            </p>
            {activeCategory !== 'All' && (
              <Link href="/news" className="text-yellow-500 hover:underline mt-4 inline-block">
                View all articles
              </Link>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
}
