# Requirements — Phase 1: Project Bootstrap

## Scope

Set up a working Next.js + TypeScript project that forms the foundation for all subsequent phases.

### In scope
- Install and configure Next.js with the App Router
- Full TypeScript support configured end-to-end
- Replace the existing `src/index.ts` stub — it is no longer needed
- A single placeholder home route (`/`) to confirm the app is alive
- A main layout composed of three subcomponents — Header, Main, and Footer — each in its own file under `app/components/`
- Vitest installed and wired up via `npm test`

### Out of scope
- ESLint, Prettier, or any other code quality tooling
- SQLite or any database setup (Phase 3)
- Any feature pages or UI design (later phases)
- Authentication or middleware

## Decisions

| Decision | Choice | Reason |
|---|---|---|
| Router | App Router | Current Next.js default; required for future server components |
| Stub | Delete | Clean break — the new project structure replaces it entirely |
| Styling | None yet | Phase 10 handles styling; bootstrap stays minimal |
| Component files | One component per file | Keeps each piece independently readable and testable; matches Next.js/React conventions |
| Test runner | Vitest | Native TypeScript support, fast watch mode, zero-config for node-environment unit tests |

## Context

This phase exists to give every subsequent phase a stable, runnable base. The existing repo has only a TypeScript stub and no framework. Completing this phase means any developer can clone the repo, run `npm install && npm run dev`, and see a live app.

Refer to `specs/tech-stack.md` for the full stack rationale and `specs/mission.md` for product context.
