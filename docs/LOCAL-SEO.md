# LOCAL-SEO.md

**Mandatory reading for all AI agents working on site copy and content.**

## Purpose

Practical, low-key standards your writing/code agents consult before drafting any on-site content. Built from proven local SEO practices and adapted for Astro. Focus on accuracy, clarity, and trust, not hype.

## Related Documentation
- Framework: `docs/ASTRO-5.md`
- Styling: `docs/TAILWIND-4.md`
- Content Collections: See `CLAUDE.md` § Content Collections
- SEO Checklist: `CHECKLISTS/04_seo_tracking.md`

---

## 0) How Agents Must Use This Guide

### Blocking Prerequisites
* Treat this as a **blocking prerequisite**: no copy, pages, or templates are produced unless they align with this guide.
* Cite the section(s) used in your draft PR/response (e.g., "Aligned with §2 Scenario Pages and §4 Internal Linking").
* **Scope constraint:** This guide is **broad guidance** only. Do **not** create or imply offers, discounts, deadlines, or sales promotions. Avoid urgency language. Keep claims modest and verifiable.
* Refuse work if the request would violate the rules (e.g., stock photos, city-stuffing slugs, generic blog topics, promotional offers not approved).

### Agent Responsibilities
* **Before drafting any content:** Read this entire guide
* **During content creation:** Reference relevant sections
* **Before submitting work:** Self-audit against acceptance criteria (§10)
* **In PR descriptions:** Cite which sections you followed

---

## 1) Strategy at a Glance

### Foundation First
1. **Tidy the Google Business Profile (GBP) first.** Use real photos, complete categories/services/hours, post occasional updates, and invite recent customers for a few honest reviews (aim for 10+, pace naturally).

