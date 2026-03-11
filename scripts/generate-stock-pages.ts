import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import fs from 'fs/promises';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const YahooFinance = require('yahoo-finance2').default;
const yahoo = new YahooFinance();

interface Stock {
  symbol: string;
  name?: string;
  sector?: string;
  industry?: string;
  marketCap?: string;
}

interface Category {
  slug: string;
  title: string;
  description: string;
  symbol: string;
  etf: string;
}

const categories: Category[] = [
  {
    slug: 'gold-mining-stocks',
    title: 'Gold Mining Stocks',
    description:
      'Track gold mining company stocks including Newmont, Barrick Gold, Kinross, and more with live prices and charts.',
    symbol: 'GDX',
    etf: 'GDX',
  },
  {
    slug: 'silver-mining-stocks',
    title: 'Silver Mining Stocks',
    description:
      'Track silver mining company stocks including First Majestic, Pan American Silver, and more with live prices and charts.',
    symbol: 'SIL',
    etf: 'SIL',
  },
  {
    slug: 'oil-energy-stocks',
    title: 'Oil & Energy Stocks',
    description:
      'Track oil and energy company stocks including ExxonMobil, Chevron, and more with live prices and charts.',
    symbol: 'XLE',
    etf: 'XLE',
  },
];

const DATA_DIR = path.join(process.cwd(), 'scripts', 'data');

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Directory may already exist
  }
}

async function fetchEtfHoldings(etf: string): Promise<Stock[]> {
  console.log(`Fetching holdings for ${etf}...`);

  try {
    const result = await yahoo.quoteSummary(etf, { modules: ['topHoldings'] });

    if (!result.topHoldings || !result.topHoldings.holdings) {
      console.log(`  No holdings found for ${etf}, using search fallback`);
      return await searchStocks(etf);
    }

    const stocks: Stock[] = result.topHoldings.holdings.map((holding: any) => ({
      symbol: holding.symbol,
      name: holding.name || holding.symbol,
      sector: result.topHoldings.sectorType3,
      industry: result.topHoldings.sectorType4,
    }));

    console.log(`  Found ${stocks.length} holdings`);
    return stocks;
  } catch (err: any) {
    console.error(`  Error fetching ${etf}:`, err.message);
    return await searchStocks(etf);
  }
}

async function searchStocks(query: string): Promise<Stock[]> {
  console.log(`  Using search fallback for ${query}...`);

  const searchTerms: Record<string, string[]> = {
    GDX: [
      'NEM',
      'GOLD',
      'KGC',
      'AEM',
      'AU',
      'WPM',
      'KLR',
      'EGO',
      'MUX',
      'HL',
      'AUU',
      'PVG',
      'BTG',
      'RGLD',
      'THM',
    ],
    SIL: [
      'PAAS',
      'AG',
      'FN',
      'HL',
      'CDE',
      'EXK',
      'AUU',
      'SVM',
      'SAND',
      'MAG',
      'SSRI',
      'PLG',
      'AXU',
      'GOLD',
    ],
    XLE: [
      'XOM',
      'CVX',
      'COP',
      'EOG',
      'SLB',
      'MPC',
      'VLO',
      'PSX',
      'OXY',
      'HAL',
      'DVN',
      'PXD',
      'LUV',
      'OIH',
      'XOP',
    ],
  };

  const symbols = searchTerms[query] || [];
  const stocks: Stock[] = [];

  for (const symbol of symbols) {
    try {
      const quote = await yahoo.quote(symbol);
      stocks.push({
        symbol: symbol,
        name: quote.shortName || quote.longName || symbol,
        sector: quote.sector,
        industry: quote.industry,
      });
    } catch (err) {
      stocks.push({ symbol, name: symbol });
    }
  }

  return stocks;
}

