# Comprehensive Metals & ETFs Page Build Plan

## Overview

Build out stock and ETF category pages for all metals covered in the metals JSON reference. Target: 30 category pages total (7 already exist, 23 new to create).

**Source JSON**: User-provided comprehensive metals list with companies and ETFs
**Site**: goldpricelive.co
**Tech Stack**: Next.js 16, Supabase, TypeScript

---

## Current State (from Sitemap)

### Existing Stock/ETF Category Pages (7)

| Route              | Category        | Status       |
| ------------------ | --------------- | ------------ |
| `/gold-stocks`     | gold-stocks     | ✓ In sitemap |
| `/silver-stocks`   | silver-stocks   | ✓ In sitemap |
| `/copper-stocks`   | copper-stocks   | ✓ In sitemap |
| `/tungsten-stocks` | tungsten-stocks | ✓ In sitemap |
| `/gold-etfs`       | gold-etfs       | ✓ In sitemap |
| `/silver-etfs`     | silver-etfs     | ✓ In sitemap |
| `/copper-etfs`     | copper-etfs     | ✓ In sitemap |

### Also Existing (Related)

| Route                | Category          | Status       |
| -------------------- | ----------------- | ------------ |
| `/oil-energy-stocks` | oil-energy-stocks | ✓ In sitemap |
| `/platinum-price`    | commodity         | ✓ In sitemap |
| `/palladium-price`   | commodity         | ✓ In sitemap |
| `/aluminum-price`    | commodity         | ✓ In sitemap |

### New Pages to Create: 23

---

## Target Pages (30 Total, 23 New)

### Already Exist (7)

- gold-stocks, gold-etfs, silver-stocks, silver-etfs, copper-stocks, copper-etfs, tungsten-stocks

### Tier 1 - Full Pages (24 new + existing)

#### Precious Metals

| Slug                   | Title                | Type   | Tier |
| ---------------------- | -------------------- | ------ | ---- |
| `gold-stocks`          | Gold Stocks          | stocks | 1    |
| `gold-etfs`            | Gold ETFs            | etfs   | 1    |
| `silver-stocks`        | Silver Stocks        | stocks | 1    |
| `silver-etfs`          | Silver ETFs          | etfs   | 1    |
| `platinum-stocks`      | Platinum Stocks      | stocks | 1    |
| `platinum-etfs`        | Platinum ETFs        | etfs   | 1    |
| `palladium-stocks`     | Palladium Stocks     | stocks | 1    |
| `palladium-etfs`       | Palladium ETFs       | etfs   | 1    |
| `pgm-stocks`           | PGM Stocks           | stocks | 1    |
| `precious-metals-etfs` | Precious Metals ETFs | etfs   | 1    |

#### Base Metals

| Slug                | Title               | Type   | Tier |
| ------------------- | ------------------- | ------ | ---- |
| `copper-stocks`     | Copper Stocks       | stocks | 1    |
| `copper-etfs`       | Copper ETFs         | etfs   | 1    |
| `nickel-stocks`     | Nickel Stocks       | stocks | 1    |
| `nickel-etfs`       | Nickel ETFs         | etfs   | 1    |
| `zinc-stocks`       | Zinc Stocks         | stocks | 1    |
| `aluminum-stocks`   | Aluminum Stocks     | stocks | 1    |
| `iron-steel-stocks` | Iron & Steel Stocks | stocks | 1    |
| `steel-etfs`        | Steel ETFs          | etfs   | 1    |

#### Battery & Critical Minerals

| Slug                       | Title                    | Type   | Tier |
| -------------------------- | ------------------------ | ------ | ---- |
| `lithium-stocks`           | Lithium Stocks           | stocks | 1    |
| `lithium-etfs`             | Lithium ETFs             | etfs   | 1    |
| `uranium-stocks`           | Uranium Stocks           | stocks | 1    |
| `uranium-etfs`             | Uranium ETFs             | etfs   | 1    |
| `rare-earth-stocks`        | Rare Earth Stocks        | stocks | 1    |
| `rare-earth-etfs`          | Rare Earth ETFs          | etfs   | 1    |
| `critical-minerals-stocks` | Critical Minerals Stocks | stocks | 1    |
| `critical-minerals-etfs`   | Critical Minerals ETFs   | etfs   | 1    |

#### Specialty Metals

| Slug              | Title           | Type   | Tier |
| ----------------- | --------------- | ------ | ---- |
| `tungsten-stocks` | Tungsten Stocks | stocks | 1    |
| `antimony-stocks` | Antimony Stocks | stocks | 1    |

### Tier 2 - Thinner Pages (6)

