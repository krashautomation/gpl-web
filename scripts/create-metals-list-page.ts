import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const slug = 'list-of-metals-with-mining-stocks-and-etfs';

const pageContent = `<p class="mb-4">Mining and commodity investing covers far more than just gold and silver. Global financial markets include publicly traded companies and exchange-traded funds (ETFs) focused on dozens of metals used in manufacturing, technology, energy, and infrastructure.</p>

<p class="mb-6">These metals fall into several major categories including precious metals, base metals, battery materials, rare earth elements, nuclear metals, and strategic technology metals.</p>

<p class="mb-8">This guide provides a comprehensive overview of metals that have dedicated mining companies, commodity markets, or ETF exposure.</p>

<h2 id="precious-metals">Precious Metals</h2>

<p class="mb-4">Precious metals are historically used as stores of value and investment assets. They also have significant industrial uses in electronics, medicine, and catalysis.</p>

<p class="mb-4"><strong>Major precious metals with mining sectors:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/gold-price" class="text-primary hover:underline">Gold</a></li>
  <li><a href="/silver-price" class="text-primary hover:underline">Silver</a></li>
  <li><a href="/platinum-price" class="text-primary hover:underline">Platinum</a></li>
  <li><a href="/palladium-price" class="text-primary hover:underline">Palladium</a></li>
</ul>

<p class="mb-6">Gold and silver have the largest investment markets, including <a href="/gold-etfs" class="text-primary hover:underline">physical ETFs</a> and <a href="/gold-stocks" class="text-primary hover:underline">mining company ETFs</a>. Platinum and palladium are heavily used in automotive catalytic converters and hydrogen technologies.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.investopedia.com/terms/p/preciousmetal.asp" target="_blank" rel="noopener noreferrer" class="hover:underline">Investopedia</a></p>

<h2 id="platinum-group-metals">Platinum Group Metals (PGMs)</h2>

<p class="mb-4">Platinum group metals are rare elements typically mined together in the same geological deposits. These metals are essential for catalytic converters, fuel cells, and chemical processing.</p>

<p class="mb-4"><strong>Platinum group metals include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/platinum-price" class="text-primary hover:underline">Platinum</a></li>
  <li><a href="/palladium-price" class="text-primary hover:underline">Palladium</a></li>
  <li>Rhodium</li>
  <li>Iridium</li>
  <li>Ruthenium</li>
  <li>Osmium</li>
</ul>

<p class="mb-6">Most global PGM production occurs in South Africa and Russia. Learn more about <a href="/pgm-stocks" class="text-primary hover:underline">PGM stocks</a> and <a href="/platinum-etfs" class="text-primary hover:underline">platinum ETFs</a>.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.usgs.gov/centers/national-minerals-information-center/platinum-group-metals-statistics-and-information" target="_blank" rel="noopener noreferrer" class="hover:underline">USGS</a></p>

<h2 id="base-metals">Base and Industrial Metals</h2>

<p class="mb-4">Base metals are widely used in construction, transportation, electrical infrastructure, and manufacturing. These metals form the backbone of global industrial production.</p>

<p class="mb-4"><strong>Major base metals with mining sectors:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/copper-price" class="text-primary hover:underline">Copper</a> — <a href="/copper-stocks" class="text-primary hover:underline">Stocks</a> | <a href="/copper-etfs" class="text-primary hover:underline">ETFs</a></li>
  <li><a href="/aluminum-price" class="text-primary hover:underline">Aluminum</a> — <a href="/aluminum-stocks" class="text-primary hover:underline">Stocks</a></li>
  <li><a href="/nickel-stocks" class="text-primary hover:underline">Nickel</a> — <a href="/nickel-etfs" class="text-primary hover:underline">ETFs</a></li>
  <li><a href="/zinc-stocks" class="text-primary hover:underline">Zinc</a></li>
  <li>Lead</li>
  <li>Tin</li>
  <li><a href="/iron-steel-stocks" class="text-primary hover:underline">Iron</a></li>
  <li>Chromium</li>
  <li>Molybdenum</li>
</ul>

<p class="mb-6">Copper and iron ore represent some of the largest mining markets in the world.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.worldbank.org/en/research/commodity-markets" target="_blank" rel="noopener noreferrer" class="hover:underline">World Bank</a></p>

<h2 id="battery-metals">Battery and Energy Transition Metals</h2>

<p class="mb-4">The electrification of transportation and renewable energy systems has dramatically increased demand for certain metals used in batteries and energy storage technologies.</p>

<p class="mb-4"><strong>Key battery and energy metals include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/lithium-stocks" class="text-primary hover:underline">Lithium</a> — <a href="/lithium-etfs" class="text-primary hover:underline">ETFs</a></li>
  <li><a href="/nickel-stocks" class="text-primary hover:underline">Nickel</a> — <a href="/nickel-etfs" class="text-primary hover:underline">ETFs</a></li>
  <li><a href="/cobalt-stocks" class="text-primary hover:underline">Cobalt</a></li>
  <li>Graphite</li>
  <li>Manganese</li>
  <li><a href="/vanadium-stocks" class="text-primary hover:underline">Vanadium</a></li>
</ul>

<p class="mb-6">These metals are critical components of lithium-ion batteries used in electric vehicles and grid storage.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.iea.org/reports/the-role-of-critical-minerals-in-clean-energy-transitions" target="_blank" rel="noopener noreferrer" class="hover:underline">IEA</a></p>

<h2 id="nuclear-metals">Nuclear Energy Metals</h2>

<p class="mb-4">Certain metals are mined specifically for nuclear energy production.</p>

<p class="mb-4"><strong>Nuclear fuel metals include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/uranium-stocks" class="text-primary hover:underline">Uranium</a> — <a href="/uranium-etfs" class="text-primary hover:underline">ETFs</a></li>
  <li>Thorium</li>
</ul>

<p class="mb-6">Uranium mining supports the global nuclear power industry, while thorium is being researched as an alternative nuclear fuel.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://world-nuclear.org/information-library/nuclear-fuel-cycle/mining-of-uranium" target="_blank" rel="noopener noreferrer" class="hover:underline">World Nuclear Association</a></p>

<h2 id="rare-earths">Rare Earth Elements</h2>

<p class="mb-4">Rare earth elements consist of 17 chemically similar metals used in magnets, electronics, lasers, and advanced defense systems. These materials are essential for wind turbines, electric vehicles, and high-performance electronics.</p>

<p class="mb-4"><strong>Light rare earths:</strong></p>

<ul class="list-disc pl-6 mb-4 space-y-1">
  <li>Lanthanum</li>
  <li>Cerium</li>
  <li>Praseodymium</li>
  <li>Neodymium</li>
  <li>Promethium</li>
</ul>

<p class="mb-4"><strong>Heavy rare earths:</strong></p>

<ul class="list-disc pl-6 mb-4 space-y-1">
  <li>Samarium</li>
  <li>Europium</li>
  <li>Gadolinium</li>
  <li>Terbium</li>
  <li>Dysprosium</li>
  <li>Holmium</li>
  <li>Erbium</li>
  <li>Thulium</li>
  <li>Ytterbium</li>
  <li>Lutetium</li>
</ul>

<p class="mb-4"><strong>Related elements:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li>Yttrium</li>
  <li>Scandium</li>
</ul>

<p class="mb-6">Learn more about <a href="/rare-earth-stocks" class="text-primary hover:underline">rare earth stocks</a> and <a href="/rare-earth-etfs" class="text-primary hover:underline">rare earth ETFs</a>.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://pubs.usgs.gov/periodicals/mcs2024/mcs2024-rare-earths.pdf" target="_blank" rel="noopener noreferrer" class="hover:underline">USGS</a></p>

<h2 id="strategic-metals">Strategic and Critical Metals</h2>

<p class="mb-4">Strategic metals are considered essential for modern industry but often have limited global supply or geopolitical risks. Many governments classify these materials as "critical minerals."</p>

<p class="mb-4"><strong>Examples include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/tungsten-stocks" class="text-primary hover:underline">Tungsten</a></li>
  <li><a href="/antimony-stocks" class="text-primary hover:underline">Antimony</a></li>
  <li><a href="/niobium-stocks" class="text-primary hover:underline">Niobium</a></li>
  <li>Tantalum</li>
  <li>Zirconium</li>
  <li>Hafnium</li>
  <li><a href="/beryllium-stocks" class="text-primary hover:underline">Beryllium</a></li>
  <li>Bismuth</li>
</ul>

<p class="mb-6">These metals are used in aerospace alloys, electronics, defense technologies, and high-temperature materials. See our <a href="/critical-minerals-stocks" class="text-primary hover:underline">critical minerals stocks</a> and <a href="/critical-minerals-etfs" class="text-primary hover:underline">ETFs</a>.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.usgs.gov/centers/national-minerals-information-center/critical-minerals" target="_blank" rel="noopener noreferrer" class="hover:underline">USGS</a></p>

<h2 id="technology-metals">Technology and Semiconductor Metals</h2>

<p class="mb-4">Several metals play specialized roles in electronics, semiconductors, solar panels, and telecommunications. These metals are often produced as by-products of larger mining operations.</p>

<p class="mb-4"><strong>Technology metals include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li>Gallium</li>
  <li>Germanium</li>
  <li>Indium</li>
  <li>Tellurium</li>
  <li>Selenium</li>
  <li>Cadmium</li>
  <li>Rhenium</li>
</ul>

<p class="mb-6">They are used in solar cells, fiber optics, semiconductors, and aerospace alloys.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.iea.org/reports/critical-minerals-market-review" target="_blank" rel="noopener noreferrer" class="hover:underline">IEA</a></p>

<h2 id="other-metals">Other Metals With Mining Markets</h2>

<p class="mb-4">A number of additional metals have smaller but important mining markets.</p>

<p class="mb-4"><strong>Examples include:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li><a href="/titanium-stocks" class="text-primary hover:underline">Titanium</a></li>
  <li>Boron</li>
  <li>Strontium</li>
  <li>Cesium</li>
  <li>Rubidium</li>
  <li><a href="/silicon-stocks" class="text-primary hover:underline">Silicon</a> (metallurgical grade)</li>
</ul>

<p class="mb-6">These materials are used in aerospace, glass manufacturing, electronics, and specialty chemicals.</p>

<p class="mb-4 text-sm text-gray-600">Reference: <a href="https://www.usgs.gov/centers/national-minerals-information-center/mineral-commodity-summaries" target="_blank" rel="noopener noreferrer" class="hover:underline">USGS</a></p>

<h2 id="investment-exposure">Total Metals With Mining Investment Exposure</h2>

<p class="mb-4">Across all categories, there are approximately 60 metals with meaningful mining industries, commodity markets, or public mining companies.</p>

<p class="mb-6">These materials power modern infrastructure, clean energy systems, advanced electronics, and global manufacturing.</p>

<p class="mb-4"><strong>Mining investors typically gain exposure through:</strong></p>

<ul class="list-disc pl-6 mb-6 space-y-1">
  <li>Individual mining stocks</li>
  <li>Commodity futures markets</li>
  <li>Exchange-traded funds (ETFs)</li>
  <li>Diversified mining companies</li>
</ul>

<p class="mb-6">Explore our comprehensive lists of <a href="/gold-stocks" class="text-primary hover:underline">gold stocks</a>, <a href="/silver-stocks" class="text-primary hover:underline">silver stocks</a>, <a href="/precious-metals-etfs" class="text-primary hover:underline">precious metals ETFs</a>, and more to start your mining investment journey.</p>`;

