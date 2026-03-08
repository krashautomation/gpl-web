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

const goldPriceData = [
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

export default function NaturalGasPrice() {
  const [naturalGasCurrency, setNaturalGasCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [naturalGas12MData, setNaturalGas12MData] = useState<ChartData[]>([]);
  const [naturalGas12MLoading, setNaturalGas12MLoading] = useState(true);
  const [naturalGas12MError, setNaturalGas12MError] = useState<string | null>(null);
  const [naturalGasPerformance, setNaturalGasPerformance] = useState<any>(null);
  const [naturalGasPerfLoading, setNaturalGasPerfLoading] = useState(true);
  const [naturalGasPerfError, setNaturalGasPerfError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNaturalGas12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=NG=F&range=12M');
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

        setNaturalGas12MData(formattedData);
      } catch (err: any) {
        setNaturalGas12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setNaturalGas12MLoading(false);
      }
    };

    fetchNaturalGas12M();
  }, []);

  useEffect(() => {
    const fetchNaturalGasPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=NG=F&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setNaturalGasPerformance(data);
      } catch (err: any) {
        setNaturalGasPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setNaturalGasPerfLoading(false);
      }
    };

    fetchNaturalGasPerformance();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(
          `/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,CL=F,NG=F&key=${key}`
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

  const naturalGasQuote = quotes.find(q => q.symbol === 'NG=F');

  return (
    <MainLayout breadcrumbs={[{ label: 'Natural Gas Price' }]}>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Natural Gas Price Live </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Natural Gas Price</CardTitle>
            <div className="flex items-center gap-2 text-sm ">
              <span>1 Year Chart</span>
            </div>
            {naturalGasQuote && (
              <div className="flex items-center gap-2 text-sm ">
                <span>Current Price: </span>
                <span>USD {naturalGasQuote.price.toFixed(2)}</span>
                <span className={naturalGasQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                  {naturalGasQuote.change < 0 ? '▼' : '▲'}{' '}
                  {Math.abs(naturalGasQuote.change).toFixed(2)} {naturalGasQuote.changePercent}%
                </span>
              </div>
            )}
          </CardHeader>
          <CardContent>
            {naturalGas12MLoading && (
              <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>
                Loading chart...
              </div>
            )}
            {naturalGas12MError && (
              <div
                style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}
                className="text-red-500"
              >
                {naturalGas12MError}
              </div>
            )}
            {!naturalGas12MLoading && !naturalGas12MError && (
              <LightweightChart data={naturalGas12MData} />
            )}
          </CardContent>
        </Card>

        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Natural Gas Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {naturalGasPerfLoading && (
                <div className="text-center py-8">Loading performance data...</div>
              )}
              {naturalGasPerfError && (
                <div className="text-center py-8 text-red-500">{naturalGasPerfError}</div>
              )}
              {!naturalGasPerfLoading && !naturalGasPerfError && naturalGasPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {naturalGasQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td
                          className={`text-right ${naturalGasQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {naturalGasQuote.change >= 0 ? '+' : ''}
                          {naturalGasQuote.change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${Number(naturalGasQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {Number(naturalGasQuote.changePercent) >= 0 ? '+' : ''}
                          {naturalGasQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {naturalGasPerformance.performance &&
                      naturalGasPerformance.performance['30D'] && (
                        <tr className="border-b border-neutral-800">
                          <td className="py-3">30 Days</td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['30D'].change >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['30D'].change.toFixed(2)}
                          </td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['30D'].changePercent}%
                          </td>
                        </tr>
                      )}
                    {naturalGasPerformance.performance &&
                      naturalGasPerformance.performance['6M'] && (
                        <tr className="border-b border-neutral-800">
                          <td className="py-3">6 Months</td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['6M'].change >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['6M'].change.toFixed(2)}
                          </td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['6M'].changePercent}%
                          </td>
                        </tr>
                      )}
                    {naturalGasPerformance.performance &&
                      naturalGasPerformance.performance['1Y'] && (
                        <tr className="border-b border-neutral-800">
                          <td className="py-3">1 Year</td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['1Y'].change >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['1Y'].change.toFixed(2)}
                          </td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['1Y'].changePercent}%
                          </td>
                        </tr>
                      )}
                    {naturalGasPerformance.performance &&
                      naturalGasPerformance.performance['5Y'] && (
                        <tr className="border-b border-neutral-800">
                          <td className="py-3">5 Year</td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['5Y'].change >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['5Y'].change.toFixed(2)}
                          </td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['5Y'].changePercent}%
                          </td>
                        </tr>
                      )}
                    {naturalGasPerformance.performance &&
                      naturalGasPerformance.performance['20Y'] && (
                        <tr>
                          <td className="py-3">20 Years</td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['20Y'].change >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['20Y'].change.toFixed(2)}
                          </td>
                          <td
                            className={`text-right ${naturalGasPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                          >
                            {naturalGasPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}
                            {naturalGasPerformance.performance['20Y'].changePercent}%
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              )}
              <p className="text-xs text-neutral-800 text-center mt-4">
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
