import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageBySlug } from '@/lib/pages';
import { DynamicPageClient } from '@/app/[slug]/DynamicPageClient';

interface Props {
  params: Promise<{ symbol: string }>;
}

const STOCK_CATEGORIES: Record<string, { name: string; href: string }> = {
  // Gold ETFs
  GLD: { name: 'Gold ETFs', href: '/gold-etfs' },
  IAU: { name: 'Gold ETFs', href: '/gold-etfs' },
  GLDM: { name: 'Gold ETFs', href: '/gold-etfs' },
  SGOL: { name: 'Gold ETFs', href: '/gold-etfs' },

  // Silver ETFs
  SLV: { name: 'Silver ETFs', href: '/silver-etfs' },
  SIVR: { name: 'Silver ETFs', href: '/silver-etfs' },
  SIL: { name: 'Silver ETFs', href: '/silver-etfs' },
  SILJ: { name: 'Silver ETFs', href: '/silver-etfs' },

  // Tungsten Stocks
  ALM: { name: 'Tungsten Stocks', href: '/tungsten-stocks' },
  'AII.TO': { name: 'Tungsten Stocks', href: '/tungsten-stocks' },

  // Gold Mining Stocks (US + Canada)
  NEM: { name: 'Gold Stocks', href: '/gold-stocks' },
  GOLD: { name: 'Gold Stocks', href: '/gold-stocks' },
  KGC: { name: 'Gold Stocks', href: '/gold-stocks' },
  AEM: { name: 'Gold Stocks', href: '/gold-stocks' },
  AU: { name: 'Gold Stocks', href: '/gold-stocks' },
  WPM: { name: 'Gold Stocks', href: '/gold-stocks' },
  KLR: { name: 'Gold Stocks', href: '/gold-stocks' },
  EGO: { name: 'Gold Stocks', href: '/gold-stocks' },
  MUX: { name: 'Gold Stocks', href: '/gold-stocks' },
  HL: { name: 'Gold Stocks', href: '/gold-stocks' },
  GFI: { name: 'Gold Stocks', href: '/gold-stocks' },
  // Canadian variants
  'NEM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'GOLD.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'KGC.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'AEM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'AU.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'WPM.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'K.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'ABX.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  'FNV.TO': { name: 'Gold Stocks', href: '/gold-stocks' },
  // Silver Mining Stocks (US + Canada)
  PAAS: { name: 'Silver Stocks', href: '/silver-stocks' },
  AG: { name: 'Silver Stocks', href: '/silver-stocks' },
  FN: { name: 'Silver Stocks', href: '/silver-stocks' },
  CDE: { name: 'Silver Stocks', href: '/silver-stocks' },
  EXK: { name: 'Silver Stocks', href: '/silver-stocks' },
  AUU: { name: 'Silver Stocks', href: '/silver-stocks' },
  SVM: { name: 'Silver Stocks', href: '/silver-stocks' },
  SAND: { name: 'Silver Stocks', href: '/silver-stocks' },
  MAG: { name: 'Silver Stocks', href: '/silver-stocks' },
  BVN: { name: 'Silver Stocks', href: '/silver-stocks' },
  // Canadian variants
  'PAAS.TO': { name: 'Silver Stocks', href: '/silver-stocks' },
  'OR.TO': { name: 'Silver Stocks', href: '/silver-stocks' },
  // Oil & Energy Stocks (US)
  XOM: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  CVX: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  COP: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  EOG: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  SLB: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  MPC: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  VLO: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  PSX: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  OXY: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  HAL: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  WMB: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  KMI: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  BKR: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  DVN: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },
  PXD: { name: 'Oil & Energy Stocks', href: '/oil-energy-stocks' },

  // Copper Stocks
  FCX: { name: 'Copper Stocks', href: '/copper-stocks' },
  SCCO: { name: 'Copper Stocks', href: '/copper-stocks' },
  TECK: { name: 'Copper Stocks', href: '/copper-stocks' },
  HBM: { name: 'Copper Stocks', href: '/copper-stocks' },

  // Copper ETFs
  COPX: { name: 'Copper ETFs', href: '/copper-etfs' },
  CPER: { name: 'Copper ETFs', href: '/copper-etfs' },
  ICOP: { name: 'Copper ETFs', href: '/copper-etfs' },
  COPP: { name: 'Copper ETFs', href: '/copper-etfs' },

  // Platinum ETFs
  PPLT: { name: 'Platinum ETFs', href: '/platinum-etfs' },
  PLTM: { name: 'Platinum ETFs', href: '/platinum-etfs' },

  // Palladium ETFs
  PALL: { name: 'Palladium ETFs', href: '/palladium-etfs' },

  // Precious Metals ETFs
  GLTR: { name: 'Precious Metals ETFs', href: '/precious-metals-etfs' },
  GOGO: { name: 'Precious Metals ETFs', href: '/precious-metals-etfs' },

  // Nickel Stocks
  VALE: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  CNC: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  NIC: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  TN: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  NICU: { name: 'Nickel Stocks', href: '/nickel-stocks' },
  FPX: { name: 'Nickel Stocks', href: '/nickel-stocks' },

  // Nickel ETFs
  NKEL: { name: 'Nickel ETFs', href: '/nickel-etfs' },

  // Zinc Stocks
  Z: { name: 'Zinc Stocks', href: '/zinc-stocks' },
  NILI: { name: 'Zinc Stocks', href: '/zinc-stocks' },

  // Aluminum Stocks
  AA: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },
  CENX: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },
  KALU: { name: 'Aluminum Stocks', href: '/aluminum-stocks' },

  // Iron & Steel Stocks
  NUE: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  STLD: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  X: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  CIA: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  LIF: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },
  CLF: { name: 'Iron & Steel Stocks', href: '/iron-steel-stocks' },

  // Steel ETFs
  SLX: { name: 'Steel ETFs', href: '/steel-etfs' },

  // Lithium Stocks
  ALB: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  ALTM: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  PLL: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  LAC: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  LAAC: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  SGML: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  SLI: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  PMET: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  FL: { name: 'Lithium Stocks', href: '/lithium-stocks' },
  WR1: { name: 'Lithium Stocks', href: '/lithium-stocks' },

  // Lithium ETFs
  LIT: { name: 'Lithium ETFs', href: '/lithium-etfs' },
  LITP: { name: 'Lithium ETFs', href: '/lithium-etfs' },

  // Uranium Stocks
  CCJ: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  NXE: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  DNN: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  UUUU: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  EU: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  UEC: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  FCU: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  PDN: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  SYH: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  ISO: { name: 'Uranium Stocks', href: '/uranium-stocks' },
  CUR: { name: 'Uranium Stocks', href: '/uranium-stocks' },

  // Uranium ETFs
  URNM: { name: 'Uranium ETFs', href: '/uranium-etfs' },
  URA: { name: 'Uranium ETFs', href: '/uranium-etfs' },
  URNJ: { name: 'Uranium ETFs', href: '/uranium-etfs' },
  'U.UN': { name: 'Uranium ETFs', href: '/uranium-etfs' },

  // Rare Earth Stocks
  MP: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  VML: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  API: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  DEFN: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  MKA: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  SMY: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  TMET: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  SCY: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },
  NB: { name: 'Rare Earth Stocks', href: '/rare-earth-stocks' },

  // Rare Earth ETFs
  REMX: { name: 'Rare Earth ETFs', href: '/rare-earth-etfs' },

  // Antimony Stocks
  UAMY: { name: 'Antimony Stocks', href: '/antimony-stocks' },
  PPTA: { name: 'Antimony Stocks', href: '/antimony-stocks' },

  // Cobalt Stocks
  ELBM: { name: 'Cobalt Stocks', href: '/cobalt-stocks' },

  // Vanadium Stocks
  LGO: { name: 'Vanadium Stocks', href: '/vanadium-stocks' },

  // Titanium Stocks
  TROX: { name: 'Titanium Stocks', href: '/titanium-stocks' },

  // Silicon Stocks
  GSM: { name: 'Silicon Stocks', href: '/silicon-stocks' },

  // Beryllium Stocks
  MTRN: { name: 'Beryllium Stocks', href: '/beryllium-stocks' },

  // Critical Minerals Stocks
  AFM: { name: 'Critical Minerals Stocks', href: '/critical-minerals-stocks' },
  NMG: { name: 'Critical Minerals Stocks', href: '/critical-minerals-stocks' },
  WWR: { name: 'Critical Minerals Stocks', href: '/critical-minerals-stocks' },
  FSLR: { name: 'Critical Minerals Stocks', href: '/critical-minerals-stocks' },
  GMO: { name: 'Critical Minerals Stocks', href: '/critical-minerals-stocks' },

  // Critical Minerals ETFs
  SETM: { name: 'Critical Minerals ETFs', href: '/critical-minerals-etfs' },
  PICK: { name: 'Critical Minerals ETFs', href: '/critical-minerals-etfs' },
  XME: { name: 'Critical Minerals ETFs', href: '/critical-minerals-etfs' },
  DBB: { name: 'Critical Minerals ETFs', href: '/critical-minerals-etfs' },
  METL: { name: 'Critical Minerals ETFs', href: '/critical-minerals-etfs' },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  const slug = `stock/${symbol}`;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.meta_title || page.title,
    description: page.meta_description || page.description || undefined,
    keywords: page.meta_keywords || undefined,
    robots: page.robots,
    openGraph: page.og_image
      ? {
          title: page.meta_title || page.title,
          description: page.meta_description || page.description || undefined,
          images: [{ url: page.og_image }],
        }
      : undefined,
    twitter: page.twitter_card
      ? {
          card: page.twitter_card as 'summary' | 'summary_large_image' | 'player' | 'app',
          title: page.meta_title || page.title,
          description: page.meta_description || page.description || undefined,
          images: page.og_image ? [page.og_image] : undefined,
        }
      : undefined,
  };
}

export default async function StockPage({ params }: Props) {
  const { symbol } = await params;
  const slug = `stock/${symbol}`;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const category = STOCK_CATEGORIES[symbol];
  const breadcrumbs = category
    ? [{ label: category.name, href: category.href }, { label: page.title }]
    : [{ label: 'Gold Stocks', href: '/gold-stocks' }, { label: page.title }];

  return <DynamicPageClient page={page} breadcrumbs={breadcrumbs} />;
}