| Slug               | Title            | Type   | Tier |
| ------------------ | ---------------- | ------ | ---- |
| `cobalt-stocks`    | Cobalt Stocks    | stocks | 2    |
| `vanadium-stocks`  | Vanadium Stocks  | stocks | 2    |
| `titanium-stocks`  | Titanium Stocks  | stocks | 2    |
| `silicon-stocks`   | Silicon Stocks   | stocks | 2    |
| `beryllium-stocks` | Beryllium Stocks | stocks | 2    |
| `niobium-stocks`   | Niobium Stocks   | stocks | 2    |

---

## Page Structure

### Category Page Template

Each category page requires:

1. **Database Entry** (`pages` table):
   - `slug`: e.g., `lithium-stocks`
   - `title`: e.g., `Lithium Stocks`
   - `category`: e.g., `lithium-stocks`
   - `page_type`: `stock` or `etf`
   - `meta_title`, `meta_description`
   - `is_active`: true
   - `is_locked`: true
   - `display_order`: numeric

2. **Page Components** (`page_components` table):
   - `hero` - Page title
   - `chart` - Optional: shows symbol chart if provided
   - `stock_table` - Lists all stocks in category (queries by category field)
   - `text_block` - Introductory content about the metal

### Individual Stock Pages

- Slug: `/stock/{ticker}` (e.g., `/stock/NEM`)
- Mapped to category via `category` field
- Existing system at `app/stock/[symbol]/page.tsx`

### ETF Pages

- Similar to stock pages but with ETF symbols
- Page type: `etf`

---

## Company Coverage (NA-Listed Only)

### Filter Criteria

- `na_listed: true` only
- Exchanges: NYSE, NASDAQ, TSX, TSX-V, CSE, OTCQB, OTCQX, OTC
- Excludes: ASX, JSE, LSE, LME, etc.

### Company Count by Category

| Category          | Companies |
| ----------------- | --------- |
| Gold              | 20        |
| Silver            | 10        |
| Platinum          | 3         |
| Palladium         | 2         |
| PGM               | 4         |
| Copper            | 10        |
| Nickel            | 6         |
| Uranium           | 11        |
| Lithium           | 10        |
| Rare Earth        | 10        |
| Tungsten          | 2         |
| Antimony          | 2         |
| Aluminum          | 3         |
| Zinc              | 4         |
| Iron/Steel        | 6         |
| Cobalt            | 2         |
| Vanadium          | 3         |
| Titanium          | 2         |
| Silicon           | 1         |
| Beryllium         | 1         |
| Niobium           | 1         |
| Critical Minerals | 7         |

### ETF Count by Category

| Category          | ETFs |
| ----------------- | ---- |
| Gold              | 10   |
| Silver            | 4    |
| Platinum          | 2    |
| Palladium         | 1    |
| Precious Metals   | 2    |
| Copper            | 5    |
| Nickel            | 1    |
| Lithium           | 2    |
| Uranium           | 4    |
| Rare Earth        | 1    |
| Steel             | 1    |
| Critical Minerals | 6    |

---

## Navigation Plan

### Header Restructure

#### Option A: Keep Existing Structure + Expand

```
Gold Stocks (dropdown)
├── Gold Stocks (/gold-stocks)
├── Gold ETFs (/gold-etfs)
├── Silver Stocks (/silver-stocks)
├── Silver ETFs (/silver-etfs)
├── Platinum Stocks (/platinum-stocks)
├── Platinum ETFs (/platinum-etfs)
├── Palladium Stocks (/palladium-stocks)
├── Palladium ETFs (/palladium-etfs)
├── PGM Stocks (/pgm-stocks)
└── Precious Metals ETFs (/precious-metals-etfs)

Metals (expand existing)
├── Silver Price (/silver-price)
├── Platinum Price (/platinum-price)
├── Palladium Price (/palladium-price)
├── Copper Price (/copper-price)
├── Copper Stocks (/copper-stocks)
├── Copper ETFs (/copper-etfs)
├── Nickel Stocks (/nickel-stocks)
├── Nickel ETFs (/nickel-etfs)
├── Zinc Stocks (/zinc-stocks)
├── Aluminum Stocks (/aluminum-stocks)
├── Iron & Steel Stocks (/iron-steel-stocks)
└── Steel ETFs (/steel-etfs)

Battery & Critical Minerals (new)
├── Lithium Stocks (/lithium-stocks)
├── Lithium ETFs (/lithium-etfs)
├── Uranium Stocks (/uranium-stocks)
├── Uranium ETFs (/uranium-etfs)
├── Rare Earth Stocks (/rare-earth-stocks)
├── Rare Earth ETFs (/rare-earth-etfs)
├── Critical Minerals Stocks (/critical-minerals-stocks)
├── Critical Minerals ETFs (/critical-minerals-etfs)

Specialty Metals
├── Tungsten Stocks (/tungsten-stocks)
├── Antimony Stocks (/antimony-stocks)
├── Cobalt Stocks (/cobalt-stocks)
├── Vanadium Stocks (/vanadium-stocks)
├── Titanium Stocks (/titanium-stocks)
├── Silicon Stocks (/silicon-stocks)
├── Beryllium Stocks (/beryllium-stocks)
└── Niobium Stocks (/niobium-stocks)
```

