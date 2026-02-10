// app/api/quotes/route.js

import { NextResponse } from 'next/server';
const YahooFinance = require('yahoo-finance2').default;

const yahooFinance = new YahooFinance({
  suppressNotices: ['yahooSurvey'],
});

// Read secret key from environment variable (set in .env.local locally and in Vercel dashboard)
const ALLOWED_KEY = process.env.YAHOO2_API_KEY;

if (!ALLOWED_KEY) {
  console.error('YAHOO2_API_KEY is not set in environment variables!');
}

const symbols = ['GC=F', 'SI=F', '^GSPC', '^DJI', 'PA=F', 'PL=F', 'HG=F', 'ALI=F' ];

export async function GET(request) {
  // Get the key from query string: ?key=your-secret-value
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  // Simple authorization check
  if (!key || key !== ALLOWED_KEY) {
    return NextResponse.json({
      success: false,
      error: 'Unauthorized – Invalid or missing API key',
    }, { status: 401 });
  }

  try {
    const quotes = await Promise.all(
      symbols.map(async (symbol) => {
        const q = await yahooFinance.quote(symbol);

        return {
          symbol,
          price: q.regularMarketPrice,
          change: q.regularMarketChange,
          changePercent: q.regularMarketChangePercent?.toFixed(2) || '0.00',
          previousClose: q.regularMarketPreviousClose,
          timestamp: q.regularMarketTime,
        };
      })
    );

    return NextResponse.json({
      success: true,
      quotes,
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to fetch market data',
    }, { status: 500 });
  }
}
