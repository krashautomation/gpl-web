# Page Management System Plan

## Overview

Build a database-driven page management system for the Gold Price Live website that enables:

- Dynamic page creation and rendering
- Reusable components for charts, performance cards, price displays
- Centralized configuration in Supabase

---

## ✅ Implementation Complete (March 2026)

All phases completed successfully:

| Phase                        | Status      | Date       |
| ---------------------------- | ----------- | ---------- |
| Phase 1: Foundation          | ✅ Complete | 2026-03-08 |
| Phase 2: Components          | ✅ Complete | 2026-03-08 |
| Phase 3: Dynamic Route       | ✅ Complete | 2026-03-08 |
| Phase 4: Integration         | ✅ Complete | 2026-03-08 |
| Phase 5: Migration           | ✅ Complete | 2026-03-08 |
| Phase 6: Dashboard           | ✅ Complete | 2026-03-08 |
| Phase 7: Easy Static Pages   | ✅ Complete | 2026-03-11 |
| Phase 8: Roadmap             | ✅ Complete | 2026-03-11 |
| Phase 9: ETF Pages           | ✅ Complete | 2026-03-11 |
| Phase 10: Gold Price History | ✅ Complete | 2026-03-11 |

### Summary

- **23 pages** migrated to dynamic route (11 commodity/crypto + 12 static)
- **6 new components** extracted
- **Database** with 13 SEO fields per page
- **Backups** preserved in `app/backup-static-pages/`
- **Dashboard UI** fully implemented with CRUD operations
- **Feature flags** implemented (ads, articles, calculator, earliest date)
- **GoldCalculator** component extracted and reusable

---

### Recent Updates (March 2026)

| Date       | Change                                                                                                                                    |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-03-11 | Migrated gold-price-history to database (performance component + static image in text_block)                                              |
| 2026-03-11 | Migrated gold-etfs and silver-etfs to database (chart + text_block components)                                                            |
| 2026-03-11 | Migrated roadmap page to database (checklist converted to text_block HTML)                                                                |
| 2026-03-11 | Migrated 8 static pages to database (privacy, terms-of-service, disclaimer, risk-warning, about, contact, advertise, gold-price-live-app) |
| 2026-03-11 | Added hero + text_block components for migrated pages                                                                                     |
| 2026-03-11 | Created scripts/migrate-static-pages.ts for migrations                                                                                    |
| 2026-03-11 | Updated AGENTS.md with security and migration guidelines                                                                                  |
| 2026-03-10 | text_block HTML support with DOMPurify sanitization                                                                                       |
| 2026-03-10 | Added component config editor to dashboard UI                                                                                             |
| 2026-03-08 | Single column layout across all pages                                                                                                     |
| 2026-03-08 | Container widths: 1200px header/footer, 896px content                                                                                     |
| 2026-03-08 | Article grids reduced to 2 columns                                                                                                        |
| 2026-03-08 | Feature flags implemented in dynamic route                                                                                                |
| 2026-03-08 | Smart defaults by page type                                                                                                               |
| 2026-03-08 | GoldCalculator component extracted                                                                                                        |
| 2026-03-08 | Dashboard form reordered (Data Source first)                                                                                              |
| 2026-03-08 | Schema defaults: has_ads, has_articles = true                                                                                             |

---

### Remaining Static Pages (NOT Migrated)

| Page    | Status       | Reason                                                          |
| ------- | ------------ | --------------------------------------------------------------- |
| /news   | Not migrated | Hard - Category filtering via searchParams not supported by CMS |
| /charts | Not migrated | Medium - Links cards, lower priority                            |

### Follow-up Tasks

| #   | Task                   | Status  | Description                                                                   |
| --- | ---------------------- | ------- | ----------------------------------------------------------------------------- |
| 2   | Enhance with images    | Pending | Add image components via dashboard for: about, contact, gold-price-live-app   |
| 3   | Full content migration | Pending | Extract full content including images - for pages that need complete fidelity |

---

## Important Notes

### Existing Systems - DO NOT REBUILD

| System               | Status      | Location                                                    |
| -------------------- | ----------- | ----------------------------------------------------------- |
| **Article CMS**      | ✅ Complete | `/dashboard` - Supabase-backed, full CRUD, image management |
| **Dynamic Articles** | ✅ Working  | `/news/[slug]` - auto-added to sitemap                      |

**We are NOT building another article/content CMS. We are ONLY abstracting page components.**

---

## Existing Component Inventory

### Already Built (reuse these)

| Component               | Location                                   | Purpose                                 |
| ----------------------- | ------------------------------------------ | --------------------------------------- |
| `LightweightChart`      | `components/LightweightChart.tsx`          | Price chart visualization               |
| `BannerAd`              | `components/BannerAd.tsx`                  | Affiliate advertising                   |
| `MainLayout`            | `components/layout/MainLayout.tsx`         | Page wrapper with header/footer         |
| `Header`                | `components/layout/Header.tsx`             | Navigation menu (hardcoded nav items)   |
| `Footer`                | `components/layout/Footer.tsx`             | Site footer                             |
| `RecentArticlesSection` | `app/components/RecentArticlesSection.tsx` | Latest news cards                       |
| `MarketQuotes`          | `app/components/MarketQuotes.tsx`          | Price quote display (needs improvement) |

### UI Library (shadcn/ui - 46 components)

Using full shadcn/ui component library: Button, Card, Input, Select, Table, Badge, Dialog, Sheet, Tabs, etc.

---

## Component Analysis Summary

### High Priority (Most Reused)

| Component            | Used In         | Current State                     |
| -------------------- | --------------- | --------------------------------- |
| `ContactSidebar`     | 6+ pages        | DUPLICATED - should extract       |
| `PriceCard`          | Commodity pages | Inline - needs extraction         |
| `PerformanceTable`   | Commodity pages | Inline - needs extraction         |
| `CommodityChartCard` | Commodity pages | Partial (LightweightChart exists) |

### Unused Imports (Cleanup Opportunity)

Many pages import but don't use: `Select*`, `Button`, `ArrowDown`, `ArrowUp`, `DollarSign`

---

## Current Architecture (IMPLEMENTED)

### One Dynamic Route with Conditional Rendering

```
app/
├── [slug]/page.tsx              # Dynamic route - fetches page from DB
├── [slug]/DynamicPageClient.tsx  # Client component - renders based on page_type
```

**How it works:**

1. `app/[slug]/page.tsx` fetches page config from Supabase by slug
2. Passes `page` object to `DynamicPageClient`
3. `DynamicPageClient` renders differently based on `page_type`:

| page_type | Renders                               |
| --------- | ------------------------------------- |
| commodity | Chart + Performance Table             |
| crypto    | Chart + Performance Table             |
| ratio     | Chart + Performance Table (2 symbols) |
| static    | ContentCard + ContactSidebar          |
| legal     | ContentCard + ContactSidebar          |

### Database Tables

| Table             | Purpose                      | Status         |
| ----------------- | ---------------------------- | -------------- |
| `pages`           | Page configs with SEO fields | ✅ Implemented |
| `page_components` | Flexible component layout    | ❌ Not used    |

### Feature Flags (Implemented in dynamic route)

| Flag          | DB Field             | Dynamic Route          |
| ------------- | -------------------- | ---------------------- |
| Calculator    | `has_calculator`     | ✅ Placeholder shown   |
| Ads           | `has_ads`            | ✅ Rendered            |
| Articles      | `has_articles`       | ✅ Rendered            |
| Earliest Date | `show_earliest_date` | ✅ Rendered for crypto |

---

## Architecture (PLANNED)

```
components/
├── PriceCard.tsx              # NEW - price display
├── PerformanceTable.tsx       # NEW - metrics table
├── CommodityChartCard.tsx     # NEW - chart wrapper with range selector
├── ContactSidebar.tsx          # NEW - extract from 6 pages
├── CurrencySelector.tsx        # NEW - currency dropdown
├── GoldCalculator.tsx         # NEW - calculator
├── QuoteList.tsx             # EXISTING - improve for CMS
├── LegalContentCard.tsx       # NEW - legal text wrapper
├── ChecklistSection.tsx       # NEW - roadmap checklist
├── ETFPriceCard.tsx          # NEW - ETF chart + price
├── ETFListTable.tsx          # NEW - ETF listings
└── ...

lib/
├── pages.ts                   # NEW - page fetching functions
└── ...

app/
├── [slug]/page.tsx           # NEW - dynamic page route
└── ...
```

