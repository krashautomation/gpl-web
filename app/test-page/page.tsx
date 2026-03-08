'use client';

import { useEffect, useState } from 'react';
import { getAllPages, getPageBySlug, type Page } from '@/lib/pages';
import { ContactSidebar } from '@/components/ContactSidebar';
import { PriceCard } from '@/components/PriceCard';
import { PerformanceTable } from '@/components/PerformanceTable';
import { CommodityChartCard } from '@/components/CommodityChartCard';
import { ContentCard } from '@/components/ContentCard';
import { ProfileCard } from '@/components/ProfileCard';

const mockQuote = {
  symbol: 'GC=F',
  price: 2034.5,
  change: 12.3,
  changePercent: '0.61',
};

const mockChartData = [
  { time: '2025-01-01', value: 2000 },
  { time: '2025-01-15', value: 2020 },
  { time: '2025-02-01', value: 2034.5 },
];

const mockPerformance = {
  performance: {
    '30D': { price: 1980, change: 54.5, changePercent: 2.75 },
    '6M': { price: 1900, change: 134.5, changePercent: 7.08 },
    '1Y': { price: 1800, change: 234.5, changePercent: 13.03 },
    '5Y': { price: 1200, change: 834.5, changePercent: 69.54 },
  },
};

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
        <h2 className="text-xl font-semibold mb-2">
          Phase 1: Database - All Pages ({pages.length})
        </h2>
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
        <h2 className="text-xl font-semibold mb-2">Phase 1: Database - Test Single Page</h2>
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

      <hr className="my-8" />

      <h2 className="text-xl font-semibold mb-4">Phase 2: Components Test</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-2">ContactSidebar</h3>
          <ContactSidebar />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">PriceCard</h3>
          <PriceCard title="Gold Price" subtitle="1 Year Chart" quote={mockQuote} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-2">CommodityChartCard</h3>
          <CommodityChartCard
            title="Gold Price"
            subtitle="1 Year Chart"
            data={mockChartData}
            quote={mockQuote}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">PerformanceTable</h3>
          <PerformanceTable
            title="Gold Price Performance USD"
            quote={mockQuote}
            performance={mockPerformance}
            lastUpdated={new Date().toISOString()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-2">ContentCard</h3>
          <ContentCard title="Sample Content">
            <p>This is a sample content card with title and body text.</p>
            <p className="mt-2">It can contain any React children.</p>
          </ContentCard>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">ProfileCard</h3>
          <ProfileCard
            imageSrc="/images/dave-gold-price-live.png"
            imageAlt="Dave"
            imageWidth={200}
            imageHeight={133}
            paragraphs={[
              'This is a sample profile card with an image and bio text.',
              'It also has a CTA button below.',
            ]}
            ctaText="Subscribe"
            ctaHref="https://investorsgold.substack.com/"
          />
        </div>
      </div>
    </div>
  );
}
