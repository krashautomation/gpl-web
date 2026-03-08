'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface PriceQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
}

interface PriceCardProps {
  title: string;
  subtitle?: string;
  quote?: PriceQuote | null;
  className?: string;
}

export function PriceCard({ title, subtitle, quote, className }: PriceCardProps) {
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
      <CardContent>{/* Chart renders here */}</CardContent>
    </Card>
  );
}
