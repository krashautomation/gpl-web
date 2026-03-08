'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { File, Edit, Trash2, Eye, EyeOff, Lock, Unlock } from 'lucide-react';
import { getAllPagesAdmin, deletePage, isPageLocked, type Page } from '@/lib/pages';

export default function DashboardPagesPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    const data = await getAllPagesAdmin();
    setPages(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    const locked = await isPageLocked(id);
    if (locked) {
      alert('This page is locked and cannot be deleted.');
      return;
    }
    if (!confirm('Are you sure you want to delete this page?')) return;
    setDeleting(id);
    const success = await deletePage(id);
    if (success) {
      setPages(pages.filter(p => p.id !== id));
    } else {
      alert('Failed to delete page');
    }
    setDeleting(null);
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
        <Link
          href="/dashboard/pages/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          New Page
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
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Locked
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pages.map(page => (
              <tr key={page.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <File size={18} className="text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900">{page.title}</div>
                      <div className="text-sm text-gray-500">/{page.slug}</div>
                      {page.is_active && (
                        <a
                          href={`https://www.goldpricelive.co/${page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline"
                        >
                          https://www.goldpricelive.co/{page.slug}
                        </a>
                      )}
                      {!page.is_active && <span className="text-xs text-red-500">Inactive</span>}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{page.page_type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{page.category || '-'}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      page.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {page.is_active ? <Eye size={12} /> : <EyeOff size={12} />}
                    {page.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {page.is_locked ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      <Lock size={12} />
                      Locked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      <Unlock size={12} />
                      Unlocked
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/dashboard/pages/${page.id}`}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md"
                    >
                      <Edit size={18} />
                    </Link>
                    <Link
                      href={`/${page.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(page.id)}
                      disabled={deleting === page.id || page.is_locked}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No pages yet. Create your first page!
          </div>
        )}
      </div>
    </div>
  );
}
