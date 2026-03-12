import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Check what's in silver-stocks and silver-etfs categories
async function main() {
  console.log('=== Silver Stocks ===');
  const { data: silverStocks } = await supabase
    .from('pages')
    .select('slug, title, symbol, category')
    .eq('category', 'silver-stocks')
    .eq('page_type', 'stock');
  console.log(JSON.stringify(silverStocks, null, 2));

  console.log('\n=== Silver ETFs ===');
  const { data: silverEtfs } = await supabase
    .from('pages')
    .select('slug, title, symbol, category')
    .eq('category', 'silver-etfs')
    .eq('page_type', 'stock');
  console.log(JSON.stringify(silverEtfs, null, 2));

  console.log('\n=== Check /silver-stocks page ===');
  const { data: page } = await supabase
    .from('pages')
    .select('id, slug, title, category, symbol')
    .eq('slug', 'silver-stocks')
    .single();
  console.log(JSON.stringify(page, null, 2));
}

main();
