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

async function addAiTokensColumn() {
  console.log('Adding ai_tokens_used column to articles table...\n');

  const { error } = await supabase.rpc('add_ai_tokens_column', {});

  if (error) {
    console.log('Trying alternative method via SQL...');

    const { error: alterError } = await supabase.from('articles').insert({
      id: '00000000-0000-0000-0000-000000000000',
      slug: 'temp-migration-slug',
      title: 'Temp Migration',
      excerpt: 'Temp',
      content: 'Temp',
      ai_tokens_used: 0,
    });

    if (alterError && !alterError.message.includes('duplicate')) {
      console.log('Column may already exist or there was an issue.');
      console.log('Error:', alterError.message);
    } else {
      console.log('Cleanup temp row...');
      await supabase.from('articles').delete().eq('slug', 'temp-migration-slug');
    }
  }

  const { data, error: checkError } = await supabase
    .from('information_schema.columns')
    .select('column_name')
    .eq('table_name', 'articles')
    .eq('column_name', 'ai_tokens_used');

  if (checkError) {
    console.error('Error checking column:', checkError);
    process.exit(1);
  }

  if (data && data.length > 0) {
    console.log('✅ ai_tokens_used column already exists or was added successfully.');
  } else {
    console.log('⚠️  Column not found. Run this SQL in Supabase SQL Editor:');
    console.log(`
ALTER TABLE articles ADD COLUMN IF NOT EXISTS ai_tokens_used integer DEFAULT 0;
    `);
  }
}

addAiTokensColumn();
