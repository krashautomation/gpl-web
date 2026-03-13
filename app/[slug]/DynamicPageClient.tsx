'use client';

import { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import MainLayout from '@/components/layout/MainLayout';
import { CommodityChartCard } from '@/components/CommodityChartCard';
import { PerformanceTable } from '@/components/PerformanceTable';
import { ContactSidebar } from '@/components/ContactSidebar';
import { ContentCard } from '@/components/ContentCard';
import { BannerAd } from '@/components/BannerAd';
import { GoldCalculator } from '@/components/GoldCalculator';
import { BioCard } from '@/components/BioCard';
import RecentArticlesSection from '@/app/components/RecentArticlesSection';
import { getPageComponents, type Page, type PageComponent } from '@/lib/pages';
import Link from 'next/link';

interface Stock {
  id: string;
  slug: string;
  title: string;
  symbol: string | null;
  category: string | null;
  description: string | null;
}

function StockTable({ category }: { category: string | null }) {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) {
      setLoading(false);
      return;
    }

    const fetchStocks = async () => {
      try {
        const { data } = await fetch(`/api/stocks?category=${category}`).then(res => res.json());
        setStocks(data || []);
      } catch (err) {
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [category]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-neutral-400">Loading stocks...</p>
      </div>
    );
  }

  if (stocks.length === 0) {
    return null;
  }

  // Extract company name from title (remove " Stock Price" suffix)
  const getCompanyName = (title: string) => title.replace(' Stock Price', '');

  return (
    <div className="overflow-x-auto stock-table-links">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-700">
            <th className="text-left py-3 px-4 text-sm font-semibold">Company Name</th>
            <th className="text-right py-3 px-4 text-sm font-semibold">Symbol</th>
            <th className="text-right py-3 px-4 text-sm font-semibold">Country</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {stocks.map((stock, index) => (
            <tr key={stock.id} className="border-b border-neutral-800">
              <td className="py-3 px-4">
                <Link href={`/${stock.slug}`} className="stock-link">
                  {getCompanyName(stock.title)}
                </Link>
              </td>
              <td className="text-right py-3 px-4">{stock.symbol}</td>
              <td className="text-right py-3 px-4">
                {stock.symbol?.endsWith('.TO') ? 'Canada' : 'US'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-neutral-500 text-center mt-4">{stocks.length} stocks</p>
    </div>
  );
}

interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
}

interface ChartData {
  time: string;
  value: number;
}

interface PerformanceData {
  performance: Record<string, { price: number; change: number; changePercent: number }>;
  earliestDate?: string | null;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface DynamicPageClientProps {
  page: Page;
  breadcrumbs?: BreadcrumbItem[];
}

const COMPONENT_REGISTRY: Record<string, React.ComponentType<any>> = {
  chart: CommodityChartCard,
  performance: PerformanceTable,
  calculator: GoldCalculator,
  articles: RecentArticlesSection,
  ads: BannerAd,
  hero: () => null,
  text_block: ContentCard,
  contact: ContactSidebar,
  bio_card: BioCard,
  stock_table: StockTable,
};

function renderComponent(
  componentType: string,
  config: Record<string, unknown> | null,
  page: Page,
  chartData: ChartData[],
  chartLoading: boolean,
  chartError: string | null,
  performance: PerformanceData | null,
  perfLoading: boolean,
  perfError: string | null,
  quote: Quote | null
) {
  const symbol = page.symbol || 'GC=F';
  const symbol2 = page.symbol2;

  switch (componentType) {
    case 'hero':
      return (
        <div className="flex items-center justify-start mb-6">
          <h1 className="page-title font-bold tracking-tight">{page.title}</h1>
        </div>
      );

    case 'chart':
      const ChartComponent = CommodityChartCard;
      return (
        <ChartComponent
          title={(config?.title as string) || page.title}
          subtitle={(config?.subtitle as string) || '1 Year Chart'}
          data={chartData}
          quote={quote}
          loading={chartLoading}
          error={chartError}
        />
      );

    case 'performance':
      const PerfComponent = PerformanceTable;
      return (
        <PerfComponent
          title={(config?.title as string) || `${page.title} Performance USD`}
          quote={quote}
          performance={performance}
          loading={perfLoading}
          error={perfError}
          lastUpdated={new Date().toISOString()}
        />
      );

    case 'calculator':
      const CalcComponent = GoldCalculator;
      return (
        <CalcComponent
          symbol={(config?.symbol as string) || symbol}
          title={(config?.title as string) || `${page.title} Calculator`}
        />
      );

    case 'articles':
      return <RecentArticlesSection />;

    case 'ads':
      return (
        <BannerAd
          affiliateName={(config?.affiliateName as string) || 'Money Metals Exchange'}
          adName={(config?.adName as string) || 'Money Metals Exchange'}
          href={
            (config?.href as string) ||
            'https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708'
          }
          src={
            (config?.src as string) ||
            'https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708'
          }
          className={(config?.className as string) || 'my-6'}
        />
      );

    case 'text_block':
      const textBlockConfig = config as { content?: string } | null;
      const textContent = textBlockConfig?.content || '';
      const sanitizedContent = textContent
        ? DOMPurify.sanitize(textContent, { RETURN_TRUSTED_TYPE: false })
        : '';
      return (
        <ContentCard>
          {sanitizedContent ? (
            <div
              style={{ '--tw-prose-links': '#2563eb' } as React.CSSProperties}
              className="cms-content prose prose-lg max-w-none prose-headings:text-black prose-p:text-black prose-ul:text-black prose-ol:text-black prose-li:text-black prose-strong:text-black prose-img:rounded-lg"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          ) : (
            <p>{page.description || 'Content coming soon...'}</p>
          )}
        </ContentCard>
      );

    case 'contact':
      return <ContactSidebar />;

    case 'bio_card':
      const bioConfig = config as {
        author?: string;
        authorImage?: string;
        date?: string;
        readingTime?: number;
        imageSize?: number;
        className?: string;
      } | null;
      const pageDate = page.updated_at || page.created_at;
      return (
        <BioCard
          author={bioConfig?.author}
          authorImage={bioConfig?.authorImage}
          date={pageDate}
          readingTime={bioConfig?.readingTime ?? 5}
          imageSize={bioConfig?.imageSize}
          className={bioConfig?.className}
        />
      );

    case 'stock_table':
      return (
        <div className="cms-content border border-neutral-800 rounded-lg p-4">
          <StockTable category={page.category} />
        </div>
      );

    default:
      return null;
  }
}

export function DynamicPageClient({ page, breadcrumbs }: DynamicPageClientProps) {
  const defaultBreadcrumbs: BreadcrumbItem[] = [{ label: page.title }];
  const pageBreadcrumbs = breadcrumbs || defaultBreadcrumbs;
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);
  const [performance, setPerformance] = useState<PerformanceData | null>(null);
  const [perfLoading, setPerfLoading] = useState(true);
  const [perfError, setPerfError] = useState<string | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [quotesLoading, setQuotesLoading] = useState(true);
  const [quotesError, setQuotesError] = useState<string | null>(null);
  const [pageComponents, setPageComponents] = useState<PageComponent[]>([]);
  const [componentsLoading, setComponentsLoading] = useState(true);

  const symbol = page.symbol;
  const symbol2 = page.symbol2;
  const hasAds = page.has_ads;
  const hasArticles = page.has_articles;
  const showEarliestDate = page.show_earliest_date;

  useEffect(() => {
    const fetchComponents = async () => {
      const components = await getPageComponents(page.id);
      console.log('Page components fetched:', components);
      setPageComponents(components);
      setComponentsLoading(false);
    };
    fetchComponents();
  }, [page.id]);

  useEffect(() => {
    if (!symbol) return;

    const fetchChartData = async () => {
      try {
        const res = await fetch(`/api/chart?symbol=${symbol}&range=12M`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setChartData(
            data.chartData.map((item: { time: string; value: number }) => ({
              time: item.time,
              value: item.value,
            }))
          );
        }
      } catch (err) {
        setChartError(err instanceof Error ? err.message : 'Failed to load chart');
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [symbol]);

  useEffect(() => {
    if (!symbol) return;

    const fetchPerformance = async () => {
      try {
        const res = await fetch(`/api/chart?symbol=${symbol}&type=performance`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setPerformance(data);
        }
      } catch (err) {
        setPerfError(err instanceof Error ? err.message : 'Failed to load performance');
      } finally {
        setPerfLoading(false);
      }
    };

    fetchPerformance();
  }, [symbol]);

  useEffect(() => {
    if (!symbol) return;

    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=${symbol}&key=${key}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.success) {
          setQuotes(data.quotes);
        }
      } catch (err) {
        setQuotesError(err instanceof Error ? err.message : 'Failed to load quotes');
      } finally {
        setQuotesLoading(false);
      }
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [symbol]);

  const quote = quotes.find(q => q.symbol === symbol) || null;
  const earliestDate = performance?.earliestDate;

  const useComponentSystem = pageComponents.length > 0;

  if (useComponentSystem) {
    return (
      <MainLayout breadcrumbs={pageBreadcrumbs}>
        {pageComponents.map(component => {
          const Component = renderComponent(
            component.component_type,
            component.config,
            page,
            chartData,
            chartLoading,
            chartError,
            performance,
            perfLoading,
            perfError,
            quote
          );
          if (!Component) return null;
          return (
            <div key={component.id} className="mb-6">
              {Component}
            </div>
          );
        })}
      </MainLayout>
    );
  }

  if (page.page_type === 'commodity' || page.page_type === 'crypto') {
    return (
      <MainLayout breadcrumbs={pageBreadcrumbs}>
        {hasAds && (
          <BannerAd
            affiliateName="Money Metals Exchange"
            adName="Money Metals Exchange"
            href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
            src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
            className="my-6"
          />
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-start mb-6">
            <h1 className="page-title text-3xl font-bold tracking-tight md:text-4xl">
              {page.title}
            </h1>
          </div>

          {showEarliestDate && earliestDate && (
            <p className="text-sm text-gray-500 mb-4 text-center">
              Historical data available from {new Date(earliestDate).toLocaleDateString()}
            </p>
          )}

          <div className="grid grid-cols-1 gap-6 mb-8">
            <CommodityChartCard
              title={page.title}
              subtitle="1 Year Chart"
              data={chartData}
              quote={quote || undefined}
              loading={chartLoading}
              error={chartError}
            />

            <PerformanceTable
              title={`${page.title} Performance USD`}
              quote={quote}
              performance={performance || null}
              loading={perfLoading}
              error={perfError}
              lastUpdated={new Date().toISOString()}
            />
          </div>

          {page.has_calculator && (
            <div className="mb-8">
              <GoldCalculator symbol={symbol || 'GC=F'} title={`${page.title} Calculator`} />
            </div>
          )}

          {hasArticles && (
            <div className="mt-8">
              <RecentArticlesSection />
            </div>
          )}

          {hasAds && (
            <BannerAd
              affiliateName="Money Metals Exchange"
              adName="Money Metals Exchange"
              href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
              src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
              className="my-6"
            />
          )}
        </div>
      </MainLayout>
    );
  }

  if (page.page_type === 'ratio') {
    return (
      <MainLayout breadcrumbs={pageBreadcrumbs}>
        {hasAds && (
          <BannerAd
            affiliateName="Money Metals Exchange"
            adName="Money Metals Exchange"
            href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
            src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
            className="my-6"
          />
        )}

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-start mb-6">
            <h1 className="page-title text-3xl font-bold tracking-tight md:text-4xl">
              {page.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-8">
            <CommodityChartCard
              title={`${symbol} / ${symbol2} Ratio`}
              subtitle="1 Year Chart"
              data={chartData}
              quote={quote || undefined}
              loading={chartLoading}
              error={chartError}
            />

            <PerformanceTable
              title="Performance USD"
              quote={quote}
              performance={performance || null}
              loading={perfLoading}
              error={perfError}
              lastUpdated={new Date().toISOString()}
            />
          </div>
        </div>

        {hasAds && (
          <BannerAd
            affiliateName="Money Metals Exchange"
            adName="Money Metals Exchange"
            href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
            src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
            className="my-6"
          />
        )}
      </MainLayout>
    );
  }

  if (page.page_type === 'static' || page.page_type === 'legal') {
    return (
      <MainLayout breadcrumbs={pageBreadcrumbs}>
        {hasAds && (
          <BannerAd
            affiliateName="Money Metals Exchange"
            adName="Money Metals Exchange"
            href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
            src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
            className="my-6"
          />
        )}

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <ContentCard>
              <p>{page.description || 'Content coming soon...'}</p>
            </ContentCard>
            <ContactSidebar />
          </div>

          {hasArticles && (
            <div className="mt-8">
              <RecentArticlesSection />
            </div>
          )}
        </div>

        {hasAds && (
          <BannerAd
            affiliateName="Money Metals Exchange"
            adName="Money Metals Exchange"
            href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
            src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
            className="my-6"
          />
        )}
      </MainLayout>
    );
  }

  return (
    <MainLayout breadcrumbs={pageBreadcrumbs}>
      {hasAds && (
        <BannerAd
          affiliateName="Money Metals Exchange"
          adName="Money Metals Exchange"
          href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
          src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
          className="my-6"
        />
      )}

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
        <p>Page type: {page.page_type}</p>
        <p>Description: {page.description}</p>
      </div>

      {hasAds && (
        <BannerAd
          affiliateName="Money Metals Exchange"
          adName="Money Metals Exchange"
          href="https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708"
          src="https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708"
          className="my-6"
        />
      )}
    </MainLayout>
  );
}
