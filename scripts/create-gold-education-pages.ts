import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables.');
  console.log(
    'Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.production'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const pages = [
  {
    slug: '/why-gold-price-changes',
    title: 'Why Gold Prices Change: Key Factors That Move the Gold Market',
    description:
      'Learn why gold prices rise and fall. Discover how inflation, interest rates, currency strength, global demand, and economic uncertainty influence the price of gold.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Why Gold Prices Change | Key Factors That Move the Gold Market',
    meta_description:
      'Learn why gold prices rise and fall. Discover how inflation, interest rates, currency strength, global demand, and economic uncertainty influence the price of gold.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/gold-price-per-gram',
    title: "Gold Price Per Gram: Live Gold Value and How It's Calculated",
    description:
      'Find the current gold price per gram and understand how gold value is calculated. Learn how purity, market demand, and global spot prices affect gram pricing.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Price Per Gram | Live Gold Value Calculator',
    meta_description:
      'Find the current gold price per gram and understand how gold value is calculated. Learn how purity, market demand, and global spot prices affect gram pricing.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/gold-price-chart',
    title: 'Gold Price Chart: Track Historical Gold Prices and Market Trends',
    description:
      'View historical gold price charts and analyze trends over time. Explore how gold has performed across different economic cycles and market conditions.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Price Chart | Historical Prices & Market Trends',
    meta_description:
      'View historical gold price charts and analyze trends over time. Explore how gold has performed across different economic cycles and market conditions.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/investing-in-gold',
    title: "Investing in Gold: A Beginner's Guide to Gold as an Investment",
    description:
      'Discover how to invest in gold through bullion, coins, ETFs, and mining stocks. Learn the benefits, risks, and strategies for adding gold to your portfolio.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: "Investing in Gold | Beginner's Guide to Gold Investments",
    meta_description:
      'Discover how to invest in gold through bullion, coins, ETFs, and mining stocks. Learn the benefits, risks, and strategies for adding gold to your portfolio.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/sell-gold',
    title: 'How to Sell Gold: Get the Best Price for Your Gold Jewelry or Bullion',
    description:
      'Learn how to sell gold safely and profitably. Understand gold valuation, where to sell gold, and tips for getting the best price for jewelry, coins, or bars.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'How to Sell Gold | Get the Best Price for Your Gold',
    meta_description:
      'Learn how to sell gold safely and profitably. Understand gold valuation, where to sell gold, and tips for getting the best price for jewelry, coins, or bars.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/gold-vs-silver',
    title: 'Gold vs Silver: Which Precious Metal Is the Better Investment?',
    description:
      'Compare gold and silver as investments. Learn the key differences in price volatility, industrial demand, historical performance, and portfolio diversification.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold vs Silver | Compare Precious Metal Investments',
    meta_description:
      'Compare gold and silver as investments. Learn the key differences in price volatility, industrial demand, historical performance, and portfolio diversification.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
  {
    slug: '/gold-investment-strategies',
    title: 'Gold Investment Strategies: Smart Ways to Invest in Gold',
    description:
      'Explore proven gold investment strategies including long-term holding, portfolio hedging, dollar-cost averaging, and diversification with precious metals.',
    page_type: 'static',
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: 'Gold Investment Strategies | Smart Ways to Invest in Gold',
    meta_description:
      'Explore proven gold investment strategies including long-term holding, portfolio hedging, dollar-cost averaging, and diversification with precious metals.',
    has_calculator: false,
    has_ads: true,
    has_articles: true,
  },
];

const textContents: Record<string, string> = {
  '/why-gold-price-changes': `<h2 class="text-2xl font-bold mb-4">Understanding What Drives Gold Prices</h2>
<p class="mb-4">Gold prices are influenced by a complex interplay of economic, geopolitical, and market factors. Understanding these drivers can help you make informed decisions about buying or selling gold.</p>

<h3 class="text-xl font-semibold mb-3">Inflation and Interest Rates</h3>
<p class="mb-4">Gold has historically been viewed as an inflation hedge. When inflation rises or interest rates fall, investors often turn to gold as a store of value, driving up prices. Conversely, when inflation is controlled or interest rates rise, gold may become less attractive.</p>

<h3 class="text-xl font-semibold mb-3">Currency Movements</h3>
<p class="mb-4">Gold is priced in US dollars. When the dollar weakens, gold becomes cheaper for international buyers, increasing demand and pushing prices up. A strong dollar typically puts downward pressure on gold prices.</p>

<h3 class="text-xl font-semibold mb-3">Global Demand and Supply</h3>
<p class="mb-4">Jewelry demand, particularly from China and India, significantly impacts gold prices. Central bank purchases and mining production also affect supply. When demand exceeds supply, prices tend to rise.</p>

<h3 class="text-xl font-semibold mb-3">Geopolitical Uncertainty</h3>
<p class="mb-4">During times of political instability or economic uncertainty, investors flock to gold as a safe-haven asset. Events like wars, political crises, and financial market volatility often trigger price increases.</p>`,

  '/gold-price-per-gram': `<h2 class="text-2xl font-bold mb-4">Gold Price Per Gram Explained</h2>
<p class="mb-4">The gold price per gram is a common measurement used for calculating the value of gold jewelry, small gold items, and investment pieces. Understanding how this price is calculated helps you make better purchasing and selling decisions.</p>

<h3 class="text-xl font-semibold mb-3">How Gold Price Per Gram Is Calculated</h3>
<p class="mb-4">Gold prices are typically quoted per troy ounce in international markets. To convert to per gram, divide the spot price by 31.1035 (the number of grams in a troy ounce). The final price depends on the purity of the gold.</p>

<h3 class="text-xl font-semibold mb-3">The Role of Purity</h3>
<p class="mb-4">Gold purity is measured in karats. 24K gold is pure (99.9%), while 18K is 75% gold, and 14K is 58.3% gold. The price per gram decreases proportionally with lower purity levels.</p>

<h3 class="text-xl font-semibold mb-3">Factors Affecting Gram Price</h3>
<p class="mb-4">Beyond spot price and purity, premiums charged by dealers, manufacturing costs, and market demand all influence the final price per gram you pay or receive.</p>`,

  '/gold-price-chart': `<h2 class="text-2xl font-bold mb-4">Using Gold Price Charts</h2>
<p class="mb-4">Gold price charts are essential tools for analyzing market trends and timing your investments. Our interactive charts provide real-time data and historical performance information.</p>

<h3 class="text-xl font-semibold mb-3">Reading the Charts</h3>
<p class="mb-4">Our gold price charts display price movements over various timeframes - from daily to yearly views. The horizontal axis shows time, while the vertical axis displays the price in USD.</p>

<h3 class="text-xl font-semibold mb-3">Analyzing Trends</h3>
<p class="mb-4">Look for patterns like higher highs and higher lows for uptrends, or lower highs and lower lows for downtrends. Support and resistance levels help identify potential buying or selling opportunities.</p>

<h3 class="text-xl font-semibold mb-3">Historical Performance</h3>
<p class="mb-4">Gold has shown remarkable long-term growth. Reviewing historical charts helps understand how gold has performed during different economic conditions, including recessions, inflation spikes, and periods of stability.</p>`,

  '/investing-in-gold': `<h2 class="text-2xl font-bold mb-4">A Beginner\'s Guide to Investing in Gold</h2>
<p class="mb-4">Gold has been a valuable commodity for thousands of years and remains a popular investment choice today. This guide covers the main ways to invest in gold and the factors to consider.</p>

<h3 class="text-xl font-semibold mb-3">Ways to Invest in Gold</h3>
<p class="mb-4"><strong>Physical Gold:</strong> Buy gold bars, coins, or jewelry. Requires secure storage and insurance.</p>
<p class="mb-4"><strong>Gold ETFs:</strong> Exchange-traded funds that track gold prices, offering easy trading and no physical storage needs.</p>
<p class="mb-4"><strong>Gold Mining Stocks:</strong> Invest in companies that mine gold. Offers leverage to gold prices but carries additional company-specific risks.</p>
<p class="mb-4"><strong>Gold Futures:</strong> Contracts to buy or sell gold at a future date. More advanced and carries higher risk.</p>

<h3 class="text-xl font-semibold mb-3">Benefits of Gold Investment</h3>
<p class="mb-4">Gold provides portfolio diversification, acts as an inflation hedge, and serves as a safe-haven during economic uncertainty. It has historically maintained value over long periods.</p>`,

  '/sell-gold': `<h2 class="text-2xl font-bold mb-4">How to Sell Gold for the Best Price</h2>
<p class="mb-4">Whether you have gold jewelry, coins, bars, or scrap gold, selling strategically can significantly impact how much you receive. Here's how to maximize your returns.</p>

<h3 class="text-xl font-semibold mb-3">Determine Your Gold\'s Value</h3>
<p class="mb-4">First, determine the purity (karat) and weight of your gold. Current gold price multiplied by the purity percentage gives you the intrinsic gold value. Dealers typically pay a percentage of this value.</p>

<h3 class="text-xl font-semibold mb-3">Where to Sell Gold</h3>
<p class="mb-4"><strong>Local Jewelers:</strong> Convenient but may offer lower prices.</p>
<p class="mb-4"><strong>Pawn Shops:</strong> Quick cash but often the lowest offers.</p>
<p class="mb-4"><strong>Online Dealers:</strong> Competitive prices, especially for coins and bars.</p>
<p class="mb-4"><strong>Auction Sites:</strong> Potential for higher prices but takes longer and has fees.</p>

<h3 class="text-xl font-semibold mb-3">Tips for Getting the Best Price</h3>
<p class="mb-4">Get multiple quotes from different buyers. Understand the current spot price. Consider the condition and rarity of jewelry. Time your sale when gold prices are favorable.</p>`,

  '/gold-vs-silver': `<h2 class="text-2xl font-bold mb-4">Gold vs Silver: Comparing Precious Metals</h2>
<p class="mb-4">Both gold and silver are precious metals with investment appeal, but they have distinct characteristics. Understanding the differences helps you decide which is better suited for your portfolio.</p>

<h3 class="text-xl font-semibold mb-3">Price and Volatility</h3>
<p class="mb-4">Gold trades at much higher prices (over $2,000 per ounce) compared to silver (around $25-30 per ounce). Silver is more volatile, with larger percentage swings both up and down.</p>

<h3 class="text-xl font-semibold mb-3">Industrial Demand</h3>
<p class="mb-4">Silver has significant industrial uses in electronics, solar panels, and medical applications. Gold is primarily used in jewelry and as a monetary asset. Industrial demand affects silver prices more directly.</p>

<h3 class="text-xl font-semibold mb-3">Portfolio Role</h3>
<p class="mb-4">Gold is often seen as a store of value and safe-haven asset. Silver is sometimes called "poor man's gold" and can offer more upside potential but with higher risk.</p>

<h3 class="text-xl font-semibold mb-3">Which Is Better?</h3>
<p class="mb-4">The choice depends on your investment goals, risk tolerance, and portfolio needs. Many investors choose to hold both for diversification.</p>`,

  '/gold-investment-strategies': `<h2 class="text-2xl font-bold mb-4">Proven Gold Investment Strategies</h2>
<p class="mb-4">There are several established strategies for incorporating gold into your investment portfolio. Each approach has its own risk-reward profile and time horizon.</p>

<h3 class="text-xl font-semibold mb-3">Long-Term Holding</h3>
<p class="mb-4">Buy and hold gold for years or decades. This strategy relies on gold's historical ability to preserve value and hedge against inflation. It requires patience but minimal active management.</p>

<h3 class="text-xl font-semibold mb-3">Portfolio Hedging</h3>
<p class="mb-4">Use gold to hedge against market downturns and currency devaluation. A small allocation (5-10%) to gold can reduce portfolio volatility and provide insurance against economic crises.</p>

<h3 class="text-xl font-semibold mb-3">Dollar-Cost Averaging</h3>
<p class="mb-4">Invest a fixed amount regularly (monthly or quarterly) regardless of price. This approach smooths out price volatility and removes the stress of timing the market.</p>

<h3 class="text-xl font-semibold mb-3">Diversification with Precious Metals</h3>
<p class="mb-4">Combine gold with other precious metals like silver, platinum, and palladium. Each metal has unique drivers and can provide complementary diversification benefits.</p>`,
};

async function createPages() {
  console.log('Starting page creation...\n');

  for (const pageData of pages) {
    const { data: existingPage } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', pageData.slug)
      .single();

    if (existingPage) {
      console.log(`Skipping ${pageData.slug}: already exists`);
      continue;
    }

    console.log(`Creating page: ${pageData.slug}`);

    const { data: page, error } = await supabase.from('pages').insert(pageData).select().single();

    if (error) {
      console.error(`Error creating ${pageData.slug}:`, error.message);
      continue;
    }

    console.log(`  Page created with ID: ${page.id}`);

    const { error: heroError } = await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'hero',
      config: {},
      position: 0,
    });

    if (heroError) {
      console.error(`  Error creating hero:`, heroError.message);
    }

    const { error: textError } = await supabase.from('page_components').insert({
      page_id: page.id,
      component_type: 'text_block',
      config: {
        content: textContents[pageData.slug] || '',
      },
      position: 1,
    });

    if (textError) {
      console.error(`  Error creating text_block:`, textError.message);
    } else {
      console.log(`  Components created successfully`);
    }

    console.log('');
  }

  console.log('Page creation complete!');
}

createPages().catch(console.error);
