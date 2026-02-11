# Gold Price Live

A comprehensive Next.js application for tracking live gold and silver prices with real-time charts, performance analytics, and educational content.

## Features

- **Live Price Tracking**: Real-time gold, silver, platinum, and palladium prices
- **Interactive Charts**: 7-day and 12-month price charts with Lightweight Charts
- **Performance Analytics**: 30-day, 6-month, 1-year, 5-year, and 20-year performance metrics
- **Gold Calculator**: Calculate gold value with multi-currency and unit conversion (oz/gr)
- **Currency Support**: USD, CAD, AUD, GBP, EUR with real-time exchange rates
- **Blog System**: SEO-optimized blog with categories and related posts
- **Responsive Design**: Mobile-first design with dark theme

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Content Management**: Contentlayer with MDX
- **Charts**: Lightweight Charts
- **API**: Yahoo Finance

## Project Structure

```
gpl-web/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chart/route.ts        # Chart & performance data
│   │   └── quotes/route.js       # Real-time price quotes
│   ├── charts/page.tsx           # Charts overview
│   ├── faq/page.tsx              # FAQ page
│   ├── news/                     # News/Articles System
│   │   ├── [slug]/page.tsx       # Individual article pages
│   │   └── page.tsx              # News listing with category filter
│   ├── precious-metals/page.tsx  # Precious metals overview
│   ├── silver-price/page.tsx     # Silver price page
│   ├── layout.tsx                # Root layout
│   ├── metadata.ts               # SEO metadata config
│   ├── robots.ts                 # Robots.txt generation
│   └── sitemap.ts                # Sitemap.xml generation
│
├── components/
│   ├── layout/                   # Header, Footer, MainLayout
│   ├── ui/                       # shadcn/ui components (47 files)
│   ├── BullionVaultChart.tsx
│   └── LightweightChart.tsx
│
├── content/
│   └── articles/                 # MDX article files
│       ├── gold-price-predictions-2025.mdx
│       └── ... (9 articles)
│
├── lib/
│   └── utils.ts                  # Utility functions
│
├── contentlayer.config.ts      # Contentlayer configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── tsconfig.json               # TypeScript configuration
```

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

## API Routes

### Quotes API
**Route**: `app/api/quotes/route.js`

Fetches real-time market data for:
- `GC=F` - Gold
- `SI=F` - Silver
- `PA=F` - Palladium
- `PL=F` - Platinum
- `HG=F` - Copper
- `ALI=F` - Aluminum
- Currency pairs: EURUSD=X, GBPUSD=X, AUDUSD=X, CADUSD=X

### Chart API
**Route**: `app/api/chart/route.ts`

Supports two types of queries:
- **Chart data**: `/api/chart?symbol=GC=F&range=7D|12M`
- **Performance data**: `/api/chart?symbol=GC=F&type=performance`

Performance data returns metrics for 30D, 6M, 1Y, 5Y, and 20Y periods.

## SEO Features

The application includes comprehensive SEO optimization:

### Automatic SEO Generation
- **Sitemap** (`app/sitemap.ts`): Auto-generated XML sitemap at `/sitemap.xml`
- **Robots.txt** (`app/robots.ts`): Search engine crawling rules at `/robots.txt`
- **Metadata**: Every page has optimized meta tags

### SEO Implementation per Page
```typescript
export const metadata: Metadata = {
  title: 'Page Title | Gold Price Live',
  description: 'Detailed description for search engines',
  keywords: ['gold price', 'silver price', 'precious metals'],
  openGraph: {
    title: 'Social Media Title',
    description: 'Social Media Description',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Title',
    description: 'Twitter Description',
  },
  alternates: {
    canonical: 'https://goldpricelive.com/page-url',
  },
}
```

### Blog SEO
Each blog post includes:
- Dynamic metadata generation based on post content
- JSON-LD structured data
- Reading time estimates
- Category and tag optimization
- Related posts for internal linking

## Blog/News System

The blog system uses **Contentlayer** with MDX files for optimal developer experience and SEO.

### Features
- **Contentlayer**: Type-safe content management with auto-generated TypeScript types
- **MDX Format**: Write articles in Markdown with JSX support
- **Categories**: Market Analysis, Investment Guide, Education, Market News
- **Dynamic Routing**: `/news/[slug]` for individual posts
- **Category Filtering**: `/news?category=category-name` for filtered views
- **Related Posts**: Automatically shows related content
- **SEO Optimization**: Every post has unique metadata and Open Graph tags
- **Static Generation**: All articles pre-rendered at build time for optimal performance

### Creating a New Article

#### Step 1: Create MDX File
Create a new file in `content/articles/` with a URL-friendly filename:

```bash
# Example: Create article about gold mining stocks
touch content/articles/gold-mining-stocks-investment.mdx
```

#### Step 2: Add Frontmatter and Content

