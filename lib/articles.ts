import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';

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
  const match = content.match(/^---(\r?\n[\s\S]*?)---(\r?\n[\s\S]*)$/);
  if (!match) {
    return { data: {}, content };
  }

  const frontmatterBlock = match[1];
  const articleContent = match[2];

  try {
    const data = yaml.load(frontmatterBlock) as Record<string, any>;
    return { data: data || {}, content: articleContent };
  } catch (err) {
    console.error('Error parsing frontmatter:', err);
    return { data: {}, content: articleContent };
  }
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
  return articles.find(a => a.slug === slug) || null;
}