components/
├── PriceCard.tsx # NEW - price display
├── PerformanceTable.tsx # NEW - metrics table
├── CommodityChartCard.tsx # NEW - chart wrapper with range selector
├── ContactSidebar.tsx # NEW - extract from 6 pages
├── CurrencySelector.tsx # NEW - currency dropdown
├── GoldCalculator.tsx # NEW - calculator
├── QuoteList.tsx # EXISTING - improve for CMS
├── LegalContentCard.tsx # NEW - legal text wrapper
├── ChecklistSection.tsx # NEW - roadmap checklist
├── ETFPriceCard.tsx # NEW - ETF chart + price
├── ETFListTable.tsx # NEW - ETF listings
└── ...

lib/
├── pages.ts # NEW - page fetching functions
└── ...

app/
├── [slug]/page.tsx # NEW - dynamic page route
└── ...

````

---

## Page Analysis

### 1. Aluminum Price Page (`app/aluminum-price/`)

**Layout (`layout.tsx`):**

- Pure metadata/layout - returns `children` only
- All SEO metadata defined here: title, description, keywords, OG, Twitter, robots
- Uses `getOgImage()` helper for OG image

**Page (`page.tsx`):**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `LightweightChart` - chart component
- `Select*` - imported but unused
- `Button` - imported but unused

**Inline Elements (NOT in components):**

| Element           | Location      | Description                                    |
| ----------------- | ------------- | ---------------------------------------------- |
| Page Title        | Lines 136-137 | `h1` with "Aluminum Price Live"                |
| Price Display     | Lines 146-155 | Current price + change + percent in CardHeader |
| Performance Table | Lines 190-303 | Table with Today, 30D, 6M, 1Y, 5Y, 20Y rows    |
| Grid Layout       | Line 139      | `grid-cols-1 lg:grid-cols-2 gap-6` container   |
| Currency Selector | Unused        | Incomplete feature (imported but not rendered) |

**Data Fetching:**

- `/api/chart?symbol=ALI=F&range=12M` - 12-month chart data
- `/api/chart?symbol=ALI=F&type=performance` - performance metrics
- `/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,H G=F,ALI=F` - real-time quotes

---

### 2. About Page (`app/about/page.tsx`)

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `Image` - Next.js image
- `Link` - Next.js link
- `Button` - shadcn/ui
- `Select*` - imported but unused
- `ArrowDown, ArrowUp, DollarSign` - imported but unused

**Inline Elements (NOT in components):**

| Element            | Location      | Description                                             |
| ------------------ | ------------- | ------------------------------------------------------- |
| Page Title         | Lines 23-27   | `h1` with "About Us"                                    |
| Profile Image Card | Lines 30-83   | Left card with image + founder story + subscribe button |
| Content Card       | Lines 85-143  | Right card with mission statement, quote, contact info  |
| Grid Layout        | Line 29       | `grid-cols-1 lg:grid-cols-2 gap-6`                      |
| Subscribe Button   | Lines 73-81   | CTA button with Substack link                           |
| Contact Info       | Lines 124-135 | Email + advertise link                                  |

**Page Type:** Static content (no data fetching)

**Components to Extract:**

- **`ContentCard`** - Generic card with title + content area
- **`ProfileCard`** - Card with image + bio text + CTA button
- **`CTALink`** - Button linking to external URL

---

### 3. Advertise Layout (`app/advertise/layout.tsx`)

**Components Used:**

- None (pure metadata/layout)

**Inline Elements (NOT in components):**

| Element         | Location    | Description                                       |
| --------------- | ----------- | ------------------------------------------------- |
| Metadata export | Lines 6-75  | title, description, keywords, OG, Twitter, robots |
| Layout wrapper  | Lines 77-83 | Returns `children` only                           |

**Key Observation:**

- Layout is simple (just wraps children)
- All SEO/social metadata is defined here
- Could be stored in DB for dynamic pages

**Database Schema Addition:**

The `pages` table should store all metadata fields:

| Column           | Type   | Description                      |
| ---------------- | ------ | -------------------------------- |
| meta_title       | text   | SEO title                        |
| meta_description | text   | Meta description                 |
| meta_keywords    | text[] | SEO keywords                     |
| og_image         | text   | Open Graph image URL             |
| twitter_card     | text   | Twitter card type                |
| robots           | text   | Robots meta (index, follow)      |
| layout_type      | text   | "standard", "blank", "marketing" |

---

### 4. Silver Price Page (`app/silver-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `SI=F`
- Title: "Silver Price Live"

---

### 5. Platinum Price Page (`app/platinum-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `PL=F`
- Title: "Platinum Price Live"

---

### 6. Palladium Price Page (`app/palladium-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `PA=F`
- Title: "Palladium Price Live"

---

### 7. Copper Price Page (`app/copper-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `HG=F`
- Title: "Copper Price Live"

---

### 8. Home Page - Gold Price (`app/page.tsx`)

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `LightweightChart` - chart component
- `BannerAd` - advertising component
- `RecentArticlesSection` - articles list component
- `Image` - Next.js image
- `Input` - for calculator
- `Select*` - for currency/unit selection

**Inline Elements (NOT in components):**

| Element           | Description                                                             |
| ----------------- | ----------------------------------------------------------------------- |
| Page Title        | `h1` with "Gold Price Live"                                             |
| Price Display     | Current price + change + percent                                        |
| Performance Table | Same as commodity pages                                                 |
| Gold Calculator   | Currency + unit conversion + total value                                |
| Quote List        | All 6 commodities (gold, silver, platinum, palladium, copper, aluminum) |

**Additional Features:**

- Currency conversion (USD, EUR, GBP, AUD, CAD)
- Unit conversion (oz, gr)
- Calculator (units × price = total value)
- Multiple quote display

**Components to Extract:**

- **`GoldCalculator`** - Currency/unit selector + calculation display
- **`QuoteList`** - List of multiple commodity prices

---

### 9. Oil Price Page (`app/oil-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `CL=F`
- Title: "Crude Oil Price Live"
- Quotes include oil: `GC=F,SI=F,PL=F,PA=F,H G=F,ALI=F,CL=F`

---

### 10. Natural Gas Price Page (`app/natural-gas-price/page.tsx`)

**Identical to Aluminum Page** - Same structure, components, data fetching

**Differences:**

- Symbol: `NG=F`
- Title: "Natural Gas Price Live"
- Quotes include natural gas: `GC=F,SI=F,PL=F,PA=F,H G=F,ALI=F,CL=F,NG=F`

---

### 11. Bitcoin Price Page (`app/bitcoin-price/page.tsx`)

**Almost identical to Aluminum Page**

**Differences:**

- Symbol: `BTC-USD` (different format - no =F suffix)
- Title: "Bitcoin Price Live"
- **Additional feature:** `earliestDate` state - shows earliest available price data date
- Quotes include BTC: `GC=F,SI=F,PL=F,PA=F,H G=F,ALI=F,BTC-USD`

---

### 12. Ethereum Price Page (`app/ethereum-price/page.tsx`)

**Identical to Bitcoin Page**

**Differences:**

- Symbol: `ETH-USD`
- Title: "Ethereum Price Live"
- Quotes include ETH: `GC=F,SI=F,PL=F,PA=F,H G=F,ALI=F,BTC-USD,ETH-USD`

---

### 13. Gold-Silver Ratio Page (`app/gold-silver-ratio/page.tsx`)

**DIFFERENT PATTERN** - Special comparison page

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `LightweightChart` - chart component

**Inline Elements:**

| Element          | Description                                        |
| ---------------- | -------------------------------------------------- |
| Page Title       | `h1` with "Gold Silver Ratio"                      |
| Ratio Chart      | Chart showing GC=F / SI=F ratio over time          |
| Comparison Table | Shows Gold %, Silver %, Difference for each period |

**Data Fetching (UNIQUE):**

- Fetches TWO symbols: `GC=F` and `SI=F`
- Calculates ratio: gold price / silver price
- Performance: Fetches both and calculates difference

**Key Insight:**

- This is a "ratio/comparison" page type
- Needs different component: **`RatioChartCard`** or **`ComparisonPerformanceTable`**

---

### 14. Disclaimer Page (`app/disclaimer/page.tsx`)

