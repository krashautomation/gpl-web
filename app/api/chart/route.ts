import { NextResponse } from 'next/server';
import YahooFinance from 'yahoo-finance2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');
  const range = searchParams.get('range') || '7D';
  const type = searchParams.get('type') || 'chart';

  if (!symbol) {
    return NextResponse.json({ success: false, error: 'Symbol parameter is required' }, { status: 400 });
  }

  if (!['chart', 'performance'].includes(type)) {
    return NextResponse.json({ success: false, error: 'Type must be chart or performance' }, { status: 400 });
  }

  const yahoo = new YahooFinance();

  try {
    if (type === 'performance') {
      // Fetch current quote for latest price
      const quote = await yahoo.quote(symbol);
      const currentPrice = quote.regularMarketPrice;

      // Calculate dates for each period
      const now = new Date();
      const periods = {
        '30D': new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
        '6M': new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000),
        '1Y': new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000),
        '2Y': new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000),
        '3Y': new Date(now.getTime() - 3 * 365 * 24 * 60 * 60 * 1000),
        '5Y': new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000),
        '20Y': new Date(now.getTime() - 20 * 365 * 24 * 60 * 60 * 1000),
      };

      // Fetch historical data for each period
      const performance: Record<string, { price: number; change: number; changePercent: number } | null> = {};
      let earliestDate: string | null = null;

      for (const [period, date] of Object.entries(periods)) {
        try {
          // Fetch a small window around the target date to ensure we get data
          const startDate = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
          const endDate = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);

          const queryOptions = {
            period1: startDate.toISOString().split('T')[0],
            period2: endDate.toISOString().split('T')[0],
            interval: '1d' as const,
          };

          const result = await yahoo.chart(symbol, queryOptions);

          if (result.quotes && result.quotes.length > 0) {
            // Find the closest quote to our target date
            const targetTime = date.getTime();
            let closestQuote = result.quotes[0];
            let minDiff = Math.abs(closestQuote.date.getTime() - targetTime);

            for (const quote of result.quotes) {
              const diff = Math.abs(quote.date.getTime() - targetTime);
              if (diff < minDiff) {
                minDiff = diff;
                closestQuote = quote;
              }
            }

            const historicalPrice = closestQuote.close;
            
            if (historicalPrice !== null && historicalPrice !== undefined) {
              const change = currentPrice - historicalPrice;
              const changePercent = (change / historicalPrice) * 100;

              performance[period] = {
                price: historicalPrice,
                change: Number(change.toFixed(2)),
                changePercent: Number(changePercent.toFixed(2)),
              };
            }
          }
        } catch (err: any) {
          // Check if this is a BadRequestError for missing data (e.g., Bitcoin 20Y)
          if (period === '20Y' && err.name === 'BadRequestError') {
            // Try to fetch earliest available data
            try {
              const earliestQuery = {
                period1: '1970-01-01',
                period2: now.toISOString().split('T')[0],
                interval: '1d' as const,
              };
              const earliestResult = await yahoo.chart(symbol, earliestQuery);
              if (earliestResult.quotes && earliestResult.quotes.length > 0) {
                const firstQuote = earliestResult.quotes[0];
                earliestDate = firstQuote.date.toISOString().split('T')[0];
                performance[period] = null; // Mark as unavailable
              }
            } catch {
              performance[period] = null;
            }
          } else {
            console.error(`Error fetching data for period ${period}:`, err);
          }
          // Continue with other periods even if one fails
        }
      }

      return NextResponse.json({
        success: true,
        symbol,
        currentPrice,
        performance,
        earliestDate,
      });
    }

    // Original chart logic
    if (!['7D', '12M'].includes(range)) {
      return NextResponse.json({ success: false, error: 'Range must be 7D or 12M' }, { status: 400 });
    }

    const now = new Date();
    let period1: Date;
    let interval: '1d' | '1wk';

    if (range === '7D') {
      period1 = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      interval = '1d';
    } else {
      period1 = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
      interval = '1wk';
    }

    const queryOptions = {
      period1: period1.toISOString().split('T')[0],
      period2: now.toISOString().split('T')[0],
      interval: interval,
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
