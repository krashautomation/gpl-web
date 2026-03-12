import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  // Check /gold-stocks components
  const { data: page } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', 'gold-stocks')
    .single();

  if (!page) {
    console.log('gold-stocks page not found');
    return;
  }

  const { data: components } = await supabase
    .from('page_components')
    .select('component_type, position')
    .eq('page_id', page.id)
    .order('position');

  console.log('Current components:', JSON.stringify(components, null, 2));

  // Check if stock_table exists
  const hasStockTable = components?.some(c => c.component_type === 'stock_table');

  if (!hasStockTable) {
    console.log('\nAdding stock_table component...');
    await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'stock_table',
      config: {},
      position: 1,
    });
    console.log('Added stock_table at position 1');
  } else {
    console.log('\nstock_table already exists');
  }
}

main();
