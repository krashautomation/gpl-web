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

// Non-US/Canadian stocks to remove
const symbolsToRemove = [
  '010130.KS', // Korea
  'PE&OLES.MX', // Mexico
  'FRES.L', // UK/London
  'NST.AX', // Australia
];

async function removeInternationalStocks() {
  console.log('Removing international stocks...\n');

  let deletedCount = 0;

  for (const symbol of symbolsToRemove) {
    const slug = `stock/${symbol}`;

    console.log(`Deleting: ${slug}`);

    // Delete page components first
    const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

    if (page) {
      await supabase.from('page_components').delete().eq('page_id', page.id);
    }

    // Delete the page
    const { error } = await supabase.from('pages').delete().eq('slug', slug);

    if (error) {
      console.error(`  Error deleting ${slug}:`, error.message);
    } else {
      console.log(`  Deleted: ${slug}`);
      deletedCount++;
    }
  }

  console.log(`\nTotal deleted: ${deletedCount}`);
}

removeInternationalStocks().catch(console.error);
