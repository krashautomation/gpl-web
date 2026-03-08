# AGENTS.md - Agentic Coding Guidelines

Guidelines for AI agents operating in this repository.

## Project Overview

**Gold Price Live** - A Next.js 16 app for tracking live precious metals, commodities, and cryptocurrency prices with real-time charts and educational content.

**Tech Stack**: Next.js 16 (App Router), TypeScript 5.2 (strict), Tailwind CSS 3.3, shadcn/ui (Radix), Lightweight Charts, Supabase, npm

## Build Commands

```bash
npm run dev          # Start dev server localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Format all files with Prettier
npm run format:check # Check formatting without fixing
npm run typecheck    # TypeScript type check only
# No test framework - test manually in browser
```

## Code Style

### Prettier

`{"semi": true, "singleQuote": true, "tabWidth": 2, "trailingComma": "es5", "printWidth": 100, "bracketSpacing": true, "arrowParens": "avoid"}`

### ESLint

- Extends: `next/core-web-vitals` + `prettier`
- Rules: `prettier/prettier` set to `warn`

### TypeScript

- **Strict mode** - all type annotations required
- Use `type` for unions/interfaces, `interface` for object shapes
- Never use `any` - use `unknown` if truly unknown
- Always handle null/undefined

### Imports

Use path alias `@/*`. Group: React/Next → External libs → Internal:

```typescript
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
```

### Naming

- **Components**: PascalCase (`Header.tsx`)
- **Files**: kebab-case configs, PascalCase components
- **Functions**: camelCase with verb prefix (`fetchData`)
- **Constants**: SCREAMING_SNAKE_CASE

### Component Structure

```typescript
'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export function ComponentName({ className, children }: Props) {
  const [state, setState] = useState(false);

  useEffect(() => {
    // effect logic
  }, []);

  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  );
}
```

### Tailwind CSS

Use `cn()` from `lib/utils.ts`. Mobile-first approach.

### Error Handling

```typescript
try {
  const { data, error } = await supabase.from('table').select('*');
  if (error) throw new Error(`Failed: ${error.message}`);
  return data;
} catch (err) {
  console.error('Fetch error:', err);
  return [];
}
```

## Project Structure

```
gpl-web/
├── app/                    # Next.js App Router pages
│   ├── [slug]/page.tsx     # Dynamic page route (database-driven)
│   ├── [slug]/DynamicPageClient.tsx
│   ├── dashboard/          # Admin dashboard (dev mode)
│   │   ├── articles/       # Article management
│   │   └── pages/         # Page management
│   └── news/[slug]/       # Dynamic blog posts
├── components/
│   ├── layout/            # Header, Footer, MainLayout
│   ├── ui/                # shadcn/ui components
│   └── LightweightChart.tsx
├── lib/
│   ├── utils.ts           # cn() utility
│   ├── supabase.ts        # Supabase client
│   ├── articles.ts        # Article CMS functions
│   └── pages.ts           # Page CMS functions (CRUD)
├── supabase/
│   └── schema.sql         # Database schema
├── content/articles/       # MDX blog posts (legacy)
└── public/                # Static assets
```

## Key Libraries

### Supabase Client

```typescript
import { supabase } from '@/lib/supabase';
// Configured with auth: { persistSession: false }
```

### Pages Library (`lib/pages.ts`)

Use for page management operations:

```typescript
import {
  getPageBySlug,
  getAllPagesAdmin,
  createPage,
  updatePage,
  deletePage,
  isSlugUnique,
  isPageLocked,
} from '@/lib/pages';
```

- `getPageBySlug(slug)` - Fetch page by URL slug
- `getAllPagesAdmin()` - Fetch all pages for dashboard
- `createPage(data)` - Create new page
- `updatePage(id, data)` - Update existing page
- `deletePage(id)` - Delete page (checks locked status)
- `isSlugUnique(slug, excludeId?)` - Validate unique slug
- `isPageLocked(id)` - Check if page is locked

### Articles

Articles are stored in Supabase `articles` table. Access via dashboard at `/dashboard` (dev mode only).

### MDX Articles (Legacy)

Articles previously stored in `content/articles/*.mdx` - now migrated to Supabase.

```mdx
---
title: 'Article Title'
excerpt: 'Brief description'
author: 'Author Name'
date: '2026-02-15'
category: 'Market Analysis'
tags: ['tag1', 'tag2']
---
```

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://goldpricelive.co
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_YAHOO_API_KEY=your-yahoo-api-key
```

## Testing

No test framework. Test manually: run `npm run dev`, open `http://localhost:3000`, test in browser, then run `npm run lint` and `npm run typecheck` before committing.

## Commit Strategy

### When to Commit

- Commit after each feature/phase is **tested and verified working**
- Never commit broken code
- Run `npm run lint` and `npm run typecheck` before committing

### Before Commit Checklist

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] Manual browser test completed
- [ ] No console errors
- [ ] Feature works as expected

### Commit Message Format

Use single quotes in commit messages, not double quotes:

```
feat/fix/chore: [brief description]

- [What was done]
- [Why it matters]
- [How to verify]

Testing: Verified via [test method]
```

## Before Editing Files

1. Always read the current file content first to ensure you have the latest version
2. Check git status to see if there are uncommitted changes that might be lost
3. If working across WSL/Windows, verify file sync is working properly

---

## Common Tasks

### Adding a New Page

1. Create `app/page-name/page.tsx`
2. Add `layout.tsx` if needed
3. Add metadata export for SEO
4. Add route to Header in `components/layout/Header.tsx`

### Adding a New UI Component

1. Copy from shadcn/ui or create new in `components/ui/`
2. Follow component structure above

### Adding a Blog Article

1. Create `content/articles/slug/index.mdx`
2. Add frontmatter
3. Auto-generates at `/news/slug`

## Cursor Rules

- `.cursor/commands/codeloop.md` - Code loop command reference
