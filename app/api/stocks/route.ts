import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category) {
    return NextResponse.json({ success: false, error: 'Category is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('pages')
    .select('id, slug, title, symbol, category, description')
    .eq('category', category)
    .eq('page_type', 'stock')
    .eq('is_active', true)
    .order('title');

  if (error) {
    console.error('Error fetching stocks:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
