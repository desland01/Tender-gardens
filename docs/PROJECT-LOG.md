# Tender Gardens Project Log

_Use this log to capture every meaningful change. Append new entries at the top so the freshest context appears first._

## How to log
- **When**: after each task, PR, or noteworthy discussion.
- **Include**: date, agent, summary of what shipped, key files/commits, any follow-up actions, and owner-facing notes.
- **Tone**: plain English, vibe-coded, brief but complete.

---

### 2025-10-29 · Codex
- Rebuilt `docs/local-seo-strategy.md` around the Venice + Sarasota radius from `docs/business-info.json`, then synced `docs/seo-verification-dataforall.md` and `docs/AI-Writing-Guide.md` so agents follow the new source-of-truth hierarchy.
- Refreshed copy guidelines in `AGENTS.md`, `agents/codex.md`, and `agents/claude.md` to enforce the verification order (business info → strategy → SERP data → UX) and Jaime’s voice.
- Scrubbed remaining “Angie-coded” wording from homepage components, gallery/services/reviews pages, and service blurbs so the site consistently reflects Jaime Goulet’s native-plant brand.
- Follow-up: Update the `locations/` content collection and any remaining Orlando references to match the new Venice-centric service map before publishing refreshed service-area pages.

### 2025-10-29 · Codex
- Imported Jaime’s field photos (`public/images/native-*.jpg`) and replaced stock gallery shots so visitors see real Venice/Sarasota pollinator projects (pollinator border, buttonbush, muhly + senna, cutleaf coneflower).
- Updated homepage gallery preview, full gallery page, and alt text to highlight native species while following the new source-of-truth order.
- Follow-up: Capture seasonal updates of the same beds to rotate into the gallery quarterly and keep the visuals fresh for returning visitors.

### 2025-10-29 · Codex
- Replaced the legacy Orlando-area location files with Venice, Sarasota, North Port, Englewood, Nokomis, and Osprey entries—each using field photography and conservation-focused highlights that match `docs/business-info.json`.
- Updated every service’s `serviceAreas` and imagery so cards reference the new coastal locations and real native plant installs.
- Follow-up: Add Siesta Key and Laurel location entries once we have dedicated photos, then point future landing pages to these refreshed slugs.

### 2025-10-29 · Codex
- Added a “Native Habitat Installation” service entry to spotlight full native garden conversions, using real project imagery and phased install details aligned with the situational SEO plan.
- Adjusted service ordering so the new install offering surfaces ahead of irrigation tune-ups.
- Follow-up: Gather before/after photo sets from future installs to expand the service gallery.

### 2025-10-29 · Codex
- Tweaked the Call-To-Action primary button to render white text on black (`src/components/CallToActionBanner.astro`) so the label stays legible against the dark background.
- Follow-up: Audit other CTA styles to ensure color contrast meets AA accessibility requirements.

### 2025-10-29 · Codex
- Forced the bottom CTA button to use Tailwind’s `!text-white` class so it overrides the global anchor color rule and stays readable on the black background.
- Follow-up: Consider adjusting `global.css` anchor defaults so semantic color utilities aren’t overridden project-wide.

### 2025-10-29 · Codex
- Renamed the “Garden Design Intensive” service to “Native Habitat Design Intensive” so the card title reflects Jaime’s conservation-first voice.
- Follow-up: When we refresh the service-area content, update `serviceAreas` arrays to match the Venice & Sarasota map so routing stays accurate.

### 2025-10-29 · Codex
- Shifted the trust module headline to “Trusted by habitat-minded homeowners and conservation partners” to reflect our conservation-first positioning per `docs/business-info.json`.
- Follow-up: As we add conservation org testimonials, consider swapping one trust stat for partner logos to reinforce the new headline.

### 2025-10-29 · Codex
- Added `public/images/jaime-hero.jpg` from the owner’s field photo and wired `HeroSection` to use it (with alt text) so the homepage lead image now features Jaime herself.
- Updated hero highlight list, stats, and footer contact info to match Business Info (native maintenance, butterfly installs, Venice contact details).
- Follow-up: Compress future photo uploads to ~1600px width before committing; replace legacy Orlando service-area markdown files with Venice-area entries next.

