# Shadcn + Tailwind v4 + Next.js Template

Template with basic packages installed and set up. Supports all required metadata fields for Twitter, Discord, and Telegram (Open Graph, Twitter cards, and oEmbed).

## What's included

- [x] [shadcn/ui](https://ui.shadcn.com) set up for Tailwind CSS v4 (Button and Sonner toaster installed)
- [x] Jotai for state management
- [x] Zod for validation, with typed `client-env` / `server-env` helpers
- [x] Native Next.js sitemap and robots metadata routes
- [x] Native oEmbed JSON route sourced from `metadata.ts`
- [x] Lucide React icons
- [x] SVGR — import SVGs as React components (append `?url` for a plain URL)
- [x] next-themes dark mode (`ThemeProvider` + `dark` variant)
- [x] tw-animate-css animation utilities and `scrollbar-hide`
- [x] Basic Header and Footer layout
- [x] `use-media-query` hook

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

## Quality checks

```bash
pnpm check       # formatting, lint rules, and import ordering
pnpm typecheck   # TypeScript
pnpm build       # production build, oEmbed, sitemap, and robots.txt
```

CI runs all three checks. The installed pre-commit hook runs the full Biome check against
staged files; use `pnpm check:fix` to apply safe formatting and import fixes.

## Site URL

The canonical site URL is resolved in this order:

1. `SITE_URL` from the environment / `.env`
2. `https://$VERCEL_PROJECT_PRODUCTION_URL` (set automatically on Vercel)
3. `http://localhost:3000`

Production builds fail when the URL still points to localhost or the default title,
description, site name, share image, or image alt text has not been replaced.

It is exposed to the browser as `NEXT_PUBLIC_SITE_URL` via `lib/client-env.ts`.

## After cloning — to do

- [ ] Update the favicon in `public/`
- [ ] Update the site metadata in `metadata.ts`
- [ ] Populate `lib/client-env.ts` and `lib/server-env.ts` with your environment variables
- [ ] Copy `.env.example` to `.env` and set `SITE_URL` (optional on Vercel)
- [ ] Replace the placeholder Header and Footer
