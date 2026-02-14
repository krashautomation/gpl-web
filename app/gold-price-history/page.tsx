'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  previousClose: number;
  timestamp: string;
};

export default function GoldPriceHistory() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [goldPerformance, setGoldPerformance] = useState<any>(null);
  const [goldPerfLoading, setGoldPerfLoading] = useState(true);
  const [goldPerfError, setGoldPerfError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoldPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=GC=F&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setGoldPerformance(data);
      } catch (err: any) {
        setGoldPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setGoldPerfLoading(false);
      }
    };

    fetchGoldPerformance();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI_F&key=${key}`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setQuotes(data.quotes);
      } catch (err: any) {
        setError(err.message || 'Failed to load quotes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const goldQuote = quotes.find((q) => q.symbol === 'GC=F');

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Gold Price History</CardTitle>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>100 Year Historical Chart</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex-shrink-0">
              <Image
                src="/images/gold-price-historical-chart.png"
                alt="Gold Prices - 100 Year Historical Chart"
                width={720}
                height={479}
                priority={false}
                className="shadow-lg w-full h-auto"
              />
            </div>
            <p className="text-xs text-neutral-400 text-center mt-4">
              Gold Prices - 100 Year Historical Chart (macrotrends.net)
            </p>
          </CardContent>
        </Card>
        
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Gold Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {goldPerfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {goldPerfError && <div className="text-center py-8 text-red-500">{goldPerfError}</div>}
              {!goldPerfLoading && !goldPerfError && goldPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {goldQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td className={`text-right ${goldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldQuote.change >= 0 ? '+' : ''}{goldQuote.change.toFixed(2)}
                        </td>
                        <td className={`text-right ${Number(goldQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {Number(goldQuote.changePercent) >= 0 ? '+' : ''}{goldQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td className={`text-right ${goldPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['30D'].change >= 0 ? '+' : ''}{goldPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${goldPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}{goldPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td className={`text-right ${goldPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['6M'].change >= 0 ? '+' : ''}{goldPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${goldPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}{goldPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td className={`text-right ${goldPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['1Y'].change >= 0 ? '+' : ''}{goldPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${goldPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}{goldPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td className={`text-right ${goldPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['5Y'].change >= 0 ? '+' : ''}{goldPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${goldPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}{goldPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['20Y'] && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        <td className={`text-right ${goldPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['20Y'].change >= 0 ? '+' : ''}{goldPerformance.performance['20Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${goldPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {goldPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}{goldPerformance.performance['20Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <p className="text-xs text-neutral-400 text-center mt-4">goldbug.org - {new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