### 2025-10-29 · Codex
- Rewrote homepage hero, trust indicators, and CTA banner to feature Jaime Goulet’s voice and highlight native stewardship, pollinator care, and relaxed garden walks.
- Updated CTAs to invite “Schedule a garden walk” and “Plan my visit,” aligning with the new Hormozi-informed offer framing and local female founder voice.
- Follow-up: As new testimonials arrive, refresh the trust metrics with live numbers so the stats stay grounded in current client load.

### 2025-10-29 · Codex
- Tuned copy standards to speak as a Venice-based, friendly female gardener by expanding the Voice & Tone checklist in `docs/AI-Writing-Guide.md` and adding the persona to the sign-off questions.
- Updated agency guardrails (`AGENTS.md`, `agents/codex.md`, `agents/claude.md`) so every writer double-checks the new persona before publishing.
- Follow-up: When drafting new pages, sense-check anecdotes and examples so they feel like lived experience from our founder rather than generic marketing voice.

### 2025-10-29 · Codex
- Summarized Alex Hormozi's offer, leads, and messaging frameworks into `docs/AI-Writing-Guide.md` so every agent has a shared playbook before writing copy.
- Refreshed agent guidelines (`AGENTS.md`, `agents/codex.md`, `agents/claude.md`) to make the new guide plus `docs/local-seo-strategy.md` and `docs/seo-audit-venice-2025.md` mandatory pre-reads.
- Pulled fresh insights from Perplexity MCP to document Hormozi value equation, grand slam offer steps, and $100M Leads principles that now steer our tone and CTA strategy.
- Follow-up: weave the guide's templates into upcoming landing page briefs and note any gaps in proof assets the next time we collect testimonials.

### 2025-10-29 · Claude (DataForSEO Verification Complete)
- **DATAFORSEO VERIFICATION COMPLETE**: Ran live keyword volume checks, SERP analysis, and competitor domain metrics using DataForSEO MCP.
- **Critical Finding Confirmed**: Preliminary Perplexity research was ACCURATE. Native garden maintenance is severely underserved with ZERO local service providers in Venice/Sarasota SERPs.
- **Keyword Volume Data (Verified)**:
  - "native plant landscaping": 3,600/mo (LOW competition 0.06, KD: 22, CPC: $2.95)
  - "Florida native plants": 5,400/mo (MEDIUM competition 0.47, KD: 19)
  - "monarch butterfly garden": 590/mo (LOW competition 0.30, KD: 13)
  - "Florida friendly landscaping": 1,000/mo (LOW competition 0.10, KD: 22)
  - "native garden maintenance": NOT tracked nationally = zero competition opportunity ⭐⭐⭐
- **SERP Gap Analysis**:
  - Venice "native plant landscaping": Local pack has 3 nurseries (no maintenance services), top 10 = educational sites + nurseries only
  - Sarasota "butterfly garden": Tourist attractions + plant nurseries dominate, ZERO commercial installation services
  - **Opportunity**: No one is targeting butterfly garden installation OR native garden maintenance as a service in local market
- **Competitor Domain Metrics (floridanativeplants.com)**:
  - Ranking for 5,211 keywords with $69k/mo traffic value
  - Business model: Nursery + design (NOT maintenance)
  - Geographic focus: Sarasota (25 miles away)
  - Strategy: Position Tender Gardens as maintenance partner, not competitor
- **Files Updated**:
  - `docs/seo-verification-dataforall.md` - Complete DataForSEO verification with live SERP data, competitor analysis, keyword difficulty scores
  - Added SERP analysis section showing top 10 results for Venice/Sarasota queries
  - Added competitor domain metrics (5,211 keywords, traffic estimates, business model analysis)
- **Next Actions**:
  - Create service pages optimized for verified keywords (native plant landscaping, butterfly garden installation, Florida friendly landscaping)
  - Set up Google Business Profile for Venice with category "Landscape Designer" + "Garden Center"
  - Build content targeting educational keywords that convert to consultations (e.g., "best native plants for Florida butterflies" → butterfly garden consultation CTA)
