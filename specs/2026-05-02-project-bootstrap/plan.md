# Plan — Phase 1: Project Bootstrap

## Task Group 1 — Clean up stub
1. Delete `src/index.ts` (the placeholder stub)
2. Remove the `src/` directory if empty

## Task Group 2 — Install dependencies
1. Install production deps: `next`, `react`, `react-dom`
2. Install type deps: `@types/react`, `@types/react-dom`, `@types/node`
3. Confirm `typescript` is already present in devDependencies

## Task Group 3 — Configure package.json
1. Replace the `build` script with `next build`
2. Add `dev` script: `next dev`
3. Add `start` script: `next start`

## Task Group 4 — Update tsconfig.json
1. Adjust compiler options for Next.js (target `ES2017`, module `esnext`, moduleResolution `bundler`)
2. Add `"jsx": "preserve"` and `"plugins": [{ "name": "next" }]`
3. Update `include` to cover `app/` and `next-env.d.ts`

## Task Group 5 — Scaffold app directory
1. Create `app/layout.tsx` with a minimal root layout
2. Create `app/page.tsx` with a placeholder home page
3. Add `next-env.d.ts` reference if not auto-generated

## Task Group 6 — Install and configure Vitest
1. Install `vitest` as a dev dependency
2. Add `"test": "vitest"` script to `package.json`
3. Add `vitest.config.ts` with `environment: 'node'`

## Task Group 7 — Verify
1. Run `npm run dev` and confirm the server starts on port 3000
2. Open the browser and confirm the home page renders without errors

## Task Group 8 — Main layout component
1. Create `app/components/Header.tsx` — site header subcomponent
2. Create `app/components/Footer.tsx` — site footer subcomponent
3. Create `app/components/MainLayout.tsx` — wraps Header, `<main>` (children), Footer; imports the CSS file
4. Create `app/components/main-layout.css` — styles for header, main, and footer
5. Update `app/layout.tsx` to render `<MainLayout>` inside `<body>`
6. Update `app/page.tsx` to remove the now-redundant `<main>` wrapper
