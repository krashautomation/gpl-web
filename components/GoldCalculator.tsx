'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Quote {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
}

interface GoldCalculatorProps {
  symbol?: string;
  title?: string;
}

export function GoldCalculator({
  symbol = 'GC=F',
  title = 'Gold Price Calculator',
}: GoldCalculatorProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [unit, setUnit] = useState('oz');
  const [numberOfUnits, setNumberOfUnits] = useState('1');

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const key = process.env.NEXT_PUBLIC_YAHOO_API_KEY;
        if (!key) return;
        const res = await fetch(
          `/api/quotes?symbols=${symbol},EURUSD=X,GBPUSD=X,AUDUSD=X,CADUSD=X&key=${key}`
        );
        const data = await res.json();
        if (data.success) {
          setQuotes(data.quotes);
        }
      } catch (err) {
        console.error('Failed to fetch quotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [symbol]);

  const goldQuote = quotes.find(q => q.symbol === symbol);
  const eurRate = quotes.find(q => q.symbol === 'EURUSD=X')?.price || 0.92;
  const gbpRate = quotes.find(q => q.symbol === 'GBPUSD=X')?.price || 0.79;
  const audRate = quotes.find(q => q.symbol === 'AUDUSD=X')?.price || 1.53;
  const cadRate = quotes.find(q => q.symbol === 'CADUSD=X')?.price || 1.35;

  const getConvertedPrice = () => {
    if (!goldQuote) return 0;
    let price = goldQuote.price;
    switch (currency) {
      case 'EUR':
        price = price / eurRate;
        break;
      case 'GBP':
        price = price / gbpRate;
        break;
      case 'AUD':
        price = price / audRate;
        break;
      case 'CAD':
        price = price / cadRate;
        break;
    }
    if (unit === 'gr') {
      price = price / 31.1035;
    }
    return price;
  };

  const pricePerUnit = getConvertedPrice();
  const totalValue = parseFloat(numberOfUnits || '0') * pricePerUnit;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-600">
          Calculate values in USD, EUR, GBP, CAD, AUD in ounces or grams.
        </p>
      </CardHeader>
      <CardContent>
        {loading && <p>Loading...</p>}
        {!loading && goldQuote && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <span className="text-3xl font-bold">{pricePerUnit.toFixed(2)}</span>
                <span className="text-gray-600 ml-2">
                  {currency}/{unit}
                </span>
              </div>
              <div
                className={`flex items-center ${goldQuote.change < 0 ? 'text-red-500' : 'text-green-500'}`}
              >
                <span className="text-lg">
                  {goldQuote.change < 0 ? '▼' : '▲'} {Math.abs(goldQuote.change).toFixed(2)} (
                  {goldQuote.changePercent}%)
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="AUD">AUD</SelectItem>
                  <SelectItem value="CAD">CAD</SelectItem>
                </SelectContent>
              </Select>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="oz">oz</SelectItem>
                  <SelectItem value="gr">gr</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-2">
                How much is your {title.toLowerCase().includes('gold') ? 'gold' : 'metal'} worth?
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Number of units</label>
                  <Input
                    type="number"
                    value={numberOfUnits}
                    onChange={e => setNumberOfUnits(e.target.value)}
                    placeholder="Enter number"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              {numberOfUnits && parseFloat(numberOfUnits) > 0 && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                  <div className="flex justify-between">
                    <span>Total value:</span>
                    <span className="text-xl font-bold">
                      {currency} {totalValue.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
