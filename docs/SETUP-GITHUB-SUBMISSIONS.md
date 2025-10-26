# GitHub Submissions Setup

This guide explains how to configure the client onboarding form to commit submissions to a GitHub branch when deployed on Vercel.

## How It Works

When a client fills out the onboarding form at `/client-onboarding`:

1. **Locally**: Form data is saved to `docs/client-intake/[timestamp-slug]/` in your filesystem
2. **On Vercel (Production)**: Form data is committed to a `submissions` branch in your GitHub repo

This approach ensures:
- ✅ Submissions don't trigger site rebuilds (only `main` branch is deployed)
- ✅ You can review submissions at your convenience
- ✅ Clean separation between production code and client data

## Setup Instructions

### 1. Create a GitHub Personal Access Token

1. Go to [GitHub Settings > Personal Access Tokens > Tokens (classic)](https://github.com/settings/tokens/new)
2. Click "Generate new token (classic)"
3. Give it a name like "Tender Gardens Form Submissions"
4. Select the following scope:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't be able to see it again)

### 2. Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `GITHUB_TOKEN` | Your personal access token from step 1 | `ghp_abc123...` |
| `GITHUB_OWNER` | Your GitHub username or org name | `desland01` |
| `GITHUB_REPO` | Your repository name | `Tender-gardens` |

4. Make sure to apply these to **Production**, **Preview**, and **Development** environments
5. Click "Save"

### 3. Redeploy Your Site

After adding the environment variables, trigger a new deployment:
- Either push a new commit to your `main` branch
- Or use Vercel's "Redeploy" button in the Deployments tab

Submit a quick test intake once the deployment completes. A successful response looks like:

```
{"ok":true,"branch":"submissions", ...}
```

If that payload returns, the branch now exists in GitHub and you can sync it locally.

### 4. Review Submissions

When clients submit the form, a new commit is created on the `submissions` branch. The branch is created automatically on the first successful submission.

To review submissions locally:

```bash
# Fetch the branch (creates a local tracking branch the first time)
git fetch origin submissions:submissions

# Switch to the submissions branch
git checkout submissions

# View the submissions
ls docs/client-intake/

# Review a specific submission
cat docs/client-intake/2025-10-25T14-30-00-000Z-client-name/info.json

# When ready, merge into main
git checkout main
git merge submissions

# Or cherry-pick specific submissions
git cherry-pick <commit-sha>
```

### 5. Email Notifications (Optional)

Want a heads-up as soon as someone submits the form?

1. Create a Resend account (https://resend.com) and generate an API key with email-sending rights.
2. In Vercel → **Settings** → **Environment Variables**, add:

   | Key | Value |
   | --- | --- |
   | `RESEND_API_KEY` | The key you generated |
   | `RESEND_TO` | `desmond@grovestreetpainting.com` (or another recipient list, comma-separated) |
| `RESEND_FROM` | Optional. Defaults to `Tender Gardens Intake <intake@resend.dev>` |

   Apply each variable to Production, Preview, and Development, then redeploy so the API picks them up.
   > Tip: leaving `RESEND_TO` blank defaults delivery to `desmond@grovestreetpainting.com`.
3. If you want to use a custom sender, verify it with Resend and set `RESEND_FROM`. Otherwise the default `intake@resend.dev` sender works out of the box.
4. Submit a test intake locally or on Vercel; you should see an email with the summary and the full JSON payload.

> Without `RESEND_API_KEY` the notification quietly falls back to logging a warning, so missed configuration won't break form submissions.

## Testing

### Test Locally (Development Mode)

When environment variables are NOT set, the form will save to your local filesystem:

```bash
# Start the dev server
npm run dev

# Fill out the form at http://localhost:4321/client-onboarding
# Check docs/client-intake/ for the new submission
```

### Test Production Mode Locally

To test GitHub integration before deploying:

1. Create a `.env` file (don't commit this!):
   ```bash
   GITHUB_TOKEN=ghp_your_token_here
   GITHUB_OWNER=desland01
   GITHUB_REPO=Tender-gardens
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Submit the form - it should create a commit on the `submissions` branch

## Troubleshooting

### "Something went wrong saving the intake"

Check the Vercel function logs:
1. Go to Vercel dashboard > Your project
2. Click on the latest deployment
3. Navigate to "Functions" tab
4. Look for `/api/client-onboarding` logs

Common issues:
- **401 Unauthorized**: Invalid GitHub token
- **403 Forbidden**: Token doesn't have `repo` scope
- **404 Not Found**: Wrong `GITHUB_OWNER` or `GITHUB_REPO` value

### Submissions not appearing

1. Verify environment variables are set in Vercel
2. Check the `submissions` branch exists: `git fetch origin && git branch -r | grep submissions`
3. Look at Vercel function logs for errors

### Large image uploads timing out

The API limits uploads to:
- Maximum 15 images
- Maximum 5MB per image
- Converts to WebP automatically

If clients need to send more, consider splitting into multiple submissions.

## Security Notes

- ✅ The GitHub token is never exposed to the client
- ✅ Form submissions are validated server-side
- ✅ File uploads are size-limited and converted to WebP
- ⚠️ Keep your GitHub token secure - never commit it to the repo
- ⚠️ The `submissions` branch should not be publicly accessible if it contains sensitive client data

## Questions?

If you encounter issues, check:
1. Vercel function logs (Vercel dashboard > Functions tab)
2. GitHub API status: https://www.githubstatus.com/
3. Verify your token hasn't expired
