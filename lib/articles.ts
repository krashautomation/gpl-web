import fs from 'fs/promises';
import path from 'path';

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  featuredImage: string;
  readingTime: number;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  body: string;
}

function parseFrontmatter(content: string): { data: Record<string, any>; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const frontmatterBlock = match[1];
  const articleContent = match[2];

  const data: Record<string, any> = {};
  const lines = frontmatterBlock.split('\n');
  let currentKey = '';

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      const [, key, value] = keyMatch;
      if (value.startsWith('"') && value.endsWith('"')) {
        data[key] = value.slice(1, -1);
      } else if (value.startsWith('[') && value.endsWith(']')) {
        data[key] = value.slice(1, -1).split(',').map((s) => s.trim().replace(/^"|"$/g, ''));
      } else if (value === '') {
        currentKey = key;
      } else {
        data[key] = value;
      }
    } else if (currentKey && line.trim()) {
      data[currentKey] += '\n' + line;
    }
  }

  return { data, content: articleContent };
}

export async function getArticles(): Promise<Article[]> {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  
  try {
    const entries = await fs.readdir(articlesDir, { withFileTypes: true });
    const articles: Article[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexPath = path.join(articlesDir, entry.name, 'index.mdx');
        try {
          const content = await fs.readFile(indexPath, 'utf-8');
          const { data, content: articleContent } = parseFrontmatter(content);
          
          articles.push({
            slug: entry.name,
            title: data.title || entry.name,
            excerpt: data.excerpt || '',
            author: data.author || 'Unknown',
            date: data.date || new Date().toISOString(),
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            featuredImage: data.featuredImage || '',
            readingTime: data.readingTime || 5,
            seo: data.seo || { title: '', description: '', keywords: [] },
            body: articleContent,
          });
        } catch (err) {
          console.error(`Error reading article ${entry.name}:`, err);
        }
      }
    }

    return articles;
  } catch (err) {
    console.error('Error reading articles directory:', err);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.slug === slug) || null;
}
