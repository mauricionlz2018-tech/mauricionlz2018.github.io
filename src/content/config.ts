import { defineCollection, z } from 'astro:content'

const postsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		author: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(), // Convierte strings a Date automáticamente
		tags: z.array(z.string()).optional(),
		image: z.object({
			url: z.string(),
			alt: z.string()
		}).optional(),
		draft: z.boolean().default(false)
	})
})

export const collections = {
	posts: postsCollection
}