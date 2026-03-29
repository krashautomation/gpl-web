import { NextResponse } from 'next/server';

const PROMPT = (rawArticle: string) => `
You are an expert SEO editor and CTR-focused headline copywriter.

Your goal is to maximize Google rankings AND click-through rate.

Reword the article, keeping all facts identical but improving clarity and structure.

Then output ONLY a valid JSON object with these exact fields:

{
  "title": "Best selected title",
  "title_options": ["Option 1", "Option 2", "Option 3"],
  "seo_title": "SEO optimized title variant",
  "slug": "article-title-lowercase-with-hyphens-YYYYMMDD",
  "excerpt": "2-3 sentence summary",
  "content": "Full reworded article in markdown",
  "seo_description": "SEO meta description under 160 characters",
  "seo_keywords": "keyword1, keyword2, keyword3, keyword4, keyword5",
  "tags": "tag1, tag2, tag3, tag4"
}

TITLE RULES:
- MUST include year 2026
- MUST include primary keyword (oil price, gold price, tungsten price, etc.)
- Use high-CTR words: Forecast, Outlook, Surge, Crash, Shock, Rally
- Include cause if possible (China, Iran, inflation, supply, demand)
- Keep under 70 characters

TITLE STRATEGY:
- Option 1: "Price Forecast" style
- Option 2: "Breaking / Surge / Crash" style
- Option 3: "Outlook / Analysis" style

Example:
- "Oil Price Forecast 2026: $200 Risk Amid Iran Conflict"
- "Oil Prices Surge 2026: Middle East Conflict Disrupts Supply"
- "Oil Market Outlook 2026: الحرب يدفع الأسعار للارتفاع"

SEO TITLE:
- Slightly more keyword-rich version of the best title

SEO DESCRIPTION:
- Include keywords + outcome + curiosity
- Make it compelling to click

TAGS:
- Auto-generate 4–6 relevant tags from the article
- Include commodity, region, and theme (e.g., oil, Iran, energy crisis)

For the slug, use today's date: ${new Date().toISOString().slice(0, 10).replace(/-/g, '')}.

Article:
${rawArticle}
`;

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
    max_tokens: 6000,
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
