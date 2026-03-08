'use client';
import { useState, useEffect } from 'react';
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
import LightweightChart from '@/components/LightweightChart';

const ethereumPriceData = [
  { time: 'Feb 6', price: 5015 },
  { time: 'Feb 8', price: 5019 },
  { time: 'Feb 10', price: 5023 },
  { time: 'Feb 12', price: 5028 },
  { time: 'Feb 14', price: 5032 },
  { time: 'Feb 16', price: 5036 },
  { time: 'Feb 18', price: 5040 },
];

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  previousClose: number;
  timestamp: string;
};

type ChartData = {
  time: string;
  value: number;
};

export default function EthereumPrice() {
  const [ethereumCurrency, setEthereumCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [ethereum12MData, setEthereum12MData] = useState<ChartData[]>([]);
  const [ethereum12MLoading, setEthereum12MLoading] = useState(true);
  const [ethereum12MError, setEthereum12MError] = useState<string | null>(null);
  const [ethereumPerformance, setEthereumPerformance] = useState<any>(null);
  const [ethereumPerfLoading, setEthereumPerfLoading] = useState(true);
  const [ethereumPerfError, setEthereumPerfError] = useState<string | null>(null);
  const [earliestDate, setEarliestDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEthereum12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=ETH-USD&range=12M');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }

        const formattedData = data.chartData.map((item: { time: any; value: any }) => ({
          time: item.time,
          value: item.value,
        }));

        setEthereum12MData(formattedData);
      } catch (err: any) {
        setEthereum12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setEthereum12MLoading(false);
      }
    };

    fetchEthereum12M();
  }, []);

  useEffect(() => {
    const fetchEthereumPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=ETH-USD&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setEthereumPerformance(data);
        if (data.earliestDate) {
          setEarliestDate(data.earliestDate);
        }
      } catch (err: any) {
        setEthereumPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setEthereumPerfLoading(false);
      }
    };

    fetchEthereumPerformance();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(
          `/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,BTC-USD,ETH-USD&key=${key}`
        );
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

  const ethereumQuote = quotes.find(q => q.symbol === 'ETH-USD');

  return (
    <MainLayout breadcrumbs={[{ label: 'Ethereum Price' }]}>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Ethereum Price Live</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Ethereum Price</CardTitle>
            <div className="flex items-center gap-2 text-sm ">
              <span>1 Year Chart</span>
            </div>
            {ethereumQuote && (
              <div className="flex items-center gap-2 text-sm ">
                <span>Current Price: </span>
                <span>USD {ethereumQuote.price.toFixed(2)}</span>
                <span className={ethereumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                  {ethereumQuote.change < 0 ? '▼' : '▲'} {Math.abs(ethereumQuote.change).toFixed(2)}{' '}
                  {ethereumQuote.changePercent}%
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {ethereum12MLoading && (
              <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>
                Loading chart...
              </div>
            )}
            {ethereum12MError && (
              <div
                style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}
                className="text-red-500"
              >
                {ethereum12MError}
              </div>
            )}
            {!ethereum12MLoading && !ethereum12MError && (
              <LightweightChart data={ethereum12MData} />
            )}
          </CardContent>
        </Card>

        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Ethereum Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {ethereumPerfLoading && (
                <div className="text-center py-8">Loading performance data...</div>
              )}
              {ethereumPerfError && (
                <div className="text-center py-8 text-red-500">{ethereumPerfError}</div>
              )}
              {!ethereumPerfLoading && !ethereumPerfError && ethereumPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {ethereumQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td
                          className={`text-right ${ethereumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumQuote.change >= 0 ? '+' : ''}
                          {ethereumQuote.change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${Number(ethereumQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {Number(ethereumQuote.changePercent) >= 0 ? '+' : ''}
                          {ethereumQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {ethereumPerformance.performance && ethereumPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['30D'].change >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {ethereumPerformance.performance && ethereumPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['6M'].change >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {ethereumPerformance.performance && ethereumPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['1Y'].change >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {ethereumPerformance.performance && ethereumPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['5Y'].change >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${ethereumPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {ethereumPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}
                          {ethereumPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {ethereumPerformance.performance &&
                      '20Y' in ethereumPerformance.performance && (
                        <tr>
                          <td className="py-3">20 Years</td>
                          {ethereumPerformance.performance['20Y'] ? (
                            <>
                              <td
                                className={`text-right ${ethereumPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                              >
                                {ethereumPerformance.performance['20Y'].change >= 0 ? '+' : ''}
                                {ethereumPerformance.performance['20Y'].change.toFixed(2)}
                              </td>
                              <td
                                className={`text-right ${ethereumPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                              >
                                {ethereumPerformance.performance['20Y'].changePercent >= 0
                                  ? '+'
                                  : ''}
                                {ethereumPerformance.performance['20Y'].changePercent}%
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="text-right text-neutral-500">--</td>
                              <td className="text-right text-neutral-500">--</td>
                            </>
                          )}
                        </tr>
                      )}
                  </tbody>
                </table>
              )}
              {earliestDate && (
                <p className="text-xs text-neutral-800 text-center mt-2">
                  Earliest price data is{' '}
                  {new Date(earliestDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}
              <p className="text-xs text-neutral-800 text-center mt-2">
                {' '}
                {new Date().toLocaleTimeString('en-US', {
                  timeZone: 'America/New_York',
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                NY Time
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
