# Astro Local Business Starter (Vibe-coded)

## Quickstart
1. `npm install`
2. `npm run dev` → visit http://localhost:4321
3. Update content files in `src/content/**` and watch the site refresh.

## Edit Content Fast
- Services → `src/content/services/*.md`
- Service areas → `src/content/locations/*.md`
- Reviews → `src/content/reviews/*.md`
- Global styles → `src/styles/global.css`

## Handy Scripts
- `npm run build` – production build (also generates sitemap + robots.txt)
- `npm run preview` – serve the built site locally
- `npm run typecheck` – TypeScript safety pass
- `npm run upgrade:tailwind` – Tailwind v4 upgrade assist

## Next Steps
- Follow the `CHECKLISTS/` folder in order.
- Keep agents aligned with `.cursorrules` + `agents/*.md`.
- Reference quick docs in `docs/ASTRO-5.md` and `docs/TAILWIND-4.md`.

### Client Onboarding Form

A comprehensive client intake form is available at `/client-onboarding`.

**Local development**: Submissions save to `docs/client-intake/` in your filesystem.

**Production (Vercel)**: Submissions automatically commit to a `submissions` branch in your GitHub repo. This keeps your client data separate from your main codebase and prevents triggering unnecessary rebuilds.

To enable GitHub submissions for production:
1. Create a GitHub Personal Access Token with `repo` scope
2. Add environment variables to Vercel: `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`
3. See detailed setup instructions in `docs/SETUP-GITHUB-SUBMISSIONS.md`

### Optional Analytics
Set `PUBLIC_GA_ID` or `PUBLIC_GTM_ID` in your environment to enable Google Analytics or Tag Manager snippets. They remain disabled until you add those values.