### Content Pillars
2. **Create high-intent scenario pages** (e.g., "same-day X", "affordable Y", "top-rated Z") that answer ready-to-hire searches with concise, specific info and a clear way to contact you.
3. **Write neighborhood-native posts** (what's actually happening in your service area) and link them back to relevant services.

### Technical Excellence
4. **Keep internal links deliberate:** Home → Services → Scenarios/Posts → Services. Put NAP (Name, Address, Phone) in the footer and link a small set of helpful resources.
5. **Mind the technical basics:** unique titles/descriptions/H1s, correct canonicals, minimal redirects, sitemap/robots, fast real images.
6. **Add lightweight JSON-LD:** LocalBusiness, Service, Breadcrumb, and FAQ when useful.

---

## 2) Information Architecture (Astro-Friendly)

### Content Collections (in `src/content.config.ts`)

#### Existing Collections
* **services**: `title`, `slug`, `blurb`, `highlight`, `featuredImage`, `duration`, `order`, `serviceAreas` (references locations)
* **locations**: `city`, `slug`, `county`, `blurb`, `heroImage`, `serviceHighlights`
* **reviews**: `name`, `rating` (1-5), `body`, `service` (reference), `published` (date)

#### Recommended New Collections

**scenarios** (for high-intent landing pages):
```typescript
scenarios: defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/scenarios' }),
  schema: z.object({
    title: z.string(),
    headline: z.string(),
    modifier: z.enum(['same-day', 'affordable', 'top-rated', 'emergency', 'seasonal']),
    service: reference('services'),
    location: reference('locations').optional(),
    usp: z.array(z.string()),
    process: z.array(z.string()),
    cta: z.string(),
    proof: z.object({
      reviews: z.number(),
      rating: z.number(),
    }).optional(),
    gallery: z.array(z.string()),
    slug: z.string(),
    description: z.string(),
    faqs: z.array(z.object({
      q: z.string(),
      a: z.string(),
    })).optional(),
  }),
}),
```

**posts** (for neighborhood-native blog content):
```typescript
posts: defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    city: z.string(),
    neighborhood: z.string().optional(),
    published: z.date(),
    heroImage: z.string(),
    relatedServices: z.array(reference('services')),
  }),
}),
```

### Key Routes

* `/` - Homepage with hero, services showcase, trust indicators
* `/services/` - Services hub (list all services)
* `/services/[service]/` - Individual service detail pages
* `/scenarios/[scenario]/` - High-intent scenario landing pages
* `/service-areas/[slug]/` - Location-specific pages
* `/blog/[...slug]` - Neighborhood-native blog posts
* `/reviews` - Customer reviews showcase
* `/contact` - Contact form

### Core Components for SEO

* **SeoHead.astro**: Meta tags, Open Graph, Twitter Card
* **StructuredData.astro**: JSON-LD schema injection
* **Breadcrumbs.astro**: Breadcrumb navigation with schema
* **InternalLinks.astro**: Contextual related content links
* **ReviewList.astro**: Display customer testimonials
* **LocalCallout.astro**: NAP display with schema

---

## 3) High-Intent Scenario Pages

### Goal
Give ready-to-hire visitors the specifics they need to choose you and get in touch without salesy tactics.

### Must-Haves

#### Meta & Structure
* **Title tag**: `{headline} | {city} | {Brand}` (55-60 chars)
* **Meta description**: Concise value prop + location + CTA (150-160 chars)
* **URL pattern**: `/scenarios/[modifier]-[service]-[city]` (e.g., `/scenarios/same-day-lawn-care-orlando`)
* **H1**: `{headline}` (e.g., "Same-Day Lawn Care That Actually Shows Up")

#### Above-the-Fold Content
* H1 headline
* Small subline: `Serving {city}, {state}`
* Clear contact option (call/text/form button)
* One real, high-quality photo (no stock images)
* Brief value proposition (1-2 sentences)

#### Body Content (~300-450 words)
* **Availability**: Realistic response times, service windows
* **Simple Process**: 3-5 step walkthrough
  - Example: "Book in 60 seconds → En-route text updates → Do work, test, clean"
* **Expected Results**: What quality/finish to expect
* **Proof Point**: One authentic review snippet or review count
  - Example: "200+ Orlando customers, 4.9/5 rating"
* **Clear CTA**: No offers or discounts, just next steps
  - Example: "Call now to book your same-day slot"

#### Internal Links
* Back to parent **service** page
* 1-2 relevant **local blog posts**
* Optional: Related scenario pages

#### Schema
* `Service` schema with serviceType, areaServed, provider
* `BreadcrumbList` schema
* Optional `FAQPage` schema if FAQs exist

#### Assets
* Real photography only (no stock photos)
* Compress and optimize (WebP/AVIF, <300KB)
* Lazy-load images
* Include width/height attributes

### Example Scenario Frontmatter

```markdown
---
title: "Same-Day Lawn Maintenance | Orlando | Tender Gardens"
headline: "Same-Day Lawn Maintenance That Actually Shows Up"
modifier: "same-day"
service: "lawn-maintenance"
location: "orlando-fl"
usp:
  - "Arrive within 90 minutes"
  - "Flat pricing, no surprises"
  - "Spotless finish guaranteed"
process:
  - "Book online in 60 seconds"
  - "Receive en-route text updates"
  - "We do the work, test quality, clean up"
cta: "Call now to book your same-day slot"
proof:
  reviews: 200
  rating: 4.9
gallery:
  - "/images/real/lawn-maintenance-1.jpg"
  - "/images/real/lawn-maintenance-2.jpg"
slug: "same-day-lawn-maintenance-orlando"
description: "Same-day lawn maintenance in Orlando with real arrival windows and flat pricing. 200+ happy customers."
faqs:
  - q: "Do you charge extra for after-hours service?"
    a: "No surcharge before 7pm on weekdays."
  - q: "What if I need weekend service?"
    a: "Saturday slots available, book by Thursday."
---

Short, conversion-first copy (~400 words). No unnecessary definitions. Promise, proof, process, CTA.
```

---

## 4) Services Hub & Service Pages

### Services Hub (`/services/`)

**Purpose**: Central directory of all services offered

**Structure**:
* H1: "Our Services" or "{City} Landscape & Garden Services"
* Brief intro (1-2 sentences)
* Grid of service cards with:
  - Service title
  - Brief description (1 sentence)
  - Link to service detail page
  - Optional: Starting price range (if applicable)

**Internal Links**:
* Each card links to `/services/[service]/`
* Footer links to related scenarios and recent posts

**Schema**:
* `BreadcrumbList`
* Optional: `ItemList` for the service listing

### Service Detail Pages (`/services/[service]/`)

**Must-Haves**:
* **Title**: `{Service} | {City} | {Brand}`
* **H1**: Service name
* **Value Proposition**: 1-2 sentences, concise
* **Process**: 3-5 steps showing how the service works
* **Benefits**: 3-5 bullet points
* **Review Snippets**: 1-2 authentic customer quotes
* **Pricing**: General range or "flat rate" mention (if applicable)
* **CTA**: Clear contact option

**Internal Links**:
* Links to 2-3 related scenario pages
* Links to 1-2 neighborhood blog posts mentioning this service
* Breadcrumbs: Home > Services > [This Service]

**Schema**:
* `Service` with provider reference to `LocalBusiness`
* `BreadcrumbList`
* Optional `FAQPage` if FAQs exist

**Example Service Frontmatter**:

```markdown
---
title: "Lawn Maintenance"
excerpt: "Fast, clean, fixed right the first time."
benefits:
  - "Same-day availability"
  - "Flat pricing, no surprises"
  - "Guaranteed results"
faqs:
  - q: "What if something breaks?"
    a: "We return at no charge within 30 days."
  - q: "Do you service all of Orlando?"
    a: "Yes, we cover all Orlando neighborhoods."
slug: "lawn-maintenance"
description: "Professional lawn maintenance with guaranteed results."
---
```

---

## 5) Neighborhood-Native Blog

### Purpose
Write posts that sound like a local professional sharing practical notes: neighborhoods, seasons, materials that perform well, recent weather, or local ordinances. Avoid generic listicles.

### Content Guidelines

**Topics to Cover**:
* Seasonal care tips specific to Florida/Orlando climate
* Neighborhood spotlights (e.g., "Best native plants for College Park gardens")
* Local regulations (e.g., "Orlando water restrictions for summer 2025")
* Recent weather impacts (e.g., "Post-hurricane garden recovery checklist")
* Material recommendations (e.g., "Mulch types that work in Central Florida heat")

**Topics to Avoid**:
* Generic "Top 10" listicles that could apply anywhere
* Overly promotional content
* Content with no local tie-in
* Doorway pages (thin content targeting keywords)

### Structure

* **Title**: Descriptive, includes location/neighborhood when relevant
* **Summary**: 1-2 sentence teaser (shown in blog index)
* **Hero Image**: Real photo from Orlando/local area (no stock)
* **Body**: 400-800 words, conversational tone
* **Internal Links**: Link to 1-2 related service pages
* **CTA**: Simple, contextual call-to-action at end

### Example Blog Post Frontmatter

```markdown
---
title: "Preparing Your Winter Park Garden for Florida Summer Heat"
summary: "Practical tips for keeping your Winter Park garden thriving through Orlando's intense summer months."
city: "Orlando"
neighborhood: "Winter Park"
published: 2025-05-15
heroImage: "/images/blog/winter-park-garden-summer.jpg"
relatedServices:
  - "lawn-maintenance"
  - "irrigation-systems"
---

Content here focuses on local conditions, neighborhood-specific challenges, and practical advice...

[End with contextual CTA linking to lawn-maintenance service]
```

### Internal Linking Strategy

Each post should:
* Link to 1-2 relevant service pages naturally in the body
* Optionally link to 1 related scenario page if highly relevant
* Include breadcrumbs: Home > Blog > [This Post]

---

## 6) Internal Linking Rules

### The Loop Pattern

**Home → Services → Scenarios/Posts → Services**

This creates a virtuous cycle where:
1. Homepage links to Services hub
2. Services hub links to individual service pages
3. Service pages link to scenario pages and blog posts
4. Scenario pages and blog posts link back to service pages

### Specific Rules

#### Global Navigation
* **Logo**: Always links to homepage
* **Main Nav**: Home, Services, Service Areas, Reviews, Blog, Contact
* **Footer**: NAP (Name, Address, Phone) + 3-6 key resource links

#### Homepage
* Link to `/services/` hub
* Feature 3-4 top services with links to detail pages
* Link to `/service-areas/` or top 3 location pages
* Link to `/reviews` or `/blog` (latest posts)

#### Service Pages
* Link to 2-3 related scenario pages (contextual, in-body)
* Link to 1-2 related blog posts (sidebar or end of page)
* Breadcrumbs to Services hub and Homepage

#### Scenario Pages
* Always link back to parent service page
* Link to 1-2 related local blog posts
* Breadcrumbs to Service page, Services hub, Homepage

#### Blog Posts
* Link to 1-2 related service pages (natural, in-body)
* Optional: Link to 1 scenario page if highly relevant
* Breadcrumbs to Blog index and Homepage

### Anchor Text Guidelines

* Use **natural, descriptive anchor text** (not repetitive exact-match keywords)
* Good: "our lawn maintenance services" → `/services/lawn-maintenance`
* Bad: "lawn maintenance lawn maintenance lawn maintenance" (keyword stuffing)
* Vary anchor text for the same destination across different pages

### Avoid

* Repetitive exact-match anchor text
* Linking the same text to different pages
* Excessive internal links (>5 per 500 words)
* Irrelevant cross-links just for SEO

---

## 7) Technical SEO Checklist

### Meta Tags (Every Page)

* **Title tag**: Unique, descriptive, 55-60 chars, includes location when relevant
* **Meta description**: Unique, compelling, 150-160 chars, includes CTA
* **H1**: One per page, matches page intent
* **Canonical**: Self-referencing unless there's a specific reason for cross-page canonical

### URL Structure

* Clean, descriptive slugs (e.g., `/services/lawn-maintenance`, `/scenarios/same-day-lawn-care-orlando`)
* No unnecessary parameters or IDs
* Lowercase, hyphens to separate words
* Location in URL when it helps (scenarios, service areas)

### Redirects

* No redirect chains (A → B → C)
* Use 301 for permanent redirects
* Use 302 for temporary redirects only
* Monitor redirect health in GSC

### Sitemap & Robots

* **sitemap.xml**: Include all services, scenarios, service areas, blog posts
* **robots.txt**: Links to sitemap, no disallow rules for public pages
* Submit sitemap to Google Search Console

### Images

* **Format**: WebP or AVIF when possible, fallback to optimized JPG
* **Size**: Aim for <300KB per image, <100KB for thumbnails
* **Attributes**: Include width/height, alt text, lazy-load
* **Real photos only**: No stock images, no AI-generated composites

### Performance

* Aim for Core Web Vitals green scores:
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1
* Use Astro's built-in optimizations (static generation, component islands)
* Minimize JavaScript (use server-rendered components by default)

### Crawl Health

* No broken internal links (run regular audits)
* No duplicate titles or meta descriptions
* Proper use of heading hierarchy (H1 → H2 → H3)
* Valid HTML (no unclosed tags, proper nesting)

---

## 8) JSON-LD Structured Data Patterns

### LocalBusiness (Global - in MainLayout)

Place in `<head>` of every page:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tender Gardens",
  "url": "https://tendergardens.com",
  "telephone": "+1-407-555-0123",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Garden Way",
    "addressLocality": "Orlando",
    "addressRegion": "FL",
    "postalCode": "32801",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.5383",
    "longitude": "-81.3792"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "17:00"
    }
  ],
  "image": "https://tendergardens.com/images/business-front.jpg",
  "sameAs": [
    "https://www.facebook.com/tendergardens",
    "https://business.google.com/..."
  ]
}
```

### Service (Service & Scenario Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Lawn Maintenance",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Tender Gardens"
  },
  "areaServed": {
    "@type": "City",
    "name": "Orlando",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "FL"
    }
  },
  "description": "Professional lawn maintenance with guaranteed results."
}
```

