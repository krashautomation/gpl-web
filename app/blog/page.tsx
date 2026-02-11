import type { Metadata } from 'next'
import { getAllPosts, categories } from '@/lib/blog/posts'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Gold Price Blog | Market Analysis & Investment Guides',
  description: 'Read the latest gold price news, market analysis, investment guides, and expert insights. Stay informed about precious metals markets.',
  keywords: ['gold price blog', 'gold market analysis', 'gold investment', 'precious metals news'],
  openGraph: {
    title: 'Gold Price Blog | Market Analysis & Investment Guides',
    description: 'Latest gold price news, market analysis, and investment guides.',
    type: 'website',
  },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
          Gold Price Blog
        </h1>
        <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
          Stay informed with the latest gold price news, market analysis, investment guides, and expert insights.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Link
            key={category}
            href={category === 'All' ? '/blog' : `/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
          >
            <Badge 
              variant="outline" 
              className="cursor-pointer hover:bg-yellow-500 hover:text-black transition-colors border-neutral-700 text-white"
            >
              {category}
            </Badge>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <Card className="bg-neutral-900 border-neutral-800 h-full hover:border-yellow-500 transition-colors group">
              <CardHeader>
                <Badge variant="secondary" className="bg-neutral-800 text-yellow-500 w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="text-yellow-500 group-hover:text-yellow-400 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readingTime} min read
                    </span>
                  </div>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
