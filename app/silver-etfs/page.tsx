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

const silverEtfData = [
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

const silverETFs = [
  { name: 'iShares Silver Trust', symbol: 'SLV', country: 'US' },
  { name: 'abrdn Physical Silver Shares ETF', symbol: 'SIVR', country: 'US' },
  { name: 'Global X Silver Miners ETF', symbol: 'SIL', country: 'US' },
  { name: 'Amplify Junior Silver Miners ETF', symbol: 'SILJ', country: 'US' },
];

export default function SilverETFs() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [slv12MData, setSlv12MData] = useState<ChartData[]>([]);
  const [slv12MLoading, setSlv12MLoading] = useState(true);
  const [slv12MError, setSlv12MError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlv12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=SLV&range=12M');
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
        
        setSlv12MData(formattedData);
      } catch (err: any) {
        setSlv12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setSlv12MLoading(false);
      }
    };

    fetchSlv12M();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,BTC-USD,ETH-USD,GLD,SLV&key=${key}`);
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

  const slvQuote = quotes.find((q) => q.symbol === 'SLV');

  return (
    <MainLayout>
       <div className="flex items-center justify-center mb-6">
  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
Silver ETFs  </h1>
</div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
             <CardTitle className="">Silver ETFs</CardTitle>
               <div className="flex items-center gap-2 text-sm ">
               <span>iShares Silver Trust SLV 1 Year Chart</span>
                      </div>
             {slvQuote && (
               <div className="flex items-center gap-2 text-sm ">
                 <span>Current Price: </span><span>USD {slvQuote.price.toFixed(2)}</span>
                 <span className={slvQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {slvQuote.change < 0 ? '▼' : '▲'} {Math.abs(slvQuote.change).toFixed(2)} {slvQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {slv12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {slv12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{slv12MError}</div>}
            {!slv12MLoading && !slv12MError && <LightweightChart data={slv12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Popular Silver ETFs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="text-left py-2 text-sm font-semibold">Name</th>
                    <th className="text-right py-2 text-sm font-semibold">Symbol</th>
                    <th className="text-right py-2 text-sm font-semibold">Country</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {silverETFs.map((etf, index) => (
                    <tr key={etf.symbol} className={index < silverETFs.length - 1 ? 'border-b border-neutral-800' : ''}>
                      <td className="py-3">{etf.name}</td>
                      <td className="text-right">{etf.symbol}</td>
                      <td className="text-right">{etf.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-neutral-800 text-center mt-4">{new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
  
      </div>
    </MainLayout>
  );
}
