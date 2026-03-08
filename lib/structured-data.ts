export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface ArticleAuthor {
  name: string;
}

export interface ArticleSchema {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: ArticleAuthor[];
  description?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
}

export interface WebSiteSchema {
  name: string;
  url: string;
  searchUrl?: string;
}

function stringify(obj: unknown): string {
  return JSON.stringify(obj, null, 2);
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return stringify(schema);
}

export function generateArticleSchema(article: ArticleSchema): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: article.author.map(a => ({
      '@type': 'Person',
      name: a.name,
    })),
    description: article.description,
  };
  return stringify(schema);
}

export function generateFAQSchema(faqs: FAQItem[]): string {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return stringify(schema);
}

export function generateOrganizationSchema(org: OrganizationSchema): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: org.name,
    url: org.url,
    logo: org.logo,
  };
  if (org.sameAs && org.sameAs.length > 0) {
    schema.sameAs = org.sameAs;
  }
  return stringify(schema);
}

export function generateWebSiteSchema(site: WebSiteSchema): string {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  };
  if (site.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }
  return stringify(schema);
}
