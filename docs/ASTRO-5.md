Astro 5 Quick Notes (for agents)
- Server-first, islands architecture. New Content Layer unifies local/remote sources.
- Recommended Node: 22 (works with Astro 5.8+); minimum 20.3+. Avoid older Node.
- Content Layer:
  - Define collections in src/content.config.ts using zod.
  - Load local MD/MDX or remote feeds at build, cached and type-safe.
- Zero-JS by default. Only hydrate components when necessary.
- Use @astrojs/sitemap for sitemap.xml; keep routes clean and canonical.

Snippet (content.config.ts)
import { defineCollection, z } from "astro:content";
export const collections = {
  services: defineCollection({ type: "content", schema: z.object({
    title: z.string(), slug: z.string(), blurb: z.string().optional()
  })}),
  locations: defineCollection({ type: "content", schema: z.object({
    city: z.string(), slug: z.string(), state: z.string().default("FL")
  })}),
  reviews: defineCollection({ type: "content", schema: z.object({
    name: z.string(), rating: z.number().min(1).max(5), body: z.string()
  })})
};
