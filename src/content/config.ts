import { z, defineCollection } from 'astro:content';

const catCareCollection = defineCollection({
  schema: z.object({
    title: z.string(),
//    tags: z.array(z.string()),
//    image: z.object({
//      src: z.string(),
//      alt: z.string().optional(),
//    }).optional(),
    publishedDate: z.date(),
  }),
});

export const collections = {
  'catcare': catCareCollection,
};
