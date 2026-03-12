import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const { data } = await supabase
    .from('pages')
    .select('id, slug, is_locked')
    .eq('slug', 'gold-etfs')
    .single();
  console.log('Current status:', JSON.stringify(data, null, 2));

  if (data?.is_locked) {
    await supabase.from('pages').update({ is_locked: false }).eq('id', data.id);
    console.log('Unlocked /gold-etfs');
  } else {
    console.log('Page is not locked');
  }
}

main();
