# Best way to deploy this project

This app is a **Next.js 16** site (goldpricelive.co-style) with Yahoo Finance data, MDX, and optional on-demand revalidation. The recommended production deployment is **Vercel**.

---

## 1. Deploy on Vercel

1. Push your code to **GitHub** (or GitLab/Bitbucket).
2. Go to [vercel.com](https://vercel.com) → **Add New** → **Project**.
3. Import your `gpl-web` repo. Vercel will detect Next.js and set:
   - **Build Command:** `next build` (default)
   - **Output:** Next.js (default)
   - **Install Command:** `npm install` (default)
4. Before first deploy, set **Environment Variables** (see below).
5. Click **Deploy**. Later deploys run automatically on push to your main branch.

Your existing `vercel.json` is valid (HSTS headers). You do **not** need to enable “MDX” in the dashboard; Next.js 16 with `@next/mdx` is enough.

---

## 2. Required environment variables

In Vercel: **Project → Settings → Environment Variables**. Add:

| Variable                    | Where used                                                | Required                        |
| --------------------------- | --------------------------------------------------------- | ------------------------------- |
| `NEXT_PUBLIC_SITE_URL`      | Metadata, OG images (default: `https://goldpricelive.co`) | Optional                        |
| `NEXT_PUBLIC_YAHOO_API_KEY` | Client-side Yahoo Finance (price pages, charts)           | **Yes**                         |
| `YAHOO2_API_KEY`            | Server route `app/api/quotes/route.js`                    | **Yes**                         |
| `REVALIDATE_SECRET`         | On-demand revalidation `app/api/revalidate/route.ts`      | **Yes** (if you use revalidate) |

Set them for **Production** (and optionally Preview if you want same behavior in PR previews).

---

## 3. Build and runtime notes

- **Node:** Vercel uses a supported Node version by default; no change needed unless you rely on a specific version.
- **Images:** `next.config.js` has `images: { unoptimized: true }`. That’s fine for Vercel; if you later switch to Vercel’s image optimization, you can remove that and use the default.
- **Headers:** Security and cache headers are already in `next.config.js`; `vercel.json` adds HSTS. No extra config needed for a standard deploy.

---

## 4. After deploy

- Open the **Deployments** tab to see build logs and the live URL.
- Use **Vercel Analytics** (you have `@vercel/analytics`) by enabling it in the project’s **Analytics** section if desired.
- To trigger on-demand revalidation, call your revalidate API with the `REVALIDATE_SECRET` you set.

---

## 5. Optional: check env before deploy

Run the project’s API-key check script locally (with the same env names you’ll use in Vercel):

```bash
node scripts/check_api_keys.js
```

Then mirror those variables in Vercel’s Environment Variables.

---

**Summary:** Connect the repo to Vercel, set `NEXT_PUBLIC_YAHOO_API_KEY`, `YAHOO2_API_KEY`, and `REVALIDATE_SECRET` (and optionally `NEXT_PUBLIC_SITE_URL`), then deploy. No extra build or framework settings are required.
