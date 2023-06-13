import { z, defineCollection } from 'astro:content';

const catCareCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    publishedDate: z.date(),
    imageSrc: z.string(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = {
  'catcare': catCareCollection,
};
