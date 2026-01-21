import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    noticias: defineCollection({
      type: 'page',
      // Only files under content/noticias will be part of this collection
      source: 'noticias/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        cover: z.string().url().optional(),
        author: z.string().optional(),
        date: z.coerce.date(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
});
