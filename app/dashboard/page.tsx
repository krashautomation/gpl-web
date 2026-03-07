'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { getAllArticlesAdmin, deleteArticle, type Article } from '@/lib/articles';

export default function DashboardPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  async function loadArticles() {
    const data = await getAllArticlesAdmin();
    setArticles(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this article?')) return;
    setDeleting(id);
    const success = await deleteArticle(id);
    if (success) {
      setArticles(articles.filter(a => a.id !== id));
    } else {
      alert('Failed to delete article');
    }
    setDeleting(null);
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Articles</h1>
        <Link
          href="/dashboard/articles/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Article
        </Link>
      </div>

      <div className="mb-6 flex items-center gap-4">
        <a
          href="https://search.google.com/search-console?resource_id=https%3A%2F%2Fwww.goldpricelive.co%2F"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Google Search Console
        </a>
        <a
          href="https://www.goldpricelive.co/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-800"
        >
          Sitemap
        </a>
        <span className="text-sm text-gray-500">Rebuild and redeploy to generate new sitemap</span>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.map(article => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <FileText size={18} className="text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-500">/{article.slug}</div>
                      {!article.draft && (
                        <a
                          href={`https://www.goldpricelive.co/news/${article.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          https://www.goldpricelive.co/news/{article.slug}
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{article.category || '-'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      article.draft
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {article.draft ? <EyeOff size={12} /> : <Eye size={12} />}
                    {article.draft ? 'Draft' : 'Published'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(article.published_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/articles/${article.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit size={18} />
                    </Link>
                    <Link
                      href={`/news/${article.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={deleting === article.id}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {articles.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No articles yet. Create your first article!
          </div>
        )}
      </div>
    </div>
  );
}
