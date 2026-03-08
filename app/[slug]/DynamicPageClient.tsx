'use client';

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { CommodityChartCard } from '@/components/CommodityChartCard';
import { PerformanceTable } from '@/components/PerformanceTable';
import { ContactSidebar } from '@/components/ContactSidebar';
import { ContentCard } from '@/components/ContentCard';
import { BannerAd } from '@/components/BannerAd';
import { GoldCalculator } from '@/components/GoldCalculator';
import RecentArticlesSection from '@/app/components/RecentArticlesSection';
import { getPageComponents, type Page, type PageComponent } from '@/lib/pages';

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

interface DynamicPageClientProps {
  page: Page;
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
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
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
      return (
        <ContentCard>
          <p>{(config?.content as string) || page.description || 'Content coming soon...'}</p>
        </ContentCard>
      );

    case 'contact':
      return <ContactSidebar />;

    default:
      return null;
  }
}

export function DynamicPageClient({ page }: DynamicPageClientProps) {
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
      <MainLayout>
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
      <MainLayout>
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
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
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
      <MainLayout>
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
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
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
      <MainLayout>
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
    <MainLayout>
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