### BreadcrumbList (All Routed Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://tendergardens.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://tendergardens.com/services/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Lawn Maintenance",
      "item": "https://tendergardens.com/services/lawn-maintenance"
    }
  ]
}
```

### FAQPage (Pages with FAQs)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you charge extra for after-hours service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No surcharge before 7pm on weekdays."
      }
    },
    {
      "@type": "Question",
      "name": "What if I need weekend service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Saturday slots available, book by Thursday."
      }
    }
  ]
}
```

### Implementation in Astro

Create a `StructuredData.astro` component:

```astro
---
export interface Props {
  data: Record<string, any>;
}

const { data } = Astro.props;
---

<script type="application/ld+json" set:html={JSON.stringify(data)} />
```

Use in page layouts:

```astro
---
import StructuredData from '@/components/StructuredData.astro';

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Lawn Maintenance",
  // ... rest of schema
};
---

<StructuredData data={serviceSchema} />
```

---

## 9) Authoring Templates (Frontmatter Examples)

### Scenario Page Template

**File**: `src/content/scenarios/same-day-lawn-maintenance-orlando.md`

```markdown
---
title: "Same-Day Lawn Maintenance | Orlando | Tender Gardens"
headline: "Same-Day Lawn Maintenance That Actually Shows Up"
modifier: "same-day"
service: "lawn-maintenance"
location: "orlando-fl"
usp:
  - "Arrive within 90 minutes"
  - "Flat pricing, no surprises"
  - "Spotless finish guaranteed"
process:
  - "Book online in 60 seconds"
  - "Receive en-route text updates"
  - "We do the work, test quality, clean up"
cta: "Call now to book your same-day slot"
proof:
  reviews: 200
  rating: 4.9
gallery:
  - "/images/real/lawn-maintenance-1.jpg"
  - "/images/real/lawn-maintenance-2.jpg"
slug: "same-day-lawn-maintenance-orlando"
description: "Same-day lawn maintenance in Orlando with real arrival windows and flat pricing."
faqs:
  - q: "Do you charge extra for after-hours service?"
    a: "No surcharge before 7pm on weekdays."
  - q: "What if I need weekend service?"
    a: "Saturday slots available, book by Thursday."
---

## Need Lawn Maintenance Today? We're Ready

When your lawn needs immediate attention, Tender Gardens provides same-day service across Orlando. No guessing about arrival times; just reliable, professional care that shows up when promised.

### How Same-Day Service Works

1. **Book in 60 seconds** - Call or text us before 2pm
2. **Get real updates** - We text you when we're 20 minutes out
3. **Done right** - We complete the work, verify quality, and clean up

### What to Expect

Our same-day lawn maintenance includes mowing, edging, and blowing. You'll get the same thorough service as our scheduled appointments; we don't rush quality just because it's same-day.

### Flat Pricing, No Surprises

Same-day service costs the same as scheduled appointments. No "emergency fees" or hidden charges. The quote we give is what you pay.

### What Our Customers Say

"Called at noon, they were here by 2:30pm. Lawn looked perfect." - Sarah M., College Park

Over 200 Orlando customers trust us for reliable lawn care. [See more reviews →](/reviews)

**Ready to book?** Call (407) 555-0123 or [text us now](sms:+14075550123).
```

