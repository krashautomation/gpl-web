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

const aluminumPriceData = [
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

export default function AluminumPrice() {
  const [aluminumCurrency, setAluminumCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [aluminum12MData, setAluminum12MData] = useState<ChartData[]>([]);
  const [aluminum12MLoading, setAluminum12MLoading] = useState(true);
  const [aluminum12MError, setAluminum12MError] = useState<string | null>(null);
  const [aluminumPerformance, setAluminumPerformance] = useState<any>(null);
  const [aluminumPerfLoading, setAluminumPerfLoading] = useState(true);
  const [aluminumPerfError, setAluminumPerfError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAluminum12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=ALI=F&range=12M');
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
        
        setAluminum12MData(formattedData);
      } catch (err: any) {
        setAluminum12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setAluminum12MLoading(false);
      }
    };

    fetchAluminum12M();
  }, []);

  useEffect(() => {
    const fetchAluminumPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=ALI=F&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setAluminumPerformance(data);
      } catch (err: any) {
        setAluminumPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setAluminumPerfLoading(false);
      }
    };

    fetchAluminumPerformance();
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

  const aluminumQuote = quotes.find((q) => q.symbol === 'ALI=F');

  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
             <CardTitle className="">Aluminum Price</CardTitle>
               <div className="flex items-center gap-2 text-sm text-white">
               <span>1 Year Chart</span>
                      </div>
             {aluminumQuote && (
               <div className="flex items-center gap-2 text-sm text-white">
                 <span>Current Price: </span><span>USD {aluminumQuote.price.toFixed(2)}</span>
                 <span className={aluminumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {aluminumQuote.change < 0 ? '▼' : '▲'} {Math.abs(aluminumQuote.change).toFixed(2)} {aluminumQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {aluminum12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {aluminum12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{aluminum12MError}</div>}
            {!aluminum12MLoading && !aluminum12MError && <LightweightChart data={aluminum12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Aluminum Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {aluminumPerfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {aluminumPerfError && <div className="text-center py-8 text-red-500">{aluminumPerfError}</div>}
              {!aluminumPerfLoading && !aluminumPerfError && aluminumPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {aluminumQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td className={`text-right ${aluminumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumQuote.change >= 0 ? '+' : ''}{aluminumQuote.change.toFixed(2)}
                        </td>
                        <td className={`text-right ${Number(aluminumQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {Number(aluminumQuote.changePercent) >= 0 ? '+' : ''}{aluminumQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {aluminumPerformance.performance && aluminumPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td className={`text-right ${aluminumPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['30D'].change >= 0 ? '+' : ''}{aluminumPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${aluminumPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}{aluminumPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {aluminumPerformance.performance && aluminumPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td className={`text-right ${aluminumPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['6M'].change >= 0 ? '+' : ''}{aluminumPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${aluminumPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}{aluminumPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {aluminumPerformance.performance && aluminumPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td className={`text-right ${aluminumPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['1Y'].change >= 0 ? '+' : ''}{aluminumPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${aluminumPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}{aluminumPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {aluminumPerformance.performance && aluminumPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td className={`text-right ${aluminumPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['5Y'].change >= 0 ? '+' : ''}{aluminumPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${aluminumPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}{aluminumPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {aluminumPerformance.performance && aluminumPerformance.performance['20Y'] && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        <td className={`text-right ${aluminumPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['20Y'].change >= 0 ? '+' : ''}{aluminumPerformance.performance['20Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${aluminumPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {aluminumPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}{aluminumPerformance.performance['20Y'].changePercent}%
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
