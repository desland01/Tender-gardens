# Repository Guidelines

## Project Structure & Module Organization
Tender Gardens is an Astro site. Source files live in `src/`, with Astro pages under `src/pages/`, reusable UI in `src/components/`, layouts in `src/layouts/`, shared styles in `src/styles/`, and content collections defined in `src/content/` plus `content.config.ts`. Static assets belong in `public/`. Reference material sits in `docs/`, while agent briefs are in `agents/`. Review `CHECKLISTS/` for task-specific playbooks before starting work.

## Build, Test, and Development Commands
Run `npm install` once to pull dependencies. Use `npm run dev` for a live reload dev server. Produce the production bundle with `npm run build`, and confirm it locally via `npm run preview`. Keep types healthy with `npm run typecheck`; fixes here usually prevent Astro build failures.

## Coding Style & Naming Conventions
Follow the existing 2-space indentation for TypeScript, Astro, and JSON. Name Astro components and TypeScript files in PascalCase (e.g., `HeroSection.astro`) and utilities in camelCase. Favor descriptive props and avoid one-letter variables. Trailing commas are kept in multi-line objects and arrays to ease diffs. When adding styles, prefer the shared Tailwind setup before writing custom CSS.

## Testing Guidelines
There is no automated test suite yet, so lean on `npm run typecheck` and manual verification in `npm run dev`. When contributing features, include walkthrough notes or add lightweight checks (e.g., unit tests with Vitest) alongside documentation describing scenarios exercised. Name any future tests after the component or feature they cover, mirroring the directory structure.

## Copywriting Prerequisites
Before drafting, editing, or approving any marketing copy, review sources in this priority order and stop if you find a conflict:
1. `docs/business-info.json`: factual canon (owner: Jaime Goulet, services, differentiators, service areas).
2. `docs/local-seo-strategy.md`: current campaign plan and keyword priorities.
3. `docs/seo-verification-dataforall.md`: validated keyword volumes and SERP intelligence.
4. `docs/AI-Writing-Guide.md`: tone, UX flow, and Hormozi offer framing.
5. `docs/seo-audit-venice-2025.md`: supporting research context and quick wins.

If a detail conflicts between sources, defer to the higher-ranked document, flag it in `docs/PROJECT-LOG.md`, and align with the project owner before publishing. All copy must sound like Jaime, the Venice-based native gardener described in the AI Writing Guide, so double-check the Voice & Tone Checklist before sign-off.

## Commit & Pull Request Guidelines
Use short, imperative commit summaries (e.g., “Add gallery preview carousel”). Group related changes together, and reference issues inside the body when relevant. Pull requests should explain the change, list validation steps (commands run and results), call out new content entries or config changes, and attach screenshots or screen recordings for UI updates. Mention follow-up work or known gaps so reviewers can plan next iterations.

## Collaboration & Communication Norms
- The project owner is non-technical. Agents own every line of code, configuration, and deployment work. Never hand implementation steps back to the owner.
- There are no external dev handoffs—the vibe-coder owner only prompts. Treat every coding task as yours to implement end-to-end.
- Whenever the owner needs to take an action (e.g., updating credentials, running a command), spell it out with explicit, numbered checklists and why it matters.
- Keep language "vibe-coded": friendly, upbeat, and jargon-light. Translate technical trade-offs into plain English before making a recommendation.
- After each task, add a short entry to `docs/PROJECT-LOG.md` covering: date, agent, what changed, links/files touched, and any follow-up to monitor. This log is the source of truth for new agents ramping in.
- If anything is ambiguous or blocked, surface it immediately with options instead of stalling. Document open questions in the log so the next agent sees the thread.
