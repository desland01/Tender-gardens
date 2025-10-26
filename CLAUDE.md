# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Local business website for Tender Gardens, an Orlando-based landscape and garden care service. Built with Astro 5 + Tailwind v4, focusing on server-first rendering with minimal JavaScript.

## Development Commands

```bash
# Development
npm run dev              # Start dev server at http://localhost:4321
npm run build            # Production build (includes sitemap generation)
npm run preview          # Serve production build locally
npm run typecheck        # Run TypeScript type checking
npm run upgrade:tailwind # Tailwind v4 upgrade assistant
```

## Architecture

### Framework Stack
- **Astro 5**: Server-first, islands architecture with zero-JS by default
- **Tailwind v4**: Uses Vite plugin (`@tailwindcss/vite`), NOT `@astrojs/tailwind`
- **Content Layer**: Type-safe content management via `src/content.config.ts`
- **Node**: Requires v20.3+ (v22 recommended)

### Content Collections

Three main collections defined in `src/content.config.ts`:

1. **services** (`src/content/services/*.md`)
   - Schema: title, slug, blurb, highlight, featuredImage, duration, order, serviceAreas (references locations)
   - Used for: service offerings with cross-references to locations

2. **locations** (`src/content/locations/*.md`)
   - Schema: city, slug, county, blurb, heroImage, serviceHighlights
   - Used for: service area pages with city-specific content

3. **reviews** (`src/content/reviews/*.md`)
   - Schema: name, rating (1-5), body, service (reference), published (date)
   - Used for: customer testimonials linked to services

Collections use Astro's Content Layer with Zod schemas for type safety. Use `getCollection()` to query and `reference()` for cross-collection relationships.

### Routing & Pages

- **Static routes**: `/` (home), `/services`, `/gallery`, `/reviews`, `/contact`
- **Dynamic routes**: `/services/[slug]`, `/service-areas/[slug]`
- All pages use `MainLayout.astro` which includes SEO meta tags, structured data support, Google Analytics/GTM (optional via env vars), and accessibility features

### Styling System

Global styles in `src/styles/global.css`:
- Tailwind v4 import + theme tokens in `@theme {}`
- Custom CSS properties: `--color-brand` (#0ea5e9), `--color-ink` (#111), `--color-paper` (#fefbf1)
- Font: Space Grotesk (loaded from Google Fonts)

Design system uses bold borders (`border-[3px] border-black`), box shadows (`shadow-[8px_8px_0_#111]`), and vibrant accent colors (yellow #ffdc58, blue #0ea5e9).

### Component Architecture

Components in `src/components/`:
- **SiteHeader.astro**: Navigation with active path highlighting
- **SiteFooter.astro**: Footer with business info
- **HeroSection.astro**: Homepage hero with CTA buttons
- **ServicesShowcase.astro**: Grid display of service cards
- **ServiceAreasGrid.astro**: Grid of location cards
- **ReviewsSpotlight.astro**: Customer reviews carousel/grid
- **GalleryPreview.astro**: Photo gallery preview
- **TrustIndicators.astro**: Stats/metrics display
- **CallToActionBanner.astro**: Conversion-focused banner section

All components are server-rendered with no client-side hydration by default.

## Critical Rules from .cursorrules

1. **NEVER add `@astrojs/tailwind`** - Only use `@tailwindcss/vite` (already configured in `astro.config.mjs`)
2. **Mandatory pre-reads**: Before ANY code changes, read `/Users/thebeast/Downloads/llms-full.txt` AND `/Users/thebeast/Downloads/astro-agent-primer.txt`
3. **Server-first**: Prefer zero/low JS, avoid adding client-side frameworks unless explicitly required
4. **Content Layer**: Use Astro's Content Layer API (`getCollection`) for all content operations
5. **Follow reference docs**: Check `docs/ASTRO-5.md` and `docs/TAILWIND-4.md` for framework-specific guidance
6. **Before merge**: Always run `npm run build && npm run preview` to verify production builds

## SEO & Analytics

- Sitemap generated via `@astrojs/sitemap` integration (configured in `astro.config.mjs`)
- Set `site` in `astro.config.mjs` to your production domain
- Optional analytics: Set `PUBLIC_GA_ID` or `PUBLIC_GTM_ID` environment variables to enable tracking
- Structured data (JSON-LD) passed via `structuredData` prop to MainLayout
- robots.txt should be placed in `public/`

## Deployment Checklist

Follow `CHECKLISTS/` in order:
1. `00_project_bootstrap.md` - Initial setup
2. `01_theme_integration.md` - Design system
3. `02_content_model.md` - Content structure
4. `03_pages_routes.md` - Page creation
5. `04_seo_tracking.md` - SEO optimization
6. `05_accessibility_performance.md` - A11y & perf
7. `06_deploy_ci.md` - Deployment setup

## Common Patterns

### Fetching and displaying content:
```astro
---
import { getCollection } from "astro:content";
const services = await getCollection("services");
const sortedServices = services.sort((a, b) => a.data.order - b.data.order);
---
```

### Dynamic routes with static path generation:
```astro
---
export async function getStaticPaths() {
  const items = await getCollection("services");
  return items.map(item => ({
    params: { slug: item.slug },
    props: { item }
  }));
}
---
```

### Rendering markdown content:
```astro
---
const { Content } = await entry.render();
---
<Content />
```

## Troubleshooting

- **Tailwind not working**: Verify `@tailwindcss/vite` is in `astro.config.mjs` vite.plugins, and global.css has `@import "tailwindcss";`
- **Content not updating**: Restart dev server after changing content collection schemas
- **Type errors**: Run `npm run typecheck` to identify issues; ensure Node v20.3+
- **Build failures**: Check for missing required schema fields in content files