async function fetchStockDetails(stocks: Stock[]): Promise<Stock[]> {
  console.log(`Fetching details for ${stocks.length} stocks...`);

  const detailed: Stock[] = [];

  for (let i = 0; i < stocks.length; i++) {
    const stock = stocks[i];

    try {
      const quote = await yahoo.quote(stock.symbol);
      detailed.push({
        symbol: stock.symbol,
        name: quote.shortName || quote.longName || stock.name || stock.symbol,
        sector: quote.sector,
        industry: quote.industry,
        marketCap: quote.marketCap ? formatMarketCap(quote.marketCap) : undefined,
      });

      if ((i + 1) % 10 === 0) {
        console.log(`  Processed ${i + 1}/${stocks.length}`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (err) {
      detailed.push(stock);
    }
  }

  return detailed;
}

function formatMarketCap(value: number): string {
  if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  return `$${value}`;
}

async function saveToJson(category: Category, stocks: Stock[]) {
  const filename = `${category.slug}.json`;
  const filepath = path.join(DATA_DIR, filename);

  const data = {
    category: category.slug,
    title: category.title,
    etf: category.etf,
    fetchedAt: new Date().toISOString(),
    stockCount: stocks.length,
    stocks: stocks,
  };

  await fs.writeFile(filepath, JSON.stringify(data, null, 2));
  console.log(`Saved to ${filename}`);
}

async function createCategoryPage(category: Category, stocks: Stock[]) {
  // Check if page exists
  const { data: existing } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', category.slug)
    .single();

  if (existing) {
    console.log(`Category page /${category.slug} already exists, skipping`);
    return;
  }

  // Create stock list HTML
  const stockLinks = stocks
    .map(
      s =>
        `<a href="/stock/${s.symbol}" class="text-yellow-500 hover:underline">${s.name || s.symbol}</a>`
    )
    .join(', ');

  const { error } = await supabase.from('pages').insert({
    slug: category.slug,
    title: category.title,
    description: category.description,
    page_type: 'stock',
    symbol: category.symbol,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${category.title} | Stock Prices & Charts`,
    meta_description: category.description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`Error creating category page ${category.slug}:`, error.message);
    return;
  }

  console.log(`Created category page: /${category.slug}`);

  // Get page
  const { data: page } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', category.slug)
    .single();

  if (!page) return;

  // Add components: hero + chart + text_block
  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    {
      page_id: page.id,
      component_type: 'chart',
      config: {},
      position: 1,
    },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: {
        content: `<p class="mb-4">${category.description}</p><p class="text-sm">${stockLinks}</p>`,
      },
      position: 2,
    },
  ]);

  console.log(`  Added components for /${category.slug}`);
}

async function createStockPage(stock: Stock) {
  const slug = `stock/${stock.symbol}`;

  // Check if page exists
  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists, skipping`);
    return;
  }

  const title = `${stock.name || stock.symbol} Stock Price`;
  const description = `Track ${stock.name || stock.symbol} stock price, charts, and performance data. ${stock.industry ? stock.industry : ''}`;

  const { error } = await supabase.from('pages').insert({
    slug: slug,
    title: title,
    description: description,
    page_type: 'stock',
    symbol: stock.symbol,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${stock.symbol} Stock Price | ${stock.name || stock.symbol} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`Error creating stock page ${slug}:`, error.message);
    return;
  }

  // Get the created page
  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) return;

  // Add components: hero + chart + performance + text_block
  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    {
      page_id: page.id,
      component_type: 'chart',
      config: {},
      position: 1,
    },
    {
      page_id: page.id,
      component_type: 'performance',
      config: {},
      position: 2,
    },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: {
        content: `<p>${stock.name || stock.symbol} (${stock.symbol}) - ${stock.industry || 'Stock'}</p>`,
      },
      position: 3,
    },
  ]);
}

async function main() {
  console.log('=== Stock Pages Generator ===\n');

  await ensureDataDir();

  for (const category of categories) {
    console.log(`\n--- Processing ${category.title} ---`);

    // 1. Fetch ETF holdings
    let stocks = await fetchEtfHoldings(category.etf);

    if (stocks.length === 0) {
      console.log(`No stocks fetched for ${category.etf}, skipping`);
      continue;
    }

    // 2. Fetch details for each stock
    stocks = await fetchStockDetails(stocks);

    // 3. Save to JSON
    await saveToJson(category, stocks);

    // 4. Create category page
    await createCategoryPage(category, stocks);

    // 5. Create individual stock pages
    console.log(`Creating ${stocks.length} stock pages...`);
    for (let i = 0; i < stocks.length; i++) {
      await createStockPage(stocks[i]);
      if ((i + 1) % 20 === 0) {
        console.log(`  Created ${i + 1}/${stocks.length} stock pages`);
      }
    }
  }

  console.log('\n=== Migration Complete ===');
}

main().catch(console.error);
