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

// Category pages that need stock_table component
const categories = [
  { slug: 'gold-stocks', category: 'gold-stocks' },
  { slug: 'silver-stocks', category: 'silver-stocks' },
  { slug: 'oil-energy-stocks', category: 'oil-energy-stocks' },
];

async function updateCategoryPages() {
  console.log('Updating category pages with stock_table component...\n');

  for (const cat of categories) {
    // Get the page
    const { data: page } = await supabase.from('pages').select('id').eq('slug', cat.slug).single();

    if (!page) {
      console.log(`Page ${cat.slug} not found, skipping`);
      continue;
    }

    // Delete existing text_block components
    await supabase
      .from('page_components')
      .delete()
      .eq('page_id', page.id)
      .eq('component_type', 'text_block');

    // Add stock_table component
    const { error } = await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'stock_table',
      config: {},
      position: 1,
    });

    if (error) {
      console.error(`Error updating ${cat.slug}:`, error.message);
    } else {
      console.log(`Updated ${cat.slug} with stock_table component`);
    }

    // Also update the category field for the page itself
    await supabase.from('pages').update({ category: cat.category }).eq('id', page.id);
  }

  console.log('\nDone!');
}

updateCategoryPages().catch(console.error);
