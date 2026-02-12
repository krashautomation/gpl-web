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

const palladiumPriceData = [
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

export default function PalladiumPrice() {
  const [palladiumCurrency, setPalladiumCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [palladium12MData, setPalladium12MData] = useState<ChartData[]>([]);
  const [palladium12MLoading, setPalladium12MLoading] = useState(true);
  const [palladium12MError, setPalladium12MError] = useState<string | null>(null);
  const [palladiumPerformance, setPalladiumPerformance] = useState<any>(null);
  const [palladiumPerfLoading, setPalladiumPerfLoading] = useState(true);
  const [palladiumPerfError, setPalladiumPerfError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPalladium12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=PA=F&range=12M');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        
        const formattedData = data.chartData.map((item: { time: any; value: any; }) => ({
          time: item.time,
          value: item.value,
        }));
        
        setPalladium12MData(formattedData);
      } catch (err: any) {
        setPalladium12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setPalladium12MLoading(false);
      }
    };

    fetchPalladium12M();
  }, []);

  useEffect(() => {
    const fetchPalladiumPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=PA=F&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setPalladiumPerformance(data);
      } catch (err: any) {
        setPalladiumPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setPalladiumPerfLoading(false);
      }
    };

    fetchPalladiumPerformance();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F&key=${key}`);
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

  const palladiumQuote = quotes.find((q) => q.symbol === 'PA=F');

  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
             <CardTitle className="text-yellow-500">Palladium Price</CardTitle>
               <div className="flex items-center gap-2 text-sm text-white">
               <span>1 Year Chart</span>
                      </div>
             {palladiumQuote && (
               <div className="flex items-center gap-2 text-sm text-white">
                 <span>Current Price: </span><span>USD {palladiumQuote.price.toFixed(2)}</span>
                 <span className={palladiumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {palladiumQuote.change < 0 ? '▼' : '▲'} {Math.abs(palladiumQuote.change).toFixed(2)} {palladiumQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {palladium12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {palladium12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{palladium12MError}</div>}
            {!palladium12MLoading && !palladium12MError && <LightweightChart data={palladium12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Palladium Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {palladiumPerfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {palladiumPerfError && <div className="text-center py-8 text-red-500">{palladiumPerfError}</div>}
              {!palladiumPerfLoading && !palladiumPerfError && palladiumPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {palladiumQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td className={`text-right ${palladiumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumQuote.change >= 0 ? '+' : ''}{palladiumQuote.change.toFixed(2)}
                        </td>
                        <td className={`text-right ${Number(palladiumQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {Number(palladiumQuote.changePercent) >= 0 ? '+' : ''}{palladiumQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {palladiumPerformance.performance && palladiumPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td className={`text-right ${palladiumPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['30D'].change >= 0 ? '+' : ''}{palladiumPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${palladiumPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}{palladiumPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {palladiumPerformance.performance && palladiumPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td className={`text-right ${palladiumPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['6M'].change >= 0 ? '+' : ''}{palladiumPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${palladiumPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}{palladiumPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {palladiumPerformance.performance && palladiumPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td className={`text-right ${palladiumPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['1Y'].change >= 0 ? '+' : ''}{palladiumPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${palladiumPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}{palladiumPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {palladiumPerformance.performance && palladiumPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td className={`text-right ${palladiumPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['5Y'].change >= 0 ? '+' : ''}{palladiumPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${palladiumPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}{palladiumPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {palladiumPerformance.performance && palladiumPerformance.performance['20Y'] && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        <td className={`text-right ${palladiumPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['20Y'].change >= 0 ? '+' : ''}{palladiumPerformance.performance['20Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${palladiumPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {palladiumPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}{palladiumPerformance.performance['20Y'].changePercent}%
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