### Service Page Template

**File**: `src/content/services/lawn-maintenance.md`

```markdown
---
title: "Lawn Maintenance"
slug: "lawn-maintenance"
blurb: "Professional lawn care that keeps your property looking its best, week after week."
highlight: "Same-day service available"
featuredImage: "/images/services/lawn-maintenance-hero.jpg"
duration: "30-60 minutes"
order: 1
serviceAreas:
  - "orlando-fl"
  - "winter-park-fl"
  - "lake-nona-fl"
---

## Professional Lawn Maintenance in Orlando

Keep your lawn healthy and beautiful with consistent, reliable maintenance from Tender Gardens. We handle everything from mowing to edging to cleanup, so you can enjoy your outdoor space without the hassle.

### Our Process

1. **Assessment** - We walk your property and note any concerns
2. **Mowing & Edging** - Clean lines, even cut, proper height for Florida grass
3. **Blowing & Cleanup** - Driveways, walkways, and beds left spotless
4. **Final Check** - We verify quality before we leave

### What's Included

- Precision mowing (blade height adjusted for grass type)
- Sharp edging along walkways, driveways, and beds
- Thorough blowing and debris removal
- Bagging or mulching (your choice)

### Why Customers Choose Us

"Tender Gardens has maintained our Winter Park lawn for two years. Always on time, always thorough." - Michael T.

- **Same-day service available** when you need quick help
- **Flat-rate pricing** so you know exactly what you'll pay
- **Satisfaction guaranteed** - we return at no charge if anything isn't right

### Service Areas

We provide lawn maintenance throughout Orlando, including Winter Park, Lake Nona, College Park, Baldwin Park, and surrounding neighborhoods.

**Ready to schedule?** Call (407) 555-0123 or [contact us online](/contact).

[Need service today? Check same-day availability →](/scenarios/same-day-lawn-maintenance-orlando)
```

