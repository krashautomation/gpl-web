# Gold Price Live

This is a Next.js application that displays live gold and silver prices.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project uses a proxy API to fetch data from the Yahoo Finance API. To run the application, you need to create a `.env.local` file in the root of the project and add the following environment variables:

```
NEXT_PUBLIC_YAHOO_API_KEY=your-secret-value
YAHOO2_API_KEY=your-secret-value
```

Replace `your-secret-value` with your actual Yahoo Finance API key. The `NEXT_PUBLIC_YAHOO_API_KEY` is used on the client-side to authorize with the proxy, and the `YAHOO2_API_KEY` is used on the server-side by the proxy to fetch data from the Yahoo Finance API. Make sure these two keys are the same.

## API Route

The API route for fetching market data is located at `app/api/quotes/route.js`. It fetches data for the following symbols: 'GC=F' (Gold), 'SI=F' (Silver), '^GSPC' (S&P 500), and '^DJI' (Dow Jones Industrial Average).
