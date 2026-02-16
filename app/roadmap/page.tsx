import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';

export default function Roadmap() {
  const checklistItems = [
    {
      category: 'Monetization',
      items: [
        { text: 'Add Google Ads placements across key pages.', completed: false },
        {
          text: 'Optimize ad positions for visibility without harming user experience.',
          completed: false,
        },
        { text: 'Test ad density and formats for best revenue performance.', completed: false },
      ],
    },
    {
      category: 'Lead Generation',
      items: [
        { text: 'Add email lead capture forms for the Investors Gold Substack.', completed: true },
        {
          text: 'Place signup forms in high-traffic areas (header, sidebar, end of articles, pop-ups).',
          completed: true,
        },
        {
          text: 'Create a compelling incentive to subscribe (e.g., reports, alerts, insights).',
          completed: false,
        },
      ],
    },
    {
      category: 'Charts & Content',
      items: [
        {
          text: 'Improve existing gold price charts (design, speed, usability, mobile responsiveness).',
          completed: false,
        },
        { text: 'Add new chart types and timeframes.', completed: false },
        { text: 'Build out additional content pages and resources.', completed: false },
        { text: 'Add browser and app icons.', completed: true },
        { text: 'Complete alpha mobile app, launch and add links.', completed: false },
        { text: 'Secure APIs.', completed: false },
      ],
    },
    {
      category: 'On-Page SEO',
      items: [
        {
          text: 'Interlink related articles and pages to improve crawlability and rankings.',
          completed: false,
        },
        {
          text: 'Optimize titles, meta descriptions, headings, and internal anchor text.',
          completed: false,
        },
        { text: 'Ensure proper keyword targeting on each page.', completed: false },
        { text: 'Improve page speed and mobile optimization.', completed: false },
      ],
    },
    {
      category: 'Off-Page SEO',
      items: [
        { text: 'Acquire high-quality backlinks from relevant sites.', completed: false },
        {
          text: 'Submit sites to reputable directories and financial resources.',
          completed: false,
        },
        { text: 'Pursue guest posts, partnerships, and mentions.', completed: false },
        { text: 'Monitor backlink profile and domain authority growth.', completed: false },
      ],
    },
    {
      category: 'Core Functionality & Data Accuracy',
      items: [
        {
          text: 'Verify gold price data fetching from Yahoo Finance works correctly in production (no CORS issues, no stale data)',
          completed: false,
        },
        {
          text: 'Secure Yahoo Finance API calls: proxy all requests through your own backend/API route, implement rate limiting, caching, and error handling with fallbacks',
          completed: false,
        },
        { text: 'Store any keys/URLs in environment variables only', completed: false },
        {
          text: 'Test date/time calculations and handling (real-time updates, historical ranges, UTC vs. local timezone)',
          completed: false,
        },
        {
          text: 'Validate price display: formatting, decimal places, currency symbols, refresh intervals',
          completed: false,
        },
      ],
    },
    {
      category: 'SEO & Social Sharing',
      items: [
        {
          text: 'Add and verify Open Graph tags (og:title, og:description, og:image, og:url) on all key pages',
          completed: true,
        },
        {
          text: 'Set proper meta tags on every page (title, description, keywords, canonical, robots)',
          completed: false,
        },
        {
          text: 'Generate and link favicon + all modern icons (apple-touch-icon, android-chrome, etc.)',
          completed: true,
        },
        {
          text: 'Generate and submit sitemap.xml (include all important pages, verify in Google Search Console)',
          completed: true,
        },
        { text: 'Confirm robots.txt allows crawling of public content', completed: false },
      ],
    },
    {
      category: 'Analytics, Ads & Monetization',
      items: [
        { text: 'Implement Google Analytics (GA4) tracking', completed: true },
        {
          text: 'Place Google Ads units (responsive, display, auto-ads) – test placement and check for CLS issues',
          completed: false,
        },
        {
          text: 'Integrate Substack signup form – test submission, confirmation flow, and styling',
          completed: true,
        },
      ],
    },
    {
      category: 'Code Quality & Build Process',
      items: [
        { text: 'Run full ESLint check – fix all errors and warnings', completed: false },
        { text: 'Run Prettier check/format – ensure consistent code style', completed: false },
        { text: 'Run TypeScript type checking – zero errors', completed: false },
        { text: 'Build locally (npm run build) – no errors or warnings', completed: false },
        {
          text: 'Analyze production bundle size – optimize large dependencies/images',
          completed: false,
        },
      ],
    },
    {
      category: 'Testing & Reliability',
      items: [
        { text: 'All unit & integration tests pass (Jest/Vitest)', completed: false },
        {
          text: 'End-to-end tests pass (Cypress/Playwright) – cover price display, refresh, forms',
          completed: false,
        },
        { text: 'Verify full mobile responsiveness across major screen sizes', completed: false },
        { text: 'Cross-browser testing (Chrome, Firefox, Safari, Edge)', completed: false },
        {
          text: 'Confirm real-time/live price updates work smoothly (WebSocket or polling fallback)',
          completed: false,
        },
        {
          text: 'Test various error states (API unavailable, offline, malformed data)',
          completed: false,
        },
      ],
    },
    {
      category: 'Security & Performance',
      items: [
        { text: 'Enforce HTTPS everywhere (consider adding HSTS header)', completed: true },
        {
          text: 'Add important security headers (CSP, X-Content-Type-Options, X-Frame-Options, Permissions-Policy)',
          completed: true,
        },
        { text: 'Run vulnerability scan (npm audit, Snyk, or equivalent)', completed: false },
        { text: 'Set appropriate cache-control headers for static assets', completed: false },
        { text: 'Minify and optimize images, fonts, JS, and CSS', completed: false },
      ],
    },
    {
      category: 'Infrastructure & Deployment',
      items: [
        {
          text: 'Verify all environment variables are correctly set on hosting platform (Vercel/Netlify/etc.)',
          completed: false,
        },
        { text: 'Test custom domain + valid SSL certificate', completed: false },
        {
          text: 'Confirm proper redirects (www ↔ non-www or chosen canonical version)',
          completed: false,
        },
        {
          text: 'Set up monitoring and error tracking (Sentry, LogRocket, etc.)',
          completed: false,
        },
        {
          text: 'Prepare rollback plan (keep previous working deployment/build accessible)',
          completed: false,
        },
      ],
    },
    {
      category: 'Final Pre-Launch Checklist',
      items: [
        {
          text: 'Perform soft launch / staging → production smoke test: visit key pages, check live data refresh, test form submissions',
          completed: false,
        },
        { text: 'Confirm zero console errors/warnings in production build', completed: false },
        { text: 'Run Lighthouse audit – aim for performance score ≥ 90', completed: false },
      ],
    },
  ];

  return (
    <MainLayout>
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Roadmap</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className=" border-neutral-800">
          <CardHeader>
            <p className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
              Development Checklist
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-base mb-4">Last updated: February 16, 2026</p>

            {checklistItems.map((section, idx) => (
              <div key={idx} className="mb-6">
                <p className="text-base font-semibold mb-2">{section.category}</p>
                <ul className="list-disc pl-6 space-y-1">
                  {section.items.map((item: { text: string; completed: boolean }, itemIdx) => (
                    <li
                      key={itemIdx}
                      style={{
                        textDecoration: item.completed ? 'line-through' : 'none',
                        color: item.completed ? '#9ca3af' : 'inherit',
                      }}
                    >
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className=" border-neutral-800">
          <CardContent>
            <div className="overflow-x-auto">
              <div className="flex flex-col px-6 py-8">
                <p className="text-2xl md:text-3xl font-bold  mb-3 tracking-tight">
                  Contact Dave at Gold Price live
                </p>

                <p className="text-md font-medium mb-6  max-w-md">
                  I started Gold Price Live as a vibe coding project to help me share what I have
                  learned about investing, finance and precious metals.
                </p>

                <p className="text-base  leading-relaxed max-w-lg mb-8">
                  "Gold is the money of kings." — Anonymous
                </p>

                <p className="text-base  font-semibold mb-3">
                  For Advertising and Business Inquiries
                </p>

                <p className="mb-3">
                  Reach savvy investors interested in gold and precious metals investing. Advertise
                  on Gold Price Live.
                </p>

                <p className="mb-3">Contact: westrock@protonmail.com</p>
                <p className="my-1 text-base text-md">
                  Learn more about ads here 👉 &nbsp;
                  <a
                    href="/advertise"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" hover:underline"
                  >
                    Advertise on Gold Price Live
                  </a>
                </p>

                <p className="text-xs text-neutral-800 text-center mt-6 mb-6">
                  We respond within 24 hours. Packages available.
                </p>

                <Button className="w-full bg-orange-500 hover:bg-yellow-600  font-semibold">
                  <Link
                    href="https://investorsgold.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe to Investor's Gold on Substack
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