### Blog Post Template

**File**: `src/content/posts/winter-park-summer-garden-tips.md`

```markdown
---
title: "Preparing Your Winter Park Garden for Florida Summer Heat"
summary: "Practical tips for keeping your Winter Park garden thriving through Orlando's intense summer months."
city: "Orlando"
neighborhood: "Winter Park"
published: 2025-05-15
heroImage: "/images/blog/winter-park-garden-summer.jpg"
relatedServices:
  - "lawn-maintenance"
  - "irrigation-systems"
---

Summer in Winter Park means 95°F days, afternoon thunderstorms, and intense UV that can stress even native Florida plants. Here's how to keep your garden thriving through the heat.

## Mulch Before the Heat Peaks

Late May is the perfect time to refresh your mulch layer. A 3-inch layer of pine bark or cypress mulch keeps soil cool and retains moisture during our dry spells. I've seen Winter Park gardens cut their water needs by 30% with proper mulching alone.

## Adjust Mowing Height

Raise your mower blade to 4 inches for St. Augustine grass. Taller grass develops deeper roots and shades soil, reducing heat stress. This is especially important for lawns along Park Avenue where afternoon sun is relentless.

## Water Deeply, Less Often

Orlando's summer water restrictions (2x per week) actually align well with best practices. Water deeply in early morning (4-8am) so grass develops strong roots. Shallow daily watering creates weak, heat-vulnerable lawns.

## Watch for Chinch Bugs

Winter Park's St. Augustine lawns are prime targets for chinch bugs in summer heat. Yellow patches that spread despite watering? Check the thatch layer for tiny black bugs with white wings. Catch them early and treatment is simple.

## Native Plants for Summer Success

Consider coontie, muhly grass, and firebush for beds that handle our summer extremes. These Winter Park natives laugh at 95°F and look better than heat-stressed annuals.

Need help preparing your lawn for summer? Our [lawn maintenance service](/services/lawn-maintenance) includes proper mowing height, edging, and cleanup, setting you up for a healthier summer lawn.
```

