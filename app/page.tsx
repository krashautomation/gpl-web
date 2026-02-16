'use client';

import { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
import RecentArticlesSection from './components/RecentArticlesSection';
import Image from 'next/image';

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
  const [goldPerformance, setGoldPerformance] = useState<any>(null);
  const [goldPerfLoading, setGoldPerfLoading] = useState(true);
  const [goldPerfError, setGoldPerfError] = useState<string | null>(null);
  const [numberOfUnits, setNumberOfUnits] = useState<string>('1');
  const [goldUnit, setGoldUnit] = useState<string>('oz');
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

        const formattedData = data.chartData.map((item: { time: any; value: any }) => ({
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

        const formattedData = data.chartData.map((item: { time: any; value: any }) => ({
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

  const goldQuote = quotes.find(q => q.symbol === 'GC=F');
  const silverQuote = quotes.find(q => q.symbol === 'SI=F');
  const platinumQuote = quotes.find(q => q.symbol === 'PL=F');
  const palladiumQuote = quotes.find(q => q.symbol === 'PA=F');
  const copperQuote = quotes.find(q => q.symbol === 'HG=F');
  const aluminumQuote = quotes.find(q => q.symbol === 'ALI=F');

  // Exchange rates (all quoted as USD per unit of foreign currency)
  const eurUsdRate = quotes.find(q => q.symbol === 'EURUSD=X')?.price || 1.08;
  const gbpUsdRate = quotes.find(q => q.symbol === 'GBPUSD=X')?.price || 1.26;
  const audUsdRate = quotes.find(q => q.symbol === 'AUDUSD=X')?.price || 0.65;
  const cadUsdRate = quotes.find(q => q.symbol === 'CADUSD=X')?.price || 0.74;

  // Conversion function
  const getConvertedPrice = () => {
    if (!goldQuote) return 0;

    let priceInUsd = goldQuote.price;

    // Convert to selected currency
    switch (goldCurrency) {
      case 'EUR':
        priceInUsd = priceInUsd / eurUsdRate;
        break;
      case 'GBP':
        priceInUsd = priceInUsd / gbpUsdRate;
        break;
      case 'AUD':
        priceInUsd = priceInUsd / audUsdRate;
        break;
      case 'CAD':
        priceInUsd = priceInUsd / cadUsdRate;
        break;
      default: // USD
        break;
    }

    // Convert to grams if selected
    if (goldUnit === 'gr') {
      priceInUsd = priceInUsd / 31.1035;
    }

    return priceInUsd;
  };

  const convertedPrice = getConvertedPrice();
  const totalValue = parseFloat(numberOfUnits || '0') * convertedPrice;

  return (



    <MainLayout>

<div className="flex items-center justify-center mb-6">
  <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
    Gold Price Live
  </h1>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="">Gold Price Live USD</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-900">
              <span>1 Year Chart</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-900">
              <span>Current Price: </span>
              <span>USD 5039.72</span>
              <span className="text-red-500">▼ 15.64 -0.31%</span>
            </div>
          </CardHeader>
          <CardContent>
            {gold12MLoading && (
              <div style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}>
                Loading chart...
              </div>
            )}
            {gold12MError && (
              <div
                style={{ height: '300px', textAlign: 'center', paddingTop: '120px' }}
                className="text-red-500"
              >
                {gold12MError}
              </div>
            )}
            {!gold12MLoading && !gold12MError && <LightweightChart data={gold12MData} />}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="">Gold Price Performance USD</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {goldPerfLoading && (
                <div className="text-center py-8">Loading performance data...</div>
              )}
              {goldPerfError && (
                <div className="text-center py-8 text-red-500">{goldPerfError}</div>
              )}
              {!goldPerfLoading && !goldPerfError && goldPerformance && (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 text-sm font-semibold">Change</th>
                      <th className="text-right py-2 text-sm font-semibold">Amount</th>
                      <th className="text-right py-2 text-sm font-semibold">%</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {goldQuote && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3">Today</td>
                        <td
                          className={`text-right ${goldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldQuote.change >= 0 ? '+' : ''}
                          {goldQuote.change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${Number(goldQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {Number(goldQuote.changePercent) >= 0 ? '+' : ''}
                          {goldQuote.changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['30D'] && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3">30 Days</td>
                        <td
                          className={`text-right ${goldPerformance.performance['30D'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['30D'].change >= 0 ? '+' : ''}
                          {goldPerformance.performance['30D'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${goldPerformance.performance['30D'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['30D'].changePercent >= 0 ? '+' : ''}
                          {goldPerformance.performance['30D'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['6M'] && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3">6 Months</td>
                        <td
                          className={`text-right ${goldPerformance.performance['6M'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['6M'].change >= 0 ? '+' : ''}
                          {goldPerformance.performance['6M'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${goldPerformance.performance['6M'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['6M'].changePercent >= 0 ? '+' : ''}
                          {goldPerformance.performance['6M'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['1Y'] && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3">1 Year</td>
                        <td
                          className={`text-right ${goldPerformance.performance['1Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['1Y'].change >= 0 ? '+' : ''}
                          {goldPerformance.performance['1Y'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${goldPerformance.performance['1Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['1Y'].changePercent >= 0 ? '+' : ''}
                          {goldPerformance.performance['1Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['5Y'] && (
                      <tr className="border-b border-gray-100">
                        <td className="py-3">5 Year</td>
                        <td
                          className={`text-right ${goldPerformance.performance['5Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['5Y'].change >= 0 ? '+' : ''}
                          {goldPerformance.performance['5Y'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${goldPerformance.performance['5Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['5Y'].changePercent >= 0 ? '+' : ''}
                          {goldPerformance.performance['5Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                    {goldPerformance.performance && goldPerformance.performance['20Y'] && (
                      <tr>
                        <td className="py-3">20 Years</td>
                        <td
                          className={`text-right ${goldPerformance.performance['20Y'].change < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['20Y'].change >= 0 ? '+' : ''}
                          {goldPerformance.performance['20Y'].change.toFixed(2)}
                        </td>
                        <td
                          className={`text-right ${goldPerformance.performance['20Y'].changePercent < 0 ? 'text-red-500' : 'text-green-500'}`}
                        >
                          {goldPerformance.performance['20Y'].changePercent >= 0 ? '+' : ''}
                          {goldPerformance.performance['20Y'].changePercent}%
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              <p className="text-xs text-gray-800 text-center mt-4">
              
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" id="foreign-currency">
        <Card className="p-0">
          <CardHeader>
            <CardTitle className="">Gold Price Calculator</CardTitle>

            <div className="flex items-center gap-2 text-sm text-gray-900">
              <span>
                Calculate World Gold Prices in: USD, GBP, CAD, EUR, AUD in grams or ounces.
              </span>
            </div>
          </CardHeader>
          <CardContent className="">
            <div className="flex items-center justify-between mb-4">
              {loading && <p>Loading...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {goldQuote && (
                <div className="flex items-center gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{convertedPrice.toFixed(2)}</span>
                    <span className="text-sm text-gray-600">
                      {goldCurrency}/{goldUnit}
                    </span>
                  </div>
                  <div
                    className={`flex items-center ${goldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                  >
                    {goldQuote.change < 0 ? (
                      <ArrowDown className="h-5 w-5" />
                    ) : (
                      <ArrowUp className="h-5 w-5" />
                    )}
                    <span className="text-xl font-semibold">{goldQuote.change.toFixed(2)}</span>
                  </div>
                  <span
                    className={`${Number(goldQuote.changePercent) < 0 ? 'text-red-500' : 'text-green-500'} text-lg`}
                  >
                    {goldQuote.changePercent}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2 mb-4">
              <Select value="Gold" onValueChange={() => {}}>
                <SelectTrigger className="w-24 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gold">Gold</SelectItem>
                </SelectContent>
              </Select>
              <Select value={goldCurrency} onValueChange={setGoldCurrency}>
                <SelectTrigger className="w-24 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
              <Select value={goldUnit} onValueChange={setGoldUnit}>
                <SelectTrigger className="w-24 bg-white border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="gr">gr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold  mb-4">
                How much is your gold worth?
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Number of units</label>
                  <Input
                    type="number"
                    value={numberOfUnits}
                    onChange={e => setNumberOfUnits(e.target.value)}
                    className="bg-white border-gray-300 text-gray-900"
                    placeholder="Enter number of units"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              {goldQuote && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                    <span className="">Price per {goldUnit}:</span>
                    <span className="text-lg font-semibold ">
                      {goldCurrency} {convertedPrice.toFixed(2)}
                    </span>
                  </div>
                  {numberOfUnits && parseFloat(numberOfUnits) > 0 && (
                    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                      <span className="">Total value:</span>
                      <span className="text-2xl font-bold ">
                        {goldCurrency} {totalValue.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="">Other Metals</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold  mb-2">Other Precious Metals</h3>
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold">Name</th>
                  <th className="text-right py-2 font-semibold">Price</th>
                  <th className="text-right py-2 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {silverQuote && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Silver</td>
                    <td className="text-right">${silverQuote.price.toFixed(2)}</td>
                    <td
                      className={`text-right ${silverQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {silverQuote.change.toFixed(2)} ({silverQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {palladiumQuote && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Palladium</td>
                    <td className="text-right">${palladiumQuote.price.toFixed(2)}</td>
                    <td
                      className={`text-right ${palladiumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {palladiumQuote.change.toFixed(2)} ({palladiumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {platinumQuote && (
                  <tr>
                    <td className="py-2">Platinum</td>
                    <td className="text-right">${platinumQuote.price.toFixed(2)}</td>
                    <td
                      className={`text-right ${platinumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {platinumQuote.change.toFixed(2)} ({platinumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <h3 className="text-lg font-semibold mb-2">Base Metals</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 font-semibold">Name</th>
                  <th className="text-right py-2 font-semibold">Price</th>
                  <th className="text-right py-2 font-semibold">Change</th>
                </tr>
              </thead>
              <tbody>
                {copperQuote && (
                  <tr className="border-b border-gray-100">
                    <td className="py-2">Copper</td>
                    <td className="text-right">${copperQuote.price.toFixed(2)}</td>
                    <td
                      className={`text-right ${copperQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {copperQuote.change.toFixed(2)} ({copperQuote.changePercent}%)
                    </td>
                  </tr>
                )}
                {aluminumQuote && (
                  <tr>
                    <td className="py-2">Aluminum</td>
                    <td className="text-right">${aluminumQuote.price.toFixed(2)}</td>
                    <td
                      className={`text-right ${aluminumQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {aluminumQuote.change.toFixed(2)} ({aluminumQuote.changePercent}%)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Articles Section */}
      <RecentArticlesSection />
<div className="grid grid-cols-1 gap-6">
  {/* FAQ Card - full 100% width */}
  <Card className="h-full w-full">
    <CardHeader>
      <CardTitle className="text-2xl">GOLD PRICE FAQ</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-6">
        {/* Two-column layout for FAQ items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1 items */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm">How much is your gold worth?</p>
              <p className="text-sm mt-1">
                Multiply your gold's weight (in troy ounces or grams) by current spot price, adjusted for purity (e.g., 24K = 100%). Example: 1 oz pure gold ≈ $5,040 USD. Provide weight/purity for exact calc.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much was your gold worth when you bought it?</p>
              <p className="text-sm mt-1">
                Depends on purchase date, amount, and historical spot + premiums paid. Check receipt/history and compare to spot price then.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much profit have you made on your gold?</p>
              <p className="text-sm mt-1">
                Profit = current value − original cost (incl. fees/premiums). Subtract what you paid from today's spot-adjusted value.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much is any gold coin worth in any currency?</p>
              <p className="text-sm mt-1">
                Bullion coins (e.g., Maple Leaf, Eagle) ≈ spot + 3–8% premium. 1 oz pure ≈ $5,040–5,100 USD. Rare/collectible coins higher.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">All major exchange rates</p>
              <p className="text-sm mt-1">
                Use a live converter for current rates (e.g., USD to EUR, GBP, etc.). Gold is typically priced in USD globally.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much is your scrap gold worth?</p>
              <p className="text-sm mt-1">
                Weight × purity × spot price, minus 10–30% dealer/refining fee. Example: 10g 14K (58.3% pure) ≈ $945 USD spot value, but ~$660–850 received.
              </p>
            </div>
          </div>

          {/* Column 2 items */}
          <div className="space-y-6">
            <div>
              <p className="font-bold text-sm">How much is any Karat of your gold jewelry worth?</p>
              <p className="text-sm mt-1">
                Per gram (spot basis, approx.): 24K ≈ $162 USD • 22K ≈ $148 USD • 18K ≈ $122 USD • 14K ≈ $95 USD • 10K ≈ $68 USD. Resale often lower due to fees/markup.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">What change should you give in gold coins?</p>
              <p className="text-sm mt-1">
                Rare in practice—gold coins aren't used for small change due to value/premiums. Use fiat currency for everyday transactions.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much gold can you buy with your currency?</p>
              <p className="text-sm mt-1">
                Divide amount by spot price per unit + premium. E.g., $1,000 USD buys ≈ 0.198 oz pure gold at spot (less after fees).
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much is your gold worth in any currency?</p>
              <p className="text-sm mt-1">
                Gold is priced in USD spot; convert using current exchange rates. Example: 1 oz ≈ $5,040 USD.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">Convert between ounces, grams and kilos</p>
              <p className="text-sm mt-1">
                1 troy oz = 31.1035 g • 1 kg = 32.1507 troy oz • Grams to oz: ÷ 31.1035 • Oz to grams: × 31.1035.
              </p>
            </div>

            <div>
              <p className="font-bold text-sm">How much will you pay to buy or sell gold?</p>
              <p className="text-sm mt-1">
                Buy: spot + 3–10% premium (higher for small/jewelry) + taxes. Sell: spot minus 5–30% (less for bullion, more for scrap). Local dealers vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  {/* Gold Price Live App card - max 700px wide, centered */}
  <Card className="bg-amber-100 border-amber-300 h-full max-w-[700px] mx-auto w-full">
    <CardContent className="p-8">
      <div className="text-center mb-4">
        <div className="inline-block bg-amber-200 rounded-lg p-6 mb-3">
          <div className="flex-shrink-0">
            <Image
              src="/images/app-mockup.png"
              alt="Gold Price Live App"
              width={283}
              height={250}
              priority={false}
              className="shadow-lg rounded"
            />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">GOLD PRICE LIVE APP</h3>
        <p>(coming soon)</p>
      </div>
      <ul className="space-y-2 text-sm">
        <li>• Gold price charts available on Android.</li>
        <li>• Live gold and silver price tickers.</li>
        <li>• Buy gold from a premier online gold bullion dealer.</li>
        <li>• Read the latest financial news impacting gold prices.</li>
      </ul>
      <div className="text-center mt-3">
        <div className="inline-block rounded-lg">
          <div className="flex-shrink-0">
            <Image
              src="/images/goldprice-googleplay.png"
              alt="Gold Price Live App"
              width={180}
              height={55}
              priority={false}
              className="shadow-lg rounded"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
    </MainLayout>
  );
}