**Pattern: Legal/Static - Two Column**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `Button` - shadcn/ui
- `Link` - Next.js link
- Unused: `Select*`, `ArrowDown, ArrowUp, DollarSign`, `Image`

**Structure:**

- Page title: None (title in card header)
- Left Card: Legal disclaimer text
- Right Card: Contact info (identical across all legal pages)

---

### 15. Privacy Page (`app/privacy/page.tsx`)

**Pattern: Legal/Static - Two Column**

**Identical to Disclaimer** - Same structure, same right card

**Differences:**

- Left Card: Privacy policy text
- Title in page header: "Privacy Policy"

---

### 16. Risk Warning Page (`app/risk-warning/page.tsx`)

**Pattern: Legal/Static - Two Column**

**Identical to Disclaimer** - Same structure, same right card

**Differences:**

- Left Card: Risk warning text
- Title in page header: "Risk Warning"

---

### 17. Contact Page (`app/contact/page.tsx`)

**Pattern: Legal/Static - Two Column**

**Components Used:**

- Same as legal pages
- Has `Image` (profile photo)

**Structure:**

- Left Card: Profile image + bio + subscribe button
- Right Card: Contact info (same as other legal pages)

---

## Pattern Summary

### Commodity Pages (Al, Ag, Pt, Pd, Cu, Oil, NatGas)

- **Pattern:** Nearly identical code, only symbol + title differ
- **Structure:** Chart Card + Performance Card (2-column grid)
- **Data:** 12M chart + performance + quotes

### Crypto Pages (BTC, ETH)

- **Pattern:** Same as commodity + earliestDate feature
- **Structure:** Same 2-column grid
- **Data:** Same, but different symbol format (BTC-USD vs GC=F)

### Home Page (Gold)

- **Pattern:** Same as commodity pages + extra features
- **Extra:** Calculator, multiple quotes, BannerAd, RecentArticles

### Ratio/Comparison Pages (Gold-Silver Ratio)

- **Pattern:** Fetches 2+ symbols, calculates ratio/comparison
- **Structure:** Same 2-column grid, different table structure
- **New component:** `RatioChartCard`, `ComparisonPerformanceTable`

### Legal/Static Pages (Disclaimer, Privacy, Risk Warning, Contact)

- **Pattern:** Two-column, shared right card
- **Left:** Main content (legal text OR profile)
- **Right:** Contact info (identical across ALL legal pages)
- **Components:** `LegalContentCard`, `ContactSidebar`

---

## Component Extraction Plan

### New Components to Create:

1. **`PriceCard`** - Reusable price display with:
   - Current price
   - Change amount (colored)
   - Change percent (colored)
   - Symbol support

2. **`PerformanceTable`** - Reusable performance table with:
   - Dynamic rows based on available periods
   - Color-coded change values
   - Configurable columns

3. **`CommodityChartCard`** - Wrapper combining:
   - Title
   - Time range selector (1M, 6M, 1Y, 5Y)
   - LightweightChart
   - Loading/error states

4. **`CurrencySelector`** - Dropdown for currency selection (USD, EUR, GBP, etc.)

5. **`ContentCard`** - Generic card with title + content area (from About page)

6. **`ProfileCard`** - Card with image + bio text + CTA button (from About page)

7. **`CTALink`** - Button linking to external URL (from About page)

8. **`PageTitle`** - Reusable page title component with consistent styling

9. **`GoldCalculator`** - Currency/unit selector + calculation display (from Home page)

10. **`QuoteList`** - List of multiple commodity prices (from Home page)

11. **`RatioChartCard`** - Chart combining 2 symbols (e.g., gold/silver ratio)

12. **`ComparisonPerformanceTable`** - Table comparing 2+ assets (from Gold-Silver Ratio)

13. **`ContactSidebar`** - Contact info card (reused across ALL legal pages)

14. **`LegalContentCard`** - Legal text content card

---

## Final Page Type Summary

| Page Type | Description                                      | Examples                          |
| --------- | ------------------------------------------------ | --------------------------------- |
| Commodity | Single symbol, chart + performance               | Al, Ag, Pt, Pd, Cu, Oil, NatGas   |
| Crypto    | Commodity + earliestDate                         | BTC, ETH                          |
| Ratio     | Two symbols, ratio/comparison                    | Gold-Silver Ratio                 |
| Home      | Commodity + calculator + quotes + ads + articles | Gold                              |
| Static    | Content cards, profile                           | About, Contact                    |
| Legal     | Two-column, shared sidebar                       | Disclaimer, Privacy, Risk Warning |

### Tables:

> **Note:** Reuse existing Supabase instance. Already running with `articles` and `article_images` tables.

#### `pages`

| Column                | Type      | Description                                                                           |
| --------------------- | --------- | ------------------------------------------------------------------------------------- |
| id                    | uuid      | Primary key                                                                           |
| slug                  | text      | URL path (e.g., "aluminum-price")                                                     |
| title                 | text      | Page title                                                                            |
| symbol                | text      | Yahoo Finance symbol                                                                  |
| symbol2               | text      | Secondary symbol (for ratio pages)                                                    |
| page_type             | text      | "commodity", "crypto", "ratio", "static", "home"                                      |
| seo_page_type         | text      | **SEO**: "pillar", "cluster", "data", "landing", "utility"                            |
| pillar_slug           | text      | **SEO**: Reference to pillar page (for cluster pages)                                 |
| pillar_priority       | int       | **SEO**: Link priority for pillar authority (1 = highest)                             |
| primary_keyword       | text      | **SEO**: Primary target keyword                                                       |
| secondary_keywords    | text[]    | **SEO**: Additional target keywords                                                   |
| internal_links        | jsonb     | **SEO**: Auto-inject links `[{"keyword": "...", "target": "..."}]`                    |
| schema_type           | text      | **SEO**: Schema.org type - "Article", "FAQ", "Dataset", "FinancialProduct"            |
| related_pages         | text[]    | **SEO**: Related page slugs for "Related Articles"                                    |
| canonical_url         | text      | **SEO**: Canonical URL override                                                       |
| is_locked             | boolean   | **SEO**: Prevent AI overwrite (true for data pages)                                   |
| refresh_interval_days | int       | **SEO**: Auto-refresh threshold (e.g., 180 days)                                      |
| page_views            | int       | **SEO/Analytics**: View count                                                         |
| ranking_keywords      | text[]    | **SEO/Analytics**: Keywords page ranks for                                            |
| description           | text      | Meta description                                                                      |
| category              | text      | Category (precious metals, commodities, crypto)                                       |
| display_order         | int       | Sort order                                                                            |
| is_active             | boolean   | Published/draft                                                                       |
| has_calculator        | boolean   | Show gold calculator (gold only)                                                      |
| has_ads               | boolean   | Show banner ads                                                                       |
| has_articles          | boolean   | Show recent articles                                                                  |
| show_earliest_date    | boolean   | Show earliest date (crypto pages)                                                     |
| meta_title            | text      | SEO title                                                                             |
| meta_description      | text      | Meta description                                                                      |
| meta_keywords         | text[]    | SEO keywords                                                                          |
| og_image              | text      | Open Graph image URL                                                                  |
| twitter_card          | text      | Twitter card type                                                                     |
| robots                | text      | Robots meta (index, follow)                                                           |
| layout_type           | text      | "standard", "blank", "marketing"                                                      |
| components            | jsonb     | **SEO**: Dynamic component layout `[{type: "hero"}, {type: "chart", symbol: "GC=F"}]` |
| created_at            | timestamp | Creation time                                                                         |
| updated_at            | timestamp | Last update                                                                           |

#### `page_components`

| Column         | Type  | Description                                                                        |
| -------------- | ----- | ---------------------------------------------------------------------------------- |
| id             | uuid  | Primary key                                                                        |
| page_id        | uuid  | FK to pages                                                                        |
| component_type | text  | "chart", "performance", "quote_list", "hero", "text_block", "faq", "related_pages" |
| config         | jsonb | Component-specific settings                                                        |
| position       | int   | Order on page                                                                      |

#### Pre-Locked Pages (Seed Data)

The following pages should be seeded with `is_locked: true` to prevent AI overwrite:

