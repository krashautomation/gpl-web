import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const newContent = `<p class="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Development Checklist</p>
<p class="text-base mb-4">Last updated: March 11, 2026</p>

<p class="text-base font-semibold mb-2">Content Management</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li style="text-decoration: line-through; color: #9ca3af;">Build admin dashboard for article management (/dashboard)</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Add AI article import feature using Claude/OpenAI</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Implement image upload and management system</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Add dynamic sitemap with timestamps for SEO</li>
</ul>

<p class="text-base font-semibold mb-2">Monetization</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Add Google Ads placements across key pages.</li>
  <li>Optimize ad positions for visibility without harming user experience.</li>
  <li>Test ad density and formats for best revenue performance.</li>
</ul>

<p class="text-base font-semibold mb-2">Lead Generation</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li style="text-decoration: line-through; color: #9ca3af;">Add email lead capture forms for the Investors Gold Substack.</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Place signup forms in high-traffic areas (header, sidebar, end of articles, pop-ups)</li>
  <li>Create a compelling incentive to subscribe (e.g., reports, alerts, insights).</li>
</ul>

<p class="text-base font-semibold mb-2">Charts & Content</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Improve existing gold price charts (design, speed, usability, mobile responsiveness).</li>
  <li>Add new chart types and timeframes.</li>
  <li>Build out additional content pages and resources.</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Add browser and app icons.</li>
  <li>Complete alpha mobile app, launch and add links.</li>
  <li>Secure APIs.</li>
</ul>

<p class="text-base font-semibold mb-2">On-Page SEO</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Interlink related articles and pages to improve crawlability and rankings.</li>
  <li>Optimize titles, meta descriptions, headings, and internal anchor text.</li>
  <li>Ensure proper keyword targeting on each page.</li>
  <li>Improve page speed and mobile optimization.</li>
</ul>

<p class="text-base font-semibold mb-2">Off-Page SEO</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Acquire high-quality backlinks from relevant sites.</li>
  <li>Submit sites to reputable directories and financial resources.</li>
  <li>Pursue guest posts, partnerships, and mentions.</li>
  <li>Monitor backlink profile and domain authority growth.</li>
</ul>

<p class="text-base font-semibold mb-2">Core Functionality & Data Accuracy</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Verify gold price data fetching from Yahoo Finance works correctly in production (no CORS issues, no stale data)</li>
  <li>Secure Yahoo Finance API calls: proxy all requests through your own backend/API route, implement rate limiting, caching, and error handling with fallbacks</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Store any keys/URLs in environment variables only</li>
  <li>Test date/time calculations and handling (real-time updates, historical ranges, UTC vs. local timezone)</li>
  <li>Validate price display: formatting, decimal places, currency symbols, refresh intervals</li>
</ul>

<p class="text-base font-semibold mb-2">SEO & Social Sharing</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li style="text-decoration: line-through; color: #9ca3af;">Add and verify Open Graph tags (og:title, og:description, og:image, og:url) on all key pages</li>
  <li>Set proper meta tags on every page (title, description, keywords, canonical, robots)</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Generate and link favicon + all modern icons (apple-touch-icon, android-chrome, etc.)</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Generate and submit sitemap.xml (include all important pages, verify in Google Search Console)</li>
</ul>

<p class="text-base font-semibold mb-2">Analytics, Ads & Monetization</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li style="text-decoration: line-through; color: #9ca3af;">Implement Google Analytics (GA4) tracking</li>
  <li>Place Google Ads units (responsive, display, auto-ads) – test placement and check for CLS issues</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Integrate Substack signup form – test submission, confirmation flow, and styling</li>
</ul>

<p class="text-base font-semibold mb-2">Code Quality & Build Process</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Run full ESLint check – fix all errors and warnings</li>
  <li>Run Prettier check/format – ensure consistent code style</li>
  <li>Run TypeScript type checking – zero errors</li>
  <li>Build locally (npm run build) – no errors or warnings</li>
  <li>Analyze production bundle size – optimize large dependencies/images</li>
</ul>

<p class="text-base font-semibold mb-2">Testing & Reliability</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>All unit & integration tests pass (Jest/Vitest)</li>
  <li>End-to-end tests pass (Cypress/Playwright) – cover price display, refresh, forms</li>
  <li>Verify full mobile responsiveness across major screen sizes</li>
  <li>Cross-browser testing (Chrome, Firefox, Safari, Edge)</li>
  <li>Confirm real-time/live price updates work smoothly (WebSocket or polling fallback)</li>
  <li>Test various error states (API unavailable, offline, malformed data)</li>
</ul>

<p class="text-base font-semibold mb-2">Security & Performance</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li style="text-decoration: line-through; color: #9ca3af;">Enforce HTTPS everywhere (consider adding HSTS header)</li>
  <li style="text-decoration: line-through; color: #9ca3af;">Add important security headers (CSP, X-Content-Type-Options, X-Frame-Options, Permissions-Policy)</li>
  <li>Run vulnerability scan (npm audit, Snyk, or equivalent)</li>
  <li>Set appropriate cache-control headers for static assets</li>
  <li>Minify and optimize images, fonts, JS, and CSS</li>
</ul>

<p class="text-base font-semibold mb-2">Infrastructure & Deployment</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Verify all environment variables are correctly set on hosting platform (Vercel/Netlify/etc.)</li>
  <li>Test custom domain + valid SSL certificate</li>
  <li>Confirm proper redirects (www ↔ non-www or chosen canonical version)</li>
  <li>Set up monitoring and error tracking (Sentry, LogRocket, etc.)</li>
  <li>Prepare rollback plan (keep previous working deployment/build accessible)</li>
</ul>

<p class="text-base font-semibold mb-2">Final Pre-Launch Checklist</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li>Perform soft launch / staging → production smoke test: visit key pages, check live data refresh, test form submissions</li>
  <li>Confirm zero console errors/warnings in production build</li>
  <li>Run Lighthouse audit – aim for performance score ≥ 90</li>
</ul>

<p class="text-base font-semibold mb-2">To Do (New Pages)</p>
<ul class="text-base list-disc pl-6 space-y-1 mb-4">
  <li><a href="/why-gold-price-changes" class="text-yellow-500 hover:underline">Why Gold Prices Change</a> - Educational content on gold price drivers</li>
  <li><a href="/gold-price-per-gram" class="text-yellow-500 hover:underline">Gold Price Per Gram</a> - Gram pricing explained</li>
  <li><a href="/gold-price-chart" class="text-yellow-500 hover:underline">Gold Price Chart</a> - Historical charts and trends</li>
  <li><a href="/investing-in-gold" class="text-yellow-500 hover:underline">Investing in Gold</a> - Beginner investment guide</li>
  <li><a href="/sell-gold" class="text-yellow-500 hover:underline">How to Sell Gold</a> - Selling guide</li>
  <li><a href="/gold-vs-silver" class="text-yellow-500 hover:underline">Gold vs Silver</a> - Comparison guide</li>
  <li><a href="/gold-investment-strategies" class="text-yellow-500 hover:underline">Gold Investment Strategies</a> - Investment strategies</li>
</ul>

<p class="text-base font-semibold mb-2">Contact Dave at Gold Price Live</p>
<p class="text-base mb-3">I started Gold Price Live as a vibe coding project to help me share what I have learned about investing, finance and precious metals.</p>
<p class="text-base mb-3">"Gold is the money of kings." — Anonymous</p>
<p class="text-base font-semibold mb-3">For Advertising and Business Inquiries</p>
<p class="text-base mb-3">Reach savvy investors interested in gold and precious metals investing. Advertise on Gold Price Live.</p>
<p class="text-base mb-3">Contact: westrock@protonmail.com</p>
<p class="text-base mb-3">We respond within 24 hours. Packages available.</p>`;

async function updateRoadmap() {
  // Find roadmap page
  const { data: page, error: pageError } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'roadmap')
    .single();

  if (pageError || !page) {
    console.error('Error finding roadmap page:', pageError);
    return;
  }

  console.log('Found roadmap page:', page.id);

  // Find text_block component
  const { data: component, error: compError } = await supabase
    .from('page_components')
    .select('id')
    .eq('page_id', page.id)
    .eq('component_type', 'text_block')
    .single();

  if (compError || !component) {
    console.error('Error finding text_block component:', compError);
    return;
  }

  console.log('Found text_block component:', component.id);

  // Update content
  const { error: updateError } = await supabase
    .from('page_components')
    .update({ config: { content: newContent } })
    .eq('id', component.id);

  if (updateError) {
    console.error('Error updating roadmap:', updateError);
    return;
  }

  console.log('Roadmap updated successfully!');
}

updateRoadmap().catch(console.error);
