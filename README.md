# Stories Feature — Next.js App

A minimal Next.js app that demonstrates an Instagram‑like "Stories" UI built with React Server Components + Client
Components, Zustand for state management (with `persist` to `localStorage`), and Tailwind CSS v4. Stories expire after
24 hours and are stored locally in the browser.

This project started from `create-next-app` and has been adapted for the stories feature.

## Overview

- Tech stack
    - Next.js 16 (App Router)
    - React 19
    - TypeScript
    - Tailwind CSS v4 (`@tailwindcss/postcss` via PostCSS)
    - Zustand (store with `persist` middleware)
- Feature highlights
    - Add a story from an image URL
    - Thumbnails with gradient ring and time‑ago label
    - Full‑screen story viewer with progress
    - Auto‑expire stories after 24h on hydrate/revalidate
    - State persisted to `localStorage`

## Requirements

- Node.js 18.18+ (or 20+ recommended)
- pnpm (preferred, lockfile present) or npm/yarn/bun

## Getting Started

Install dependencies (pnpm preferred due to `pnpm-lock.yaml`):

```bash
pnpm install
# or
npm install
# or
yarn install
# or
bun install
```

Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:3000 in your browser. Edit `app/page.tsx` to start; the page auto‑updates during development.

## Scripts

- `dev` — start Next.js in development mode
- `build` — build the production bundle
- `start` — start the production server (after `build`)
- `lint` — run ESLint

Examples:

```bash
pnpm build
pnpm start
pnpm lint
```

## Project Structure

```
/ (project root)
├─ app/
│  ├─ layout.tsx            # Root layout; loads global styles
│  ├─ globals.css           # Tailwind CSS v4 + custom variables
│  └─ page.tsx              # Home page using <Stories />
├─ components/
│  ├─ add-story-button.tsx  # UI to add a new story
│  ├─ progress-bars.tsx     # Progress indicator for viewer (if used)
│  ├─ story-item.tsx        # Thumbnail item with time‑ago
│  ├─ story-viewer.tsx      # Full-screen story viewer
│  └─ storeis.tsx           # Stories list (component export name: Stories)
├─ stores/
│  └─ stories.store.ts      # Zustand store with persist + 24h revalidation
├─ models/
│  └─ story.ts              # Story type: { id, image, timestamp }
├─ lib/
│  └─ utils.ts              # Utilities (e.g., `getTimeAgo`)
├─ public/                  # Static assets
├─ next.config.ts           # Next.js config (minimal)
├─ postcss.config.mjs       # PostCSS with @tailwindcss/postcss plugin
├─ eslint.config.mjs        # ESLint config for Next.js 16
├─ tsconfig.json            # TypeScript config
├─ package.json             # Scripts and dependencies
└─ pnpm-lock.yaml           # pnpm lockfile
```

Note: The component file `components/storeis.tsx` intentionally exports the `Stories` component; the filename contains a
typo, but imports use `@/components/storeis` accordingly.

## Entry Points

- App Router root layout: `app/layout.tsx`
- Default route: `app/page.tsx` (renders `Stories`)

## Styling

Tailwind CSS v4 is enabled via PostCSS:

- `app/globals.css` imports `tailwindcss` and defines CSS variables/theme tokens.
- `postcss.config.mjs` enables `@tailwindcss/postcss`.

## State Management

Zustand store is defined in `stores/stories.store.ts` with `persist` to `localStorage`. On rehydration it:

- Sets a `hydrated` flag
- Prunes stories older than 24 hours (`revalidate`)

## Environment Variables

- No environment variables are required for local development as currently implemented.
- Next.js public variables must be prefixed with `NEXT_PUBLIC_` if/when added.

TODOs:

- If loading external images, configure allowed domains in `next.config.ts` (`images.domains`).
- Document any future env vars in this section.

## Testing

- No tests are set up yet in this repository.

TODOs:

- Add unit/component tests (e.g., Vitest/Jest + React Testing Library).
- Optionally add end‑to‑end tests (e.g., Playwright).
- Wire tests into CI.

## Build and Run (production)

```bash
pnpm build
pnpm start
# starts on http://localhost:3000 by default
```

## Linting

```bash
pnpm lint
```

## Development Notes

- This project uses the App Router (no `pages/` directory).
- Client components are explicitly marked with `"use client"` where needed.
- State is persisted in the browser; clearing site data will clear stories.

## License

No license.