#### Option B: Simplified Flat List

Keep existing dropdowns but add all new pages as flat links within them.

### Footer Updates

Add new links to appropriate columns:

- Create new "Battery & Critical" column
- Expand "Stocks" column
- Expand "ETFs" column

---

## Stock Symbol Mapping

Add to `app/stock/[symbol]/page.tsx`:

```typescript
const STOCK_CATEGORIES: Record<string, { name: string; href: string }> = {
  // ... existing ...

  // Platinum / PGM
  SBSW: { name: 'PGM Stocks', href: '/pgm-stocks' },
  PLG: { name: 'Platinum Stocks', href: '/platinum-stocks' },
  GENM: { name: 'Platinum Stocks', href: '/platinum-stocks' },

  // Nickel
  VALE: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  CNC: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  NIC: { name: 'Nickel Stocks', href: '/nickel-stocks' },

  // Uranium
  CCJ: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  NXE: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  DNN: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  UUUU: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  EU: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  UEC: { name: 'Uranium Stocks', href: '/uranium-stocks' },

  // Lithium
  ALB: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  ALTM: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  PLL: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  LAC: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  SGML: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  SLI: { name: 'Lithium Stocks', href: '/lithium-stocks' },

  // Rare Earth
  MP: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  UUUU: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },

  // Antimony
  UAMY: { name: 'Antimony Stocks', href: '/antimony-stocks' },
  PPTA: { name: 'Antimony Stocks', href: '/antimony-stocks' },

  // Aluminum
  AA: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },
  CENX: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },
  KALU: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },

  // Zinc
  TECK: { name: 'Zinc Stocks', href: '/zinc-stocks' },
  HBM: { name: 'Zinc Stocks', href: '/zinc-stocks' },

  // Iron/Steel
  NUE: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  STLD: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  X: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  CIA: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  CLF: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },

  // Cobalt
  ELBM: { name: 'Cobalt Stocks', href: '/cobalt-stocks' },

  // Vanadium
  LGO: { name: 'Vanadium Stocks', href: '/vanadium-stocks' },

  // Titanium
  TROX: { name: 'Titanium Stocks', href: '/titanium-stocks' },

  // Silicon
  GSM: { name: 'Silicon Stocks', href: '/silicon-stocks' },

  // Beryllium
  MTRN: { name: 'Beryllium Stocks', href: '/beryllium-stocks' },

  // Niobium
  NB: { name: 'Niobium Stocks', href: '/niobium-stocks' },
};
```

---

## Execution Order

### Phase 1: Migration Script

1. Create `scripts/create-all-stock-etf-pages.ts`
2. Parse JSON and create:
   - Category pages (23 new - excluding 7 that exist)
   - Individual stock pages (filter na_listed: true, exclude existing)
   - Individual ETF pages
   - Page components
3. User executes script

### Phase 2: Navigation

1. Update `components/layout/Header.tsx`
2. Update `components/layout/Footer.tsx`

### Phase 3: Symbol Mapping

1. Update `app/stock/[symbol]/page.tsx` with new tickers

### Phase 4: Verification

1. Run `npm run lint`
2. Run `npm run typecheck`
3. Manual browser test - check a few pages render
4. Verify stock table component works for new categories

---

## Files to Modify

| File                                    | Action       |
| --------------------------------------- | ------------ |
| `scripts/create-all-stock-etf-pages.ts` | Create (new) |
| `components/layout/Header.tsx`          | Update       |
| `components/layout/Footer.tsx`          | Update       |
| `app/stock/[symbol]/page.tsx`           | Update       |

---

## Notes

- **No dedicated vehicle**: 22 metals have no dedicated NA ETF or pure-play stock. These are documented in JSON `no_dedicated_vehicle` section. Best proxies: REMX, SETM, PICK, XME.
- **ETFs only**: palladium, nickel have miner ETFs but no pure-play stocks on NA exchanges
- **Hub pages**: critical-minerals-stocks and critical-minerals-etfs serve as hub pages for metals with limited dedicated coverage
- **Component system**: Uses existing `stock_table` component that queries by category

---

## Source JSON Reference

Location: User-provided JSON (comprehensive metals list)
Structure:

```json
{
  "pages": [
    {
      "slug": "...",
      "title": "...",
      "metal": "...",
      "page_type": "stocks" | "etfs",
      "tier": 1 | 2,
      "companies": [{ "name", "ticker", "exchange", "na_listed", "type", "description" }],
      "etfs": [{ "ticker", "name", "exchange", "na_listed", "type", "description" }]
    }
  ]
}
```
