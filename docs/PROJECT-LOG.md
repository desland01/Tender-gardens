# Tender Gardens Project Log

_Use this log to capture every meaningful change. Append new entries at the top so the freshest context appears first._

## How to log
- **When**: after each task, PR, or noteworthy discussion.
- **Include**: date, agent, summary of what shipped, key files/commits, any follow-up actions, and owner-facing notes.
- **Tone**: plain English, vibe-coded, brief but complete.

---

### 2025-10-26 · Codex
- Wired production intake form to commit directly to the `submissions` branch via Octokit and added Resend email notifications (`src/pages/api/client-onboarding.ts`).
- Documented production setup, environment variables, and notification workflow in README and `docs/SETUP-GITHUB-SUBMISSIONS.md`.
- Confirmed submissions flow end-to-end, cleaned the test intake branch, and fetched locally.
- Follow-up: ensure Vercel env vars include the latest `RESEND_API_KEY`; future agents should update this log whenever submissions or notifications change.

### 2025-10-26 · Codex
- Refreshed agent playbooks (`AGENTS.md`, `agents/claude.md`, `agents/codex.md`) to clarify that agents own all coding, must over-explain owner actions, and maintain this log.
- Created this project log to centralize history and onboarding context for new teammates.
- Follow-up: start every future session by scanning the latest entry to stay aligned with ongoing goals.
