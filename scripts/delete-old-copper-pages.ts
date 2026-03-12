import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const oldSlugs = [
  'freeport-mcmoran',
  'southern-copper',
  'teck-resources',
  'hudbay-minerals',
  'global-x-copper-miners-etf',
  'united-states-copper-index-fund',
  'ishares-copper-metals-mining-etf',
  'sprott-copper-miners-etf',
];

async function deleteOldPages() {
  console.log('=== Deleting Old Copper Pages ===\n');

  for (const slug of oldSlugs) {
    const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

    if (!page) {
      console.log(`  Page /${slug} does not exist (already deleted or never created)`);
      continue;
    }

    await supabase.from('page_components').delete().eq('page_id', page.id);
    await supabase.from('pages').delete().eq('id', page.id);

    console.log(`  Deleted: /${slug}`);
  }

  console.log('\n=== Cleanup Complete ===');
}

deleteOldPages();
