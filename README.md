# Gold Price Live

A comprehensive Next.js application for tracking live gold and silver prices with real-time charts, performance analytics, and educational content.

## Features

- **Live Price Tracking**: Real-time gold, silver, platinum, palladium, copper, aluminum prices plus Bitcoin and Ethereum
- **Interactive Charts**: 7-day and 12-month price charts with Lightweight Charts
- **Performance Analytics**: 30-day, 6-month, 1-year, 2-year, 3-year, 5-year, and 20-year performance metrics
- **Gold/Silver Ratio**: Historical ratio chart with performance comparison
- **ETF Tracking**: Gold ETFs (GLD, IAU, GLDM, SGOL) and Silver ETFs (SLV, SIVR, SIL, SILJ)
- **Gold Price History**: 100-year historical chart (macrotrends.net)
- **Gold Calculator**: Calculate gold value with multi-currency and unit conversion (oz/gr)
- **Currency Support**: USD, CAD, AUD, GBP, EUR with real-time exchange rates
- **Blog System**: SEO-optimized blog with MDX articles
- **Responsive Design**: Mobile-first design with dark theme

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Lightweight Charts
- **Data**: Yahoo Finance API

## Project Structure

```
gpl-web/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chart/route.ts        # Chart & performance data
│   │   └── quotes/route.ts       # Real-time price quotes
│   ├── layout.tsx               # Root layout with Google Analytics
│   ├── sitemap.ts               # Sitemap.xml generation
│   ├── robots.ts                # Robots.txt generation
│   └── [page routes]            # Page components
├── components/
│   ├── layout/                  # Header, Footer, MainLayout
│   ├── ui/                      # shadcn/ui components
│   └── LightweightChart.tsx
├── lib/
│   ├── articles.ts              # MDX article loader
│   ├── og-utils.ts              # OpenGraph image utilities
│   └── utils.ts                 # Utility functions
├── content/
│   └── articles/                # MDX article files
├── public/                      # Static assets
└── package.json
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://goldpricelive.co
NEXT_PUBLIC_YAHOO_API_KEY=your-yahoo-api-key
```

## Pages

| Page                | Route                  |
| ------------------- | ---------------------- |
| Home                | `/`                    |
| Gold Price          | `/gold-price`          |
| Silver Price        | `/silver-price`        |
| Platinum Price      | `/platinum-price`      |
| Palladium Price     | `/palladium-price`     |
| Copper Price        | `/copper-price`        |
| Aluminum Price      | `/aluminum-price`      |
| Bitcoin Price       | `/bitcoin-price`       |
| Ethereum Price      | `/ethereum-price`      |
| Gold ETFs           | `/gold-etfs`           |
| Silver ETFs         | `/silver-etfs`         |
| Gold Price History  | `/gold-price-history`  |
| Gold-Silver Ratio   | `/gold-silver-ratio`   |
| Charts              | `/charts`              |
| News                | `/news`                |
| About               | `/about`               |
| Contact             | `/contact`             |
| Privacy             | `/privacy`             |
| Terms of Service    | `/terms-of-service`    |
| Disclaimer          | `/disclaimer`          |
| Risk Warning        | `/risk-warning`        |
| Advertise           | `/advertise`           |
| Gold Price Live App | `/gold-price-live-app` |

## SEO

The application includes comprehensive SEO optimization:

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Generated at `/robots.txt`
- **Metadata**: Every page has optimized title, description, OpenGraph, and Twitter cards
- **Canonical URLs**: Configured per page
- **Google Analytics**: Integrated via next/script

## Blog System

Articles are stored as MDX files in `content/articles/`.

### Adding an Article

1. Create a new `.mdx` file in `content/articles/`
2. Add frontmatter:

```mdx
---
title: 'Your Article Title'
excerpt: 'Brief description for listings'
author: 'Author Name'
date: '2026-02-15'
category: 'Market Analysis'
tags: ['tag1', 'tag2']
featuredImage: '/blog/image.jpg'
readingTime: 5
seo:
  title: 'SEO Title'
  description: 'SEO Description'
  keywords: ['keyword1', 'keyword2']
---

Your article content here...
```

## Deployment

Deploy to Vercel:

```bash
# Push to GitHub
git add .
git commit -m "deploy"
git push

# Or deploy via Vercel CLI
vercel
```

### Environment Variables on Vercel

Add these in Vercel project settings:

- `NEXT_PUBLIC_SITE_URL` - Your domain
- `NEXT_PUBLIC_YAHOO_API_KEY` - Yahoo Finance API key

## License

MIT License
