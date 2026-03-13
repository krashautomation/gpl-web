import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const EXISTING_SLUGS = [
  'gold-stocks',
  'gold-etfs',
  'silver-stocks',
  'silver-etfs',
  'copper-stocks',
  'copper-etfs',
  'tungsten-stocks',
];

const pagesData = [
  {
    slug: 'gold-stocks',
    title: 'Gold Stocks',
    metal: 'Gold',
    symbol: 'Au',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Newmont Corporation',
        ticker: 'NEM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: "World's largest gold miner",
      },
      {
        name: 'Barrick Gold',
        ticker: 'GOLD',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Second largest gold miner globally, HQ Toronto',
      },
      {
        name: 'Agnico Eagle Mines',
        ticker: 'AEM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Canadian senior gold miner, operations in Canada, Finland, Mexico, Australia',
      },
      {
        name: 'Wheaton Precious Metals',
        ticker: 'WPM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'streaming',
        description: 'Largest precious metals streaming company, HQ Vancouver',
      },
      {
        name: 'Franco-Nevada',
        ticker: 'FNV',
        exchange: 'NYSE',
        na_listed: true,
        type: 'royalty',
        description: 'Gold-focused royalty and streaming company, HQ Toronto',
      },
      {
        name: 'Royal Gold',
        ticker: 'RGLD',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'royalty',
        description: 'Gold royalty and streaming company, HQ Denver',
      },
      {
        name: 'Kinross Gold',
        ticker: 'KGC',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Senior Canadian gold miner',
      },
      {
        name: 'Gold Fields',
        ticker: 'GFI',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'South African miner, NYSE-listed ADR',
      },
      {
        name: 'AngloGold Ashanti',
        ticker: 'AU',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Global gold miner, NYSE ADR',
      },
      {
        name: 'Eldorado Gold',
        ticker: 'EGO',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Canadian mid-tier gold miner',
      },
      {
        name: 'Alamos Gold',
        ticker: 'AGI',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Canadian gold producer, operations in Canada and Mexico',
      },
      {
        name: 'Iamgold',
        ticker: 'IAG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Canadian mid-tier gold miner',
      },
      {
        name: 'Equinox Gold',
        ticker: 'EQX',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Vancouver-based gold producer',
      },
      {
        name: 'Coeur Mining',
        ticker: 'CDE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'US-based silver and gold producer',
      },
      {
        name: 'Osisko Gold Royalties',
        ticker: 'OR',
        exchange: 'NYSE',
        na_listed: true,
        type: 'royalty',
        description: 'Canadian royalty company focused on Americas',
      },
      {
        name: 'Sandstorm Gold',
        ticker: 'SAND',
        exchange: 'NYSE',
        na_listed: true,
        type: 'royalty',
        description: 'Vancouver-based gold royalty and streaming',
      },
      {
        name: 'Skeena Resources',
        ticker: 'SKE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'BC-based gold developer, Eskay Creek project',
      },
      {
        name: 'Torex Gold Resources',
        ticker: 'TXG',
        exchange: 'TSX',
        na_listed: true,
        type: 'mid-tier',
        description: 'Canadian gold producer, Mexico operations',
      },
      {
        name: 'Probe Gold',
        ticker: 'PRB',
        exchange: 'TSX',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian gold explorer, Quebec',
      },
      {
        name: 'Artemis Gold',
        ticker: 'ARTG',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'BC-focused gold developer, Blackwater project',
      },
    ],
  },
  {
    slug: 'gold-etfs',
    title: 'Gold ETFs',
    metal: 'Gold',
    symbol: 'Au',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'GLD',
        name: 'SPDR Gold Shares',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        aum_rank: 1,
        description: 'Largest gold ETF by AUM, tracks spot gold price',
      },
      {
        ticker: 'IAU',
        name: 'iShares Gold Trust',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        aum_rank: 2,
        description: 'Lower fee than GLD, same physical gold exposure',
      },
      {
        ticker: 'GLDM',
        name: 'SPDR Gold MiniShares',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        aum_rank: 3,
        description: 'Lowest cost SPDR gold product',
      },
      {
        ticker: 'GDX',
        name: 'VanEck Gold Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        aum_rank: 1,
        description: 'Largest gold miner ETF, large and mid-cap global gold miners',
      },
      {
        ticker: 'GDXJ',
        name: 'VanEck Junior Gold Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-junior',
        aum_rank: 2,
        description: 'Small and mid-cap gold and silver miners',
      },
      {
        ticker: 'SGDM',
        name: 'Sprott Gold Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        aum_rank: 3,
        description: 'Factor-weighted gold miners, revenue growth focus',
      },
      {
        ticker: 'RING',
        name: 'iShares MSCI Global Gold Miners ETF',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'miners',
        aum_rank: 4,
        description: 'MSCI-indexed global gold miners',
      },
      {
        ticker: 'GOAU',
        name: 'U.S. Global GO GOLD and Precious Metal Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        aum_rank: 5,
        description: 'Royalty/streaming weighted gold and precious metal miners',
      },
      {
        ticker: 'GBUG',
        name: 'Sprott Gold Bull ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-leveraged',
        aum_rank: 6,
        description: 'Concentrated high-conviction gold miners',
      },
      {
        ticker: 'GOEX',
        name: 'Global X Gold Explorers ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'explorers',
        aum_rank: 7,
        description: 'Early-stage gold exploration companies',
      },
    ],
  },
  {
    slug: 'silver-stocks',
    title: 'Silver Stocks',
    metal: 'Silver',
    symbol: 'Ag',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Wheaton Precious Metals',
        ticker: 'WPM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'streaming',
        description: 'Largest silver streaming company globally, Vancouver HQ',
      },
      {
        name: 'Pan American Silver',
        ticker: 'PAAS',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'major',
        description: 'Largest primary silver miner in the Americas',
      },
      {
        name: 'First Majestic Silver',
        ticker: 'AG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'Vancouver-based primary silver producer, Mexico operations',
      },
      {
        name: 'Hecla Mining',
        ticker: 'HL',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'Largest US silver producer, also gold',
      },
      {
        name: 'Coeur Mining',
        ticker: 'CDE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'US silver and gold producer',
      },
      {
        name: 'MAG Silver',
        ticker: 'MAG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'Vancouver-based, Juanicipio mine in Mexico',
      },
      {
        name: 'SilverCrest Metals',
        ticker: 'SIL',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'High-grade silver-gold producer, Las Chispas mine Mexico',
      },
      {
        name: 'Endeavour Silver',
        ticker: 'EXK',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'Vancouver-based silver producer',
      },
      {
        name: 'GoGold Resources',
        ticker: 'GGD',
        exchange: 'TSX',
        na_listed: true,
        type: 'mid-tier',
        description: 'Canadian silver-gold developer, Mexico',
      },
      {
        name: 'Silvercorp Metals',
        ticker: 'SVM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'primary-silver',
        description: 'Canada-listed, China operations',
      },
    ],
  },
  {
    slug: 'silver-etfs',
    title: 'Silver ETFs',
    metal: 'Silver',
    symbol: 'Ag',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'SLV',
        name: 'iShares Silver Trust',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        description: 'Largest silver ETF, tracks spot silver',
      },
      {
        ticker: 'SIVR',
        name: 'abrdn Physical Silver Shares ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        description: 'Physical silver alternative to SLV',
      },
      {
        ticker: 'SIL',
        name: 'Global X Silver Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        description: 'Large and mid-cap global silver miners',
      },
      {
        ticker: 'SILJ',
        name: 'ETFMG Prime Junior Silver Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-junior',
        description: 'Small-cap and junior silver miners',
      },
    ],
  },
  {
    slug: 'platinum-stocks',
    title: 'Platinum Stocks',
    metal: 'Platinum',
    symbol: 'Pt',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Sibanye-Stillwater',
        ticker: 'SBSW',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description:
          'NYSE-listed, largest platinum group metals producer with US palladium operations in Montana',
      },
      {
        name: 'Platinum Group Metals',
        ticker: 'PLG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'Vancouver-based PGM developer, Waterberg project South Africa',
      },
      {
        name: 'Generation Mining',
        ticker: 'GENM',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description: 'Canadian PGM developer, Marathon project Ontario',
      },
    ],
  },
  {
    slug: 'platinum-etfs',
    title: 'Platinum ETFs',
    metal: 'Platinum',
    symbol: 'Pt',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'PPLT',
        name: 'abrdn Physical Platinum Shares ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        issuer: 'abrdn',
        description:
          'Largest US-listed platinum ETF. Holds physical platinum bullion. Each share represents a fractional interest in platinum stored in Zurich vaults.',
      },
      {
        ticker: 'PLTM',
        name: 'GraniteShares Platinum Trust',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        issuer: 'GraniteShares',
        description:
          'Lower-fee physical platinum ETF alternative to PPLT. Holds allocated platinum bullion.',
      },
    ],
  },
  {
    slug: 'palladium-stocks',
    title: 'Palladium Stocks',
    metal: 'Palladium',
    symbol: 'Pd',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Sibanye-Stillwater',
        ticker: 'SBSW',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description:
          'Operates the Stillwater and East Boulder palladium-platinum mines in Montana — the only primary palladium producer in the United States. NYSE-listed ADR.',
      },
      {
        name: 'Platinum Group Metals',
        ticker: 'PLG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description:
          'Vancouver-based PGM developer. Waterberg palladium-platinum project in South Africa. NYSE and TSX dual-listed.',
      },
      {
        name: 'Generation Mining',
        ticker: 'GENM',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description:
          'Marathon palladium-copper project in Ontario — one of the largest undeveloped palladium deposits in North America.',
      },
      {
        name: 'Clean Air Power (Palladium One)',
        ticker: 'PDM',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description:
          'LK Project in Finland, palladium-platinum-nickel-copper. TSX-V listed Canadian explorer.',
      },
    ],
  },
  {
    slug: 'palladium-etfs',
    title: 'Palladium ETFs',
    metal: 'Palladium',
    symbol: 'Pd',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'PALL',
        name: 'abrdn Physical Palladium Shares ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical',
        issuer: 'abrdn',
        description:
          'Only major US-listed physical palladium ETF. Holds allocated palladium bullion in vaults. Approximately 40% of global palladium supply comes from Russia, making this a geopolitically sensitive commodity.',
      },
    ],
  },
  {
    slug: 'pgm-stocks',
    title: 'PGM Stocks',
    metal: 'Platinum Group Metals',
    symbol: 'PGM',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Sibanye-Stillwater',
        ticker: 'SBSW',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description:
          'Primary US-listed PGM producer. Stillwater and East Boulder mines in Montana produce palladium, platinum, rhodium, iridium and ruthenium as byproducts. NYSE ADR.',
      },
      {
        name: 'Platinum Group Metals',
        ticker: 'PLG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description:
          'Vancouver-based. Developing the Waterberg palladium-platinum deposit in South Africa. Dual-listed NYSE and TSX.',
      },
      {
        name: 'Generation Mining',
        ticker: 'GENM',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description:
          'Marathon PGM-copper project, Ontario. One of the largest undeveloped palladium deposits in North America.',
      },
      {
        name: 'Palladium One Mining',
        ticker: 'PDM',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'LK Project palladium-platinum-nickel explorer, Finland. TSX-V listed.',
      },
      {
        name: 'Bravo Mining',
        ticker: 'BRVO',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Luanga PGM-gold project, Brazil. TSX-V listed Canadian junior.',
      },
    ],
  },
  {
    slug: 'precious-metals-etfs',
    title: 'Precious Metals ETFs',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'GLTR',
        name: 'abrdn Physical Precious Metals Basket Shares ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'physical-basket',
        issuer: 'abrdn',
        description:
          'Holds physical gold, silver, platinum and palladium in a single fund. The only US-listed ETF providing combined physical exposure to all four major precious metals.',
      },
      {
        ticker: 'GOGO',
        name: 'U.S. Global GO GOLD and Precious Metal Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-basket',
        issuer: 'U.S. Global Investors',
        description:
          'Actively managed gold and precious metal miners including royalty and streaming companies. Overweights royalty/streaming vs pure miners.',
      },
      {
        ticker: 'SGDM',
        name: 'Sprott Gold Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        issuer: 'Sprott',
        description:
          'Factor-weighted gold miners ETF. Screens for revenue growth, free cash flow yield and low debt. Tilts toward mid-tier producers vs mega-caps.',
      },
      {
        ticker: 'GOAU',
        name: 'U.S. Global GO GOLD and Precious Metal Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        issuer: 'U.S. Global Investors',
        description:
          'Royalty and streaming weighted precious metal miners. One-third royalty companies, two-thirds producers.',
      },
    ],
  },
  {
    slug: 'copper-stocks',
    title: 'Copper Stocks',
    metal: 'Copper',
    symbol: 'Cu',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Freeport-McMoRan',
        ticker: 'FCX',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Largest publicly traded copper producer in the world, HQ Phoenix AZ',
      },
      {
        name: 'Teck Resources',
        ticker: 'TECK',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Vancouver-based diversified miner, large copper exposure via QB2 mine',
      },
      {
        name: 'Hudbay Minerals',
        ticker: 'HBM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Toronto-based copper and zinc producer',
      },
      {
        name: 'Capstone Copper',
        ticker: 'CS',
        exchange: 'TSX',
        na_listed: true,
        type: 'mid-tier',
        description: 'Vancouver-based copper producer, Americas operations',
      },
      {
        name: 'Copper Mountain Mining',
        ticker: 'CMMC',
        exchange: 'TSX',
        na_listed: true,
        type: 'mid-tier',
        description: 'BC-based copper producer, acquired by Hudbay 2023',
      },
      {
        name: 'Ivanhoe Mines',
        ticker: 'IVN',
        exchange: 'TSX',
        na_listed: true,
        type: 'major',
        description: "Vancouver-based, Kamoa-Kakula is world's second largest copper mine",
      },
      {
        name: 'Arizona Copper',
        ticker: 'AZC',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Arizona-focused copper developer',
      },
      {
        name: 'Surge Copper',
        ticker: 'SURG',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'BC copper explorer',
      },
      {
        name: 'Solaris Resources',
        ticker: 'SLS',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description: 'Vancouver-based copper developer, Ecuador',
      },
      {
        name: 'Torex Gold',
        ticker: 'TXG',
        exchange: 'TSX',
        na_listed: true,
        type: 'mid-tier',
        description: 'Significant copper byproduct from Media Luna project',
      },
    ],
  },
  {
    slug: 'copper-etfs',
    title: 'Copper ETFs',
    metal: 'Copper',
    symbol: 'Cu',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'COPX',
        name: 'Global X Copper Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        description:
          'Largest copper miner ETF, covers large, mid, and small-cap copper miners globally',
      },
      {
        ticker: 'COPP',
        name: 'Sprott Copper Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        description: 'Pure-play copper miners across all market caps',
      },
      {
        ticker: 'CPJR',
        name: 'Sprott Junior Copper Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-junior',
        description: 'Small and micro-cap copper explorers and developers',
      },
      {
        ticker: 'CPER',
        name: 'United States Copper Index Fund',
        exchange: 'NYSE',
        na_listed: true,
        type: 'futures',
        description: 'Futures-based copper price exposure, tracks COMEX copper',
      },
    ],
  },
  {
    slug: 'nickel-stocks',
    title: 'Nickel Stocks',
    metal: 'Nickel',
    symbol: 'Ni',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Vale',
        ticker: 'VALE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: "NYSE-listed Brazilian miner, world's largest nickel producer",
      },
      {
        name: 'Canada Nickel Company',
        ticker: 'CNC',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description:
          'Crawford nickel project, Ontario — one of the largest nickel deposits in the world',
      },
      {
        name: 'Nickel Industries',
        ticker: 'NIC',
        exchange: 'TSX',
        na_listed: true,
        type: 'producer',
        description: 'Canadian-listed nickel producer',
      },
      {
        name: 'Tartisan Nickel',
        ticker: 'TN',
        exchange: 'CSE',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian nickel explorer, Ontario',
      },
      {
        name: 'Magna Mining',
        ticker: 'NICU',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Sudbury basin nickel developer, Ontario',
      },
      {
        name: 'FPX Nickel',
        ticker: 'FPX',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'BC-based nickel developer, Baptiste deposit',
      },
    ],
  },
  {
    slug: 'nickel-etfs',
    title: 'Nickel ETFs',
    metal: 'Nickel',
    symbol: 'Ni',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'NKEL',
        name: 'Sprott Nickel Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        description: 'Only US-listed dedicated nickel miners ETF',
      },
    ],
  },
  {
    slug: 'zinc-stocks',
    title: 'Zinc Stocks',
    metal: 'Zinc',
    symbol: 'Zn',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Teck Resources',
        ticker: 'TECK',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description:
          "Vancouver-based, one of the world's largest zinc producers via Trail Operations and Red Dog mine",
      },
      {
        name: 'Hudbay Minerals',
        ticker: 'HBM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'mid-tier',
        description: 'Toronto-based copper and zinc producer',
      },
      {
        name: 'Zinc One Resources',
        ticker: 'Z',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian zinc explorer',
      },
      {
        name: 'Surge Battery Metals',
        ticker: 'NILI',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian zinc and battery metals explorer',
      },
    ],
  },
  {
    slug: 'aluminum-stocks',
    title: 'Aluminum Stocks',
    metal: 'Aluminum',
    symbol: 'Al',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Alcoa Corporation',
        ticker: 'AA',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Largest US aluminum producer, bauxite mining through smelting',
      },
      {
        name: 'Century Aluminum',
        ticker: 'CENX',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'producer',
        description: 'US aluminum smelter',
      },
      {
        name: 'Kaiser Aluminum',
        ticker: 'KALU',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'downstream',
        description: 'US aluminum fabrication and rolling',
      },
    ],
  },
  {
    slug: 'iron-steel-stocks',
    title: 'Iron & Steel Stocks',
    metal: 'Iron / Steel',
    symbol: 'Fe',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Nucor Corporation',
        ticker: 'NUE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'steel-producer',
        description: 'Largest US steel producer by volume',
      },
      {
        name: 'Steel Dynamics',
        ticker: 'STLD',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'steel-producer',
        description: 'Major US electric arc furnace steel producer',
      },
      {
        name: 'United States Steel',
        ticker: 'X',
        exchange: 'NYSE',
        na_listed: true,
        type: 'steel-producer',
        description: 'Integrated US steel producer',
      },
      {
        name: 'Champion Iron',
        ticker: 'CIA',
        exchange: 'TSX',
        na_listed: true,
        type: 'iron-ore-producer',
        description: 'Bloom Lake iron ore mine Quebec — high-grade direct reduction iron ore',
      },
      {
        name: 'Labrador Iron Ore Royalty',
        ticker: 'LIF',
        exchange: 'TSX',
        na_listed: true,
        type: 'royalty',
        description: 'TSX-listed royalty on Iron Ore Company of Canada',
      },
      {
        name: 'Cleveland-Cliffs',
        ticker: 'CLF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'integrated',
        description: 'US iron ore miner and steel producer',
      },
    ],
  },
  {
    slug: 'steel-etfs',
    title: 'Steel ETFs',
    metal: 'Steel / Iron',
    symbol: 'Fe',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'SLX',
        name: 'VanEck Steel ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producers',
        description: 'Steel producers and iron ore miners globally',
      },
    ],
  },
  {
    slug: 'lithium-stocks',
    title: 'Lithium Stocks',
    metal: 'Lithium',
    symbol: 'Li',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Albemarle Corporation',
        ticker: 'ALB',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: "World's largest lithium producer, HQ Charlotte NC",
      },
      {
        name: 'Arcadium Lithium',
        ticker: 'ALTM',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Merged with Allkem to form Arcadium, acquired by Rio Tinto 2024',
      },
      {
        name: 'Piedmont Lithium',
        ticker: 'PLL',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'developer',
        description: 'North Carolina lithium developer, supply agreement with Tesla',
      },
      {
        name: 'Lithium Americas',
        ticker: 'LAC',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'Vancouver-based, Thacker Pass Nevada — largest US lithium deposit',
      },
      {
        name: 'Lithium Americas (Argentina)',
        ticker: 'LAAC',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'Cauchari-Olaroz lithium brine project, Argentina',
      },
      {
        name: 'Sigma Lithium',
        ticker: 'SGML',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'producer',
        description: 'Hard rock lithium producer in Brazil, NASDAQ-listed',
      },
      {
        name: 'Standard Lithium',
        ticker: 'SLI',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'Vancouver-based, Arkansas lithium brine project',
      },
      {
        name: 'Patriot Battery Metals',
        ticker: 'PMET',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Shaakichiuwaanaan lithium project, Quebec — high-grade spodumene',
      },
      {
        name: 'Frontier Lithium',
        ticker: 'FL',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Ontario lithium developer, PAK deposit',
      },
      {
        name: 'Winsome Resources',
        ticker: 'WR1',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Quebec lithium explorer',
      },
    ],
  },
  {
    slug: 'lithium-etfs',
    title: 'Lithium ETFs',
    metal: 'Lithium',
    symbol: 'Li',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'LIT',
        name: 'Global X Lithium & Battery Tech ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-and-tech',
        issuer: 'Global X',
        description:
          'Largest lithium ETF. Covers lithium miners plus battery manufacturers and EV companies. Broader than pure-play miners.',
      },
      {
        ticker: 'LITP',
        name: 'Sprott Lithium Miners ETF',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'miners',
        issuer: 'Sprott',
        description:
          'Pure-play lithium miners and developers only. Tracks the Nasdaq Sprott Lithium Miners Index. Launched February 2023.',
      },
    ],
  },
  {
    slug: 'uranium-stocks',
    title: 'Uranium Stocks',
    metal: 'Uranium',
    symbol: 'U',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Cameco Corporation',
        ticker: 'CCJ',
        exchange: 'NYSE',
        na_listed: true,
        type: 'major',
        description: 'Largest Western uranium producer, HQ Saskatoon SK',
      },
      {
        name: 'NexGen Energy',
        ticker: 'NXE',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description:
          'Arrow deposit in Athabasca Basin, one of largest undeveloped uranium deposits',
      },
      {
        name: 'Denison Mines',
        ticker: 'DNN',
        exchange: 'NYSE',
        na_listed: true,
        type: 'developer',
        description: 'Canadian uranium developer and owner of physical uranium',
      },
      {
        name: 'Energy Fuels',
        ticker: 'UUUU',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Largest US uranium producer, also processes rare earths and vanadium',
      },
      {
        name: 'enCore Energy',
        ticker: 'EU',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'US in-situ recovery uranium producer, Texas and Wyoming',
      },
      {
        name: 'Uranium Energy Corp',
        ticker: 'UEC',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Texas-based ISR uranium producer and developer',
      },
      {
        name: 'Fission Uranium',
        ticker: 'FCU',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description: 'Triple R deposit, Athabasca Basin SK',
      },
      {
        name: 'Paladin Energy',
        ticker: 'PDN',
        exchange: 'TSX',
        na_listed: true,
        type: 'producer',
        description: 'TSX-listed, Langer Heinrich mine Namibia',
      },
      {
        name: 'Skyharbour Resources',
        ticker: 'SYH',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Athabasca Basin uranium explorer, portfolio of properties',
      },
      {
        name: 'Iso Energy',
        ticker: 'ISO',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Athabasca Basin developer, Hurricane deposit',
      },
      {
        name: 'Consolidated Uranium',
        ticker: 'CUR',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Multi-jurisdiction uranium developer',
      },
    ],
  },
  {
    slug: 'uranium-etfs',
    title: 'Uranium ETFs',
    metal: 'Uranium',
    symbol: 'U',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'URNM',
        name: 'Sprott Uranium Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners-and-physical',
        issuer: 'Sprott',
        description:
          'Largest uranium ETF. Holds uranium miners plus ~11-17% allocation to physical uranium via Sprott Physical Uranium Trust. Only US-listed ETF with pure-play uranium miner and physical exposure combined.',
      },
      {
        ticker: 'URA',
        name: 'Global X Uranium ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        issuer: 'Global X',
        description:
          'Oldest and largest uranium miner ETF by AUM. Covers uranium miners plus nuclear energy companies. Broader mandate than URNM.',
      },
      {
        ticker: 'URNJ',
        name: 'Sprott Junior Uranium Miners ETF',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'miners-junior',
        issuer: 'Sprott',
        description:
          'Small and micro-cap uranium explorers and developers. ~35 holdings, more evenly weighted than URNM. Launched February 2023.',
      },
      {
        ticker: 'U.UN',
        name: 'Sprott Physical Uranium Trust',
        exchange: 'TSX',
        na_listed: true,
        type: 'physical',
        issuer: 'Sprott',
        description:
          "TSX-listed physical uranium trust. Holds uranium oxide (U3O8) directly. Canadian investors' primary vehicle for physical uranium exposure.",
      },
    ],
  },
  {
    slug: 'rare-earth-stocks',
    title: 'Rare Earth Stocks',
    metal: 'Rare Earth Elements',
    symbol: 'REE',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'MP Materials',
        ticker: 'MP',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Only significant US rare earth producer, Mountain Pass CA mine',
      },
      {
        name: 'Energy Fuels',
        ticker: 'UUUU',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'US uranium producer expanding into rare earth processing, White Mesa Mill UT',
      },
      {
        name: 'Vital Metals',
        ticker: 'VML',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'producer',
        description: 'Nechalacho rare earth project, Northwest Territories',
      },
      {
        name: 'Appia Rare Earths & Uranium',
        ticker: 'API',
        exchange: 'CSE',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian REE and uranium explorer, Saskatchewan and Ontario',
      },
      {
        name: 'Defense Metals',
        ticker: 'DEFN',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Wicheeda rare earth project, BC',
      },
      {
        name: 'Mkango Resources',
        ticker: 'MKA',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'developer',
        description: 'Songwe Hill REE project, Malawi — TSX-V listed',
      },
      {
        name: 'Search Minerals',
        ticker: 'SMY',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Labrador rare earth explorer, Deep Fox project',
      },
      {
        name: 'Torngat Metals',
        ticker: 'TMET',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'explorer',
        description: 'Quebec rare earth explorer',
      },
      {
        name: 'Scandium International Mining',
        ticker: 'SCY',
        exchange: 'TSX',
        na_listed: true,
        type: 'developer',
        description: 'Only TSX-listed pure-play scandium developer',
      },
      {
        name: 'NioCorp Developments',
        ticker: 'NB',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'developer',
        description: 'Elk Creek project Nebraska — scandium, niobium, titanium',
      },
    ],
  },
  {
    slug: 'rare-earth-etfs',
    title: 'Rare Earth ETFs',
    metal: 'Rare Earth Elements',
    symbol: 'REE',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'REMX',
        name: 'VanEck Rare Earth and Strategic Metals ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'miners',
        issuer: 'VanEck',
        description:
          'Primary rare earth ETF. Covers REE miners alongside lithium, cobalt, titanium, manganese and other strategic metals. ~30 global holdings.',
      },
      {
        ticker: 'SETM',
        name: 'Sprott Energy Transition Materials ETF',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'multi-metal',
        issuer: 'Sprott',
        description:
          'Broadest critical minerals ETF. Includes rare earths alongside uranium, lithium, copper, nickel, silver, manganese, cobalt, graphite and rare earth miners.',
      },
    ],
  },
  {
    slug: 'tungsten-stocks',
    title: 'Tungsten Stocks',
    metal: 'Tungsten',
    symbol: 'W',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Almonty Industries',
        ticker: 'AII',
        exchange: 'TSX',
        na_listed: true,
        type: 'producer',
        description:
          'Primary Western tungsten producer, Sangdong mine South Korea and Panasqueira Portugal',
      },
      {
        name: 'American Tungsten',
        ticker: 'TUNG',
        exchange: 'CSE',
        na_listed: true,
        type: 'explorer',
        description: 'Canadian tungsten explorer, BC properties',
      },
    ],
  },
  {
    slug: 'antimony-stocks',
    title: 'Antimony Stocks',
    metal: 'Antimony',
    symbol: 'Sb',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'United States Antimony',
        ticker: 'UAMY',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Only primary US antimony producer and processor',
      },
      {
        name: 'Perpetua Resources',
        ticker: 'PPTA',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'developer',
        description:
          'Stibnite gold project Idaho with significant antimony credits — US government backing',
      },
    ],
  },
  {
    slug: 'cobalt-stocks',
    title: 'Cobalt Stocks',
    metal: 'Cobalt',
    symbol: 'Co',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'Electra Battery Materials',
        ticker: 'ELBM',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'processor',
        description: "Building North America's only cobalt refinery, Ontario",
      },
    ],
  },
  {
    slug: 'vanadium-stocks',
    title: 'Vanadium Stocks',
    metal: 'Vanadium',
    symbol: 'V',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'Largo Inc',
        ticker: 'LGO',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'producer',
        description: 'Primary vanadium producer, Maracas Menchen mine Brazil, NASDAQ-listed',
      },
      {
        name: 'Energy Fuels',
        ticker: 'UUUU',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Recovers vanadium at White Mesa Mill Utah as byproduct of uranium processing',
      },
    ],
  },
  {
    slug: 'titanium-stocks',
    title: 'Titanium Stocks',
    metal: 'Titanium',
    symbol: 'Ti',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'Tronox Holdings',
        ticker: 'TROX',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description: 'Largest US titanium dioxide (TiO2) producer, mineral sands mining',
      },
    ],
  },
  {
    slug: 'silicon-stocks',
    title: 'Silicon Stocks',
    metal: 'Silicon',
    symbol: 'Si',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'Ferroglobe',
        ticker: 'GSM',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'producer',
        description:
          'Largest metallurgical silicon and silicon-based alloys producer in the Americas',
      },
    ],
  },
  {
    slug: 'beryllium-stocks',
    title: 'Beryllium Stocks',
    metal: 'Beryllium',
    symbol: 'Be',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'Materion Corporation',
        ticker: 'MTRN',
        exchange: 'NYSE',
        na_listed: true,
        type: 'producer',
        description:
          'Only publicly traded primary beryllium producer in the world, HQ Mayfield Heights OH',
      },
    ],
  },
  {
    slug: 'niobium-stocks',
    title: 'Niobium Stocks',
    metal: 'Niobium',
    symbol: 'Nb',
    page_type: 'stock',
    tier: 2,
    companies: [
      {
        name: 'NioCorp Developments',
        ticker: 'NB',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'developer',
        description:
          'Elk Creek project Nebraska — niobium, scandium, titanium. Only US-listed pure-play niobium developer',
      },
    ],
  },
  {
    slug: 'critical-minerals-stocks',
    title: 'Critical Minerals Stocks',
    page_type: 'stock',
    tier: 1,
    companies: [
      {
        name: 'Alphamin Resources',
        ticker: 'AFM',
        exchange: 'TSX-V',
        na_listed: true,
        type: 'tin-producer',
        metal: 'Tin',
        description: 'Mpama North tin mine DRC — highest grade tin mine in the world, TSX-V listed',
      },
      {
        name: 'Nouveau Monde Graphite',
        ticker: 'NMG',
        exchange: 'NYSE',
        na_listed: true,
        type: 'graphite-developer',
        metal: 'Graphite',
        description: 'Matawinie graphite project Quebec, battery anode material focus',
      },
      {
        name: 'Westwater Resources',
        ticker: 'WWR',
        exchange: 'NYSE',
        na_listed: true,
        type: 'graphite-developer',
        metal: 'Graphite',
        description: 'Coosa graphite project Alabama, US-focused',
      },
      {
        name: 'First Solar',
        ticker: 'FSLR',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'tellurium-consumer',
        metal: 'Tellurium',
        description:
          "World's largest CdTe thin-film solar manufacturer, largest tellurium consumer",
      },
      {
        name: 'Freeport-McMoRan',
        ticker: 'FCX',
        exchange: 'NYSE',
        na_listed: true,
        type: 'rhenium-byproduct',
        metal: 'Rhenium / Molybdenum',
        description: 'Significant rhenium and molybdenum byproduct from copper operations',
      },
      {
        name: 'General Moly',
        ticker: 'GMO',
        exchange: 'NYSE',
        na_listed: true,
        type: 'molybdenum-developer',
        metal: 'Molybdenum',
        description: 'Mt. Hope molybdenum project Nevada — largest undeveloped moly deposit in US',
      },
    ],
  },
  {
    slug: 'critical-minerals-etfs',
    title: 'Critical Minerals ETFs',
    page_type: 'etf',
    tier: 1,
    etfs: [
      {
        ticker: 'SETM',
        name: 'Sprott Energy Transition Materials ETF',
        exchange: 'NASDAQ',
        na_listed: true,
        type: 'multi-metal',
        issuer: 'Sprott',
        description:
          'Broadest critical minerals ETF — uranium, lithium, copper, nickel, silver, manganese, cobalt, graphite and rare earths.',
      },
      {
        ticker: 'REMX',
        name: 'VanEck Rare Earth and Strategic Metals ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'multi-metal',
        issuer: 'VanEck',
        description:
          'Rare earths, lithium, cobalt, titanium, manganese. Primary strategic metals ETF.',
      },
      {
        ticker: 'PICK',
        name: 'iShares MSCI Global Metals & Mining Producers ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'diversified',
        issuer: 'iShares',
        description:
          'Broadest metals ETF by holdings (~230 stocks). Copper, iron ore, aluminum, diversified miners. Excludes gold and silver.',
      },
      {
        ticker: 'XME',
        name: 'SPDR S&P Metals & Mining ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'diversified',
        issuer: 'SPDR',
        description:
          'US-listed metals and mining companies. Equal-weighted across aluminum, copper, gold, silver and steel sub-industries.',
      },
      {
        ticker: 'DBB',
        name: 'Invesco DB Base Metals Fund',
        exchange: 'NYSE',
        na_listed: true,
        type: 'futures-basket',
        issuer: 'Invesco',
        description:
          'Futures-based exposure to copper, aluminum and zinc via LME contracts. Tracks the DBIQ Optimum Yield Industrial Metals Index.',
      },
      {
        ticker: 'METL',
        name: 'Sprott Active Metals & Miners ETF',
        exchange: 'NYSE',
        na_listed: true,
        type: 'active-multi-metal',
        issuer: 'Sprott',
        description:
          'Actively managed across the metals spectrum. Launched late 2024. Broadest mandate of all Sprott metals ETFs.',
      },
    ],
  },
];

