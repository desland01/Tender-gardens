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

Production checklist:
1. Create a GitHub Personal Access Token with `repo` scope and store it as `GITHUB_TOKEN`
2. Add `GITHUB_OWNER=desland01` and `GITHUB_REPO=Tender-gardens` alongside the token in Vercel (Production, Preview, Development)
3. Redeploy the project so the serverless function picks up the new environment variables
4. Submit a quick smoke test—success returns `{ ok: true, branch: "submissions", ... }`
5. When you want the data locally, run `git fetch origin submissions:submissions` and inspect `docs/client-intake/`
6. Optional: set `RESEND_API_KEY` (plus `RESEND_FROM` if you’ve verified a custom sender; otherwise the default uses `intake@resend.dev`) so new intakes ping `desmond@grovestreetpainting.com`

Full setup notes and troubleshooting live in `docs/SETUP-GITHUB-SUBMISSIONS.md`

### Optional Analytics
Set `PUBLIC_GA_ID` or `PUBLIC_GTM_ID` in your environment to enable Google Analytics or Tag Manager snippets. They remain disabled until you add those values.
