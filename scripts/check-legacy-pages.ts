import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const { data: pages } = await supabase
    .from('pages')
    .select('id, slug, title, is_active, has_ads, page_type')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (!pages) {
    console.log('No pages found');
    return;
  }

  console.log(`Total active pages: ${pages.length}\n`);

  const pagesWithoutComponents: typeof pages = [];
  const pagesWithComponents: typeof pages = [];

  for (const page of pages) {
    const { data: components } = await supabase
      .from('page_components')
      .select('id')
      .eq('page_id', page.id);

    if (!components || components.length === 0) {
      pagesWithoutComponents.push(page);
    } else {
      pagesWithComponents.push(page);
    }
  }

  console.log(`Pages using component system: ${pagesWithComponents.length}`);
  console.log(`Pages using legacy rendering (no components): ${pagesWithoutComponents.length}`);

  if (pagesWithoutComponents.length > 0) {
    console.log('\nPages without components (may show ads but NO bio_card in legacy mode):');
    for (const page of pagesWithoutComponents) {
      console.log(`  - ${page.slug} (${page.page_type})`);
    }
  }
}

main().catch(console.error);
