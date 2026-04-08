# Deployment Guide — HireHub Onboarding Portal

## Platform: Vercel

This document covers deploying the HireHub Onboarding Portal (Angular 17+) to Vercel.

---

## 1. Connecting Your Git Repository to Vercel

1. Sign in to [Vercel](https://vercel.com) with your GitHub, GitLab, or Bitbucket account.
2. Click **"Add New… → Project"** from the Vercel dashboard.
3. Select the **hirehub-onboarding-portal** repository from the list.
4. Vercel will auto-detect the framework. If it does not, configure it manually (see below).
5. Click **Deploy**.

---

## 2. Build Settings

Configure the following build settings in the Vercel project dashboard under **Settings → General → Build & Development Settings**:

| Setting              | Value                        |
|----------------------|------------------------------|
| **Framework Preset** | Angular                      |
| **Build Command**    | `ng build`                   |
| **Output Directory** | `dist/hirehub/browser`       |
| **Install Command**  | `npm install` (default)      |
| **Node.js Version**  | 18.x or 20.x (recommended)  |

> **Note:** Angular 17+ with the application builder outputs to `dist/<project-name>/browser`. Ensure the output directory matches exactly — an incorrect path will result in a 404 after deployment.

---

## 3. Vercel SPA Rewrite Configuration

Angular is a single-page application. All routes must be rewritten to `index.html` so that the Angular Router can handle them client-side.

Create a `vercel.json` file in the project root:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures that deep links (e.g., `/onboarding/step-2`, `/dashboard`) do not return a 404 from Vercel's CDN.

---

## 4. Environment Variables

**No environment variables are required** for the current deployment.

If environment variables are needed in the future:

1. Go to **Settings → Environment Variables** in the Vercel project dashboard.
2. Add the variable name and value.
3. Select the target environments: **Production**, **Preview**, and/or **Development**.
4. Redeploy for changes to take effect.

For Angular, environment-specific configuration should be managed via `src/environments/environment.ts` and `src/environments/environment.prod.ts`. Build-time substitution is handled by the Angular CLI — Vercel environment variables are only relevant if consumed during the build step (e.g., in a custom build script).

---

## 5. CI/CD Notes

- **Automatic Deployments:** Every push to the `main` branch triggers a production deployment on Vercel. Pull request branches receive preview deployments automatically.
- **Preview Deployments:** Each pull request gets a unique preview URL. Use these to verify changes before merging.
- **Build Caching:** Vercel caches `node_modules` between builds. If you encounter stale dependency issues, trigger a redeployment with the **"Redeploy"** button and check **"Clear Build Cache"**.
- **Branch Protection:** It is recommended to require passing Vercel preview checks before merging pull requests into `main`.
- **Monorepo Support:** If this project is part of a monorepo, set the **Root Directory** in Vercel project settings to the subdirectory containing the Angular project (e.g., `apps/hirehub`).

---

## 6. Troubleshooting

### Build fails with "Cannot find module '@angular/compiler-cli'"
Ensure `@angular/compiler-cli` is listed in `devDependencies` in `package.json`. Vercel installs dev dependencies by default during the build step.

### 404 on page refresh or deep links
The `vercel.json` rewrite configuration is missing or incorrect. Verify the `rewrites` rule points all routes to `/index.html` as described in Section 3.

### Blank page after deployment
- Confirm the **Output Directory** is set to `dist/hirehub/browser` (not `dist/hirehub` or `dist/`).
- Open the browser developer console and check for asset loading errors. A wrong base href can cause this — ensure `<base href="/">` is set in `src/index.html`.

### Styles or assets missing
- Verify that assets are referenced with relative paths or are included in the `assets` array in `angular.json`.
- Check that the build completed without warnings about missing files in the Vercel build logs.

### Node.js version mismatch
If the build fails due to unsupported Node.js APIs, pin the Node.js version in Vercel project settings under **Settings → General → Node.js Version**. Angular 17+ requires Node.js 18.13 or later.

### Build cache issues
If a deployment behaves unexpectedly after dependency changes:
1. Go to the **Deployments** tab in Vercel.
2. Click the three-dot menu on the latest deployment.
3. Select **Redeploy** and enable **"Clear Build Cache"**.

---

## 7. Useful Commands (Local Verification)

Before pushing to trigger a Vercel deployment, verify the production build locally:

```bash
# Install dependencies
npm install

# Run production build
ng build

# Verify output exists
ls dist/hirehub/browser/index.html

# Serve locally to test (optional)
npx serve dist/hirehub/browser
```

---

## 8. Additional Resources

- [Vercel Documentation — Angular](https://vercel.com/docs/frameworks/angular)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [Vercel Rewrites Configuration](https://vercel.com/docs/projects/project-configuration#rewrites)