import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const stocks = [
  {
    slug: 'freeport-mcmoran',
    name: 'Freeport-McMoRan',
    symbol: 'FCX',
    description:
      'Freeport-McMoRan Inc. (FCX) is a leading international mining company with operations in North America, South America and Indonesia.',
  },
  {
    slug: 'southern-copper',
    name: 'Southern Copper',
    symbol: 'SCCO',
    description:
      'Southern Copper Corporation (SCCO) is one of the largest integrated copper producers in the world, with mining operations in Peru and Mexico.',
  },
  {
    slug: 'teck-resources',
    name: 'Teck Resources',
    symbol: 'TECK',
    description:
      'Teck Resources Limited (TECK) is a diversified mining, metallurgical and energy company headquartered in Canada.',
  },
  {
    slug: 'hudbay-minerals',
    name: 'Hudbay Minerals',
    symbol: 'HBM',
    description:
      'Hudbay Minerals Inc. (HBM) is a Canadian mining company focused on copper and gold production.',
  },
];

const etfs = [
  {
    slug: 'global-x-copper-miners-etf',
    name: 'Global X Copper Miners ETF',
    symbol: 'COPX',
    description:
      'The Global X Copper Miners ETF (COPX) provides exposure to copper mining companies worldwide.',
  },
  {
    slug: 'united-states-copper-index-fund',
    name: 'United States Copper Index Fund',
    symbol: 'CPER',
    description: 'The United States Copper Index Fund (CPER) tracks the SummerHaven Copper Index.',
  },
  {
    slug: 'ishares-copper-metals-mining-etf',
    name: 'iShares Copper and Metals Mining ETF',
    symbol: 'ICOP',
    description:
      'The iShares Copper and Metals Mining ETF (ICOP) provides exposure to copper and metals mining companies.',
  },
  {
    slug: 'sprott-copper-miners-etf',
    name: 'Sprott Copper Miners ETF',
    symbol: 'COPP',
    description:
      'The Sprott Copper Miners ETF (COPP) offers exposure to copper mining companies globally.',
  },
];

async function createStockPage(
  stock: (typeof stocks)[0],
  category: string,
  parentTitle: string,
  parentHref: string
) {
  const existingSlug = stock.slug;

  const { data: existing } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', existingSlug)
    .single();

  if (existing) {
    console.log(`  Stock page /${existingSlug} already exists`);
    return;
  }

  const title = `${stock.name} Stock Price`;
  const description = `Track ${stock.name} (${stock.symbol}) stock price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug: existingSlug,
    title: title,
    description: description,
    page_type: 'stock',
    symbol: stock.symbol,
    category: category,
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
    console.error(`Error creating ${existingSlug}:`, error.message);
    return;
  }

  const { data: page } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', existingSlug)
    .single();

  if (!page) return;

  const linkText =
    category === 'copper-stocks'
      ? `<p>You can find more Copper Stocks on the <a href="${parentHref}" class="text-primary hover:underline">${parentTitle}</a>.</p>`
      : `<p>You can find more Copper ETFs on the <a href="${parentHref}" class="text-primary hover:underline">${parentTitle}</a>.</p>`;

  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: page.id, component_type: 'chart', config: {}, position: 1 },
    { page_id: page.id, component_type: 'performance', config: {}, position: 2 },
    {
      page_id: page.id,
      component_type: 'bio_card',
      config: {
        author: 'Dave Brown',
        authorImage: '/dave-brown.jpg',
        readingTime: 3,
      },
      position: 3,
    },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: { content: `<p>${stock.description}</p>${linkText}` },
      position: 4,
    },
  ]);

  console.log(`Created: /${existingSlug}`);
}

async function createCategoryPage(
  slug: string,
  title: string,
  category: string,
  symbol: string,
  description: string,
  metaTitle: string
) {
  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    await supabase.from('page_components').delete().eq('page_id', existing.id);
    await supabase.from('pages').delete().eq('id', existing.id);
    console.log(`  Deleted existing /${slug} page`);
  }

  const { error: insertError } = await supabase.from('pages').insert({
    slug,
    title,
    description,
    page_type: 'stock',
    category,
    symbol,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: metaTitle,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error(`  Error creating ${slug}:`, insertError.message);
    return;
  }

  console.log(`Created /${slug} page`);

  const { data: newPage } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!newPage) return;

  const textContent =
    category === 'copper-stocks'
      ? '<p class="mb-4">Copper is a crucial industrial metal used in construction, electrical wiring, and transportation.</p><p>Click on any stock above to view detailed charts and performance data.</p>'
      : '<p class="mb-4">Copper ETFs provide investors with exposure to copper prices through exchange-traded funds.</p><p>Click on any ETF above to view detailed charts and performance data.</p>';

  await supabase.from('page_components').insert([
    { page_id: newPage.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: newPage.id, component_type: 'chart', config: {}, position: 1 },
    { page_id: newPage.id, component_type: 'stock_table', config: {}, position: 2 },
    {
      page_id: newPage.id,
      component_type: 'text_block',
      config: { content: textContent },
      position: 3,
    },
  ]);

  console.log(`  Added components to /${slug}`);
}

async function main() {
  console.log('=== Creating Copper Stocks & ETFs ===\n');

  console.log('1. Creating copper stocks...');
  for (const stock of stocks) {
    await createStockPage(stock, 'copper-stocks', 'Copper Stocks list page', '/copper-stocks');
  }

  console.log('\n2. Creating copper ETFs...');
  for (const etf of etfs) {
    await createStockPage(etf, 'copper-etfs', 'Copper ETFs list page', '/copper-etfs');
  }

  console.log('\n3. Creating /copper-stocks category page...');
  await createCategoryPage(
    'copper-stocks',
    'Copper Stocks',
    'copper-stocks',
    'FCX',
    'Track copper mining stocks including Freeport-McMoRan, Southern Copper, Teck Resources, and Hudbay Minerals with live prices and charts.',
    'Copper Stocks | Copper Mining Stocks & Prices | Gold Price Live'
  );

  console.log('\n4. Creating /copper-etfs category page...');
  await createCategoryPage(
    'copper-etfs',
    'Copper ETFs',
    'copper-etfs',
    'COPX',
    'Track copper ETFs including Global X Copper Miners, United States Copper Index Fund, iShares Copper and Metals Mining, and Sprott Copper Miners with live prices and charts.',
    'Copper ETFs | Copper ETF Prices & Charts | Gold Price Live'
  );

  console.log('\n=== Migration Complete ===');
}

main();
