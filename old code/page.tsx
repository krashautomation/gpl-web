'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BullionVaultChart from '@/components/BullionVaultChart';
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

export default function Home() {
  const [goldCurrency, setGoldCurrency] = useState('USD');
  const [silverCurrency, setSilverCurrency] = useState('USD');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartLoading, setChartLoading] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);
  const [gold12MData, setGold12MData] = useState<ChartData[]>([]);
  const [gold12MLoading, setGold12MLoading] = useState(true);
  const [gold12MError, setGold12MError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await fetch('/api/chart?symbol=GC=F');
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
        
        console.log('Fetched and formatted chart data:', formattedData);
        setChartData(formattedData);
      } catch (err: any) {
        setChartError(err.message || 'Failed to load chart data');
        console.error(err);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, []);

  useEffect(() => {
    const fetchGold12M = async () => {
      try {
        const res = await fetch('/api/chart?symbol=GC=F&range=12M');
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
        
        setGold12MData(formattedData);
      } catch (err: any) {
        setGold12MError(err.message || 'Failed to load 12M chart data');
        console.error(err);
      } finally {
        setGold12MLoading(false);
      }
    };

    fetchGold12M();
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

  const goldQuote = quotes.find((q) => q.symbol === 'GC=F');
  const silverQuote = quotes.find((q) => q.symbol === 'SI=F');
  const platinumQuote = quotes.find((q) => q.symbol === 'PL=F');
  const palladiumQuote = quotes.find((q) => q.symbol === 'PA=F');
  const copperQuote = quotes.find((q) => q.symbol === 'HG=F');
  const aluminumQuote = quotes.find((q) => q.symbol === 'ALI=F');

  console.log('Chart data state:', chartData);



  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {goldQuote && (
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{goldQuote.price.toFixed(2)}</div>
                  <div className={`flex items-center ${goldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {goldQuote.change < 0 ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
                    <span className="text-xl font-semibold">{goldQuote.change.toFixed(2)}</span>
                  </div>
                  <span className={`${Number(goldQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}>{goldQuote.changePercent}%</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              <Select value="Gold" onValueChange={() => {}}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gold">Gold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={goldCurrency} onValueChange={setGoldCurrency}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Select value="oz" onValueChange={() => {}}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
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
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {silverQuote && (
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{silverQuote.price.toFixed(2)}</div>
                  <div className={`flex items-center ${silverQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                    {silverQuote.change < 0 ? <ArrowDown className="h-5 w-5" /> : <ArrowUp className="h-5 w-5" />}
                    <span className="text-xl font-semibold">{silverQuote.change.toFixed(2)}</span>
                  </div>
                  <span className={`${Number(silverQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}>{silverQuote.changePercent}%</span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              <Select value="Silver" onValueChange={() => {}}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Silver">Silver</SelectItem>
                </SelectContent>
              </Select>
              <Select value={silverCurrency} onValueChange={setSilverCurrency}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Select value="oz" onValueChange={() => {}}>
                <SelectTrigger className="w-24 bg-neutral-800 border-neutral-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oz">oz</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Gold Price</CardTitle>
              <div className="flex items-center gap-2 text-sm text-white">
              <span>1 Year Chart</span>
                     </div>
            <div className="flex items-center gap-2 text-sm text-white">
              <span>Current Price: </span><span>USD 5039.72</span>
              <span className="text-red-500">▼ 15.64 -0.31%</span>
            </div>
          </CardHeader>
          <CardContent>
            {gold12MLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
            {gold12MError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{gold12MError}</div>}
            {!gold12MLoading && !gold12MError && <LightweightChart data={gold12MData} />}
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-neutral-300">Other Metals</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold text-neutral-400 mb-2">Other Precious Metals</h3>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-2 font-semibold">Name</th>
                  <th className="text-right py-2 font-semibold">Price</th>
                  <th className="text-right py-2 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {silverQuote && (
                  <tr className="border-b border-neutral-800">
                    <td className="py-2">Silver</td>
                    <td className="text-right">${silverQuote.price.toFixed(2)}</td>
                    <td className={`text-right ${silverQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {silverQuote.change.toFixed(2)} ({silverQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {palladiumQuote && (
                  <tr className="border-b border-neutral-800">
                    <td className="py-2">Palladium</td>
                    <td className="text-right">${palladiumQuote.price.toFixed(2)}</td>
                    <td className={`text-right ${palladiumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {palladiumQuote.change.toFixed(2)} ({palladiumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {platinumQuote && (
                  <tr>
                    <td className="py-2">Platinum</td>
                    <td className="text-right">${platinumQuote.price.toFixed(2)}</td>
                    <td className={`text-right ${platinumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {platinumQuote.change.toFixed(2)} ({platinumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <h3 className="text-lg font-semibold text-neutral-400 mb-2">Base Metals</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-700">
                  <th className="text-left py-2 font-semibold">Name</th>
                  <th className="text-right py-2 font-semibold">Price</th>
                  <th className="text-right py-2 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {copperQuote && (
                  <tr className="border-b border-neutral-800">
                    <td className="py-2">Copper</td>
                    <td className="text-right">${copperQuote.price.toFixed(2)}</td>
                    <td className={`text-right ${copperQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {copperQuote.change.toFixed(2)} ({copperQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {aluminumQuote && (
                  <tr>
                    <td className="py-2">Aluminum</td>
                    <td className="text-right">${aluminumQuote.price.toFixed(2)}</td>
                    <td className={`text-right ${aluminumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {aluminumQuote.change.toFixed(2)} ({aluminumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-yellow-500">Gold Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="text-left py-2 text-sm font-semibold">Change</th>
                    <th className="text-right py-2 text-sm font-semibold">Amount</th>
                    <th className="text-right py-2 text-sm font-semibold">%</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">Today</td>
                    <td className="text-right text-red-500">-15.64</td>
                    <td className="text-right text-red-500">-0.31%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">30 Days</td>
                    <td className="text-right text-green-500">+449.98</td>
                    <td className="text-right text-green-500">+9.77%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">6 Months</td>
                    <td className="text-right text-green-500">+1,711.26</td>
                    <td className="text-right text-green-500">+51.17%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">1 Year</td>
                    <td className="text-right text-green-500">+2,151.06</td>
                    <td className="text-right text-green-500">+74.06%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">5 Year</td>
                    <td className="text-right text-green-500">+3,229.67</td>
                    <td className="text-right text-green-500">+176.90%</td>
                  </tr>
                  <tr>
                    <td className="py-3">20 Years</td>
                    <td className="text-right text-green-500">+4,504.14</td>
                    <td className="text-right text-green-500">+817.11%</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-neutral-400 text-center mt-4">goldbug.org - 00:58 NY Time</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-neutral-300">Silver Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-700">
                    <th className="text-left py-2 text-sm font-semibold">Change</th>
                    <th className="text-right py-2 text-sm font-semibold">Amount</th>
                    <th className="text-right py-2 text-sm font-semibold">%</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">Today</td>
                    <td className="text-right text-red-500">-0.95</td>
                    <td className="text-right text-red-500">-1.15%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">30 Days</td>
                    <td className="text-right text-red-500">-2.64</td>
                    <td className="text-right text-red-500">-3.11%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">6 Months</td>
                    <td className="text-right text-green-500">+44.83</td>
                    <td className="text-right text-green-500">+118.92%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">1 Year</td>
                    <td className="text-right text-green-500">+50.57</td>
                    <td className="text-right text-green-500">+158.29%</td>
                  </tr>
                  <tr className="border-b border-neutral-800">
                    <td className="py-3">5 Year</td>
                    <td className="text-right text-green-500">+55.55</td>
                    <td className="text-right text-green-500">+205.97%</td>
                  </tr>
                  <tr>
                    <td className="py-3">20 Years</td>
                    <td className="text-right text-green-500">+73.14</td>
                    <td className="text-right text-green-500">+779.28%</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-neutral-400 text-center mt-4">goldbug.org - 00:58 NY Time</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-900 border-neutral-800 mb-8">
        <CardHeader>
          <CardTitle className="text-yellow-500">Yahoo Gold Chart</CardTitle>
        </CardHeader>
        <CardContent>
          {chartLoading && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>Loading chart...</div>}
          {chartError && <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }} className="text-red-500">{chartError}</div>}
          {!chartLoading && !chartError && (
            <>
              <LightweightChart data={chartData} />
              <div className="mt-4 overflow-auto max-h-48">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-neutral-700">
                      <th className="text-left py-1 px-2 font-semibold">Time</th>
                      <th className="text-right py-1 px-2 font-semibold">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chartData.map((d, i) => (
                      <tr key={i} className="border-b border-neutral-800">
                        <td className="py-1 px-2">{d.time}</td>
                        <td className="text-right py-1 px-2">{d.value.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card className="bg-neutral-900 border-neutral-800 mb-8">
        <CardHeader>
          <CardTitle className="text-sm text-neutral-400">Debug: Chart Data Prop</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-neutral-950 p-4 rounded-md overflow-auto max-h-60">
            <code>
              {JSON.stringify(chartData, null, 2)}
            </code>
          </pre>
        </CardContent>
      </Card>
      
      <Card className="bg-neutral-900 border-neutral-800 mb-8">
        <CardHeader>
          <CardTitle className="text-yellow-500 text-2xl">GOLD PRICE CALCULATORS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <DollarSign className="h-32 w-32 text-yellow-500" />
              </div>
              <div className="space-y-2">
                <ul className="space-y-1.5 text-sm">
                  <li><a href="#" className="text-yellow-500 hover:underline">How much is your gold worth?</a></li>
                  <li><a href="#" className="text-yellow-500 hover:underline">How much was your gold worth when you bought it?</a></li>
                  <li><a href="#" className="text-yellow-500 hover:underline">How much profit have you made on your gold?</a></li>
                  <li><a href="#" className="text-yellow-500 hover:underline">How much is any gold coin worth in any currency?</a></li>
                  <li><a href="#" className="text-yellow-500 hover:underline">All major exchange rates</a></li>
                  <li><a href="#" className="text-yellow-500 hover:underline">How much is your scrap gold worth?</a></li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <ul className="space-y-1.5 text-sm">
                <li><a href="#" className="text-yellow-500 hover:underline">How much is any Karat of your gold jewelry worth?</a></li>
                <li><a href="#" className="text-yellow-500 hover:underline">What change should you give in gold coins?</a></li>
                <li><a href="#" className="text-yellow-500 hover:underline">How much gold can you buy with your currency?</a></li>
                <li><a href="#" className="text-yellow-500 hover:underline">How much is your gold worth in any currency?</a></li>
                <li><a href="#" className="text-yellow-500 hover:underline">Convert between ounces, grams and kilos</a></li>
                <li><a href="#" className="text-yellow-500 hover:underline">How much will you pay to buy or sell gold?</a></li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-900 to-blue-950 border-blue-800">
          <CardContent className="p-8">
            <div className="text-center mb-4">
              <div className="inline-block bg-blue-800 rounded-lg p-6 mb-4">
                <div className="text-6xl">📱</div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-blue-300">GOLD PRICE IPHONE APP</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• All charts from goldbug.org available on iPhone.</li>
              <li>• Live gold and silver price tickers in all national currencies.</li>
              <li>• Save your favorite charts and view in one convenient place.</li>
              <li>• Buy gold from a premier online gold bullion dealer.</li>
              <li>• Read the latest financial news impacting gold prices.</li>
            </ul>
            <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">App Store</Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900 to-green-950 border-green-800">
          <CardContent className="p-8">
            <div className="text-center mb-4">
              <div className="inline-block bg-green-800 rounded-lg p-6 mb-4">
                <div className="text-6xl">📱</div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-green-300">GOLD PRICE ANDROID APP</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li>• All charts from goldbug.org available on Android.</li>
              <li>• Live gold and silver price tickers in all national currencies.</li>
              <li>• Save your favorite charts and view in one convenient place.</li>
              <li>• Buy gold from a premier online gold bullion dealer.</li>
              <li>• Read the latest financial news impacting gold prices.</li>
            </ul>
            <Button className="w-full mt-6 bg-green-600 hover:bg-green-700">Google Play</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
