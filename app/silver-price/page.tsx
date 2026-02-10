'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BullionVaultChart from '@/components/BullionVaultChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import MainLayout from '@/components/layout/MainLayout';

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
};

export default function SilverPricePage() {
  const [silverCurrency, setSilverCurrency] = useState('USD');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=SI=F&key=${key}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success || !data.quotes || data.quotes.length === 0) {
          throw new Error('API returned no data for silver');
        }
        setQuote(data.quotes[0]);
      } catch (err: any) {
        setError(err.message || 'Failed to load quote');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="space-y-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-300">Live Silver Price</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {quote && (
                <div className="flex items-center gap-4">
                  <div className="text-5xl font-bold">{quote.price.toFixed(2)}</div>
                  <div className={`flex items-center ${quote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {quote.change < 0 ? <ArrowDown className="h-6 w-6" /> : <ArrowUp className="h-6 w-6" />}
                    <span className="text-2xl font-semibold">{quote.change.toFixed(2)}</span>
                  </div>
                  <span className={`${Number(quote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'} text-xl`}>{quote.changePercent}%</span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Select value="Silver" onValueChange={() => {}}>
                <SelectTrigger className="w-28 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                </SelectContent>
              </Select>
              <Select value={silverCurrency} onValueChange={setSilverCurrency}>
                <SelectTrigger className="w-28 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Select value="oz" onValueChange={() => {}}>
                <SelectTrigger className="w-28 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oz">oz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-neutral-300">Silver Price Chart</CardTitle>
             {quote && (
              <div className="flex items-center gap-2 text-sm">
                <span>USD {quote.price.toFixed(2)}</span>
                <span className={quote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                  {quote.change < 0 ? '▼' : '▲'} {Math.abs(quote.change).toFixed(2)} ({quote.changePercent}%)
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <BullionVaultChart bullion="silver" currency={silverCurrency as any} />
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-neutral-300">Silver Price Performance - USD</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Performance table can be added here once the data is available */}
            <p className="text-neutral-400">Performance data coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