| Slug               | Page Type | Reason                 |
| ------------------ | --------- | ---------------------- |
| /gold-price        | data      | Contains charts + APIs |
| /silver-price      | data      | Contains charts + APIs |
| /platinum-price    | data      | Contains charts + APIs |
| /palladium-price   | data      | Contains charts + APIs |
| /copper-price      | data      | Contains charts + APIs |
| /aluminum-price    | data      | Contains charts + APIs |
| /oil-price         | data      | Contains charts + APIs |
| /natural-gas-price | data      | Contains charts + APIs |
| /bitcoin-price     | data      | Contains charts + APIs |
| /ethereum-price    | data      | Contains charts + APIs |
| /gold-silver-ratio | data      | Contains charts + APIs |

> **Critical Guardrail**: Never allow AI editing or dynamic rewriting where `page_type === 'data'` AND `is_locked === true`

---

## SEO Features (Critical for Dynamic Pages)

### The 13 SEO Fields Added

| #   | Field                 | Type    | Purpose                                               |
| --- | --------------------- | ------- | ----------------------------------------------------- |
| 1   | seo_page_type         | text    | Classify pages as pillar/cluster/data/landing/utility |
| 2   | pillar_slug           | text    | Link clusters to pillars for automation               |
| 3   | pillar_priority       | int     | Link priority for pillar authority                    |
| 4   | primary_keyword       | text    | Target keyword for SEO                                |
| 5   | secondary_keywords    | text[]  | Additional target keywords                            |
| 6   | internal_links        | jsonb   | Auto-inject keyword links                             |
| 7   | schema_type           | text    | Schema.org type for structured data                   |
| 8   | related_pages         | text[]  | Related page slugs                                    |
| 9   | canonical_url         | text    | Canonical URL override                                |
| 10  | is_locked             | boolean | Prevent AI overwrite                                  |
| 11  | refresh_interval_days | int     | Auto-refresh threshold                                |
| 12  | page_views            | int     | Analytics - view count                                |
| 13  | ranking_keywords      | text[]  | Keywords page ranks for                               |

### The 5 Most Important SEO Features (Don't Skip)

| #   | Feature         | Purpose                                                      |
| --- | --------------- | ------------------------------------------------------------ |
| 1   | seo_page_type   | Classify pages as pillar/cluster/data/landing/utility        |
| 2   | pillar_slug     | Link clusters to pillars for automation                      |
| 3   | primary_keyword | Target keyword for SEO                                       |
| 4   | internal_links  | Auto-inject keyword links                                    |
| 5   | components      | JSON layout keeps charts safe while allowing dynamic content |

### Page Type Taxonomy (seo_page_type)

| Type    | Example                    | Purpose                        |
| ------- | -------------------------- | ------------------------------ |
| pillar  | Gold Price Live Guide      | Main topic hub                 |
| cluster | Gold Price Prediction 2026 | Related to pillar              |
| data    | /gold-price                | Price data (locked by default) |
| landing | /gold-etfs                 | Conversion pages               |
| utility | /contact                   | Functional pages               |

### Structured Data (Schema) by Page Type

| Page             | Recommended Schema |
| ---------------- | ------------------ |
| /news/\*         | Article            |
| Guides/How-tos   | FAQ                |
| Price data pages | Dataset            |
| ETF pages        | FinancialProduct   |
| Calculator pages | WebApplication     |

### Internal Linking Automation

