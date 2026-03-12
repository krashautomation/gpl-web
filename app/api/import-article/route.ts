import { NextResponse } from 'next/server';

const PROMPT = (
  rawArticle: string
) => `You are an article editor. Reword the following article, keeping all facts identical but using different phrasing and sentence structure. Then output ONLY a valid JSON object (no markdown, no backticks, no preamble) with these exact fields:

{
  "title": "Article title",
  "slug": "article-title-lowercase-with-hyphens-YYYYMMDD",
  "excerpt": "2-3 sentence summary of the article",
  "content": "Full reworded article in markdown format with ## for main subtitle and ### for paragraph headings",
  "seo_description": "SEO meta description under 160 characters",
  "seo_keywords": "keyword1, keyword2, keyword3, keyword4, keyword5"
}

For the slug, use today's date: ${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.

Article to reword:
${rawArticle}`;

async function runWithAnthropic(rawArticle: string): Promise<{ content: string; tokens: number }> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8000,
    messages: [{ role: 'user', content: PROMPT(rawArticle) }],
  });

  const content = message.content
    .filter(block => block.type === 'text')
    .map(block => (block as { type: 'text'; text: string }).text)
    .join('');

  const usage = message.usage;
  const tokens = (usage.input_tokens || 0) + (usage.output_tokens || 0);

  return { content, tokens };
}

async function runWithOpenAI(rawArticle: string): Promise<{ content: string; tokens: number }> {
  const OpenAI = (await import('openai')).default;
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 8000,
    messages: [{ role: 'user', content: PROMPT(rawArticle) }],
  });

  const content = response.choices[0]?.message?.content ?? '';
  const usage = response.usage;
  const tokens = (usage?.prompt_tokens || 0) + (usage?.completion_tokens || 0);

  return { content, tokens };
}

export async function POST(request: Request) {
  try {
    const { rawArticle } = await request.json();

    if (!rawArticle || typeof rawArticle !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No article text provided' },
        { status: 400 }
      );
    }

    const hasAnthropic = !!process.env.ANTHROPIC_API_KEY;
    const hasOpenAI = !!process.env.OPENAI_API_KEY;

    if (!hasAnthropic && !hasOpenAI) {
      return NextResponse.json(
        {
          success: false,
          error:
            'No AI API key configured. Add ANTHROPIC_API_KEY or OPENAI_API_KEY to your .env.local',
        },
        { status: 500 }
      );
    }

    // Prefer Anthropic if both are set
    const result = hasAnthropic
      ? await runWithAnthropic(rawArticle)
      : await runWithOpenAI(rawArticle);

    const clean = result.content.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(clean);

    return NextResponse.json({ success: true, article: parsed, tokens: result.tokens });
  } catch (error) {
    console.error('Import article error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process article' },
      { status: 500 }
    );
  }
}
