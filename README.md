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

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Lightweight Charts
- **API**: Yahoo Finance

## Project Structure

```
gpl-web/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── chart/route.ts        # Chart & performance data
│   │   └── quotes/route.js       # Real-time price quotes
│   ├── blog/                     # Blog System
│   │   ├── [slug]/page.tsx       # Individual blog posts
│   │   ├── category/[category]/  # Category filtering
│   │   └── page.tsx              # Blog index
│   ├── charts/page.tsx           # Charts overview
│   ├── faq/page.tsx              # FAQ page
│   ├── news/page.tsx             # News page
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
├── lib/
│   ├── utils.ts                  # Utility functions
│   └── blog/posts.ts             # Blog posts data
│
└── Configuration files...
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

## Blog System

The blog system supports:

### Features
- **Categories**: Market Analysis, Investment Guide, Education, Market News, Price Updates
- **Dynamic Routing**: `/blog/[slug]` for individual posts
- **Category Filtering**: `/blog/category/[category]` for filtered views
- **Related Posts**: Automatically shows related content
- **SEO Optimization**: Every post has unique metadata

### Adding a New Blog Post
Edit `lib/blog/posts.ts`:

```typescript
{
  slug: 'your-post-slug',
  title: 'Post Title',
  excerpt: 'Brief description...',
  content: `<h2>Heading</h2><p>Content...</p>`,
  author: 'Author Name',
  date: '2025-02-10',
  category: 'Market Analysis',
  tags: ['gold', 'investment'],
  readingTime: 8,
  seo: {
    title: 'SEO Title',
    description: 'SEO Description',
    keywords: ['keyword1', 'keyword2']
  }
}
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Gold price with calculator and charts |
| Silver Price | `/silver-price` | Silver price with 12M chart |
| Precious Metals | `/precious-metals` | Overview of all metals |
| Blog | `/blog` | Blog listing with categories |
| Blog Post | `/blog/[slug]` | Individual blog article |
| Category | `/blog/category/[category]` | Filtered blog posts |
| Charts | `/charts` | Charts overview page |
| FAQ | `/faq` | Frequently asked questions |
| News | `/news` | Latest market news |

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

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Environment variables must be configured in your deployment platform dashboard.

## License

MIT License - Feel free to use this project for your own gold price tracking needs.

## Support

For issues or questions, please open an issue on GitHub.

---

Built with Next.js, Tailwind CSS, and shadcn/ui.
