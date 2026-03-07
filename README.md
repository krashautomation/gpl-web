# Gold Price Live

A comprehensive Next.js application for tracking live gold and silver prices with real-time charts, performance analytics, and educational content.

## Recent Changes

- **AI Article Import** - Import and reword articles using Claude or OpenAI. Access via `/dashboard` in development mode.
- **Admin Dashboard** - Full article management system at `/dashboard` (dev mode only)
- **Image Management** - Upload and manage article images with usage tracking
- **Dynamic Sitemap** - Sitemap now includes timestamps for better SEO freshness

## Features

- **Live Price Tracking**: Real-time gold, silver, platinum, palladium, copper, aluminum prices plus Bitcoin and Ethereum
- **Interactive Charts**: 7-day and 12-month price charts with Lightweight Charts
- **Performance Analytics**: 30-day, 6-month, 1-year, 2-year, 3-year, 5-year, and 20-year performance metrics
- **Gold/Silver Ratio**: Historical ratio chart with performance comparison
- **ETF Tracking**: Gold ETFs (GLD, IAU, GLDM, SGOL) and Silver ETFs (SLV, SIVR, SIL, SILJ)
- **Gold Price History**: 100-year historical chart (macrotrends.net)
- **Gold Calculator**: Calculate gold value with multi-currency and unit conversion (oz/gr)
- **Currency Support**: USD, CAD, AUD, GBP, EUR with real-time exchange rates
- **Blog System**: SEO-optimized blog with articles stored in Supabase
- **Responsive Design**: Mobile-first design with dark theme

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Lightweight Charts
- **Database**: Supabase
- **Data**: Yahoo Finance API

## Project Structure

```
gpl-web/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with Google Analytics
│   ├── sitemap.ts               # Sitemap.xml generation
│   ├── robots.ts                # Robots.txt generation
│   ├── news/                    # Blog pages (from Supabase)
│   └── [page routes]            # Page components
├── components/
│   ├── layout/                  # Header, Footer, MainLayout
│   ├── ui/                      # shadcn/ui components
│   └── LightweightChart.tsx
├── lib/
│   ├── articles.ts              # Supabase article queries
│   ├── supabase.ts              # Supabase client
│   ├── og-utils.ts              # OpenGraph image utilities
│   └── utils.ts                 # Utility functions
├── supabase/
│   └── schema.sql               # Database schema
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
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_YAHOO_API_KEY=your-yahoo-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
OPENAI_API_KEY=your-openai-api-key
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
| Roadmap             | `/roadmap`             |
| Dashboard (dev)     | `/dashboard`           |

## SEO

The application includes comprehensive SEO optimization:

- **Sitemap**: Auto-generated at `/sitemap.xml`
- **Robots.txt**: Generated at `/robots.txt`
- **Metadata**: Every page has optimized title, description, OpenGraph, and Twitter cards
- **Canonical URLs**: Configured per page
- **Google Analytics**: Integrated via next/script

## Blog System

Articles are stored in Supabase `articles` table. See `supabase/schema.sql` for the schema.

### Admin Dashboard

The dashboard is available at `/dashboard` in development mode only. It provides:

- **Articles** - List, edit, delete, and create new articles
- **Import Article** - Use AI to import and reword articles from any text
- **Images** - Upload and manage article images with usage tracking

To use the AI import feature, add either `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` to your `.env.local` file.

### Adding an Article

Insert a new row into the `articles` table via Supabase dashboard or API:

| Field           | Type        | Required | Description                       |
| --------------- | ----------- | -------- | --------------------------------- |
| slug            | text        | Yes      | URL-friendly identifier (unique)  |
| title           | text        | Yes      | Article title                     |
| excerpt         | text        | No       | Short description for listings    |
| content         | text        | Yes      | Markdown content                  |
| author          | text        | No       | Author name                       |
| published_at    | timestamptz | Yes      | Publication date                  |
| category        | text        | No       | Article category                  |
| tags            | text[]      | No       | Array of tags                     |
| featured_image  | text        | No       | URL to featured image             |
| reading_time    | integer     | No       | Estimated reading time in minutes |
| seo_title       | text        | No       | Custom SEO title                  |
| seo_description | text        | No       | Custom SEO description            |
| seo_keywords    | text[]      | No       | SEO keywords array                |
| og_image        | text        | No       | OpenGraph image URL               |
| draft           | boolean     | No       | Set to true to hide from public   |

### Running the Migration

If migrating from MDX files, use the migration script:

```bash
# Run the migration to import MDX articles into Supabase
node scripts/migrate-articles.js
```

Note: After migration, you can safely remove the `content/articles/` folder and migration scripts.

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
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `NEXT_PUBLIC_YAHOO_API_KEY` - Yahoo Finance API key

## License

MIT License
