# Stock Pages Generation Plan

## Overview

Generate stock pages programmatically by fetching stock lists from Yahoo Finance ETF holdings, then create individual pages for each stock.

---

## Data Source: ETF Holdings (Recommended)

We can automatically fetch stock lists from established ETFs:

| Category      | ETF Symbol | Approx Stocks | Yahoo API                                               |
| ------------- | ---------- | ------------- | ------------------------------------------------------- |
| Gold Miners   | GDX        | ~50           | `yahoo.quoteSummary('GDX', {modules: ['topHoldings']})` |
| Silver Miners | SIL        | ~40           | `yahoo.quoteSummary('SIL', {modules: ['topHoldings']})` |
| Oil/Energy    | XLE        | ~20           | `yahoo.quoteSummary('XLE', {modules: ['topHoldings']})` |

---

## Data Flow

```
1. Script fetches ETF holdings from Yahoo
2. Stores stock list in local JSON file
3. For each stock, fetches details from Yahoo:
   - Company name
   - Current price
   - Description
4. Creates pages in database
```

---

## Data Storage

### Local JSON Files (scripts/data/)

Store fetched data for reference and re-use:

```
scripts/data/
├── gold-mining-stocks.json
├── silver-mining-stocks.json
├── oil-energy-stocks.json
└── all-stocks.json
```

### JSON Structure

```json
{
  "category": "gold-mining-stocks",
  "etf": "GDX",
  "fetchedAt": "2026-03-11T00:00:00Z",
  "stocks": [
    {
      "symbol": "NEM",
      "name": "Newmont Corporation",
      "sector": "Basic Materials",
      "industry": "Gold",
      "marketCap": "50B"
    }
  ]
}
```

---

## Updated Script Workflow

```typescript
// 1. Fetch ETF holdings
const gdxHoldings = await yahoo.quoteSummary('GDX', { modules: ['topHoldings'] });
const stocks = gdxHoldings.topHoldings.holdings;

// 2. Save to JSON
await writeFile('scripts/data/gold-mining-stocks.json', stocks);

// 3. For each stock, fetch details
for (const stock of stocks) {
  const quote = await yahoo.quote(stock.symbol);
  const summary = await yahoo.quoteSummary(stock.symbol, { modules: ['summaryDetail'] });

  // 4. Create page in database
  await createPage({
    slug: `stock/${stock.symbol}`,
    symbol: stock.symbol,
    title: `${stock.name} Stock Price`,
    // ...
  });
}
```

---

## Data Requirements

### Option A: Minimal Data (Recommended)

Provide a JSON array with just the symbols. The script will fetch company names and data from Yahoo Finance.

```json
{
  "symbols": ["NEM", "GOLD", "KGC", "AEM", "AU", "WPM", "KLR", "EGO", "MUX"]
}
```

**Script will fetch from Yahoo:**

- Company name
- Current price
- Description (from Yahoo)

---

### Option B: Full Data (More Control)

Provide complete data for each page:

```json
{
  "pages": [
    {
      "symbol": "NEM",
      "slug": "stock/NEM",
      "title": "NEM Stock Price | Newmont Corporation",
      "description": "Track Newmont Corporation (NEM) stock price, charts, and performance data.",
      "category": "gold-mining",
      "exchange": "NYSE"
    }
  ]
}
```

---

## JSON Schema

### Minimal Input (Option A)

```json
{
  "categories": [
    {
      "slug": "gold-mining-stocks",
      "title": "Gold Mining Stocks",
      "description": "Track gold mining company stocks with live prices and charts.",
      "symbol": "GDX",
      "pages": ["NEM", "GOLD", "KGC", "AEM", "AU", "WPM", "KLR", "EGO", "MUX"]
    },
    {
      "slug": "silver-mining-stocks",
      "title": "Silver Mining Stocks",
      "description": "Track silver mining company stocks with live prices and charts.",
      "symbol": "SIL",
      "pages": ["PAAS", "AG", "FN", "HL", "CDE", "EXK", "AUU", "SVM"]
    }
  ]
}
```

### Full Input (Option B)

```json
{
  "categories": [
    {
      "slug": "gold-mining-stocks",
      "title": "Gold Mining Stocks",
      "description": "Track gold mining company stocks with live prices and charts.",
      "symbol": "GDX",
      "pages": [
        {
          "symbol": "NEM",
          "name": "Newmont Corporation",
          "slug": "stock/NEM",
          "description": "Newmont Corporation is one of the world's largest gold mining companies..."
        }
      ]
    }
  ]
}
```

---

## Page Structure

Each stock page will have:

