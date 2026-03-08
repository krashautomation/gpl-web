'use client';

interface StructuredDataScriptProps {
  jsonLd: string;
  id?: string;
}

export function StructuredDataScript({ jsonLd, id }: StructuredDataScriptProps) {
  return <script type="application/ld+json" id={id} dangerouslySetInnerHTML={{ __html: jsonLd }} />;
}

export function BreadcrumbStructuredData({
  items,
  id = 'breadcrumb-schema',
}: {
  items: Array<{ name: string; url: string }>;
  id?: string;
}) {
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
  return <StructuredDataScript jsonLd={JSON.stringify(schema)} id={id} />;
}

export function ArticleStructuredData({
  headline,
  image,
  datePublished,
  dateModified,
  author,
  description,
  id = 'article-schema',
}: {
  headline: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: Array<{ name: string }>;
  description?: string;
  id?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    image,
    datePublished,
    dateModified,
    author: author.map(a => ({
      '@type': 'Person',
      name: a.name,
    })),
    description,
  };
  return <StructuredDataScript jsonLd={JSON.stringify(schema)} id={id} />;
}

export function FAQStructuredData({
  faqs,
  id = 'faq-schema',
}: {
  faqs: Array<{ question: string; answer: string }>;
  id?: string;
}) {
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
  return <StructuredDataScript jsonLd={JSON.stringify(schema)} id={id} />;
}

export function OrganizationStructuredData({
  name,
  url,
  logo,
  sameAs,
  id = 'organization-schema',
}: {
  name: string;
  url: string;
  logo: string;
  sameAs?: string[];
  id?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
  };
  if (sameAs && sameAs.length > 0) {
    schema.sameAs = sameAs;
  }
  return <StructuredDataScript jsonLd={JSON.stringify(schema)} id={id} />;
}

export function WebSiteStructuredData({
  name,
  url,
  searchUrl,
  id = 'website-schema',
}: {
  name: string;
  url: string;
  searchUrl?: string;
  id?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url,
  };
  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    };
  }
  return <StructuredDataScript jsonLd={JSON.stringify(schema)} id={id} />;
}
