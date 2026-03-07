# Pagination Plan - News Page

## Overview

Add server-side pagination to `/news` page - display 12 articles per page with navigation controls.

## Current State

- **News page:** Fetches ALL articles, filters by category, no pagination
- **Pagination component:** Already exists at `components/ui/pagination.tsx` (shadcn/ui)

## Changes Required

### File: `app/news/page.tsx`

1. **Add page param** to existing `searchParams`:

   ```typescript
   const page = parseInt(params.page as string) || 1;
   const ARTICLES_PER_PAGE = 12;
   ```

2. **Calculate pagination:**
   - `startIndex = (page - 1) * ARTICLES_PER_PAGE`
   - `endIndex = startIndex + ARTICLES_PER_PAGE`
   - `totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)`
   - Slice articles array

3. **Add pagination UI** below the article grid:
   - Use existing `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`
   - Build URLs preserving category filter: `/news?page=2&category=gold`

4. **Edge cases:**
   - Redirect page=1 to `/news` (cleaner URLs)
   - Hide pagination when only 1 page total

## Result

- `/news` → Page 1 (articles 1-12)
- `/news?page=2` → Page 2 (articles 13-24)
- `/news?category=gold` → Page 1 of gold category
- `/news?category=gold&page=2` → Page 2 of gold category
