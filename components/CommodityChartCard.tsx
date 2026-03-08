'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import LightweightChart from './LightweightChart';

interface ChartData {
  time: string;
  value: number;
}

interface PriceQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
}

interface CommodityChartCardProps {
  title: string;
  subtitle?: string;
  data?: ChartData[] | null;
  quote?: PriceQuote | null;
  loading?: boolean;
  error?: string | null;
  className?: string;
}

export function CommodityChartCard({
  title,
  subtitle,
  data,
  quote,
  loading,
  error,
  className,
}: CommodityChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {subtitle && (
          <div className="flex items-center gap-2 text-sm">
            <span>{subtitle}</span>
          </div>
        )}
        {quote && (
          <div className="flex items-center gap-2 text-sm">
            <span>Current Price: </span>
            <span>USD {quote.price.toFixed(2)}</span>
            <span className={quote.change < 0 ? 'text-red-500' : 'text-green-500'}>
              {quote.change < 0 ? '▼' : '▲'} {Math.abs(quote.change).toFixed(2)}{' '}
              {quote.changePercent}%
            </span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {loading && (
          <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>
            Loading chart...
          </div>
        )}
        {error && (
          <div
            style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}
            className="text-red-500"
          >
            {error}
          </div>
        )}
        {!loading && !error && data && <LightweightChart data={data} />}
      </CardContent>
    </Card>
  );
}
