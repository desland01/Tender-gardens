# SEO & Tracking Checklist

**Reference**: See `docs/LOCAL-SEO.md` for comprehensive local SEO strategy and content guidelines.

## Technical SEO Basics
- [ ] Unique titles/meta descriptions on every page (55-60 chars for title, 150-160 chars for description)
- [ ] OG/Twitter social meta tags
- [ ] Canonical tags (self-referencing unless specific cross-page canonical needed)
- [ ] One H1 per page matching page intent
- [ ] sitemap.xml via @astrojs/sitemap (includes services, scenarios, locations, blog posts)
- [ ] robots.txt with sitemap reference
- [ ] No broken internal links
- [ ] No redirect chains

## Structured Data (JSON-LD)
- [ ] LocalBusiness schema on all pages (global, in MainLayout)
- [ ] Service schema on service/scenario pages
- [ ] BreadcrumbList schema on all routed pages
- [ ] FAQPage schema where FAQs exist
- [ ] All schema validates at validator.schema.org

## Images & Performance
- [ ] All images optimized (<300KB, WebP/AVIF preferred)
- [ ] Images have width/height attributes
- [ ] Images have descriptive alt text
- [ ] Images lazy-loaded (except above-fold hero)
- [ ] Core Web Vitals green (LCP <2.5s, FID <100ms, CLS <0.1)

## Content & Internal Linking
- [ ] Internal linking loop: Home → Services → Scenarios/Posts → Services
- [ ] Footer NAP (Name, Address, Phone) present and consistent
- [ ] All blog posts link to ≥1 related service
- [ ] Scenario pages link back to parent service page
- [ ] Natural, descriptive anchor text (avoid repetitive exact-match)

## Analytics & Tracking
- [ ] Analytics placeholders only (disabled by default)
- [ ] Set PUBLIC_GA_ID or PUBLIC_GTM_ID env vars to enable tracking when ready

## Local SEO Specific (see docs/LOCAL-SEO.md for details)
- [ ] Google Business Profile complete (categories, hours, photos, services)
- [ ] GBP has 10+ recent reviews
- [ ] NAP consistency across site, GBP, and citations
- [ ] Location mentioned in title/H1/body where relevant
- [ ] Real photos only (no stock images)
- [ ] Hyperlocal content (neighborhood-native blog posts)

---

**For full local SEO strategy, content guidelines, and acceptance criteria, see `docs/LOCAL-SEO.md`.**
