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

const goldEtfData = [
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

const goldETFs = [
  { name: 'SPDR Gold Shares', symbol: 'GLD', country: 'US' },
  { name: 'iShares Gold Trust', symbol: 'IAU', country: 'US' },
  { name: 'SPDR Gold MiniShares Trust', symbol: 'GLDM', country: 'US' },
  { name: 'abrdn Physical Gold Shares ETF', symbol: 'SGOL', country: 'US' },
];

export default function GoldETFs() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [gld12MData, setGld12MData] = useState<ChartData[]>([]);
  const [gld12MLoading, setGld12MLoading] = useState(true);
  const [gld12MError, setGld12MError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGld12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=GLD&range=12M');
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
        
        setGld12MData(formattedData);
      } catch (err: any) {
        setGld12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setGld12MLoading(false);
      }
    };

    fetchGld12M();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,BTC-USD,ETH-USD,GLD&key=${key}`);
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

  const gldQuote = quotes.find((q) => q.symbol === 'GLD');

  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
             <CardTitle className="text-yellow-500">Gold ETFs</CardTitle>
               <div className="flex items-center gap-2 text-sm text-white">
               <span>SPDR Gold Shares GLD 1 Year Chart</span>
                      </div>
             {gldQuote && (
               <div className="flex items-center gap-2 text-sm text-white">
                 <span>Current Price: </span><span>USD {gldQuote.price.toFixed(2)}</span>
                 <span className={gldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {gldQuote.change < 0 ? '▼' : '▲'} {Math.abs(gldQuote.change).toFixed(2)} {gldQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {gld12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {gld12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{gld12MError}</div>}
            {!gld12MLoading && !gld12MError && <LightweightChart data={gld12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Popular Gold ETFs</CardTitle>
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
                  {goldETFs.map((etf, index) => (
                    <tr key={etf.symbol} className={index < goldETFs.length - 1 ? 'border-b border-neutral-800' : ''}>
                      <td className="py-3">{etf.name}</td>
                      <td className="text-right">{etf.symbol}</td>
                      <td className="text-right">{etf.country}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-neutral-400 text-center mt-4">goldbug.org - {new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
  
      </div>
    </MainLayout>
  );
}
