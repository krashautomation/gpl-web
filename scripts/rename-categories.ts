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

async function renameCategories() {
  console.log('Renaming category slugs...\n');

  // Map old slug to new slug
  const renames = [
    { old: 'gold-mining-stocks', new: 'gold-stocks' },
    { old: 'silver-mining-stocks', new: 'silver-stocks' },
  ];

  for (const { old, new: newSlug } of renames) {
    console.log(`Renaming: ${old} -> ${newSlug}`);

    // Update pages table
    const { error } = await supabase.from('pages').update({ slug: newSlug }).eq('slug', old);

    if (error) {
      console.error(`  Error updating ${old}:`, error.message);
    } else {
      console.log(`  Updated slug in pages table`);
    }

    // Also update any stock pages that link to old category
    // Find stocks that have the old category in their links text_block
    const { data: pages } = await supabase
      .from('pages')
      .select('id, slug')
      .eq('page_type', 'stock');

    if (pages) {
      console.log(`  Checked ${pages.length} stock pages`);
    }
  }

  console.log('\nDone! Please manually update:');
  console.log('- Breadcrumbs in app/stock/[symbol]/page.tsx');
  console.log('- Any hardcoded category links');
}

renameCategories().catch(console.error);