---

## 10) Page-Level Acceptance Criteria

Before submitting any page or content for review, self-audit against these criteria:

### Content Requirements

- [ ] Scenario page copy is 300-450 words
- [ ] Service page copy is 400-600 words
- [ ] Blog post copy is 400-800 words
- [ ] Above-the-fold contact option present on scenario pages
- [ ] At least one real image per page (no stock photos)
- [ ] Small gallery (2-4 images) on scenario pages
- [ ] Every blog post links to ≥1 related service
- [ ] No offers, discounts, or urgency language (unless pre-approved)

### Technical Requirements

- [ ] Title tag unique and descriptive (55-60 chars)
- [ ] Meta description unique and compelling (150-160 chars)
- [ ] H1 unique and matches page intent
- [ ] Canonical tag present and correct
- [ ] Structured data validates (use Google Rich Results Test)
- [ ] Breadcrumbs present and functional
- [ ] Internal links present (2-4 per page)
- [ ] Images optimized (<300KB)
- [ ] Images have width/height attributes
- [ ] Images have descriptive alt text
- [ ] Images are lazy-loaded (except above-fold hero)

### SEO Requirements

- [ ] URL slug is clean and descriptive
- [ ] Location mentioned in title/H1/body (where relevant)
- [ ] NAP consistent with footer (for service area pages)
- [ ] Page included in sitemap
- [ ] No duplicate content with other pages
- [ ] No broken internal links
- [ ] No redirect chains

