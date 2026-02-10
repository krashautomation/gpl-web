import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ success: false, error: 'Symbol parameter is required' }, { status: 400 });
  }

  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const yahoo = new YahooFinance();

    const queryOptions = {
      period1: sevenDaysAgo.toISOString().split('T')[0],
      period2: now.toISOString().split('T')[0],
      interval: '1d' as const,
    };

    const result = await yahoo.chart(symbol, queryOptions);

    if (!result.quotes || result.quotes.length === 0) {
      return NextResponse.json({ success: false, error: 'No chart data found for the symbol' }, { status: 404 });
    }

    const chartData = result.quotes.map((quote) => ({
      time: quote.date.toISOString().split('T')[0], // YYYY-MM-DD
      value: quote.close,
    }));

    return NextResponse.json({ success: true, chartData });
  } catch (error) {
    console.error('Yahoo Finance API error:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch chart data' }, { status: 500 });
  }
}
