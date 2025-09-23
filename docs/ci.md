# CI/CD Documentation

## Overview

This project uses a combination of GitHub Actions and Vercel for continuous integration and deployment. All pull requests must pass automated checks before merging.

## Package Manager

This project uses **pnpm** as the package manager. The version is specified in `package.json` under the `packageManager` field.

## CI Gates

### Pull Request Requirements

All PRs targeting the `main` branch must pass the following checks:

1. **Preview Check** (GitHub Actions)
   - Runs on every pull request
   - Uses Node.js 20
   - Enforces frozen lockfile with `pnpm install --frozen-lockfile`
   - Runs build: `pnpm run build`
   - Runs linter: `pnpm run lint`
   - **Deterministic**: Will fail if the lockfile would be modified during install

2. **Vercel Preview**
   - Automatically triggered by Vercel on PR creation/update
   - Uses `pnpm install --no-frozen-lockfile` for resilience
   - Builds and deploys a preview environment

### Why Different Install Commands?

- **GitHub Actions (`--frozen-lockfile`)**: Ensures deterministic, reproducible builds. The CI will fail if dependencies aren't properly locked, catching issues early.

- **Vercel (`--no-frozen-lockfile`)**: Provides resilience against minor lockfile discrepancies that might occur during rapid development. Vercel can still build even if the lockfile is slightly out of date.

## Auto-Merge

When both checks pass (Preview Check ✅ and Vercel Preview ✅), the PR can be automatically merged using squash merge.

## Nightly Workflows

### Personal Access Token (PAT) for Automation

The nightly workflows use a Personal Access Token (`PAT_FOR_AUTOMATION`) to create pull requests when triggered by schedule. This is required because the default `GITHUB_TOKEN` cannot trigger other workflows from scheduled events.

**Required Secret**: `PAT_FOR_AUTOMATION` with scopes:
- `repo` - Full control of private repositories
- `workflow` - Update GitHub Actions workflows

The workflows fall back to `GITHUB_TOKEN` if PAT is not available (useful for manual triggers).

### Important Path Note
**Blog content path**: All blog posts are generated to `content/blog/` (NOT `src/content/blog/`).
- Generator writes to: `content/blog/`
- Workflow diffs against: `content/blog/`, `src/data/.posts_history.json`, `src/data/keywords.json`
- If you see "0 changes" but logs show created files, verify the workflow is checking the correct path.

## Nightly Workflows

### Nightly Blog Generation
- **Schedule**: Runs at 04:43 UTC daily
- **Purpose**: Generates 5 blog posts using AI with LRU rotation and evergreen backfill
- **Features**:
  - LRU topic rotation (avoids reusing topics within 7 days)
  - Evergreen backfill pool of 30 high-value topics
  - Retry mechanism with simplified prompts (up to 2 retries)
  - Fallback content generator when API fails
  - Tracks topic history in `src/data/.posts_history.json`
- **Output**:
  - If main is unprotected: Direct commit with `chore(blog): nightly +5 posts`
  - If main is protected: Creates PR from `automation/nightly-blog` branch
- **Permissions**: `contents: write`, `pull-requests: write`
- **Default Model**: `gpt-4o-mini` (configurable via `OPENAI_MODEL` secret)

### Nightly Answers Generation
- **Schedule**: Runs at 03:19 UTC daily
- **Purpose**: Generates 20 Q&A pairs for the answers hub
- **Features**:
  - Retry mechanism with simplified prompts (up to 2 retries)
  - Fallback Q&A generator when API fails
  - Deduplication with canonicalization
  - Auto-linking to tool pages
  - Capped at 1000 most recent answers
- **Output**:
  - If main is unprotected: Direct commit with `chore(answers): nightly +20 AEO Q&As`
  - If main is protected: Creates PR from `automation/nightly-answers` branch
- **Permissions**: `contents: write`, `pull-requests: write`
- **Default Model**: `gpt-4o-mini` (configurable via `OPENAI_MODEL` secret)

Both nightly workflows:
- Load `OPENAI_API_KEY` from GitHub Secrets via `env:` in workflow
- Use Node.js 20 with corepack enabled for pnpm
- Require `OPENAI_API_KEY` secret configured in repository settings
- Use `pnpm install --frozen-lockfile` for deterministic builds
- Scripts check process.env first (CI), then .env.local, then .env as fallback
- Include QA guards to verify content generation
- Automatically create PRs when main branch is protected

## Generator Scripts

### Answers Generator
The answers generator (`scripts/generate_answers.ts`) is flexible with keyword input:
- Accepts `keywords.json` as an array: `["ai video", "cold email", ...]`
- Or as an object: `{"topics": ["ai video", ...]}` or `{"keywords": ["ai video", ...]}`
- Falls back to safe, evergreen default topics if file is missing or invalid
- Supports `--count=N` flag to control number of answers generated (default: 20)

### Running Generators Locally
Either create `.env.local` with your API key or export to environment:
```bash
# Option 1: Using .env.local file
echo "OPENAI_API_KEY=sk-..." > .env.local
pnpm run generate:answers
pnpm run generate:posts

# Option 2: Using environment variable
export OPENAI_API_KEY=sk-...
pnpm run generate:answers
pnpm run generate:posts
```

## Local Development

### Adding Dependencies

Always use pnpm to add dependencies:
```bash
pnpm add <package>        # For dependencies
pnpm add -D <package>     # For devDependencies
```

**Important**: After adding dependencies, always run `pnpm install` locally to update the lockfile before committing.

### Troubleshooting

If you encounter lockfile issues:

1. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules
   pnpm install
   ```

2. If Vercel deployment fails with lockfile errors:
   - The `vercel.json` configuration should handle this automatically
   - If issues persist, ensure `pnpm-lock.yaml` is committed

3. If GitHub Actions fail on lockfile:
   - Run `pnpm install` locally
   - Commit the updated `pnpm-lock.yaml`
   - Push the changes

## Configuration Files

- **`.npmrc`**: Contains pnpm configuration (save-exact, prefer-workspace-packages)
- **`vercel.json`**: Specifies build and install commands for Vercel
- **`.github/workflows/preview-check.yml`**: GitHub Actions workflow for PR checks
- **`.github/workflows/auto-merge-on-vercel.yml`**: Auto-merge workflow when checks pass