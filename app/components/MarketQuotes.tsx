'use client';

import { useEffect, useState } from 'react';

type Quote = {
  symbol: string;
  price: number;
  change: number;
  changePercent: string;
  previousClose: number;
  timestamp: string;
};

export default function MarketQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch(`/api/quotes`);

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

    // Optional: refresh every 5 minutes
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading market data...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h2>Market Quotes</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {quotes.map((q) => (
          <li key={q.symbol} style={{ marginBottom: '12px' }}>
            <strong>{q.symbol}</strong>: ${q.price.toFixed(2)}{' '}
            <span
              style={{
                color: Number(q.changePercent) >= 0 ? 'green' : 'red',
                fontWeight: 'bold',
              }}
            >
              {Number(q.changePercent) >= 0 ? '+' : ''}
              {q.changePercent}%
            </span>
            <small> (prev: ${q.previousClose.toFixed(2)})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
