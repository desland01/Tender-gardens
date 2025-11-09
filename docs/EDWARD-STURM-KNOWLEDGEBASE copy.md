# Edward Sturm Reference Bundle

Use this file as the single entry point for the Edward Sturm article dataset. Future agents can jump here to understand what is available, where it lives, and how to refresh it.

## Contents

- `scripts/fetch_edward_sturm_articles.py` – pulls the live article pages with requests + BeautifulSoup and writes normalized text/metadata to JSON.
- `scripts/build_edward_sturm_outputs.py` – converts the JSON dataset into human-friendly artifacts.
- `edward_sturm_articles_full_text.json` – canonical machine dataset (100 articles, ASCII text, metadata).
- `edward_sturm_complete_articles.md` – markdown compendium sorted newest to oldest with TOC, meta block, and full article text.
- `edward_sturm_articles_complete_index.json` – machine-readable index (themes, query map, concept map, use-case router).

## Quick Use

1. Open `edward_sturm_complete_articles.md` for a readable master copy.
2. Load `edward_sturm_articles_complete_index.json` for programmatic lookups or LLM toolchains.
3. If you need raw text for custom parsing, use `edward_sturm_articles_full_text.json`.

All files are stored at the repository root. They are ASCII only to respect project copy rules.

## Refresh Workflow

Run the scripts from the repo root:

```
python3 scripts/fetch_edward_sturm_articles.py
python3 scripts/build_edward_sturm_outputs.py
```

- The fetch script hits each article URL defined in `ARTICLE_URLS` and pauses between requests to stay polite.
- The build script regenerates both output files based on the refreshed JSON dataset.
- Commit any legitimate content updates after verifying the diff.

## Notes and Caveats

- Source pages occasionally add new icons or emojis. The fetch script normalizes these to ASCII, but review diffs for odd replacements.
- If Edward publishes new posts, append the new URLs to the list in `scripts/fetch_edward_sturm_articles.py` before running the refresh.
- No Firecrawl cache is required; the scripts talk directly to the live site.
- Mention this file in handoffs when SEO or content agents need Sturm references so they do not re-scrape unnecessarily.

Keep this pointer current if file locations or script names change.

## Local Visibility Roadmap

Killer path to local visibility, built from the Edward Sturm bundle plus our Venice-first strategy:

### Stage 0 - Prep (Week 0)

- Audit fundamentals: confirm `docs/business-info.json` NAP matches every page footer, contact block, and schema. Run `npm run typecheck` after any template edits so Astro does not break before sprinting.
- Build a tracking sheet (GSheet is fine) logging GSC, GBP, call tracking, and citation logins so every touchpoint stays consistent.

### Stage 1 - Conversion-Ready Website (Weeks 1-3)

- Tune core pages: refresh the homepage and both primary service pages with the exact phrases `native garden maintenance Venice FL`, `native garden maintenance Sarasota`, `butterfly garden installation Venice`, and `butterfly garden installation Sarasota` in hero copy, subheads, and meta tags. Ensure CTAs ("Schedule a native garden walk in Venice") sit above the fold on mobile.
- Service-area expansion: ship the first four location landers (`/service-areas/...`) following the structure in `docs/local-seo-strategy.md`. Include LocalBusiness + Service schema per city, internal links to neighboring areas, and plant species callouts Jaime actually tends.
- Internal linking: use Edward's pattern of "contextual anchors + geo modifiers" in body copy; link every blog post and service page back to the Venice + Sarasota maintenance pages to reinforce topical authority.

### Stage 2 - Google Business Profile and Citations (Weeks 1-4)

- GBP overhaul: update categories (Landscape Designer primary), add Jaime's native-plant bio, and upload tagged photos weekly. Follow Edward's give-first posting cadence (4 educational posts for every CTA).
- Review engine: prepare a Venice-themed review request template that nudges clients to mention pollinator wins and their neighborhood; respond within 48 hours with native plant shout-outs for keyword reinforcement.
- Citation sprint: priority listings (Apple Maps, Bing Places, Yelp, Nextdoor, Angi, Houzz). Match NAP exactly, add service descriptions that mirror our primary keywords, and attach local project photos where allowed.

### Stage 3 - Content Flywheel (Weeks 3-8)

- Blog cadence: two posts per month. Start with:
  1. "Native Garden Maintenance Calendar for Venice and Sarasota"
  2. "10 Native Plants for Butterfly Gardens on the Venice Coast"
  Each should include FAQs, internal links to service pages, and a CTA for garden walks.
- Edward Sturm reuse: mine `edward_sturm_complete_articles.md` for outreach-friendly angles (for example, "invasive lookalikes" and "snowbird-friendly maintenance"). Repurpose key stats or frameworks with Venice-specific data to build topical depth without rewriting from scratch.
- Content upgrades: embed short project reels (10-30 seconds) on service pages; they build engagement signals and can be repackaged for GBP posts.

### Stage 4 - Authority and Links (Weeks 6-12)

- Neighborhood features: pitch Venice and Sarasota lifestyle blogs and HOA newsletters on "how to prep native gardens for monarch season," offering Jaime as the quote source (Edward's "community expert" play).
- Collaborative installs: co-author posts with Florida Native Plants Nursery or Sweet Bay Nursery; request backlinks to the relevant service page and GBP URL.
- Local sponsorships: target garden clubs or coastal conservation groups for event recaps; supply photos and copy to secure linked mentions.

### Stage 5 - Ongoing Signals and Measurement (Continuous)

- GBP posts weekly, cycling through maintenance wins, plant spotlights, and soft CTAs.
- Schema health: re-run Rich Results tests after each content update; adjust for new services or FAQs.
- Reporting rhythm: monthly dashboard covering GSC impressions and clicks for target terms, GBP views and actions, top referrers, and call form conversions. Record highlights and experiments in `docs/PROJECT-LOG.md`.

### Execution Guardrails

- Log every shipped change in `docs/PROJECT-LOG.md` the same day, calling out which stage milestone moved and what still needs love so future agents never guess the status.
- Flag blockers or open questions in the log and loop in the single prompter (Jaime) with a numbered action list when human input is required; there is no extra dev team to catch dropped threads.
- Keep language vibe-coded and encouraging in all updates, reflecting that this Venice-native brand is stewarded by one owner and delivered entirely through AI coding agents.
- Repeat the source-of-truth check (business info → strategy → SERP data → AI writing guide → audit notes) before editing templates so every asynchronous agent session stays aligned.
- Note in every PR summary and changelog that all code is agent-authored to maintain audit clarity for the prompter and any future compliance review.
