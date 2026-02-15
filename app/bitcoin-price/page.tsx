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

const bitcoinPriceData = [
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

export default function BitcoinPrice() {
  const [bitcoinCurrency, setBitcoinCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [bitcoin12MData, setBitcoin12MData] = useState<ChartData[]>([]);
  const [bitcoin12MLoading, setBitcoin12MLoading] = useState(true);
  const [bitcoin12MError, setBitcoin12MError] = useState<string | null>(null);
  const [bitcoinPerformance, setBitcoinPerformance] = useState<any>(null);
  const [bitcoinPerfLoading, setBitcoinPerfLoading] = useState(true);
  const [bitcoinPerfError, setBitcoinPerfError] = useState<string | null>(null);
  const [earliestDate, setEarliestDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoin12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=BTC-USD&range=12M');
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
        
        setBitcoin12MData(formattedData);
      } catch (err: any) {
        setBitcoin12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setBitcoin12MLoading(false);
      }
    };

    fetchBitcoin12M();
  }, []);

  useEffect(() => {
    const fetchBitcoinPerformance = async () => {
      try {
        const res = await fetch('/api/chart?symbol=BTC-USD&type=performance');
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const data = await res.json();
        if (!data.success) {
          throw new Error('API returned error');
        }
        setBitcoinPerformance(data);
        if (data.earliestDate) {
          setEarliestDate(data.earliestDate);
        }
      } catch (err: any) {
        setBitcoinPerfError(err.message || 'Failed to load performance data');
        console.error(err);
      } finally {
        setBitcoinPerfLoading(false);
      }
    };

    fetchBitcoinPerformance();
  }, []);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) throw new Error('Missing API key');
        const res = await fetch(`/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,BTC-USD&key=${key}`);
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

  const bitcoinQuote = quotes.find((q) => q.symbol === 'BTC-USD');

  return (
    <MainLayout>
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
             <CardTitle className="">Bitcoin Price</CardTitle>
               <div className="flex items-center gap-2 text-sm ">
               <span>1 Year Chart</span>
                      </div>
             {bitcoinQuote && (
               <div className="flex items-center gap-2 text-sm ">
                 <span>Current Price: </span><span>USD {bitcoinQuote.price.toFixed(2)}</span>
                 <span className={bitcoinQuote.change < 0 ? 'text-red-500' : 'text-green-500'}>
                   {bitcoinQuote.change < 0 ? '▼' : '▲'} {Math.abs(bitcoinQuote.change).toFixed(2)} {bitcoinQuote.changePercent}%
                 </span>
               </div>
             )}
          </CardHeader>
          <CardContent>
            {bitcoin12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {bitcoin12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{bitcoin12MError}</div>}
            {!bitcoin12MLoading && !bitcoin12MError && <LightweightChart data={bitcoin12MData} />}
          </CardContent>
        </Card>
        
        
        <Card className=" border-neutral-800">
          <CardHeader>
            <CardTitle className="">Bitcoin Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {bitcoinPerfLoading && <div className="text-center py-8">Loading performance data...</div>}
              {bitcoinPerfError && <div className="text-center py-8 text-red-500">{bitcoinPerfError}</div>}
              {!bitcoinPerfLoading && !bitcoinPerfError && bitcoinPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {bitcoinQuote && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">Today</td>
                        <td className={`text-right ${bitcoinQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinQuote.change >= 0 ? '+' : ''}{bitcoinQuote.change.toFixed(2)}
                        </td>
                        <td className={`text-right ${Number(bitcoinQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {Number(bitcoinQuote.changePercent) >= 0 ? '+' : ''}{bitcoinQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {bitcoinPerformance.performance && bitcoinPerformance.performance['30D'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">30 Days</td>
                        <td className={`text-right ${bitcoinPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['30D'].change >= 0 ? '+' : ''}{bitcoinPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${bitcoinPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}{bitcoinPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {bitcoinPerformance.performance && bitcoinPerformance.performance['6M'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">6 Months</td>
                        <td className={`text-right ${bitcoinPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['6M'].change >= 0 ? '+' : ''}{bitcoinPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${bitcoinPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}{bitcoinPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {bitcoinPerformance.performance && bitcoinPerformance.performance['1Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">1 Year</td>
                        <td className={`text-right ${bitcoinPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['1Y'].change >= 0 ? '+' : ''}{bitcoinPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${bitcoinPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}{bitcoinPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {bitcoinPerformance.performance && bitcoinPerformance.performance['5Y'] && (
                      <tr className="border-b border-neutral-800">
                        <td className="py-3">5 Year</td>
                        <td className={`text-right ${bitcoinPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['5Y'].change >= 0 ? '+' : ''}{bitcoinPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td className={`text-right ${bitcoinPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {bitcoinPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}{bitcoinPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {bitcoinPerformance.performance && '20Y' in bitcoinPerformance.performance && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        {bitcoinPerformance.performance['20Y'] ? (
                          <>
                            <td className={`text-right ${bitcoinPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {bitcoinPerformance.performance['20Y'].change >= 0 ? '+' : ''}{bitcoinPerformance.performance['20Y'].change.toFixed(2)}
                            </td>
                            <td className={`text-right ${bitcoinPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {bitcoinPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}{bitcoinPerformance.performance['20Y'].changePercent}%
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
                <p className="text-xs text-neutral-500 text-center mt-2">Earliest price data is {new Date(earliestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
              )}
              <p className="text-xs text-neutral-400 text-center mt-2">goldbug.org - {new Date().toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' })} NY Time</p>
            </div>
          </CardContent>
        </Card>
  
      </div>
    </MainLayout>
  );
}
