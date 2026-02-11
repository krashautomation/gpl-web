import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { 
      type: 'string', 
      required: true 
    },
    excerpt: { 
      type: 'string', 
      required: true 
    },
    author: { 
      type: 'string', 
      required: true 
    },
    date: { 
      type: 'date', 
      required: true 
    },
    category: { 
      type: 'string', 
      required: true 
    },
    tags: { 
      type: 'list', 
      of: { type: 'string' } 
    },
    featuredImage: { 
      type: 'string' 
    },
    readingTime: { 
      type: 'number' 
    },
    seo: {
      type: 'json',
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/news/${doc._raw.flattenedPath}`,
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => {
        if (doc.readingTime) return doc.readingTime
        // Estimate: average reading speed 200 words per minute
        const words = doc.body.raw.split(/\s+/).length
        return Math.ceil(words / 200)
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/articles',
  documentTypes: [Article],
  disableImportAliasWarning: true,
})
