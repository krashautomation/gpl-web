import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BROKEN_ETF_PAGES = [
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
  console.log('=== Fixing ETF Category Pages ===\n');

  for (const slug of BROKEN_ETF_PAGES) {
    const { data: page } = await supabase
      .from('pages')
      .select('id, slug, page_type, title')
      .eq('slug', slug)
      .single();

    if (!page) {
      console.log(`[SKIP] /${slug} not found`);
      continue;
    }

    console.log(`Before: /${slug} page_type="${page.page_type}"`);

    const { error } = await supabase.from('pages').update({ page_type: 'stock' }).eq('id', page.id);

    if (error) {
      console.error(`[ERROR] /${slug}: ${error.message}`);
    } else {
      console.log(`[FIXED] /${slug} page_type -> "stock"`);
    }
  }

  console.log('\n=== Done ===');
}

main().catch(console.error);
