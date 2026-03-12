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

const ETFs = ['GLD', 'IAU', 'GLDM', 'SGOL'];

async function main() {
  console.log('=== Setting up Gold ETFs Index Page ===\n');

  // Step 1: Delete existing gold-etfs page
  console.log('1. Deleting existing /gold-etfs page...');
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'gold-etfs')
    .single();

  if (existingPage) {
    // Delete components first
    await supabase.from('page_components').delete().eq('page_id', existingPage.id);
    // Delete page
    await supabase.from('pages').delete().eq('id', existingPage.id);
    console.log('   Deleted existing /gold-etfs page');
  } else {
    console.log('   No existing /gold-etfs page found');
  }

  // Step 2: Update 4 ETF stock pages with category
  console.log('\n2. Updating ETF stock pages with category=gold-etfs...');
  for (const symbol of ETFs) {
    const slug = `stock/${symbol}`;
    const { error } = await supabase
      .from('pages')
      .update({ category: 'gold-etfs' })
      .eq('slug', slug);
    if (error) {
      console.error(`   Error updating ${slug}:`, error.message);
    } else {
      console.log(`   Updated ${slug} with category=gold-etfs`);
    }
  }

  // Step 3: Create new gold-etfs page
  console.log('\n3. Creating new /gold-etfs page...');

  const { error: insertError } = await supabase.from('pages').insert({
    slug: 'gold-etfs',
    title: 'Gold ETFs',
    description:
      'Track popular gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and more with live prices and charts.',
    page_type: 'stock',
    category: 'gold-etfs',
    symbol: 'GLD',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold ETFs | Stock Prices & Charts | Gold Price Live',
    meta_description:
      'Track popular gold ETFs including SPDR Gold Shares (GLD), iShares Gold Trust (IAU), and more with live prices and charts.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error('   Error creating gold-etfs page:', insertError.message);
  } else {
    console.log('   Created /gold-etfs page');
  }

  // Get the new page ID
  const { data: newPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'gold-etfs')
    .single();

  if (newPage) {
    // Add components
    await supabase.from('page_components').insert([
      { page_id: newPage.id, component_type: 'hero', config: {}, position: 0 },
      { page_id: newPage.id, component_type: 'chart', config: {}, position: 1 },
      { page_id: newPage.id, component_type: 'stock_table', config: {}, position: 2 },
      {
        page_id: newPage.id,
        component_type: 'text_block',
        config: {
          content:
            '<p class="mb-4">Gold ETFs provide investors with exposure to gold prices without owning physical gold. These funds hold gold bullion and track the spot price of gold.</p><p>Click on any ETF above to view detailed charts and performance data.</p>',
        },
        position: 3,
      },
    ]);
    console.log('   Added components (hero + chart + stock_table + text_block)');
  }

  console.log('\n=== Migration Complete ===');
}

main().catch(console.error);
