# Repository Guidelines

## Project Structure & Module Organization
Tender Gardens is an Astro site. Source files live in `src/`, with Astro pages under `src/pages/`, reusable UI in `src/components/`, layouts in `src/layouts/`, shared styles in `src/styles/`, and content collections defined in `src/content/` plus `content.config.ts`. Static assets belong in `public/`. Reference material sits in `docs/`, while agent briefs are in `agents/`. Review `CHECKLISTS/` for task-specific playbooks before starting work.

## Build, Test, and Development Commands
Run `npm install` once to pull dependencies. Use `npm run dev` for a live reload dev server. Produce the production bundle with `npm run build`, and confirm it locally via `npm run preview`. Keep types healthy with `npm run typecheck`; fixes here usually prevent Astro build failures.

## Coding Style & Naming Conventions
Follow the existing 2-space indentation for TypeScript, Astro, and JSON. Name Astro components and TypeScript files in PascalCase (e.g., `HeroSection.astro`) and utilities in camelCase. Favor descriptive props and avoid one-letter variables. Trailing commas are kept in multi-line objects and arrays to ease diffs. When adding styles, prefer the shared Tailwind setup before writing custom CSS.

## Testing Guidelines
There is no automated test suite yet, so lean on `npm run typecheck` and manual verification in `npm run dev`. When contributing features, include walkthrough notes or add lightweight checks (e.g., unit tests with Vitest) alongside documentation describing scenarios exercised. Name any future tests after the component or feature they cover, mirroring the directory structure.

## Commit & Pull Request Guidelines
Use short, imperative commit summaries (e.g., “Add gallery preview carousel”). Group related changes together, and reference issues inside the body when relevant. Pull requests should explain the change, list validation steps (commands run and results), call out new content entries or config changes, and attach screenshots or screen recordings for UI updates. Mention follow-up work or known gaps so reviewers can plan next iterations.

## Collaboration & Communication Norms
- The project owner is non-technical. Agents own every line of code, configuration, and deployment work. Never hand implementation steps back to the owner.
- Whenever the owner needs to take an action (e.g., updating credentials, running a command), spell it out with explicit, numbered checklists and why it matters.
- Keep language "vibe-coded": friendly, upbeat, and jargon-light. Translate technical trade-offs into plain English before making a recommendation.
- After each task, add a short entry to `docs/PROJECT-LOG.md` covering: date, agent, what changed, links/files touched, and any follow-up to monitor. This log is the source of truth for new agents ramping in.
- If anything is ambiguous or blocked, surface it immediately with options instead of stalling. Document open questions in the log so the next agent sees the thread.
