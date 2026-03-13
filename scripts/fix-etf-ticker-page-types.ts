import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ETF_CATEGORIES = [
  'lithium-etfs',
  'uranium-etfs',
  'rare-earth-etfs',
  'critical-minerals-etfs',
  'platinum-etfs',
  'palladium-etfs',
  'precious-metals-etfs',
  'nickel-etfs',
  'steel-etfs',
];

async function main() {
  console.log('=== Fixing ETF Ticker Page Types ===\n');

  const { data: etfPages, error } = await supabase
    .from('pages')
    .select('id, slug, page_type, category, symbol')
    .like('slug', 'stock/%')
    .in('category', ETF_CATEGORIES);

  if (error) {
    console.error('Error fetching ETF pages:', error.message);
    return;
  }

  console.log(`Found ${etfPages?.length || 0} ETF ticker pages to fix\n`);

  for (const page of etfPages || []) {
    console.log(`Before: /${page.slug} page_type="${page.page_type}" category="${page.category}"`);

    const { error: updateError } = await supabase
      .from('pages')
      .update({ page_type: 'stock' })
      .eq('id', page.id);

    if (updateError) {
      console.error(`[ERROR] /${page.slug}: ${updateError.message}`);
    } else {
      console.log(`[FIXED] /${page.slug} page_type -> "stock"`);
    }
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
