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

// Map of stock symbol to category
const stockCategories: Record<string, string> = {
  // Gold Stocks
  NEM: 'gold-stocks',
  GOLD: 'gold-stocks',
  KGC: 'gold-stocks',
  AEM: 'gold-stocks',
  AU: 'gold-stocks',
  WPM: 'gold-stocks',
  KLR: 'gold-stocks',
  EGO: 'gold-stocks',
  MUX: 'gold-stocks',
  HL: 'gold-stocks',
  GFI: 'gold-stocks',
  // Canadian variants
  'NEM.TO': 'gold-stocks',
  'GOLD.TO': 'gold-stocks',
  'KGC.TO': 'gold-stocks',
  'AEM.TO': 'gold-stocks',
  'AU.TO': 'gold-stocks',
  'WPM.TO': 'gold-stocks',
  'K.TO': 'gold-stocks',
  'ABX.TO': 'gold-stocks',
  'FNV.TO': 'gold-stocks',
  // Silver Stocks
  PAAS: 'silver-stocks',
  AG: 'silver-stocks',
  FN: 'silver-stocks',
  CDE: 'silver-stocks',
  EXK: 'silver-stocks',
  AUU: 'silver-stocks',
  SVM: 'silver-stocks',
  SAND: 'silver-stocks',
  MAG: 'silver-stocks',
  BVN: 'silver-stocks',
  // Canadian variants
  'PAAS.TO': 'silver-stocks',
  'OR.TO': 'silver-stocks',
  // Oil & Energy Stocks
  XOM: 'oil-energy-stocks',
  CVX: 'oil-energy-stocks',
  COP: 'oil-energy-stocks',
  EOG: 'oil-energy-stocks',
  SLB: 'oil-energy-stocks',
  MPC: 'oil-energy-stocks',
  VLO: 'oil-energy-stocks',
  PSX: 'oil-energy-stocks',
  OXY: 'oil-energy-stocks',
  HAL: 'oil-energy-stocks',
  WMB: 'oil-energy-stocks',
  KMI: 'oil-energy-stocks',
  BKR: 'oil-energy-stocks',
  DVN: 'oil-energy-stocks',
  PXD: 'oil-energy-stocks',
};

async function setStockCategories() {
  console.log('Setting stock categories...\n');

  let updatedCount = 0;

  for (const [symbol, category] of Object.entries(stockCategories)) {
    const slug = `stock/${symbol}`;

    const { error } = await supabase.from('pages').update({ category }).eq('slug', slug);

    if (error) {
      console.error(`Error updating ${slug}:`, error.message);
    } else {
      updatedCount++;
    }
  }

  console.log(`Total updated: ${updatedCount}`);
}

setStockCategories().catch(console.error);