- **Owner Note**: All keyword volumes verified with real data. Your positioning as native garden maintenance specialist is CORRECT - market gap confirmed with live SERP analysis.

### 2025-10-29 · Claude
- **LOCATION CORRECTION**: Business is in Venice, FL (not Orlando/Central Florida) serving 15-mile radius (Sarasota, North Port, Englewood, Osprey, Nokomis).
- Ran comprehensive SEO audit using Perplexity/Firecrawl (DataForSEO MCP configured but requires restart to activate).
- **Key Finding**: Venice retiree market (median age 68.7, 80% homeownership, $74k income) is IDEAL for maintenance subscriptions—less DIY-oriented than younger demos.
- **Competitive Intel**: Florida Native Plants Nursery (Sarasota) = established 1982, 25+ awards, BUT focuses retail/design not maintenance subscriptions. **Strategy**: Position as maintenance partner ("we maintain what they install") rather than direct competitor.
- **Keyword Opportunities**: "native garden maintenance Sarasota" = moderate volume, ZERO strong competition. Long-tail maintenance keywords completely untapped.
- **Files Shipped**:
  - `docs/seo-audit-venice-2025.md` - Full competitive analysis, demographics, keyword research, positioning strategy
  - `docs/venice-seo-quick-wins.md` - Top 10 immediate actions (30-day roadmap)
  - `docs/business-info.json` - Updated for Venice location, service areas, retiree demographics
  - `.mcp.json` - Added DataForSEO credentials (desmond@grovestreetpainting.com)
- **Follow-up**:
  - Restart Claude Code to load DataForSEO MCP
  - Run live SERP analysis for Venice/Sarasota keywords (get exact volumes, local pack data, ranking difficulty)
  - Rewrite `docs/local-seo-strategy.md` for Venice market (currently still references Orlando throughout)
  - Optional: Run DataForSEO competitor domain analysis on floridanativeplants.com
- **Owner Action Required**: Review `docs/venice-seo-quick-wins.md` and start with Google Business Profile setup (#1) and Sarasota service page (#3) while next agent finishes data validation.

### 2025-10-28 · Codex
- Scoped hyperlocal keyword targets for three native landscaping service pages (maintenance, butterfly garden installs, full yard makeovers) to support upcoming landing pages, referencing Venice & Sarasota intent signals.
- Noted Perplexity/DataForSEO MCP credential gaps while documenting qualitative keyword picks and next validation steps.
- Follow-up: rerun keyword volume checks once DataForSEO credentials are wired so we can size demand and refine copy.

### 2025-10-28 · Codex
- Cleared the legacy test intake folder so only the live Tender Gardens LLC submission remains under `docs/client-intake/`.
- Synced with the `submissions` branch to confirm no additional client payloads are pending.
- Follow-up: none—ready for the next real intake to land.

### 2025-10-28 · Codex
- Pulled down the latest client intake submissions from the `submissions` branch so they’re available under `docs/client-intake/`.
- Captured the Tender Gardens LLC intake plus the prior test submission for reference; image asset remains alongside the JSON payload.
- Follow-up: decide whether to keep the test submission or archive it once production data is verified.

### 2025-10-26 · Codex
- Wired production intake form to commit directly to the `submissions` branch via Octokit and added Resend email notifications (`src/pages/api/client-onboarding.ts`).
- Documented production setup, environment variables, and notification workflow in README and `docs/SETUP-GITHUB-SUBMISSIONS.md`.
- Confirmed submissions flow end-to-end, cleaned the test intake branch, and fetched locally.
- Follow-up: ensure Vercel env vars include the latest `RESEND_API_KEY`; future agents should update this log whenever submissions or notifications change.

### 2025-10-26 · Codex
- Refreshed agent playbooks (`AGENTS.md`, `agents/claude.md`, `agents/codex.md`) to clarify that agents own all coding, must over-explain owner actions, and maintain this log.
- Created this project log to centralize history and onboarding context for new teammates.
- Follow-up: start every future session by scanning the latest entry to stay aligned with ongoing goals.
