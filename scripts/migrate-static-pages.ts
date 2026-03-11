import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables.');
  console.log(
    'Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.production'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const pages = [
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    description:
      'Gold Price Live Privacy Policy - How we collect, use, and protect your information.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Privacy Policy | Gold Price Live',
    meta_description:
      'Learn how Gold Price Live collects, uses, and protects your personal information.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    description: 'Gold Price Live Terms of Service - Terms and conditions for using our service.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Terms of Service | Gold Price Live',
    meta_description: 'Terms and conditions for using Gold Price Live service.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    description: 'Gold Price Live Disclaimer - Important information about our service.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Disclaimer | Gold Price Live',
    meta_description: 'Important disclaimer about the information provided on Gold Price Live.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'risk-warning',
    title: 'Risk Warning',
    description:
      'Gold Price Live Risk Warning - Understand the risks of investing in precious metals.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Risk Warning | Gold Price Live',
    meta_description: 'Important risk warnings for investing in gold, silver, and precious metals.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'about',
    title: 'About Us',
    description: 'Learn about Gold Price Live and our mission to empower everyday investors.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'About Us | Gold Price Live',
    meta_description:
      'Learn about Gold Price Live and our mission to provide accurate precious metals prices.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    description: 'Contact Gold Price Live - Get in touch with us for inquiries.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Contact Us | Gold Price Live',
    meta_description:
      'Contact Gold Price Live for advertising, business inquiries, or general questions.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  },
  {
    slug: 'advertise',
    title: 'Advertise',
    description:
      'Advertise on Gold Price Live - Reach savvy investors interested in precious metals.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Advertise | Gold Price Live',
    meta_description:
      'Advertise on Gold Price Live to reach investors interested in gold and precious metals.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'gold-price-live-app',
    title: 'Gold Price Live App',
    description: 'Download the Gold Price Live app for real-time precious metals tracking.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Price Live App | Real-Time Precious Metals Tracker',
    meta_description:
      'Download the Gold Price Live app for Android - real-time gold and silver prices.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'gold-etfs',
    title: 'Gold ETFs',
    description:
      'Track popular Gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust, and more.',
    page_type: 'commodity',
    symbol: 'GLD',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold ETFs | SPDR Gold Shares GLD Price & Chart',
    meta_description:
      'Track popular Gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust, and more with live charts and prices.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'silver-etfs',
    title: 'Silver ETFs',
    description: 'Track popular Silver ETFs including iShares Silver Trust (SLV), and more.',
    page_type: 'commodity',
    symbol: 'SLV',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Silver ETFs | iShares Silver Trust SLV Price & Chart',
    meta_description:
      'Track popular Silver ETFs including iShares Silver Trust (SLV), and more with live charts and prices.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'gold-price-history',
    title: 'Gold Price History',
    description:
      'Explore 100 years of gold price history with historical charts and performance data.',
    page_type: 'commodity',
    symbol: 'GC=F',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Price History | 100 Year Chart',
    meta_description:
      'Explore 100 years of gold price history with historical charts and performance data.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
  {
    slug: 'charts',
    title: 'Gold Price Charts',
    description:
      'View interactive gold price charts with historical data. Track gold price trends over time with daily, weekly, monthly, and yearly charts.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Price Charts | Live Charts & Historical Data',
    meta_description:
      'View interactive gold price charts with historical data. Track gold price trends over time with daily, weekly, monthly, and yearly charts.',
    has_calculator: false,
    has_ads: false,
    has_articles: false,
  },
];

const textContents: Record<string, string> = {
  privacy: `<p class="text-base mb-3">Last updated: February 12, 2026</p>
<p class="text-base mb-3">Gold Price Live ("we," "us," or "our") operates the gold price live website and any associated mobile application (collectively, the "Service"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our app.</p>
<p class="text-base mb-3">This Service provides live and historical gold (and related precious metals) price data, charts, and related financial information for informational purposes only. It is not investment advice, and we do not provide financial services.</p>
<p class="text-base mb-3"><strong>Information We Collect</strong></p>
<p class="text-base mb-3">We collect minimal personal information. In most cases, you can use the Service without providing any personal data. We may collect:</p>
<p class="text-base mb-3">- Device and usage information (e.g., IP address, browser type, device type, operating system, pages visited, time spent, and referring URLs) automatically via cookies, analytics tools, or server logs.</p>
<p class="text-base mb-3">- If you contact us, subscribe to alerts, or create an account (if available), we may collect your email address, name, or other contact details you voluntarily provide.</p>
<p class="text-base mb-3">We do not collect sensitive financial information, payment details, or precise geolocation unless explicitly provided and necessary for a feature.</p>
<p class="text-base mb-3"><strong>How We Use Your Information</strong></p>
<p class="text-base mb-3">We use the collected information to:</p>
<p class="text-base mb-3">- Operate, maintain, and improve the Service (e.g., display live prices, generate charts).</p>
<p class="text-base mb-3">- Analyze usage trends and enhance user experience.</p>
<p class="text-base mb-3">- Respond to inquiries or provide support.</p>
<p class="text-base mb-3">- Comply with legal obligations.</p>
<p class="text-base mb-3">We do not sell your personal information to third parties.</p>`,

  'terms-of-service': `<p class="text-base mb-3">Last updated: February 12, 2026</p>
<p class="text-base mb-3">These Terms of Service ("Terms") govern your access to and use of the Gold Price Live website and any related mobile application (collectively, the "Service"). By accessing or using the Service, you agree to these Terms. If you do not agree, do not use the Service.</p>
<p class="text-base mb-3">The Service provides live and historical gold (and related precious metals) prices, charts, and information for personal, non-commercial use only. It is not investment, financial, tax, or legal advice. All content is provided "as is" for informational purposes.</p>
<p class="text-base mb-3"><strong>1. Eligibility</strong></p>
<p class="text-base mb-3">You must be at least 18 years old (or the age of majority in your jurisdiction) to use the Service. The Service is not directed to children under 13.</p>
<p class="text-base mb-3"><strong>2. Use Restrictions</strong></p>
<p class="text-base mb-3">You may not:</p>
<p class="text-base mb-3">- Copy, reproduce, modify, distribute, or create derivative works of the Service or its content without permission.</p>
<p class="text-base mb-3">- Use the Service for any commercial purpose or to compete with it.</p>
<p class="text-base mb-3">- Use automated tools (bots, scrapers, etc.) to access or extract data without express permission.</p>
<p class="text-base mb-3">- Interfere with the Service, violate laws, or infringe third-party rights.</p>
<p class="text-base mb-3"><strong>3. Intellectual Property</strong></p>
<p class="text-base mb-3">All content, design, logos, and trademarks on the Service are owned by us or our licensors. You are granted a limited, non-exclusive, non-transferable license to view and use the Service for personal, non-commercial purposes only.</p>
<p class="text-base mb-3"><strong>4. No Investment Advice</strong></p>
<p class="text-base mb-3">Gold and precious metals prices are volatile. The Service does not provide investment, trading, or financial advice. Do not make financial decisions based solely on information from the Service. Consult a qualified professional before investing.</p>`,

  disclaimer: `<p class="text-base mb-3">Disclaimer for Gold Price Live</p>
<p class="text-base mb-3">Gold Price Live provides live and historical gold prices, charts, and related information sourced from third-party providers believed to be reliable. However, we do not guarantee the accuracy, completeness, timeliness, or reliability of any data displayed on the site.</p>
<p class="text-base mb-3">All content is provided for informational and educational purposes only and should not be considered financial, investment, tax, or legal advice. The information on this site does not take into account your personal financial situation, investment objectives, or risk tolerance.</p>
<p class="text-base mb-3">Precious metals prices are highly volatile and subject to rapid change. Past performance is not indicative of future results. Visitors are solely responsible for their own investment decisions and should conduct independent research and consult with a qualified financial advisor before making any purchases, sales, or investments.</p>`,

  'risk-warning': `<p class="text-base mb-3">Investing in gold, silver, or any precious metals involves significant risk and is not suitable for everyone. Prices can be highly volatile and may fluctuate dramatically due to economic, geopolitical, market, supply/demand, currency, interest rate, and other factors beyond our control.</p>
<p class="text-base mb-3">Gold Price Live provides price data, charts, and information sourced from third parties believed to be reliable, but we make no representations or warranties about the accuracy or completeness of this information.</p>
<p class="text-base mb-3">You should not rely on this information for investment decisions. Consult a qualified financial advisor before investing in precious metals or any financial instruments.</p>
<p class="text-base mb-3">Past performance does not guarantee future results. Your capital is at risk.</p>`,

  about: `<p class="text-base mb-3">At Gold Price Live, our mission is to empower everyday investors with accurate real-time gold prices, in-depth market analysis, and proven strategies.</p>
<p class="text-base mb-3">My investing journey evolved through cycles of innovation, volatility, and timeless value.</p>
<p class="text-base mb-3">It began in tech: backing startups in AI, cloud, and smartphones.</p>
<p class="text-base mb-3">Thrilling gains came from disruption, but bubbles burst, teaching me to value fundamentals over hype and avoid emotional bets.</p>
<p class="text-base mb-3">Crypto followed in the mid-2010s—Bitcoin as digital gold, altcoins, DeFi booms.</p>`,

  contact: `<p class="text-base mb-3">I started Gold Price Live as a vibe coding project to help me share what I have learned about investing, finance and precious metals.</p>
<p class="text-base mb-3">Today I believe real wealth grows through genuine connection, bold idea-sharing, and creative partnerships—let's talk gold, markets, or your next big move.</p>
<p class="text-base mb-3">If you want to see more of my writings signup below. Otherwise, keep reading for my contact information.</p>
<p class="text-base mb-3"><strong>For Advertising and Business Inquiries</strong></p>
<p class="text-base mb-3">Reach savvy investors interested in gold and precious metals investing. Advertise on Gold Price Live.</p>
<p class="text-base mb-3">Contact: westrock@protonmail.com</p>`,

  advertise: `<p class="text-base mb-3">Advertise on Gold Price Live to reach a targeted audience of precious metals investors.</p>
<p class="text-base mb-3">Our visitors are actively researching gold, silver, and commodity investments. They are engaged, informed investors looking for real-time data and market analysis.</p>
<p class="text-base mb-3"><strong>Why Advertise With Us?</strong></p>
<p class="text-base mb-3">- Targeted audience of precious metals investors</p>
<p class="text-base mb-3">- Real-time price data attracts serious investors</p>
<p class="text-base mb-3">- Competitive advertising rates</p>
<p class="text-base mb-3">- Various ad formats available</p>
<p class="text-base mb-3"><strong>Contact</strong></p>
<p class="text-base mb-3">For advertising inquiries, contact: westrock@protonmail.com</p>
<p class="text-base mb-3">We respond within 24 hours. Packages available.</p>`,

  'gold-price-live-app': `<p class="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Gold Price Live App</p>
<p class="text-lg md:text-xl font-medium mb-6 text-center max-w-md">Real-Time Precious Metals & Market Tracker</p>
<p class="text-base leading-relaxed text-center max-w-lg mb-8">Stay ahead of the market with live gold prices, silver prices, and major market indexes — updated in real time on your Android device.</p>
<p class="text-sm font-medium mb-4">Current features:</p>
<ul class="text-sm list-disc list-inside mb-6 space-y-1.5">
  <li>Live spot prices for Gold (XAU/USD) and Silver (XAG/USD)</li>
  <li>Real-time major market indexes</li>
  <li>Clean, fast, mobile-optimized interface</li>
  <li>Available now on Android</li>
</ul>
<p class="text-base font-semibold mb-3">More powerful features coming soon:</p>
<p class="text-sm text-center mb-8 max-w-md">Portfolio tracking • Price alerts • Interactive charts • Historical data • And much more…</p>
<p class="text-xs text-center mt-6">Download Gold Price Live now and never miss a move in the precious metals market!</p>`,

  roadmap: `<p class="text-2xl md:text-3xl font-bold mb-3 tracking-tight">Development Checklist</p>
<p class="text-base mb-4">Last updated: March 7, 2026</p>

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
  <li style="text-decoration: line-through; color: #9ca3af;">Place signup forms in high-traffic areas (header, sidebar, end of articles, pop-ups).</li>
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

<p class="text-base font-semibold mb-2">Contact Dave at Gold Price Live</p>
<p class="text-base mb-3">I started Gold Price Live as a vibe coding project to help me share what I have learned about investing, finance and precious metals.</p>
<p class="text-base mb-3">"Gold is the money of kings." — Anonymous</p>
<p class="text-base font-semibold mb-3">For Advertising and Business Inquiries</p>
<p class="text-base mb-3">Reach savvy investors interested in gold and precious metals investing. Advertise on Gold Price Live.</p>
<p class="text-base mb-3">Contact: westrock@protonmail.com</p>
<p class="text-base mb-3">We respond within 24 hours. Packages available.</p>`,

  'gold-etfs': `<p class="text-xl font-semibold mb-4">Popular Gold ETFs</p>
<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="text-left py-2 text-sm font-semibold">Name</th>
        <th class="text-right py-2 text-sm font-semibold">Symbol</th>
        <th class="text-right py-2 text-sm font-semibold">Country</th>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr class="border-b border-neutral-800">
        <td class="py-3">SPDR Gold Shares</td>
        <td class="text-right">GLD</td>
        <td class="text-right">US</td>
      </tr>
      <tr class="border-b border-neutral-800">
        <td class="py-3">iShares Gold Trust</td>
        <td class="text-right">IAU</td>
        <td class="text-right">US</td>
      </tr>
      <tr class="border-b border-neutral-800">
        <td class="py-3">SPDR Gold MiniShares Trust</td>
        <td class="text-right">GLDM</td>
        <td class="text-right">US</td>
      </tr>
      <tr>
        <td class="py-3">abrdn Physical Gold Shares ETF</td>
        <td class="text-right">SGOL</td>
        <td class="text-right">US</td>
      </tr>
    </tbody>
  </table>
  <p class="text-xs text-neutral-500 text-center mt-4">Prices updated every 5 minutes</p>
</div>`,

  'silver-etfs': `<p class="text-xl font-semibold mb-4">Popular Silver ETFs</p>
<div class="overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="border-b border-neutral-700">
        <th class="text-left py-2 text-sm font-semibold">Name</th>
        <th class="text-right py-2 text-sm font-semibold">Symbol</th>
        <th class="text-right py-2 text-sm font-semibold">Country</th>
      </tr>
    </thead>
    <tbody class="text-sm">
      <tr class="border-b border-neutral-800">
        <td class="py-3">iShares Silver Trust</td>
        <td class="text-right">SLV</td>
        <td class="text-right">US</td>
      </tr>
      <tr class="border-b border-neutral-800">
        <td class="py-3">abrdn Physical Silver Shares ETF</td>
        <td class="text-right">SIVR</td>
        <td class="text-right">US</td>
      </tr>
      <tr class="border-b border-neutral-800">
        <td class="py-3">Global X Silver Miners ETF</td>
        <td class="text-right">SIL</td>
        <td class="text-right">US</td>
      </tr>
      <tr>
        <td class="py-3">Amplify Junior Silver Miners ETF</td>
        <td class="text-right">SILJ</td>
        <td class="text-right">US</td>
      </tr>
    </tbody>
  </table>
  <p class="text-xs text-neutral-500 text-center mt-4">Prices updated every 5 minutes</p>
</div>`,

  'gold-price-history': `<div class="mb-6">
  <img src="/images/gold-price-historical-chart.png" alt="Gold Prices - 100 Year Historical Chart" class="shadow-lg w-full h-auto" />
  <p class="text-xs text-neutral-500 text-center mt-4">Gold Prices - 100 Year Historical Chart (macrotrends.net)</p>
</div>`,

  charts: `<div class="grid grid-cols-1 gap-6 mb-12">
  <a href="/gold-price-history" class="block p-6 border border-neutral-800 rounded-lg hover:border-yellow-500 transition-colors">
    <h3 class="text-xl font-semibold mb-2">Historical Gold Prices</h3>
    <p class="text-neutral-400 mb-4">Long-term gold price trends and analysis</p>
    <div class="flex flex-wrap gap-2">
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">20 Years</span>
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">10 Years</span>
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">5 Years</span>
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">1 Year</span>
    </div>
  </a>
  <a href="/gold-silver-ratio" class="block p-6 border border-neutral-800 rounded-lg hover:border-yellow-500 transition-colors">
    <h3 class="text-xl font-semibold mb-2">Gold Silver Ratio</h3>
    <p class="text-neutral-400 mb-4">Compare gold and silver price movements</p>
    <div class="flex flex-wrap gap-2">
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">1Y</span>
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">5Y</span>
      <span class="text-xs px-2 py-1 bg-neutral-800 text-neutral-400 rounded">20Y</span>
    </div>
  </a>
</div>

<h2 class="text-2xl font-bold mb-4">Understanding Gold Charts</h2>
<p class="mb-4">
  Our charts display real-time data from global markets. Use different timeframes to analyze short-term volatility or long-term trends. The charts update automatically to reflect the latest market prices.
</p>
<p><a href="/news/understanding-gold-price-charts" class="text-yellow-500 hover:underline">Learn how to read gold price charts →</a></p>`,
};

async function migratePages() {
  console.log('Starting migration...\n');

  for (const pageData of pages) {
    // Check if page already exists
    const { data: existingPage } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', pageData.slug)
      .single();

    if (existingPage) {
      console.log(`Skipping ${pageData.slug}: already exists`);
      continue;
    }

    console.log(`Creating page: ${pageData.slug}`);

    const { data: page, error } = await supabase.from('pages').insert(pageData).select().single();

    if (error) {
      console.error(`Error creating ${pageData.slug}:`, error.message);
      continue;
    }

    console.log(`  Page created with ID: ${page.id}`);

    // Create hero component
    const { error: heroError } = await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'hero',
      config: {},
      position: 0,
    });

    if (heroError) {
      console.error(`  Error creating hero:`, heroError.message);
    }

    // Create chart component for ETF pages
    const etfPagesWithChart = ['gold-etfs', 'silver-etfs'];
    if (etfPagesWithChart.includes(pageData.slug)) {
      const { error: chartError } = await supabase.from('page_components').insert({
        page_id: page.id,
        component_type: 'chart',
        config: {},
        position: 1,
      });

      if (chartError) {
        console.error(`  Error creating chart:`, chartError.message);
      }
    }

    // Create performance component for gold-price-history
    const pagesWithPerformance = ['gold-price-history'];
    if (pagesWithPerformance.includes(pageData.slug)) {
      const { error: perfError } = await supabase.from('page_components').insert({
        page_id: page.id,
        component_type: 'performance',
        config: {},
        position: 1,
      });

      if (perfError) {
        console.error(`  Error creating performance:`, perfError.message);
      }
    }

    // Create text_block component
    const hasSpecialComponents =
      etfPagesWithChart.includes(pageData.slug) || pagesWithPerformance.includes(pageData.slug);
    const { error: textError } = await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'text_block',
      config: {
        content: textContents[pageData.slug] || '',
      },
      position: hasSpecialComponents ? 2 : 1,
    });

    if (textError) {
      console.error(`  Error creating text_block:`, textError.message);
    } else {
      console.log(`  Components created successfully`);
    }

    console.log('');
  }

  console.log('Migration complete!');
}

migratePages().catch(console.error);
