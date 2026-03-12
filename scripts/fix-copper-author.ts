import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function fixCopperAuthor() {
  console.log('=== Fixing Copper Pages Bio Card Author ===\n');

  const { data: pages, error } = await supabase
    .from('pages')
    .select('id, slug')
    .in('category', ['copper-stocks', 'copper-etfs']);

  if (error) {
    console.error('Error fetching pages:', error.message);
    return;
  }

  console.log(`Found ${pages?.length || 0} copper pages\n`);

  for (const page of pages || []) {
    const { data: components } = await supabase
      .from('page_components')
      .select('id, config')
      .eq('page_id', page.id)
      .eq('component_type', 'bio_card')
      .single();

    if (!components) {
      console.log(`  No bio_card found for /${page.slug}`);
      continue;
    }

    const currentConfig = components.config as {
      author?: string;
      authorImage?: string;
      readingTime?: number;
    };

    const newConfig = {
      author: 'Dave Halmai',
      authorImage: '/images/dave-profile.png',
      readingTime: 5,
    };

    await supabase.from('page_components').update({ config: newConfig }).eq('id', components.id);

    console.log(`  Updated /${page.slug}: "${currentConfig.author}" → "Dave Halmai"`);
  }

  console.log('\n=== Fix Complete ===');
}

fixCopperAuthor();
