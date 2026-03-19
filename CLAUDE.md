# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run format       # Prettier format all files
npm run format:check # Check formatting without writing
npm run typecheck    # TypeScript type check (no emit)
```

Run scripts with `tsx`:
```bash
npx tsx scripts/some-script.ts
```

There are no automated tests in this project.

## Architecture Overview

**Gold Price Live** is a Next.js 15 app (App Router) for live precious metals and commodity price tracking, deployed on Vercel.

### Data Layer

- **Supabase** (`lib/supabase.ts`): Single client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. Two main tables:
  - `pages` — CMS-managed pages with SEO metadata, page type, and component layout
  - `articles` — News/blog articles with draft flag
  - `page_components` — Ordered list of components attached to a page
  - `article_images` — Image metadata; files stored in Supabase Storage bucket `gpl`
- **Yahoo Finance** (`yahoo-finance2`): Used server-side in `/api/chart` for historical price data and performance calculations
- **`/api/quotes`**: Client-side quote fetching uses `NEXT_PUBLIC_YAHOO_API_KEY`

### Page System

All slug-based routes (`/[slug]`) resolve through the `pages` table. The flow:
1. `app/[slug]/page.tsx` fetches the page by slug from Supabase
2. Passes it to `DynamicPageClient` (client component)
3. `DynamicPageClient` checks if `page_components` exist for the page
   - **If yes**: renders components in order from the `page_components` table (the "component system")
   - **If no**: falls back to layout based on `page_type` (commodity, crypto, ratio, static, legal)

### Component Registry

`DynamicPageClient.tsx` contains a `COMPONENT_REGISTRY` mapping string keys to React components:

| Key | Component |
|-----|-----------|
| `hero` | Inline H1 title |
| `chart` | `CommodityChartCard` — 1Y price chart via `/api/chart` |
| `performance` | `PerformanceTable` — 30D/6M/1Y/5Y/20Y performance |
| `calculator` | `GoldCalculator` — price calculator with unit/currency conversion |
| `articles` | `RecentArticlesSection` — latest articles from Supabase |
| `ads` | `BannerAd` — affiliate banner ad |
| `text_block` | `ContentCard` — raw HTML content (DOMPurify sanitized) |
| `image` | `ImageBlock` — image with optional caption |
| `contact` | `ContactSidebar` |
| `bio_card` | `BioCard` — author card with date and reading time |
| `stock_table` | Inline `StockTable` — stocks by category from `/api/stocks` |

Each component's config is a JSON object stored in `page_components.config`.

### Dashboard (CMS)

`/dashboard/*` — admin interface for managing pages and articles:
- `/dashboard/pages` — list/create/edit pages
- `/dashboard/pages/[id]` — full page editor with component builder (add/remove/reorder components, edit config/HTML per component)
- `/dashboard/articles` — article CRUD with AI-assisted writing
- `/dashboard/images` — image upload and management

Pages can be locked (`is_locked: true`) to prevent edits from the dashboard.

### API Routes

- `GET /api/chart?symbol=GC=F&range=12M` — returns `chartData[]` from Yahoo Finance; `range` is `7D` or `12M`
- `GET /api/chart?symbol=GC=F&type=performance` — returns multi-period performance metrics
- `GET /api/quotes?symbols=GC=F,SI=F&key=...` — live price quotes
- `GET /api/stocks?category=gold-stocks` — stocks by category from Supabase
- `GET /api/articles` — published articles
- `POST /api/import-article` — import article from external source
- `GET /api/revalidate` — ISR cache revalidation

### Key Patterns

- **`lib/pages.ts`** and **`lib/articles.ts`** are the data access layer — all Supabase queries go through these files
- UI components in `components/ui/` are shadcn/ui primitives (Radix UI + Tailwind)
- Custom domain components live directly in `components/` (e.g., `BannerAd`, `BioCard`, `CommodityChartCard`)
- `app/components/` contains page-specific components (e.g., `RecentArticlesSection`, `MarketQuotes`)
- Structured data (JSON-LD) is injected via `components/StructuredData.tsx`
- `components/LightweightChart.tsx` wraps `lightweight-charts` for price chart rendering

### Environment Variables

Required in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_YAHOO_API_KEY=
```

### Scripts

One-off migration and setup scripts live in `scripts/` and are run with `npx tsx scripts/<name>.ts`. They use the same Supabase client and operate directly on the database (seeding pages, bulk-adding components, category migrations, etc.).