```json
{
  "internal_links": [
    { "keyword": "gold price history", "target": "/gold-price-history" },
    { "keyword": "gold ETFs", "target": "/gold-etfs" }
  ]
}
````

Rendered in page: "Learn more about [gold price history](/gold-price-history)..."

---

## API Analysis

### Existing API Endpoints

| Endpoint              | Method   | Purpose                                         | Auth                 |
| --------------------- | -------- | ----------------------------------------------- | -------------------- |
| `/api/chart`          | GET      | Fetch price chart data from Yahoo Finance       | None                 |
| `/api/quotes`         | GET      | Fetch real-time quotes for all symbols          | API Key (`?key=...`) |
| `/api/articles`       | GET      | Fetch published articles from Supabase          | None                 |
| `/api/import-article` | POST     | AI-powered article rewriting (Anthropic/OpenAI) | None                 |
| `/api/revalidate`     | GET/POST | Revalidate Next.js cache                        | Secret token         |

### Data Sources

#### 1. Yahoo Finance (Primary External API)

| Symbol                       | Asset Type         |
| ---------------------------- | ------------------ |
| `GC=F`                       | Gold               |
| `SI=F`                       | Silver             |
| `PL=F`                       | Platinum           |
| `PA=F`                       | Palladium          |
| `HG=F`                       | Copper             |
| `ALI=F`                      | Aluminum           |
| `CL=F`                       | Crude Oil          |
| `NG=F`                       | Natural Gas        |
| `BTC-USD`                    | Bitcoin            |
| `ETH-USD`                    | Ethereum           |
| `GLD`                        | SPDR Gold ETF      |
| `SLV`                        | iShares Silver ETF |
| `EURUSD=X`, `GBPUSD=X`, etc. | Currency pairs     |
| `^GSPC`, `^DJI`              | Indices            |

#### 2. Supabase (Internal Database)

| Table            | Purpose                       |
| ---------------- | ----------------------------- |
| `articles`       | Blog/news articles            |
| `article_images` | Image management for articles |

### API Response Formats

#### `/api/chart?symbol=GC=F&range=12M`

```json
{
  "success": true,
  "chartData": [
    { "time": "2025-03-01", "value": 2034.5 },
    { "time": "2025-03-02", "value": 2038.2 }
  ]
}
```

#### `/api/chart?symbol=GC=F&type=performance`

```json
{
  "success": true,
  "symbol": "GC=F",
  "currentPrice": 2034.5,
  "performance": {
    "30D": { "price": 1980.0, "change": 54.5, "changePercent": 2.75 },
    "1Y": { "price": 1800.0, "change": 234.5, "changePercent": 13.03 }
  },
  "earliestDate": null
}
```

#### `/api/quotes?key=...`

```json
{
  "success": true,
  "quotes": [
    {
      "symbol": "GC=F",
      "price": 2034.5,
      "change": 12.3,
      "changePercent": "0.61",
      "previousClose": 2022.2
    }
  ]
}
```

### Key Observations for Page CMS Design

1. **Symbol Configuration**: Pages need to store Yahoo Finance symbol(s) to fetch data
2. **Multiple Symbols**: Some pages need ratio/comparison (gold + silver)
3. **API Key Protection**: `/api/quotes` requires key - use server-side calls only
4. **Time Ranges**: Chart supports `7D` and `12M` ranges
5. **Performance Periods**: 30D, 6M, 1Y, 2Y, 3Y, 5Y, 20Y
6. **Error Handling**: API handles missing data gracefully (crypto 20Y, etc.)

---

## Supporting Infrastructure Analysis

### 1. `/lib` - Utility Libraries

| File          | Purpose                                                 |
| ------------- | ------------------------------------------------------- |
| `utils.ts`    | `cn()` - Tailwind classname merger (shadcn/ui standard) |
| `supabase.ts` | Supabase client, auth config (persistSession: false)    |
| `og-utils.ts` | `getOgImage()` - OG image URL generator                 |
| `articles.ts` | Full article CMS functions (CRUD + image management)    |

**Key Insight**: `lib/articles.ts` already has:

- 10 functions for article management
- 6 functions for image management
- All Supabase interactions ready to reuse

### 2. `/hooks` - Custom Hooks

| File           | Purpose                               |
| -------------- | ------------------------------------- |
| `use-toast.ts` | Toast notification system (shadcn/ui) |

**Note**: Only one custom hook - toast notifications. No custom data fetching hooks needed for CMS.

### 3. `/public` - Static Assets

#### Images (65 files)

- **OG Images**: `og-*.jpg` / `og-*.png` - Open Graph images for each page (pre-generated)
- **Logos**: `wordmark-*.png` - Various wordmark versions
- **Charts**: `gold-price-historical-chart.png` - Static historical chart
- **App**: `app-mockup.png`, `goldprice-*.png` - App store badges
- **Profile**: `dave-profile.png`, `dave-gold-price-live.png` - Founder images
- **Favicons**: Multiple sizes + webmanifest

#### Other

- `ads.txt` - Google AdSense authorization

**Key Insight**: OG images are **pre-generated** for each page - important for SEO when dynamic pages are created.

### Public Folder Deep Analysis

| Category           | Files | Purpose                        |
| ------------------ | ----- | ------------------------------ |
| **OG Images**      | 38    | Open Graph social share images |
| **Logos/Branding** | 7     | wordmark variants              |
| **App Assets**     | 4     | app-mockup, store badges       |
| **Profile**        | 2     | Founder images                 |
| **Charts**         | 2     | Historical charts              |
| **Favicons**       | 4     | Site icons                     |
| **PWA**            | 3     | Web manifest files             |

**Total: 61 files**

#### Article Images History (Important Context)

| Era         | Image Storage    | Articles                                                 |
| ----------- | ---------------- | -------------------------------------------------------- |
| **Phase 1** | `public/images/` | Early articles used hardcoded paths                      |
| **Phase 2** | Supabase Storage | Later articles use `article_images` table + `gpl` bucket |
| **Current** | Mixed            | Both sources in use                                      |

**Implication:** `lib/articles.ts` supports both - `featured_image` field stores full URL (either `/images/...` or Supabase URL). Page CMS should follow same hybrid approach.

#### OG Image Strategy for Page CMS

| Option                      | Description           | Recommendation             |
| --------------------------- | --------------------- | -------------------------- |
| **A. Public folder**        | Hardcoded in /images/ | Simple but requires deploy |
| **B. Supabase Storage**     | Dynamic, CMS-managed  | More flexible              |
| **C. On-demand generation** | Auto-created          | Requires service           |

**Current pattern (articles):** Hybrid - accepts any URL string. Follow same for pages.

#### Pages Missing OG Images

| Page             | OG Image Status         |
| ---------------- | ----------------------- |
| `/roadmap`       | ❌ Missing - should add |
| Most price pages | ✅ Exists               |

---

### 4. `/supabase` - Database Schema

**Current Tables:**

| Table            | Purpose                                                            |
| ---------------- | ------------------------------------------------------------------ |
| `articles`       | Blog articles with full SEO fields                                 |
| `article_images` | Image management (referenced in articles.ts but not in schema.sql) |

**Missing from schema.sql**: `article_images` table - may need to add if not present in Supabase.

### Integration Recommendations

1. **Reuse existing `lib/supabase.ts`** - Already configured
2. **Reuse existing `lib/utils.ts`** - Already has `cn()` utility
3. **Create new `lib/pages.ts`** - Page fetching functions (parallel to articles.ts)
4. **OG Images**: Need strategy for dynamic pages - either:
   - Generate on-demand with `og-utils.ts`
   - Allow upload in CMS admin

### Storage

- **Supabase Storage bucket**: `gpl` (already exists for article images)
- Can reuse for page OG images if needed

---

## Configuration Files Analysis

### Key Config Files

| File                 | Purpose                                                              |
| -------------------- | -------------------------------------------------------------------- |
| `.eslintrc.json`     | ESLint: extends `next/core-web-vitals` + `prettier`, format warnings |
| `.prettierrc`        | **Code style**: semicolons, single quotes, 100 char width            |
| `components.json`    | shadcn/ui: `@/*` aliases, Tailwind CSS                               |
| `AGENTS.md`          | **Critical**: defines code style, component structure for AI agents  |
| `next.config.js`     | Security headers, caching rules                                      |
| `tailwind.config.ts` | shadcn/ui design system                                              |
| `tsconfig.json`      | **Strict mode** TypeScript, `@/*` path aliases                       |

### Code Style Requirements (from AGENTS.md)

| Rule        | Setting                                           |
| ----------- | ------------------------------------------------- |
| Semicolons  | Required                                          |
| Quotes      | Single `'...'`                                    |
| Tab width   | 2 spaces                                          |
| Print width | 100 chars                                         |
| TypeScript  | **Strict mode** - no `any`, handle null/undefined |
| Imports     | Group: React/Next → External → Internal           |

### Build Commands

```bash
npm run dev          # Dev server localhost:3000
npm run build        # Production build
npm run lint         # ESLint check
npm run format       # Prettier format
npm run typecheck    # TypeScript check
```

### Environment Variables Required

| Variable                        | Required | Purpose            |
| ------------------------------- | -------- | ------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`      | Yes      | Database           |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes      | Database auth      |
| `NEXT_PUBLIC_YAHOO_API_KEY`     | Yes      | Client-side prices |
| `YAHOO2_API_KEY`                | Yes      | Server-side quotes |

### Implementation Guidelines

1. **Follow AGENTS.md style** - Use exact component structure, import order, naming conventions
2. **Strict TypeScript** - All types required, no `any`, always handle null/undefined
3. **Prettier formatting** - Will auto-format on save (configured in `.prettierrc`)
4. **Use existing aliases** - `@/components`, `@/lib`, `@/hooks`
5. **Reuse lib/supabase.ts** - Don't create new Supabase client
6. **Error handling** - Follow pattern in AGENTS.md for Supabase calls

---

## Dynamic Page Implementation

### Route: `app/[slug]/page.tsx`

1. Fetch page config from Supabase by slug
2. Load components based on `page_components` config
3. Render appropriate components in order

---

## Next Steps

### Current Status: Phase 1-5 Complete ✅

The core dynamic page system is implemented:

- ✅ Database schema with 13 SEO fields
- ✅ 11 seeded pages (locked)
- ✅ lib/pages.ts with CRUD functions
- ✅ Dynamic route `app/[slug]/page.tsx`
- ✅ Dashboard UI for managing pages
- ✅ Slug uniqueness validation
- ✅ Page preview link

### Remaining Tasks

#### High Priority

| Task                    | Description                                        | Status      |
| ----------------------- | -------------------------------------------------- | ----------- |
| Fix default values      | has_ads, has_articles should default to true       | ✅ Complete |
| Implement feature flags | Render ads, articles, calculator based on DB flags | ✅ Complete |
| Add show_earliest_date  | Render for crypto pages                            | ✅ Complete |
| Calculator component    | Extract GoldCalculator from home page              | ✅ Complete |
| page_components table   | Implement flexible component layout                | ✅ Complete |
| Page Components UI      | Dashboard UI to add/remove/reorder components      | ✅ Complete |
| Component reordering    | Add move up/down buttons to reorder components     | ✅ Complete |
| Component config editor | JSON editor for component config in dashboard      | ✅ Complete |
| text_block HTML         | HTML support with DOMPurify sanitization           | ✅ Complete |
| Page layout统一         | Apply max-w-4xl container, single column layout    | ✅ Complete |
| Default components      | Seed default components for commodity/crypto pages | ✅ Complete |

#### Lower Priority

| Task                 | Description                                           | Status      |
| -------------------- | ----------------------------------------------------- | ----------- |
| Component extraction | Extract PriceCard, PerformanceTable from backup pages | ✅ Complete |
| SEO optimization     | Implement internal_links auto-injection               | Not started |
| Schema markup        | Add structured data based on page type                | Not started |

---

## page_components Implementation Plan

### Current Status

- ✅ Table `page_components` exists in schema
- ✅ Component Registry in DynamicPageClient
- ✅ Dashboard UI to add/remove/reorder components
- ✅ max-w-4xl container applied (single column)
- ❌ Default components NOT seeded - pages rely on fallback layout
- ❌ Fallback layout still has hardcoded two-column grid

### New Approach: Fully Component-Based

All page sections should be separate, reorderable components:

| Component   | Description           |
| ----------- | --------------------- |
| hero        | Page title/heading    |
| chart       | CommodityChartCard    |
| performance | PerformanceTable      |
| calculator  | GoldCalculator        |
| articles    | RecentArticlesSection |
| ads         | BannerAd              |
| text_block  | ContentCard           |
| contact     | ContactSidebar        |

**Each component stacks vertically in single column** - no hardcoded grids.

### Implementation Steps

1. **Fix fallback layout** - Remove hardcoded two-column grid, use single column
2. **Seed default components** - Add default components for commodity/crypto pages so they work immediately
3. **Remove feature flag toggles** - Once component system is mature, can remove has_calculator/has_ads/has_articles switches from dashboard

### Testing

| Step       | Test                                                      |
| ---------- | --------------------------------------------------------- |
| 1          | Add components via dashboard to gold-price                |
| 2          | Visit gold-price - verify single column, components stack |
| 3          | Reorder in dashboard - verify order changes on page       |
| 4          | Seed defaults for all commodity/crypto pages              |
| 5          | Verify all pages work without manual component setup      |
| calculator | GoldCalculator                                            |
| articles   | RecentArticlesSection                                     |
| ads        | BannerAd                                                  |
| hero       | Title + description block                                 |
| text_block | ContentCard                                               |
| contact    | ContactSidebar                                            |

#### Phase 2: Integrate DynamicPageClient

- Fetch components via `getPageComponents(pageId)`
- Render dynamically from registry
- Keep fallback for pages without components (backward compat)

#### Phase 3: Dashboard UI

- Add "Components" section to page edit form
- Add/remove/reorder components
- JSON editor for component config

#### Phase 4: Seed Defaults

- Insert default components for existing pages so nothing breaks

### Testing Plan

| Step | Test                                                                   |
| ---- | ---------------------------------------------------------------------- |
| 1    | Run SQL: `SELECT * FROM page_components LIMIT 1` - verify table exists |
| 2    | Create test page with custom component config in DB                    |
| 3    | Visit page - verify custom components render in order                  |
| 4    | Edit page in dashboard - test add/remove/reorder (Phase 3)             |
| 5    | Verify existing pages still work (backward compat)                     |

---

### Development Phases (Reference)

#### Phase 1: Foundation (Database & Utilities) ✅ COMPLETE

**Goal**: Set up infrastructure to support dynamic pages with SEO features

| Step | Task                                            | Testing                                  |
| ---- | ----------------------------------------------- | ---------------------------------------- |
| 1.1  | Create Supabase schema with all 13 SEO fields   | Run SQL in Supabase, verify tables exist |
| 1.2  | Seed data with pre-locked data pages (11 pages) | Verify is_locked=true                    |
| 1.3  | Create `lib/pages.ts` (fetch functions)         | Test functions return data correctly     |
| 1.4  | Test DB connection in app                       | Verify no runtime errors                 |

#### Phase 2: Core Components ✅ COMPLETE

**Goal**: Build reusable UI components

| Step | Task                                     | Testing                               |
| ---- | ---------------------------------------- | ------------------------------------- |
| 2.1  | Build `PriceCard` component              | Render with mock data, verify display |
| 2.2  | Build `PerformanceTable` component       | Test with different time periods      |
| 2.3  | Build `CommodityChartCard` component     | Test chart renders with data          |
| 2.4  | Extract `ContactSidebar` (highest reuse) | Verify matches existing pages         |

#### Phase 3: Dynamic Route ✅ COMPLETE

**Goal**: Enable database-driven pages

| Step | Task                                    | Testing                               |
| ---- | --------------------------------------- | ------------------------------------- |
| 3.1  | Create `app/[slug]/page.tsx`            | Test slug routing works               |
| 3.2  | Integrate components based on page type | Test commodity page renders correctly |
| 3.3  | Handle 404 for unknown slugs            | Verify error handling                 |
| 3.4  | Add SEO metadata from DB                | Test meta tags render                 |

#### Phase 4: Full Integration Test ✅ COMPLETE

**Goal**: End-to-end testing

| Step | Task                                        | Testing                                 |
| ---- | ------------------------------------------- | --------------------------------------- |
| 4.1  | Migrate ONE commodity page (e.g., Aluminum) | Compare with original, ensure parity    |
| 4.2  | Test dynamic route with real data           | Verify Yahoo Finance data flows through |
| 4.3  | Run lint & typecheck                        | Fix any errors                          |
| 4.4  | Browser test                                | Manual verification                     |

#### Phase 5: Expand & Refine ✅ COMPLETE

**Goal**: Complete migration or add admin UI

| Step | Task                              | Testing                     |
| ---- | --------------------------------- | --------------------------- |
| 5.1  | Migrate remaining commodity pages | Each page works identically |
| 5.2  | Add page management to dashboard  | CRUD operations work        |
| 5.3  | Update sitemap integration        | New pages auto-added        |

---

## Page Management Dashboard Plan

### Overview

Add page management to the existing dashboard at `/dashboard`, following the same patterns as the Articles system.

### Current State

| Component                    | Status      |
| ---------------------------- | ----------- |
| Articles dashboard           | ✅ Complete |
| Pages database               | ✅ Complete |
| lib/pages.ts fetch functions | ✅ Complete |
| lib/pages.ts CRUD functions  | ✅ Complete |
| Pages dashboard UI           | ✅ Complete |

### Notes

- **Locked Pages**: Locked pages cannot be edited/deleted via dashboard. This is intentional to prevent accidental changes to core commodity pages.
- **OG Image Upload**: Pages support OG image upload via Supabase storage bucket 'gpl', same as articles.
- **Dashboard UI**: Fully implemented with list view, create/edit form, and locked page protection.
- **Slug Validation**: Unique slug check prevents duplicate slugs.
- **Page Preview**: Preview link in edit form opens page in new tab.
- **Default Values**: has_ads defaults to true, has_articles defaults to true.

### Implementation

#### Step 1: Add CRUD Functions to lib/pages.ts ✅ COMPLETE

Add these functions to `lib/pages.ts`:

- `createPage(pageData)` - Insert new page
- `updatePage(id, pageData)` - Update existing page
- `deletePage(id)` - Delete page (check locked first)

#### Step 2: Update Dashboard Navigation

Add "Pages" link to `app/dashboard/layout.tsx`:

```tsx
<Link href="/dashboard/pages" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
  <FileText size={18} />
  Pages
</Link>
```

#### Step 3: Create Pages List View

Create `app/dashboard/pages/page.tsx`:

- List all pages in table (similar to articles)
- Show: Title, Slug, Type, Category, Locked status, Active status
- Actions: Edit, View, Delete (disabled for locked pages)
- "New Page" button

#### Step 4: Create Page Edit Form

Create `app/dashboard/pages/[id]/page.tsx`:

**Fields to include (grouped):**

| Group              | Fields                                                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Basic**          | Title, Slug, Description                                                                  |
| **Data Source**    | Symbol, Symbol2, Page Type (dropdown: commodity, crypto, ratio, static, legal)            |
| **SEO**            | Meta Title, Meta Description, Meta Keywords, OG Image (with upload), Twitter Card, Robots |
| **Classification** | SEO Page Type, Pillar Slug, Primary Keyword, Related Pages                                |
| **Settings**       | Is Active, Is Locked, Display Order, Category                                             |
| **Features**       | Has Calculator, Has Ads, Has Articles, Show Earliest Date                                 |

**OG Image Upload:**

- Use existing Supabase storage bucket 'gpl' (same as articles)
- Upload button to select image file
- Preview of uploaded image
- Store path in `og_image` field

**Form Features:**

- Pre-fill from database on edit
- Validate slug uniqueness
- Warn when saving locked page
- Preview link to view page

#### Step 5: Handle Locked Pages

- Locked pages show lock icon
- Delete button disabled for locked pages
- Warning: "This page is locked and cannot be edited"

### Page Types Dropdown Options

```tsx
const pageTypes = [
  { value: 'commodity', label: 'Commodity (Gold, Silver, etc.)' },
  { value: 'crypto', label: 'Cryptocurrency' },
  { value: 'ratio', label: 'Ratio (Gold/Silver)' },
  { value: 'static', label: 'Static Content' },
  { value: 'legal', label: 'Legal Page' },
  { value: 'home', label: 'Home Page' },
];
```

### Smart Defaults by Page Type

When creating or editing a page, selecting a page type automatically applies sensible defaults:

| Page Type | has_calculator | has_ads | has_articles | show_earliest_date |
| --------- | -------------- | ------- | ------------ | ------------------ |
| commodity | false          | true    | true         | false              |
| crypto    | false          | true    | true         | true               |
| ratio     | false          | true    | true         | false              |
| static    | false          | false   | false        | false              |
| legal     | false          | false   | false        | false              |
| home      | true           | true    | true         | false              |

Users can still manually override these defaults after selection.

### Files to Create/Modify

| File                                | Action | Purpose                              | Status      |
| ----------------------------------- | ------ | ------------------------------------ | ----------- |
| `lib/pages.ts`                      | Modify | Add create, update, delete functions | ✅ Complete |
| `app/dashboard/layout.tsx`          | Modify | Add "Pages" nav link                 | ✅ Complete |
| `app/dashboard/pages/page.tsx`      | Create | Pages list view                      | ✅ Complete |
| `app/dashboard/pages/[id]/page.tsx` | Create | Page edit/create form                | ✅ Complete |

### Testing Checklist

- [x] Pages list loads from database
- [x] Can create new page
- [x] Can edit existing page
- [x] Locked pages cannot be edited/deleted
- [x] OG image upload works
- [x] Slug validation works
- [x] Changes reflect on live site

---

## Incremental Migration Plan

### Overview

Migrate static pages to use the dynamic route one at a time with testing and commits after each successful migration.

### Backup Strategy

Before migration, backup ALL static price pages:

```bash
# Create backup directory
mkdir -p app/backup-static-pages

# Move each price page to backup
mv app/aluminum-price app/backup-static-pages/
mv app/silver-price app/backup-static-pages/
mv app/platinum-price app/backup-static-pages/
mv app/palladium-price app/backup-static-pages/
mv app/copper-price app/backup-static-pages/
mv app/oil-price app/backup-static-pages/
mv app/natural-gas-price app/backup-static-pages/
mv app/bitcoin-price app/backup-static-pages/
mv app/ethereum-price app/backup-static-pages/
mv app/gold-silver-ratio app/backup-static-pages/
```

### Rollback Strategy

If issues occur after migration:

```bash
# Restore specific page from backup
mv app/backup-static-pages/silver-price app/

# Or restore all
mv app/backup-static-pages/* app/
rmdir app/backup-static-pages
```

**Alternative: Vercel Dashboard Rollback**

- Go to Vercel Dashboard → Deployments
- Find last working deployment
- Click "Promote to Production"

### Migration Steps (One Page at a Time)

| Step | Task                           | Testing                   | Commit               |
| ---- | ------------------------------ | ------------------------- | -------------------- |
| 1    | Move `silver-price` to backup  | Test `/silver-price`      | Commit backup + test |
| 2    | Compare dynamic vs static      | Browser comparison        | Commit if passing    |
| 3    | Repeat for `aluminum-price`    | Test `/aluminum-price`    | Commit               |
| 4    | Repeat for `platinum-price`    | Test `/platinum-price`    | Commit               |
| 5    | Repeat for `palladium-price`   | Test `/palladium-price`   | Commit               |
| 6    | Repeat for `copper-price`      | Test `/copper-price`      | Commit               |
| 7    | Repeat for `oil-price`         | Test `/oil-price`         | Commit               |
| 8    | Repeat for `natural-gas-price` | Test `/natural-gas-price` | Commit               |
| 9    | Repeat for `bitcoin-price`     | Test `/bitcoin-price`     | Commit               |
| 10   | Repeat for `ethereum-price`    | Test `/ethereum-price`    | Commit               |
| 11   | Repeat for `gold-silver-ratio` | Test `/gold-silver-ratio` | Commit               |

### Pre-Migration Checklist

- [ ] Backup all static pages to `app/backup-static-pages/`
- [ ] Verify dynamic route works for target page
- [ ] Run `npm run typecheck` - must pass
- [ ] Run `npm run format` - format code

### Post-Migration Testing Checklist

For each migrated page:

- [ ] Browser test: page loads without errors
- [ ] Compare: dynamic vs backup version side-by-side
- [ ] Chart: renders correctly with real data
- [ ] Performance table: shows correct data
- [ ] Quote: current price displays
- [ ] Console: no JavaScript errors
- [ ] Network: API calls successful (no 500s)

### Risk Mitigation

| Risk          | Mitigation                             |
| ------------- | -------------------------------------- |
| Data mismatch | Compare side-by-side before committing |
| API failures  | Keep backup until verified working     |
| SEO impact    | Verify meta tags in page source        |
| Performance   | Check page load time                   |

### Current Status

| Page                 | Static File | Dynamic Route | Status      |
| -------------------- | ----------- | ------------- | ----------- |
| `/gold-price`        | N/A (home)  | ✅ Working    | ✅ Migrated |
| `/silver-price`      | Backup      | ✅ Working    | ✅ Migrated |
| `/aluminum-price`    | Backup      | ✅ Working    | ✅ Migrated |
| `/platinum-price`    | Backup      | ✅ Working    | ✅ Migrated |
| `/palladium-price`   | Backup      | ✅ Working    | ✅ Migrated |
| `/copper-price`      | Backup      | ✅ Working    | ✅ Migrated |
| `/oil-price`         | Backup      | ✅ Working    | ✅ Migrated |
| `/natural-gas-price` | Backup      | ✅ Working    | ✅ Migrated |
| `/bitcoin-price`     | Backup      | ✅ Working    | ✅ Migrated |
| `/ethereum-price`    | Backup      | ✅ Working    | ✅ Migrated |
| `/gold-silver-ratio` | Backup      | ✅ Working    | ✅ Migrated |

**Backup Location:** `app/backup-static-pages/`

### Testing Strategy

| Level        | Method                                  |
| ------------ | --------------------------------------- |
| Unit         | Component renders with mock data        |
| Integration  | DB queries return correct data          |
| E2E          | Dynamic route + real API data + browser |
| Code Quality | `npm run lint` + `npm run typecheck`    |

### Key Decision Points

After Phase 3 (Dynamic Route), choose:

- **Option A**: Migrate all existing pages (full parity)
- **Option B**: Keep existing pages, add only NEW pages dynamically

---

## Commit Strategy

### When to Commit

Commit after each phase is **tested and verified working**. Never commit broken code.

| Phase       | When to Commit                                                     | Contents                                                |
| ----------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| **Phase 1** | After DB schema runs, lib/pages.ts works, test-page shows 11 pages | `supabase/schema.sql`, `lib/pages.ts`, `app/test-page/` |
| **Phase 2** | After all components extracted and tested in isolation             | New components in `components/`                         |
| **Phase 3** | After dynamic route works with real data                           | `app/[slug]/page.tsx`                                   |
| **Phase 4** | After full migration tested in browser                             | Migrated pages                                          |
| **Phase 5** | After admin UI or remaining work complete                          | Dashboard updates                                       |
| **Phase 6** | After Pages dashboard UI complete                                  | CRUD functions, Pages list, Edit form                   |

### Commit Message Format

Use single quotes in commit messages, not double quotes:

When testing is successful, provide commit messages in this format:

```
feat(page-cms): [brief description]

- [What was done]
- [Why it matters]
- [How to verify]

Testing: Verified via [test method]
```

### Before Commit Checklist

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] Manual browser test completed
- [ ] No console errors
- [ ] Feature works as expected

### Example Commit Messages

**Phase 1 Complete:**

```
feat(page-cms): Add page management system foundation

- Add Supabase schema with pages and page_components tables
- Add 13 SEO fields for dynamic pages
- Seed 11 locked commodity/crypto pages
- Add lib/pages.ts with fetch functions

Testing: Verified via /test-page - all 11 pages load correctly
```

**Phase 2 Complete:**

```
feat(page-cms): Extract reusable page components

- Extract ContactSidebar (used on 6+ pages)
- Add PriceCard, PerformanceTable, CommodityChartCard
- Add ContentCard, ProfileCard for static pages

Testing: Components render correctly with mock data
```

---

## Pages Analyzed

| Page              | Slug               | Type      | Status |
| ----------------- | ------------------ | --------- | ------ |
| Aluminum          | /aluminum-price    | Commodity | ✅     |
| Silver            | /silver-price      | Commodity | ✅     |
| Platinum          | /platinum-price    | Commodity | ✅     |
| Palladium         | /palladium-price   | Commodity | ✅     |
| Copper            | /copper-price      | Commodity | ✅     |
| Oil               | /oil-price         | Commodity | ✅     |
| Natural Gas       | /natural-gas-price | Commodity | ✅     |
| Bitcoin           | /bitcoin-price     | Crypto    | ✅     |
| Ethereum          | /ethereum-price    | Crypto    | ✅     |
| Gold-Silver Ratio | /gold-silver-ratio | Ratio     | ✅     |
| Gold (Home)       | /                  | Home      | ✅     |
| About             | /about             | Static    | ✅     |
| Advertise         | /advertise         | Static    | ✅     |
| Disclaimer        | /disclaimer        | Legal     | ✅     |
| Privacy           | /privacy           | Legal     | ✅     |
| Risk Warning      | /risk-warning      | Legal     | ✅     |
| Contact           | /contact           | Static    | ✅     |

---

### 18. Charts Page (`app/charts/page.tsx`)

**Pattern: Marketing/Landing - Card Grid**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `Link` - Next.js link
- `TrendingUp, LineChart, BarChart3, Clock` - lucide icons

**Inline Elements:**

| Element      | Description                                                   |
| ------------ | ------------------------------------------------------------- |
| Page Title   | `h1` with "Gold Price Charts"                                 |
| Hero Text    | Subtitle describing charts                                    |
| Chart Cards  | 2 cards linking to /gold-price-history and /gold-silver-ratio |
| Info Section | Text explaining how to read charts + learn more link          |

**Components to Extract:**

- **`ChartTypeCard`** - Card with icon, title, description, timeframe badges
- **`InfoSection`** - Text content with optional CTA link

---

### 19. Gold ETFs Page (`app/gold-etfs/page.tsx`)

**Pattern: ETF/Specialized Commodity**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader`, `CardTitle` - shadcn/ui
- `LightweightChart` - chart component
- `ArrowDown, ArrowUp, DollarSign` - imported but unused
- `Select*` - imported but unused
- `Button` - imported but unused

**Inline Elements:**

| Element    | Description                                         |
| ---------- | --------------------------------------------------- |
| Page Title | `h1` with "Gold ETFs"                               |
| Chart Card | SPDR Gold Shares (GLD) 1-year chart + price display |
| ETF Table  | List of popular gold ETFs (GLD, IAU, GLDM, SGOL)    |

**Data Fetching:**

- `/api/chart?symbol=GLD&range=12M` - GLD 12-month chart
- `/api/quotes?symbols=GC=F,SI=F,PL=F,PA=F,HG=F,ALI=F,BTC-USD,ETH-USD,GLD` - quotes including GLD

**Components to Extract:**

- **`ETFPriceCard`** - Chart + current price + change display (specialized PriceCard for ETFs)
- **`ETFListTable`** - Reusable table for ETF listings

---

### 20. Silver ETFs Page (`app/silver-etfs/page.tsx`)

**Identical to Gold ETFs Page**

**Differences:**

- Symbol: `SLV` instead of `GLD`
- ETFs: SLV, SIVR, SIL, SILJ

---

### 21. Roadmap Page (`app/roadmap/page.tsx`)

**Pattern: Checklist/Static Content**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader` - shadcn/ui
- `Button` - shadcn/ui
- `Link` - Next.js link

**Inline Elements:**

| Element        | Description                                     |
| -------------- | ----------------------------------------------- |
| Page Title     | `h1` with "Roadmap"                             |
| Checklist Card | Development checklist with categories and items |
| Contact Card   | Founder story + Substack subscribe button       |

**Unique Pattern:**

- Static checklist data defined in component (not fetched)
- Categories: Content Management, Monetization, Lead Generation, Charts & Content, On-Page SEO, Off-Page SEO, Core Functionality, SEO & Social, Analytics, Code Quality, Testing, Security, Infrastructure, Pre-Launch

**Components to Extract:**

- **`ChecklistSection`** - Category title + list items with completion status
- **`ContactCard`** - Founder bio + Substack CTA (reused across pages)

---

### 22. Gold Price Live App Page (`app/gold-price-live-app/page.tsx`)

**Pattern: App Promotion/Marketing**

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader` - shadcn/ui
- `Button` - shadcn/ui
- `Image` - Next.js image
- `ArrowDown, ArrowUp, DollarSign` - imported but unused
- `Select*` - imported but unused

**Inline Elements:**

| Element         | Description                                               |
| --------------- | --------------------------------------------------------- |
| Page Title      | `h1` with "Gold Price Live App"                           |
| App Mockup Card | Image of app + download button                            |
| Features Card   | App description + feature list + "coming soon" list + CTA |

**Components to Extract:**

- **`AppPromoCard`** - App mockup image + download button
- **`FeatureList`** - Current features list
- **`ComingSoonList`** - Upcoming features list

---

### 23. Terms of Service Page (`app/terms-of-service/page.tsx`)

**Pattern: Legal/Static - Two Column** (Same as Disclaimer, Privacy, Risk Warning)

**Identical structure** - Two-column layout with:

- Left: Legal content (Terms of Service text)
- Right: Contact sidebar (identical across all legal pages)

**Components Used:**

- `MainLayout` - page wrapper
- `Card`, `CardContent`, `CardHeader` - shadcn/ui
- `Button` - shadcn/ui
- `Link` - Next.js link
- `Image` - imported but unused
- `Select*`, `ArrowDown, ArrowUp, DollarSign` - imported but unused

**Note:** The right card (ContactSidebar) is duplicated across Disclaimer, Privacy, Risk Warning, Contact, Terms of Service, and Roadmap pages.

---

## Additional Page Types Identified

| Page Type | Description                        | Examples               |
| --------- | ---------------------------------- | ---------------------- |
| Marketing | Card grid, promotional content     | Charts, App Page       |
| ETF       | ETF-specific chart + fund listings | Gold ETFs, Silver ETFs |
| Checklist | Static checklist with categories   | Roadmap                |

---

## Components to Extract (Updated List)

**EXISTING - reuse and enhance:**

1. `QuoteList` - improve existing `MarketQuotes.tsx` component

**NEW - need to build:** 2. **`PriceCard`** - Reusable price display with current price, change amount, change percent 3. **`PerformanceTable`** - Reusable performance table with dynamic rows 4. **`CommodityChartCard`** - Wrapper combining title, time range selector, LightweightChart 5. **`CurrencySelector`** - Dropdown for currency selection 6. **`GoldCalculator`** - Currency/unit selector + calculation display 7. **`ContentCard`** - Generic card with title + content area 8. **`ProfileCard`** - Card with image + bio text + CTA button 9. **`CTALink`** - Button linking to external URL 10. **`PageTitle`** - Reusable page title component 11. **`RatioChartCard`** - Chart combining 2 symbols 12. **`ComparisonPerformanceTable`** - Table comparing 2+ assets 13. **`ContactSidebar`** - Contact info card (DUPLICATED across 6+ pages - HIGH PRIORITY) 14. **`LegalContentCard`** - Legal text content card 15. **`ChartTypeCard`** - Card with icon, title, description, timeframe badges 16. **`InfoSection`** - Text content with optional CTA link 17. **`ETFPriceCard`** - Chart + current price + change display 18. **`ETFListTable`** - Table for ETF listings 19. **`ChecklistSection`** - Category title + list items with completion status 20. **`AppPromoCard`** - App mockup image + download button 21. **`FeatureList`** - Current features list 22. **`ComingSoonList`** - Upcoming features list

---

## Pages Analyzed (Complete)

| Page                | Slug                 | Type      | Status |
| ------------------- | -------------------- | --------- | ------ |
| Aluminum            | /aluminum-price      | Commodity | ✅     |
| Silver              | /silver-price        | Commodity | ✅     |
| Platinum            | /platinum-price      | Commodity | ✅     |
| Palladium           | /palladium-price     | Commodity | ✅     |
| Copper              | /copper-price        | Commodity | ✅     |
| Oil                 | /oil-price           | Commodity | ✅     |
| Natural Gas         | /natural-gas-price   | Commodity | ✅     |
| Bitcoin             | /bitcoin-price       | Crypto    | ✅     |
| Ethereum            | /ethereum-price      | Crypto    | ✅     |
| Gold-Silver Ratio   | /gold-silver-ratio   | Ratio     | ✅     |
| Gold (Home)         | /                    | Home      | ✅     |
| About               | /about               | Static    | ✅     |
| Advertise           | /advertise           | Static    | ✅     |
| Disclaimer          | /disclaimer          | Legal     | ✅     |
| Privacy             | /privacy             | Legal     | ✅     |
| Risk Warning        | /risk-warning        | Legal     | ✅     |
| Contact             | /contact             | Static    | ✅     |
| Charts              | /charts              | Marketing | ✅     |
| Gold ETFs           | /gold-etfs           | ETF       | ✅     |
| Silver ETFs         | /silver-etfs         | ETF       | ✅     |
| Roadmap             | /roadmap             | Checklist | ✅     |
| Gold Price Live App | /gold-price-live-app | Marketing | ✅     |
| Terms of Service    | /terms-of-service    | Legal     | ✅     |
| Gold Price History  | /gold-price-history  | Static    | ✅     |

---

## Remaining Pages

All pages have been analyzed!