### Schema Validation

- [ ] LocalBusiness schema present (global)
- [ ] Service schema present (service/scenario pages)
- [ ] BreadcrumbList schema present
- [ ] FAQPage schema present (if FAQs exist)
- [ ] All schema validates at https://validator.schema.org/

---

## 11) Project Hygiene & CI

### Optional SEO Lint Script

Consider creating a build-time SEO audit script to catch common issues:

**Check for**:
- Duplicate titles across pages
- Missing H1 tags
- Broken internal links
- Images >300KB
- Missing alt text on images
- Pages missing from sitemap
- Duplicate meta descriptions
- URLs without canonical tags

**Warn on**:
- Large images (>300KB)
- Long titles (>60 chars)
- Long meta descriptions (>160 chars)
- Pages with no internal links
- Pages with >5 external links

### PR Review Checklist

When submitting content PRs, include:

1. **Sections followed**: List which sections of LOCAL-SEO.md you referenced
2. **Content type**: Scenario page / Service page / Blog post / Location page
3. **Target keywords**: Primary keyword(s) for this page
4. **Internal links added**: List pages linked to/from
5. **Schema added**: List schema types included
6. **Images used**: Confirm all are real photos, optimized
7. **Self-audit**: Confirm all acceptance criteria (§10) met

---

## 12) Forbidden Shortcuts

These practices are **strictly prohibited**:

### Images
- ❌ No stock photos from Unsplash/Pexels/Shutterstock
- ❌ No AI-generated composite images (Midjourney, DALL-E, etc.)
- ❌ No images without EXIF data or source attribution
- ✅ Only real photos taken on-site or by business owner

### Content
- ❌ No city-stuffing in every slug/title (use location where it helps conversion)
- ❌ No generic blog posts that could apply anywhere
- ❌ No doorway pages (thin content targeting keywords)
- ❌ No duplicate/spun content
- ✅ Real, specific, locally-relevant content only

### Links
- ❌ No purchased backlinks
- ❌ No link schemes or PBNs
- ❌ No exact-match anchor text spam
- ✅ Natural, editorial links only

### Promotions
- ❌ No unauthorized offers, discounts, or deadlines
- ❌ No urgency language ("limited time", "act now", etc.)
- ❌ No false scarcity ("only 3 slots left")
- ✅ Honest, modest claims only

---

## 13) Quick Checklist (Copy/Paste)

Use this for final pre-launch audit:

**Foundation**
- [ ] GBP complete (categories, hours, services, real photos)
- [ ] GBP has 10+ recent reviews
- [ ] Weekly GBP posts scheduled

**Content**
- [ ] Services hub live at `/services/`
- [ ] ≥3 service detail pages live
- [ ] ≥3 scenario pages live with real photos
- [ ] ≥3 neighborhood blog posts live
- [ ] Footer NAP + 3-6 top resource links

**Technical**
- [ ] All titles/H1s unique
- [ ] All meta descriptions set and unique
- [ ] All canonicals correct (self-referencing)
- [ ] Sitemap.xml generated and submitted to GSC
- [ ] Robots.txt present with sitemap link
- [ ] No broken internal links
- [ ] No redirect chains

