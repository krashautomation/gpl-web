import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log('=== /silver-stocks page details ===');
  const { data } = await supabase
    .from('pages')
    .select('id, slug, title, symbol, category, page_type')
    .eq('slug', 'silver-stocks')
    .single();
  console.log(JSON.stringify(data, null, 2));

  // The issue: stock_table fetches by category, which includes the category page itself
  // Fix: exclude pages where slug = category
  console.log('\n=== API query fix needed ===');
  console.log('Currently fetches: category = silver-stocks');
  console.log('This includes: silver-stocks (the category page with symbol SIL)');
  console.log('Fix: add .neq("slug", category) to exclude category page itself');
}

main();
