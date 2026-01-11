import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),  // Cambia a optional temporalmente
    author: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),  // Añade este campo
    tags: z.array(z.string()).optional(),
    image: z.object({
      url: z.string().optional(),
      alt: z.string().optional()
    }).optional(),
    draft: z.boolean().optional()  // Si usas draft en Blog.astro
  }),
});

export const collections = {
  'posts': postsCollection,
};