import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getRelatedPosts } from '@/lib/blog/posts'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react'
import MainLayout from '@/components/layout/MainLayout'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seo.title,
    description: post.seo.description,
    keywords: post.seo.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.seo.title,
      description: post.seo.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modifiedDate || post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.title,
      description: post.seo.description,
    },
    alternates: {
      canonical: `https://goldpricelive.com/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category)

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-neutral-400 mb-6">
          <Link href="/" className="hover:text-yellow-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-yellow-500">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-500">{post.title}</span>
        </nav>

        {/* Back Link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <header className="mb-8">
            <Badge className="bg-yellow-500 text-black mb-4">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-400">
              <span className="flex items-center gap-2">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {post.readingTime} min read
              </span>
            </div>
          </header>

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none mb-12
              prose-headings:text-yellow-500 
              prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-neutral-300 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-neutral-300 prose-ul:mb-4
              prose-li:mb-2
              prose-strong:text-white
              prose-a:text-yellow-500 prose-a:no-underline hover:prose-a:underline
              prose-table:border-neutral-700
              prose-th:bg-neutral-800 prose-th:text-white prose-th:p-3
              prose-td:border-neutral-700 prose-td:p-3 prose-td:text-neutral-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-neutral-700 text-neutral-400">
                #{tag}
              </Badge>
            ))}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <Card className="bg-neutral-900 border-neutral-800 hover:border-yellow-500 transition-colors h-full">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="bg-neutral-800 text-yellow-500 mb-3">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-white font-semibold mb-2 line-clamp-2 hover:text-yellow-500 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-neutral-500 text-sm line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
