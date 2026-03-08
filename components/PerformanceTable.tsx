'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export interface PerformanceData {
  price: number;
  change: number;
  changePercent: number;
}

export interface PerformancePeriods {
  '30D'?: PerformanceData;
  '6M'?: PerformanceData;
  '1Y'?: PerformanceData;
  '2Y'?: PerformanceData;
  '3Y'?: PerformanceData;
  '5Y'?: PerformanceData;
  '20Y'?: PerformanceData;
}

export interface PerformanceTableProps {
  title: string;
  quote?: { change: number; changePercent: string } | null;
  performance?: { performance: PerformancePeriods } | null;
  loading?: boolean;
  error?: string | null;
  lastUpdated?: string;
  className?: string;
}

const periodLabels: Record<string, string> = {
  '30D': '30 Days',
  '6M': '6 Months',
  '1Y': '1 Year',
  '2Y': '2 Years',
  '3Y': '3 Years',
  '5Y': '5 Year',
  '20Y': '20 Years',
};

function formatChange(value: number): string {
  return value >= 0 ? `+${value.toFixed(2)}` : value.toFixed(2);
}

function formatPercent(value: number): string {
  return value >= 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`;
}

export function PerformanceTable({
  title,
  quote,
  performance,
  loading,
  error,
  lastUpdated,
  className,
}: PerformanceTableProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {loading && <div className="text-center py-8">Loading performance data...</div>}
          {error && <div className="text-center py-8 text-red-500">{error}</div>}
          {!loading && !error && performance && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-2 text-sm font-semibold">Change</th>
                  <th className="text-right py-2 text-sm font-semibold">Amount</th>
                  <th className="text-right py-2 text-sm font-semibold">%</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {quote && quote.change !== null && (
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">Today</td>
                    <td
                      className={`text-right ${(quote.change ?? 0) < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {formatChange(quote.change ?? 0)}
                    </td>
                    <td
                      className={`text-right ${(Number(quote.changePercent) ?? 0) < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {Number(quote.changePercent) >= 0 ? '+' : ''}
                      {quote.changePercent ?? 0}%
                    </td>
                  </tr>
                )}
                {performance.performance &&
                  Object.entries(performance.performance || {})
                    .filter((entry): boolean => {
                      const key = entry[0];
                      const data = entry[1];
                      if (key == null) return false;
                      if (data == null) return false;
                      if (typeof data !== 'object') return false;
                      const perf = data as Record<string, unknown>;
                      if (typeof perf.change !== 'number') return false;
                      if (typeof perf.changePercent !== 'number') return false;
                      return true;
                    })
                    .map(([period, data]) => {
                      if (!data || typeof data !== 'object') return null;
                      try {
                        const perf = data as Record<string, unknown>;
                        const change = typeof perf?.change === 'number' ? perf.change : 0;
                        const changePercent =
                          typeof perf?.changePercent === 'number' ? perf.changePercent : 0;
                        return (
                          <tr key={period} className="border-b border-neutral-800">
                            <td className="py-3">{periodLabels[period] || period}</td>
                            <td
                              className={`text-right ${change < 0 ? 'text-red-500' : 'text-green-500'}`}
                            >
                              {formatChange(change)}
                            </td>
                            <td
                              className={`text-right ${changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                            >
                              {formatPercent(changePercent)}
                            </td>
                          </tr>
                        );
                      } catch {
                        return null;
                      }
                    })
                    .filter(Boolean)}
              </tbody>
            </table>
          )}
          {lastUpdated && (
            <p className="text-xs text-neutral-800 text-center mt-4">
              {new Date(lastUpdated).toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              EST
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
