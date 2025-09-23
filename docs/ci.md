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