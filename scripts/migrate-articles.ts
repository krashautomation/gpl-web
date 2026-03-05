import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey);

interface ArticleData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  featured_image: string;
  reading_time: number;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  og_image: string;
  draft: boolean;
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

async function migrateArticles() {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');

  console.log('Reading articles from:', articlesDir);

  try {
    const entries = await fs.readdir(articlesDir, { withFileTypes: true });
    const articles: ArticleData[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const indexPath = path.join(articlesDir, entry.name, 'index.mdx');
        try {
          const content = await fs.readFile(indexPath, 'utf-8');
          const { data, content: articleContent } = parseFrontmatter(content);

          const article: ArticleData = {
            slug: entry.name,
            title: data.title || entry.name,
            excerpt: data.excerpt || '',
            content: articleContent,
            author: data.author || 'Unknown',
            published_at: data.date || new Date().toISOString(),
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            featured_image: data.featuredImage || '',
            reading_time: data.readingTime || 5,
            seo_title: data.seo?.title || '',
            seo_description: data.seo?.description || '',
            seo_keywords: data.seo?.keywords || [],
            og_image: data.seo?.ogImage || '',
            draft: false,
          };

          articles.push(article);
          console.log(`  - Parsed: ${article.title}`);
        } catch (err) {
          console.error(`Error reading article ${entry.name}:`, err);
        }
      }
    }

    console.log(`\nFound ${articles.length} articles. Inserting into Supabase...`);

    for (const article of articles) {
      const { error } = await supabase.from('articles').upsert(article, {
        onConflict: 'slug',
      });

      if (error) {
        console.error(`Error inserting "${article.title}":`, error.message);
      } else {
        console.log(`  - Inserted: ${article.title}`);
      }
    }

    console.log('\nMigration complete!');
  } catch (err) {
    console.error('Error reading articles directory:', err);
    process.exit(1);
  }
}

migrateArticles();