```mdx
---
title: "Investing in Gold Mining Stocks: Complete Guide"
excerpt: "Learn how to invest in gold mining companies and understand the risks and rewards compared to physical gold."
author: "Gold Price Live Team"
date: "2025-02-15"
category: "Investment Guide"
tags: ["gold mining", "stocks", "investment", "equities"]
featuredImage: "/blog/gold-mining-stocks.jpg"
readingTime: 10
seo:
  title: "Gold Mining Stocks Investment Guide | Complete Analysis"
  description: "Learn how to invest in gold mining stocks. Compare mining companies vs physical gold for your portfolio."
  keywords: ["gold mining stocks", "mining investment", "gold equities"]
---

## Introduction to Gold Mining Stocks

Gold mining stocks offer investors exposure to gold prices through companies that extract the precious metal. Unlike physical gold, these stocks can provide dividends and leverage to gold price movements.

### Why Invest in Mining Stocks?

- **Leverage**: Mining stocks often amplify gold price movements
- **Dividends**: Many miners pay regular dividends
- **Growth potential**: Successful exploration can lead to significant gains

## Conclusion

Gold mining stocks can be an excellent complement to physical gold in a diversified portfolio.
```

#### Frontmatter Fields

**Required:**
- `title` - Article headline
- `excerpt` - Brief description shown in listings
- `author` - Author name
- `date` - Publication date (YYYY-MM-DD format)
- `category` - Must be one of:
  - Market Analysis
  - Investment Guide
  - Education
  - Market News

**Optional:**
- `tags` - Array of keywords for filtering
- `featuredImage` - Path to image (e.g., "/blog/image.jpg")
- `readingTime` - Estimated minutes (auto-calculated if omitted)
- `seo.title` - Custom SEO title
- `seo.description` - Meta description
- `seo.keywords` - Array of SEO keywords

#### Step 3: Restart Dev Server

Contentlayer automatically detects the new file and generates types:

```bash
# Stop current server
Ctrl+C

# Restart
npm run dev
```

#### Step 4: Access Your Article

- **Article URL**: `http://localhost:3000/news/gold-mining-stocks-investment`
- **News Listing**: `http://localhost:3000/news`

### Markdown Features

Articles support full Markdown syntax plus:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet points
- Another item

1. Numbered list
2. Another item

[Link text](https://example.com)

| Table | Column 2 |
|-------|----------|
| Row 1 | Data     |
| Row 2 | Data     |

> Blockquote

`inline code`

```code block```
```

### Adding Images

1. Place image in `/public/blog/` folder
2. Reference in frontmatter: `featuredImage: "/blog/image-name.jpg"`
3. Or use in content: `![Alt text](/blog/image-name.jpg)`

### Best Practices

- **URL-friendly filenames**: Use lowercase with hyphens (e.g., `gold-price-outlook-2025.mdx`)
- **Category names**: Match existing categories exactly (case-sensitive)
- **Dates**: Use YYYY-MM-DD format
- **Excerpts**: Keep under 160 characters for optimal SEO
- **Tags**: Use 3-5 relevant keywords

### URL Structure

- **News Listing**: `/news`
- **Individual Article**: `/news/article-slug`
- **Filtered by Category**: `/news?category=market-analysis`

All articles are statically generated at build time for optimal performance and SEO.

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Gold price with calculator and charts |
| Silver Price | `/silver-price` | Silver price with 12M chart |
| Precious Metals | `/precious-metals` | Overview of all metals |
| News | `/news` | Article listing with category filter |
| Article | `/news/[slug]` | Individual article page |
| Charts | `/charts` | Charts overview page |
| FAQ | `/faq` | Frequently asked questions |

## Gold Price Calculator

The calculator supports:
- **Currencies**: USD, CAD, AUD, GBP, EUR
- **Units**: Ounces (oz), Grams (gr)
- **Real-time Conversion**: Uses live exchange rates from Yahoo Finance
- **Formula**: `Total Value = Units × (Price in USD / Exchange Rate)`
- For grams: divides ounce price by 31.1035

## Navigation

The header navigation features:
- **Desktop**: Dropdown menus with hover states using NavigationMenu
- **Mobile**: Slide-out sheet menu with accordion submenus
- **Responsive**: Adapts between mobile and desktop at lg breakpoint

## Important Technical Notes

### Next.js 15+ Async APIs

This project uses **Next.js 15+**, which requires awaiting dynamic APIs:

```typescript
// Page params are now a Promise
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  // ...
}

// Search params are also a Promise
export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const params = await searchParams
  // ...
}
```

Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis

### Contentlayer Build Process

Contentlayer must build before Next.js to generate types:

```bash
# Build script in package.json runs contentlayer first
"build": "contentlayer build && next build"
```

The `.contentlayer/generated` directory contains:
- TypeScript types for all articles
- JSON data for each article
- MDX compilation output

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Environment variables must be configured in your deployment platform dashboard.

### Build Requirements

- Node.js 18+ 
- Contentlayer needs write access to generate files
- All articles are pre-rendered at build time (SSG)

## License

MIT License - Feel free to use this project for your own gold price tracking needs.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with Next.js, Tailwind CSS, and shadcn/ui.
