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
import type { Page } from '@/lib/pages';

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

  const symbol = page.symbol;
  const symbol2 = page.symbol2;
  const hasAds = page.has_ads;
  const hasArticles = page.has_articles;
  const showEarliestDate = page.show_earliest_date;
  const hasCalculator = page.has_calculator;

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

        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
        </div>

        {showEarliestDate && earliestDate && (
          <p className="text-sm text-gray-500 mb-4 text-center">
            Historical data available from {new Date(earliestDate).toLocaleDateString()}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

        {hasCalculator && (
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

        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{page.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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

      <div className="container mx-auto p-8">
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
