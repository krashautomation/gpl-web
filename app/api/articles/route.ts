import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/articles';

export async function GET() {
  try {
    const articles = await getArticles();
    return NextResponse.json({ success: true, articles });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch articles' },
      { status: 500 }
    );
  }
}
