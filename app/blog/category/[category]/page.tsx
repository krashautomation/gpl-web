import type { Metadata } from 'next'
import { getPostsByCategory, categories } from '@/lib/blog/posts'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { notFound } from 'next/navigation'
import MainLayout from '@/components/layout/MainLayout'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = params.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `${category} | Gold Price Blog`,
    description: `Read all our articles about ${category.toLowerCase()}. Expert insights and analysis on gold prices and precious metals.`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.category
  const categoryName = categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  const posts = getPostsByCategory(categoryName)
  
  if (posts.length === 0) {
    notFound()
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-6">
          <Link href="/" className="hover:text-yellow-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-yellow-500">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-500">{categoryName}</span>
        </nav>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-4">
            {categoryName}
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Browse all articles about {categoryName.toLowerCase()}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === 'All' ? '/blog' : `/blog/category/${cat.toLowerCase().replace(/ /g, '-')}`}
            >
              <Badge 
                variant={cat === categoryName ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  cat === categoryName 
                    ? "bg-yellow-500 text-black" 
                    : "border-neutral-700 text-white hover:bg-yellow-500 hover:text-black"
                }`}
              >
                {cat}
              </Badge>
            </Link>
          ))}
        </div>

        {/* Posts Grid */}
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
    </MainLayout>
  )
}