| Component   | Source                                    |
| ----------- | ----------------------------------------- |
| Hero        | Title: "{Name} Stock Price"               |
| Chart       | Symbol from input (NEM, GOLD, etc.)       |
| Performance | Symbol from input                         |
| Text Block  | Company description (fetched or provided) |

---

## Migration Script Structure

```typescript
// scripts/generate-stock-pages.ts

interface StockInput {
  symbol: string;
  name?: string;
  slug?: string;
  description?: string;
}

interface CategoryInput {
  slug: string;
  title: string;
  description: string;
  symbol: string; // For chart (e.g., GDX for gold miners ETF)
  pages: StockInput[];
}

// Script will:
// 1. Read JSON file with stock symbols
// 2. For each symbol, optionally fetch company name from Yahoo
// 3. Create page in database with:
//    - slug: stock/{symbol} (e.g., stock/NEM)
//    - symbol: {symbol}
//    - page_type: 'stock'
//    - hero + chart + performance + text_block components
// 4. Output progress and errors
```

---

## Example: Gold Mining Stocks

### Input JSON (symbols only)

```json
{
  "categories": [
    {
      "slug": "gold-mining-stocks",
      "title": "Gold Mining Stocks",
      "description": "Track gold mining company stocks including Newmont, Barrick Gold, Kinross, and more with live prices and charts.",
      "symbol": "GDX",
      "pages": ["NEM", "GOLD", "KGC", "AEM", "AU", "WPM", "KLR", "EGO", "MUX", "HL"]
    }
  ]
}
```

### What Script Does

1. Creates category page: `/gold-mining-stocks`
   - Hero: "Gold Mining Stocks"
   - Chart: GDX (VanEck Gold Miners ETF)
   - Text: List of all stock symbols with links

2. Creates individual stock pages: `/stock/NEM`, `/stock/GOLD`, etc.
   - Hero: "{Company Name} Stock Price"
   - Chart: {Symbol} (NEM, GOLD, etc.)
   - Performance: {Symbol}
   - Text: Company description

---

## Yahoo Finance Integration

### What We Can Fetch

| Data    | API Method                   | Use Case                      |
| ------- | ---------------------------- | ----------------------------- |
| Quote   | `yahoo.quote(symbol)`        | Current price, change, volume |
| Chart   | `yahoo.chart(symbol)`        | Historical data               |
| Summary | `yahoo.quoteSummary(symbol)` | Company description, sector   |

### Rate Limits

- Yahoo Finance API has rate limits
- Consider adding delays between requests
- Cache results to avoid repeated calls

---

## Deliverables

1. **Migration script**: `scripts/generate-stock-pages.ts`
2. **Input JSON template**: `scripts/stocks-input.json`
3. **Instructions**: How to prepare data

---

## Steps to Execute

1. **Prepare data**: Provide JSON with stock symbols (Option A) or full data (Option B)
2. **Review**: Confirm symbols and categories
3. **Run script**: `npx tsx scripts/generate-stock-pages.ts`
4. **Verify**: Check pages in dashboard
5. **Deploy**: Push to production

---

## Questions (Answered)

1. **How many stocks?** ~110 (50 gold + 40 silver + 20 energy)
2. **Categories?** gold, silver, oil/energy → **Answered: Fetched from ETF holdings**
3. **URL pattern?** → **Answered: `/stock/NEM`**
4. **Data source?** → **Answered: Yahoo Finance ETF holdings (GDX, SIL, XLE)**
5. **Priority?** → Gold mining first, then silver, then oil/energy

---

## Planned Categories

### Gold Mining Stocks

```
NEM, GOLD, KGC, AEM, AU, WPM, KLR, EGO, MUX, HL
```

### Silver Mining Stocks

```
PAAS, AG, FN, HL, CDE, EXK, AUU, SVM, SAND, MAG
```

### Oil & Energy Stocks

```
XOM, CVX, COP, EOG, SLB, MPC, VLO, PSX, OXY, HAL
```

### Commodities/Metals (Future)

- Platinum mining
- Palladium mining
- Copper mining
- Aluminum

---

NEM, GOLD, KGC, AEM, AU, WPM, KLR, EGO, MUX, HL

```

### Silver Mining Stocks (Sample)

```

PAAS, AG, FN, HL, CDE, EXK, AUU, SVM, SAND, MAG

```

### Oil & Energy Stocks (Sample)

```

XOM, CVX, COP, EOG, SLB, MPC, VLO, PSX, OXY, HAL

```

### Technology Stocks (Sample)

```

AAPL, MSFT, GOOGL, AMZN, NVDA, META, TSLA, AMD, INTC, CRM

```

```
