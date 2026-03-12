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

const ETFs = [
  {
    symbol: 'GLD',
    name: 'SPDR Gold Shares',
    description:
      'SPDR Gold Shares (GLD) is the largest physically-backed gold ETF, designed to track the price of gold bullion.',
  },
  {
    symbol: 'IAU',
    name: 'iShares Gold Trust',
    description:
      'iShares Gold Trust (IAU) is a physically-backed gold ETF that seeks to reflect the performance of the price of gold.',
  },
  {
    symbol: 'GLDM',
    name: 'SPDR Gold MiniShares Trust',
    description:
      'SPDR Gold MiniShares Trust (GLDM) is a low-cost, physically-backed gold ETF designed to track the price of gold.',
  },
  {
    symbol: 'SGOL',
    name: 'abrdn Physical Gold Shares ETF',
    description:
      'abrdn Physical Gold Shares ETF (SGOL) is a physically-backed gold ETF that seeks to provide investors with exposure to gold.',
  },
];

async function createEtfStockPage(etf: (typeof ETFs)[0]) {
  const slug = `stock/${etf.symbol}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists, skipping`);
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
    console.error(`Error creating stock page ${slug}:`, error.message);
    return;
  }

  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) return;

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
        content: `<p>${etf.name} (${etf.symbol}) - ${etf.description}</p>`,
      },
      position: 3,
    },
  ]);

  console.log(`Created: /${slug}`);
}

async function updateGoldEtfsPage() {
  const { data: page } = await supabase.from('pages').select('id').eq('slug', 'gold-etfs').single();

  if (!page) {
    console.log('gold-etfs page not found');
    return;
  }

  const { error } = await supabase.from('page_components').upsert(
    {
      page_id: page.id,
      component_type: 'text_block',
      config: {
        content: `<p class="text-xl font-semibold mb-4">Popular Gold ETFs</p>
<p class="mb-4">Track the performance of the most popular gold ETFs with live charts and real-time data.</p>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
${ETFs.map(etf => `<div class="p-4 bg-neutral-50 rounded-lg"><a href="/stock/${etf.symbol}" class="font-semibold hover:text-yellow-600">${etf.name}</a><br/><span class="text-sm text-neutral-600">${etf.symbol}</span></div>`).join('\n')}
</div>
<p class="text-sm text-neutral-600">Click on any ETF above to view detailed charts and performance data.</p>`,
      },
      position: 2,
    },
    { onConflict: 'page_id,component_type' }
  );

  if (error) {
    console.error('Error updating gold-etfs page:', error.message);
  } else {
    console.log('Updated: /gold-etfs text_block component');
  }
}

async function main() {
  console.log('=== Creating Gold ETF Stock Pages ===\n');

  for (const etf of ETFs) {
    await createEtfStockPage(etf);
  }

  console.log('\n=== Updating gold-etfs page ===');
  await updateGoldEtfsPage();

  console.log('\n=== Migration Complete ===');
}

main().catch(console.error);