const metalDescriptions: Record<string, string> = {
  'gold-stocks':
    'Track gold mining stocks including Newmont, Barrick Gold, and other companies with live prices and charts.',
  'gold-etfs': 'Invest in gold with ETFs tracking spot gold prices or gold mining companies.',
  'silver-stocks':
    'Track silver mining stocks including Pan American Silver, First Majestic, and other companies with live prices and charts.',
  'silver-etfs':
    'Invest in silver with ETFs tracking spot silver prices or silver mining companies.',
  'platinum-stocks':
    'Track platinum mining stocks and companies with exposure to platinum group metals.',
  'platinum-etfs': 'Invest in platinum with physical platinum ETFs.',
  'palladium-stocks': 'Track palladium mining stocks and companies with exposure to palladium.',
  'palladium-etfs': 'Invest in palladium with the only dedicated physical palladium ETF.',
  'pgm-stocks':
    'Track platinum group metals (PGM) mining stocks covering platinum, palladium, rhodium, and iridium.',
  'precious-metals-etfs':
    'Invest in precious metals with basket ETFs covering gold, silver, platinum, and palladium.',
  'copper-stocks':
    'Track copper mining stocks including Freeport-McMoRan, Teck Resources, and other companies with live prices and charts.',
  'copper-etfs': 'Invest in copper with ETFs tracking copper miners or futures.',
  'nickel-stocks': 'Track nickel mining stocks and companies with exposure to nickel.',
  'nickel-etfs': 'Invest in nickel with the only dedicated nickel miners ETF.',
  'zinc-stocks': 'Track zinc mining stocks and companies with exposure to zinc.',
  'aluminum-stocks':
    'Track aluminum stocks including Alcoa, Century Aluminum, and other producers.',
  'iron-steel-stocks':
    'Track iron ore and steel stocks including Nucor, Steel Dynamics, and other producers.',
  'steel-etfs': 'Invest in steel producers with dedicated steel ETFs.',
  'lithium-stocks':
    'Track lithium mining stocks including Albemarle, Arcadium Lithium, and other companies with live prices and charts.',
  'lithium-etfs': 'Invest in lithium with ETFs tracking lithium miners and battery technology.',
  'uranium-stocks':
    'Track uranium mining stocks including Cameco, NexGen Energy, and other companies with live prices and charts.',
  'uranium-etfs': 'Invest in uranium with ETFs tracking uranium miners or physical uranium.',
  'rare-earth-stocks':
    'Track rare earth mining stocks including MP Materials, and other companies with exposure to critical rare earth elements.',
  'rare-earth-etfs': 'Invest in rare earth and strategic metals with dedicated ETFs.',
  'tungsten-stocks':
    'Track tungsten mining stocks including Almonty Industries and other companies with live prices and charts.',
  'antimony-stocks':
    'Track antimony mining stocks and companies with exposure to this critical battery metal.',
  'cobalt-stocks':
    'Track cobalt stocks and companies with exposure to this critical battery metal.',
  'vanadium-stocks':
    'Track vanadium stocks and companies with exposure to this critical battery metal.',
  'titanium-stocks': 'Track titanium stocks and companies with exposure to this strategic metal.',
  'silicon-stocks': 'Track silicon stocks and companies with exposure to metallurgical silicon.',
  'beryllium-stocks':
    'Track beryllium stocks and companies with exposure to this rare strategic metal.',
  'niobium-stocks':
    'Track niobium stocks and companies with exposure to this critical specialty metal.',
  'critical-minerals-stocks':
    'Track critical minerals stocks including tin, graphite, manganese, and other battery and tech metals.',
  'critical-minerals-etfs':
    'Invest in critical minerals with ETFs covering battery metals, rare earths, and strategic materials.',
};

