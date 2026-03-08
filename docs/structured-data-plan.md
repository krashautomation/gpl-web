# Structured Data Implementation Plan

Implementation of Google Search structured data markup for enhanced SEO and rich results.

---

## Applicable Schema Types

| Schema Type        | Priority | Status             |
| ------------------ | -------- | ------------------ |
| BreadcrumbList     | High     | Pending            |
| Article            | High     | Pending            |
| FAQPage            | Medium   | Pending (Homepage) |
| Organization       | Medium   | Pending            |
| WebSite + WebPage  | Low      | Pending            |
| Dedicated FAQ Page | Medium   | Pending            |

---

## Phase 1: Foundation

### Create `lib/structured-data.ts`

Create reusable utilities for generating JSON-LD structured data.

**Features:**

- TypeScript interfaces for all schema types
- Helper functions to generate properly formatted JSON-LD
- `Script` component wrapper for Next.js App Router

---

## Phase 2: BreadcrumbList

**Files:** MainLayout or per-page components

**Implementation:**

- Inject into `<head>` of all pages
- Format: Home > Category > Current Page

**Example paths:**

- `/` → Home
- `/news` → Home > News
- `/news/gold-price-forecast` → Home > News > Article Title
- `/gold-price-live-app` → Home > App

---

## Phase 3: Article Schema

**Files:** `app/news/[slug]/page.tsx`

**JSON-LD properties:**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article title",
  "image": ["featured_image_url"],
  "datePublished": "2026-03-07",
  "dateModified": "2026-03-07",
  "author": [
    {
      "@type": "Person",
      "name": "Author name"
    }
  ],
  "description": "Article excerpt"
}
```

**Data source:** Existing Article fields from Supabase

---

## Phase 4: FAQPage Schema (Homepage)

**Files:** `app/page.tsx`

**Approach:** Keep FAQ on homepage for now, add JSON-LD markup to existing FAQ content.

**Extract from existing content on homepage:**

- "How much is your gold worth?"
- "How much was your gold worth when you bought it?"
- "How much profit have you made on your gold?"
- "How much is any gold coin worth in any currency?"
- "All major exchange rates"
- "How much is your scrap gold worth?"
- "How much is any Karat of your gold jewelry worth?"
- "What change should you give in gold coins?"
- "How much gold can you buy with your currency?"
- "How much is your gold worth in any currency?"
- "Convert between ounces, grams and kilos"
- "How much will you pay to buy or sell gold?"

---

## Phase 5: Dedicated FAQ Page

**New route:** `/faq`

**Purpose:** Better SEO for FAQ-rich results (FAQPage schema works best on dedicated FAQ pages)

**Implementation:**

- Create new `app/faq/page.tsx`
- Move FAQ content from homepage to dedicated page
- Full FAQPage JSON-LD implementation
- Link to it from header/footer

---

## Phase 6: Organization Schema

**Files:** `app/layout.tsx` or `app/page.tsx`

**JSON-LD:**

```json
{
  "@type": "Organization",
  "name": "Gold Price Live",
  "url": "https://goldpricelive.co",
  "logo": "https://goldpricelive.co/favicon.ico",
  "sameAs": ["https://twitter.com/goldpricelive", "https://facebook.com/goldpricelive"]
}
```

**Logo:** Use favicon.ico for now (user can upload proper logo later)

---

## Phase 7: WebSite + WebPage

**Files:** `app/page.tsx`

**WebSite schema** (enables search box in results):

```json
{
  "@type": "WebSite",
  "name": "Gold Price Live",
  "url": "https://goldpricelive.co",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://goldpricelive.co/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**Note:** Requires `/search` route to exist or return results

---

## Implementation Order

| #   | Task                            | Priority | Effort |
| --- | ------------------------------- | -------- | ------ |
| 1   | Create `lib/structured-data.ts` | High     | Low    |
| 2   | BreadcrumbList on all pages     | High     | Medium |
| 3   | Article schema on news pages    | High     | Medium |
| 4   | FAQPage on homepage             | Medium   | Low    |
| 5   | Organization schema             | Medium   | Low    |
| 6   | WebSite/WebPage schema          | Low      | Low    |
| 7   | Dedicated FAQ page              | Medium   | Medium |

---

## Testing

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org)

---

## Notes

- **Logo:** Using favicon.ico for Organization schema. User can upload proper logo (recommended: 112x112px minimum, PNG/WebP) for knowledge panel display.
- **FAQ:** Kept on homepage initially. Consider moving to dedicated `/faq` page for better FAQ rich results eligibility.
- **Search action:** WebSite schema includes searchAction - requires `/search` route or will 404.
