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

const copperPriceData = [
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

export default function CopperPrice() {
  const [copperCurrency, setCopperCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [copper12MData, setCopper12MData] = useState<ChartData[]>([]);
  const [copper12MLoading, setCopper12MLoading] = useState(true);
  const [copper12MError, setCopper12MError] = useState<string | null>(null);
  const [copperPerformance, setCopperPerformance] = useState<any>(null);
  const [copperPerfLoading, setCopperPerfLoading] = useState(true);
  const [copperPerfError, setCopperPerfError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCopper12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=HG=F&range=12M');
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
        
        setCopper12MData(formattedData);
      } catch (err: any) {
        setCopper12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setCopper12MLoading(false);
      }
    };

    fetchCopper12M();
  }, []);

  useEffect(() => {
    const fetchCopperPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=HG=F&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setCopperPerformance(data);
      } catch (err: any) {
        setCopperPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setCopperPerfLoading(false);
      }
    };

    fetchCopperPerformance();
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

  const copperQuote = quotes.find((q) => q.symbol === 'HG=F');

  return (
    <MainLayout>
                <div className="flex items-center justify-center mb-6">
  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
    Copper Price Live
  </h1>
</div>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
             <CardTitle className="">Copper Price</CardTitle>
               <div className="flex items-center gap-2 text-sm ">
               <span>1 Year Chart</span>
                      </div>
             {copperQuote && (
               <div className="flex items-center gap-2 text-sm ">
                 <span>Current Price: </span><span>USD {copperQuote.price.toFixed(2)}</span>
                 <span className={copperQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {copperQuote.change < 0 ? '▼' : '▲'} {Math.abs(copperQuote.change).toFixed(2)} {copperQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {copper12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {copper12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{copper12MError}</div>}
            {!copper12MLoading && !copper12MError && <LightweightChart data={copper12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Copper Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {copperPerfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {copperPerfError && <div className="text-center py-8 text-red-500">{copperPerfError}</div>}
              {!copperPerfLoading && !copperPerfError && copperPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {copperQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td className={`text-right ${copperQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperQuote.change >= 0 ? '+' : ''}{copperQuote.change.toFixed(2)}
                        </td>
                        <td className={`text-right ${Number(copperQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {Number(copperQuote.changePercent) >= 0 ? '+' : ''}{copperQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {copperPerformance.performance && copperPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td className={`text-right ${copperPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['30D'].change >= 0 ? '+' : ''}{copperPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${copperPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}{copperPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {copperPerformance.performance && copperPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td className={`text-right ${copperPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['6M'].change >= 0 ? '+' : ''}{copperPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${copperPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}{copperPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {copperPerformance.performance && copperPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td className={`text-right ${copperPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['1Y'].change >= 0 ? '+' : ''}{copperPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${copperPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}{copperPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {copperPerformance.performance && copperPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td className={`text-right ${copperPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['5Y'].change >= 0 ? '+' : ''}{copperPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${copperPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}{copperPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {copperPerformance.performance && copperPerformance.performance['20Y'] && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        <td className={`text-right ${copperPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['20Y'].change >= 0 ? '+' : ''}{copperPerformance.performance['20Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${copperPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {copperPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}{copperPerformance.performance['20Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <p className="text-xs text-neutral-800 text-center mt-4">{new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
  
      </div>
    </MainLayout>
  );
}
