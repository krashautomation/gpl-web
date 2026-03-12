import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ETFs = [
  {
    symbol: 'SLV',
    name: 'iShares Silver Trust',
    description:
      'iShares Silver Trust (SLV) seeks to reflect the performance of the price of silver.',
  },
  {
    symbol: 'SIVR',
    name: 'abrdn Physical Silver Shares ETF',
    description:
      'abrdn Physical Silver Shares ETF (SIVR) seeks to provide investors with exposure to silver.',
  },
  {
    symbol: 'SIL',
    name: 'Global X Silver Miners ETF',
    description: 'Global X Silver Miners ETF (SIL) provides exposure to silver mining companies.',
  },
  {
    symbol: 'SILJ',
    name: 'Amplify Junior Silver Miners ETF',
    description:
      'Amplify Junior Silver Miners ETF (SILJ) provides exposure to junior silver mining companies.',
  },
];

async function createEtfStockPage(etf: (typeof ETFs)[0]) {
  const slug = `stock/${etf.symbol}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists`);
    return;
  }

  const title = `${etf.name} Stock Price`;
  const description = `Track ${etf.name} (${etf.symbol}) stock price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug: slug,
    title: title,
    description: description,
    page_type: 'stock',
    symbol: etf.symbol,
    category: 'silver-etfs',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${etf.symbol} Stock Price | ${etf.name} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`Error creating ${slug}:`, error.message);
    return;
  }

  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) return;

  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: page.id, component_type: 'chart', config: {}, position: 1 },
    { page_id: page.id, component_type: 'performance', config: {}, position: 2 },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: { content: `<p>${etf.name} (${etf.symbol}) - ${etf.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`Created: /${slug}`);
}

async function main() {
  console.log('=== Setting up Silver ETFs ===\n');

  // Step 1: Create ETF stock pages
  console.log('1. Creating silver ETF stock pages...');
  for (const etf of ETFs) {
    await createEtfStockPage(etf);
  }

  // Step 2: Delete existing silver-etfs page
  console.log('\n2. Deleting existing /silver-etfs page...');
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'silver-etfs')
    .single();

  if (existingPage) {
    await supabase.from('page_components').delete().eq('page_id', existingPage.id);
    await supabase.from('pages').delete().eq('id', existingPage.id);
    console.log('   Deleted existing /silver-etfs page');
  }

  // Step 3: Create new silver-etfs page
  console.log('\n3. Creating new /silver-etfs page...');

  const { error: insertError } = await supabase.from('pages').insert({
    slug: 'silver-etfs',
    title: 'Silver ETFs',
    description:
      'Track popular silver ETFs including iShares Silver Trust (SLV), abrdn Physical Silver Shares ETF (SIVR), and more with live prices and charts.',
    page_type: 'stock',
    category: 'silver-etfs',
    symbol: 'SLV',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Silver ETFs | Stock Prices & Charts | Gold Price Live',
    meta_description:
      'Track popular silver ETFs including iShares Silver Trust (SLV), abrdn Physical Silver Shares ETF (SIVR), and more with live prices and charts.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error('   Error:', insertError.message);
  } else {
    console.log('   Created /silver-etfs page');
  }

  const { data: newPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'silver-etfs')
    .single();

  if (newPage) {
    await supabase.from('page_components').insert([
      { page_id: newPage.id, component_type: 'hero', config: {}, position: 0 },
      { page_id: newPage.id, component_type: 'chart', config: {}, position: 1 },
      { page_id: newPage.id, component_type: 'stock_table', config: {}, position: 2 },
      {
        page_id: newPage.id,
        component_type: 'text_block',
        config: {
          content:
            '<p class="mb-4">Silver ETFs provide investors with exposure to silver prices without owning physical silver. These funds hold silver bullion and track the spot price of silver.</p><p>Click on any ETF above to view detailed charts and performance data.</p>',
        },
        position: 3,
      },
    ]);
    console.log('   Added components');
  }

  console.log('\n=== Migration Complete ===');
}

main();
