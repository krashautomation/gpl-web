'use client';

import { useEffect, useState } from 'react';
import { getAllPages, getPageBySlug, type Page } from '@/lib/pages';

export default function TestPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testSlug, setTestSlug] = useState('gold-price');
  const [singlePage, setSinglePage] = useState<Page | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  async function loadPages() {
    try {
      const data = await getAllPages();
      setPages(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load pages');
    } finally {
      setLoading(false);
    }
  }

  async function testSinglePage() {
    try {
      const page = await getPageBySlug(testSlug);
      setSinglePage(page);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Page CMS Test</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">All Pages ({pages.length})</h2>
        <ul className="list-disc pl-5">
          {pages.map(page => (
            <li key={page.id}>
              <span className="font-mono">{page.slug}</span> - {page.title}
              {page.is_locked && <span className="text-red-500 ml-2">[LOCKED]</span>}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Test Single Page</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={testSlug}
            onChange={e => setTestSlug(e.target.value)}
            className="border p-2 rounded"
            placeholder="Enter slug"
          />
          <button onClick={testSinglePage} className="bg-blue-500 text-white px-4 py-2 rounded">
            Fetch
          </button>
        </div>
        {singlePage && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>
              <strong>Slug:</strong> {singlePage.slug}
            </p>
            <p>
              <strong>Title:</strong> {singlePage.title}
            </p>
            <p>
              <strong>Symbol:</strong> {singlePage.symbol}
            </p>
            <p>
              <strong>Page Type:</strong> {singlePage.page_type}
            </p>
            <p>
              <strong>SEO Page Type:</strong> {singlePage.seo_page_type}
            </p>
            <p>
              <strong>Locked:</strong> {singlePage.is_locked ? 'Yes' : 'No'}
            </p>
            <p>
              <strong>Description:</strong> {singlePage.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
