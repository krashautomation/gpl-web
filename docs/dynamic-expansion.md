# Dynamic ETF/Stock Expansion Plan

## Overview

Build a system to dynamically display lists of securities (ETFs, stocks) with live price data from Yahoo Finance, with each security linking to its own detail page with a chart.

---

## Vision

### Pages to Create

| Page             | Description                  | Symbols              |
| ---------------- | ---------------------------- | -------------------- |
| `/gold-etfs`     | List of Gold ETFs            | GLD, IAU, GLDM, SGOL |
| `/silver-etfs`   | List of Silver ETFs          | SLV, SIVR, SIL       |
| `/gold-stocks`   | List of Gold mining stocks   | NEM, GOLD, KGC, etc. |
| `/silver-stocks` | List of Silver mining stocks | PAAS, AG, FN, etc.   |
| `/oil-stocks`    | List of Oil/energy stocks    | XOM, CVX, etc.       |

### Detail Pages (Future)

| Page         | Description                     |
| ------------ | ------------------------------- |
| `/etf/GLD`   | SPDR Gold Shares chart          |
| `/stock/NEM` | Newmont Gold mining stock chart |
| `/etf/SLV`   | iShares Silver Trust chart      |

---

## Yahoo Finance API Research

### Capabilities

The `yahoo-finance2` library provides:

1. **Quote** - Current price, change, volume for a symbol
2. **Historical** - Chart data (used by `/api/chart` endpoint)
3. **Search** - Symbol lookup by query (not fully tested)

### Potential Approaches

#### Option A: Yahoo Search API

```typescript
// Not fully tested - need to verify this works
const results = await yahoo.search('gold ETF');
// Returns list of matching symbols
```

**Pros:** Automatic, always up-to-date
**Cons:** May not return exact list you want, rate limits

#### Option B: Manual Symbol List + Live Prices

```typescript
// Define symbols in database
const goldEtfs = ['GLD', 'IAU', 'GLDM', 'SGOL'];

// Fetch live quotes for each
const quotes = await Promise.all(goldEtfs.map(symbol => yahoo.quote(symbol)));
```

**Pros:** Full control over which securities listed, reliable
**Cons:** Manual updates when adding/removing securities

#### Option C: Hybrid

- Store base list in database
- Optionally refresh from Yahoo search periodically
- Human reviews before publishing

---

## Implementation Options

### Option 1: Simple (Current) - text_block

Migrate existing pages as-is using text_block with static HTML table.

**Pros:** Quick, no code changes
**Cons:** Manual updates required

### Option 2: Database-driven Table Component

Create reusable table component that:

1. Takes list of symbols as config
2. Fetches live quotes on page load
3. Renders table with symbol, name, price, change

**Pros:** Live data, reusable
**Cons:** More development work

### Option 3: Full Dynamic with Detail Pages

Build complete system:

1. Database table for security categories
2. Table component with live data
3. Individual detail pages for each security
4. (Optional) Auto-populate from Yahoo search

**Pros:** Most flexible, expandable
**Cons:** Significant development effort

---

## Recommended Approach

### Phase 1: Quick Win

Migrate `/gold-etfs` and `/silver-etfs` using text_block with hardcoded table.

### Phase 2: Table Component (Recommended)

Build a reusable `table` component that:

- Accepts array of symbols in component config
- Fetches live quotes via API
- Renders: Symbol | Name | Price | Change

```typescript
// Component config
{
  "symbols": ["GLD", "IAU", "GLDM", "SGOL"],
  "columns": ["symbol", "name", "price", "change"],
  "linkColumn": "symbol",
  "linkPrefix": "/security/"
}
```

### Phase 3: Security Detail Pages

Create `/security/[symbol]` route:

- Fetches chart data for that security
- Reuses existing chart component

### Phase 4: (Optional) Yahoo Search Integration

Research Yahoo search API to potentially auto-populate lists.

---

## Technical Implementation Notes

### API Rate Limits

- Yahoo Finance API has rate limits
- Consider caching quotes for 5+ minutes
- Use client-side polling (already implemented in existing pages)

### Symbol Types

| Type                  | Examples     | API Symbol Format |
| --------------------- | ------------ | ----------------- |
| Commodities (futures) | Gold, Silver | GC=F, SI=F        |
| ETFs                  | GLD, SLV     | GLD, SLV          |
| Stocks                | NEM, AAPL    | NEM, AAPL         |
| Crypto                | Bitcoin      | BTC-USD           |

All work with the same `/api/chart` endpoint.

### Database Schema (Future)

```sql
-- Option: Add to existing pages table
ALTER TABLE pages ADD COLUMN symbol_list text[];

-- Or: New table for security lists
CREATE TABLE security_lists (
  id uuid PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text NOT NULL, -- 'etf', 'stock'
  symbols text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE security_detail (
  symbol text PRIMARY KEY,
  name text,
  category text,
  exchange text,
  updated_at timestamptz
);
```

---

## Tasks

| #   | Task                                          | Priority | Status  |
| --- | --------------------------------------------- | -------- | ------- |
| 1   | Migrate /gold-etfs with text_block            | High     | Pending |
| 2   | Migrate /silver-etfs with text_block          | High     | Pending |
| 3   | Create reusable table component               | Medium   | Pending |
| 4   | Update migrated pages to use table component  | Medium   | Pending |
| 5   | Create /security/[symbol] detail pages        | Low      | Pending |
| 6   | Research Yahoo search API for auto-population | Low      | Pending |

---

## Questions to Resolve

1. Should we use Yahoo search to auto-discover ETFs/stocks, or maintain manual lists?
2. How many total securities do you want to list? (affects API usage)
3. What's priority: faster migration now, or building the dynamic system first?
4. Should detail pages use `/etf/GLD` or `/security/GLD` URL pattern?
