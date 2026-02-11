export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  modifiedDate?: string
  category: string
  tags: string[]
  featuredImage?: string
  readingTime: number
  seo: {
    title: string
    description: string
    keywords: string[]
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'gold-price-predictions-2025',
    title: 'Gold Price Predictions for 2025: Expert Analysis',
    excerpt: 'Leading analysts share their predictions for gold prices in 2025. Will gold reach $3,000 per ounce?',
    content: `
      <h2>Gold Price Outlook for 2025</h2>
      <p>As we enter 2025, gold continues to be a safe haven asset for investors worldwide...</p>
      
      <h3>Key Factors Driving Gold Prices</h3>
      <ul>
        <li>Central bank policies and interest rates</li>
        <li>Geopolitical tensions</li>
        <li>Inflation concerns</li>
        <li>Currency fluctuations</li>
      </ul>
      
      <h3>Expert Predictions</h3>
      <p>Leading financial institutions have released their forecasts for gold prices...</p>
    `,
    author: 'Gold Price Live Team',
    date: '2025-01-15',
    category: 'Market Analysis',
    tags: ['gold', 'predictions', '2025', 'investment'],
    featuredImage: '/blog/gold-predictions-2025.jpg',
    readingTime: 8,
    seo: {
      title: 'Gold Price Predictions 2025 | Expert Forecast Analysis',
      description: 'Discover what leading analysts predict for gold prices in 2025. Comprehensive market analysis and price forecasts.',
      keywords: ['gold price predictions', 'gold forecast 2025', 'gold market analysis']
    }
  },
  {
    slug: 'how-to-invest-in-gold-beginners-guide',
    title: 'How to Invest in Gold: A Complete Beginner\'s Guide',
    excerpt: 'Learn the different ways to invest in gold, from physical bullion to ETFs and mining stocks.',
    content: `
      <h2>Getting Started with Gold Investment</h2>
      <p>Gold has been a store of value for thousands of years. Today, there are multiple ways to add gold to your portfolio...</p>
      
      <h3>Ways to Invest in Gold</h3>
      <h4>1. Physical Gold</h4>
      <p>Buying physical gold in the form of coins, bars, or jewelry...</p>
      
      <h4>2. Gold ETFs</h4>
      <p>Exchange-traded funds offer exposure to gold without physical storage...</p>
      
      <h4>3. Gold Mining Stocks</h4>
      <p>Investing in companies that mine gold...</p>
      
      <h4>4. Gold Futures</h4>
      <p>For experienced investors, futures contracts offer leverage...</p>
    `,
    author: 'Sarah Johnson',
    date: '2025-01-10',
    category: 'Investment Guide',
    tags: ['investing', 'gold', 'beginners', 'portfolio'],
    featuredImage: '/blog/gold-investment-guide.jpg',
    readingTime: 12,
    seo: {
      title: 'How to Invest in Gold: Complete Beginner\'s Guide 2025',
      description: 'Learn how to invest in gold with our comprehensive guide. Covers physical gold, ETFs, stocks, and more.',
      keywords: ['invest in gold', 'gold investment', 'buy gold', 'gold for beginners']
    }
  },
  {
    slug: 'silver-vs-gold-investment',
    title: 'Silver vs Gold: Which is the Better Investment?',
    excerpt: 'Compare silver and gold as investment options. Learn about the advantages and disadvantages of each precious metal.',
    content: `
      <h2>Silver vs Gold: Investment Comparison</h2>
      <p>Both silver and gold are precious metals that have served as stores of value for centuries...</p>
      
      <h3>Key Differences</h3>
      <table>
        <tr>
          <th>Factor</th>
          <th>Gold</th>
          <th>Silver</th>
        </tr>
        <tr>
          <td>Price per ounce</td>
          <td>~$2,800</td>
          <td>~$32</td>
        </tr>
        <tr>
          <td>Volatility</td>
          <td>Lower</td>
          <td>Higher</td>
        </tr>
        <tr>
          <td>Industrial use</td>
          <td>10%</td>
          <td>50%</td>
        </tr>
      </table>
    `,
    author: 'Michael Chen',
    date: '2025-01-05',
    category: 'Investment Guide',
    tags: ['silver', 'gold', 'comparison', 'investment'],
    featuredImage: '/blog/silver-vs-gold.jpg',
    readingTime: 10,
    seo: {
      title: 'Silver vs Gold Investment: Which Precious Metal to Buy?',
      description: 'Compare silver and gold investments. Learn which precious metal is right for your portfolio.',
      keywords: ['silver vs gold', 'precious metals comparison', 'buy silver or gold']
    }
  },
  {
    slug: 'understanding-gold-price-charts',
    title: 'Understanding Gold Price Charts: Technical Analysis Basics',
    excerpt: 'Learn how to read and interpret gold price charts. Master the basics of technical analysis for gold trading.',
    content: `
      <h2>Reading Gold Price Charts</h2>
      <p>Technical analysis is essential for understanding gold price movements...</p>
      
      <h3>Types of Charts</h3>
      <h4>Line Charts</h4>
      <p>The simplest form of chart showing price over time...</p>
      
      <h4>Candlestick Charts</h4>
      <p>More detailed charts showing open, high, low, and close prices...</p>
      
      <h4>Key Technical Indicators</h4>
      <ul>
        <li>Moving Averages</li>
        <li>RSI (Relative Strength Index)</li>
        <li>MACD</li>
        <li>Support and Resistance Levels</li>
      </ul>
    `,
    author: 'Technical Analysis Team',
    date: '2024-12-28',
    category: 'Education',
    tags: ['charts', 'technical analysis', 'trading', 'education'],
    featuredImage: '/blog/gold-charts.jpg',
    readingTime: 15,
    seo: {
      title: 'Gold Price Charts: Technical Analysis Guide for Beginners',
      description: 'Learn to read gold price charts with our comprehensive technical analysis guide.',
      keywords: ['gold charts', 'technical analysis', 'gold trading', 'price charts']
    }
  },
  {
    slug: 'central-banks-buying-gold-2025',
    title: 'Central Banks Are Buying Gold at Record Levels in 2025',
    excerpt: 'Central banks worldwide are increasing their gold reserves. What does this mean for gold prices?',
    content: `
      <h2>The Central Bank Gold Rush</h2>
      <p>Central banks purchased over 1,000 tonnes of gold in 2024, and 2025 is shaping up to be another record year...</p>
      
      <h3>Top Gold Buyers</h3>
      <ul>
        <li>China</li>
        <li>Poland</li>
        <li>Singapore</li>
        <li>Turkey</li>
        <li>India</li>
      </ul>
      
      <h3>Why Central Banks Are Buying</h3>
      <p>Several factors are driving this unprecedented accumulation...</p>
    `,
    author: 'Gold Price Live Team',
    date: '2025-01-20',
    category: 'Market News',
    tags: ['central banks', 'gold reserves', 'market news', '2025'],
    featuredImage: '/blog/central-banks-gold.jpg',
    readingTime: 6,
    seo: {
      title: 'Central Banks Buying Gold at Record Levels | 2025 Analysis',
      description: 'Discover why central banks are purchasing gold at record levels in 2025 and what it means for prices.',
      keywords: ['central banks gold', 'gold reserves', 'central bank gold buying']
    }
  }
]

export const categories = [
  'All',
  'Market Analysis',
  'Investment Guide',
  'Education',
  'Market News',
  'Price Updates'
]

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return getAllPosts()
  return blogPosts.filter(post => post.category === category)
}

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit)
}