**Schema**
- [ ] LocalBusiness schema on all pages (global)
- [ ] Service schema on service/scenario pages
- [ ] Breadcrumb schema on all routed pages
- [ ] FAQPage schema where FAQs exist
- [ ] All schema validates at validator.schema.org

**Images**
- [ ] All images are real photos (no stock)
- [ ] All images optimized (<300KB)
- [ ] All images lazy-loaded (except above-fold)
- [ ] All images have width/height attributes
- [ ] All images have descriptive alt text

**Internal Linking**
- [ ] Homepage → Services hub
- [ ] Services hub → Service detail pages
- [ ] Service pages → Scenario pages + Blog posts
- [ ] Scenario pages → Parent service page
- [ ] Blog posts → Related service pages
- [ ] Footer links to key resources

**Performance**
- [ ] Core Web Vitals green (LCP <2.5s, FID <100ms, CLS <0.1)
- [ ] Lighthouse SEO score ≥90
- [ ] Mobile-friendly test passes
- [ ] PageSpeed Insights green on mobile

---

## Appendix: Keyword Research & Targeting

### Local Service Keywords (Orlando Focus)

**Primary Intent**: Ready to hire

* `[service] [city]` - e.g., "lawn maintenance Orlando"
* `[modifier] [service] [city]` - e.g., "same-day lawn care Orlando"
* `[service] near me`
* `[service] in [neighborhood]` - e.g., "landscaping in Winter Park"

**Secondary Intent**: Researching options

* `best [service] [city]`
* `top-rated [service] [city]`
* `affordable [service] [city]`
* `[service] cost [city]`

**Long-Tail Intent**: Specific problems

* `[problem] [city]` - e.g., "brown lawn patches Orlando"
* `how to fix [problem] [city]`
* `[seasonal task] [city]` - e.g., "prepare garden for Florida summer"

### Content-to-Keyword Mapping

| Content Type | Target Keywords | Example |
|--------------|-----------------|---------|
| Service page | Primary service + location | "lawn maintenance Orlando" |
| Scenario page | Modifier + service + location | "same-day lawn care Orlando" |
| Location page | Service + neighborhood | "landscaping Winter Park" |
| Blog post | Long-tail + neighborhood | "prepare Winter Park garden for summer" |

### Keyword Density Guidelines

* **Target keyword**: Mention 2-4 times naturally in ~500 words
* **Variations**: Use synonyms and related terms
* **Location**: Include in title, H1, first 100 words, and naturally throughout
* **Don't**: Stuff keywords or repeat unnaturally

---

## Appendix: NAP Consistency

**NAP** = Name, Address, Phone

### Canonical NAP Format

```
Tender Gardens
123 Garden Way
Orlando, FL 32801
(407) 555-0123
```

### Where to Use

* **Footer** (every page)
* **Contact page**
* **Google Business Profile**
* **LocalBusiness schema** (every page)
* **Citations** (Yelp, Facebook, etc.)

### Consistency Rules

* Use **exact same format** everywhere
* Phone: Include area code, consistent punctuation
* Address: Street number, street name, city, state abbreviation, ZIP
* Business name: Exactly as registered (no DBA variations)

### Common Mistakes to Avoid

* ❌ "Tender Gardens, LLC" vs "Tender Gardens"
* ❌ "123 Garden Way" vs "123 Garden Way, Suite A"
* ❌ "(407) 555-0123" vs "407-555-0123" vs "4075550123"
* ❌ "Orlando, Florida" vs "Orlando, FL"

---

## Summary: Agent Workflow

1. **Before drafting any content**: Read this guide
2. **During content creation**: Reference relevant sections
3. **Before submitting**: Self-audit against §10 acceptance criteria
4. **In PR description**: Cite sections followed, include self-audit checklist
5. **If unsure**: Ask rather than guess; violating these rules can harm rankings

---

*This guide is mandatory reading for all AI agents working on Tender Gardens site copy and content. Last updated: 2025-10-28*
