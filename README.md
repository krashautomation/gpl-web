# Gold Price Live

A comprehensive Next.js application for tracking live gold and silver prices with real-time charts, performance analytics, and educational content.

## Recent Changes

- **Breadcrumbs** - All pages now have breadcrumbs (visual + JSON-LD structured data) via MainLayout (March 2026)
- **Single Column Layout** - All pages converted to single-column layout with consistent container widths (March 2026)
- **Container Widths** - Header nav and footer links: 1200px, main content: 896px (March 2026)
- **Article Grids** - News index and related articles now 2 columns, 2 articles (March 2026)
- **Footer Single Column** - Converted footer top section from two-column to single-column layout (March 2026)
- **Feature Flags** - Dynamic pages now render ads, articles, and earliest date based on DB flags (March 2026)
- **Smart Defaults** - Page type selection auto-sets appropriate feature flags
- **Page Management System** - Database-driven pages with SEO from Supabase (March 2026)
- **Dynamic Route** - All commodity/crypto pages use `app/[slug]/` route from database
- **Reusable Components** - 6 new components: ContactSidebar, PriceCard, PerformanceTable, CommodityChartCard, ContentCard, ProfileCard
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
- **Breadcrumbs**: Visual breadcrumbs + JSON-LD structured data for Google rich results

### Breadcrumbs

Breadcrumbs are implemented in `MainLayout.tsx` and automatically include:

1. **Visual breadcrumbs** - Shown on all pages (except home) under the header
2. **Structured data** - JSON-LD BreadcrumbList markup for Google Search

**Usage:**

```tsx
<MainLayout breadcrumbs={[{ label: 'Page Name', href: '/page-path' }]}>
```

**For nested pages:**

```tsx
<MainLayout breadcrumbs={[{ label: 'News', href: '/news' }, { label: 'Article Title' }]}>
```

The structured data is automatically generated with:

- Full URLs (e.g., `https://goldpricelive.co/gold-price`)
- Proper position numbers
- Schema.org BreadcrumbList format

## Blog System

Articles are stored in Supabase `articles` table. See `supabase/schema.sql` for the schema.

### Admin Dashboard

The dashboard is available at `/dashboard` in development mode only. It provides:

- **Articles** - List, edit, delete, and create new articles
- **Pages** - Manage dynamic pages with full CRUD, slug validation, and preview
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

## Page Management System

Pages are stored in Supabase `pages` table. The system uses a dynamic route `app/[slug]/page.tsx` to render pages from the database.

### Dashboard

Manage pages at `/dashboard/pages`:

- **Create** - Add new pages with title, slug, page type, SEO fields
- **Edit** - Modify existing pages (except locked pages)
- **Delete** - Remove pages (locked pages protected)
- **Preview** - View page before publishing
- **Slug Validation** - Prevents duplicate slugs

### Database Schema

See `supabase/schema.sql` for the full schema. Key tables:

| Table             | Purpose                             | Status    |
| ----------------- | ----------------------------------- | --------- |
| `pages`           | Page configurations with SEO fields | ✅ Active |
| `page_components` | Custom component layouts            | ✅ Active |

### Page Types

| Type        | Description          | Layout                   |
| ----------- | -------------------- | ------------------------ |
| `commodity` | Precious/base metals | Single column, max-w-4xl |
| `crypto`    | Cryptocurrencies     | Single column, max-w-4xl |
| `ratio`     | Metal ratios         | Single column, max-w-4xl |
| `static`    | Static content       | Single column, max-w-4xl |
| `legal`     | Legal pages          | Single column, max-w-4xl |
| `home`      | Home page            | Full width               |

> Note: All dynamic pages use `max-w-4xl` (896px) container with single column layout for simplified, consistent presentation.

### Page Components System

Each page section is a **reorderable component** that can be added/removed via dashboard:

| Component     | Description                           |
| ------------- | ------------------------------------- |
| `hero`        | Page title/heading                    |
| `chart`       | CommodityChartCard with price chart   |
| `performance` | PerformanceTable with historical data |
| `calculator`  | GoldCalculator for value conversion   |
| `articles`    | RecentArticlesSection                 |
| `ads`         | BannerAd (Money Metals Exchange)      |
| `text_block`  | ContentCard with custom text          |
| `contact`     | ContactSidebar                        |

**How it works:**

1. Pages use `page_components` table to define which components to render
2. Components render in order by `position` field (single column stack)
3. Add/remove/reorder via dashboard at `/dashboard/pages` → edit page → Page Components
4. If no components defined, uses default layout (being updated to single column)

### SEO Fields (13 fields)

Pages include comprehensive SEO configuration:

- `meta_title` - SEO title
- `meta_description` - SEO description
- `meta_keywords` - SEO keywords array
- `og_image` - Open Graph image
- `twitter_card` - Twitter card type (defaults to summary_large_image)
- `robots` - Robots meta (index/follow)
- `canonical_url` - Canonical URL
- `seo_page_type` - SEO classification
- `pillar_slug` - Pillar page for internal linking
- `primary_keyword` - Main keyword
- `related_pages` - Related page slugs
- `schema_type` - Schema.org type
- `is_locked` - Prevent AI overwrites

### Feature Flags

Dynamic pages support these configurable features:

| Flag          | DB Field             | Dynamic Route  | Purpose                           |
| ------------- | -------------------- | -------------- | --------------------------------- |
| Calculator    | `has_calculator`     | ✅ Placeholder | Show gold calculator              |
| Ads           | `has_ads`            | ✅ Rendered    | Show banner ads                   |
| Articles      | `has_articles`       | ✅ Rendered    | Show recent articles              |
| Earliest Date | `show_earliest_date` | ✅ Rendered    | Show earliest price date (crypto) |

Smart defaults are applied based on page type:

- **commodity/crypto/ratio**: has_ads=true, has_articles=true
- **crypto**: additionally show_earliest_date=true
- **static/legal**: has_ads=false, has_articles=false

### Current Pages (11)

All commodity/crypto pages are database-driven:

| Page              | Slug              | Symbol      |
| ----------------- | ----------------- | ----------- |
| Gold              | gold-price        | GC=F        |
| Silver            | silver-price      | SI=F        |
| Platinum          | platinum-price    | PL=F        |
| Palladium         | palladium-price   | PA=F        |
| Copper            | copper-price      | HG=F        |
| Aluminum          | aluminum-price    | ALI=F       |
| Oil               | oil-price         | CL=F        |
| Natural Gas       | natural-gas-price | NG=F        |
| Bitcoin           | bitcoin-price     | BTC-USD     |
| Ethereum          | ethereum-price    | ETH-USD     |
| Gold/Silver Ratio | gold-silver-ratio | GC=F + SI=F |

### Adding a New Page

1. Add a row to the `pages` table in Supabase
2. Set `slug`, `title`, `page_type`, `symbol`, and SEO fields
3. Page automatically renders at `/{slug}`

### Components

New reusable components in `components/`:

| Component            | Purpose                   |
| -------------------- | ------------------------- |
| `ContactSidebar`     | Contact info card         |
| `PriceCard`          | Price display with change |
| `PerformanceTable`   | Performance metrics table |
| `CommodityChartCard` | Chart with price header   |
| `ContentCard`        | Generic content card      |
| `ProfileCard`        | Profile with image + CTA  |

### Rollback

Static backups are preserved in `app/backup-static-pages/`. To restore:

```bash
# Restore all
mv app/backup-static-pages/* app/

# Restore single page
mv app/backup-static-pages/silver-price app/
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
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `NEXT_PUBLIC_YAHOO_API_KEY` - Yahoo Finance API key

## License

MIT License
