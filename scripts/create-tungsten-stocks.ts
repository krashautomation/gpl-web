import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stocks = [
  {
    symbol: 'ALM',
    name: 'Almonty Industries Inc.',
    description:
      'Almonty Industries Inc. (ALM) is a mining company focused on tungsten and other specialty metals.',
  },
  {
    symbol: 'AII.TO',
    name: 'Almonty Industries Inc.',
    description:
      'Almonty Industries Inc. (AII.TO) is a mining company focused on tungsten and other specialty metals.',
  },
];

async function createStockPage(stock: (typeof stocks)[0]) {
  const slug = `stock/${stock.symbol}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists`);
    return;
  }

  const title = `${stock.name} Stock Price`;
  const description = `Track ${stock.name} (${stock.symbol}) stock price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug: slug,
    title: title,
    description: description,
    page_type: 'stock',
    symbol: stock.symbol,
    category: 'tungsten-stocks',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${stock.symbol} Stock Price | ${stock.name} | Gold Price Live`,
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
      config: { content: `<p>${stock.name} (${stock.symbol}) - ${stock.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`Created: /${slug}`);
}

async function main() {
  console.log('=== Creating Tungsten Stocks ===\n');

  // Step 1: Create stock pages
  console.log('1. Creating tungsten stock pages...');
  for (const stock of stocks) {
    await createStockPage(stock);
  }

  // Step 2: Delete existing tungsten-stocks page if any
  console.log('\n2. Checking for existing /tungsten-stocks page...');
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'tungsten-stocks')
    .single();

  if (existingPage) {
    await supabase.from('page_components').delete().eq('page_id', existingPage.id);
    await supabase.from('pages').delete().eq('id', existingPage.id);
    console.log('   Deleted existing page');
  }

  // Step 3: Create tungsten-stocks category page
  console.log('\n3. Creating /tungsten-stocks category page...');

  const { error: insertError } = await supabase.from('pages').insert({
    slug: 'tungsten-stocks',
    title: 'Tungsten Stocks',
    description:
      'Track tungsten mining stocks including Almonty Industries and other companies with live prices and charts.',
    page_type: 'stock',
    category: 'tungsten-stocks',
    symbol: 'ALM',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Tungsten Stocks | Stock Prices & Charts | Gold Price Live',
    meta_description:
      'Track tungsten mining stocks including Almonty Industries and other companies with live prices and charts.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error('   Error:', insertError.message);
  } else {
    console.log('   Created /tungsten-stocks page');
  }

  const { data: newPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'tungsten-stocks')
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
            '<p class="mb-4">Tungsten is a rare metal used in various industrial applications including cutting tools, aerospace components, and electronics.</p><p>Click on any stock above to view detailed charts and performance data.</p>',
        },
        position: 3,
      },
    ]);
    console.log('   Added components');
  }

  console.log('\n=== Migration Complete ===');
}

main();
