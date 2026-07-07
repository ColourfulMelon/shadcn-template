---
name: setup-template
description: Customize this shadcn/ui + Next.js template for a brand-new project — site metadata, typed env schemas, favicon, sitemap, and the Header/Footer layout. Run once right after cloning.
disable-model-invocation: true
---

# Set up this template for a new project

Walk the user through turning this starter into their project. Work top-to-bottom;
after each step, show the diff and confirm before moving on. Ask for any value you
don't have (site name, URL, author, social handle, brand color) instead of guessing.

## 1. Site metadata — `metadata.ts`
`export const SetMetadata` (typed by the `SiteMetadata` interface) drives Open Graph,
Twitter cards, the oEmbed JSON, `<html lang>`, and theme color. Replace the placeholder
values:
- `title`, `description`, `siteName`
- `author`, `authorUrl`
- `twitterHandle` (include the `@`, or leave `''` to omit twitter:site/creator)
- `themeColor` (currently the `#00FF00` placeholder)
- `image` — the 1200×630 social share image (`url`, `width`, `height`, `alt`)
- `type`, `lang`, `locale`, `colorScheme` if not the defaults

Leave `url: siteUrl` alone — it resolves from the environment (step 4).

## 2. Environment schemas — `lib/client-env.ts` and `lib/server-env.ts`
Both are Zod schemas parsed at import time, so a missing/invalid var fails fast.
- `lib/server-env.ts`: add each server-only var to `serverEnvSchema` (the file is
  `import 'server-only'`, so it can never reach the browser).
- `lib/client-env.ts`: add each `NEXT_PUBLIC_*` var to `clientEnvSchema` **and** to the
  object passed to `.parse({ ... })` — Next.js only inlines statically-referenced
  `process.env.NEXT_PUBLIC_*`, so each one must be listed explicitly.

## 3. `.env`
Copy `.env.example` to `.env`. Add any new vars from step 2 to **both** `.env` and
`.env.example` (with placeholder values in the example). `.env` is gitignored; never
commit real secrets.

## 4. Site URL
The canonical URL resolves as `SITE_URL` → `https://$VERCEL_PROJECT_PRODUCTION_URL` →
`http://localhost:3000`. On Vercel you can skip `SITE_URL`; for other hosts set it in
`.env`. It's exposed to the browser as `NEXT_PUBLIC_SITE_URL`.

## 5. Favicon & assets — `public/`
Replace `public/favicon.ico`. Add the social share image referenced in `metadata.ts`
(or keep the `placehold.co` URL until you have one). Remove the `###Add Media Here###`
placeholder.

## 6. Layout — `components/Header.tsx` and `components/Footer.tsx`
Replace the placeholder Header/Footer with the real navigation/branding. Keep them as
Server Components unless they need interactivity (then add `"use client"`).

## 7. Verify
Run and confirm all pass:
```bash
pnpm lint        # Biome
pnpm typecheck   # tsc --noEmit
pnpm build       # generates oembed.json + sitemap + robots.txt, then next build
```
Then delete the "After cloning — to do" checklist from `README.md` and update the README
to describe the actual project.