async function main() {
  console.log(`=== Creating "${slug}" page ===\n`);

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`Page /${slug} already exists. Deleting existing components and recreating...`);
    await supabase.from('page_components').delete().eq('page_id', existing.id);
  }

  const { error: insertError } = await supabase.from('pages').insert({
    slug,
    title: 'List of Metals With Mining Stocks and ETFs',
    description:
      'A comprehensive list of metals with publicly traded mining companies, ETFs, and commodity markets including gold, silver, uranium, copper, rare earths, battery metals, and strategic minerals.',
    page_type: 'static',
    category: 'investing',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Complete List of Metals With Mining Stocks, ETFs, and Commodity Markets',
    meta_description:
      'A comprehensive list of metals with publicly traded mining companies, ETFs, and commodity markets including gold, silver, uranium, copper, rare earths, battery metals, and strategic minerals.',
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error('Error creating page:', insertError.message);
    process.exit(1);
  }

  console.log(`Created page: /${slug}`);

  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) {
    console.error('Failed to fetch newly created page');
    process.exit(1);
  }

  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: { content: pageContent },
      position: 1,
    },
    {
      page_id: page.id,
      component_type: 'bio_card',
      config: {
        author: 'Dave Halmai',
        authorImage: '/images/dave-profile.png',
        readingTime: 8,
      },
      position: 2,
    },
  ]);

  console.log('Added components: hero, text_block, bio_card');
  console.log('\n=== Page Created Successfully ===');
  console.log(`URL: https://goldpricelive.co/${slug}`);
}

main();
