import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Page {
  id: string;
  slug: string;
  title: string;
  is_active: boolean;
  has_ads: boolean;
  has_articles: boolean;
}

interface PageComponent {
  id: string;
  page_id: string;
  component_type: string;
  position: number;
}

async function getAllPages(): Promise<Page[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('id, slug, title, is_active, has_ads, has_articles')
    .eq('is_active', true)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching pages:', error);
    return [];
  }

  return data || [];
}

async function getPageComponents(pageId: string): Promise<PageComponent[]> {
  const { data, error } = await supabase
    .from('page_components')
    .select('id, page_id, component_type, position')
    .eq('page_id', pageId)
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching components:', error);
    return [];
  }

  return data || [];
}

async function addComponent(
  pageId: string,
  componentType: string,
  config: Record<string, unknown>,
  position: number
): Promise<void> {
  const { error } = await supabase.from('page_components').insert({
    page_id: pageId,
    component_type: componentType,
    config,
    position,
  });

  if (error) {
    console.error(`Error adding ${componentType} to page ${pageId}:`, error);
  } else {
    console.log(`✓ Added ${componentType} at position ${position} to page ${pageId}`);
  }
}

async function shiftComponents(pageId: string, fromPosition: number): Promise<void> {
  const { error } = await supabase
    .from('page_components')
    .update({ position: fromPosition + 1 })
    .eq('page_id', pageId)
    .gte('position', fromPosition);

  if (error) {
    console.error(`Error shifting components for page ${pageId}:`, error);
  }
}

async function main() {
  console.log('Fetching all pages...\n');
  const pages = await getAllPages();
  console.log(`Found ${pages.length} active pages\n`);

  let pagesWithAdsAdded = 0;
  let pagesWithBioAdded = 0;
  const pagesNeedingAds: string[] = [];
  const pagesNeedingBio: string[] = [];

  for (const page of pages) {
    const components = await getPageComponents(page.id);

    const hasAdsComponent = components.some(c => c.component_type === 'ads');
    const hasBioCardComponent = components.some(c => c.component_type === 'bio_card');

    if (!hasAdsComponent) {
      pagesNeedingAds.push(page.slug);
    }

    if (!hasBioCardComponent) {
      pagesNeedingBio.push(page.slug);
    }
  }

  console.log('=== Summary ===');
  console.log(`Pages needing 'ads' component: ${pagesNeedingAds.length}`);
  console.log(`Pages needing 'bio_card' component: ${pagesNeedingBio.length}`);
  console.log('');

  if (pagesNeedingAds.length === 0 && pagesNeedingBio.length === 0) {
    console.log('All pages already have ads and bio_card components!');
    return;
  }

  console.log('Adding components...\n');

  for (const page of pages) {
    const components = await getPageComponents(page.id);
    const hasAdsComponent = components.some(c => c.component_type === 'ads');
    const hasBioCardComponent = components.some(c => c.component_type === 'bio_card');

    if (!hasAdsComponent) {
      await shiftComponents(page.id, 0);
      await addComponent(
        page.id,
        'ads',
        {
          affiliateName: 'Money Metals Exchange',
          adName: 'Money Metals Exchange',
          href: 'https://www.awin1.com/cread.php?s=3928246&v=88985&q=519082&r=2775708',
          src: 'https://www.awin1.com/cshow.php?s=3928246&v=88985&q=519082&r=2775708',
        },
        0
      );
      pagesWithAdsAdded++;
    }

    if (!hasBioCardComponent) {
      const heroComponent = components.find(c => c.component_type === 'hero');
      const newPosition = heroComponent ? heroComponent.position + 1 : 1;

      for (const comp of components) {
        if (comp.position >= newPosition) {
          await shiftComponents(page.id, comp.position);
        }
      }

      await addComponent(
        page.id,
        'bio_card',
        {
          author: 'Dave Halmai',
          authorImage: '/images/dave-profile.png',
          readingTime: 5,
        },
        newPosition
      );
      pagesWithBioAdded++;
    }
  }

  console.log('\n=== Done ===');
  console.log(`Added ads to ${pagesWithAdsAdded} pages`);
  console.log(`Added bio_card to ${pagesWithBioAdded} pages`);
}

main().catch(console.error);