async function createStockPage(
  stock: {
    name: string;
    ticker: string;
    exchange: string;
    na_listed: boolean;
    description: string;
  },
  category: string
) {
  if (!stock.na_listed) return;

  const slug = `stock/${stock.ticker}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  Stock page /${slug} already exists`);
    return;
  }

  const title = `${stock.name} Stock Price`;
  const description = `Track ${stock.name} (${stock.ticker}) stock price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug,
    title,
    description,
    page_type: 'stock',
    symbol: stock.ticker,
    category,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${stock.ticker} Stock Price | ${stock.name} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`  Error creating ${slug}:`, error.message);
    return;
  }

  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) return;

  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: page.id, component_type: 'chart', config: {}, position: 1 },
    { page_id: page.id, component_type: 'performance', config: {}, position: 2 },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: { content: `<p>${stock.name} (${stock.ticker}) - ${stock.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`  Created: /${slug}`);
}

async function createEtfPage(
  etf: { ticker: string; name: string; na_listed: boolean; description: string },
  category: string
) {
  if (!etf.na_listed) return;

  const slug = `stock/${etf.ticker}`;

  const { data: existing } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (existing) {
    console.log(`  ETF page /${slug} already exists`);
    return;
  }

  const title = `${etf.name} ETF Price`;
  const description = `Track ${etf.name} (${etf.ticker}) ETF price, charts, and performance data.`;

  const { error } = await supabase.from('pages').insert({
    slug,
    title,
    description,
    page_type: 'etf',
    symbol: etf.ticker,
    category,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${etf.ticker} ETF Price | ${etf.name} | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (error) {
    console.error(`  Error creating ${slug}:`, error.message);
    return;
  }

  const { data: page } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!page) return;

  await supabase.from('page_components').insert([
    { page_id: page.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: page.id, component_type: 'chart', config: {}, position: 1 },
    { page_id: page.id, component_type: 'performance', config: {}, position: 2 },
    {
      page_id: page.id,
      component_type: 'text_block',
      config: { content: `<p>${etf.name} (${etf.ticker}) - ${etf.description}</p>` },
      position: 3,
    },
  ]);

  console.log(`  Created: /${slug}`);
}

async function createCategoryPage(pageData: (typeof pagesData)[0]) {
  const { slug } = pageData;

  if (EXISTING_SLUGS.includes(slug)) {
    console.log(`\n=== Skipping existing: /${slug} ===`);
    return;
  }

  console.log(`\n=== Creating /${slug} ===`);

  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .single();

  if (existingPage) {
    console.log(`  Category page /${slug} already exists`);
    return;
  }

  const description =
    metalDescriptions[slug] || `${pageData.title} - Track companies with live prices and charts.`;

  const { error: insertError } = await supabase.from('pages').insert({
    slug,
    title: pageData.title,
    description,
    page_type: pageData.page_type,
    category: slug,
    symbol: pageData.companies?.[0]?.ticker || pageData.etfs?.[0]?.ticker || null,
    is_active: true,
    is_locked: true,
    display_order: 0,
    robots: 'index,follow',
    meta_title: `${pageData.title} | Stock Prices & Charts | Gold Price Live`,
    meta_description: description,
    has_calculator: false,
    has_ads: true,
    has_articles: false,
  });

  if (insertError) {
    console.error(`  Error creating category:`, insertError.message);
    return;
  }

  console.log(`  Created category page: /${slug}`);

  const { data: newPage } = await supabase.from('pages').select('id').eq('slug', slug).single();

  if (!newPage) return;

  const components = [
    { page_id: newPage.id, component_type: 'hero', config: {}, position: 0 },
    { page_id: newPage.id, component_type: 'stock_table', config: {}, position: 1 },
    {
      page_id: newPage.id,
      component_type: 'text_block',
      config: { content: `<p class="mb-4">${description}</p>` },
      position: 2,
    },
  ];

  await supabase.from('page_components').insert(components);
  console.log(`  Added components`);

  if (pageData.companies) {
    console.log(`  Creating stock pages...`);
    for (const company of pageData.companies) {
      await createStockPage(company, slug);
    }
  }

  if (pageData.etfs) {
    console.log(`  Creating ETF pages...`);
    for (const etf of pageData.etfs) {
      await createEtfPage(etf, slug);
    }
  }
}

async function main() {
  console.log('=== Creating All Stock & ETF Category Pages ===\n');
  console.log(`Processing ${pagesData.length} category definitions\n`);

  for (const pageData of pagesData) {
    await createCategoryPage(pageData);
  }

  console.log('\n=== Migration Complete ===');
}

main();
