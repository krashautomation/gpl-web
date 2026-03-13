import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const MISSING_TICKERS = [
  {
    category: 'palladium-stocks',
    companies: [
      {
        name: 'Generation Mining',
        ticker: 'GENM',
        exchange: 'TSX',
        description:
          'Marathon palladium-copper project in Ontario — one of the largest undeveloped palladium deposits in North America.',
      },
      {
        name: 'Clean Air Power (Palladium One)',
        ticker: 'PDM',
        exchange: 'TSX-V',
        description:
          'LK Project in Finland, palladium-platinum-nickel-copper. TSX-V listed Canadian explorer.',
      },
    ],
  },
  {
    category: 'pgm-stocks',
    companies: [
      {
        name: 'Palladium One Mining',
        ticker: 'PDM',
        exchange: 'TSX-V',
        description: 'LK Project palladium-platinum-nickel explorer, Finland. TSX-V listed.',
      },
      {
        name: 'Bravo Mining',
        ticker: 'BRVO',
        exchange: 'TSX-V',
        description: 'Luanga PGM-gold project, Brazil. TSX-V listed Canadian junior.',
      },
    ],
  },
  {
    category: 'rare-earth-etfs',
    etfs: [
      {
        ticker: 'SETM',
        name: 'Sprott Energy Transition Materials ETF',
        exchange: 'NASDAQ',
        description:
          'Broadest critical minerals ETF. Includes rare earths alongside uranium, lithium, copper, nickel, silver, manganese, cobalt, graphite and rare earth miners.',
      },
    ],
  },
  {
    category: 'precious-metals-etfs',
    etfs: [
      {
        ticker: 'SGDM',
        name: 'Sprott Gold Miners ETF',
        exchange: 'NYSE',
        description:
          'Factor-weighted gold miners ETF. Screens for revenue growth, free cash flow yield and low debt. Tilts toward mid-tier producers vs mega-caps.',
      },
      {
        ticker: 'GOAU',
        name: 'U.S. Global GO GOLD and Precious Metal Miners ETF',
        exchange: 'NYSE',
        description:
          'Royalty and streaming weighted precious metal miners. One-third royalty companies, two-thirds producers.',
      },
    ],
  },
  {
    category: 'critical-minerals-etfs',
    etfs: [
      {
        ticker: 'REMX',
        name: 'VanEck Rare Earth and Strategic Metals ETF',
        exchange: 'NYSE',
        description:
          'Rare earths, lithium, cobalt, titanium, manganese. Primary strategic metals ETF.',
      },
    ],
  },
];

async function createStockPage(
  stock: { name: string; ticker: string; exchange: string; description: string },
  category: string
) {
  const slug = `stock/${stock.ticker}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists`);
    return;
  }

  const title = `${stock.name} Stock Price`;
  const description = `Track ${stock.name} (${stock.ticker}) stock price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug,
    title,
    description,
    page_type: 'stock',
    symbol: stock.ticker,
    category,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${stock.ticker} Stock Price | ${stock.name} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`  Error creating ${slug}:`, error.message);
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
      config: { content: `<p>${stock.name} (${stock.ticker}) - ${stock.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`  Created: /${slug}`);
}

async function createEtfPage(
  etf: { ticker: string; name: string; exchange: string; description: string },
  category: string
) {
  const slug = `stock/${etf.ticker}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  ETF page /${slug} already exists`);
    return;
  }

  const title = `${etf.name} ETF Price`;
  const description = `Track ${etf.name} (${etf.ticker}) ETF price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug,
    title,
    description,
    page_type: 'etf',
    symbol: etf.ticker,
    category,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${etf.ticker} ETF Price | ${etf.name} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`  Error creating ${slug}:`, error.message);
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
      config: { content: `<p>${etf.name} (${etf.ticker}) - ${etf.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`  Created: /${slug}`);
}

async function main() {
  console.log('=== Adding Missing Tickers ===\n');

  for (const categoryData of MISSING_TICKERS) {
    console.log(`\n--- ${categoryData.category} ---`);

    if (categoryData.companies) {
      for (const company of categoryData.companies) {
        await createStockPage(company, categoryData.category);
      }
    }

    if (categoryData.etfs) {
      for (const etf of categoryData.etfs) {
        await createEtfPage(etf, categoryData.category);
      }
    }
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
