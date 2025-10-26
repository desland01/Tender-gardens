import { defineCollection, reference, z } from "astro:content";

const services = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    blurb: z.string(),
    highlight: z.string().optional(),
    featuredImage: z.string().url().optional(),
    duration: z.string().optional(),
    order: z.number().default(0),
    serviceAreas: z.array(reference("locations")).optional(),
  }),
});

const locations = defineCollection({
  type: "content",
  schema: z.object({
    city: z.string(),
    slug: z.string().optional(),
    county: z.string().default("Orange County"),
    blurb: z.string(),
    heroImage: z.string().url().optional(),
    serviceHighlights: z.array(z.string()).default([]),
  }),
});

const reviews = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    rating: z.number().min(1).max(5),
    body: z.string(),
    service: reference("services").optional(),
    published: z.date(),
  }),
});

export const collections = { services, locations, reviews };
